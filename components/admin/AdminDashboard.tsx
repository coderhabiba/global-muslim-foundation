'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModalState } from '@/lib/modal-context';
import { supabase } from '@/lib/supabase';

type DonationRecord = {
  id: string;
  donorName: string;
  donorPhone: string;
  donorEmail: string;
  amount: number;
  currency: string;
  cause: string;
  method: string;
  status: string;
  date: string;
  gateway: string;
};

type VolunteerCandidate = {
  id: string;
  name: string;
  phone: string;
  district: string;
  category: string;
  skills: string;
  date: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
};

const DEFAULT_DONATIONS: DonationRecord[] = [
  {
    id: 'EPS849204912',
    donorName: 'Dr. Rafiqul Islam',
    donorPhone: '01711234567',
    donorEmail: 'rafiqul@gmail.com',
    amount: 15000,
    currency: 'BDT',
    cause: 'Clean Water Tube Well Project',
    method: 'BKASH',
    status: 'SUCCESS',
    date: '2025-05-14 11:32:04',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS920194012',
    donorName: 'Taslima Akhter',
    donorPhone: '01819876543',
    donorEmail: 'taslima.ak@yahoo.com',
    amount: 5000,
    currency: 'BDT',
    cause: 'Gaza Emergency Nourishment Appeal',
    method: 'NAGAD',
    status: 'SUCCESS',
    date: '2025-05-14 09:15:20',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS103948291',
    donorName: 'Shahidul Alam',
    donorPhone: '01913110000',
    donorEmail: 's.alam@corporate.com',
    amount: 50000,
    currency: 'BDT',
    cause: 'General Zakat Fund (100% Policy)',
    method: 'CARD (VISA)',
    status: 'SUCCESS',
    date: '2025-05-13 18:44:11',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS583920194',
    donorName: 'Farhana Kabir',
    donorPhone: '01672345678',
    donorEmail: 'farhana@outlook.com',
    amount: 3500,
    currency: 'BDT',
    cause: 'Project Alo (Pediatric Medical Aid)',
    method: 'ROCKET',
    status: 'SUCCESS',
    date: '2025-05-13 14:20:45',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS384910293',
    donorName: 'Anonymous Donor',
    donorPhone: '01700000000',
    donorEmail: 'anonymous@donor.org',
    amount: 10000,
    currency: 'BDT',
    cause: 'One Meal One Hope (Street Food Aid)',
    method: 'UPAY',
    status: 'SUCCESS',
    date: '2025-05-12 21:05:30',
    gateway: 'EPS Easy Payment System',
  },
];

