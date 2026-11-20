import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const AUTH_SECRET = process.env.AUTH_SECRET || 'gmcf_fallback_secret_auth_token_key_2025';

// Path for server-side persistent custom admin credentials store
const CREDENTIALS_FILE = path.join(process.cwd(), 'data', 'admin-credentials.json');

interface StoredCredentials {
  [email: string]: {
    hash: string;
    updatedAt: string;
  };
}

function ensureDataDir(): void {
  const dir = path.dirname(CREDENTIALS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getCustomAdminHash(email: string): string | null {
  try {
    if (!fs.existsSync(CREDENTIALS_FILE)) return null;
    const raw = fs.readFileSync(CREDENTIALS_FILE, 'utf8');
    const data: StoredCredentials = JSON.parse(raw);
    const key = email.toLowerCase().trim();
    return data[key]?.hash || null;
  } catch {
    return null;
  }
}

export async function setCustomAdminPassword(email: string, newPlainPassword: string): Promise<boolean> {
  try {
    ensureDataDir();
    let data: StoredCredentials = {};
    if (fs.existsSync(CREDENTIALS_FILE)) {
      try {
        data = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8'));
      } catch {
        data = {};
      }
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(newPlainPassword, salt);
    const key = email.toLowerCase().trim();
    data[key] = {
      hash,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to set custom admin password:', err);
    return false;
  }
}

export async function verifyAdminPassword(plainInput: string, email: string, envFallbackPassword?: string): Promise<boolean> {
  const customHash = getCustomAdminHash(email);
  if (customHash) {
    try {
      const match = await bcrypt.compare(plainInput, customHash);
      if (match) return true;
    } catch (e) {
      console.error('Bcrypt compare error:', e);
    }
  }

  // Fallback to environment variable / default password
  if (envFallbackPassword) {
    return timingSafeCompare(plainInput, envFallbackPassword);
  }
  return false;
}

// Rate limiting in-memory store: IP -> { attempts: number, lockUntil: number }
const loginAttempts = new Map<string, { attempts: number; lockUntil: number }>();

export interface AdminSession {
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  iat: number;
  exp: number;
}

/**
 * Check if an IP address is currently rate-limited (brute force protection)
 */
export function checkRateLimit(ip: string): { isLocked: boolean; remainingSec: number } {
  const record = loginAttempts.get(ip);
  const now = Date.now();
  if (record && record.lockUntil > now) {
    return {
      isLocked: true,
      remainingSec: Math.ceil((record.lockUntil - now) / 1000),
    };
  }
  return { isLocked: false, remainingSec: 0 };
}

/**
 * Record a failed attempt. If >= 5 attempts, locks for 10 minutes.
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { attempts: 0, lockUntil: 0 };
  record.attempts += 1;
  if (record.attempts >= 5) {
    record.lockUntil = now + 10 * 60 * 1000; // 10 minutes lock
    record.attempts = 0;
  }
  loginAttempts.set(ip, record);
}

/**
 * Reset failed attempts upon successful login
 */
export function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * Safely compare strings against timing attacks
 */
export function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Create a cryptographically signed session token
 */
export function createSessionToken(session: Omit<AdminSession, 'iat' | 'exp'>, maxAgeSeconds = 86400): string {
  const now = Math.floor(Date.now() / 1000);
  const fullSession: AdminSession = {
    ...session,
    iat: now,
    exp: now + maxAgeSeconds,
  };
  const payloadStr = Buffer.from(JSON.stringify(fullSession)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadStr)
    .digest('base64url');
  return `${payloadStr}.${signature}`;
}

/**
 * Verify a signed session token
 */
export function verifySessionToken(token: string): AdminSession | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadStr, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payloadStr)
      .digest('base64url');

    if (!timingSafeCompare(signature, expectedSig)) {
      return null;
    }

    const session: AdminSession = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (session.exp && session.exp < now) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}
