'use client';

import { useState } from 'react';
import { useModalState } from '@/lib/modal-context';
import { useSiteSettings } from '@/lib/site-settings';

type CertificateTab = 'ngo' | 'shariah' | 'tax' | 'global';

export default function CharityLicenseModal() {
  const { isLicenseModalOpen, closeLicenseModal } = useModalState();
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<CertificateTab>('ngo');

  if (!isLicenseModalOpen) return null;

  return (
    <div
      data-l10n="off"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white p-5 sm:p-6 shrink-0 border-b border-emerald-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black font-serif-heading text-white">
                    {isBn
                      ? 'সরকারি নিবন্ধন ও বৈধতা সনদপত্র'
                      : 'Government Accreditations & Official Licenses'}
                  </h3>
                  <span className="bg-amber-400 text-emerald-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {isBn ? 'যাচাইকৃত' : 'Audited & Verified'}
                  </span>
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Global Muslim Charitable Foundation •{' '}
                  {isBn
                    ? 'চেয়ারম্যান: মোহাম্মদ আলী মোস্তফা'
                    : 'Chairman: Mohammad Ali Mostafa'}
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
              <span className="text-[10px] text-emerald-300 block">
                {isBn ? 'সরকারি নিবন্ধন (RJSC)' : 'Govt. Registration (RJSC)'}
              </span>
              <strong className="text-white text-[11px] font-mono">#S-14086/2023</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">
                {isBn ? 'ইস্যু নম্বর ও তারিখ' : 'Issue No. & Date'}
              </span>
              <strong className="text-white text-[11px] font-mono">#409371 • 26/12/23</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">
                {isBn ? 'আইন ও বিধি' : 'Governing Law'}
              </span>
              <strong className="text-white text-[11px]">Act XXI of 1860</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-[10px] text-emerald-300 block">
                {isBn ? 'শরীয়াহ যাকাত বোর্ড' : 'Shariah Zakat Board'}
              </span>
              <strong className="text-white text-[11px]">
                {isBn ? '১০০% তামলিক অডিট' : '100% Tamleek Audit'}
              </strong>
            </div>
          </div>
        </div>

        {/* Certificate Navigation 4 Tabs (Clean Full-Width Responsive Flex) */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-6 shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 py-2">
            <button
              type="button"
              onClick={() => setActiveTab('ngo')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'ngo'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] shrink-0">verified</span>
              <span className="truncate">{isBn ? 'সরকারি লাইসেন্স (Permit)' : 'Govt License (Permit)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('shariah')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'shariah'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] shrink-0">auto_stories</span>
              <span className="truncate">{isBn ? 'শরীয়াহ যাকাত বোর্ড' : 'Shariah Board'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tax')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'tax'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] shrink-0">receipt_long</span>
              <span className="truncate">{isBn ? 'NBR কর রেয়াত' : 'NBR Tax Exempt'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('global')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'global'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] shrink-0">public</span>
              <span className="truncate">{isBn ? 'গ্লোবাল পার্টনারশিপ' : 'Global Partners'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {activeTab === 'ngo' && (
            <div className="space-y-5">
              {/* Top Action Bar for Permit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-xl">description</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 flex-wrap">
                      <span>{isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত নিবন্ধন সনদপত্র' : 'Govt. Approved Societies Registration Certificate'}</span>
                      <span className="bg-emerald-700 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                        #S-14086/2023
                      </span>
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {isBn
                        ? 'রেজিস্ট্রার অব জয়েন্ট স্টক কোম্পানিজ অ্যান্ড ফার্মস (RJSC) • Societies Registration Act, 1860'
                        : 'Registrar of Joint Stock Companies & Firms (RJSC) • Societies Registration Act, 1860'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/images/permit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    <span>{isBn ? 'নতুন ট্যাবে দেখুন' : 'View Fullscreen'}</span>
                  </a>
                  <a
                    href="/images/permit.pdf"
                    download="GMCF-Government-Registration-Permit.pdf"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>{isBn ? 'লাইসেন্স PDF ডাউনলোড' : 'Download PDF'}</span>
                  </a>
                </div>
              </div>

              {/* Real PDF Embed Container */}
              <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-300">
                <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-base">picture_as_pdf</span>
                    <span className="font-mono text-slate-200 font-semibold text-[11px] sm:text-xs">
                      permit.pdf • Certificate of Registration of Societies
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {isBn ? 'ডিজিটাল স্বাক্ষরিত কপি' : 'Digitally Signed'}
                  </span>
                </div>
                <iframe
                  src="/images/permit.pdf#toolbar=1&navpanes=0"
                  className="w-full h-[520px] bg-slate-100"
                  title="Global Muslim Charitable Foundation Government Registration Permit (RJSC)"
                />
              </div>

              {/* Exact Metadata Grid matching permit.pdf */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase tracking-wider">
                    {isBn ? 'নিবন্ধন নম্বর (Reg No)' : 'Registration No'}
                  </span>
                  <strong className="text-emerald-950 font-mono text-sm block mt-0.5">
                    S-14086/2023
                  </strong>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase tracking-wider">
                    {isBn ? 'ইস্যু নম্বর ও তারিখ' : 'Issue No & Date'}
                  </span>
                  <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                    #409371 • 26/12/2023
                  </strong>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase tracking-wider">
                    {isBn ? 'আইন ও বিধিমালা' : 'Governing Act'}
                  </span>
                  <strong className="text-slate-900 font-semibold text-xs block mt-0.5">
                    Societies Registration Act, 1860 (Act XXI)
                  </strong>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase tracking-wider">
                    {isBn ? 'নিবন্ধনকারী কর্তৃপক্ষ' : 'Issuing Authority'}
                  </span>
                  <strong className="text-slate-900 font-semibold text-xs block mt-0.5">
                    RJSC, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                  </strong>
                </div>
              </div>

              {/* Organization & Integrity Note */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-700 text-2xl shrink-0 mt-0.5">
                  policy
                </span>
                <div className="text-xs text-slate-600 space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">
                    {isBn ? 'আইনগত স্বীকৃতি ও স্বচ্ছ পরিচালনা' : 'Statutory Registration & Transparency'}
                  </strong>
                  <p className="leading-relaxed">
                    {isBn
                      ? 'Global Muslim Charitable Foundation গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)-এর অধীনে ১৮৬০ সালের ২১ নং আইনের আওতায় নিবন্ধিত একটি বৈধ ও স্বীকৃত দাতব্য সংস্থা (রেজিস্ট্রেশন নং: S-14086/2023)।'
                      : 'Global Muslim Charitable Foundation is officially registered under the Societies Registration Act, 1860 (Act XXI of 1860) with the Registrar of Joint Stock Companies & Firms (RJSC), Government of Bangladesh (Registration No: S-14086/2023).'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shariah' && (
            <div className="space-y-4">
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-3xl p-6 sm:p-7 text-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">mosque</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-emerald-950 font-serif-heading">
                      {isBn
                        ? 'শরীয়াহ সুপারভাইজরি বোর্ড কর্তৃক ১০০% যাকাত নিশ্চিতকরণ'
                        : '100% Zakat Policy Guaranteed by Central Shariah Board'}
                    </h4>
                    <span className="text-xs text-emerald-700 font-mono font-medium">
                      Certificate Reference: SSB-GMCF-ZKT/2023-01
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isBn
                    ? 'পবিত্র কোরআনের সূরা আত-তাওবার ৬০ নম্বর আয়াতে উল্লেখিত যাকাতের নির্ধারিত ৮টি খাতের শর্তানুযায়ী সরাসরি উপযুক্ত (মুস্তাহিক) ব্যক্তিদের পূর্ণ মালিকানায় (তামলিক) যাকাত পৌঁছে দেওয়া হয়।'
                    : 'Governed strictly by the rulings of Surah At-Tawbah (9:60), ensuring authentic direct ownership (Tamleek) transfer to qualified destitute recipients across designated Shariah categories.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">done</span>
                    <span>
                      <strong>{isBn ? 'জিরো অ্যাডমিন পলিসি:' : 'Zero Admin Deductions:'}</strong>{' '}
                      {isBn
                        ? 'সাধারণ যাকাত ফান্ড থেকে কোনো অফিস বা প্রশাসনিক খরচ কাটা হয় না।'
                        : 'Zero administrative fees deducted from Zakat contributions.'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">done</span>
                    <span>
                      <strong>{isBn ? 'পৃথক ব্যাংক অ্যাকাউন্ট:' : 'Isolated Accounts:'}</strong>{' '}
                      {isBn
                        ? 'যাকাত ও সাধারণ সাদাকাহ সম্পূর্ণ পৃথক ব্যাংক অ্যাকাউন্টে পরিচালিত হয়।'
                        : 'Zakat, Sadaqah, and general funds are kept in segregated Islamic bank accounts.'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">done</span>
                    <span>
                      <strong>{isBn ? 'মাঠপর্যায়ে যাচাই:' : 'Field Verification:'}</strong>{' '}
                      {isBn
                        ? 'নিজস্ব ফিল্ড অফিসারদের মাধ্যমে দরিদ্রদের আসল অবস্থা সরেজমিনে যাচাই করা হয়।'
                        : 'Beneficiary eligibility is verified on the ground before disbursement.'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">done</span>
                    <span>
                      <strong>{isBn ? 'মুফতি বোর্ডের পরিদর্শন:' : 'Mufti Board Inspection:'}</strong>{' '}
                      {isBn
                        ? 'দেশের শীর্ষস্থানীয় আলেম ও মুফতিদের তত্ত্বাবধানে হিসাব নিয়মিত নিরীক্ষা।'
                        : 'Islamic jurisprudents independently examine donation logs periodically.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="space-y-4">
              <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                      {isBn
                        ? 'জাতীয় রাজস্ব বোর্ড (NBR) ট্যাক্স রেয়াত সুবিধা'
                        : 'National Board of Revenue (NBR) Tax Rebate Eligibility'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isBn
                        ? 'আয়কর আইন অনুসারে অনুমোদিত দাতব্য সংস্থায় অনুদান কর অব্যাহতি প্রাপ্ত'
                        : 'Tax-deductible charitable status under Section 44(2)(b) Income Tax Ordinance.'}
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold w-fit">
                    Tax Exemption Eligible
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isBn
                    ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনে কোনো ব্যক্তি বা কর্পোরেট প্রতিষ্ঠান অনুদান প্রদান করিলে তারা আয়কর রিটার্নে সরকারি নিয়ম মোতাবেক সর্বোচ্চ কর রেয়াত (Tax Rebate) গ্রহণের উপযুক্ত বিবেচিত হবেন।'
                    : 'Donations to Global Muslim Charitable Foundation allow domestic and international corporate entities as well as individual tax-filers to claim full statutory tax rebates against charitable contributions.'}
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs space-y-2">
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
              <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                  {isBn
                    ? 'গ্লোবাল পার্টনারশিপ ও আন্তর্জাতিক চ্যারিটি স্বীকৃতি'
                    : 'Global Partnerships & Cross-Border Charity Affiliations'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isBn
                    ? 'Global Muslim Charitable Foundation আন্তর্জাতিকভাবে স্বীকৃত মানবিক মানদণ্ড অনুসরণ করে। যুক্তরাজ্য, যুক্তরাষ্ট্র ও মধ্যপ্রাচ্যের প্রবাসী বাংলাদেশী দাতাগণ নিরাপদ ব্যাংকিং ও অনলাইন গেটওয়ের মাধ্যমে সরাসরি অর্থ প্রেরণ করতে পারেন।'
                    : 'Global Muslim Charitable Foundation operates under universally verified humanitarian standards, facilitating seamless overseas giving for expatriates in the UK, USA, EU, and Middle East via audited channels.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-emerald-700">badge</span>
                      <strong className="text-slate-800">UK Charity Partner Liaison</strong>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Cross-border relief facilitation with UK registered charities under Charity Commission Reg #1184930.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-emerald-700">shield</span>
                      <strong className="text-slate-800">Anti-Money Laundering (AML) Compliant</strong>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Compliant with Bangladesh Bank &amp; international AML / CFT directives for transparent foundations.
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
            <span>
              {isBn
                ? 'তথ্য যাচাইয়ের জন্য সরাসরি কল করুন:'
                : 'Direct Verification Helpline:'}{' '}
              <strong className="text-emerald-950 font-mono">+880 1913-119525</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>{isBn ? 'প্রিন্ট বা ডাউনলোড' : 'Print / Download'}</span>
            </button>
            <button
              type="button"
              onClick={closeLicenseModal}
              className="flex-1 sm:flex-none px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
            >
              {isBn ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
