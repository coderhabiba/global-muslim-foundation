'use client';

import React, { useState } from 'react';
import { KeyRound, Lock, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

interface ChangePasswordCardProps {
  isBn: boolean;
}

export function ChangePasswordCard({ isBn }: ChangePasswordCardProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg(isBn ? 'সবগুলো ঘর পূরণ করা আবশ্যক।' : 'All fields are required.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg(isBn ? 'নতুন পাসওয়ার্ড ন্যূনতম ৮ অক্ষরের হতে হবে।' : 'New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(isBn ? 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।' : 'New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (isBn ? 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।' : 'Failed to change password.'));
      }

      setSuccessMsg(isBn ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে এবং সিকিউর bcrypt হ্যাশ হিসেবে ডাটাবেজে সংরক্ষিত হয়েছে!' : 'Password updated successfully and encrypted with bcrypt!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setErrorMsg(err.message || (isBn ? 'ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।' : 'An error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-50/70 p-5 sm:p-6 rounded-xl border border-zinc-200 space-y-4 shadow-2xs">
      <h3 className="text-sm font-semibold text-zinc-900 border-b border-zinc-200 pb-2.5 flex items-center gap-2">
        <KeyRound className="w-4 h-4 text-emerald-600" />
        {isBn ? 'এডমিন লগইন সিকিউরিটি ও পাসওয়ার্ড পরিবর্তন' : 'Admin Security & Password Change'}
      </h3>

      <p className="text-xs text-zinc-600 leading-relaxed">
        {isBn
          ? 'সার্ভারে পাসওয়ার্ড পরিবর্তন করার জন্য নিচের ফর্মটি ব্যবহার করুন। নতুন পাসওয়ার্ডটি স্বয়ংক্রিয়ভাবে শক্তিশালী 12-round bcrypt হ্যাশ এনক্রিপশনে সুরক্ষিত হয়ে সংরক্ষিত হবে।'
          : 'Use this form to update your admin credentials. Your new password will be encrypted using 12-round bcrypt hashing for maximum security.'}
      </p>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
        <div>
          <label className="text-zinc-700 font-medium block mb-1 text-xs">
            {isBn ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-white px-3 py-2 pr-9 border rounded-md border-zinc-200 text-zinc-900 font-medium text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-zinc-700 font-medium block mb-1 text-xs">
              {isBn ? 'নতুন পাসওয়ার্ড (ন্যূনতম ৮ অক্ষর)' : 'New Password (min 8 chars)'}
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white px-3 py-2 pr-9 border rounded-md border-zinc-200 text-zinc-900 font-medium text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-zinc-700 font-medium block mb-1 text-xs">
              {isBn ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white px-3 py-2 pr-9 border rounded-md border-zinc-200 text-zinc-900 font-medium text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isBn ? 'আপডেট হচ্ছে...' : 'Updating...'}</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>{isBn ? 'পাসওয়ার্ড পরিবর্তন সংরক্ষণ করুন' : 'Save New Password'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
