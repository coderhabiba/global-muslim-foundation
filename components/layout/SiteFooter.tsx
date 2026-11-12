'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";
import { useModalState } from "@/lib/modal-context";
import { useSiteSettings } from "@/lib/site-settings";
import { useSiteCMS } from "@/lib/site-cms";

export default function SiteFooter() {
  const pathname = usePathname();
  const { openLicenseModal, openPaymentModal } = useModalState();
  const { language } = useSiteSettings();
  const { cms } = useSiteCMS();
  const isBn = language === 'bn';

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
              <span className="material-symbols-outlined text-[16px]">favorite</span>
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
                {cms.header_footer.slogan || '“Your Kindness is someone\'s hope”'}
              </p>
              <span className="text-xs text-text-muted font-medium">
                {isBn
                  ? `চেয়ারম্যান: ${cms.header_footer.chairmanName || 'মোহাম্মদ আলী মোস্তফা'}`
                  : `Chairman: ${cms.header_footer.chairmanName || 'Mohammad Ali Mostafa'}`}
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
                  {cms.header_footer.address || (isBn
                    ? '৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা, বাংলাদেশ'
                    : '99, Kaisharchor, Vakurta, Savar, Dhaka, Bangladesh')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  person
                </span>
                <span>
                  <strong>{isBn ? 'চেয়ারম্যান:' : 'Chairman:'}</strong>{' '}
                  {cms.header_footer.chairmanName || (isBn ? 'মোহাম্মদ আলী মোস্তফা' : 'Mohammad Ali Mostafa')}
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
            >
              <img
                src="/images/payment/eps-footer-desktop-light.png"
                alt="EPS – Easy Payment System | Bangladesh Bank Licensed PSP Gateway"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
              <img
                src="/images/payment/eps-pso-licensed.png"
                alt="PSO Licensed"
                className="h-6 w-auto object-contain"
              />
              <span>
                {isBn
                  ? 'বাংলাদেশ ব্যাংক কর্তৃক অনুমোদিত পেমেন্ট সার্ভিস অপারেটর (PSO)'
                  : 'Bangladesh Bank Licensed Payment Service Operator (PSO)'}
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
            >
              <img
                src="/images/payment/eps-footer-mobile-light.png"
                alt="EPS – Easy Payment System"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <img src="/images/payment/eps-pso-licensed.png" alt="PSO Licensed" className="h-5 w-auto object-contain" />
              <span>PSO Licensed · Bangladesh Bank</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center">
            <p>
              {cms.header_footer.copyrightText || (isBn
                ? '© ২০২৫ গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)। সর্বস্বত্ব সংরক্ষিত।'
                : '© 2025 Global Muslim Charitable Foundation (GMCF). All rights reserved worldwide.')}
            </p>
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
