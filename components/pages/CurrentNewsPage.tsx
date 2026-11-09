'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

type NewsArticle = {
  id: string;
  categoryEn: string;
  categoryBn: string;
  titleEn: string;
  titleBn: string;
  dateEn: string;
  dateBn: string;
  readTimeEn: string;
  readTimeBn: string;
  excerptEn: string;
  excerptBn: string;
  image: string;
  featured?: boolean;
  contentEn: string[];
  contentBn: string[];
  tagEn: string;
  tagBn: string;
};

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-01',
    categoryEn: 'Emergency Response',
    categoryBn: 'জরুরি ত্রাণ তৎপরতা',
    titleEn: 'Emergency Food Distribution Reaches 2,500 Destitute Families Across Northern Bangladesh',
    titleBn: 'উত্তরবঙ্গের তীব্র শীত ও বন্যায় ক্ষতিগ্রস্ত ২,৫০০ পরিবারে GMCF-এর খাদ্য ও ত্রাণ বিতরণ সম্পন্ন',
    dateEn: 'November 8, 2026',
    dateBn: '৮ নভেম্বর, ২০২৬',
    readTimeEn: '4 min read',
    readTimeBn: '৪ মিনিট পঠন',
    tagEn: 'Field Report',
    tagBn: 'মাঠপর্যায়ের রিপোর্ট',
    image: '/images/drive-food-1.jpg',
    featured: true,
    excerptEn: 'Volunteers braved remote riverine chars to supply 30-day food rations, clean drinking water, and essential medicines to impoverished flood survivors.',
    excerptBn: 'চরাঞ্চলের দুর্গম এলাকাগুলোতে পৌঁছে আমাদের স্বেচ্ছাসেবী দল ৩০ দিনের খাদ্য রেশন, বিশুদ্ধ খাবার পানি এবং প্রয়োজনীয় জরুরি ওষুধ সফলভাবে বিতরণ করেছে।',
    contentEn: [
      'Over the past week, the Global Muslim Charitable Foundation (GMCF) completed a major humanitarian milestone by distributing essential food hampers to over 2,500 families.',
      'Each relief pack included 20kg premium rice, lentils, edible cooking oil, salt, dates, and nutritional powder for young children.',
      'Our field coordination supervisor noted that 80% of these families were on the brink of starvation following unseasonal riverbank erosions and harvest losses.'
    ],
    contentBn: [
      'বিগত এক সপ্তাহে গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF) ২,৫০০ পরিবারের মাঝে ১ মাসের পুষ্টিকর খাদ্যপণ্য বিতরণ সম্পন্ন করেছে।',
      'প্রতিটি প্যাকে ছিল ২০ কেজি চাল, মসুর ডাল, ভোজ্যতেল, লবণ, পুষ্টিকর শিশুখাদ্য ও খেজুর।',
      'চরাঞ্চলের নদীভাঙনে নিঃস্ব হওয়া পরিবারগুলোর জন্য এটি ছিল অত্যন্ত জরুরি বেঁচে থাকার অবলম্বন।'
    ]
  },
  {
    id: 'news-02',
    categoryEn: 'Clean Water Project',
    categoryBn: 'বিশুদ্ধ নিরাপদ পানি',
    titleEn: '50 Deep Tube-Wells Commissioned Bringing Safe Arsenic-Free Water to 15,000 Villagers',
    titleBn: 'আর্সেনিকমুক্ত গভীর নলকূপ স্থাপন: নিরাপদ পানির নিশ্চয়তা পেল ১৫,০০০ গ্রামীণ মানুষ',
    dateEn: 'November 2, 2026',
    dateBn: '২ নভেম্বর, ২০২৬',
    readTimeEn: '3 min read',
    readTimeBn: '৩ মিনিট পঠন',
    tagEn: 'Sadaqah Jariyah',
    tagBn: 'সদকাহ জারিয়াহ',
    image: '/images/drive-water-1.jpg',
    excerptEn: 'Deep-drilled tube wells are now fully functional across remote villages in Gaibandha and Kurigram, permanently wiping out waterborne illness.',
    excerptBn: 'গাইবান্ধা ও কুড়িগ্রামের প্রত্যন্ত গ্রামে ৫০টি গভীর নলকূপ সফলভাবে চালু হয়েছে, যা পানিবাহিত ডায়রিয়া ও চর্মরোগ থেকে গ্রামবাসীদের রক্ষা করছে।',
    contentEn: [
      'GMCF engineering teams completed geological aquifer testing up to 800 feet depth to ensure zero arsenic and iron contamination.',
      'Sadaqah Jariyah donors from across the world funded this initiative, and each well is dedicated with a verified donor plaque.'
    ],
    contentBn: [
      '৮০০ ফুট গভীরে খনন করে শতভাগ আর্সেনিকমুক্ত ভূগর্ভস্থ পানির স্তর নিশ্চিত করা হয়েছে।',
      'বিশ্বজুড়ে অবস্থানরত সদকাহ জারিয়াহ দাতাদের আন্তরিক অবদানে এই স্থায়ী পানির উৎসগুলো নির্মিত হয়েছে।'
    ]
  },
  {
    id: 'news-03',
    categoryEn: 'Orphan Care & Hifz',
    categoryBn: 'এতিম প্রতিপালন ও শিক্ষা',
    titleEn: 'Annual Quran Memorization & Winter Uniform Ceremony for 120 Resident Orphans',
    titleBn: '১২০ জন এতিম শিক্ষার্থীর কুরআন হিফজ সংবর্ধনা ও শীতের নতুন পোশাক বিতরণ',
    dateEn: 'October 28, 2026',
    dateBn: '২৮ অক্টোবর, ২০২৬',
    readTimeEn: '5 min read',
    readTimeBn: '৫ মিনিট পঠন',
    tagEn: 'Child Welfare',
    tagBn: 'শিশু কল্যাণ',
    image: '/images/drive-orphan-2.jpg',
    excerptEn: 'Celebrated the academic milestones of resident orphan students, presenting winter blankets, jackets, and new Quran copies at the central madrasa.',
    excerptBn: 'আবাসিক মাদরাসায় অধ্যয়নরত এতিম শিশুদের মাঝে শীতবস্ত্র, সোয়েটার, কম্বল এবং হিফজ সম্পন্নকারীদের মাঝে পবিত্র কুরআন ও সম্মাননা স্মারক তুলে দেওয়া হয়।',
    contentEn: [
      'Our Chairman Mohammad Ali Mostafa presided over the joyful gathering, emphasizing that Islamic education combined with modern science empowers these boys toward leadership.',
      'Sponsors were connected via live video calls to bless their sponsored children directly during the medal distribution.'
    ],
    contentBn: [
      'ফাউন্ডেশনের চেয়ারম্যান মোহাম্মদ আলী মোস্তফা অনুষ্ঠানে উপস্থিত থেকে শিশুদের উজ্জ্বল ভবিষ্যতের জন্য শুভকামনা জানান।',
      'স্পনসররা সরাসরি লাইভ ভিডিও কলের মাধ্যমে যুক্ত হয়ে শিশুদের উৎসাহ ও দোআ প্রদান করেন।'
    ]
  },
  {
    id: 'news-04',
    categoryEn: 'Rehabilitation Shelter',
    categoryBn: 'পুনর্বাসন ও গৃহনির্মাণ',
    titleEn: '10 Permanent Brick Homes Handed Over to Homeless Families in Cyclone-Affected Coast',
    titleBn: 'ঘূর্ণিঝড়ে গৃহহীন ১০টি পরিবারকে মজবুত পাকা বাড়ি হস্তান্তর করল GMCF',
    dateEn: 'October 20, 2026',
    dateBn: '২০ অক্টোবর, ২০২৬',
    readTimeEn: '3 min read',
    readTimeBn: '৩ মিনিট পঠন',
    tagEn: 'Shelter Relief',
    tagBn: 'আশ্রয় পুনর্বাসন',
    image: '/images/drive-house-1.jpg',
    excerptEn: 'Durable, elevated concrete structures built with sanitary latrines provide long-term safety against cyclones and tidal surges.',
    excerptBn: 'উঁচু ভিটা, মজবুত পিলার ও স্যানিটারি টয়লেটসহ স্থায়ী বাড়িগুলো উপকূলের ছিন্নমূল পরিবারগুলোর স্থায়ী আশ্রয় নিশ্চিত করেছে।',
    contentEn: [
      'Each house contains 2 bedrooms, a kitchen area, verified rainwater harvesting tank, and elevated platform to survive future flash floods.'
    ],
    contentBn: [
      'প্রতিটি বাড়িতে রয়েছে দুটি শোবার ঘর, রান্নাঘর এবং বৃষ্টির পানি সংরক্ষণের পানির ট্যাংক।'
    ]
  }
];

