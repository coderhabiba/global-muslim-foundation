'use client';

import React, { useState } from 'react';
import { useSiteCMS, SitePageKey, DEFAULT_CMS_CONTENT } from '@/lib/site-cms';
import ImageSelectorField from './ImageSelectorField';

const PAGE_DEFINITIONS: { key: SitePageKey; title: string; subtitle: string; icon: string; count: number }[] = [
  { key: 'header_footer', title: 'ন্যাভবার ও ফুটার', subtitle: 'স্লোগান, হটলাইন, ইমেইল, মেনু বাটন ও কপিরাইট', icon: 'view_quilt', count: 17 },
  { key: 'home', title: '১. হোমপেইজ (Home)', subtitle: 'হিরো, কুইক ডোনেশন, খাদ্য ও পানি সেকশন, সিটিএ', icon: 'home', count: 21 },
  { key: 'about', title: '২. আমাদের সম্পর্কে (About Us)', subtitle: 'মিশন, ভিশন, অডিট মেট্রিক, লাইসেন্স ও বোর্ড', icon: 'info', count: 16 },
  { key: 'sponsor_orphan', title: '৩. দুস্থ শিশু স্পনসর (Sponsor Child)', subtitle: 'হাদিস, প্যাকেজ ১/২/৩, বেনিফিটস ও ডোনেশন প্ল্যান', icon: 'child_care', count: 16 },
  { key: 'upcoming_projects', title: '৪. আসন্ন প্রকল্প (Upcoming)', subtitle: 'প্রজেক্ট ১/২/৩ টাইটেল, বাজেট ও বিস্তারিত বিবরণ', icon: 'construction', count: 14 },
  { key: 'impact', title: '৫. আমাদের প্রজেক্ট সমূহ (Our Projects)', subtitle: 'খাদ্য, নলকূপ, গৃহহীন ও চিকিৎসা পরিসংখ্যান', icon: 'volunteer_activism', count: 12 },
  { key: 'zakat_calculator', title: '৬. যাকাত ক্যালকুলেটর (Zakat)', subtitle: 'সোনার/রূপার নিসাব, যাকাত তামলিক পলিসি ও প্রশ্নোত্তর', icon: 'calculate', count: 11 },
  { key: 'gallery', title: '৭. ফটো গ্যালারি (Gallery)', subtitle: 'গ্যালারি শিরোনাম, ৫টি ফিল্টার ক্যাটাগরি ও নোটিশ', icon: 'photo_library', count: 8 },
  { key: 'volunteer', title: '৮. স্বেচ্ছাসেবক নিবন্ধন (Volunteer)', subtitle: 'আবেদন ফরম শিরোনাম, ৩টি সুবিধা, যোগ্যতা ও রুলস', icon: 'group_add', count: 10 },
];

