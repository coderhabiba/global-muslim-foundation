-- ==============================================================================
-- Global Muslim Charitable Foundation (GMCF) - Supabase Database Schema
-- Run this script in your Supabase SQL Editor (1-Click Setup)
-- ==============================================================================

-- 1. Donations Table (অনুদানের হিসাব)
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    donor_email TEXT,
    donor_phone TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'BDT',
    cause TEXT NOT NULL, -- e.g. 'Project Alo', 'Zakat Fund'
    payment_method VARCHAR(50) DEFAULT 'EPS Gateway', -- bKash, Nagad, Card
    transaction_id VARCHAR(100),
    is_recurring BOOLEAN DEFAULT FALSE,
    frequency VARCHAR(20) DEFAULT 'one-time', -- 'monthly', 'one-time'
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for donations from the website checkout
CREATE POLICY "Allow public donation submission" 
ON public.donations FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow reading only by authenticated admins
CREATE POLICY "Allow authenticated read donations" 
ON public.donations FOR SELECT 
TO authenticated 
USING (true);


-- 2. Volunteers Table (স্বেচ্ছাসেবক আবেদনপত্র)
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    district TEXT,
    interests TEXT,
    skills TEXT,
    availability TEXT,
    status VARCHAR(30) DEFAULT 'new', -- 'new', 'reviewed', 'contacted'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public volunteer registration" 
ON public.volunteers FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read volunteers" 
ON public.volunteers FOR SELECT 
TO authenticated 
USING (true);


-- 3. Contact & Feedback Messages (যোগাযোগ ও বার্তা)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'unread', -- 'unread', 'read', 'replied'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public contact submission" 
ON public.contact_messages FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read contact messages" 
ON public.contact_messages FOR SELECT 
TO authenticated 
USING (true);


-- 4. Newsletter Subscribers (ইমেইল নিউজলেটার সাবস্ক্রিপশন)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public newsletter subscription" 
ON public.newsletter_subscribers FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read subscribers" 
ON public.newsletter_subscribers FOR SELECT 
TO authenticated 
USING (true);

