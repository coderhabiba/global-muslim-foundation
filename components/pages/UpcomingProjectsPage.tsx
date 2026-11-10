'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

type UpcomingProject = {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  targetDateEn: string;
  targetDateBn: string;
  locationEn: string;
  locationBn: string;
  estimatedBudgetBDT: number;
  estimatedBudgetUSD: number;
  raisedBDT: number;
  raisedUSD: number;
  statusEn: 'In Planning' | 'Land Acquired' | 'Fundraising' | 'Commencing Soon';
  statusBn: 'পরিকল্পনাধীন' | 'জমি অধিগ্রহণ সম্পন্ন' | 'তহবিল সংগ্রহ চলছে' | 'শীঘ্রই শুরু হবে';
  image: string;
  descriptionEn: string;
  descriptionBn: string;
  highlightsEn: string[];
  highlightsBn: string[];
  beneficiaryCountEn: string;
  beneficiaryCountBn: string;
};

const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: 'proj-01',
    titleEn: 'Central Orphanage & Quran Tahfeez Complex',
    titleBn: 'কেন্দ্রীয় স্থায়ী এতিমখানা ও পূর্ণাঙ্গ হিফজুল কুরআন কমপ্লেক্স',
    categoryEn: 'Orphan Care & Education',
    categoryBn: 'এতিম প্রতিপালন ও শিক্ষা',
    targetDateEn: 'Mid 2026',
    targetDateBn: 'মধ্য ২০২৬',
    locationEn: 'Vakurta, Savar, Dhaka',
    locationBn: 'ভাকুর্তা, সাভার, ঢাকা',
    estimatedBudgetBDT: 8500000,
    estimatedBudgetUSD: 70000,
    raisedBDT: 3200000,
    raisedUSD: 26000,
    statusEn: 'Land Acquired',
    statusBn: 'জমি অধিগ্রহণ সম্পন্ন',
    image: '/images/rural-madrasa-children.jpg',
    beneficiaryCountEn: '250+ Resident Orphans',
    beneficiaryCountBn: '২৫০+ আবাসিক এতিম শিশু',
    descriptionEn: 'A state-of-the-art permanent multi-story residential facility providing free modern schooling, Islamic Quran Tahfeez, medical care, nutritious dining, and safe playground for destitute orphans.',
    descriptionBn: 'অভিভাবকহীন অসহায় শিশুদের নিরাপদ আশ্রয়, উন্নত হিফজ শিক্ষা, আধুনিক স্কুলিং এবং পুষ্টিকর আহার নিশ্চিত করতে সাভারে নিজস্ব জমিতে একটি বহুতল স্থায়ী কমপ্লেক্স নির্মাণের উদ্যোগ নেওয়া হয়েছে।',
    highlightsEn: [
      'Dedicated residential dormitories for 250 orphans',
      'Modern computer lab & English language center',
      'Solar-powered uninterrupted electricity & deep tube well',
      'In-house medical clinic with monthly doctor visits'
    ],
    highlightsBn: [
      '২৫০ জন এতিম শিক্ষার্থীর আধুনিক আবাসন ব্যবস্থা',
      'কম্পিউটার ল্যাব ও সাধারণ শিক্ষার ক্লাসরুম',
      'সৌরবিদ্যুৎ ও গভীর নলকূপের মাধ্যমে নিরবচ্ছিন্ন বিশুদ্ধ পানি',
      'সার্বক্ষণিক চিকিৎসা কক্ষ ও নিয়মিত ডাক্তার তদারকি'
    ]
  },
  {
    id: 'proj-02',
    titleEn: 'Free Specialized Eye & Pediatric Hospital',
    titleBn: 'বিনামূল্যে চক্ষু ছানি অপারেশন ও শিশু স্বাস্থ্যসেবা কেন্দ্র',
    categoryEn: 'Healthcare & Sadaqah Jariyah',
    categoryBn: 'স্বাস্থ্যসেবা ও সদকায়ে জারিয়াহ',
    targetDateEn: 'Late 2026',
    targetDateBn: 'শেষ ২০২৬',
    locationEn: 'Kurigram, Rangpur Division',
    locationBn: 'কুড়িগ্রাম চরাঞ্চল, রংপুর',
    estimatedBudgetBDT: 6500000,
    estimatedBudgetUSD: 53000,
    raisedBDT: 1950000,
    raisedUSD: 16000,
    statusEn: 'Fundraising',
    statusBn: 'তহবিল সংগ্রহ চলছে',
    image: '/images/project-alo-eye-care.jpg',
    beneficiaryCountEn: '15,000+ Rural Patients Annually',
    beneficiaryCountBn: 'বাৎসরিক ১৫,০০০+ গ্রামীণ রোগী',
    descriptionEn: 'Establishing a dedicated charitable eye and maternal care unit in the poverty-stricken northern riverine belt, offering 100% free cataract surgeries, optical glasses, and emergency infant care.',
    descriptionBn: 'উত্তরাঞ্চলের অতি দরিদ্র চরাঞ্চলের অসহায় প্রবীণদের চোখের ছানি অপারেশন ও শিশুদের জরুরি চিকিৎসা নিশ্চিতে একটি স্থায়ী দাতব্য চক্ষু ও শিশু ক্লিনিক প্রতিষ্ঠা করা হচ্ছে।',
    highlightsEn: [
      '500+ free lens transplant surgeries per year',
      'Mobile medical outreach van for remote river islands',
      'Subsidized emergency medicine & diagnostics lab',
      'Permanent Sadaqah Jariyah ward naming for major donors'
    ],
    highlightsBn: [
      'প্রতি বছর ৫০০+ বিনামূল্যে চোখের লেন্স প্রতিস্থাপন',
      'বিচ্ছিন্ন চরাঞ্চলের জন্য মোবাইল মেডিকেল অ্যাম্বুলেন্স ভ্যান',
      'বিনামূল্যে জরুরি ওষুধ ও ডায়াগনস্টিক সুবিধা',
      'দাতা ও মরহুমদের নামে আজীবন সদকায়ে জারিয়াহ ওয়ার্ড'
    ]
  },
  {
    id: 'proj-03',
    titleEn: 'Sustainable Water & Sanitation Grid (100 Solar Wells)',
    titleBn: 'চরাঞ্চলে ১০০টি গভীর সৌরচালিত সুপেয় পানি ও স্যানিটেশন গ্রিড',
    categoryEn: 'Clean Water Project',
    categoryBn: 'বিশুদ্ধ খাবার পানি প্রকল্প',
    targetDateEn: 'Ramadan 2026',
    targetDateBn: 'রমজান ২০২৬',
    locationEn: 'Sunamganj Haor & Gaibandha',
    locationBn: 'সুনামগঞ্জ হাওরাঞ্চল ও গাইবান্ধা',
    estimatedBudgetBDT: 4500000,
    estimatedBudgetUSD: 37000,
    raisedBDT: 2400000,
    raisedUSD: 19500,
    statusEn: 'Commencing Soon',
    statusBn: 'শীঘ্রই শুরু হবে',
    image: '/images/clean-water-well.jpg',
    beneficiaryCountEn: '40,000+ Villagers',
    beneficiaryCountBn: '৪০,০০০+ সুবিধাবঞ্চিত মানুষ',
    descriptionEn: 'Installing 100 deep arsenic-free solar-powered community filtration water plants across remote waterlogged haor regions and flood-prone northern sandbars.',
    descriptionBn: 'আর্সেনিক ও পানিবাহিত রোগমুক্ত রাখতে দুর্গম হাওর ও চর অঞ্চলে ১০০টি সৌরবিদ্যুৎ চালিত গভীর নলকূপ ও স্থায়ী ওজুখানা এবং ফিল্টারিং প্ল্যান্ট স্থাপন।',
    highlightsEn: [
      'Arsenic-free deep aquifer testing (up to 750ft)',
      'Solar-automated pumping system with storage tanks',
      'Separate hygienic ablution facility for community mosques',
      'Individual engraved brass plaque with donor/family name'
    ],
    highlightsBn: [
      '৭৫০ ফুট গভীর স্তরের আর্সেনিকমুক্ত ভূগর্ভস্থ পানি পরীক্ষা',
      'সৌরচালিত স্বয়ংক্রিয় পাম্প ও বিশুদ্ধ পানির রিজার্ভার',
      'মসজিদ ও মাদরাসা সংলগ্ন পরিচ্ছন্ন ওজুখানা ও ওয়াশ ব্লক',
      'দানকারী বা মরহুম পিতা-মাতার নামে স্থায়ী ধাতব নামফলক'
    ]
  },
  {
    id: 'proj-04',
    titleEn: 'Widow Livelihood & Tailoring Training Center',
    titleBn: 'অসহায় বিধবা ও দুস্থ নারীদের সেলাই প্রশিক্ষণ ও স্বাবলম্বীকরণ কেন্দ্র',
    categoryEn: 'Zakat Self-Reliance',
    categoryBn: 'যাকাত স্বাবলম্বীকরণ কর্মসূচি',
    targetDateEn: 'Early 2027',
    targetDateBn: 'শুরু ২০২৭',
    locationEn: 'Bagerhat & Jamalpur',
    locationBn: 'বাগেরহাট ও জামালপুর',
    estimatedBudgetBDT: 3200000,
    estimatedBudgetUSD: 26000,
    raisedBDT: 850000,
    raisedUSD: 7000,
    statusEn: 'In Planning',
    statusBn: 'পরিকল্পনাধীন',
    image: '/images/resilient-mother-portrait.jpg',
    beneficiaryCountEn: '300 Widowed Families',
    beneficiaryCountBn: '৩০০টি এতিম পরিবার',
    descriptionEn: 'Empowering destitute mothers and widows with free tailoring skills, providing each graduate with a brand-new sewing machine and raw cloth fabric to build independent household income.',
    descriptionBn: 'স্বামীহারা অসহায় মায়েদের দক্ষ সেলাই প্রশিক্ষণ প্রদান এবং সফল প্রশিক্ষণ শেষে বিনামূল্যে সেলাই মেশিন ও কাপড় দিয়ে স্বাবলম্বী করে তোলা, যাতে তারা এতিম সন্তানদের নিজের পায়ে মানুষ করতে পারে।',
    highlightsEn: [
      '3-month rigorous tailoring and embroidery curriculum',
      'Free brand-new industrial sewing machine upon graduation',
      'Seed capital for household garment business',
      'Continuous mentorship and direct cloth order supply'
    ],
    highlightsBn: [
      '৩ মাসের পেশাদার সেলাই ও নকশিকাঁথা প্রশিক্ষণ কোর্স',
      'কোর্স শেষে প্রত্যেককে নতুন হেভি-ডিউটি সেলাই মেশিন প্রদান',
      'ব্যবসা শুরু করার প্রাথমিক কাপড়ের পুঁজি অনুদান',
      'তৈরি পোশাক বিক্রির স্থানীয় বাজার ও অর্ডার সংযোগ'
    ]
  }
];

