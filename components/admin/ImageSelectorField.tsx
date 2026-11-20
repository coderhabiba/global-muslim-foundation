'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/lib/site-settings';

const PRESET_LIBRARY_IMAGES = [
  { url: '/images/hero-relief.jpg', label: 'হিরো রিলিফ ব্যানার' },
  { url: '/images/humanitarian-volunteers.jpg', label: 'স্বেচ্ছাসেবক টিম' },
  { url: '/images/one-meal-one-hope.jpg', label: 'ওয়ান মিল ওয়ান হোপ' },
  { url: '/images/clean-water-well.jpg', label: 'বিশুদ্ধ নলকূপ' },
  { url: '/images/drive-food-1.jpg', label: 'খাদ্য বিতরণ ১' },
  { url: '/images/drive-food-2.jpg', label: 'খাদ্য বিতরণ ২' },
  { url: '/images/drive-food-3.jpg', label: 'খাদ্য বিতরণ ৩' },
  { url: '/images/drive-water-1.jpg', label: 'নলকূপ প্রকল্প ১' },
  { url: '/images/drive-water-2.jpg', label: 'নলকূপ প্রকল্প ২' },
  { url: '/images/drive-water-3.jpg', label: 'নলকূপ প্রকল্প ৩' },
  { url: '/images/drive-house-1.jpg', label: 'ঘর নির্মাণ ১' },
  { url: '/images/drive-house-2.jpg', label: 'ঘর নির্মাণ ২' },
  { url: '/images/drive-house-3.jpg', label: 'ঘর নির্মাণ ৩' },
  { url: '/images/drive-orphan-1.jpg', label: 'এতিম শিশু ১' },
  { url: '/images/drive-orphan-2.jpg', label: 'এতিম শিশু ২' },
  { url: '/images/drive-orphan-3.jpg', label: 'এতিম শিশু ৩' },
  { url: '/images/drive-orphan-4.jpg', label: 'এতিম শিশু ৪' },
  { url: '/images/pediatric-hope-saifan.jpg', label: 'শিশু চিকিৎসা' },
  { url: '/images/project-alo-eye-care.jpg', label: 'প্রজেক্ট আলো চক্ষু সেবা' },
  { url: '/images/project-sheetolota-blankets.jpg', label: 'শীতবস্ত্র বিতরণ' },
  { url: '/images/winter-blanket-distribution.jpg', label: 'শীতের কম্বল বিতরণ' },
  { url: '/images/street-children-hot-meals.jpg', label: 'পথশিশু খাদ্য সেবা' },
  { url: '/images/street-children-meal-line.jpg', label: 'শিশু আহার সারি' },
  { url: '/images/youth-volunteers.jpg', label: 'যুব স্বেচ্ছাসেবক' },
  { url: '/images/youth-volunteer-group.jpg', label: 'স্বেচ্ছাসেবক গ্রুপ' },
  { url: '/images/rural-madrasa-children.jpg', label: 'মাদ্রাসা শিক্ষার্থী' },
  { url: '/images/rural-sanitation-block.jpg', label: 'স্যানিটেশন প্রকল্প' },
  { url: '/images/special-care-therapy.jpg', label: 'বিশেষ থেরাপি সেবা' },
  { url: '/images/special-children-joy.jpg', label: 'বিশেষ শিশুদের আনন্দ' },
  { url: '/images/village-water-pump.jpg', label: 'গ্রামের পানির পাম্প' },
  { url: '/images/gmcf-logo-full.png', label: 'GMCF ফুল লোগো' },
  { url: '/images/gmcf-logo-emblem.png', label: 'GMCF প্রতীক লোগো' },
];

interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helpText?: string;
}

export default function ImageSelectorField({ label, value, onChange, helpText }: ImageSelectorProps) {
  const { language } = useSiteSettings();
  const isBn = language === 'bn';
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState(value);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create local object URL / base64 for instant upload preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        onChange(base64Url);
        setCustomInput(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-700 block">{label}</label>
      
      {/* Input & Instant Thumbnail Preview */}
      <div className="flex items-center gap-3">
        {/* Preview Box */}
        <div className="w-16 h-12 rounded-xl border border-slate-300 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={e => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="material-symbols-outlined text-slate-400 text-[20px]">image</span>
          )}
        </div>

        {/* Text / URL Input */}
        <div className="flex-1">
          <input
            type="text"
            value={value || ''}
            placeholder={isBn ? "/images/hero-relief.jpg বা ছবির অনলাইন URL" : "/images/hero-relief.jpg or online image URL"}
            onChange={e => {
              onChange(e.target.value);
              setCustomInput(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600/20 bg-white"
          />
        </div>

        {/* Upload Button */}
        <label className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-300 flex items-center gap-1.5 shrink-0">
          <span className="material-symbols-outlined text-[16px]">upload</span>
          <span className="hidden sm:inline">{isBn ? 'আপলোড' : 'Upload'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>

        {/* Media Library Modal Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors cursor-pointer border border-purple-200 flex items-center gap-1.5 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">photo_library</span>
          <span className="hidden sm:inline">{isBn ? 'লাইব্রেরি' : 'Library'}</span>
        </button>
      </div>

      {helpText && <p className="text-[11px] text-slate-400">{helpText}</p>}

      {/* Preset Media Library Drawer */}
      {isOpen && (
        <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-200 mt-2 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-purple-900 border-b border-purple-200/60 pb-1.5">
            <span>{isBn ? 'মিডিয়া লাইব্রেরি থেকে ছবি বেছে নিন:' : 'Choose photo from media library:'}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-purple-600 hover:text-purple-900 text-xs cursor-pointer"
            >
              {isBn ? 'বন্ধ করুন ✕' : 'Close ✕'}
            </button>
          </div>
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-72 overflow-y-scroll custom-visible-scrollbar p-2.5 border-2 border-purple-300 rounded-xl bg-white shadow-inner overscroll-contain"
          >
            {PRESET_LIBRARY_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(img.url);
                  setIsOpen(false);
                }}
                className={`group relative rounded-xl overflow-hidden border transition-all text-left cursor-pointer ${
                  value === img.url ? 'ring-2 ring-purple-600 border-purple-600' : 'border-slate-200 hover:border-purple-400'
                }`}
              >
                <img src={img.url} alt={img.label} className="w-full h-14 object-cover group-hover:scale-105 transition-transform" />
                <p className="text-[10px] p-1 bg-white truncate font-medium text-slate-700">{img.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

