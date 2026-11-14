'use client';

import Link from 'next/link';

import { useSiteSettings } from '@/lib/site-settings';
import { useSiteCMS } from '@/lib/site-cms';
import { useModalState } from '@/lib/modal-context';
import { useSectionVisibility } from '@/lib/section-visibility';
import { DynamicLiveCounter } from '@/components/system/DynamicLiveCounter';

export default function AboutPage() {
  const { localize, language } = useSiteSettings();
  const { showAlert, openLicenseModal } = useModalState();
  const { cms } = useSiteCMS();
  const { isSectionVisible } = useSectionVisibility();
  const isBn = language === 'bn';

  return (
    <>
      <main suppressHydrationWarning className="w-full bg-surface-subtle-mint pt-[64px] sm:pt-[80px]">
        <div className="flex flex-col w-full">
          {/* Top Trust & Mission Banner */}
          {isSectionVisible('about-header') && (
          <section className="w-full bg-gradient-to-b from-surface-subtle-mint via-surface to-background px-4 sm:px-8 py-16">
            <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
              {/* Sacred Trust Badge */}

              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 shadow-2xs px-4 py-1.5 rounded-full mb-6">
                <span
                  className="material-symbols-outlined text-amber-600 text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-bold text-xs text-emerald-900 tracking-wide">
                  {isBn
                    ? (cms.about.pageBadge || 'পবিত্র আমানতের ভিত্তিতে প্রতিষ্ঠিত • নিবন্ধিত দাতব্য সংস্থা #1184930')
                    : (cms.about.pageBadgeEn || 'ESTABLISHED WITH SACRED TRUST • REGISTERED CHARITY #1184930')}
                </span>
              </div>

              {/* Main Headline */}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading max-w-4xl tracking-tight leading-tight mb-6">
                {isBn ? (
                  (() => {
                    const title = (
                      cms.about.pageTitle ||
                      'নিষ্ঠাবান দায়িত্বশীলতা। পূর্ণ স্বচ্ছতা। মর্যাদাপূর্ণ মানবিক কাজ।'
                    ).trim();
                    if (title.includes('।')) {
                      const sentences = title.split('।').map(s => s.trim()).filter(Boolean);
                      if (sentences.length >= 2) {
                        const first = sentences.slice(0, sentences.length - 1).join('। ') + '।';
                        const last = sentences[sentences.length - 1] + '।';
                        return (
                          <>
                            {first}{' '}
                            <span className="text-amber-600 dark:text-amber-500">{last}</span>
                          </>
                        );
                      }
                    }
                    if (title.includes('—')) {
                      const parts = title.split('—');
                      const first = parts[0];
                      const rest = parts.slice(1).join('—').trim();
                      return (
                        <>
                          {first} —{' '}
                          <span className="text-amber-600 dark:text-amber-500">{rest}</span>
                        </>
                      );
                    }
                    if (title.includes(',')) {
                      const parts = title.split(',');
                      const first = parts[0];
                      const rest = parts.slice(1).join(',').trim();
                      return (
                        <>
                          {first},{' '}
                          <span className="text-amber-600 dark:text-amber-500">{rest}</span>
                        </>
                      );
                    }
                    return title;
                  })()
                ) : (
                  cms.about.pageTitleEn || (
                    <>
                      Faithful Stewardship. Absolute Transparency.{' '}
                      <span className="text-amber-600 dark:text-amber-500">
                        Dignified Humanitarian Action.
                      </span>
                    </>
                  )
                )}
              </h1>

              {/* Mission Statement */}

              <p className="font-body-lg text-body-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
                {isBn
                  ? (cms.about.pageSubtitle || 'শূন্য-ওভারহেড যাকাত বিতরণ, যাচাইকৃত তামলিক মালিকানা এবং টেকসই দারিদ্র্য বিমোচনের মাধ্যমে বাংলাদেশ ও তার বাইরের দুস্থ, এতিম ও দুর্যোগকবলিত পরিবারগুলোর জীবিকা উন্নয়নে প্রতিশ্রুতিবদ্ধ।')
                  : (cms.about.pageSubtitleEn || 'Committed to lifting destitute, orphaned, and disaster-affected families through zero-overhead Zakat distribution, verified Tamleek ownership, and sustainable poverty eradication across Bangladesh and beyond.')}
              </p>

              {/* Institutional Metrics Quick-Bar */}

              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface-clean rounded-2xl shadow-sm">
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">
                    {isBn ? cms.about.statZakatRatio.split(' ')[0] : '100%'}
                  </span>
                  <span className="font-label-md text-label-md text-text-muted mt-1 uppercase tracking-wider">
                    {isBn ? cms.about.statZakatRatio : 'Zakat Distribution Ratio'}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-headline-lg text-headline-lg text-emerald-dark font-bold">
                    {isBn ? '৳০' : '৳0'}
                  </span>
                  <span className="font-label-md text-label-md text-text-muted mt-1 uppercase tracking-wider">
                    {isBn ? cms.about.statAdminCost : 'Admin Deductions from Zakat'}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-headline-lg text-headline-lg text-amber-vibrant font-bold">
                    <DynamicLiveCounter
                      value={cms.about.statFamiliesUplifted?.split(' ')[0]}
                      defaultValue={isBn ? '০' : '0'}
                      fluctuateRange={[-1, 3]}
                    />
                  </span>
                  <span className="font-label-md text-label-md text-text-muted mt-1 uppercase tracking-wider">
                    {isBn ? (cms.about.statFamiliesUplifted?.includes(' ') ? cms.about.statFamiliesUplifted.substring(cms.about.statFamiliesUplifted.indexOf(' ') + 1) : 'পরিবার স্বাবলম্বী') : 'Families Uplifted (Tamleek)'}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-headline-lg text-headline-lg text-tertiary font-bold">
                    {isBn ? 'Grade A' : 'Grade A'}
                  </span>
                  <span className="font-label-md text-label-md text-text-muted mt-1 uppercase tracking-wider">
                    {isBn ? cms.about.statAuditRating : 'Independent Audit Rating'}
                  </span>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* 4 Pillars of Sacred Stewardship */}
          {isSectionVisible('about-pillars') && (
          <section className="w-full bg-surface-clean py-20 px-4 sm:px-8">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-amber-vibrant font-bold">
                    FOUNDATIONAL PILLARS
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-emerald-dark mt-2">
                    The GMCF{' '}
                    <span className="text-amber-600 dark:text-amber-500">
                      Covenant of Trust
                    </span>
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-text-muted max-w-md">
                  Every penny entrusted into our care is governed under strict
                  divine injunctions and uncompromising financial ethics.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pillar 1 */}

                <div className="bg-surface-subtle-mint/60 p-8 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-clean shadow-sm flex items-center justify-center text-primary mb-6">
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        balance
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      01. PILLAR
                    </span>
                    <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-1 mb-3">
                      {isBn ? (cms.about.pillar1Title || 'শরীয়াহ সততা ও বিশ্বস্ততা (Shariah Integrity)') : (cms.about.pillar1TitleEn || 'Shariah Integrity')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {isBn ? (cms.about.pillar1Desc || 'প্রতিটি যাকাত ও সদকাহ তহবিল সুনির্দিষ্ট শরীয়াহ নীতিমালায় ১০০% বিশ্বস্ততার সাথে সরাসরি হকদারদের কাছে পৌঁছানো হয়।') : (cms.about.pillar1DescEn || '100% of all Zakat donations are strictly ring-fenced in a non-interest treasury account. Zero admin fees deducted.')}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    <span>{isBn ? (cms.about.pillar1Feature || 'স্বতন্ত্র শরীয়াহ বোর্ড অনুমোদিত') : (cms.about.pillar1FeatureEn || 'Independent Fatwa Certified')}</span>
                  </div>
                </div>

                {/* Pillar 2 */}

                <div className="bg-surface-subtle-mint/60 p-8 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-clean shadow-sm flex items-center justify-center text-amber-vibrant mb-6">
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        front_hand
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-amber-vibrant uppercase font-bold tracking-wider">
                      02. PILLAR
                    </span>
                    <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-1 mb-3">
                      {isBn ? (cms.about.pillar2Title || 'মর্যাদা ও পূর্ণ তামলিক (Dignity & Tamleek)') : (cms.about.pillar2TitleEn || 'Dignity & Tamleek')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {isBn ? (cms.about.pillar2Desc || 'সহায়তা প্রদানের ক্ষেত্রে সুবিধাভোগীদের সম্মান রক্ষা এবং প্রত্যক্ষ মালিকানা নিশ্চিত করা আমাদের প্রধান নীতি।') : (cms.about.pillar2DescEn || 'Unconditional direct ownership (Tamleek) is granted immediately to verified Asnaf recipients without intermediate institutional capture.')}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    <span>{isBn ? (cms.about.pillar2Feature || 'প্রত্যক্ষ সম্পদ হস্তান্তর নীতিমালা') : (cms.about.pillar2FeatureEn || 'Direct Asset Transfer Protocol')}</span>
                  </div>
                </div>

                {/* Pillar 3 */}

                <div className="bg-surface-subtle-mint/60 p-8 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-clean shadow-sm flex items-center justify-center text-primary mb-6">
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        pin_drop
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      03. PILLAR
                    </span>
                    <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-1 mb-3">
                      {isBn ? (cms.about.pillar3Title || 'মাঠপর্যায়ে কঠোর যাচাই (Ground-Truth Verification)') : (cms.about.pillar3TitleEn || 'Ground-Truth Verification')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {isBn ? (cms.about.pillar3Desc || 'প্রতিটি বিতরণ কার্যক্রম জিও-ট্যাগ ছবি, জাতীয় পরিচয়পত্র যাচাই এবং স্বচ্ছ মাস্টাররোলের মাধ্যমে নথিবদ্ধ করা হয়।') : (cms.about.pillar3DescEn || 'Every distribution is documented with geo-tagged photographic evidence, national ID authentication, and signed beneficiary ledgers.')}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    <span>{isBn ? (cms.about.pillar3Feature || 'জিপিএস সময়-চিহ্নিত অডিট রেকর্ড') : (cms.about.pillar3FeatureEn || 'GPS Time-Stamped Audits')}</span>
                  </div>
                </div>

                {/* Pillar 4 */}

                <div className="bg-surface-subtle-mint/60 p-8 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-clean shadow-sm flex items-center justify-center text-tertiary mb-6">
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        account_balance
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wider">
                      04. PILLAR
                    </span>
                    <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-1 mb-3">
                      {isBn ? (cms.about.pillar4Title || 'স্বাধীন প্রশাসন ও জিরো-ওভারহেড (Radical Stewardship)') : (cms.about.pillar4TitleEn || 'Radical Stewardship')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {isBn ? (cms.about.pillar4Desc || 'সকল প্রশাসনিক ও অপারেশনাল ব্যয় স্বতন্ত্র প্রাতিষ্ঠানিক তহবিল থেকে নির্বাহ করা হয়—সাধারণ অনুদান শতভাগ মাঠেই যায়।') : (cms.about.pillar4DescEn || '100% of staff salaries, operational costs, software platforms, and vehicle logistics are underwritten separately through an endowment.')}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    <span>{isBn ? (cms.about.pillar4Feature || '১০০% জিরো-প্রশাসনিক কর্তন গ্যারান্টি') : (cms.about.pillar4FeatureEn || 'Zero-Cost Public Donorship')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Governance & Shariah Advisory Council */}
          {isSectionVisible('about-mission-vision') && (
          <section className="w-full bg-surface py-20 px-4 sm:px-8">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  ETHICAL JURISPRUDENCE
                </span>
                <h2 className="font-headline-lg text-headline-lg text-emerald-dark mt-2 mb-4">
                  Independent{' '}
                  <span className="text-amber-600 dark:text-amber-500">
                    Shariah Advisory Council
                  </span>
                </h2>
                <p className="font-body-md text-body-md text-text-muted">
                  Our operations, relief allocation criteria, and donor ledgers
                  are scrutinized year-round by reputable scholars and statutory
                  chartered accountants.
                </p>
              </div>

              {/* Council Grid */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Scholar 1 */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-subtle-mint flex items-center justify-center text-primary mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[48px]">
                      person_outline
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-amber-vibrant font-bold uppercase tracking-wider mb-1">
                    Lead Scholar &amp; Jurisconsult
                  </span>
                  <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold">
                    Mufti Muhammad Zubair
                  </h3>
                  <p className="font-label-md text-label-md text-text-muted mb-4">
                    Senior Islamic Jurisprudence Scholar (Darul Uloom)
                  </p>
                  <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                    Over 22 years of fiqh leadership overseeing international
                    Zakat compliance, inheritance waqf models, and authentic
                    Tamleek verification across South Asia.
                  </p>
                </div>

                {/* Scholar 2 */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-subtle-mint flex items-center justify-center text-primary mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[48px]">
                      school
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-amber-vibrant font-bold uppercase tracking-wider mb-1">
                    Council Co-Chair
                  </span>
                  <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold">
                    Dr. Amina Rahman
                  </h3>
                  <p className="font-label-md text-label-md text-text-muted mb-4">
                    PhD, Islamic Economics &amp; Sustainable Waqf
                  </p>
                  <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                    Former advisor to multilateral development funds,
                    specializing in micro-enterprise endowments, poverty
                    graduation models, and ethical liquidity management.
                  </p>
                </div>

                {/* Auditor 3 */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-subtle-mint flex items-center justify-center text-primary mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[48px]">
                      fact_check
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-amber-vibrant font-bold uppercase tracking-wider mb-1">
                    Independent Assurance
                  </span>
                  <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold">
                    Chartered Audit Panel
                  </h3>
                  <p className="font-label-md text-label-md text-text-muted mb-4">
                    Tier-1 Registered Certified Accountants (ICAB &amp; ICAEW)
                  </p>
                  <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                    Conducting bi-annual statutory audits, random sample
                    beneficiary spot-checks, and public release of unqualified
                    governance opinions.
                  </p>
                </div>
              </div>

              {/* Official Governance Documents & Disclosures */}

              <div className="bg-emerald-dark rounded-2xl p-8 md:p-12 text-on-primary">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-zakat-gold-light font-bold">
                      PUBLIC DISCLOSURES &amp; LEDGERS
                    </span>
                    <h3 className="font-headline-md text-headline-md text-white mt-1">
                      Official Governance Documentation
                    </h3>
                    <p className="font-body-sm text-body-sm text-primary-fixed mt-2 max-w-xl">
                      Download verified legal rulings, signed Shariah
                      certifications, and unqualified financial statements.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gold-warm text-[32px]">
                      security
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                        Transparency Standard
                      </span>
                      <span className="font-title-md text-title-md text-white font-bold">
                        IATI &amp; Charity Commission
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Document Card 1: Official Government Registration Permit (permit.pdf) */}
                  <a
                    className="group flex items-center justify-between p-5 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 rounded-xl transition-all shadow-sm cursor-pointer"
                    href="/images/permit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[32px] text-amber-300">
                        workspace_premium
                      </span>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-white font-bold group-hover:text-amber-300 transition-colors">
                          {isBn ? 'সরকারি নিবন্ধন সনদ (Permit)' : 'Govt. Registration Permit'}
                        </span>
                        <span className="font-label-sm text-label-sm text-amber-200/90 font-mono">
                          RJSC Reg #S-14086/2023 (PDF)
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-amber-300 group-hover:scale-110 transition-transform">
                      open_in_new
                    </span>
                  </a>

                  {/* Document Card 2: Shariah Compliance Fatwa (Opens Shariah Tab in Modal) */}
                  <button
                    type="button"
                    onClick={() => openLicenseModal('shariah')}
                    className="group flex items-center justify-between p-5 bg-white/10 hover:bg-white/15 rounded-xl transition-colors text-left cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[32px] text-amber-vibrant">
                        description
                      </span>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-white font-bold group-hover:text-amber-vibrant transition-colors">
                          {isBn ? 'শরীয়াহ অনুমোদন ফতোয়া' : 'Shariah Compliance Fatwa'}
                        </span>
                        <span className="font-label-sm text-label-sm text-primary-fixed">
                          {isBn ? 'শরীয়াহ উপদেষ্টা পরিষদ অনুমোদিত' : 'Signed by Advisory Council'}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-white/60 group-hover:text-white transition-colors">
                      verified
                    </span>
                  </button>

                  {/* Document Card 3: 100% Zakat Policy & Tax Exemption (Opens Tax Tab in Modal) */}
                  <button
                    type="button"
                    onClick={() => openLicenseModal('tax')}
                    className="group flex items-center justify-between p-5 bg-white/10 hover:bg-white/15 rounded-xl transition-colors text-left cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[32px] text-amber-vibrant">
                        receipt_long
                      </span>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-white font-bold group-hover:text-amber-vibrant transition-colors">
                          {isBn ? 'NBR কর অব্যাহতি ও যাকাত নীতিমালা' : 'NBR Tax Exemption & Zakat Policy'}
                        </span>
                        <span className="font-label-sm text-label-sm text-primary-fixed">
                          {isBn ? 'SRO নং ১৮২-আইন / তামলিক গাইডলাইন' : 'SRO No. 182-Act / Tamleek Manual'}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-white/60 group-hover:text-white transition-colors">
                      verified
                    </span>
                  </button>

                  {/* Document Card 4: Global Partnership & Audit Statements (Opens Global Tab in Modal) */}
                  <button
                    type="button"
                    onClick={() => openLicenseModal('global')}
                    className="group flex items-center justify-between p-5 bg-white/10 hover:bg-white/15 rounded-xl transition-colors text-left cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[32px] text-amber-vibrant">
                        public
                      </span>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-white font-bold group-hover:text-amber-vibrant transition-colors">
                          {isBn ? 'আন্তর্জাতিক পার্টনারশিপ ও নিরীক্ষা' : 'Global Partners & Audit Statements'}
                        </span>
                        <span className="font-label-sm text-label-sm text-primary-fixed">
                          {isBn ? 'যুক্তরাজ্য পার্টনার ও বার্ষিক নিরীক্ষা' : 'UK Liaison & Annual Financials'}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-white/60 group-hover:text-white transition-colors">
                      verified
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Our Story & Ground Truth Field Operations */}
          {isSectionVisible('about-registration') && (
          <section className="w-full bg-surface-clean py-20 px-4 sm:px-8">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Story Narrative Column */}

                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-amber-vibrant font-bold mb-2">
                    {isBn ? 'সরাসরি মাঠ পর্যায়ের কার্যক্রম' : 'ROOTED IN DIRECT ACTION'}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-emerald-dark leading-tight mb-6">
                    {isBn ? (
                      'ঢাকার রেলওয়ে প্ল্যাটফর্ম থেকে বৈশ্বিক মানবিক সহায়তা নেটওয়ার্ক'
                    ) : (
                      <>
                        From Dhaka Railway Platforms to a{' '}
                        <span className="text-amber-600 dark:text-amber-500">
                          Resilient Global Aid Network
                        </span>
                      </>
                    )}
                  </h2>
                  <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-6">
                    {isBn
                      ? 'চেয়ারম্যান মোহাম্মদ আলী মোস্তফার দূরদর্শী নেতৃত্বে গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের যাত্রা শুরু হয়েছিল কোনো বিলাসবহুল বোর্ডরুমে নয়, বরং কমলাপুর ও তেজগাঁও রেললাইনের পাশে হাড়কাঁপানো শীতের রাতে অবহেলিত পথশিশুদের মাঝে গরম খাবার ও কম্বল বিতরণের মাধ্যমে।'
                      : 'Under the visionary leadership of Chairman Mohammad Ali Mostafa, Global Muslim Charitable Foundation began not in boardrooms, but on freezing winter nights distributing hot meals and warm blankets directly to abandoned street children along Kamalapur and Tejgaon railway tracks.'}
                  </p>
                  <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-8">
                    {isBn
                      ? 'আজ আমাদের তরুণ স্বেচ্ছাসেবক দল এবং ফিল্ড অফিসাররা সম্পূর্ণ জিরো-অ্যাডমিন খরচে দেশজুড়ে জরুরি পুষ্টি কর্মসূচি, গভীর নলকূপ স্থাপন, এতিম শিশুদের শিক্ষা স্পনসরশিপ ও জটিল জরুরি সার্জারি সেবা পরিচালনা করছেন।'
                      : 'Today, our youth volunteer chapters and field officers coordinate complex emergency nourishment lines, deep tube-well installations, orphan schooling sponsorships, and emergency surgical interventions with complete, verified zero-overhead fidelity.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="p-4 bg-surface-subtle-mint rounded-xl">
                      <span className="font-title-lg text-title-lg text-primary font-bold block">
                        <DynamicLiveCounter
                          value={isBn ? cms.about.storyResponseTime : (cms.about.storyResponseTime === '৪৮ ঘণ্টা' || !cms.about.storyResponseTime ? '48 Hours' : cms.about.storyResponseTime)}
                          defaultValue={isBn ? '৪৮ ঘণ্টা' : '48 Hours'}
                          fluctuateRange={[0, 0]}
                        />
                      </span>
                      <span className="font-body-sm text-body-sm text-text-muted">
                        {isBn
                          ? (cms.about.storyResponseDesc || 'ঘূর্ণিঝড় ও বন্যা দুর্যোগে সর্বোচ্চ রেসপন্স সময়')
                          : (cms.about.storyResponseDescEn || 'Max response time during cyclone & flood crises')}
                      </span>
                    </div>
                    <div className="p-4 bg-surface-subtle-mint rounded-xl">
                      <span className="font-title-lg text-title-lg text-emerald-dark font-bold block">
                        <DynamicLiveCounter
                          value={cms.about.storyVolunteerCount}
                          defaultValue={isBn ? '০' : '0'}
                          fluctuateRange={[-2, 5]}
                        />
                      </span>
                      <span className="font-body-sm text-body-sm text-text-muted">
                        {isBn
                          ? (cms.about.storyVolunteerDesc || 'সারাদেশের ৬৪ জেলায় সক্রিয় তরুণ স্বেচ্ছাসেবক')
                          : (cms.about.storyVolunteerDescEn || 'Registered youth volunteers across all 64 districts')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team Photo Column */}

                <div className="lg:col-span-7 flex flex-col">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl bg-surface-subtle-mint group">
                    <img
                      alt="GMCF Volunteer and Field Operations Team at Dhaka Headquarters"
                      className="w-full h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                      src="/images/youth-volunteers.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-on-primary">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-vibrant animate-pulse"></span>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-zakat-gold-light font-bold">
                          Field Deployment Unit #04
                        </span>
                      </div>
                      <h4 className="font-title-lg text-title-lg text-white font-bold">
                        Our Frontline Field Team &amp; Coordinators at Dhaka
                        Headquarters
                      </h4>
                      <p className="font-body-sm text-body-sm text-primary-fixed mt-1">
                        Volunteer briefing session for Project Sheetolota &amp;
                        Emergency Street Nutrition drive at Bangladesh Shishu
                        Kalyan Parishad.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm px-2 pt-3">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        groups
                      </span>
                      <span>100% Volunteer Field Force</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-amber-vibrant">
                        verified
                      </span>
                      <span>Certified Child Safeguarding Protocols</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Global Offices & Statutory Registration Grid */}
          {isSectionVisible('about-board') && (
          <section className="w-full bg-surface-subtle-mint/40 py-20 px-4 sm:px-8">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    STATUTORY JURISDICTIONS
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-emerald-dark mt-2">
                    Registered Global{' '}
                    <span className="text-amber-600 dark:text-amber-500">
                      Headquarters &amp; Offices
                    </span>
                  </h2>
                </div>
                <a
                  className="inline-flex items-center gap-2 text-primary font-title-md text-title-md hover:underline font-bold"
                  href="mailto:gmcfoundation2022@gmail.com"
                >
                  <span>Contact Chairman &amp; Foundation Office</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dhaka HQ */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-label-sm text-label-sm bg-surface-subtle-mint text-primary px-3 py-1 rounded-full font-bold uppercase">
                        {isBn ? (cms.about.office1Title || 'প্রধান কার্যালয়') : (cms.about.office1TitleEn || 'Principal Head Office')}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        flag
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-emerald-dark font-bold mb-2">
                      {isBn ? (cms.about.office1City || 'সাভার, ঢাকা') : (cms.about.office1CityEn || 'Savar, Dhaka (Bangladesh)')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted mb-4">
                      {cms.about.office1Address || 'House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh'}
                    </p>
                    <div className="space-y-1.5 font-label-md text-label-md text-text-muted mb-6">
                      <p>
                        <strong className="text-on-surface">
                          {isBn ? 'চেয়ারম্যান:' : 'Chairman:'}
                        </strong>{' '}
                        {isBn ? (cms.header_footer.chairmanName || 'মোহাম্মদ আলী মোস্তফা') : 'Mohammad Ali Mostafa'}
                      </p>
                      <p>
                        <strong className="text-on-surface">{isBn ? 'মোবাইল:' : 'Mobile:'}</strong>{' '}
                        {cms.about.office1Phone || cms.header_footer.hotline || '01913119525'}
                      </p>
                      <p>
                        <strong className="text-on-surface">
                          {isBn ? 'ইমেইল:' : 'Official Email:'}
                        </strong>{' '}
                        {cms.about.office1Email || cms.header_footer.email || 'gmcfoundation2022@gmail.com'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 bg-surface-subtle-mint/40 rounded-xl p-3 flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      domain_verification
                    </span>
                    <span>Global Muslim Charitable Foundation</span>
                  </div>
                </div>

                {/* London Office */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-label-sm text-label-sm bg-surface-subtle-mint text-primary px-3 py-1 rounded-full font-bold uppercase">
                        {isBn ? (cms.about.office2Title || 'যুক্তরাজ্য লিয়াজোঁ') : (cms.about.office2TitleEn || 'UK Statutory Liaison')}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        account_balance
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-emerald-dark font-bold mb-2">
                      {isBn ? (cms.about.office2City || 'লন্ডন, যুক্তরাজ্য') : (cms.about.office2CityEn || 'London, United Kingdom')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted mb-4">
                      {cms.about.office2Address || '104 Whitechapel High St, London E1 7PT, United Kingdom'}
                    </p>
                    <div className="space-y-1.5 font-label-md text-label-md text-text-muted mb-6">
                      <p>
                        <strong className="text-on-surface">{isBn ? 'নিবন্ধন নং:' : 'Reg Number:'}</strong>{' '}
                        UK Charity Commission Reg #1184930
                      </p>
                      <p>
                        <strong className="text-on-surface">{isBn ? 'ফোন:' : 'Desk:'}</strong>{' '}
                        {cms.about.office2Phone || '+44 20 7946 0912'}
                      </p>
                      <p>
                        <strong className="text-on-surface">{isBn ? 'ইমেইল:' : 'Inquiries:'}</strong>{' '}
                        {cms.about.office2Email || 'uk@gmcfoundation.org'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 bg-surface-subtle-mint/40 rounded-xl p-3 flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      domain_verification
                    </span>
                    <span>{isBn ? 'ইউরোপীয় সমন্বয় ও ট্রেজারি' : 'European Oversight & Treasury'}</span>
                  </div>
                </div>

                {/* USA Liaison */}

                <div className="bg-surface-clean rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-label-sm text-label-sm bg-surface-subtle-mint text-primary px-3 py-1 rounded-full font-bold uppercase">
                        {isBn ? (cms.about.office3Title || 'উত্তর আমেরিকা প্রতিনিধি') : (cms.about.office3TitleEn || 'North America Representative')}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        public
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-emerald-dark font-bold mb-2">
                      {isBn ? (cms.about.office3City || 'নিউ ইয়র্ক, যুক্তরাষ্ট্র') : (cms.about.office3CityEn || 'New York, United States')}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-muted mb-4">
                      {cms.about.office3Address || 'Rockefeller Center Plaza, 45 Rockefeller Plaza, New York, NY 10111'}
                    </p>
                    <div className="space-y-1.5 font-label-md text-label-md text-text-muted mb-6">
                      <p>
                        <strong className="text-on-surface">{isBn ? 'স্ট্যাটাস:' : 'Status:'}</strong>{' '}
                        501(c)(3) Partner Liaison Entity
                      </p>
                      <p>
                        <strong className="text-on-surface">{isBn ? 'ফোন:' : 'Phone:'}</strong>{' '}
                        {cms.about.office3Phone || '+1 718 555 0194'}
                      </p>
                      <p>
                        <strong className="text-on-surface">{isBn ? 'ইমেইল:' : 'Inquiries:'}</strong>{' '}
                        {cms.about.office3Email || 'usa@gmcfoundation.org'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 bg-surface-subtle-mint/40 rounded-xl p-3 flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      domain_verification
                    </span>
                    <span>{isBn ? 'উত্তর আমেরিকা প্রবাসী অনুদান' : 'North American Diaspora Grants'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}
        </div>
      </main>
    </>
  );
}
