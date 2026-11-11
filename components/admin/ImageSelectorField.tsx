'use client';

import React, { useState } from 'react';

const PRESET_LIBRARY_IMAGES = [
  { url: '/images/hero-relief.jpg', label: 'হিরো ব্যানার (Relief Food)' },
  { url: '/images/humanitarian-volunteers.jpg', label: 'স্বেচ্ছাসেবক টিম (Volunteers)' },
  { url: '/images/one-meal-one-hope.jpg', label: 'ওয়ান মিল ওয়ান হোপ (Meal Distribution)' },
  { url: '/images/clean-water-well.jpg', label: 'বিশুদ্ধ খাবার পানি (Tube Well)' },
  { url: '/images/drive-food-1.jpg', label: 'খাদ্য বিতরণ ১' },
  { url: '/images/drive-food-2.jpg', label: 'খাদ্য বিতরণ ২' },
  { url: '/images/drive-food-3.jpg', label: 'খাদ্য বিতরণ ৩' },
  { url: '/images/drive-water-1.jpg', label: 'নলকূপ প্রকল্প ১' },
  { url: '/images/drive-water-2.jpg', label: 'নলকূপ প্রকল্প ২' },
  { url: '/images/drive-house-1.jpg', label: 'ঘর নির্মাণ ১' },
  { url: '/images/drive-house-2.jpg', label: 'ঘর নির্মাণ ২' },
  { url: '/images/drive-orphan-1.jpg', label: 'এতিম শিশু কল্যাণ ১' },
  { url: '/images/drive-orphan-2.jpg', label: 'এতিম শিশু কল্যাণ ২' },
  { url: '/images/pediatric-hope-saifan.jpg', label: 'শিশু চিকিৎসা সহায়তা' },
  { url: '/images/project-alo-eye-care.jpg', label: 'প্রজেক্ট আলো (চক্ষু সেবা)' },
  { url: '/images/project-sheetolota-blankets.jpg', label: 'শীতবস্ত্র বিতরণ' },
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
            placeholder="/images/hero-relief.jpg বা ছবির অনলাইন URL"
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
          <span className="hidden sm:inline">আপলোড</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>

        {/* Media Library Modal Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors cursor-pointer border border-purple-200 flex items-center gap-1.5 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">photo_library</span>
          <span className="hidden sm:inline">লাইব্রেরি</span>
        </button>
      </div>

      {helpText && <p className="text-[11px] text-slate-400">{helpText}</p>}

      {/* Preset Media Library Drawer */}
      {isOpen && (
        <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-200 mt-2 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-purple-900 border-b border-purple-200/60 pb-1.5">
            <span>মিডিয়া লাইব্রেরি থেকে ছবি বেছে নিন:</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-purple-600 hover:text-purple-900 text-xs"
            >
              বন্ধ করুন ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
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
