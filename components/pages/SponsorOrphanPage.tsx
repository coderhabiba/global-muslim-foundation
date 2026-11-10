'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';
import { ORPHAN_PROFILES, OrphanProfile } from '@/lib/data/orphans';

type SponsorshipPlan = {
  id: string;
  titleEn: string;
  titleBn: string;
  periodEn: string;
  periodBn: string;
  amountBDT: number;
  amountUSD: number;
  featured?: boolean;
  benefitsEn: string[];
  benefitsBn: string[];
};

const PLANS: SponsorshipPlan[] = [
  {
    id: 'monthly-basic',
    titleEn: 'Monthly Nutrition & Education',
    titleBn: 'মাসিক পুষ্টিকর খাদ্য ও মৌলিক শিক্ষা',
    periodEn: 'per month',
    periodBn: 'প্রতি মাসে',
    amountBDT: 3500,
    amountUSD: 30,
    benefitsEn: [
      'Balanced daily 3 warm nutritious meals',
      'School tuition, textbooks & stationery',
      'Islamic moral education & Quran recitation',
      'Routine healthcare & essential medicine',
      'Quarterly progress report with photos'
    ],
    benefitsBn: [
      'দৈনিক ৩ বেলা স্বাস্থ্যসম্মত সুষম পুষ্টিকর খাবার',
      'স্কুল/মাদরাসার বেতন, বই ও খাতা-কলম সরবরাহ',
      'কুরআন তিলাওয়াত ও নৈতিক ইসলামি শিক্ষা',
      'নিয়মিত ডাক্তার চেকআপ ও জরুরি ওষুধ',
      'ত্রৈমাসিক অগ্রগতি রিপোর্ট ও ছবি প্রদান'
    ]
  },
  {
    id: 'monthly-full',
    titleEn: 'Complete Residential Guardianship & Hifz',
    titleBn: 'পূর্ণাঙ্গ আবাসিক অভিভাবকত্ব ও হেফজ স্পনসর',
    periodEn: 'per month',
    periodBn: 'প্রতি মাসে',
    amountBDT: 6500,
    amountUSD: 55,
    featured: true,
    benefitsEn: [
      'Full boarding shelter with warm bedding & clothing',
      'Dedicated mentor for Quran Tahfeez',
      'Nutritious diet with fruits & milk',
      'Eid gift package & new seasonal clothing',
      'Direct video call updates (twice a year)',
      '100% Sadaqah & Zakat eligible'
    ],
    benefitsBn: [
      'নিরাপদ আবাসিক আশ্রয়, বিছানা ও পরিষ্কার পোশাক',
      'কুরআন হিফজের জন্য ডেডিকেটেড ওস্তাদ তত্ত্বাবধান',
      'ফলমূল, দুধ ও পুষ্টিকর সমৃদ্ধ উন্নত খাদ্যতালিকা',
      'ঈদ উপহার প্যাকেজ ও নতুন জামাকাপড় প্রদান',
      'বছরে ২ বার সরাসরি ভিডিও কলের মাধ্যমে খোঁজখবর',
      '১০০% যাকাত ও সদকাহ উপযুক্ত'
    ]
  },
  {
    id: 'yearly-guardian',
    titleEn: 'Annual Complete Sponsorship',
    titleBn: 'বাৎসরিক পূর্ণাঙ্গ এতিম পৃষ্ঠপোষকতা',
    periodEn: 'per year',
    periodBn: 'প্রতি বছর',
    amountBDT: 42000,
    amountUSD: 360,
    benefitsEn: [
      '1 Full year uninterrupted care and boarding',
      'Full school fees, uniforms & examination charges',
      'Complete Quran Tahfeez scholarship',
      'Yearly health audit & dental screening',
      'Personal sponsor plaque & annual progress dossier'
    ],
    benefitsBn: [
      '১ বছরের নিরবচ্ছিন্ন সম্পূর্ণ ভরণপোষণ ও থাকা-খাওয়া',
      'স্কুল/মাদরাসার বেতন, ইউনিফর্ম ও পরীক্ষার ফি',
      'হিফজুল কুরআন সম্পন্ন করার পূর্ণ বৃত্তি',
      'বাৎসরিক সম্পূর্ণ হেলথ চেকআপ ও ডেন্টাল কেয়ার',
      'স্পনসর সম্মাননা সনদ ও বাৎসরিক বিস্তারিত ডসিয়ার'
    ]
  }
];