export default function AdminPageCmsEditor() {
  const { cms, updatePageContent, resetPageContent, isSaving } = useSiteCMS();
  const [selectedPage, setSelectedPage] = useState<SitePageKey>('home');
  const [pageData, setPageData] = useState<any>(cms[selectedPage]);
  const [saveToast, setSaveToast] = useState(false);

  const handleSelectPage = (key: SitePageKey) => {
    setSelectedPage(key);
    setPageData(cms[key]);
  };

  const handleFieldChange = (field: string, value: string) => {
    setPageData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageContent(selectedPage, pageData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    if (confirm('আপনি কি এই পেইজের সকল লেখা ও ছবি পূর্বের মূল ডিফল্ট সংস্করণে ফিরিয়ে নিতে চান?')) {
      resetPageContent(selectedPage);
      setPageData(DEFAULT_CMS_CONTENT[selectedPage]);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    }
  };

  const activeDef = PAGE_DEFINITIONS.find(p => p.key === selectedPage)!;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-slate-50/70">
      {/* WordPress-like Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
            <span>১০০% ফুল ডাইনামিক সিএমএস — সকল সেকশন কন্ট্রোল</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-700">dashboard_customize</span>
            <span>পেইজ ও কন্টেন্ট লাইভ এডিটর (সব পেজের সব সেকশন)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            কোনো কোডিং ছাড়া সম্পূর্ণ ওয়ার্ডপ্রেস স্টাইলে সাইটের প্রতিটি সেকশন, কার্ড, টেক্সট, পরিসংখ্যান ও বোতাম নিয়ন্ত্রণ করুন।
          </p>
        </div>

        {/* Global Save Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {saveToast && (
            <div className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-xs animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>সফলভাবে লাইভ আপডেট হয়েছে!</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Page Selector Column (8 Pages + Header/Footer) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1.5">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-2 flex items-center justify-between">
            <span>পেইজ ও সেকশন নির্বাচন</span>
            <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-bold">৯টি বিভাগ</span>
          </div>

          {PAGE_DEFINITIONS.map(p => {
            const isSelected = selectedPage === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => handleSelectPage(p.key)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-purple-700 text-white shadow-md ring-2 ring-purple-400/40'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate leading-tight">{p.title}</p>
                    <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                      {p.subtitle}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {p.count} ফিল্ড
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Live Section Editor Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Active Page Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">{activeDef.icon}</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{activeDef.title} — সকল সেকশন ফিল্ড</h4>
                <p className="text-xs text-slate-500">{activeDef.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
                title="রিসেট করুন"
              >
                ডিফল্ট রিসেট
              </button>
            </div>
          </div>

          {/* Dynamic Field Form */}
          <form onSubmit={handleSave} className="p-6 space-y-5">
            {/* 1. Header & Footer Fields */}
            {selectedPage === 'header_footer' && (
              <div className="space-y-4">
                {/* Logo Customization */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">লোগো ও ব্যানার সেটিংস</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageSelectorField
                      label="ন্যাভবার মূল লোগো (Navbar Logo Image)"
                      value={pageData.logoImage || ''}
                      onChange={url => handleFieldChange('logoImage', url)}
                      helpText="ফুল লোগো আপলোড বা সিলেক্ট করুন"
                    />
                    <ImageSelectorField
                      label="ফুটার লোগো (Footer Logo Image)"
                      value={pageData.footerLogoImage || ''}
                      onChange={url => handleFieldChange('footerLogoImage', url)}
                      helpText="ফুটার লোগো আপলোড বা সিলেক্ট করুন"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">ন্যাভবার মেনু আইটেম লেবেল</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ১ (About)</label>
                      <input type="text" value={pageData.navAbout || ''} onChange={e => handleFieldChange('navAbout', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ২ (Orphan)</label>
                      <input type="text" value={pageData.navOrphan || ''} onChange={e => handleFieldChange('navOrphan', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ৩ (Upcoming)</label>
                      <input type="text" value={pageData.navUpcoming || ''} onChange={e => handleFieldChange('navUpcoming', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ৪ (Projects)</label>
                      <input type="text" value={pageData.navProjects || ''} onChange={e => handleFieldChange('navProjects', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ৫ (Zakat)</label>
                      <input type="text" value={pageData.navZakat || ''} onChange={e => handleFieldChange('navZakat', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ৬ (Gallery)</label>
                      <input type="text" value={pageData.navGallery || ''} onChange={e => handleFieldChange('navGallery', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">মেনু ৭ (Volunteer)</label>
                      <input type="text" value={pageData.navVolunteer || ''} onChange={e => handleFieldChange('navVolunteer', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">ডোনেশন বাটন</label>
                      <input type="text" value={pageData.navDonateBtn || ''} onChange={e => handleFieldChange('navDonateBtn', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    লোগোর নিচের স্লোগান (Navbar Slogan)
                  </label>
                  <input
                    type="text"
                    value={pageData.slogan || ''}
                    onChange={e => handleFieldChange('slogan', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হটলাইন নম্বর</label>
                    <input
                      type="text"
                      value={pageData.hotline || ''}
                      onChange={e => handleFieldChange('hotline', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">অফিসিয়াল ইমেইল</label>
                    <input
                      type="text"
                      value={pageData.email || ''}
                      onChange={e => handleFieldChange('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">কেন্দ্রীয় কার্যালয়ের ঠিকানা</label>
                    <input
                      type="text"
                      value={pageData.address || ''}
                      onChange={e => handleFieldChange('address', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">চেয়ারম্যানের নাম</label>
                    <input
                      type="text"
                      value={pageData.chairmanName || ''}
                      onChange={e => handleFieldChange('chairmanName', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">সরকারি রেজিস্ট্রেশন নম্বর</label>
                    <input
                      type="text"
                      value={pageData.registrationNo || ''}
                      onChange={e => handleFieldChange('registrationNo', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                    <input
                      type="text"
                      value={pageData.whatsappNumber || ''}
                      onChange={e => handleFieldChange('whatsappNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>

                {/* Social Media Links Section */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                    সোশ্যাল মিডিয়া লিংক ও নেটওয়ার্ক (Footer Social Links)
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ফেসবুক পেজ লিংক (Facebook URL)</label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/..."
                        value={pageData.facebookUrl || ''}
                        onChange={e => handleFieldChange('facebookUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ইউটিউব চ্যানেল লিংক (YouTube URL)</label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/..."
                        value={pageData.youtubeUrl || ''}
                        onChange={e => handleFieldChange('youtubeUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">হোয়াটসঅ্যাপ নম্বর / লিংক (WhatsApp)</label>
                      <input
                        type="text"
                        placeholder="+8801913119525 বা https://wa.me/..."
                        value={pageData.whatsappNumber || ''}
                        onChange={e => handleFieldChange('whatsappNumber', e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">লিংকডইন লিংক (LinkedIn URL)</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/..."
                        value={pageData.linkedinUrl || ''}
                        onChange={e => handleFieldChange('linkedinUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ইনস্টাগ্রাম লিংক (Instagram URL)</label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/..."
                        value={pageData.instagramUrl || ''}
                        onChange={e => handleFieldChange('instagramUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ফুটার কপিরাইট টেক্সট</label>
                  <input
                    type="text"
                    value={pageData.copyrightText || ''}
                    onChange={e => handleFieldChange('copyrightText', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              </div>
            )}

            {/* 2. Home Page Fields (All Sections) */}
            {selectedPage === 'home' && (
              <div className="space-y-5">
                {/* Section A: Hero Banner */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">১. হিরো ব্যানার সেকশন (Hero Banner)</h5>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হিরো টপ ব্যাজ টেক্সট</label>
                    <input type="text" value={pageData.heroBadge || ''} onChange={e => handleFieldChange('heroBadge', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হিরো মূল শিরোনাম (Heading)</label>
                    <input type="text" value={pageData.heroTitle || ''} onChange={e => handleFieldChange('heroTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হিরো সাব-টাইটেল / বর্ণনা</label>
                    <textarea rows={2} value={pageData.heroSubtitle || ''} onChange={e => handleFieldChange('heroSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <ImageSelectorField
                      label="হিরো ব্যাকগ্রাউন্ড ইমেজ (Hero Background Image)"
                      value={pageData.heroBgImage || ''}
                      onChange={url => handleFieldChange('heroBgImage', url)}
                      helpText="কম্পিউটার থেকে ছবি আপলোড করুন অথবা প্রিসেট গ্যালারি থেকে যেকোনো ছবি বেছে নিন"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">প্রধান বোতাম টেক্সট</label>
                      <input type="text" value={pageData.heroPrimaryBtn || ''} onChange={e => handleFieldChange('heroPrimaryBtn', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">দ্বিতীয় বোতাম টেক্সট</label>
                      <input type="text" value={pageData.heroSecondaryBtn || ''} onChange={e => handleFieldChange('heroSecondaryBtn', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">স্ট্যাট ১ (দাতা)</label>
                      <input type="text" value={pageData.statsDonors || ''} onChange={e => handleFieldChange('statsDonors', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs font-bold" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">স্ট্যাট ২ (প্রকল্প)</label>
                      <input type="text" value={pageData.statsProjects || ''} onChange={e => handleFieldChange('statsProjects', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs font-bold" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">স্ট্যাট ৩ (উপকৃত)</label>
                      <input type="text" value={pageData.statsBeneficiaries || ''} onChange={e => handleFieldChange('statsBeneficiaries', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs font-bold" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">স্ট্যাট ৪ (স্বচ্ছতা)</label>
                      <input type="text" value={pageData.statsTransparency || ''} onChange={e => handleFieldChange('statsTransparency', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs font-bold" />
                    </div>
                  </div>
                </div>

                {/* Section B: Appeals & Urgent Aid */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">২. জরুরি মানবিক আবেদন সেকশন (Urgent Appeals)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">আবেদন সেকশন শিরোনাম</label>
                      <input type="text" value={pageData.appealTitle || ''} onChange={e => handleFieldChange('appealTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">আবেদন সেকশন সাব-টাইটেল</label>
                      <input type="text" value={pageData.appealSubtitle || ''} onChange={e => handleFieldChange('appealSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>
                </div>

                {/* Section C: Water & Food Campaigns */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">৩. সুপেয় পানি ও খাদ্য বিতরণ সেকশন</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">পানি প্রকল্প শিরোনাম</label>
                      <input type="text" value={pageData.waterSectionTitle || ''} onChange={e => handleFieldChange('waterSectionTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">নলকূপ প্রতি খরচ</label>
                      <input type="text" value={pageData.waterSectionCost || ''} onChange={e => handleFieldChange('waterSectionCost', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পানি প্রকল্প বিবরণ</label>
                    <input type="text" value={pageData.waterSectionDesc || ''} onChange={e => handleFieldChange('waterSectionDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <ImageSelectorField
                      label="সুপেয় পানি প্রকল্প ইমেজ"
                      value={pageData.waterSectionImage || ''}
                      onChange={url => handleFieldChange('waterSectionImage', url)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">খাদ্য কর্মসূচি শিরোনাম</label>
                      <input type="text" value={pageData.foodSectionTitle || ''} onChange={e => handleFieldChange('foodSectionTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">খাবার প্রতি খরচ</label>
                      <input type="text" value={pageData.foodSectionCost || ''} onChange={e => handleFieldChange('foodSectionCost', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">খাদ্য কর্মসূচি বিবরণ</label>
                    <input type="text" value={pageData.foodSectionDesc || ''} onChange={e => handleFieldChange('foodSectionDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <ImageSelectorField
                      label="খাদ্য কর্মসূচি ইমেজ"
                      value={pageData.foodSectionImage || ''}
                      onChange={url => handleFieldChange('foodSectionImage', url)}
                    />
                  </div>
                </div>

                {/* Section D: Call To Action (CTA Banner) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">৪. নিচের যাকাত ও অনুদান আহ্বান ব্যানার (CTA Banner)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">ব্যানার শিরোনাম</label>
                      <input type="text" value={pageData.ctaBannerTitle || ''} onChange={e => handleFieldChange('ctaBannerTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">ব্যানার বোতাম টেক্সট</label>
                      <input type="text" value={pageData.ctaBannerBtn || ''} onChange={e => handleFieldChange('ctaBannerBtn', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ব্যানার বিস্তারিত বার্তা</label>
                    <input type="text" value={pageData.ctaBannerDesc || ''} onChange={e => handleFieldChange('ctaBannerDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* 3. About Us Fields (All Sections) */}
            {selectedPage === 'about' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">শীর্ষ ব্যানার ও চার অডিট মেট্রিক</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                      <input type="text" value={pageData.pageTitle || ''} onChange={e => handleFieldChange('pageTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">টপ ট্রাস্ট ব্যাজ</label>
                      <input type="text" value={pageData.pageBadge || ''} onChange={e => handleFieldChange('pageBadge', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ সাব-টাইটেল / সারসংক্ষেপ</label>
                    <textarea rows={2} value={pageData.pageSubtitle || ''} onChange={e => handleFieldChange('pageSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <ImageSelectorField
                      label="আমাদের সম্পর্কে পেইজের ব্যানার ছবি"
                      value={pageData.bannerImage || ''}
                      onChange={url => handleFieldChange('bannerImage', url)}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">মেট্রিক ১ (যাকাত বণ্টন)</label>
                      <input type="text" value={pageData.statZakatRatio || ''} onChange={e => handleFieldChange('statZakatRatio', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">মেট্রিক ২ (অ্যাডমিন কস্ট)</label>
                      <input type="text" value={pageData.statAdminCost || ''} onChange={e => handleFieldChange('statAdminCost', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">মেট্রিক ৩ (স্বাবলম্বী পরিবার)</label>
                      <input type="text" value={pageData.statFamiliesUplifted || ''} onChange={e => handleFieldChange('statFamiliesUplifted', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">মেট্রিক ৪ (অডিট রেটিং)</label>
                      <input type="text" value={pageData.statAuditRating || ''} onChange={e => handleFieldChange('statAuditRating', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">মিশন, ভিশন ও আমানতের চার স্তম্ভ</h5>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">মিশন বিস্তারিত বিবরণ (Our Mission)</label>
                    <textarea rows={2} value={pageData.missionDesc || ''} onChange={e => handleFieldChange('missionDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ভিশন বিস্তারিত বিবরণ (Our Vision)</label>
                    <textarea rows={2} value={pageData.visionDesc || ''} onChange={e => handleFieldChange('visionDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">চার স্তম্ভ সেকশন টাইটেল</label>
                      <input type="text" value={pageData.pillarTitle || ''} onChange={e => handleFieldChange('pillarTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">চার স্তম্ভ সাব-টাইটেল</label>
                      <input type="text" value={pageData.pillarSubtitle || ''} onChange={e => handleFieldChange('pillarSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">সরকারি লাইসেন্স ও পরিচালনা পর্ষদ সেকশন</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">রেজিস্ট্রেশন হেডিং</label>
                      <input type="text" value={pageData.regTitle || ''} onChange={e => handleFieldChange('regTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">রেজিস্ট্রেশন নম্বর টেক্সট</label>
                      <input type="text" value={pageData.regNumber || ''} onChange={e => handleFieldChange('regNumber', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">সরকারি আইনের বিবরণী</label>
                    <input type="text" value={pageData.regDetails || ''} onChange={e => handleFieldChange('regDetails', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Sponsor Child Fields (All Sections) */}
            {selectedPage === 'sponsor_orphan' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">টপ ব্যানার ও এতিম প্রতিপালনের হাদিস</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                      <input type="text" value={pageData.pageTitle || ''} onChange={e => handleFieldChange('pageTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">মাসিক স্পনসর খরচ (টাকা)</label>
                      <input type="text" value={pageData.monthlyCostBdt || ''} onChange={e => handleFieldChange('monthlyCostBdt', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-mono font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পবিত্র হাদিসের উক্তি (Hadith Quote)</label>
                    <input type="text" value={pageData.hadithQuote || ''} onChange={e => handleFieldChange('hadithQuote', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">হাদিসের রেফারেন্স / সূত্র</label>
                    <input type="text" value={pageData.hadithSource || ''} onChange={e => handleFieldChange('hadithSource', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-semibold" />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">শিশুদের নিশ্চিত সুযোগ-সুবিধাসমূহ</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ১</label>
                      <input type="text" value={pageData.benefit1 || ''} onChange={e => handleFieldChange('benefit1', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ২</label>
                      <input type="text" value={pageData.benefit2 || ''} onChange={e => handleFieldChange('benefit2', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ৩</label>
                      <input type="text" value={pageData.benefit3 || ''} onChange={e => handleFieldChange('benefit3', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ৪</label>
                      <input type="text" value={pageData.benefit4 || ''} onChange={e => handleFieldChange('benefit4', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">৩টি স্পনসরশিপ প্যাকেজ কার্ড (Plans)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border">
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ১ নাম</label>
                      <input type="text" value={pageData.package1Title || ''} onChange={e => handleFieldChange('package1Title', e.target.value)} className="w-full px-2 py-1 border rounded mb-2 font-bold" />
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ১ দর</label>
                      <input type="text" value={pageData.package1Price || ''} onChange={e => handleFieldChange('package1Price', e.target.value)} className="w-full px-2 py-1 border rounded font-mono font-bold text-emerald-800" />
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ২ নাম</label>
                      <input type="text" value={pageData.package2Title || ''} onChange={e => handleFieldChange('package2Title', e.target.value)} className="w-full px-2 py-1 border rounded mb-2 font-bold" />
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ২ দর</label>
                      <input type="text" value={pageData.package2Price || ''} onChange={e => handleFieldChange('package2Price', e.target.value)} className="w-full px-2 py-1 border rounded font-mono font-bold text-emerald-800" />
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ৩ নাম</label>
                      <input type="text" value={pageData.package3Title || ''} onChange={e => handleFieldChange('package3Title', e.target.value)} className="w-full px-2 py-1 border rounded mb-2 font-bold" />
                      <label className="font-bold block text-slate-700 mb-1">প্যাকেজ ৩ দর</label>
                      <input type="text" value={pageData.package3Price || ''} onChange={e => handleFieldChange('package3Price', e.target.value)} className="w-full px-2 py-1 border rounded font-mono font-bold text-emerald-800" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Upcoming Projects Fields */}
            {selectedPage === 'upcoming_projects' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">১. প্রধান আসন্ন প্রকল্প (Featured Project)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">প্রকল্পের পূর্ণ নাম</label>
                      <input type="text" value={pageData.featuredProjectTitle || ''} onChange={e => handleFieldChange('featuredProjectTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">বাজেট লক্ষ্যমাত্রা (টাকা)</label>
                      <input type="text" value={pageData.featuredProjectTarget || ''} onChange={e => handleFieldChange('featuredProjectTarget', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-mono font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রকল্পের বিস্তারিত বিবরণ ও উদ্দেশ্য</label>
                    <textarea rows={2} value={pageData.featuredProjectDesc || ''} onChange={e => handleFieldChange('featuredProjectDesc', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <ImageSelectorField
                      label="প্রধান প্রকল্পের প্রিভিউ ছবি (Featured Project Image)"
                      value={pageData.featuredProjectImage || ''}
                      onChange={url => handleFieldChange('featuredProjectImage', url)}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">২. দ্বিতীয় ও তৃতীয় ভবিষ্যৎ প্রকল্প</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border space-y-2">
                      <label className="font-bold text-slate-700 block">প্রকল্প ২ নাম</label>
                      <input type="text" value={pageData.project2Title || ''} onChange={e => handleFieldChange('project2Title', e.target.value)} className="w-full px-2 py-1.5 border rounded" />
                      <label className="font-bold text-slate-700 block">বাজেট (টাকা)</label>
                      <input type="text" value={pageData.project2Target || ''} onChange={e => handleFieldChange('project2Target', e.target.value)} className="w-full px-2 py-1.5 border rounded font-mono font-bold" />
                    </div>
                    <div className="bg-white p-3 rounded-lg border space-y-2">
                      <label className="font-bold text-slate-700 block">প্রকল্প ৩ নাম</label>
                      <input type="text" value={pageData.project3Title || ''} onChange={e => handleFieldChange('project3Title', e.target.value)} className="w-full px-2 py-1.5 border rounded" />
                      <label className="font-bold text-slate-700 block">বাজেট (টাকা)</label>
                      <input type="text" value={pageData.project3Target || ''} onChange={e => handleFieldChange('project3Target', e.target.value)} className="w-full px-2 py-1.5 border rounded font-mono font-bold" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Impact / Our Projects Fields */}
            {selectedPage === 'impact' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">মাঠপর্যায়ের ৪টি প্রধান প্রভাব মেট্রিক কার্ড (সংখ্যা উপরে ও বিবরণী নিচে)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-800">১ম কার্ড (নলকূপ)</p>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">সংখ্যা / কাউন্ট</label>
                        <input type="text" placeholder="০" value={pageData.waterWellsCount || ''} onChange={e => handleFieldChange('waterWellsCount', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg font-bold" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">বিবরণী লেবেল</label>
                        <input type="text" placeholder="সুপেয় পানির নলকূপ" value={pageData.waterWellsLabel || ''} onChange={e => handleFieldChange('waterWellsLabel', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg text-slate-700" />
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-800">২য় কার্ড (খাদ্য)</p>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">সংখ্যা / কাউন্ট</label>
                        <input type="text" placeholder="০" value={pageData.mealsDelivered || ''} onChange={e => handleFieldChange('mealsDelivered', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg font-bold text-amber-600" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">বিবরণী লেবেল</label>
                        <input type="text" placeholder="খাবার প্যাকেট বিতরণ" value={pageData.mealsDeliveredLabel || ''} onChange={e => handleFieldChange('mealsDeliveredLabel', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg text-slate-700" />
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-800">৩য় কার্ড (পুনর্বাসন)</p>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">সংখ্যা / কাউন্ট</label>
                        <input type="text" placeholder="০" value={pageData.familiesRehabilitated || ''} onChange={e => handleFieldChange('familiesRehabilitated', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg font-bold" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">বিবরণী লেবেল</label>
                        <input type="text" placeholder="পুনর্বাসিত পরিবার" value={pageData.familiesRehabilitatedLabel || ''} onChange={e => handleFieldChange('familiesRehabilitatedLabel', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg text-slate-700" />
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-800">৪র্থ কার্ড (জেলা)</p>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">সংখ্যা / কাউন্ট</label>
                        <input type="text" placeholder="০" value={pageData.districtsCovered || ''} onChange={e => handleFieldChange('districtsCovered', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg font-bold text-amber-600" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">বিবরণী লেবেল</label>
                        <input type="text" placeholder="জেলা কভারেজ" value={pageData.districtsCoveredLabel || ''} onChange={e => handleFieldChange('districtsCoveredLabel', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 border rounded-lg text-slate-700" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">স্বচ্ছতা ও অডিট রিপোর্ট ডাউনলোড সেকশন</h5>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্বচ্ছতা শিরোনাম</label>
                    <input type="text" value={pageData.summaryHeading || ''} onChange={e => handleFieldChange('summaryHeading', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্বচ্ছতা বিবরণী</label>
                    <textarea rows={2} value={pageData.summaryText || ''} onChange={e => handleFieldChange('summaryText', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* 7. Zakat Calculator Fields */}
            {selectedPage === 'zakat_calculator' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">সোনার ও রূপার নিসাব এবং যাকাত তামলিক পলিসি</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">রূপার নিসাব দর (টাকা)</label>
                      <input type="text" value={pageData.nisabSilverBdt || ''} onChange={e => handleFieldChange('nisabSilverBdt', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-mono font-bold text-emerald-800" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">স্বর্ণের নিসাব দর (টাকা)</label>
                      <input type="text" value={pageData.nisabGoldBdt || ''} onChange={e => handleFieldChange('nisabGoldBdt', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-mono font-bold text-emerald-800" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">শরীয়াহ যাকাত নির্ধারণ নিয়মাবলী</label>
                    <textarea rows={2} value={pageData.ruleText || ''} onChange={e => handleFieldChange('ruleText', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">১০০% যাকাত তামলিক পলিসি শিরোনাম</label>
                    <input type="text" value={pageData.policyHeading || ''} onChange={e => handleFieldChange('policyHeading', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">তামলিক পলিসি বিবরণী</label>
                    <textarea rows={2} value={pageData.policyDescription || ''} onChange={e => handleFieldChange('policyDescription', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">যাকাত বিষয়ক সাধারণ প্রশ্নোত্তর (FAQ)</h5>
                  <div className="space-y-2 text-xs">
                    <label className="font-bold text-slate-700 block">প্রশ্ন ১</label>
                    <input type="text" value={pageData.faq1Q || ''} onChange={e => handleFieldChange('faq1Q', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg font-bold" />
                    <label className="font-bold text-slate-700 block">উত্তর ১</label>
                    <input type="text" value={pageData.faq1A || ''} onChange={e => handleFieldChange('faq1A', e.target.value)} className="w-full px-2.5 py-1.5 bg-white border rounded-lg" />
                  </div>
                </div>
              </div>
            )}

            {/* 8. Gallery Fields */}
            {selectedPage === 'gallery' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">গ্যালারি পেইজ হেডার ও ফিল্টার ট্যাবসমূহ</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">গ্যালারি পেইজ শিরোনাম</label>
                      <input type="text" value={pageData.pageTitle || ''} onChange={e => handleFieldChange('pageTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">গ্যালারি সাব-টাইটেল</label>
                      <input type="text" value={pageData.pageSubtitle || ''} onChange={e => handleFieldChange('pageSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ট্যাব ১</label>
                      <input type="text" value={pageData.filterAll || ''} onChange={e => handleFieldChange('filterAll', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ট্যাব ২</label>
                      <input type="text" value={pageData.filterFood || ''} onChange={e => handleFieldChange('filterFood', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ট্যাব ৩</label>
                      <input type="text" value={pageData.filterWater || ''} onChange={e => handleFieldChange('filterWater', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ট্যাব ৪</label>
                      <input type="text" value={pageData.filterOrphan || ''} onChange={e => handleFieldChange('filterOrphan', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ট্যাব ৫</label>
                      <input type="text" value={pageData.filterShelter || ''} onChange={e => handleFieldChange('filterShelter', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Volunteer Fields */}
            {selectedPage === 'volunteer' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">স্বেচ্ছাসেবক আবেদন ও সুযোগ-সুবিধা</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                      <input type="text" value={pageData.pageTitle || ''} onChange={e => handleFieldChange('pageTitle', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">আবেদন ফরম শিরোনাম</label>
                      <input type="text" value={pageData.formHeading || ''} onChange={e => handleFieldChange('formHeading', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">যোগদানের প্রাথমিক যোগ্যতা ও নির্দেশিকা</label>
                    <textarea rows={2} value={pageData.joinRequirement || ''} onChange={e => handleFieldChange('joinRequirement', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ১</label>
                      <input type="text" value={pageData.benefit1 || ''} onChange={e => handleFieldChange('benefit1', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ২</label>
                      <input type="text" value={pageData.benefit2 || ''} onChange={e => handleFieldChange('benefit2', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">সুবিধা ৩</label>
                      <input type="text" value={pageData.benefit3 || ''} onChange={e => handleFieldChange('benefit3', e.target.value)} className="w-full px-2 py-1.5 bg-white border rounded" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">আবেদন পরবর্তী যোগাযোগ নোটিশ</label>
                    <input type="text" value={pageData.contactNotice || ''} onChange={e => handleFieldChange('contactNotice', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                পরিবর্তন সংরক্ষণ করলে সাথে সাথে মূল ওয়েবসাইটে প্রতিফলিত হবে।
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
