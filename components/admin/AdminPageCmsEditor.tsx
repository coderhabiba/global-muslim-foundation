'use client';

import React, { useState } from 'react';
import { useSiteCMS, SitePageKey, DEFAULT_CMS_CONTENT } from '@/lib/site-cms';

const PAGE_DEFINITIONS: { key: SitePageKey; title: string; subtitle: string; icon: string }[] = [
  { key: 'header_footer', title: 'ন্যাভবার ও ফুটার', subtitle: 'স্লোগান, হটলাইন, ইমেইল, ঠিকানা ও সোশ্যাল লিংক', icon: 'view_quilt' },
  { key: 'home', title: '১. হোমপেইজ (Home)', subtitle: 'হিরো সেকশন, ব্যানার টেক্সট, বোতাম ও পরিসংখ্যান', icon: 'home' },
  { key: 'about', title: '২. আমাদের সম্পর্কে (About Us)', subtitle: 'মিশন, ভিশন, লাইসেন্স ঘোষণা ও তথ্য', icon: 'info' },
  { key: 'sponsor_orphan', title: '৩. দুস্থ শিশু স্পনসর (Sponsor Child)', subtitle: 'মাসিক অনুদান অঙ্ক, সুযোগ-সুবিধা ও আহ্বান', icon: 'child_care' },
  { key: 'upcoming_projects', title: '৪. আসন্ন প্রকল্প (Upcoming)', subtitle: 'ভবিষ্যত প্রজেক্ট টাইটেল, বাজেট ও বিবরণ', icon: 'construction' },
  { key: 'impact', title: '৫. আমাদের প্রজেক্ট সমূহ (Our Projects)', subtitle: 'খাদ্য প্যাকেট, নলকূপ ও পুনর্বাসন রেকর্ড', icon: 'volunteer_activism' },
  { key: 'zakat_calculator', title: '৬. যাকাত ক্যালকুলেটর (Zakat)', subtitle: 'নিসাব দর, শরীয়াহ নিয়মাবলী ও যাকাত পলিসি', icon: 'calculate' },
  { key: 'gallery', title: '৭. ফটো গ্যালারি (Gallery)', subtitle: 'গ্যালারি পেজ শিরোনাম ও ফিল্টার ক্যাটাগরি', icon: 'photo_library' },
  { key: 'volunteer', title: '৮. স্বেচ্ছাসেবক নিবন্ধন (Volunteer)', subtitle: 'আবেদন ফরম শিরোনাম, শর্তাবলী ও নোটিশ', icon: 'group_add' },
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
            <span>WordPress Style Visual Site CMS Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-700">dashboard_customize</span>
            <span>পেইজ ও কন্টেন্ট লাইভ এডিটর (১০০% ডাইনামিক কন্ট্রোল)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            কোড পরিবর্তন না করেই সাইটের ৮টি প্রধান পেইজ এবং হেডার-ফুটারের যেকোনো টেক্সট, স্লোগান ও লিংক সরাসরি পরিবর্তন করুন।
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
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-2">
            পেইজ নির্বাচন করুন ({PAGE_DEFINITIONS.length}টি বিভাগ)
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
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/40'
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
                <span className={`material-symbols-outlined text-[18px] shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  chevron_right
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
                <h4 className="text-base font-bold text-slate-900">{activeDef.title} — কন্টেন্ট ফিল্ডসমূহ</h4>
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
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    লোগোর নিচের স্লোগান (Navbar Tagline)
                  </label>
                  <input
                    type="text"
                    value={pageData.slogan || ''}
                    onChange={e => handleFieldChange('slogan', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    লোগোর ঠিক নিচে এই লেখাটি প্রদর্শন করা হয়।
                  </span>
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

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">কেন্দ্রীয় কার্যালয়ের ঠিকানা</label>
                  <input
                    type="text"
                    value={pageData.address || ''}
                    onChange={e => handleFieldChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
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

            {/* 2. Home Page Fields */}
            {selectedPage === 'home' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">হিরো টপ ব্যাজ টেক্সট</label>
                  <input
                    type="text"
                    value={pageData.heroBadge || ''}
                    onChange={e => handleFieldChange('heroBadge', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">হিরো মূল শিরোনাম (Heading)</label>
                  <input
                    type="text"
                    value={pageData.heroTitle || ''}
                    onChange={e => handleFieldChange('heroTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">হিরো সাব-টাইটেল / বর্ণনা</label>
                  <textarea
                    rows={3}
                    value={pageData.heroSubtitle || ''}
                    onChange={e => handleFieldChange('heroSubtitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রধান বোতামের টেক্সট</label>
                    <input
                      type="text"
                      value={pageData.heroPrimaryBtn || ''}
                      onChange={e => handleFieldChange('heroPrimaryBtn', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">দ্বিতীয় বোতামের টেক্সট</label>
                    <input
                      type="text"
                      value={pageData.heroSecondaryBtn || ''}
                      onChange={e => handleFieldChange('heroSecondaryBtn', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্ট্যাট ১ (দাতা)</label>
                    <input
                      type="text"
                      value={pageData.statsDonors || ''}
                      onChange={e => handleFieldChange('statsDonors', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্ট্যাট ২ (প্রকল্প)</label>
                    <input
                      type="text"
                      value={pageData.statsProjects || ''}
                      onChange={e => handleFieldChange('statsProjects', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্ট্যাট ৩ (উপকৃত)</label>
                    <input
                      type="text"
                      value={pageData.statsBeneficiaries || ''}
                      onChange={e => handleFieldChange('statsBeneficiaries', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্ট্যাট ৪ (স্বচ্ছতা)</label>
                    <input
                      type="text"
                      value={pageData.statsTransparency || ''}
                      onChange={e => handleFieldChange('statsTransparency', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. About Us Fields */}
            {selectedPage === 'about' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজের শিরোনাম</label>
                    <input
                      type="text"
                      value={pageData.pageTitle || ''}
                      onChange={e => handleFieldChange('pageTitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজের সাব-টাইটেল</label>
                    <input
                      type="text"
                      value={pageData.pageSubtitle || ''}
                      onChange={e => handleFieldChange('pageSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">মিশন বর্ণনা (Our Mission)</label>
                  <textarea
                    rows={2}
                    value={pageData.missionDesc || ''}
                    onChange={e => handleFieldChange('missionDesc', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ভিশন বর্ণনা (Our Vision)</label>
                  <textarea
                    rows={2}
                    value={pageData.visionDesc || ''}
                    onChange={e => handleFieldChange('visionDesc', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">সরকারি অনুমোদন টাইটেল</label>
                    <input
                      type="text"
                      value={pageData.regTitle || ''}
                      onChange={e => handleFieldChange('regTitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">রেজিস্ট্রেশন নম্বর টেক্সট</label>
                    <input
                      type="text"
                      value={pageData.regNumber || ''}
                      onChange={e => handleFieldChange('regNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Sponsor Child Fields */}
            {selectedPage === 'sponsor_orphan' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                    <input
                      type="text"
                      value={pageData.pageTitle || ''}
                      onChange={e => handleFieldChange('pageTitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">মাসিক স্পনসরশিপ খরচ (টাকা)</label>
                    <input
                      type="text"
                      value={pageData.monthlyCostBdt || ''}
                      onChange={e => handleFieldChange('monthlyCostBdt', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ সাব-টাইটেল</label>
                  <textarea
                    rows={2}
                    value={pageData.pageSubtitle || ''}
                    onChange={e => handleFieldChange('pageSubtitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">শিশুর সুবিধাসমূহ (Benefits)</label>
                  <input
                    type="text"
                    placeholder="সুবিধা ১"
                    value={pageData.benefit1 || ''}
                    onChange={e => handleFieldChange('benefit1', e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl border-slate-300 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="সুবিধা ২"
                    value={pageData.benefit2 || ''}
                    onChange={e => handleFieldChange('benefit2', e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl border-slate-300 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="সুবিধা ৩"
                    value={pageData.benefit3 || ''}
                    onChange={e => handleFieldChange('benefit3', e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl border-slate-300 text-xs"
                  />
                </div>
              </div>
            )}

            {/* 5. Upcoming Projects Fields */}
            {selectedPage === 'upcoming_projects' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                  <input
                    type="text"
                    value={pageData.pageTitle || ''}
                    onChange={e => handleFieldChange('pageTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">আসন্ন মূল প্রজেক্টের নাম</label>
                  <input
                    type="text"
                    value={pageData.featuredProjectTitle || ''}
                    onChange={e => handleFieldChange('featuredProjectTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রাক্কলিত বাজেট লক্ষ্যমাত্রা (টাকা)</label>
                    <input
                      type="text"
                      value={pageData.featuredProjectTarget || ''}
                      onChange={e => handleFieldChange('featuredProjectTarget', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রজেক্ট ইমেজ লিংক</label>
                    <input
                      type="text"
                      value={pageData.featuredProjectImage || ''}
                      onChange={e => handleFieldChange('featuredProjectImage', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">প্রজেক্টের বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    value={pageData.featuredProjectDesc || ''}
                    onChange={e => handleFieldChange('featuredProjectDesc', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>
              </div>
            )}

            {/* 6. Impact / Our Projects Fields */}
            {selectedPage === 'impact' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                    <input
                      type="text"
                      value={pageData.pageTitle || ''}
                      onChange={e => handleFieldChange('pageTitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ সাব-টাইটেল</label>
                    <input
                      type="text"
                      value={pageData.pageSubtitle || ''}
                      onChange={e => handleFieldChange('pageSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">খাদ্য বিতরণের সংখ্যা</label>
                    <input
                      type="text"
                      value={pageData.mealsDelivered || ''}
                      onChange={e => handleFieldChange('mealsDelivered', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">নলকূপ স্থাপনের সংখ্যা</label>
                    <input
                      type="text"
                      value={pageData.waterWellsCount || ''}
                      onChange={e => handleFieldChange('waterWellsCount', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পুনর্বাসিত পরিবারের সংখ্যা</label>
                    <input
                      type="text"
                      value={pageData.familiesRehabilitated || ''}
                      onChange={e => handleFieldChange('familiesRehabilitated', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">চিকিৎসা সহায়তাপ্রাপ্ত সংখ্যা</label>
                    <input
                      type="text"
                      value={pageData.healthcareProvided || ''}
                      onChange={e => handleFieldChange('healthcareProvided', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. Zakat Calculator Fields */}
            {selectedPage === 'zakat_calculator' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                    <input
                      type="text"
                      value={pageData.pageTitle || ''}
                      onChange={e => handleFieldChange('pageTitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">রূপার নিসাব মূল্য (টাকা)</label>
                    <input
                      type="text"
                      value={pageData.nisabSilverBdt || ''}
                      onChange={e => handleFieldChange('nisabSilverBdt', e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">১০০% যাকাত পলিসি শিরোনাম</label>
                  <input
                    type="text"
                    value={pageData.policyHeading || ''}
                    onChange={e => handleFieldChange('policyHeading', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পলিসির বিবরণী (তামলিক নিশ্চিতকরণ)</label>
                  <textarea
                    rows={3}
                    value={pageData.policyDescription || ''}
                    onChange={e => handleFieldChange('policyDescription', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>
              </div>
            )}

            {/* 8. Gallery Fields */}
            {selectedPage === 'gallery' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">গ্যালারি পেইজ শিরোনাম</label>
                  <input
                    type="text"
                    value={pageData.pageTitle || ''}
                    onChange={e => handleFieldChange('pageTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">গ্যালারি সাব-টাইটেল</label>
                  <input
                    type="text"
                    value={pageData.pageSubtitle || ''}
                    onChange={e => handleFieldChange('pageSubtitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাব ১ (খাদ্য)</label>
                    <input
                      type="text"
                      value={pageData.filterFood || ''}
                      onChange={e => handleFieldChange('filterFood', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাব ২ (পানি)</label>
                    <input
                      type="text"
                      value={pageData.filterWater || ''}
                      onChange={e => handleFieldChange('filterWater', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাব ৩ (এতিম)</label>
                    <input
                      type="text"
                      value={pageData.filterOrphan || ''}
                      onChange={e => handleFieldChange('filterOrphan', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাব ৪ (ঘর)</label>
                    <input
                      type="text"
                      value={pageData.filterShelter || ''}
                      onChange={e => handleFieldChange('filterShelter', e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 9. Volunteer Fields */}
            {selectedPage === 'volunteer' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পেইজ শিরোনাম</label>
                  <input
                    type="text"
                    value={pageData.pageTitle || ''}
                    onChange={e => handleFieldChange('pageTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ফরমের মূল শিরোনাম</label>
                  <input
                    type="text"
                    value={pageData.formHeading || ''}
                    onChange={e => handleFieldChange('formHeading', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">যোগদানের প্রাথমিক যোগ্যতা ও নোটিশ</label>
                  <textarea
                    rows={2}
                    value={pageData.joinRequirement || ''}
                    onChange={e => handleFieldChange('joinRequirement', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">আবেদন পরবর্তী নোটিশ</label>
                  <input
                    type="text"
                    value={pageData.contactNotice || ''}
                    onChange={e => handleFieldChange('contactNotice', e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl border-slate-300 text-sm"
                  />
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