export default function UpcomingProjectsPage() {
  const { language, currency } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects = filterCategory === 'all'
    ? UPCOMING_PROJECTS
    : UPCOMING_PROJECTS.filter(p => p.id === filterCategory);

  const handlePledgeClick = (projectTitle: string) => {
    openPaymentModal({
      amount: currency === 'BDT' ? 5000 : 50,
      currency,
      cause: `Upcoming Project Contribution: ${projectTitle}`
    });
  };

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[64px] sm:pt-[80px] min-h-screen">
      {/* Hero Header */}
      <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-10 pb-14 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">
              construction
            </span>
            <span>
              {isBn
                ? 'স্থায়ী সদকায়ে জারিয়াহ ও ভবিষ্যৎ মানবিক কর্মপরিকল্পনা'
                : 'Sustainable Sadaqah Jariyah & Future Vision'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight leading-tight max-w-4xl mx-auto">
            {isBn ? (
              <>
                আমাদের আসন্ন প্রকল্পসমূহ —{' '}
                <span className="text-amber-600">চিরস্থায়ী কল্যাণের পথে অংশীদার হোন</span>
              </>
            ) : (
              <>
                Upcoming Strategic Projects —{' '}
                <span className="text-amber-600">Invest in Enduring Sadaqah Jariyah</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'সাময়িক ত্রাণের পাশাপাশি প্রান্তিক মানুষের ভাগ্য চিরতরে বদলে দিতে GMCF গ্রহণ করেছে দীর্ঘমেয়াদী স্থায়ী অবকাঠামো প্রকল্প। আপনার যাকাত, দান ও সদকায়ে জারিয়াহ দিয়ে এই মহতী উদ্যোগগুলোতে শরিক হোন।'
              : 'Beyond emergency relief, GMCF is committed to enduring institutional infrastructure. Join hands as a founding sponsor and build permanent sources of continuous reward.'}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#project-grid"
              className="px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              <span>{isBn ? 'প্রকল্পগুলো দেখুন' : 'Explore Projects'}</span>
            </a>
            <button
              type="button"
              onClick={() => handlePledgeClick('General Upcoming Projects Fund')}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>{isBn ? 'প্রকল্পে অনুদান দিন' : 'Support A Project'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="project-grid" className="w-full px-4 sm:px-8 py-12 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              {isBn ? 'বাস্তবায়নাধীন ও পরিকল্পিত রূপরেখা' : 'Strategic Pipeline'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
              {isBn ? 'শীঘ্রই শুরু হতে যাওয়া বৃহৎ কার্যক্রম' : 'Major Projects Awaiting Launch'}
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isBn ? `সকল প্রকল্প (${UPCOMING_PROJECTS.length})` : `All Projects (${UPCOMING_PROJECTS.length})`}
            </button>
            {UPCOMING_PROJECTS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFilterCategory(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterCategory === p.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isBn ? p.categoryBn : p.categoryEn}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => {
            const budget = currency === 'BDT' ? project.estimatedBudgetBDT : project.estimatedBudgetUSD;
            const raised = currency === 'BDT' ? project.raisedBDT : project.raisedUSD;
            const percentage = Math.min(100, Math.round((raised / budget) * 100));
            const symbol = currency === 'BDT' ? '৳' : '$';

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header with Dark Green Divider Bar & Circular Emblem (Exact User Screenshot Design) */}
                <div className="relative">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100 rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={isBn ? project.titleBn : project.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                      <span className="bg-[#144d46] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {isBn ? project.categoryBn : project.categoryEn}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                        {isBn ? project.statusBn : project.statusEn}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot-Identical Bottom Divider: Horizontal line from left, wrapping around circular badge, and sweeping upward to right corner */}
                  <div className="relative w-full h-0">
                    <svg
                      viewBox="0 0 400 40"
                      className="absolute -top-[20px] left-0 w-full h-[40px] pointer-events-none z-10 overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <line x1="0" y1="20" x2="326" y2="20" stroke="#144d46" strokeWidth="2.5" />
                      <path d="M 374 20 Q 387 20 400 8" fill="none" stroke="#144d46" strokeWidth="2.5" />
                    </svg>

                    {/* Circular Emblem Badge overlapping bottom-right corner (Exact User Screenshot Design) */}
                    <div
                      className="absolute -top-7 right-3 w-14 h-14 rounded-full bg-white border-[2.5px] border-[#144d46] shadow-md flex items-center justify-center p-1.5 z-20 group-hover:scale-110 transition-transform duration-300"
                      title="GMCF Verified Project"
                    >
                      <img
                        src="/images/gmcf-logo-emblem.png"
                        alt="GMCF"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 pt-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Prominent "প্রজেক্ট নং" exactly as in screenshot */}
                    <div className="flex items-center gap-1.5 pr-16 mb-2">
                      <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        {isBn ? 'প্রজেক্ট নং' : 'Project No'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-[#0a3d40]">
                        : {project.id.toUpperCase().replace('PROJ-', '')}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-slate-900 group-hover:text-[#0e4d36] transition-colors leading-snug">
                      {isBn ? project.titleBn : project.titleEn}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-amber-600">location_on</span>
                        {isBn ? project.locationBn : project.locationEn}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-amber-600">calendar_month</span>
                        {isBn ? `টার্গেট: ${project.targetDateBn}` : `Target: ${project.targetDateEn}`}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {isBn ? project.descriptionBn : project.descriptionEn}
                    </p>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1 text-[#0e4d36]">
                          <span className="material-symbols-outlined text-[15px]">groups</span>
                          {isBn ? `উপকারভোগী: ${project.beneficiaryCountBn}` : `Beneficiaries: ${project.beneficiaryCountEn}`}
                        </span>
                        <span className="text-[#0e4d36]">{percentage}% সংগ্রহ হয়েছে</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0e4d36] to-amber-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1.5">
                        <span>সংগৃহীত: {symbol}{raised.toLocaleString()}</span>
                        <span>মোট প্রাক্কলিত বাজেট: {symbol}{budget.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                        {isBn ? 'প্রকল্পের প্রধান সুবিধাসমূহ:' : 'Key Project Features:'}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {(isBn ? project.highlightsBn : project.highlightsEn).map((h, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[#0e4d36] text-[16px] shrink-0 mt-0.5">
                              check_circle
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePledgeClick(isBn ? project.titleBn : project.titleEn)}
                      className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0e4d36] to-teal-800 hover:from-emerald-950 hover:to-teal-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                      <span>{isBn ? 'এই প্রকল্পে সদকা/দান করুন' : 'Contribute to this Project'}</span>
                    </button>
                    <Link
                      href="/gallery"
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">photo_library</span>
                      <span>{isBn ? 'ছবির গ্যালারি' : 'Gallery'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-800/40">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              <span>{isBn ? 'দাতা সম্মাননা ও নামফলক' : 'Permanent Donor Recognition'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-heading">
              {isBn
                ? 'আপনার বা প্রিয়জনের নামে স্থায়ী সদকায়ে জারিয়াহ ফলক'
                : 'Dedicate a Ward, Classroom, or Tube Well in Honor of Your Loved Ones'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isBn
                ? 'যেকোনো আসন্ন প্রকল্পে উল্লেখযোগ্য অবদান রাখলে কমপ্লেক্স বা ভবনে আজীবন সম্মাননামূলক নামফলক খোদাই করে দেওয়া হয়। প্রতি বছর অডিট ও দৃশ্যমান অগ্রগতির ভিডিও প্রতিবেদন সরাসরি আপনার কাছে পৌঁছে দেওয়া হবে।'
                : 'Major contributions receive permanent commemorative dedication plaques, detailed quarterly engineering progress dispatches, and official charitable deed certificates.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handlePledgeClick('Named Memorial Sadaqah Jariyah Pledge')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{isBn ? 'স্থায়ী ফলকসহ দান করুন' : 'Sponsor with Name Plaque'}</span>
            </button>
            <Link
              href="/gallery"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>{isBn ? 'চলমান কাজের ছবি' : 'View Ongoing Work'}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

