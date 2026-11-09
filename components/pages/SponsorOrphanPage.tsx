'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

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
      'Islamic moral education & Quran Hifz',
      'Routine healthcare & essential medicine',
      'Quarterly progress report with photos'
    ],
    benefitsBn: [
      'দৈনিক ৩ বেলা স্বাস্থ্যসম্মত সুষম পুষ্টিকর খাবার',
      'স্কুল/মাদরাসার বেতন, বই ও খাতা-কলম সরবরাহ',
      'কুরআন হেফজ ও নৈতিক ইসলামি শিক্ষা',
      'নিয়মিত ডাক্তার চেকাআপ ও জরুরি ওষুধ',
      'ত্রৈমাসিক অগ্রগতি রিপোর্ট ও ছবি প্রদান'
    ]
  },
  {
    id: 'monthly-full',
    titleEn: 'Complete Residential Guardianship',
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
      'Full 12-month care, protection & living expenses',
      'Complete school & Madrasah academic year',
      'Comprehensive annual medical coverage',
      'Winter warm jackets, blankets & shoes',
      'Official GMCF Orphan Guardian Certificate',
      'Exclusive personalized video greeting'
    ],
    benefitsBn: [
      'সম্পূর্ণ ১২ মাসের থাকা-খাওয়া, চিকিৎসা ও পোশাক',
      'পুরো ১ শিক্ষাবর্ষের সকল শিক্ষা ব্যয় ও মাদরাসা ফি',
      'পূর্ণাঙ্গ বাৎসরিক মেডিকেল চেকআপ ও স্বাস্থ্যবীমা',
      'শীতবস্ত্র, কম্বল ও নতুন জুতা প্রদান',
      'অফিশিয়াল GMCF এতিম অভিভাবক সম্মাননা সনদ',
      'শিশুর পক্ষ থেকে ব্যক্তিগত ভিডিও শুভেচ্ছা বার্তা'
    ]
  }
];

const ORPHAN_PROFILES = [
  {
    id: 'GMCF-ORP-01',
    nameEn: 'Hafizul Islam',
    nameBn: 'হাফিজুল ইসলাম',
    age: 9,
    locationEn: 'Kurigram, Rangpur',
    locationBn: 'কুড়িগ্রাম, রংপুর',
    dreamEn: 'Wants to become a Quran Hafiz & Islamic Teacher',
    dreamBn: 'কুরআন হাফেজ ও দ্বীনি শিক্ষক হতে চায়',
    storyEn: 'Lost his father to river erosion illness in 2022. Lives under GMCF residential supervision with full dedication.',
    storyBn: '২০২২ সালে নদীভাঙন ও অসুস্থতায় বাবাকে হারায়। বর্তমানে GMCF তত্ত্বাবধানে অত্যন্ত আন্তরিকতার সাথে পড়ছে।',
    image: '/images/drive-orphan-1.jpg',
    statusEn: 'Needs Immediate Sponsor',
    statusBn: 'জরুরি স্পনসর প্রয়োজন'
  },
  {
    id: 'GMCF-ORP-02',
    nameEn: 'Abdullah Al Noman',
    nameBn: 'আবদুল্লাহ আল নোমান',
    age: 11,
    locationEn: 'Gaibandha, Northern BD',
    locationBn: 'গাইবান্ধা, উত্তরবঙ্গ',
    dreamEn: 'Dreams of becoming an engineer to rebuild flood homes',
    dreamBn: 'বন্যাদুর্গত এলাকার ঘরবাড়ি তৈরি করতে প্রকৌশলী হতে চায়',
    storyEn: 'Both parents passed away during severe winter cold wave. Extremely bright student memorizing 15 Para Quran.',
    storyBn: 'তীব্র শৈত্যপ্রবাহে পিতা-মাতা দুজনকেই হারায়। অত্যন্ত মেধাবী, ইতোমধ্যে ১৫ পারা কুরআন হিফজ সম্পন্ন করেছে।',
    image: '/images/drive-orphan-2.jpg',
    statusEn: 'Needs Immediate Sponsor',
    statusBn: 'জরুরি স্পনসর প্রয়োজন'
  },
  {
    id: 'GMCF-ORP-03',
    nameEn: 'Tariqul Islam',
    nameBn: 'তরিকুল ইসলাম',
    age: 8,
    locationEn: 'Sunamganj Haor Region',
    locationBn: 'সুনামগঞ্জ হাওরাঞ্চল',
    dreamEn: 'Dreams of becoming a compassionate doctor for poor villagers',
    dreamBn: 'দরিদ্র গ্রামবাসীদের বিনামূল্যে চিকিৎসা দিতে ডাক্তার হতে চায়',
    storyEn: 'Orphaned in 2023 flash floods. Loves mathematics and recitation, needing food and uniform support.',
    storyBn: '২০২৩ সালের পাহাড়ি ঢল ও বন্যায় পিতৃহীন হয়। অংকে ভীষণ মনোযোগী এবং নিয়মিত খাদ্য সহায়তা প্রয়োজন।',
    image: '/images/drive-orphan-3.jpg',
    statusEn: 'Needs Immediate Sponsor',
    statusBn: 'জরুরি স্পনসর প্রয়োজন'
  },
  {
    id: 'GMCF-ORP-04',
    nameEn: 'Zubair Hossain',
    nameBn: 'জুবায়ের হোসেন',
    age: 10,
    locationEn: 'Sirajganj Jamuna Basin',
    locationBn: 'সিরাজগঞ্জ যমুনা পাড়',
    dreamEn: 'Wants to lead prayers in Mecca and teach impoverished children',
    dreamBn: 'মক্কায় ইমামতি করতে চায় ও সুবিধাবঞ্চিত শিশুদের কুরআন শেখাতে চায়',
    storyEn: 'Rescued from absolute poverty after losing breadwinner father. Active, disciplined, and memorizing Quran daily.',
    storyBn: 'উপার্জনক্ষম পিতাকে হারিয়ে চরম সংকটে পড়েছিল। বর্তমানে সম্পূর্ণ সুরক্ষিত পরিবেশে পড়াশোনা চালিয়ে যাচ্ছে।',
    image: '/images/drive-orphan-4.jpg',
    statusEn: 'Needs Immediate Sponsor',
    statusBn: 'জরুরি স্পনসর প্রয়োজন'
  }
];