export default function SponsorOrphanPage() {
  const { language, currency } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  // Tabs: 'unsponsored' (জরুরি স্পনসর প্রয়োজন), 'sponsored' (অলরেডি স্পনসরকৃত), 'all' (সকল শিশু)
  const [activeTab, setActiveTab] = useState<'unsponsored' | 'sponsored' | 'all'>('unsponsored');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChildForSponsorship, setSelectedChildForSponsorship] = useState<OrphanProfile | null>(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const packagesSectionRef = useRef<HTMLElement>(null);

  const unsponsoredCount = useMemo(() => ORPHAN_PROFILES.filter(c => !c.isSponsored).length, []);
  const sponsoredCount = useMemo(() => ORPHAN_PROFILES.filter(c => c.isSponsored).length, []);

  const filteredOrphans = useMemo(() => {
    return ORPHAN_PROFILES.filter(child => {
      // Tab filter
      if (activeTab === 'unsponsored' && child.isSponsored) return false;
      if (activeTab === 'sponsored' && !child.isSponsored) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = child.nameEn.toLowerCase().includes(q) || child.nameBn.includes(q);
        const matchesLoc = child.locationEn.toLowerCase().includes(q) || child.locationBn.includes(q);
        const matchesId = child.id.toLowerCase().includes(q);
        return matchesName || matchesLoc || matchesId;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  // When clicking "এই শিশুকে স্পনসর করুন": open packages modal first & also scroll to packages
  const handleInitiateSponsorship = (child: OrphanProfile) => {
    setSelectedChildForSponsorship(child);
    setIsPackageModalOpen(true);
    if (packagesSectionRef.current) {
      packagesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Payment checkout with selected plan
  const handlePlanSelect = (planTitle: string, amountBDT: number, amountUSD: number) => {
    const amount = currency === 'BDT' ? amountBDT : amountUSD;
    const childNote = selectedChildForSponsorship
      ? ` for ${isBn ? selectedChildForSponsorship.nameBn : selectedChildForSponsorship.nameEn} (${selectedChildForSponsorship.id})`
      : '';

    setIsPackageModalOpen(false);

    openPaymentModal({
      amount,
      currency,
      cause: `Sponsor Child (${planTitle})${childNote}`
    });
  };

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[64px] sm:pt-[80px] min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-8 pb-12 lg:pt-10 lg:pb-14 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-amber-600">
              favorite
            </span>
            <span>
              {isBn
                ? 'রাসূলুল্লাহ (ﷺ) এর সুন্নাহ — এতিম ও দুস্থ শিশুর অভিভাবকত্ব'
                : 'Prophetic Sunnah — Guardian of a Vulnerable Child'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight leading-tight max-w-4xl mx-auto">
            {isBn ? (
              <>
                একটি দুস্থ শিশুর মুখে হাসি ফোটান,{' '}
                <span className="text-[#0e4d36]">জান্নাতে রাসূল (ﷺ)-এর সঙ্গী হোন</span>
              </>
            ) : (
              <>
                Sponsor a Vulnerable Child &amp;{' '}
                <span className="text-[#0e4d36]">Earn Eternal Jannah with the Prophet (ﷺ)</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'হাদিস শরিফে এসেছে: "আমি এবং এতিমের প্রতিপালনকারী জান্নাতে এভাবে থাকব" (তর্জনী ও মধ্যমা আঙুল একত্র করে দেখালেন) — সহিহ বুখারি। আপনার সামান্য মাসিক সহায়তা একটি অসহায় শিশুর সমগ্র ভবিষ্যৎ বদলে দিতে পারে।'
              : 'The Prophet Muhammad (ﷺ) said: "I and the person who looks after an orphan and provides for him, will be in Paradise like this," putting his index and middle fingers together. (Sahih al-Bukhari).'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#sponsorship-plans"
              className="px-6 py-3 rounded-full bg-[#0e4d36] hover:bg-emerald-950 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>{isBn ? 'স্পনসরশিপ প্যাকেজসমূহ' : 'Choose Sponsorship Plan'}</span>
            </a>
            <a
              href="#orphan-profiles"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">child_care</span>
              <span>{isBn ? `শিশুদের তালিকা (${ORPHAN_PROFILES.length} জন)` : `View Children (${ORPHAN_PROFILES.length})`}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Children Profiles Section */}
      <section id="orphan-profiles" className="w-full px-4 sm:px-8 py-12 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            {isBn ? 'শিশুদের সার্বিক অবস্থা ও প্রোফাইল' : 'Sponsorship Directory'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
            {isBn ? 'যাদের জন্য অভিভাবকত্ব প্রয়োজন' : 'Children Awaiting Compassionate Guardians'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {isBn
              ? `নিচে যেসকল শিশুর স্পনসর প্রয়োজন এবং যারা ইতোমধ্যে স্পনসর পেয়েছেন তাদের তালিকা ও মেয়াদ দেওয়া হলো। যে কোনো শিশুকে স্পনসর করতে "এই শিশুকে স্পনসর করুন" বাটনে ক্লিক করুন।`
              : `Browse children awaiting immediate sponsorship as well as already supported children with active tracking periods.`}
          </p>
        </div>

        {/* Status Tabs: স্পনসর প্রয়োজন (জরুরি) | অলরেডি স্পনসরকৃত | সকল শিশু */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Tab 1: স্পনসর প্রয়োজন (জরুরি) */}
            <button
              type="button"
              onClick={() => setActiveTab('unsponsored')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'unsponsored'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>
                {isBn ? `জরুরি স্পনসর প্রয়োজন (${unsponsoredCount})` : `Needs Sponsor (${unsponsoredCount})`}
              </span>
            </button>

            {/* Tab 2: অলরেডি স্পনসরকৃত */}
            <button
              type="button"
              onClick={() => setActiveTab('sponsored')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sponsored'
                  ? 'bg-[#0e4d36] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>
                {isBn ? `অলরেডি স্পনসরকৃত (${sponsoredCount})` : `Already Sponsored (${sponsoredCount})`}
              </span>
            </button>

            {/* Tab 3: সকল শিশু */}
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isBn ? `সকল শিশু (${ORPHAN_PROFILES.length})` : `All Children (${ORPHAN_PROFILES.length})`}
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder={isBn ? 'নাম বা এলাকা দিয়ে খুঁজুন...' : 'Search by name or district...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#0e4d36] focus:outline-none focus:ring-1 focus:ring-[#0e4d36]"
            />
          </div>
        </div>

        {/* Children Grid — CLEAR HIGH-RES PHOTOS, GREEN DIVIDER BAR & EMBLEM BADGE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrphans.map(child => {
            const isSponsored = child.isSponsored;

            return (
              <div
                key={child.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative ${
                  isSponsored
                    ? 'border-emerald-300 ring-1 ring-emerald-100'
                    : 'border-slate-200'
                }`}
              >
                {/* Photo Container with Full Visibility of Child's Face (No dark mask on face) */}
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                    <img
                      src={child.image}
                      alt={isBn ? child.nameBn : child.nameEn}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Very subtle bottom-only gradient for clean contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                    {/* Status Badges */}
                    {isSponsored ? (
                      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        <span className="bg-[#0e4d36]/95 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-emerald-200">check_circle</span>
                          <span>{isBn ? child.statusBn : child.statusEn}</span>
                        </span>
                        {child.remainingTimeBn && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-amber-600/30">
                            <span className="material-symbols-outlined text-[12px]">schedule</span>
                            <span>{isBn ? child.remainingTimeBn : child.remainingTimeEn}</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>{isBn ? child.statusBn : child.statusEn}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dark Green Horizontal Divider Bar (As in user screenshot) */}
                  <div className="w-full h-1.5 bg-[#0e4d36]" />

                  {/* Circular Emblem Badge (As in user screenshot: circular badge overlapping bottom-right corner) */}
                  <div
                    className="absolute -bottom-5 right-3 w-12 h-12 rounded-full bg-white border-[2.5px] border-[#0e4d36] shadow-md flex items-center justify-center p-1 z-20 group-hover:scale-110 transition-transform duration-300"
                    title="GMCF Verified Child"
                  >
                    <img
                      src="/images/gmcf-logo-emblem.png"
                      alt="GMCF Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* ID Tag directly below the green bar */}
                    <div className="flex items-center gap-2 mb-1.5 pr-14">
                      <span className="text-xs font-black text-[#0e4d36] tracking-wider uppercase font-mono">
                        {isBn ? `আইডি নং : ${child.id}` : `ID No : ${child.id}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0e4d36] transition-colors">
                        {isBn ? child.nameBn : child.nameEn}
                      </h3>
                      <span className="text-xs font-semibold text-[#0e4d36] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {isBn ? `${child.age} বছর` : `Age ${child.age}`}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-600">location_on</span>
                      {isBn ? child.locationBn : child.locationEn}
                    </p>

                    {/* Duration badge if sponsored */}
                    {isSponsored && (
                      <div className="mt-2 text-[11px] font-semibold text-[#0e4d36] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-emerald-700">history</span>
                          <span>{isBn ? child.durationBn : child.durationEn}</span>
                        </div>
                        {child.remainingTimeBn && (
                          <div className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-amber-600">hourglass_top</span>
                            <span>{isBn ? `মেয়াদ বাকি: ${child.remainingTimeBn}` : `Remaining: ${child.remainingTimeEn}`}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {isBn ? child.storyBn : child.storyEn}
                    </p>

                    <div className="mt-2.5 p-2 bg-amber-50/70 rounded-xl border border-amber-200/60">
                      <span className="text-[10px] font-bold text-amber-800 uppercase block">
                        {isBn ? 'স্বপ্ন ও লক্ষ্য:' : 'Dream & Goal:'}
                      </span>
                      <span className="text-xs text-amber-950 font-medium line-clamp-1">
                        {isBn ? child.dreamBn : child.dreamEn}
                      </span>
                    </div>
                  </div>

                  {/* Action Button: Opens Packages Selection First */}
                  <div className="pt-2">
                    {isSponsored ? (
                      <button
                        type="button"
                        onClick={() => handleInitiateSponsorship(child)}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-950 font-bold text-xs border border-emerald-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#0e4d36]">autorenew</span>
                        <span>{isBn ? 'প্যাকেজ দেখে নবায়ন করুন' : 'Renew Sponsorship (View Plans)'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleInitiateSponsorship(child)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0e4d36] to-teal-800 hover:from-emerald-950 hover:to-teal-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                        <span>{isBn ? 'এই শিশুকে স্পনসর করুন' : `Sponsor ${child.nameEn.split(' ')[0]}`}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Package Selection Modal (Opens upon clicking "এই শিশুকে স্পনসর করুন") */}
      {isPackageModalOpen && selectedChildForSponsorship && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsPackageModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-8 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0e4d36] text-white p-6 sm:p-7 relative">
              <button
                type="button"
                onClick={() => setIsPackageModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedChildForSponsorship.image}
                  alt={selectedChildForSponsorship.nameEn}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
                />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                    {isBn ? 'নির্বাচিত শিক্ষার্থী:' : 'Selected Child:'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading">
                    {isBn ? selectedChildForSponsorship.nameBn : selectedChildForSponsorship.nameEn} ({selectedChildForSponsorship.id})
                  </h3>
                  <span className="text-xs text-emerald-100">
                    {isBn ? `${selectedChildForSponsorship.age} বছর • ${selectedChildForSponsorship.locationBn}` : `Age ${selectedChildForSponsorship.age} • ${selectedChildForSponsorship.locationEn}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body: The 3 Packages to Select */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  {isBn ? 'ধাপ ১: স্পনসরশিপ প্যাকেজ নির্বাচন করুন' : 'Step 1: Choose Sponsorship Plan'}
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {isBn ? 'নিচের যে কোনো একটি প্যাকেজ বেছে নিয়ে পেমেন্ট করুন' : 'Select a plan below to proceed to secure checkout'}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map(plan => {
                  const amount = currency === 'BDT' ? plan.amountBDT : plan.amountUSD;
                  const symbol = currency === 'BDT' ? '৳' : '$';

                  return (
                    <div
                      key={plan.id}
                      className={`rounded-2xl p-6 flex flex-col justify-between border-2 transition-all relative ${
                        plan.featured
                          ? 'bg-emerald-50/60 border-[#0e4d36] shadow-lg ring-2 ring-emerald-600/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {plan.featured && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow">
                          {isBn ? 'সর্বাধিক জনপ্রিয়' : 'Most Popular'}
                        </span>
                      )}

                      <div>
                        <h5 className="text-base font-bold text-slate-900 mb-1">
                          {isBn ? plan.titleBn : plan.titleEn}
                        </h5>

                        <div className="my-4">
                          <span className="text-3xl font-black text-[#0e4d36]">
                            {symbol}{amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500 ml-1">
                            / {isBn ? plan.periodBn : plan.periodEn}
                          </span>
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 mb-6">
                          {(isBn ? plan.benefitsBn : plan.benefitsEn).map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-[15px] text-[#0e4d36] shrink-0 mt-0.5">
                                check_circle
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePlanSelect(isBn ? plan.titleBn : plan.titleEn, plan.amountBDT, plan.amountUSD)}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                          plan.featured
                            ? 'bg-[#0e4d36] hover:bg-emerald-950 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">payment</span>
                        <span>{isBn ? 'এই প্যাকেজে পেমেন্ট করুন' : 'Select & Pay'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* On-page Sponsorship Pricing Plans Section */}
      <section
        ref={packagesSectionRef}
        id="sponsorship-plans"
        className="w-full bg-slate-900 text-white py-16 px-4 sm:px-8 border-y border-slate-800 shadow-xl scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Active Child Notice Banner if selected */}
          {selectedChildForSponsorship && (
            <div className="mb-8 p-5 rounded-2xl bg-[#0e4d36] border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <img
                  src={selectedChildForSponsorship.image}
                  alt={selectedChildForSponsorship.nameEn}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow"
                />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                    {isBn ? 'নির্বাচিত শিক্ষার্থী:' : 'Selected Child for Sponsorship:'}
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {isBn ? selectedChildForSponsorship.nameBn : selectedChildForSponsorship.nameEn} ({selectedChildForSponsorship.id})
                  </h4>
                  <span className="text-xs text-emerald-100">
                    {isBn ? `${selectedChildForSponsorship.age} বছর • ${selectedChildForSponsorship.locationBn}` : `Age ${selectedChildForSponsorship.age} • ${selectedChildForSponsorship.locationEn}`}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChildForSponsorship(null)}
                className="text-xs text-amber-200 hover:text-white underline cursor-pointer"
              >
                {isBn ? 'অন্য শিক্ষার্থী নির্বাচন করুন' : 'Clear selection'}
              </button>
            </div>
          )}

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              {isBn ? 'স্বচ্ছ ও শতভাগ যাকাত উপযুক্ত প্যাকেজ' : 'Transparent Monthly & Yearly Plans'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-heading">
              {isBn ? 'একটি শিশুর দায়িত্ব নিতে প্যাকেজ নির্বাচন করুন' : 'Choose Your Child Sponsorship Tier'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              {isBn
                ? 'আপনার অনুদানের ১০০% সরাসরি শিশুর আহার, মানসম্মত শিক্ষা ও চিকিৎসার পেছনে ব্যয় করা হয়। কোনোরূপ প্রশাসনিক কর্তন করা হয় না।'
                : '100% of your pledge directly covers meals, books, boarding, and clinical care with zero deductions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map(plan => {
              const amount = currency === 'BDT' ? plan.amountBDT : plan.amountUSD;
              const symbol = currency === 'BDT' ? '৳' : '$';

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all relative ${
                    plan.featured
                      ? 'bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 border-amber-400 shadow-2xl ring-2 ring-amber-400/30'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 shadow-lg'
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow">
                      {isBn ? 'সর্বাধিক কার্যকর ও জনপ্রিয়' : 'Most Popular Plan'}
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {isBn ? plan.titleBn : plan.titleEn}
                    </h3>

                    <div className="my-6">
                      <span className="text-4xl font-black text-amber-400">
                        {symbol}{amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-300 ml-1">
                        / {isBn ? plan.periodBn : plan.periodEn}
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                      {(isBn ? plan.benefitsBn : plan.benefitsEn).map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-amber-400 shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanSelect(isBn ? plan.titleBn : plan.titleEn, plan.amountBDT, plan.amountUSD)}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                      plan.featured
                        ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                        : 'bg-[#0e4d36] hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    <span>
                      {selectedChildForSponsorship
                        ? (isBn ? `${selectedChildForSponsorship.nameBn.split(' ')[0]}-এর জন্য এই প্যাকেজে পেমেন্ট করুন` : `Select & Pay for ${selectedChildForSponsorship.nameEn.split(' ')[0]}`)
                        : (isBn ? 'এই প্যাকেজটি বেছে নিন' : 'Select Plan & Pay')}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency & Shariah Assurance */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              {isBn ? 'জবাবদিহিতা ও নিয়মিত আপডেট' : 'Transparency & Reporting'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
              {isBn
                ? 'স্পনসরকৃত শিশুর ত্রৈমাসিক রিপোর্ট ও অগ্রগতি নিশ্চিত'
                : 'Direct Updates, Academic Cards & Bi-Annual Reports'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isBn
                ? 'আপনি যে শিশুকে স্পনসর করবেন তার পড়ালেখার মার্কশিট, স্বাস্থ্য পরীক্ষার রিপোর্ট এবং ছবি প্রতি ৩ মাস অন্তর আপনার ইমেইল বা হোয়াটসঅ্যাপে পাঠানো হবে। আপনি চাইলে সরাসরি মাদরাসা ক্যাম্পাসে এসে শিশুর সাথে দেখা করতে পারবেন।'
                : 'Sponsors receive verified academic transcripts, clinical check-up records, and updated photographs quarterly, along with campus visitation privileges.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/gallery"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              <span>{isBn ? 'ক্যাম্পাসের ছবি গ্যালারি' : 'Campus Gallery'}</span>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0e4d36] hover:bg-emerald-950 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{isBn ? 'আমাদের সম্পর্কে ও সনদ' : 'Our Governance'}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
