'use client';

import { useState } from 'react';
import Link from 'next/link';

type GalleryItem = {
  id: string;
  title: string;
  category: 'water' | 'food' | 'house' | 'orphan' | 'medical';
  categoryLabel: string;
  image: string;
  location: string;
  date: string;
  desc: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  // Drive Clean Water
  {
    id: 'w1',
    title: 'বিশুদ্ধ খাবার পানির গভীর নলকূপ স্থাপন',
    category: 'water',
    categoryLabel: 'বিশুদ্ধ পানি ও WASH',
    image: '/images/drive-water-1.jpg',
    location: 'সুনামগঞ্জ ও কুড়িগ্রাম চরাঞ্চল',
    date: '২০২৪ - ২০২৫',
    desc: 'পানির অভাবে কষ্ট পাওয়া দুর্গম চরাঞ্চলের সুবিধাবঞ্চিত পরিবার ও শিশুদের জন্য গভীর নলকূপ ও স্থায়ী ফিল্টারিং ব্যবস্থা।',
  },
  {
    id: 'w2',
    title: 'গ্রামীণ কমিউনিটি ওয়াটার পয়েন্ট ও সুরক্ষা বেষ্টনী',
    category: 'water',
    categoryLabel: 'বিশুদ্ধ পানি ও WASH',
    image: '/images/drive-water-2.jpg',
    location: 'বাকেরগঞ্জ, বরিশাল',
    date: '২০২৪',
    desc: 'কমিউনিটির কয়েকশত পরিবারের জন্য টেকসই সেনিটেশন ও নিয়মিত বিশুদ্ধ সুপেয় পানি সরবরাহ কেন্দ্র।',
  },
  {
    id: 'w3',
    title: 'ট্যাকসই টিউবওয়েল ড্রিলিং ও পরিদর্শন',
    category: 'water',
    categoryLabel: 'বিশুদ্ধ পানি ও WASH',
    image: '/images/drive-water-3.jpg',
    location: 'রংপুর ও গাইবান্ধা',
    date: '২০২৪',
    desc: 'আর্সেনিকমুক্ত ভূগর্ভস্থ পানির স্তর নির্ধারণপূর্বক ফিল্ড টিম ও ইঞ্জিনিয়ারদের সমন্বয়ে সরাসরি বাস্তবায়ন।',
  },

  // Drive Feed Hunger
  {
    id: 'f1',
    title: 'ওয়ান মিল ওয়ান হোপ: নিয়মিত খাদ্য সহায়তা',
    category: 'food',
    categoryLabel: 'ক্ষুধা নিবারণ ও খাদ্য',
    image: '/images/drive-food-1.jpg',
    location: 'কমলাপুর ও তেজগাঁও রেলওয়ে লাইন',
    date: '২০২৪ - ২০২৫',
    desc: 'পথশিশু এবং ছিন্নমূল অনাহারী মানুষদের মাঝে পুষ্টিকর গরম রান্না করা খাবার বিতরণ কর্মসূচি।',
  },
  {
    id: 'f2',
    title: 'সামাজিক রান্নাঘর ও সরাসরি ফুড ভলান্টিয়ারিং',
    category: 'food',
    categoryLabel: 'ক্ষুধা নিবারণ ও খাদ্য',
    image: '/images/drive-food-2.jpg',
    location: 'কাউন্দিয়া ও সাভার আউটরিচ কিচেন',
    date: '২০২৪',
    desc: 'স্বেচ্ছাসেবকদের আন্তরিক পরিশ্রমে প্রতিদিন পুষ্টিকর খাবার রান্না ও স্বাস্থ্যসম্মত উপায়ে প্যাকেটজাতকরণ।',
  },
  {
    id: 'f3',
    title: 'দুর্যোগকালীন জরুরি খাদ্য প্যাকেট বিতরণ',
    category: 'food',
    categoryLabel: 'ক্ষুধা নিবারণ ও খাদ্য',
    image: '/images/drive-food-3.jpg',
    location: 'বন্যাদুর্গত ফেনী ও নোয়াখালী',
    date: '২০২৪',
    desc: 'বন্যায় পানিবন্দি ও ক্ষতিগ্রস্ত হাজারো পরিবারের ঘরে ঘরে পৌঁছে দেওয়া জরুরি খাদ্য সামগ্রী।',
  },

  // Drive House Rebuild
  {
    id: 'h1',
    title: 'গৃহহীন পরিবারের জন্য নিরাপদ বাসস্থান নির্মাণ',
    category: 'house',
    categoryLabel: 'পুনর্বাসন ও গৃহনির্মাণ',
    image: '/images/drive-house-1.jpg',
    location: 'লালমনিরহাট ও কুড়িগ্রাম',
    date: '২০২৪ - ২০২৫',
    desc: 'নদীভাঙন ও বন্যায় ঘরবাড়ি হারানো চরম দরিদ্র ও অসহায় বিধবাদের জন্য নিরাপদ টিন-শেড ও পাকা ভিটার গৃহ।',
  },
  {
    id: 'h2',
    title: 'মডেল হাউস নির্মাণ ও ফিল্ড পর্যবেক্ষণ',
    category: 'house',
    categoryLabel: 'পুনর্বাসন ও গৃহনির্মাণ',
    image: '/images/drive-house-2.jpg',
    location: 'চর চিলমারী, রংপুর',
    date: '২০২৪',
    desc: 'ঝড়-বৃষ্টি সহনশীল কাঠামো নিশ্চিত করতে স্বেচ্ছাসেবী প্রকৌশলীদের তত্ত্বাবধানে নির্মিত বসতঘর।',
  },
  {
    id: 'h3',
    title: 'নতুন ঘরে গৃহহীন পরিবারের মুখে স্বস্তির হাসি',
    category: 'house',
    categoryLabel: 'পুনর্বাসন ও গৃহনির্মাণ',
    image: '/images/drive-house-3.jpg',
    location: 'সুনামগঞ্জ হাওরাঞ্চল',
    date: '২০২৪',
    desc: 'খোলা আকাশের নিচে রাত কাটানো পরিবারের জন্য স্থায়ী আশ্রয় তৈরি করে সামাজিক নিরাপত্তা নিশ্চিত করা।',
  },

  // Drive Sponsor Orphan
  {
    id: 'o1',
    title: 'এতিম ও পথশিশুদের শিক্ষা উপকরণ ও লালনপালন',
    category: 'orphan',
    categoryLabel: 'এতিম স্পনসরশিপ ও শিশুসেবা',
    image: '/images/drive-orphan-1.jpg',
    location: 'ঢাকা ও কেরানীগঞ্জ আশ্রয় কেন্দ্র',
    date: '২০২৪ - ২০২৫',
    desc: 'অভিভাবকহীন এতিম শিশুদের নিয়মিত লেখাপড়া, মানসম্মত পোশাক ও নৈতিক পরিচর্যা নিশ্চিতকরণ।',
  },
  {
    id: 'o2',
    title: 'শিশুদের জন্য নিরাপদ ডে-কেয়ার ও খাবার বিতরণ',
    category: 'orphan',
    categoryLabel: 'এতিম স্পনসরশিপ ও শিশুসেবা',
    image: '/images/drive-orphan-2.jpg',
    location: 'টঙ্গী ও গাবতলী বস্তি এলাকা',
    date: '২০২৪',
    desc: 'কঠিন বাস্তবতায় বেড়ে ওঠা শিশুদের জন্য ভালোবাসা, বিনোদন ও পুষ্টিকর খাবারের নিয়মিত আয়োজন।',
  },
  {
    id: 'o3',
    title: 'মাদরাসা ও হিফজখানার এতিম শিক্ষার্থীদের পাশে',
    category: 'orphan',
    categoryLabel: 'এতিম স্পনসরশিপ ও শিশুসেবা',
    image: '/images/drive-orphan-3.jpg',
    location: 'সাভার ও মানিকগঞ্জ',
    date: '২০২৪',
    desc: 'কুরআন শিক্ষারত অভাবী শিক্ষার্থীদের বাসস্থান, খাদ্য ও চিকিৎসার শতভাগ দায়িত্ব বহন।',
  },
  {
    id: 'o4',
    title: 'শিশুদের ভবিষ্যৎ বিনির্মাণে স্পনসরদের অনুদান',
    category: 'orphan',
    categoryLabel: 'এতিম স্পনসরশিপ ও শিশুসেবা',
    image: '/images/drive-orphan-4.jpg',
    location: 'সিলেট চাইল্ড ওয়েলফেয়ার সেন্টার',
    date: '২০২৪',
    desc: 'প্রতিটি শিশুর জন্য নিশ্চিত ভবিষ্যৎ গড়তে মাসিক স্পনসরশিপ ফান্ডের স্বচ্ছ বণ্টন।',
  },

  // Additional Real Highlights
  {
    id: 'm1',
    title: 'প্রজেক্ট আলো: চোখের ছানি অপারেশন ও দৃষ্টি ফিরিয়ে দেওয়া',
    category: 'medical',
    categoryLabel: 'চিকিৎসা ও জরুরি সেবা',
    image: '/images/project-alo-eye-care.jpg',
    location: 'চট্টগ্রাম আই ইনফার্মারি ও কুড়িগ্রাম',
    date: '২০২৪',
    desc: 'দৃষ্টিহীন শিশুদের বিনামূল্যে লেন্স প্রতিস্থাপন ও জীবন বদলে দেওয়া বিশেষ সার্জারি ক্যাম্প।',
  },
  {
    id: 'w4',
    title: 'শীতবস্ত্র ও কম্বল বিতরণ কর্মসূচি (প্রজেক্ট শীতলতা)',
    category: 'food',
    categoryLabel: 'জরুরি শীতকালীন ত্রাণ',
    image: '/images/project-sheetolota-blankets.jpg',
    location: 'পঞ্চগড় ও ঠাকুরগাঁও',
    date: '২০২৪ - ২০২৫',
    desc: 'উত্তরাঞ্চলের তীব্র শীতে দরিদ্র ছিন্নমূল মানুষের মাঝে উন্নতমানের শীতবস্ত্র ও কম্বল বিতরণ।',
  },
  {
    id: 'v1',
    title: 'আমাদের নিবেদিতপ্রাণ তরুণ স্বেচ্ছাসেবী টিম',
    category: 'orphan',
    categoryLabel: 'স্বেচ্ছাসেবী ফিল্ড ফোর্স',
    image: '/images/youth-volunteers.jpg',
    location: 'কেন্দ্রীয় হেডকোয়ার্টার, সাভার',
    date: '২০২৪',
    desc: 'স্বেচ্ছাসেবীদের যৌথ প্রয়াস ও সততার মাধ্যমে প্রতিটি অনুদান সরাসরি হকদারের কাছে পৌঁছে দেওয়ার অঙ্গীকার।',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'সকল কার্যক্রম (All Gallery)' },
  { id: 'water', label: 'বিশুদ্ধ পানি (Clean Water)' },
  { id: 'food', label: 'খাদ্য ও ত্রাণ (Feed Hunger)' },
  { id: 'house', label: 'পুনর্বাসন (House Rebuild)' },
  { id: 'orphan', label: 'এতিম স্পনসর (Orphan Care)' },
  { id: 'medical', label: 'চিকিৎসা সহায়তা (Medical Aid)' },
] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <main className="w-full bg-surface-subtle-mint pt-[96px] sm:pt-[116px] min-h-screen">
      <div className="flex flex-col w-full">
        {/* Gallery Header / Breadcrumb Hero */}
        <section className="relative w-full bg-gradient-to-b from-surface-subtle-mint via-surface to-surface overflow-hidden py-12 lg:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zakat-gold-light border border-amber-300 text-secondary text-xs font-bold tracking-wide">
                <span className="material-symbols-outlined text-[16px] text-amber-vibrant">
                  photo_library
                </span>
                <span>গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — ফিল্ড ফটো গ্যালারি</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-emerald-dark tracking-tight leading-tight">
                মানবতার সেবায় আমাদের{' '}
                <span className="text-amber-vibrant">ফিল্ড কার্যক্রমের স্থিরচিত্র</span>
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
                আপনার দেওয়া প্রতিটি যাকাত ও সাদাকাহ কীভাবে অসহায় মানুষদের জীবন বদলে দিচ্ছে — তা সরাসরি দেখুন আমাদের ফিল্ড অপারেশন গ্যালারিতে।
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                          : 'bg-white hover:bg-surface-subtle-mint text-text-muted hover:text-emerald-dark border border-border-subtle'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full bg-surface px-4 sm:px-8 py-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-emerald-dark/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-sm">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 rounded-full bg-white/90 text-primary shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">
                          zoom_in
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span className="flex items-center gap-1 text-primary font-medium">
                          <span className="material-symbols-outlined text-[14px]">
                            location_on
                          </span>
                          {item.location}
                        </span>
                        <span className="font-semibold">{item.date}</span>
                      </div>
                      <h3 className="font-title-md text-base sm:text-lg font-bold text-emerald-dark group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                      <span className="text-primary font-bold inline-flex items-center gap-1 group-hover:underline">
                        পূর্ণ ছবি দেখুন
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </span>
                      <span className="text-text-muted text-[11px]">
                        ১০০% ভেরিফাইড ফিল্ড রেকর্ড
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-16 bg-surface-subtle-mint rounded-3xl p-8 sm:p-12 border border-primary/20 text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white shadow-md">
                <span className="material-symbols-outlined text-[26px]">
                  volunteer_activism
                </span>
              </span>
              <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-emerald-dark">
                মানবতার এই মহৎ যাত্রায় আপনিও সহযোগী হোন
              </h3>
              <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
                আপনার যাকাত ও দান সরাসরি পৌঁছে দিন সুবিধাবঞ্চিত মানুষদের কাছে। প্রতিটি অর্থ ব্যয় করা হয় সম্পূর্ণ স্বচ্ছতা ও আমানতদারিতার সাথে।
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/appeals"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                  দান করুন (Donate Now)
                </Link>
                <Link
                  href="/volunteer"
                  className="px-6 py-3 rounded-full bg-white hover:bg-surface-clean border border-primary/30 text-primary font-bold text-sm transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    groups
                  </span>
                  স্বেচ্ছাসেবক হিসেবে যোগ দিন
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal for Full Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full">
                  {selectedImage.categoryLabel}
                </span>
                <span>{selectedImage.location} • {selectedImage.date}</span>
              </div>
              <h2 className="font-title-lg text-xl font-bold text-emerald-dark">
                {selectedImage.title}
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