export default function SponsorOrphanPage() {
  const { language, currency } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  const [selectedOrphan, setSelectedOrphan] = useState<string | null>(null);

  const handleSponsorClick = (planTitle: string, amountBDT: number, amountUSD: number) => {
    const amount = currency === 'BDT' ? amountBDT : amountUSD;
    openPaymentModal({
      amount,
      currency,
      cause: `Sponsor An Orphan: ${planTitle}`
    });
  };

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[93px] sm:pt-[101px] min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-8 pb-12 lg:pt-10 lg:pb-14 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-amber-600">
              favorite
            </span>
            <span>
              {isBn
                ? 'রাসূলুল্লাহ (ﷺ) এর সুন্নাহ — এতিমের অভিভাবকত্ব গ্রহণ'
                : 'Prophetic Sunnah — Guardian of an Orphan'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight leading-tight max-w-4xl mx-auto">
            {isBn ? (
              <>
                একটি এতিম শিশুর মুখে হাসি ফোটান,{' '}
                <span className="text-amber-600">জান্নাতে রাসূল (ﷺ)-এর সঙ্গী হোন</span>
              </>
            ) : (
              <>
                Sponsor a Vulnerable Orphan &amp;{' '}
                <span className="text-amber-600">Earn Eternal Jannah with the Prophet (ﷺ)</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'হাদিস শরিফে এসেছে: "আমি এবং এতিমের প্রতিপালনকারী জান্নাতে এভাবে থাকব" (তর্জনী ও মধ্যমা আঙুল একত্র করে দেখালেন) — সহিহ বুখারি। আপনার সামান্য মাসিক সহযোগিতা একটি অসহায় শিশুর সমগ্র ভবিষ্যৎ বদলে দিতে পারে।'
              : 'The Prophet Muhammad (ﷺ) said: "I and the person who looks after an orphan and provides for him, will be in Paradise like this," putting his index and middle fingers together. (Sahih al-Bukhari).'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#sponsorship-plans"
              className="px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>{isBn ? 'স্পনসরশিপ প্যাকেজ দেখুন' : 'Choose Sponsorship Plan'}</span>
            </a>
            <a
              href="#orphan-profiles"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">child_care</span>
              <span>{isBn ? 'শিশুদের তালিকা ও প্রোফাইল' : 'View Waiting Children'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Waiting Children Profiles */}
      <section id="orphan-profiles" className="w-full px-4 sm:px-8 py-12 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            {isBn ? 'অপেক্ষমাণ এতিম সন্তান' : 'Immediate Need'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
            {isBn ? 'যাদের জন্য অভিভাবকত্ব প্রয়োজন' : 'Children Awaiting Compassionate Guardians'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {isBn
              ? 'নিচের প্রতিটি শিশু পিতা অথবা পিতা-মাতা উভয়কে হারিয়ে চরম অনিশ্চয়তার মধ্যে দিন কাটাচ্ছে। আপনার একটি সিদ্ধান্তই তাদের নিরাপদ ভবিষ্যৎ নিশ্চিত করবে।'
              : 'Each child below has lost their primary breadwinner or both parents to disasters, poverty, or terminal illness.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ORPHAN_PROFILES.map(child => (
            <div
              key={child.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={child.image}
                  alt={isBn ? child.nameBn : child.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {isBn ? child.statusBn : child.statusEn}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {child.id}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {isBn ? child.nameBn : child.nameEn}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {isBn ? `${child.age} বছর` : `Age ${child.age}`}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                    {isBn ? child.locationBn : child.locationEn}
                  </p>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {isBn ? child.storyBn : child.storyEn}
                  </p>

                  <div className="mt-3 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      {isBn ? 'স্বপ্ন ও আকাঙ্ক্ষা:' : 'Dream & Goal:'}
                    </span>
                    <span className="text-xs text-amber-950 font-medium">
                      {isBn ? child.dreamBn : child.dreamEn}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const childName = isBn ? child.nameBn : child.nameEn;
                    openPaymentModal({
                      amount: currency === 'BDT' ? 3500 : 30,
                      currency,
                      cause: `Orphan Sponsorship for ${childName} (${child.id})`
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                  <span>{isBn ? 'এই শিশুকে স্পনসর করুন' : `Sponsor ${child.nameEn.split(' ')[0]}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsorship Pricing Plans */}
      <section id="sponsorship-plans" className="w-full bg-slate-900 text-white py-16 px-4 sm:px-8 border-y border-slate-800 shadow-xl">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              {isBn ? 'স্বচ্ছ ও বারাকাহময় স্পনসরশিপ' : 'Sustainable Support Packages'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-heading">
              {isBn ? 'আপনার সামর্থ্য অনুযায়ী প্যাকেজ বেছে নিন' : 'Choose Your Monthly or Yearly Plan'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              {isBn
                ? 'সকল অনুদান ১০০% যাকাত ও সদকাহ গণ্য হবে। EPS গেটওয়ের মাধ্যমে বিকাশ, নগদ, রকেট অথবা যেকোনো কার্ডে নিরাপদে অনুদান দেওয়া যাবে।'
                : '100% donation policy with zero administrative deduction. Eligible for Zakat & Sadaqah Jariyah.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map(plan => {
              const amount = currency === 'BDT' ? plan.amountBDT : plan.amountUSD;
              const symbol = currency === 'BDT' ? '৳' : '$';

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-b from-emerald-900 via-teal-950 to-slate-950 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] transform md:-translate-y-2'
                      : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <div>
                    {plan.featured && (
                      <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow">
                        {isBn ? 'সর্বাধিক ফলপ্রসূ ও জনপ্রিয়' : 'Most Recommended'}
                      </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif-heading">
                      {isBn ? plan.titleBn : plan.titleEn}
                    </h3>

                    <div className="my-5 pb-5 border-b border-white/10 flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">
                        {symbol}{amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        / {isBn ? plan.periodBn : plan.periodEn}
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                      {(isBn ? plan.benefitsBn : plan.benefitsEn).map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() =>
                        handleSponsorClick(
                          isBn ? plan.titleBn : plan.titleEn,
                          plan.amountBDT,
                          plan.amountUSD
                        )
                      }
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        plan.featured
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold hover:shadow-amber-500/30'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>{isBn ? 'এই প্যাকেজে দান করুন' : 'Sponsor this Package'}</span>
                    </button>
                    <span className="block text-center text-[10px] text-slate-400 mt-2">
                      {isBn ? 'EPS গেটওয়ের মাধ্যমে তাৎক্ষণিক ট্রানজেকশন' : 'Instant & secure checkout via EPS Gateway'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency Guarantee */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-14">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified_user</span>
              {isBn ? '১০০% স্বচ্ছতা ও নিয়মিত রিপোর্ট' : '100% Transparency & Direct Reports'}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-heading">
              {isBn ? 'আপনার দানকৃত অর্থের প্রতিটি পয়সার জবাবদিহিতা' : 'Every Penny Accounted For With Direct Field Records'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isBn
                ? 'স্পনসর করার পর আপনি শিশুর নাম, ছবি, স্কুলের পরীক্ষার ফলাফল ও শারীরিক সুস্থতার ত্রৈমাসিক প্রগ্রেস রিপোর্ট পাবেন। যে কোনো সময় সেন্ট্রাল মাদরাসা বা হোমে এসে শিশুর সাথে সাক্ষাৎ করতে পারবেন।'
                : 'As a sponsor, you receive an official orphan identification profile, quarterly academic cards, medical reports, and handwritten letters or drawings from the child.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/gallery"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>{isBn ? 'এতিমখানার ছবি দেখুন' : 'View Orphan Gallery'}</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{isBn ? 'সরাসরি যোগাযোগ করুন' : 'Contact Coordinator'}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
