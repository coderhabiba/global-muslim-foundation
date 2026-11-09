'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type ProjectTopic = {
  id: string;
  category: 'water' | 'food' | 'house' | 'orphan' | 'medical';
  titleEn: string;
  titleBn: string;
  categoryLabelEn: string;
  categoryLabelBn: string;
  locationEn: string;
  locationBn: string;
  dateEn: string;
  dateBn: string;
  descEn: string;
  descBn: string;
  isBeneficiarySlider?: boolean; // Specific human beneficiary slider showcase
  images: string[];
};

const PROJECT_TOPICS: ProjectTopic[] = [
  // 1. One Meal One Hope (Topic: Food) - Includes 3 photos of food outreach
  {
    id: 'food-relief',
    category: 'food',
    titleEn: 'One Meal One Hope: Hot Nourishing Food Outreach',
    titleBn: 'ওয়ান মিল ওয়ান হোপ: নিয়মিত গরম খাবার বিতরণ কর্মসূচি',
    categoryLabelEn: 'Hunger Relief & Food',
    categoryLabelBn: 'ক্ষুধা নিবারণ ও খাদ্য',
    locationEn: 'Kamalapur & Tejgaon Slum Communities',
    locationBn: 'কমলাপুর ও তেজগাঁও বস্তি ও রেলওয়ে আউটরিচ',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Fresh, nutritious hot meals cooked and served daily to street children, homeless families, and elderly destitute individuals.',
    descBn: 'পথশিশু এবং ছিন্নমূল অনাহারী মানুষদের মাঝে প্রতিদিন পুষ্টিকর গরম রান্না করা খাবার বিতরণ ও খাদ্য সহায়তা কর্মসূচি।',
    images: [
      '/images/drive-food-1.jpg',
      '/images/drive-food-2.jpg',
      '/images/drive-food-3.jpg',
    ],
  },

  // 2. Clean Water Tube Wells (Topic: Water) - Includes 3 photos of tube wells
  {
    id: 'water-wells',
    category: 'water',
    titleEn: 'Arsenic-Free Deep Tube Wells & Clean WASH Infrastructure',
    titleBn: 'আর্সেনিকমুক্ত গভীর নলকূপ স্থাপন ও সুপেয় পানির ব্যবস্থা',
    categoryLabelEn: 'Clean Water & WASH',
    categoryLabelBn: 'বিশুদ্ধ পানি ও WASH',
    locationEn: 'Sunamganj, Kurigram & Remote Chars',
    locationBn: 'সুনামগঞ্জ, কুড়িগ্রাম ও দুর্গম চরাঞ্চল',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Installing sustainable deep tube wells with concrete platforms, providing lifelong clean drinking water to remote off-grid villages.',
    descBn: 'পানির অভাবে কষ্ট পাওয়া দুর্গম চরাঞ্চলের সুবিধাবঞ্চিত পরিবার ও শিশুদের জন্য গভীর নলকূপ ও স্থায়ী ফিল্টারিং ব্যবস্থা।',
    images: [
      '/images/drive-water-1.jpg',
      '/images/drive-water-2.jpg',
      '/images/drive-water-3.jpg',
    ],
  },

  // 3. Orphan Care & Quran Hifz (Topic: Orphan) - Includes 4 photos of orphan boys
  {
    id: 'orphan-sponsorship',
    category: 'orphan',
    titleEn: 'Sponsor An Orphan: Shelter, Nutrition & Quran Hifz Education',
    titleBn: 'এতিম প্রতিপালন: বাসস্থান, পুষ্টি ও কোরআন হিফজ শিক্ষা',
    categoryLabelEn: 'Orphan Care & Children',
    categoryLabelBn: 'এতিম স্পনসরশিপ ও শিশুসেবা',
    locationEn: 'Savar, Keraniganj & Manikganj Centers',
    locationBn: 'সাভার, কেরানীগঞ্জ ও মানিকগঞ্জ আশ্রয় কেন্দ্র',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Comprehensive residential guardianship covering religious education, schooling, healthcare, nutritious food, and ethical nurturing for vulnerable orphans.',
    descBn: 'অভিভাবকহীন এতিম শিশুদের নিয়মিত লেখাপড়া, মানসম্মত খাদ্য, বস্ত্র ও নৈতিক পরিচর্যা নিশ্চিতকরণ কর্মসূচি।',
    images: [
      '/images/drive-orphan-1.jpg',
      '/images/drive-orphan-2.jpg',
      '/images/drive-orphan-3.jpg',
      '/images/drive-orphan-4.jpg',
    ],
  },

  // 4. Emergency Shelter Rebuild (Topic: House) - Includes 3 photos of house construction
  {
    id: 'shelter-rebuild',
    category: 'house',
    titleEn: 'Dignified Home Construction & Flood Rehabilitation',
    titleBn: 'গৃহহীন পরিবারের জন্য নিরাপদ বাসস্থান ও টিন-শেড গৃহনির্মাণ',
    categoryLabelEn: 'Shelter & Rehabilitation',
    categoryLabelBn: 'পুনর্বাসন ও গৃহনির্মাণ',
    locationEn: 'Lalmonirhat, Kurigram & Floodplains',
    locationBn: 'লালমনিরহাট, কুড়িগ্রাম ও চরাঞ্চল',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Building raised concrete-plinth, weather-resistant tin-roof homes for river erosion victims, widows, and homeless families.',
    descBn: 'নদীভাঙন ও বন্যায় ঘরবাড়ি হারানো চরম দরিদ্র ও অসহায় বিধবাদের জন্য নিরাপদ টিন-শেড ও পাকা ভিটার গৃহ নির্মাণ।',
    images: [
      '/images/drive-house-1.jpg',
      '/images/drive-house-2.jpg',
      '/images/drive-house-3.jpg',
    ],
  },

  // 5. Specific Human Beneficiary Stories (SPECIAL BENEFICIARY SLIDER)
  {
    id: 'beneficiary-stories',
    category: 'medical',
    titleEn: 'Direct Beneficiary Spotlight: Lives Transformed by Your Zakat',
    titleBn: 'নির্দিষ্ট সহায়তা প্রাপ্ত মানুষের গল্প: যাকাতের মাধ্যমে জীবন বদলানোর চিত্র',
    categoryLabelEn: 'Beneficiary Case Spotlight',
    categoryLabelBn: 'সহায়তাপ্রাপ্ত ব্যক্তিদের গল্প',
    locationEn: 'Chittagong, Kurigram & Slum Outreach',
    locationBn: 'চট্টগ্রাম, কুড়িগ্রাম ও ছিন্নমূল আউটরিচ',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Real individual human stories: Pediatric surgery for little Saifan, cataract lens restoration for elderly grandmothers, reunited runaway child Badshah, and special-needs therapy support.',
    descBn: 'নির্দিষ্ট মানুষের বাস্তব সহায়তা চিত্র: শিশু সাইফানের জটিল চিকিৎসা, বয়োবৃদ্ধদের চোখের ছানি অপারেশন ও দৃষ্টি ফিরিয়ে দেওয়া, পথশিশু বাদশার ঘরে ফেরা এবং প্রতিবন্ধী শিশুদের থেরাপি সহায়তা।',
    isBeneficiarySlider: true,
    images: [
      '/images/pediatric-hope-saifan.jpg',
      '/images/cataract-surgery-success.jpg',
      '/images/badshah-reunion.jpg',
      '/images/special-care-therapy.jpg',
      '/images/project-alo-eye-care.jpg',
    ],
  },

  // 6. Project Sheetolota Winter Warmth (Topic: Winter Relief)
  {
    id: 'winter-warmth',
    category: 'food',
    titleEn: 'Project Sheetolota: Heavy Blankets & Winter Garments Distribution',
    titleBn: 'প্রজেক্ট শীতলতা: শীতবস্ত্র ও উন্নতমানের কম্বল বিতরণ',
    categoryLabelEn: 'Emergency Winter Relief',
    categoryLabelBn: 'জরুরি শীতকালীন ত্রাণ',
    locationEn: 'Panchagarh, Thakurgaon & North Bengal',
    locationBn: 'পঞ্চগড়, ঠাকুরগাঁও ও উত্তরবঙ্গের হিমপ্রবণ জনপদ',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Delivering warmth and dignity to thousands of freezing families, shivering children, and frail elders during the severe cold waves of North Bengal.',
    descBn: 'উত্তরাঞ্চলের তীব্র শৈত্যপ্রবাহে সুবিধাবঞ্চিত শীতার্ত শিশু ও অসহায় বয়োবৃদ্ধদের মাঝে ভারী কম্বল ও শীতবস্ত্র বিতরণ।',
    images: [
      '/images/project-sheetolota-blankets.jpg',
      '/images/winter-blanket-distribution.jpg',
    ],
  },

  // 7. Dedicated Youth Volunteer Corps (Topic: Volunteers)
  {
    id: 'youth-volunteers',
    category: 'orphan',
    titleEn: 'Field Volunteer Force: Delivering Aid with Integrity & Devotion',
    titleBn: 'আমাদের নিবেদিতপ্রাণ তরুণ স্বেচ্ছাসেবী ফিল্ড টিম',
    categoryLabelEn: 'Field Volunteer Force',
    categoryLabelBn: 'স্বেচ্ছাসেবী ফিল্ড ফোর্স',
    locationEn: 'Headquarters Savar & Nationwide Networks',
    locationBn: 'কেন্দ্রীয় হেডকোয়ার্টার, সাভার ও দেশব্যাপী ফিল্ড টিম',
    dateEn: '2024 - 2025',
    dateBn: '২০২৪ - ২০২৫',
    descEn: 'Passionate youth volunteers ensuring that every single taka of your donations reaches qualified hands with 100% transparency.',
    descBn: 'স্বেচ্ছাসেবীদের যৌথ প্রয়াস ও সততার মাধ্যমে প্রতিটি অনুদান সরাসরি হকদারের কাছে পৌঁছে দেওয়ার নিরলস মাঠপর্যায়ের অঙ্গীকার।',
    images: [
      '/images/youth-volunteers.jpg',
      '/images/volunteers-cooking-pots.jpg',
    ],
  },
];

