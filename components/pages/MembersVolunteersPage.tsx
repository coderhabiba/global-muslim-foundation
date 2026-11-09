'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

type Member = {
  id: string;
  nameEn: string;
  nameBn: string;
  roleEn: string;
  roleBn: string;
  departmentEn: string;
  departmentBn: string;
  locationEn: string;
  locationBn: string;
  image: string;
  phone?: string;
  email?: string;
  bioEn: string;
  bioBn: string;
  category: 'board' | 'management' | 'volunteer';
};

const TEAM_MEMBERS: Member[] = [
  // Chairman & Board
  {
    id: 'm1',
    category: 'board',
    nameEn: 'Mohammad Ali Mostafa',
    nameBn: 'মোহাম্মদ আলী মোস্তফা',
    roleEn: 'Chairman & Founder',
    roleBn: 'চেয়ারম্যান ও প্রতিষ্ঠাতা',
    departmentEn: 'Governing Board of Trustees',
    departmentBn: 'পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড',
    locationEn: '99, Kaisharchor, Vakurta, Savar, Dhaka',
    locationBn: '৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা',
    image: '/images/humanitarian-volunteers.jpg',
    phone: '01913119525',
    email: 'gmcfoundation2022@gmail.com',
    bioEn: 'Pioneering humanitarian leadership, ensuring 100% Shariah-compliance and zero-cost administration across all charitable endeavors.',
    bioBn: 'ফাউন্ডেশনের দূরদর্শী অভিভাবক ও দিকনির্দেশক। শতভাগ স্বচ্ছতা ও জিরো অ্যাডমিন খরচে প্রতিটি সহায়তা সরাসরি দুস্থদের কাছে পৌঁছে দিতে অগ্রণী ভূমিকা পালন করছেন।',
  },
  {
    id: 'm2',
    category: 'board',
    nameEn: 'Mufti Mawlana Abdul Quddus',
    nameBn: 'মুফতি মাওলানা আব্দুল কুদ্দুস',
    roleEn: 'Chief Shariah Advisor',
    roleBn: 'প্রধান শরীয়াহ উপদেষ্টা ও অডিটর',
    departmentEn: 'Central Shariah Supervisory Board',
    departmentBn: 'কেন্দ্রীয় শরীয়াহ বোর্ড',
    locationEn: 'Dhaka, Bangladesh',
    locationBn: 'ঢাকা, বাংলাদেশ',
    image: '/images/rural-madrasa-children.jpg',
    bioEn: 'Oversees the religious legitimacy of Zakat collection, Nisab valuation, and direct Tamleek distribution to qualified Asnaf.',
    bioBn: 'যাকাতের হকদার ও তামলিক নির্ধারণ, নিসাব মূল্যায়ন এবং প্রতিটি তহবিল বণ্টনে পূর্ণ শরীয়াহ নীতিমালার কঠোর তত্ত্বাবধানকারী।',
  },
  {
    id: 'm3',
    category: 'board',
    nameEn: 'Barrister Farhan Chowdhury',
    nameBn: 'ব্যারিস্টার ফারহান চৌধুরী',
    roleEn: 'Legal & Compliance Director',
    roleBn: 'আইন ও কমপ্লায়েন্স পরিচালক',
    departmentEn: 'NGO Affairs & Legal Cell',
    departmentBn: 'আইন ও এনজিও ব্যুরো সেল',
    locationEn: 'Supreme Court & Savar Office',
    locationBn: 'সুপ্রিম কোর্ট ও সাভার অফিস',
    image: '/images/resilient-mother-portrait.jpg',
    bioEn: 'Ensures compliance with NGO Affairs Bureau, anti-money laundering (AML) frameworks, and annual transparent statutory audits.',
    bioBn: 'এনজিও বিষয়ক ব্যুরো, বার্ষিক বিধিবদ্ধ অডিট এবং আন্তর্জাতিক অনুদান মনিটরিং নিশ্চিতকরণ।',
  },

  // Management & Coordinators
  {
    id: 'm4',
    category: 'management',
    nameEn: 'Engr. Mahmudur Rahman',
    nameBn: 'প্রকৌশলী মাহমুদুর রহমান',
    roleEn: 'Field Operations & WASH Lead',
    roleBn: 'ফিল্ড অপারেশন ও সুপেয় পানি প্রকল্প সমন্বয়ক',
    departmentEn: 'Engineering & Construction Cell',
    departmentBn: 'প্রকৌশল ও পুনর্বাসন সেল',
    locationEn: 'Sunamganj & Kurigram Outposts',
    locationBn: 'সুনামগঞ্জ ও কুড়িগ্রাম ক্যাম্প',
    image: '/images/clean-water-well.jpg',
    bioEn: 'Leads deep tube well drillings, shelter constructions, and disaster emergency logistics on the ground.',
    bioBn: 'চরাঞ্চল ও বন্যাদুর্গত এলাকায় গভীর নলকূপ স্থাপন, ঘর নির্মাণ ও টেকনিক্যাল টিম পরিচালনা করেন।',
  },
  {
    id: 'm5',
    category: 'management',
    nameEn: 'Dr. Shahana Akhter',
    nameBn: 'ডাঃ শাহানা আক্তার',
    roleEn: 'Medical Outreach Director',
    roleBn: 'চিকিৎসা ও শিশু স্বাস্থ্য পরিচালক',
    departmentEn: 'Project Alo Pediatric Cell',
    departmentBn: 'প্রজেক্ট আলো মেডিকেল টিম',
    locationEn: 'Dhaka & Rural Camps',
    locationBn: 'ঢাকা ও ফিল্ড মেডিকেল ক্যাম্প',
    image: '/images/pediatric-hope-saifan.jpg',
    bioEn: 'Organizes pediatric surgery pipelines, free cataract surgical sessions, and nutritional care.',
    bioBn: 'দৃষ্টিহীনদের চোখের ছানি অপারেশন ও শিশুদের জরুরি সার্জারি তত্ত্বাবধানে নিবেদিত।',
  },
  {
    id: 'm6',
    category: 'management',
    nameEn: 'Tanvir Hossain',
    nameBn: 'তানভীর হোসেন',
    roleEn: 'Relief & Emergency Food Coordinator',
    roleBn: 'খাদ্য ও জরুরি ত্রাণ সমন্বয়ক',
    departmentEn: 'One Meal One Hope Initiative',
    departmentBn: 'ওয়ান মিল ওয়ান হোপ প্রোগ্রাম',
    locationEn: 'Savar Outreach Kitchen',
    locationBn: 'সাভার কেন্দ্রীয় রান্নাঘর',
    image: '/images/street-children-hot-meals.jpg',
    bioEn: 'Supervises kitchen hygiene, ingredient procurement, and volunteer hot meal distribution routes.',
    bioBn: 'পথশিশু ও অনাহারী মানুষের জন্য প্রতিদিন খাবার রান্না ও বিতরণ নেটওয়ার্ক তদারকি করেন।',
  },

  // Lead Volunteer Force
  {
    id: 'v1',
    category: 'volunteer',
    nameEn: 'Zubair Al Mamun',
    nameBn: 'জুবায়ের আল মামুন',
    roleEn: 'Volunteer Team Captain (Dhaka North)',
    roleBn: 'স্বেচ্ছাসেবী দলনেতা (ঢাকা উত্তর)',
    departmentEn: 'Youth Volunteer Brigade',
    departmentBn: 'যুব ভলান্টিয়ার ফোর্স',
    locationEn: 'Savar, Ashulia & Mirpur',
    locationBn: 'সাভার, আশুলিয়া ও মিরপুর',
    image: '/images/youth-volunteers.jpg',
    bioEn: 'Directs on-ground student volunteers during flood relief distributions and emergency packing.',
    bioBn: 'বন্যা ও শীতবস্ত্র বিতরণে শিক্ষার্থী স্বেচ্ছাসেবকদের সরাসরি মাঠে সমন্বয় করেন।',
  },
  {
    id: 'v2',
    category: 'volunteer',
    nameEn: 'Ayesha Siddiqua',
    nameBn: 'আয়েশা সিদ্দিকা',
    roleEn: 'Orphan Care & Daycare Specialist',
    roleBn: 'এতিম পরিচর্যা ও শিশু সুরক্ষা সমন্বয়ক',
    departmentEn: 'Child Welfare Division',
    departmentBn: 'শিশু কল্যাণ ও স্পনসরশিপ শাখা',
    locationEn: 'Keraniganj & Tongi',
    locationBn: 'কেরানীগঞ্জ ও টঙ্গী কেন্দ্র',
    image: '/images/drive-orphan-2.jpg',
    bioEn: 'Dedicated to education counseling, healthcare monitoring, and safe child shelter programs.',
    bioBn: 'এতিম ও পথশিশুদের মানসিক যত্ন, শিক্ষা সামগ্রী পৌঁছানো ও পারিবারিক পুনর্বাসনে কাজ করছেন।',
  },
  {
    id: 'v3',
    category: 'volunteer',
    nameEn: 'Kamrul Hasan',
    nameBn: 'কামরুল হাসান',
    roleEn: 'Field Photographer & Logistics Lead',
    roleBn: 'ফিল্ড ফটোগ্রাফি ও লজিস্টিক সমন্বয়ক',
    departmentEn: 'Media & Field Documentation',
    departmentBn: 'মিডিয়া ও মাঠপর্যায়ের অডিট সেল',
    locationEn: 'Nationwide Field Dispatches',
    locationBn: 'দেশব্যাপী ফিল্ড নেটওয়ার্ক',
    image: '/images/railway-platform-children.jpg',
    bioEn: 'Captures authentic, unedited beneficiary documentation ensuring donor trust and full transparency.',
    bioBn: 'প্রতিটি সহায়তার সত্যতা যাচাই ও স্বচ্ছতার জন্য ছবি ও ফিল্ড রেকর্ড সংগ্রহ করেন।',
  },
  {
    id: 'v4',
    category: 'volunteer',
    nameEn: 'Sabbir Ahmed',
    nameBn: 'সাব্বির আহমেদ',
    roleEn: 'Rapid Rescue & Transport Coordinator',
    roleBn: 'জরুরি রেসকিউ ও পরিবহন সহকারী',
    departmentEn: 'Emergency Response Taskforce',
    departmentBn: 'জরুরি দুর্যোগ মোকাবেলা দল',
    locationEn: 'Feni, Noakhali & Sylhet',
    locationBn: 'ফেনী, নোয়াখালী ও সিলেট',
    image: '/images/volunteers-cooking-pots.jpg',
    bioEn: 'Operates rescue boats and logistics vans to navigate submerged remote villages during flash floods.',
    bioBn: 'বন্যা ও দুর্যোগে প্রত্যন্ত চরাঞ্চলে খাবার ও ওষুধ পৌঁছে দিতে উদ্ধারকারী দল পরিচালনা করেন।',
  },
];

