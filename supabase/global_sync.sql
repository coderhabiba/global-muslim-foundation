-- ==============================================================================
-- GMCF Global Sync Schema (CMS Content, Sections, Cards & Entities)
-- Run this in Supabase -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. Site CMS Global Content (প্রতিটি পেজের সব টেক্সট ও কন্টেন্ট)
CREATE TABLE IF NOT EXISTS public.site_cms (
    page_key TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.site_cms DISABLE ROW LEVEL SECURITY;

-- 2. Custom Dynamic Sections (নতুন তৈরি করা যে কোনো পেজের কাস্টম সেকশন)
CREATE TABLE IF NOT EXISTS public.custom_sections (
    id TEXT PRIMARY KEY,
    page_key TEXT NOT NULL,
    section_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.custom_sections DISABLE ROW LEVEL SECURITY;

-- 3. Dynamic Cards & Projects (সব কার্ড: ক্যাম্পেইন, আপকামিং, এতিম, নিউজ, গ্যালারি)
CREATE TABLE IF NOT EXISTS public.dynamic_cards (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL, -- 'campaigns', 'upcoming', 'foundation', 'orphans', 'news', 'gallery'
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.dynamic_cards DISABLE ROW LEVEL SECURITY;

-- 4. Members & Trustees (বোর্ড ও টিম মেম্বার)
CREATE TABLE IF NOT EXISTS public.members (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name_bn TEXT NOT NULL,
    name_en TEXT,
    role_bn TEXT NOT NULL,
    role_en TEXT,
    category VARCHAR(50) DEFAULT 'board',
    department_bn TEXT,
    image TEXT,
    phone TEXT,
    email TEXT,
    location_bn TEXT,
    bio_bn TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.members DISABLE ROW LEVEL SECURITY;

-- 5. Volunteers (স্বেচ্ছাসেবক আবেদন ও ম্যানেজমেন্ট)
CREATE TABLE IF NOT EXISTS public.volunteers (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    district TEXT,
    interests TEXT,
    skills TEXT,
    image TEXT,
    status VARCHAR(30) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.volunteers DISABLE ROW LEVEL SECURITY;

-- 6. Donations (অনলাইন অনুদান হিসাব)
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    donor_name TEXT NOT NULL DEFAULT 'Anonymous Donor',
    donor_email TEXT DEFAULT '',
    donor_phone TEXT DEFAULT '',
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'BDT',
    cause TEXT NOT NULL DEFAULT 'General Relief',
    payment_method VARCHAR(50) DEFAULT 'EPS Gateway',
    transaction_id VARCHAR(100),
    status VARCHAR(30) DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.donations DISABLE ROW LEVEL SECURITY;
