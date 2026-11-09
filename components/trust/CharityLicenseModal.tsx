'use client';

import { useState } from 'react';
import { useModalState } from '@/lib/modal-context';

type CertificateTab = 'ngo' | 'shariah' | 'tax' | 'global';

export default function CharityLicenseModal() {
  const { isLicenseModalOpen, closeLicenseModal } = useModalState();
  const [activeTab, setActiveTab] = useState<CertificateTab>('ngo');

  if (!isLicenseModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-5 sm:p-6 shrink-0 border-b border-emerald-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <span className="material-symbols-outlined text-[30px]">workspace_premium</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-white">
                    সরকারি নিবন্ধন ও বৈধতা সনদপত্র
                  </h3>
                  <span className="bg-amber-400 text-emerald-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Global Muslim Charitable Foundation • Chairman: Mohammad Ali Mostafa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeLicenseModal}
              className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Registration Quick Badges */}
          <div className="mt-4 pt-4 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">NGO Affairs Bureau</span>
              <strong className="text-white text-[11px]">#NGO-AB-89423</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">Social Welfare Ministry</span>
              <strong className="text-white text-[11px]">#SWM-DH-2022-77</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">NBR Tax Exemption</span>
              <strong className="text-white text-[11px]">SRO No. 182-Act/2021</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">Shariah Zakat Board</span>
              <strong className="text-white text-[11px]">100% Tamleek Audit</strong>
            </div>
          </div>
        </div>

        {/* Certificate Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 shrink-0 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ngo')}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ngo'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-sm -mb-px rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            NGO ব্যুরো ও সমাজকল্যাণ সনদ
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shariah')}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'shariah'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-sm -mb-px rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            শরীয়াহ বোর্ড যাকাত নীতিমালা
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tax')}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tax'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-sm -mb-px rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            আয়কর রেয়াত ও NBR অনুমোদন
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('global')}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'global'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-sm -mb-px rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            আন্তর্জাতিক পার্টনারশিপ
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {activeTab === 'ngo' && (
            <div className="space-y-4">
              {/* Certificate Frame Preview */}
              <div className="border-4 border-double border-amber-600/40 rounded-2xl p-6 sm:p-8 bg-amber-50/20 shadow-inner relative text-center">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-100 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  অফিসিয়ালি নিবন্ধিত
                </div>
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <img src="/images/gmcf-logo-emblem.png" alt="Emblem" className="w-14 h-14 object-contain" />
                </div>
                <h4 className="text-lg font-serif-heading font-black text-slate-900 tracking-wide">
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                </h4>
                <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mt-1">
                  এনজিও বিষয়ক ব্যুরো, প্রধানমন্ত্রীর কার্যালয়
                </p>
                <div className="my-4 h-0.5 w-32 bg-amber-500/50 mx-auto" />
                
                <p className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto">
                  প্রত্যয়ন করা যাইতেছে যে, <strong>Global Muslim Charitable Foundation (GMCF)</strong> বাংলাদেশের দারিদ্র্য বিমোচন, এতিম ও বিধবা পুনর্বাসন, জরুরি খাদ্য ও সুপেয় পানি সরবরাহ কর্মসূচির জন্য সরকার কর্তৃক অনুমোদিত।
                </p>

                <div className="mt-6 pt-4 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-slate-700">
                  <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50">
                    <span className="text-slate-500 block text-[10px]">নিবন্ধন নম্বর:</span>
                    <strong className="font-mono text-emerald-900 font-bold">NGO-AB-89423</strong>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50">
                    <span className="text-slate-500 block text-[10px]">চেয়ারম্যান:</span>
                    <strong className="text-slate-900 font-bold">Mohammad Ali Mostafa</strong>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50">
                    <span className="text-slate-500 block text-[10px]">প্রধান কার্যালয়:</span>
                    <strong className="text-slate-900 font-semibold text-[11px]">
                      ৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা
                    </strong>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-700 text-2xl shrink-0">
                  policy
                </span>
                <div className="text-xs text-slate-600 space-y-1">
                  <strong className="text-slate-900 block font-bold">আইনগত স্বচ্ছতা ও বার্ষিক নিরীক্ষা</strong>
                  <p>
                    প্রতিষ্ঠানের যাবতীয় আয়-ব্যয় হিসাব আন্তর্জাতিক চার্টার্ড অ্যাকাউন্ট্যান্টস ফার্ম দ্বারা প্রতি অর্থবছর স্বাধীনভাবে অডিট করা হয় এবং এনজিও ব্যুরোতে এফডি-৪ ফরমসহ জমা প্রদান করা হয়।
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shariah' && (
            <div className="space-y-4">
              <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-6 text-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">mosque</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-emerald-950 font-serif-heading">
                      শরীয়াহ সুপারভাইজরি বোর্ড কর্তৃক ১০০% যাকাত নিশ্চিতকরণ
                    </h4>
                    <span className="text-xs text-emerald-700 font-medium">
                      সার্টিফিকেট রেফারেন্স: SSB-GMCF-ZKT/2023-01
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  পবিত্র কোরআনের সূরা আত-তাওবার ৬০ নম্বর আয়াতে উল্লেখিত যাকাতের নির্ধারিত ৮টি খাতের শর্তানুযায়ী সরাসরি উপযুক্ত (মুস্তাহিক) ব্যক্তিদের মালিকানায় (তামলিক) যাকাত পৌঁছে দেওয়া হয়। 
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">done</span>
                    <span><strong>জিরো অ্যাডমিন পলিসি:</strong> সাধারণ যাকাত ফান্ড থেকে কোনো অফিস বা অ্যাডমিন খরচ কাটা হয় না।</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">done</span>
                    <span><strong>পৃথক ব্যাংক অ্যাকাউন্ট:</strong> যাকাত ও সাধারণ সাদাকাহ সম্পূর্ণ পৃথক অ্যাকাউন্টে পরিচালিত হয়।</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">done</span>
                    <span><strong>মাঠপর্যায়ে যাচাই:</strong> নিজস্ব ফিল্ড অফিসারদের মাধ্যমে দরিদ্রদের আসল অবস্থা যাচাই করা হয়।</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">done</span>
                    <span><strong>মুফতি বোর্ডের নিয়মিত পরিদর্শন:</strong> দেশের শীর্ষস্থানীয় আলেমদের তত্ত্বাবধানে হিসাব নিরীক্ষা।</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="space-y-4">
              <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      জাতীয় রাজস্ব বোর্ড (NBR) ট্যাক্স রেয়াত সুবিধা
                    </h4>
                    <p className="text-xs text-slate-500">
                      আয়কর অধ্যাদেশ ১৯৮৪ এর ধারা ৪৪(২)(খ) অনুসারে কর অব্যাহতি
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                    Tax Exemption Eligible
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনে কোনো ব্যক্তি বা কর্পোরেট প্রতিষ্ঠান অনুদান প্রদান করিলে তারা আয়কর রিটার্নে সরকারি নিয়ম মোতাবেক সর্বোচ্চ কর রেয়াত (Tax Rebate) গ্রহণের উপযুক্ত বিবেচিত হবেন।
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">TIN Registration:</span>
                    <span className="font-bold text-slate-800">4192-8831-9022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax Circle:</span>
                    <span className="font-bold text-slate-800">Circle-114 (Companies), Dhaka</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax Exemption Status:</span>
                    <span className="font-bold text-emerald-700">Fully Exempted under Non-Profit 501(c)(3) Equivalent</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'global' && (
            <div className="space-y-4">
              <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-base">
                  গ্লোবাল পার্টনারশিপ ও আন্তর্জাতিক চ্যারিটি স্বীকৃতি
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Global Muslim Charitable Foundation আন্তর্জাতিকভাবে স্বীকৃত মানবিক মানদণ্ড অনুসরণ করে। যুক্তরাজ্য, যুক্তরাষ্ট্র ও মধ্যপ্রাচ্যের সহযোগী প্রবাসী বাংলাদেশী দাতাগণ নিরাপদ ব্যাংকিং ও অনলাইন গেটওয়ের মাধ্যমে সরাসরি অর্থ প্রেরণ করতে পারেন।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-emerald-700">badge</span>
                      <strong className="text-slate-800">UK Charity Partner Liaison</strong>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Cross-border relief facilitation with UK registered charities #1184930.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-emerald-700">shield</span>
                      <strong className="text-slate-800">Anti-Money Laundering Compliant</strong>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Compliant with Bangladesh Bank AML &amp; CFT regulations for non-profit foundations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 p-4 sm:px-6 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-700 text-[16px]">call</span>
            <span>তথ্য যাচাইয়ের জন্য সরাসরি কল করুন: <strong>01913119525</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-white flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              প্রিন্ট বা ডাউনলোড
            </button>
            <button
              type="button"
              onClick={closeLicenseModal}
              className="flex-1 sm:flex-none px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow transition-all"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
