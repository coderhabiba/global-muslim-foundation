'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";
import { useModalState } from "@/lib/modal-context";
import { useSiteSettings } from "@/lib/site-settings";
import { useSiteCMS } from "@/lib/site-cms";

export default function SiteFooter() {
  const pathname = usePathname();
  const { openLicenseModal, openPaymentModal, showAlert } = useModalState();
  const { language } = useSiteSettings();
  const { cms } = useSiteCMS();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('gmcf:admin_auth');
      setIsAdminLoggedIn(Boolean(auth));
    } catch {}
  }, [pathname]);

  const isBn = language === 'bn';

  const showPrivacyPolicy = () => {
    showAlert({
      title: isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy',
      message: isBn
        ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF) দাতাদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করে। আপনার নাম, ফোন নম্বর, ইমেইল এবং পেমেন্ট সংক্রান্ত তথ্য সম্পূর্ণ গোপন রাখা হয় এবং কখনোই কোনো তৃতীয় পক্ষের সাথে বাণিজ্যিক উদ্দেশ্যে শেয়ার বা বিক্রি করা হয় না। সকল অনুদান বাংলাদেশ ব্যাংকের অনুমোদিত এনক্রিপ্টেড পেমেন্ট গেটওয়ের মাধ্যমে সুরক্ষিতভাবে সম্পন্ন হয়।'
        : 'Global Muslim Charitable Foundation (GMCF) upholds strict data privacy standards. Donor names, phone numbers, email addresses, and payment records are kept strictly confidential and never shared or sold. All donations are securely processed via Bangladesh Bank-licensed encrypted payment systems.',
      type: 'info',
      confirmText: isBn ? 'ঠিক আছে' : 'Understood',
    });
  };

  const showTermsOfUse = () => {
    showAlert({
      title: isBn ? 'ব্যবহারের শর্তাবলি (Terms of Use)' : 'Terms of Use',
      message: isBn
        ? 'GMCF প্ল্যাটফর্মের মাধ্যমে প্রদত্ত সকল যাকাত, সদকা ও সাধারণ অনুদান নির্ধারিত ইসলামী শরীয়াহ নীতিমালা এবং বাংলাদেশ সরকারের সমাজকল্যাণ আইনের বিধান অনুযায়ী দুস্থ, এতিম ও দুর্যোগকবলিত মানুষের কল্যাণে শতভাগ স্বচ্ছতার সাথে ব্যবহৃত হয়। অনুদানকারী ব্যক্তি স্বেচ্ছায় ও সৎ উদ্দেশ্যে দান করছেন বলে গণ্য হবে।'
        : 'All Zakat, Sadaqah, and charitable gifts made through GMCF are disbursed in strict accordance with Islamic Shariah governance and Bangladesh NGO regulatory statutes. Funds directly support impoverished families, orphans, and relief operations with 100% transparency.',
      type: 'info',
      confirmText: isBn ? 'ঠিক আছে' : 'Understood',
    });
  };

  const showRefundPolicy = () => {
    showAlert({
      title: isBn ? 'অনুদান ও রিফান্ড নীতি (Donation & Refund Policy)' : 'Donation & Refund Policy',
      message: isBn
        ? 'যেহেতু অনুদানের অর্থ সরাসরি অভাবী মানুষের খাদ্য, চিকিৎসা বা জরুরি ত্রাণের কাজে বরাদ্দ হয়, তাই সাধারণত অনুদান রিফান্ডযোগ্য নয়। তবে ভুলবশত দ্বৈত লেনদেন (Duplicate Transaction) বা প্রযুক্তিগত ত্রুটি ঘটলে ২৪-৪৮ ঘণ্টার মধ্যে ট্রানজেকশন আইডিসহ আমাদের হটলাইনে (০১৯১৩১১৯৫২৫) যোগাযোগ করলে যাচাই সাপেক্ষে দ্রুত সমাধান ও অর্থ ফেরত দেওয়া হবে।'
        : 'Charitable donations disbursed to field relief projects are generally non-refundable. However, in the case of inadvertent duplicate transactions or technical gateway errors, donors may contact our hotline (+8801913119525) within 48 hours with the transaction ID for swift resolution and refund.',
      type: 'info',
      confirmText: isBn ? 'ঠিক আছে' : 'Understood',
    });
  };

  if (pathname === '/login') {
    return null;
  }

  return (
    <footer data-l10n="off" className="w-full bg-[#f3f6f4] text-slate-800 border-t border-slate-200">
      {/* Top Trust Bar */}
      <div className="bg-emerald-dark text-on-primary py-6 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary-container flex items-center justify-center text-gold-warm border border-white/20 shrink-0">
              <span className="material-symbols-outlined text-[26px]">
                verified
              </span>
            </div>
            <div>
              <h4 className="font-serif-heading text-lg font-bold text-white">
                {isBn
                  ? '১০০% যাকাত গ্যারান্টি ও শতভাগ স্বচ্ছতা'
                  : '100% Zakat Guarantee & Absolute Transparency'}
              </h4>
              <p className="text-xs text-primary-fixed">
                {isBn
                  ? 'আপনার দেওয়া যাকাতের প্রতিটি পয়সা কঠোর শরীয়াহ তদারকিতে সরাসরি উপযুক্ত মুস্তাহিকদের হাতে পৌঁছে দেওয়া হয়।'
                  : 'Every cent of your Zakat directly reaches qualified beneficiaries under rigorous Shariah stewardship.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openLicenseModal()}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {isBn ? 'লাইসেন্স ও সনদপত্র দেখুন' : 'View Official Licenses'}
            </button>
            <button
              type="button"
              onClick={() => openPaymentModal({ amount: isBn ? 1000 : 25, cause: 'General Zakat Fund' })}
              className="bg-surface-clean text-primary hover:bg-surface-subtle-mint text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              {isBn ? 'অনুদান দিন' : 'Donate'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Registration */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Link href="/" className="inline-block">
                <img
                  src={cms.header_footer.footerLogoImage || cms.header_footer.logoImage || '/images/gmcf-logo-full.png'}
                  alt="Global Muslim Charitable Foundation Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-xs font-semibold text-emerald-800 italic">
                {isBn ? (cms.header_footer.slogan || '“Your Kindness is someone\'s hope”') : (cms.header_footer.sloganEn || cms.header_footer.slogan || '“Your Kindness is someone\'s hope”')}
              </p>
              <span className="text-xs text-text-muted font-medium">
                {isBn
                  ? `চেয়ারম্যান: ${cms.header_footer.chairmanName || 'মোহাম্মদ আলী মোস্তফা'}`
                  : `Chairman: ${cms.header_footer.chairmanNameEn || 'Mohammad Ali Mostafa'}`}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {isBn
                ? 'বাংলাদেশসহ বিশ্বজুড়ে অনাহার নিবারণ, এতিম প্রতিপালন, বিশুদ্ধ পানি সরবরাহ এবং স্থায়ী পুনর্বাসনে নিবেদিত।'
                : 'Dedicated to serving the destitute, orphans, hunger relief, and community empowerment across Bangladesh and beyond.'}
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openLicenseModal()}
                className="inline-flex items-center gap-1.5 text-[11px] bg-zakat-gold-light border border-amber-300 text-amber-900 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg font-bold text-left transition-colors cursor-pointer w-fit"
              >
                <span className="material-symbols-outlined text-[15px] text-amber-700">verified</span>
                <span>
                  {isBn
                    ? `সরকারি নিবন্ধন: #${cms.header_footer.registrationNo || 'S-14086/2023'} (সনদ দেখুন)`
                    : `Govt Reg: #${cms.header_footer.registrationNo || 'S-14086/2023'} (View License)`}
                </span>
              </button>
              <a
                href="/images/permit.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 hover:text-emerald-950 font-bold hover:underline w-fit"
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-700">picture_as_pdf</span>
                <span>{isBn ? 'মূল সরকারি লাইসেন্স PDF দেখুন' : 'View Govt License PDF'}</span>
              </a>
            </div>

            {/* Social Media Links with Editable Links & Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isBn ? 'সোশ্যাল মিডিয়াতে যুক্ত থাকুন' : 'Connect on Social Media'}
              </p>
              <div className="flex items-center gap-2">
                {cms.header_footer.facebookUrl && (
                  <a
                    href={cms.header_footer.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-8 h-8 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </a>
                )}
                {cms.header_footer.youtubeUrl && (
                  <a
                    href={cms.header_footer.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.19C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                    </svg>
                  </a>
                )}
                {cms.header_footer.whatsappNumber && (
                  <a
                    href={
                      cms.header_footer.whatsappNumber.startsWith('http')
                        ? cms.header_footer.whatsappNumber
                        : `https://wa.me/${cms.header_footer.whatsappNumber.replace(/[^0-9]/g, '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.12.11-3.25-.77-2.73-1.13-4.48-3.92-4.62-4.1-.14-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.75 1.83.82 1.96.07.14.11.3.02.48-.09.18-.14.29-.27.44-.14.15-.29.33-.42.44-.14.12-.29.26-.12.55.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.61-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.69-.17 1.37z"/>
                    </svg>
                  </a>
                )}
                {cms.header_footer.instagramUrl && (
                  <a
                    href={cms.header_footer.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-8 h-8 rounded-lg bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {cms.header_footer.linkedinUrl && (
                  <a
                    href={cms.header_footer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="w-8 h-8 rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Appeals List */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              {isBn ? 'বিশেষ মানবিক আপিলসমূহ' : 'Featured Appeals'}
            </h3>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/sponsor-orphan"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'দুস্থ শিশু স্পনসর ও হেফজ সহায়তা' : 'Sponsor Vulnerable Children & Quran Hifz'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/news"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'সাম্প্রতিক সংবাদ ও ফিল্ড আপডেট' : 'Current News & Field Reports'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/impact"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'আমাদের প্রজেক্ট সমূহ' : 'Our Foundation Projects'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/upcoming-projects"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'আসন্ন প্রকল্পসমূহ' : 'Upcoming Strategic Projects'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/gallery"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'মাঠপর্যায়ের স্থিরচিত্র গ্যালারি' : 'Verified Field Photo Gallery'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/zakat-calculator"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'শরীয়াহ যাকাত ক্যালকুলেটর' : 'Shariah Zakat Calculator'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/volunteer"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Join as Youth Volunteer'}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group hover:text-primary transition-all flex items-center gap-1.5"
                  href="/about"
                >
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    chevron_right
                  </span>
                  <span>{isBn ? 'আমাদের লক্ষ্য ও ভিশন' : 'About Foundation & Governance'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Office */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              {isBn ? 'প্রধান নিবন্ধিত কার্যালয়' : 'Registered Office'}
            </h3>
            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">
                  location_on
                </span>
                <span>
                  <strong>{isBn ? 'প্রধান কার্যালয়:' : 'Head Office:'}</strong>{' '}
                  {isBn
                    ? (cms.header_footer.address || '৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা, বাংলাদেশ')
                    : (cms.header_footer.addressEn || '99, Kaisharchor, Vakurta, Savar, Dhaka, Bangladesh')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  person
                </span>
                <span>
                  <strong>{isBn ? 'চেয়ারম্যান:' : 'Chairman:'}</strong>{' '}
                  {isBn
                    ? (cms.header_footer.chairmanName || 'মোহাম্মদ আলী মোস্তফা')
                    : (cms.header_footer.chairmanNameEn || 'Mohammad Ali Mostafa')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  call
                </span>
                <a href={`tel:${cms.header_footer.hotline}`} className="hover:underline font-semibold text-emerald-dark">
                  {cms.header_footer.hotline}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  mail
                </span>
                <a href={`mailto:${cms.header_footer.email}`} className="hover:underline">
                  {cms.header_footer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Updates */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              {isBn ? 'মাঠপর্যায়ের বুলেটিন' : 'Field Bulletins'}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {isBn
                ? 'আমাদের নিয়মিত মাঠপর্যায়ের মানবিক রিপোর্ট এবং অডিট আপডেট সরাসরি পেতে যুক্ত থাকুন।'
                : 'Receive verified field impact dispatch reports and tax exemption updates directly.'}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* ── EPS Mandatory Payment Gateway Footer ─────────────────────────────
             Required by EPS (Easy Payment System) merchant agreement.
             Must be displayed on the merchant website after integration.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-border-subtle">
          {/* Desktop footer image */}
          <div className="hidden sm:flex flex-col items-center gap-3">
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">
              {isBn ? 'পেমেন্ট পরিষেবা প্রদানকারী' : 'Powered by Payment Service Provider'}
            </p>
            <a
              href="https://eps.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              title="EPS – Easy Payment System | Bangladesh Bank Licensed PSP"
              className="w-full flex justify-center py-1"
            >
              <img
                src="/images/payment/eps-footer-desktop-light.png"
                alt="EPS – Easy Payment System | Bangladesh Bank Licensed PSP Gateway"
                className="h-14 md:h-16 w-auto max-w-full object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
            </a>
            <div className="flex items-center gap-2.5 text-[10px] text-text-muted flex-wrap justify-center">
              <img
                src="/images/payment/eps-pso-licensed.png"
                alt="PSO Licensed"
                className="h-6 w-auto object-contain"
              />
              <img
                src="/images/eps_extracted/image003.png"
                alt="PCI DSS Compliant"
                className="h-5 w-auto object-contain"
              />
              <span>
                {isBn
                  ? 'বাংলাদেশ ব্যাংক অনুমোদিত PSO ও PCI-DSS সার্টিফাইড পেমেন্ট সিস্টেম'
                  : 'Bangladesh Bank Licensed Payment Service Operator (PSO) & PCI-DSS Certified'}
              </span>
              <span className="font-semibold text-slate-600">· 09609377377</span>
            </div>
          </div>

          {/* Mobile footer image */}
          <div className="flex sm:hidden flex-col items-center gap-2">
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">
              {isBn ? 'পেমেন্ট পরিষেবা' : 'Payment by'}
            </p>
            <a
              href="https://eps.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center py-1"
            >
              <img
                src="/images/payment/eps-footer-mobile-light.png"
                alt="EPS – Easy Payment System"
                className="h-14 w-auto max-w-[92vw] object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
            </a>
            <div className="flex items-center gap-2 text-[10px] text-text-muted flex-wrap justify-center">
              <img src="/images/payment/eps-pso-licensed.png" alt="PSO Licensed" className="h-5 w-auto object-contain" />
              <img src="/images/eps_extracted/image003.png" alt="PCI DSS Compliant" className="h-4 w-auto object-contain" />
              <span>PSO Licensed &amp; PCI-DSS · Bangladesh Bank</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center text-center sm:text-left">
            <p>
              {isBn
                ? (cms.header_footer.copyrightText || '© ২০২৬ গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)। সর্বস্বত্ব সংরক্ষিত।')
                : (cms.header_footer.copyrightTextEn || '© 2026 Global Muslim Charitable Foundation (GMCF). All rights reserved.')}
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-xs">
            <button
              type="button"
              onClick={showPrivacyPolicy}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <button
              type="button"
              onClick={showTermsOfUse}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              {isBn ? 'ব্যবহারের শর্তাবলি' : 'Terms of Use'}
            </button>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <button
              type="button"
              onClick={showRefundPolicy}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              {isBn ? 'অনুদান ও রিফান্ড নীতি' : 'Refund Policy'}
            </button>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <Link
              className="hover:text-emerald-950 transition-colors font-bold text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200"
              href={isAdminLoggedIn ? "/admin" : "/login"}
              title={
                isAdminLoggedIn
                  ? (isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard')
                  : (isBn ? 'অনুমোদিত স্টাফ ও অ্যাডমিনদের জন্য' : 'Authorized Staff & Admin Login')
              }
            >
              <span className="material-symbols-outlined text-[13px] text-emerald-700">lock</span>
              <span>
                {isAdminLoggedIn
                  ? (isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard')
                  : (isBn ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal')}
              </span>
            </Link>
          </div>
        </div>
     
      </div>
    </footer>
  );
}