const CATEGORIES = [
  { id: 'all', labelEn: 'All Activities', labelBn: 'সকল কার্যক্রম' },
  { id: 'water', labelEn: 'Clean Water', labelBn: 'বিশুদ্ধ পানি (Water)' },
  { id: 'food', labelEn: 'Hunger Relief', labelBn: 'খাদ্য ও ত্রাণ (Food)' },
  { id: 'orphan', labelEn: 'Orphan Care', labelBn: 'এতিম স্পনসর (Orphan)' },
  { id: 'house', labelEn: 'House Rebuild', labelBn: 'পুনর্বাসন (Housing)' },
  { id: 'medical', labelEn: 'Medical Aid', labelBn: 'চিকিৎসা সহায়তা (Medical)' },
] as const;

export default function GalleryPage() {
  const { language, currency } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredTopics = activeCategory === 'all'
    ? PROJECT_TOPICS
    : PROJECT_TOPICS.filter(item => item.category === activeCategory);

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[93px] sm:pt-[101px] min-h-screen">
      <div className="flex flex-col w-full">
        {/* Gallery Header / Breadcrumb Hero */}
        <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] overflow-hidden pt-8 pb-12 lg:pt-10 lg:pb-14 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-amber-600">
                  photo_library
                </span>
                <span>
                  {isBn
                    ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — ফিল্ড ফটো গ্যালারি'
                    : 'Global Muslim Charitable Foundation — Verified Field Gallery'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight leading-tight font-serif-heading">
                {isBn ? (
                  <>
                    মানবতার সেবায় আমাদের{' '}
                    <span className="text-amber-600">মাঠপর্যায়ের স্থিরচিত্র</span>
                  </>
                ) : (
                  <>
                    Visual Evidence of Our{' '}
                    <span className="text-amber-600">Ground Operations</span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {isBn
                  ? 'আপনার প্রতিটি যাকাত ও সাদাকাহ কীভাবে অভাবী মানুষের জীবনে আশার আলো জ্বালাচ্ছে — প্রকল্পভিত্তিক গ্যালারি এবং সহায়তাপ্রাপ্ত মানুষদের বাস্তব স্লাইডারে সরাসরি দেখুন।'
                  : 'Witness how your Zakat and Sadaqah transform lives directly through categorized project albums and individual beneficiary spotlights.'}
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200'
                      }`}
                    >
                      {isBn ? cat.labelBn : cat.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Beneficiary Slider Section (Swiper powered) */}
        <section className="w-full bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white py-14 px-4 sm:px-8 border-b border-emerald-900 shadow-xl">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  {isBn ? 'নির্দিষ্ট সহায়তাপ্রাপ্ত মানুষের গল্প' : 'Specific Beneficiary Spotlight'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 font-serif-heading">
                  {isBn
                    ? 'যাদের জীবনে আপনার দান নতুন আশা ফিরিয়ে দিয়েছে'
                    : 'Real Individuals Whose Lives You Touched'}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-xl">
                  {isBn
                    ? 'শিশুদের জটিল চোখের ছানি অপারেশন, পথশিশুদের পারিবারিক পুনর্বাসন ও বিধবাদের স্থায়ী আশ্রয়।'
                    : 'Pediatric surgery recipients, cataract lens restorations, runaway children reunited with family, and special needs care.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openPaymentModal({ amount: isBn ? 1000 : 25 })}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>{isBn ? 'এই মানুষগুলোকে দান করুন' : 'Support Beneficiaries'}</span>
                </button>
              </div>
            </div>

            {/* Swiper Premium Beneficiary Slider */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/20 p-3 sm:p-5">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="beneficiary-swiper pb-10"
              >
                <SwiperSlide>
                  <div
                    onClick={() => setLightboxImage('/images/pediatric-hope-saifan.jpg')}
                    className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/pediatric-hope-saifan.jpg"
                        alt="Little Saifan Hope"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {isBn ? 'পেডিয়াট্রিক সার্জারি' : 'Pediatric Surgery'}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {isBn ? 'শিশু সাইফানের জীবন বাঁচানোর অস্ত্রোপচার' : "Saifan's Life-Saving Pediatric Surgery"}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {isBn
                            ? 'জটিল রোগে আক্রান্ত সাইফানের ব্যয়বহুল অস্ত্রোপচার শতভাগ যাকাত ফান্ডের মাধ্যমে সম্পন্ন হয়।'
                            : 'Complex critical pediatric surgery fully funded through GMCF 100% Zakat fund.'}
                        </p>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold mt-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {isBn ? 'সুস্থভাবে বাড়ি ফিরেছে' : 'Full Recovery'}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div
                    onClick={() => setLightboxImage('/images/cataract-surgery-success.jpg')}
                    className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/cataract-surgery-success.jpg"
                        alt="Cataract Surgery"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {isBn ? 'চোখের ছানি অপারেশন' : 'Eye Care'}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {isBn ? 'দৃষ্টিহীন বয়োবৃদ্ধের চোখে নতুন আলো' : 'Sight Restored to Blind Elderly'}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {isBn
                            ? 'প্রজেক্ট আলোর অধীনে বিনামূল্যে ফ্যাকো সার্জারি ও আইওএল লেন্স প্রতিস্থাপন।'
                            : 'Phaco cataract surgery and lens replacement giving back independent vision.'}
                        </p>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold mt-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {isBn ? 'দৃষ্টি ফিরে পেয়েছেন' : 'Vision Restored'}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div
                    onClick={() => setLightboxImage('/images/badshah-reunion.jpg')}
                    className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/badshah-reunion.jpg"
                        alt="Badshah Reunion"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {isBn ? 'পারিবারিক পুনর্মিলন' : 'Family Reunion'}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {isBn ? 'হারিয়ে যাওয়া পথশিশু বাদশার মায়ের কোলে প্রত্যাবর্তন' : "Lost Street Child Badshah Reunited"}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {isBn
                            ? 'রেলওয়ে প্ল্যাটফর্ম থেকে উদ্ধার করে কাউন্সেলিং শেষে পরম মমতায় মায়ের কাছে হস্তান্তর।'
                            : 'Rescued from dangerous railway tracks, protected and safely reunited with mother.'}
                        </p>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold mt-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {isBn ? 'মায়ের কোলে ফিরেছে' : 'Reunited with Family'}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div
                    onClick={() => setLightboxImage('/images/special-care-therapy.jpg')}
                    className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/special-care-therapy.jpg"
                        alt="Special Care Therapy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {isBn ? 'বিশেষ চাহিদা ও থেরাপি' : 'Special Needs'}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {isBn ? 'প্রতিবন্ধী শিশুদের ফিজিওথেরাপি ও পুষ্টি' : 'Physiotherapy & Special Care'}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {isBn
                            ? 'অসহায় পরিবারের বিশেষ চাহিদা সম্পন্ন শিশুদের নিয়মিত পুনর্বাসন ও পুষ্টিকর খাবার।'
                            : 'Continuous occupational and physical rehabilitation therapy for vulnerable children.'}
                        </p>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold mt-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {isBn ? 'নিয়মিত পরিচর্যা চলছে' : 'Active Care'}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* Project-Based Gallery Section (1 Single Consolidated Card Per Project Topic) */}
        <section className="w-full px-4 sm:px-8 py-14">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                {isBn ? 'প্রকল্পভিত্তিক ফটো অ্যালবাম' : 'Project-Based Visual Albums'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading mt-1">
                {isBn ? 'আমাদের প্রধান মানবিক খাতের চিত্রশালা' : 'Core Humanitarian Impact Sectors'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isBn
                  ? 'প্রতিটি নির্দিষ্ট খাতের একাধিক ছবি একক কার্ডে স্লাইডার ও থাম্বনেইল সহ সুন্দরভাবে উপস্থাপিত।'
                  : 'Multiple field photographs grouped into unified, clean sector cards with mini-galleries.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTopics.map(topic => (
                <div
                  key={topic.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Topic Swiper Carousel Header (Multiple Photos in 1 Card) */}
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                      className="h-full w-full project-card-swiper"
                    >
                      {topic.images.map((imgSrc, idx) => (
                        <SwiperSlide key={idx}>
                          <div
                            onClick={() => setLightboxImage(imgSrc)}
                            className="relative w-full h-full cursor-pointer group"
                          >
                            <img
                              src={imgSrc}
                              alt={isBn ? topic.titleBn : topic.titleEn}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-4">
                              <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                                {idx + 1} / {topic.images.length} {isBn ? 'ছবি' : 'Photos'} • {isBn ? 'বড় করে দেখতে ক্লিক করুন' : 'Click to zoom'}
                              </span>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Category Label Badge */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="bg-emerald-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-md border border-white/20">
                        {isBn ? topic.categoryLabelBn : topic.categoryLabelEn}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
                    {topic.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxImage(imgSrc)}
                        className="w-14 h-10 rounded-lg overflow-hidden border border-slate-300 hover:border-emerald-600 shrink-0 transition-colors"
                        title={isBn ? `ছবি ${idx + 1} দেখুন` : `View photo ${idx + 1}`}
                      >
                        <img src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <span className="text-[11px] text-slate-500 font-medium ml-1">
                      {topic.images.length} {isBn ? 'টি সংরক্ষিত আলোকচিত্র' : 'Archived Photos'}
                    </span>
                  </div>

                  {/* Topic Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-800 font-bold">
                          <span className="material-symbols-outlined text-[15px]">location_on</span>
                          {isBn ? topic.locationBn : topic.locationEn}
                        </span>
                        <span className="font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded">
                          {isBn ? topic.dateBn : topic.dateEn}
                        </span>
                      </div>

                      <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {isBn ? topic.titleBn : topic.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {isBn ? topic.descBn : topic.descEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {isBn ? '১০০% ভেরিফাইড ফিল্ড রেকর্ড' : '100% Verified Field Audit'}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          openPaymentModal({
                            amount: isBn ? 1000 : 25,
                            cause: isBn ? topic.titleBn : topic.titleEn,
                          })
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[15px]">favorite</span>
                        <span>{isBn ? 'দান করুন' : 'Donate'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-16 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-xl border border-emerald-800">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 shadow-md">
                <span className="material-symbols-outlined text-[30px]">
                  volunteer_activism
                </span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-heading">
                {isBn
                  ? 'মানবতার এই মহৎ যাত্রায় আপনিও সহযোগী হোন'
                  : 'Join Us in This Sacred Humanitarian Journey'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto leading-relaxed">
                {isBn
                  ? 'আপনার যাকাত ও দান সরাসরি পৌঁছে দিন সুবিধাবঞ্চিত মানুষদের কাছে। প্রতিটি অর্থ ব্যয় করা হয় সম্পূর্ণ স্বচ্ছতা ও আমানতদারিতার সাথে।'
                  : 'Direct your Zakat and charitable gifts directly to the underprivileged with zero deduction and total transparency.'}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => openPaymentModal({ amount: isBn ? 1000 : 25 })}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                  <span>{isBn ? 'দান করুন (EPS Gateway)' : 'Donate via EPS Gateway'}</span>
                </button>
                <Link
                  href="/volunteer"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    groups
                  </span>
                  <span>{isBn ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Join as Volunteer'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-transparent flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <img
                src={lightboxImage}
                alt="Enlarged Field Record"
                className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
              />
              <div className="mt-4 text-center">
                <span className="text-white text-xs bg-white/10 px-4 py-1.5 rounded-full border border-white/20 font-mono">
                  Global Muslim Charitable Foundation • Verified Field Photograph
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