export default function CurrentNewsPage() {
  const { language } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'all' | 'relief' | 'water' | 'orphan'>('all');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const filteredNews = NEWS_ARTICLES.filter(item => {
    if (activeTab === 'relief') return item.id === 'news-01' || item.id === 'news-04';
    if (activeTab === 'water') return item.id === 'news-02';
    if (activeTab === 'orphan') return item.id === 'news-03';
    return true;
  });

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-24 sm:pt-28 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">
              newspaper
            </span>
            <span>
              {isBn
                ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — সাম্প্রতিক সংবাদ ও ফিল্ড আপডেট'
                : 'Global Muslim Charitable Foundation — Current News & Ground Updates'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight leading-tight">
            {isBn ? (
              <>
                আমাদের প্রতিটি পদক্ষেপের{' '}
                <span className="text-amber-600">বাস্তব অগ্রগতি ও সংবাদ</span>
              </>
            ) : (
              <>
                Latest Press Releases &amp;{' '}
                <span className="text-amber-600">Humanitarian Field News</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'মাঠপর্যায়ে ত্রাণ বিতরণ, আর্সেনিকমুক্ত নলকূপ স্থাপন এবং এতিম প্রতিপালন কার্যক্রমের সরাসরি খবরাখবর। আপনার দানকৃত প্রতিটি তহবিলের স্বচ্ছ চিত্র।'
              : 'Real-time updates, photographic reports, and press coverage of our ongoing relief, shelter, and orphan support programs across Bangladesh.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'সকল সংবাদ (All News)' : 'All News'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('relief')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'relief'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'জরুরি ত্রাণ ও খাদ্য' : 'Emergency Relief'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('water')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'water'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'পানি ও স্যানিটেশন' : 'Clean Water'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orphan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'orphan'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'এতিম প্রতিপালন' : 'Orphan Welfare'}
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {isBn ? `মোট ${filteredNews.length}টি রিপোর্ট প্রদর্শিত হচ্ছে` : `Showing ${filteredNews.length} field reports`}
          </div>
        </div>

        {/* Featured Story */}
        {activeTab === 'all' && (
          <div className="mb-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[300px] overflow-hidden bg-slate-100">
              <img
                src={NEWS_ARTICLES[0].image}
                alt={isBn ? NEWS_ARTICLES[0].titleBn : NEWS_ARTICLES[0].titleEn}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {isBn ? 'প্রধান সংবাদ' : 'Featured Story'}
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="text-emerald-700 font-bold uppercase tracking-wider">
                    {isBn ? NEWS_ARTICLES[0].categoryBn : NEWS_ARTICLES[0].categoryEn}
                  </span>
                  <span>•</span>
                  <span>{isBn ? NEWS_ARTICLES[0].dateBn : NEWS_ARTICLES[0].dateEn}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-heading leading-snug">
                  {isBn ? NEWS_ARTICLES[0].titleBn : NEWS_ARTICLES[0].titleEn}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {isBn ? NEWS_ARTICLES[0].excerptBn : NEWS_ARTICLES[0].excerptEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedNews(NEWS_ARTICLES[0])}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{isBn ? 'সম্পূর্ণ খবর পড়ুন' : 'Read Full Report'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  {isBn ? NEWS_ARTICLES[0].readTimeBn : NEWS_ARTICLES[0].readTimeEn}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={isBn ? item.titleBn : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isBn ? item.categoryBn : item.categoryEn}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span>{isBn ? item.dateBn : item.dateEn}</span>
                    <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {isBn ? item.tagBn : item.tagEn}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {isBn ? item.titleBn : item.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {isBn ? item.excerptBn : item.excerptEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read Article'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                  <span className="text-[11px] text-slate-400">
                    {isBn ? item.readTimeBn : item.readTimeEn}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal for Reading Full Article */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-60 sm:h-72 w-full shrink-0">
              <img
                src={selectedNews.image}
                alt={isBn ? selectedNews.titleBn : selectedNews.titleEn}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="text-emerald-800 font-bold uppercase">
                  {isBn ? selectedNews.categoryBn : selectedNews.categoryEn}
                </span>
                <span>•</span>
                <span>{isBn ? selectedNews.dateBn : selectedNews.dateEn}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-heading leading-snug">
                {isBn ? selectedNews.titleBn : selectedNews.titleEn}
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                {(isBn ? selectedNews.contentBn : selectedNews.contentEn).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const causeName = isBn ? selectedNews.titleBn : selectedNews.titleEn;
                    setSelectedNews(null);
                    openPaymentModal({
                      amount: 1000,
                      cause: `Support: ${causeName.substring(0, 40)}...`
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>{isBn ? 'এই উদ্যোগে সহায়তা দিন' : 'Support this Initiative'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