export default function MembersVolunteersPage() {
  const { language } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  const [activeFilter, setActiveFilter] = useState<'all' | 'board' | 'management' | 'volunteer'>('all');

  const filteredMembers =
    activeFilter === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter(m => m.category === activeFilter);

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[96px] sm:pt-[104px] min-h-screen">
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-8 pb-12 lg:pt-10 lg:pb-14 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">
                group
              </span>
              <span>
                {isBn
                  ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — সদস্য ও স্বেচ্ছাসেবী টিম'
                  : 'Global Muslim Charitable Foundation — Members & Volunteers'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight">
              {isBn ? (
                <>
                  আমাদের পরিচালনা পর্ষদ ও{' '}
                  <span className="text-amber-600">নিবেদিতপ্রাণ স্বেচ্ছাসেবী দল</span>
                </>
              ) : (
                <>
                  Our Governing Board &amp;{' '}
                  <span className="text-amber-600">Devoted Volunteer Force</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'চেয়ারম্যান মোহাম্মদ আলী মোস্তফার নেতৃত্বে আলেম, প্রকৌশলী, চিকিৎসক এবং তরুণ স্বেচ্ছাসেবকদের একটি ঐক্যবদ্ধ দল নিরলসভাবে মানুষের সেবায় কাজ করে যাচ্ছে।'
                : 'Guided by Chairman Mohammad Ali Mostafa, our unified coalition of Islamic scholars, engineers, doctors, and vibrant youth volunteers delivers uncompromised humanitarian stewardship.'}
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                {isBn ? 'সবাই (সকল সদস্য ও ভলান্টিয়ার)' : 'All Members & Volunteers'}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('board')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === 'board'
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                {isBn ? 'পরিচালনা পর্ষদ ও ট্রাস্টি' : 'Governing Board & Trustees'}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('management')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === 'management'
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                {isBn ? 'প্রকল্প কর্মকর্তা ও সমন্বয়ক' : 'Management & Project Leads'}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('volunteer')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === 'volunteer'
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                {isBn ? 'স্বেচ্ছাসেবী ফিল্ড ফোর্স' : 'Field Volunteer Force'}
              </button>
            </div>
          </div>
        </section>

        {/* Chairman Featured Banner Card */}
        <section className="w-full px-4 sm:px-8 py-10 max-w-[1280px] mx-auto">
          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg relative bg-emerald-900">
              <img
                src="/images/humanitarian-volunteers.jpg"
                alt="Mohammad Ali Mostafa"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                CHAIRMAN
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>{isBn ? 'ফাউন্ডেশনের চেয়ারম্যানের বার্তা' : "Chairman's Statement"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-heading">
                {isBn ? 'মোহাম্মদ আলী মোস্তফা' : 'Mohammad Ali Mostafa'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                {isBn
                  ? 'চেয়ারম্যান, গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)'
                  : 'Chairman, Global Muslim Charitable Foundation (GMCF)'}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {isBn
                  ? '“আমাদের লক্ষ্য প্রতিটি যাকাত ও দানের টাকা সম্পূর্ণ পবিত্রভাবে সরাসরি সুবিধাবঞ্চিত ভাই-বোন ও শিশুদের কাছে পৌঁছে দেওয়া। আমাদের কোনো ব্যক্তিগত স্বার্থ বা উচ্চাকাঙ্ক্ষা নেই; শুধু আল্লাহর সন্তুষ্টি ও মানবতার কল্যাণে আমরা প্রতিটি পদক্ষেপে প্রতিশ্রুতিবদ্ধ।”'
                  : '"Our sacred duty is ensuring that every single penny of Zakat reaches the destitute with zero deduction. With absolute fear of Allah and full administrative transparency, we remain faithful servants of the vulnerable."'}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-emerald-300">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-amber-400">call</span>
                  01913119525
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-amber-400">mail</span>
                  gmcfoundation2022@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-amber-400">location_on</span>
                  {isBn ? 'সাভার, ঢাকা' : 'Savar, Dhaka'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="w-full px-4 sm:px-8 py-10 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMembers.map(member => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={member.image}
                    alt={isBn ? member.nameBn : member.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-sm ${
                        member.category === 'board'
                          ? 'bg-emerald-900/90 text-amber-300'
                          : member.category === 'management'
                          ? 'bg-teal-900/90 text-white'
                          : 'bg-amber-600/90 text-white'
                      }`}
                    >
                      {member.category === 'board'
                        ? isBn
                          ? 'পরিচালনা পর্ষদ'
                          : 'Trustee Board'
                        : member.category === 'management'
                        ? isBn
                          ? 'ব্যবস্থাপনা কর্মকর্তা'
                          : 'Management'
                        : isBn
                        ? 'স্বেচ্ছাসেবী টিম'
                        : 'Volunteer'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                        {isBn ? member.roleBn : member.roleEn}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-heading">
                        {isBn ? member.nameBn : member.nameEn}
                      </h3>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p className="font-medium text-emerald-800">
                        {isBn ? member.departmentBn : member.departmentEn}
                      </p>
                      <p className="flex items-center gap-1 text-[11px]">
                        <span className="material-symbols-outlined text-[13px] text-slate-400">
                          location_on
                        </span>
                        {isBn ? member.locationBn : member.locationEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {isBn ? member.bioBn : member.bioEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      {isBn ? 'সক্রিয় সেবায় নিয়োজিত' : 'Active Duty'}
                    </span>
                    <Link
                      href="/volunteer"
                      className="text-primary hover:underline font-bold inline-flex items-center gap-0.5 text-[11px]"
                    >
                      <span>{isBn ? 'যোগ দিন' : 'Join'}</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer Application Call to Action */}
        <section className="w-full px-4 sm:px-8 py-16 bg-[#eef8f2] border-t border-slate-200 mt-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white shadow-md">
              <span className="material-symbols-outlined text-[30px]">
                volunteer_activism
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif-heading">
              {isBn
                ? 'আপনিও আমাদের স্বেচ্ছাসেবী পরিবারের সদস্য হতে চান?'
                : 'Become an Honored GMCF Humanitarian Volunteer'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? 'জরুরি খাদ্য ও বস্ত্র বিতরণ, মেডিকেল ক্যাম্প, এতিম শিশু পরিচর্যা কিংবা মিডিয়া প্রচারে আপনার যেকোনো দক্ষতাকে মানবতার সেবায় কাজে লাগান।'
                : 'Lend your hands in disaster relief, food distribution, medical clinics, or digital advocacy to bring hope to the oppressed.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/volunteer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>{isBn ? 'স্বেচ্ছাসেবক আবেদন ফরম পূরণ করুন' : 'Apply to Volunteer'}</span>
              </Link>
              <button
                type="button"
                onClick={() => openPaymentModal({ amount: isBn ? 1000 : 25 })}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-emerald-900 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-600">favorite</span>
                <span>{isBn ? 'স্বেচ্ছাসেবক কার্যক্রমে অনুদান দিন' : 'Support Volunteer Operations'}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