const DEFAULT_VOLUNTEERS: VolunteerCandidate[] = [
  {
    id: 'VOL-2025-01',
    name: 'তানভীর আহমেদ',
    phone: '01788-992211',
    district: 'ঢাকা (সাভার / আশুলিয়া)',
    category: 'জরুরি খাদ্য ও বস্ত্র বিতরণ',
    skills: 'ফিল্ড কোঅর্ডিনেশন ও যানবাহন সাপোর্ট',
    date: '2025-05-14',
    status: 'APPROVED',
  },
  {
    id: 'VOL-2025-02',
    name: 'ফারজানা আক্তার রিতু',
    phone: '01922-334455',
    district: 'ঢাকা (মিরপুর)',
    category: 'মেডিকেল ও প্রাথমিক চিকিৎসা সহায়তা',
    skills: 'নার্সিং ডিপ্লোমা ও শিশু স্বাস্থ্য',
    date: '2025-05-13',
    status: 'PENDING',
  },
  {
    id: 'VOL-2025-03',
    name: 'মাহমুদুল হাসান',
    phone: '01811-223344',
    district: 'গাজীপুর',
    category: 'মিডিয়া, ফটোগ্রাফি ও সোশাল ক্যাম্পেইন',
    skills: 'ডিএসএলআর ভিডিওগ্রাফি ও গ্রাফিক্স ডিজাইন',
    date: '2025-05-12',
    status: 'APPROVED',
  },
  {
    id: 'VOL-2025-04',
    name: 'আব্দুল করিম',
    phone: '01555-667788',
    district: 'নারায়ণগঞ্জ',
    category: 'সুপেয় পানি ও গভীর নলকূপ স্থাপন',
    skills: 'প্লাম্বিং ও টেকনিক্যাল মেরামত',
    date: '2025-05-11',
    status: 'PENDING',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { openLicenseModal, openPaymentModal } = useModalState();
  const [activeTab, setActiveTab] = useState<'donations' | 'volunteers' | 'campaigns' | 'settings'>('donations');
  const [donations, setDonations] = useState<DonationRecord[]>(DEFAULT_DONATIONS);
  const [volunteers, setVolunteers] = useState<VolunteerCandidate[]>(DEFAULT_VOLUNTEERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('gmcf:admin_auth');
    if (!authData) {
      router.push('/login');
      return;
    }

    // Load any donations saved during this or previous sessions
    try {
      const storedDonations = JSON.parse(localStorage.getItem('gmcf:donations') || '[]');
      if (storedDonations && storedDonations.length > 0) {
        setDonations([...storedDonations, ...DEFAULT_DONATIONS]);
      }
    } catch (e) {
      console.error(e);
    }

    // Fetch real-time donations from Supabase
    supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: DonationRecord[] = data.map(d => ({
            id: d.transaction_id || d.id,
            donorName: d.donor_name || 'Anonymous Donor',
            donorPhone: d.donor_phone || '',
            donorEmail: d.donor_email || '',
            amount: Number(d.amount) || 0,
            currency: d.currency || 'BDT',
            cause: d.cause || 'General Relief',
            method: (d.payment_method || 'EPS').toUpperCase(),
            status: (d.status || 'SUCCESS').toUpperCase(),
            date: new Date(d.created_at).toISOString().replace('T', ' ').substring(0, 19),
            gateway: 'EPS Easy Payment System',
          }));
          setDonations(prev => {
            const existingIds = new Set(mapped.map(m => m.id));
            const rest = prev.filter(p => !existingIds.has(p.id));
            return [...mapped, ...rest];
          });
        }
      });

    // Fetch real-time volunteers from Supabase
    supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: VolunteerCandidate[] = data.map(v => ({
            id: v.id,
            name: v.full_name || 'Volunteer',
            phone: v.phone || '',
            district: v.district || 'ঢাকা',
            category: v.interests || 'মাঠ পর্যায়ের ত্রাণ',
            skills: v.skills || 'স্বেচ্ছাসেবা',
            date: new Date(v.created_at).toISOString().substring(0, 10),
            status: (v.status === 'approved' ? 'APPROVED' : v.status === 'rejected' ? 'REJECTED' : 'PENDING'),
          }));
          setVolunteers(prev => {
            const existingIds = new Set(mapped.map(m => m.id));
            const rest = prev.filter(p => !existingIds.has(p.id));
            return [...mapped, ...rest];
          });
        }
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('gmcf:admin_auth');
    document.cookie = 'gmcf_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'PENDING' | 'REJECTED') => {
    setVolunteers(prev =>
      prev.map(v => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const totalDonationsBdt = donations.reduce((sum, d) => sum + (d.currency === 'BDT' ? d.amount : d.amount * 122), 0);
  const pendingVolunteersCount = volunteers.filter(v => v.status === 'PENDING').length;

  const filteredDonations = donations.filter(
    d =>
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorPhone.includes(searchTerm)
  );

  return (
    <div data-l10n="off" className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-emerald-950 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-white px-2 py-1 rounded-lg">
                <img
                  src="/images/gmcf-logo-full.png"
                  alt="GMCF Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <div className="hidden sm:block border-l border-emerald-800 pl-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                অ্যাডমিন কন্ট্রোল সেন্টার
              </span>
              <span className="text-[11px] text-emerald-200">
                Global Muslim Charitable Foundation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => openLicenseModal()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-emerald-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>সনদপত্র দেখুন</span>
            </button>

            <button
              onClick={() => openPaymentModal({ amount: 5000, cause: 'Test EPS Gateway Transaction' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
              <span>EPS টেস্ট অনুদান</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-emerald-800">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-white text-[11px]">Mohammad Ali Mostafa</p>
                <p className="text-[10px] text-emerald-300">Chairman (Super Admin)</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700/50 flex items-center justify-center text-red-200 transition-colors"
                title="লগআউট করুন"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                সর্বমোট অনুদান সংগ্রহ
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">
                ৳{totalDonationsBdt.toLocaleString()}
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                ১০০% যাকাত পলিসি নিশ্চিত
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                অনুদান ট্রানজেকশন
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {donations.length} টি
              </h3>
              <span className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                ইজি পেমেন্ট সিস্টেম (EPS) গেটওয়ে
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">receipt_long</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                স্বেচ্ছাসেবক আবেদন
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {volunteers.length} জন
              </h3>
              <span className="text-[11px] text-amber-600 font-bold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                {pendingVolunteersCount} জন অনুমোদনের অপেক্ষায়
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                সরকারি নিবন্ধন স্ট্যাটাস
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 font-mono">
                S-14086/2023
              </h3>
              <a
                href="/images/permit.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-0.5 mt-1 underline"
              >
                <span className="material-symbols-outlined text-[14px]">verified</span>
                স্বীকৃত লাইসেন্স (Permit PDF)
              </a>
            </div>
            <a
              href="/images/permit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center transition-colors cursor-pointer"
              title="View Government License Permit"
            >
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </a>
          </div>
        </div>

        {/* Content Tabs Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="flex border-b border-slate-200 px-4 sm:px-6 gap-2 bg-slate-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'donations'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              অনুদান তালিকা ({donations.length})
            </button>

            <button
              onClick={() => setActiveTab('volunteers')}
              className={`py-4 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'volunteers'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              স্বেচ্ছাসেবক আবেদনপত্র ({volunteers.length})
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'campaigns'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              চলমান ক্যাম্পেইন ওভারভিউ
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              প্রাতিষ্ঠানিক তথ্য ও সেটিংস
            </button>
          </div>

          {/* Tab 1: Donations List */}
          {activeTab === 'donations' && (
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="দাতা, মোবাইল নম্বর, ট্রানজেকশন ID বা খাত দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border rounded-xl text-xs border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const csvContent =
                        'data:text/csv;charset=utf-8,' +
                        ['ID,Donor,Phone,Amount,Currency,Cause,Method,Date']
                          .concat(
                            donations.map(
                              d =>
                                `"${d.id}","${d.donorName}","${d.donorPhone}",${d.amount},${d.currency},"${d.cause}","${d.method}","${d.date}"`
                            )
                          )
                          .join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', 'gmcf_eps_donations.csv');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    CSV ডাউনলোড
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Trx ID &amp; গেটওয়ে</th>
                      <th className="p-3.5">দাতার নাম ও ফোন</th>
                      <th className="p-3.5">অনুদান খাত</th>
                      <th className="p-3.5">পরিমাণ</th>
                      <th className="p-3.5">পেমেন্ট মেথড</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                      <th className="p-3.5">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          কোনো অনুদানের তথ্য পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map(d => (
                        <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-slate-900 block">{d.id}</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {d.gateway}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block">{d.donorName}</span>
                            <span className="text-slate-500 font-mono text-[11px]">{d.donorPhone}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-800 line-clamp-1">{d.cause}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-mono font-black text-emerald-800 text-sm">
                              ৳{d.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                              {d.method}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              {d.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                            {d.date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Volunteer Applications */}
          {activeTab === 'volunteers' && (
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">আইডি</th>
                      <th className="p-3.5">প্রার্থীর নাম ও ফোন</th>
                      <th className="p-3.5">ঠিকানা / জেলা</th>
                      <th className="p-3.5">পছন্দের মানবিক খাত</th>
                      <th className="p-3.5">দক্ষতা ও অভিজ্ঞতা</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                      <th className="p-3.5 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {volunteers.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-mono text-slate-500">{v.id}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">{v.name}</span>
                          <span className="text-slate-500 font-mono text-[11px]">{v.phone}</span>
                        </td>
                        <td className="p-3.5">{v.district}</td>
                        <td className="p-3.5">
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-medium text-[11px]">
                            {v.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 text-[11px] max-w-xs">{v.skills}</td>
                        <td className="p-3.5">
                          <span
                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              v.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : v.status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleStatusChange(v.id, 'APPROVED')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                          >
                            অনুমোদন
                          </button>
                          <button
                            onClick={() => handleStatusChange(v.id, 'REJECTED')}
                            className="px-2 py-1 bg-slate-200 hover:bg-red-100 hover:text-red-700 text-slate-700 rounded text-[10px] font-bold"
                          >
                            বাতিল
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Campaigns Overview */}
          {activeTab === 'campaigns' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-food-1.jpg"
                    alt="Food Aid"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      One Meal One Hope (জরুরি খাদ্য বিতরণ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">রেলওয়ে ও বস্তি এলাকায় সুবিধাবঞ্চিতদের খাদ্য সরবরাহ</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৪,৫০,০০০ / লক্ষ্য: ৳১০,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-water-1.jpg"
                    alt="Water"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Clean Water Wells (গভীর নলকূপ স্থাপন)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">খরা ও আর্সেনিক আক্রান্ত অঞ্চলে নিরাপদ পানির সংস্থান</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৭,৮০,০০০ / লক্ষ্য: ৳১৫,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/orphans/Abdul-Hakim.jpg"
                    alt="Orphan"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Sponsor An Orphan (এতিম প্রতিপালন ও শিক্ষা)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">মাসিক স্পনসরশিপ ও কোরআন হিফজ শিক্ষা নিশ্চিতকরণ</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৬,২০,০০০ / লক্ষ্য: ৳১২,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-house-1.jpg"
                    alt="Housing"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Emergency Shelter &amp; Rebuild (ঘর নির্মাণ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">নদীভাঙন ও গৃহহীন পরিবারের স্থায়ী পুনর্বাসন</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৫,১৫,০০০ / লক্ষ্য: ৳২০,০০,০০০
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Institutional Settings */}
          {activeTab === 'settings' && (
            <div className="p-4 sm:p-6 space-y-5 max-w-2xl">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                  প্রাতিষ্ঠানিক সরকারি তথ্যাদি (GMCF Official)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-500 font-bold block mb-1">চেয়ারম্যানের নাম</label>
                    <input
                      type="text"
                      readOnly
                      value="Mohammad Ali Mostafa"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">ফাউন্ডেশনের পূর্ণ নাম</label>
                    <input
                      type="text"
                      readOnly
                      value="Global Muslim Charitable Foundation"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">অফিসিয়াল ইমেইল</label>
                    <input
                      type="text"
                      readOnly
                      value="gmcfoundation2022@gmail.com"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">যোগাযোগ মোবাইল নম্বর</label>
                    <input
                      type="text"
                      readOnly
                      value="01913119525"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-500 font-bold block mb-1">হেড অফিস ঠিকানা</label>
                    <input
                      type="text"
                      readOnly
                      value="99, Kaisharchor, Vakurta, Savar, Dhaka, Bangladesh"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-500 font-bold block mb-1">পেমেন্ট গেটওয়ে কনফিগারেশন</label>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-mono text-emerald-800 font-bold">EPS Gateway Sandbox (MFS, Cards, Internet Banking)</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">সক্রিয়</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

