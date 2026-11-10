'use client';

import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { useModalState } from "@/lib/modal-context";
import { useSiteSettings } from "@/lib/site-settings";

export default function SiteFooter() {
  const { openLicenseModal, openPaymentModal } = useModalState();
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

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
              <span className="material-symbols-outlined text-[16px]">favorite</span>
              {isBn ? 'EPS অনুদান দিন' : 'Donate via EPS'}
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
                  src="/images/gmcf-logo-full.png"
                  alt="Global Muslim Charitable Foundation Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-xs font-semibold text-emerald-800 italic">
                “Your Kindness is someone&apos;s hope”
              </p>
              <span className="text-xs text-text-muted font-medium">
                {isBn ? 'চেয়ারম্যান: মোহাম্মদ আলী মোস্তফা' : 'Chairman: Mohammad Ali Mostafa'}
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
                    ? 'সরকারি নিবন্ধন: #S-14086/2023 (সনদ দেখুন)'
                    : 'Govt Reg: #S-14086/2023 (View License)'}
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
          </div>

          {/* Appeals List */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              {isBn ? 'বিশেষ মানবিক আপিলসমূহ' : 'Featured Appeals'}
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/sponsor-orphan"
                >
                  <span className="material-symbols-outlined text-[15px] text-amber-500">
                    child_care
                  </span>
                  {isBn ? 'দুস্থ শিশু স্পনসর ও হেফজ সহায়তা' : 'Sponsor Vulnerable Children & Quran Hifz'}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/news"
                >
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">
                    newspaper
                  </span>
                  {isBn ? 'সাম্প্রতিক সংবাদ ও ফিল্ড আপডেট' : 'Current News & Field Reports'}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/impact"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    volunteer_activism
                  </span>
                  {isBn ? 'আমাদের প্রজেক্ট সমূহ' : 'Our Foundation Projects'}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/upcoming-projects"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    construction
                  </span>
                  {isBn ? 'আসন্ন প্রকল্পসমূহ' : 'Upcoming Strategic Projects'}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/gallery"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    photo_library
                  </span>
                  {isBn ? 'মাঠপর্যায়ের স্থিরচিত্র গ্যালারি' : 'Verified Field Photo Gallery'}
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
                    ? '৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা, বাংলাদেশ'
                    : '99, Kaisharchor, Vakurta, Savar, Dhaka, Bangladesh'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  person
                </span>
                <span>
                  <strong>{isBn ? 'চেয়ারম্যান:' : 'Chairman:'}</strong>{' '}
                  {isBn ? 'মোহাম্মদ আলী মোস্তফা' : 'Mohammad Ali Mostafa'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  call
                </span>
                <a href="tel:01913119525" className="hover:underline font-semibold text-emerald-dark">
                  01913119525
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  mail
                </span>
                <a href="mailto:gmcfoundation2022@gmail.com" className="hover:underline">
                  gmcfoundation2022@gmail.com
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

        {/* Bottom Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>
              {isBn
                ? '© ২০২৫ গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)। সর্বস্বত্ব সংরক্ষিত।'
                : '© 2025 Global Muslim Charitable Foundation (GMCF). All rights reserved worldwide.'}
            </p>
            <div className="flex items-center gap-1.5 opacity-80">
              <img src="/images/payment/bkash.svg" alt="bKash" className="h-4 w-auto object-contain" />
              <img src="/images/payment/nagad.svg" alt="Nagad" className="h-4 w-auto object-contain" />
              <img src="/images/payment/rocket.svg" alt="Rocket" className="h-4 w-auto object-contain" />
              <img src="/images/payment/upay.svg" alt="Upay" className="h-4 w-auto object-contain" />
              <img src="/images/payment/visa.svg" alt="Visa" className="h-4 w-auto object-contain" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-4 w-auto object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link className="hover:text-primary transition-colors" href="/">
              {isBn ? 'হোম' : 'Home'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/appeals">
              {isBn ? 'আপিলসমূহ' : 'Appeals'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/zakat-calculator">
              {isBn ? 'যাকাত ক্যালকুলেটর' : 'Zakat Calculator'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/impact">
              {isBn ? 'প্রভাব ও রিপোর্ট' : 'Impact'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/gallery">
              {isBn ? 'ফিল্ড গ্যালারি' : 'Gallery'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/members">
              {isBn ? 'সদস্য ও ভলান্টিয়ার' : 'Members'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/about">
              {isBn ? 'আমাদের সম্পর্কে' : 'About'}
            </Link>
            <Link className="hover:text-primary transition-colors" href="/upcoming-projects">
              {isBn ? 'আসন্ন প্রকল্প' : 'Upcoming Projects'}
            </Link>
            <Link
              className="hover:text-primary transition-colors font-semibold text-emerald-800"
              href="/login"
            >
              {isBn ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
