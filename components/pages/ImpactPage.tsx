'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useSiteSettings } from '@/lib/site-settings';

const CASE_FILTERS = [
  { category: 'all', label: 'All Stories (48)' },
  { category: 'child-protection', label: 'Child Protection (14)' },
  { category: 'healthcare', label: 'Pediatric Healthcare (21)' },
  { category: 'food-relief', label: 'Street Food Relief (8)' },
  { category: 'wash', label: 'Clean Water & WASH (5)' },
];

const SPONSOR_TIERS = [
  { amount: '65', label: '$65', caption: 'Child Care' },
  { amount: '180', label: '$180', caption: 'Eye Surgery' },
  { amount: '350', label: '$350', caption: 'Family Tracing' },
];

export default function ImpactPage() {
  const { localize } = useSiteSettings();
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterTouched, setFilterTouched] = useState(false);
  const [activeTier, setActiveTier] = useState('65');

  function toggleModal(modalId: string) {
    setOpenModals(current => ({ ...current, [modalId]: !current[modalId] }));
  }

  function handleSponsorshipSubmit() {
    alert(
      localize(
        'Thank you! Redirecting to the secure Tamleek-certified checkout gateway with zero administrative deductions.',
      ),
    );
  }

  return (
    <>
      <main className="w-full bg-surface-clean pt-[93px] sm:pt-[101px]">
        <div className="flex flex-col w-full">
          {/* Editorial Hero & Narrative Header */}

          <section className="relative w-full bg-surface-clean overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-subtle-mint/40 via-transparent to-surface pointer-events-none"></div>
            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 pb-14 sm:pt-10 sm:pb-16">
              {/* Verified Badge & Status Overline */}

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-on-primary font-label-md text-label-md shadow-sm bg-primary-container">
                  <span className="material-symbols-outlined text-gold-warm text-[14px]">
                    verified
                  </span>
                  VERIFIED BENEFICIARY OUTCOMES • 100% SHARIAH AUDITED
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 font-label-sm text-label-sm text-primary tracking-widest uppercase">
                  Tamleek Compliance Protocol #2024-V4
                </span>
              </div>

              {/* Main Headline & Subtitle */}

              <div className="mt-6 max-w-4xl">
                <h1 className="font-headline-xl text-headline-xl text-emerald-dark tracking-tight leading-tight">
                  Stories of Restored Hope,{' '}
                  <span className="text-amber-vibrant">
                    Healing &amp; Dignity
                  </span>
                </h1>
                <p className="mt-4 font-body-lg text-body-lg text-text-muted max-w-3xl leading-relaxed">
                  Behind every donation is a transformed human soul. Real
                  documented field cases from Bangladesh, illustrating how your
                  Zakat and Sadaqah deliver life-changing impact under rigorous
                  Tamleek stewardship and complete zero-deduction compliance.
                </p>
              </div>

              {/* Key High-Impact Metrics Grid (No Borders, Depth via Clean Tonal Surfaces) */}

              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-subtle-mint p-5 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between text-primary mb-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-text-muted">
                      Total Reach
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      groups
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-emerald-dark">
                    14,200+
                  </div>
                  <div className="font-body-sm text-body-sm text-text-muted mt-1">
                    Lives Directly Impacted
                  </div>
                </div>
                <div className="bg-surface-subtle-mint p-5 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between text-primary mb-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-text-muted">
                      Child Safety
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      family_restroom
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-emerald-dark">
                    320+
                  </div>
                  <div className="font-body-sm text-body-sm text-text-muted mt-1">
                    Reunited &amp; Safely Sheltered
                  </div>
                </div>
                <div className="bg-surface-subtle-mint p-5 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between text-primary mb-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-text-muted">
                      Pediatric Surgeries
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      medical_services
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-emerald-dark">
                    1,150+
                  </div>
                  <div className="font-body-sm text-body-sm text-text-muted mt-1">
                    Free Sight &amp; Trauma Ops
                  </div>
                </div>
                <div className="bg-zakat-gold-light p-5 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between text-amber-vibrant mb-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">
                      Zakat Policy
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      balance
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-on-secondary-container">
                    100%
                  </div>
                  <div className="font-body-sm text-body-sm text-secondary mt-1">
                    Zero Admin Deductions
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Category Filter Strip */}

          <section className="w-full bg-surface py-6">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Filter Chips */}

              <div
                className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
                id="case-filters"
              >
                {CASE_FILTERS.map(filter => {
                  const isActive = activeFilter === filter.category;
                  const activeClasses = filterTouched
                    ? 'bg-emerald-dark text-on-primary'
                    : 'bg-primary-container text-on-primary active';

                  return (
                    <button
                      key={filter.category}
                      className={`filter-tab px-4 py-2 rounded-full font-label-md text-label-md shadow-sm transition-colors whitespace-nowrap ${
                        isActive
                          ? activeClasses
                          : 'bg-surface-clean text-text-muted hover:text-primary'
                      }`}
                      data-category={filter.category}
                      type="button"
                      onClick={() => {
                        setActiveFilter(filter.category);
                        setFilterTouched(true);
                      }}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              {/* Quick Action: Quarterly PDF Dossier */}

              <div className="flex items-center gap-3 self-end md:self-auto">
                <Link
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-clean hover:bg-surface-subtle-mint text-primary font-label-md text-label-md shadow-sm transition-colors"
                  href="/about"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    picture_as_pdf
                  </span>
                  <span className="">Download Q4 2024 Audit Dispatch</span>
                </Link>
              </div>
            </div>
          </section>

          {/* FEATURED CASE STUDY: Badshah Family Reintegration (Hero Spotlight Bento) */}

          <section className="w-full bg-surface pb-16 pt-4">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="bg-surface-clean rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Image Column with Aspect Preservation */}

                  <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] bg-emerald-dark overflow-hidden flex items-center justify-center">
                    <img
                      alt="Mother and rescued boy Badshah reunited safely through GMCF humanitarian child protection fund"
                      className="w-full h-full object-cover object-center"
                      src="/images/badshah-reunion.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/80 via-transparent to-transparent lg:hidden"></div>

                    {/* Floating Badge On Image */}

                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-dark/90 backdrop-blur-md text-on-primary font-label-sm text-label-sm shadow-md">
                      <span className="material-symbols-outlined text-[15px] text-gold-warm">
                        verified_user
                      </span>
                      <span className="">
                        CASE DISPATCH #BD-109 • BANGLADESH
                      </span>
                    </div>
                  </div>

                  {/* Narrative Content Column */}

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-surface-clean">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle-mint text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Child Protection • Family Reintegration
                        </span>
                        <span className="text-text-muted font-label-sm text-label-sm">
                          Dhaka Urban Transit Hub
                        </span>
                      </div>
                      <h2 className="mt-4 font-headline-md text-headline-md text-emerald-dark tracking-tight leading-snug">
                        “Bringing Badshah Back to His Mother’s Loving Embrace”
                      </h2>
                      <p className="mt-4 font-body-md text-body-md text-text-muted leading-relaxed">
                        Found wandering in deep distress near the hazardous
                        Tejgaon railway terminal by GMCF’s midnight mobile
                        patrol. After 21 days of intensive cross-district
                        verification, psychosocial rehabilitation, and
                        nourishment, our team handed Badshah safely back to his
                        weeping mother.
                      </p>

                      {/* Chronological Verification Timeline */}

                      <div className="mt-8 space-y-4">
                        <div className="font-label-md text-label-md uppercase tracking-wider text-text-muted flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            schedule
                          </span>
                          Documented Restoration Journey
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="bg-surface-subtle-mint p-3 rounded-lg">
                            <span className="font-label-sm text-label-sm text-primary font-bold block">
                              DAY 01
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface font-medium block mt-0.5">
                              Emergency Rescue
                            </span>
                            <span className="text-[11px] text-text-muted block mt-0.5">
                              Health exam &amp; shelter
                            </span>
                          </div>
                          <div className="bg-surface-subtle-mint p-3 rounded-lg">
                            <span className="font-label-sm text-label-sm text-primary font-bold block">
                              DAY 07
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface font-medium block mt-0.5">
                              Psychosocial Care
                            </span>
                            <span className="text-[11px] text-text-muted block mt-0.5">
                              Tracing mother's village
                            </span>
                          </div>
                          <div className="bg-zakat-gold-light p-3 rounded-lg">
                            <span className="font-label-sm text-label-sm text-amber-vibrant font-bold block">
                              DAY 21
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface font-medium block mt-0.5">
                              Safe Reunion
                            </span>
                            <span className="text-[11px] text-secondary block mt-0.5">
                              Tamleek grant delivered
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}

                    <div className="mt-8 pt-6 flex flex-wrap items-center gap-4">
                      <button
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-vibrant hover:bg-secondary text-white font-label-lg text-label-lg shadow-md transition-all"
                        onClick={() => toggleModal('modal-badshah')}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                        <span className="">
                          Read Full Investigation Dossier
                        </span>
                      </button>
                      <a
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-emerald-dark py-2 font-semibold"
                        href="#sponsor-box"
                      >
                        <span className="">Support Similar Cases</span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECONDARY CASE STUDIES GRID: Curated Field Interventions */}

          <section className="w-full bg-surface pb-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                    Active Restorations
                  </span>
                  <h3 className="mt-1 font-headline-lg text-headline-lg text-emerald-dark">
                    Every Soul Holds a Universe of Value
                  </h3>
                </div>
                <div className="font-body-sm text-body-sm text-text-muted max-w-md">
                  Transparent case ledgers updated directly from district
                  hospitals, transit sanctuaries, and rural mobile clinics.
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* CARD 1: Saifan (Pediatric Surgery & Mother Care) */}

                <article className="bg-surface-clean rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
                  <div className="relative h-60 bg-emerald-dark overflow-hidden">
                    <img
                      alt="Mother holding her child Saifan who received urgent pediatric emergency healthcare assistance"
                      className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                      src="/images/pediatric-hope-saifan.jpg"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-dark/90 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm">
                      Pediatric Sponsorship
                    </div>
                    <div className="absolute bottom-3 right-3 bg-surface-clean/95 backdrop-blur-md text-emerald-dark font-label-sm text-label-sm px-2.5 py-1 rounded-md font-bold shadow-sm">
                      Case #KUR-204
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                        Kurigram Rural Ward
                      </span>
                      <h4 className="mt-2 font-title-lg text-title-lg text-emerald-dark leading-snug">
                        Saifan’s Road to Sight and Vital Pediatric Recovery
                      </h4>
                      <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Direct Zakat funds provided round-the-clock emergency
                        hospital sponsorship and neuro-pediatric trauma
                        stabilization for this widowed mother’s youngest boy.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 bg-surface-subtle-mint/60 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-emerald-dark mb-1">
                        <span className="font-label-sm text-label-sm font-semibold">
                          Treatment Milestone:
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-amber-vibrant">
                          100% Complete
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">
                        Vision Stabilized • Ongoing Growth Nutritional Supply
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          className="text-primary hover:text-emerald-dark font-label-sm text-label-sm font-bold inline-flex items-center gap-1"
                          onClick={() => toggleModal('modal-saifan')}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            receipt_long
                          </span>
                          <span className="">View Hospital Ledger</span>
                        </button>
                        <span className="text-[11px] text-text-muted">
                          Verified by Dr. R. Huq
                        </span>
                      </div>
                    </div>
                  </div>
                </article>

                {/* CARD 2: Project Alo (Eye Surgery & Corneal Restoration) */}

                <article className="bg-surface-clean rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
                  <div className="relative h-60 bg-emerald-dark overflow-hidden">
                    <img
                      alt="Vulnerable young boy receiving specialized pediatric eye operation and post-surgical recovery bandage under Project Alo"
                      className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                      src="/images/project-alo-eye-care.jpg"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-dark/90 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm">
                      Project Alo (The Light)
                    </div>
                    <div className="absolute bottom-3 right-3 bg-surface-clean/95 backdrop-blur-md text-emerald-dark font-label-sm text-label-sm px-2.5 py-1 rounded-md font-bold shadow-sm">
                      Case #ALO-772
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                        Chittagong Eye Infirmary
                      </span>
                      <h4 className="mt-2 font-title-lg text-title-lg text-emerald-dark leading-snug">
                        Restoring Vision: Pediatric Corneal &amp; Trauma Eye
                        Surgeries
                      </h4>
                      <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Rural orphans and destitute children suffering from
                        debilitating eye injuries receive prompt, cost-free
                        surgical interventions to safeguard their lifelong
                        eyesight and future schooling.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 bg-surface-subtle-mint/60 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-emerald-dark mb-1">
                        <span className="font-label-sm text-label-sm font-semibold">
                          2024 Cumulative Interventions:
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-primary">
                          450 Operations
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">
                        100% Success Rate • Zero Post-Op Complications
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          className="text-primary hover:text-emerald-dark font-label-sm text-label-sm font-bold inline-flex items-center gap-1"
                          onClick={() => toggleModal('modal-alo')}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            clinical_notes
                          </span>
                          <span className="">View Clinical Case Details</span>
                        </button>
                        <span className="text-[11px] text-text-muted">
                          Chittagong Field Unit
                        </span>
                      </div>
                    </div>
                  </div>
                </article>

                {/* CARD 3: Neurodiverse & Special Needs Children */}

                <article className="bg-surface-clean rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
                  <div className="relative h-60 bg-emerald-dark overflow-hidden">
                    <img
                      alt="Neurodiverse children and special needs kids enjoying therapeutic recreation and warm physical therapy support"
                      className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                      src="/images/special-care-therapy.jpg"
                    />
                    <div className="absolute top-3 left-3 bg-amber-vibrant text-white font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm">
                      Inclusive Joy &amp; Rehab
                    </div>
                    <div className="absolute bottom-3 right-3 bg-surface-clean/95 backdrop-blur-md text-emerald-dark font-label-sm text-label-sm px-2.5 py-1 rounded-md font-bold shadow-sm">
                      Case #SPC-088
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                        Feni &amp; Dhaka Outreach
                      </span>
                      <h4 className="mt-2 font-title-lg text-title-lg text-emerald-dark leading-snug">
                        Empowering Neurodiverse Children with Dignified Smiles
                      </h4>
                      <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Personalized physiotherapy, sensory developmental kits,
                        and festive community celebrations for vulnerable
                        children who otherwise lack access to specialized
                        neurological therapy.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 bg-surface-subtle-mint/60 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-emerald-dark mb-1">
                        <span className="font-label-sm text-label-sm font-semibold">
                          Active Beneficiaries:
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-primary">
                          85+ Enrolled
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">
                        Speech &amp; Motor Therapy • Caregiver Training
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          className="text-primary hover:text-emerald-dark font-label-sm text-label-sm font-bold inline-flex items-center gap-1"
                          onClick={() => toggleModal('modal-special')}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            favorite
                          </span>
                          <span className="">View Program Impact</span>
                        </button>
                        <span className="text-[11px] text-text-muted">
                          Certified Physiotherapists
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* SHARIAH VERIFICATION & TRANSPARENCY PIPELINE (Inline SVG Infographic) */}

          <section
            className="w-full text-on-primary py-16 bg-primary-container"
            id="governance"
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">
                    security
                  </span>
                  Tamleek Transfer Protocol
                </span>
                <h3 className="mt-3 font-headline-lg text-headline-lg text-white">
                  How Your Zakat is Transferred With Absolute Shariah Sanctity
                </h3>
                <p className="mt-3 font-body-md text-body-md text-primary-fixed leading-relaxed">
                  Every individual beneficiary is vetted under eight Quranic
                  categories of As-Sadaqat (At-Tawbah 9:60). We ensure direct
                  personal ownership (Tamleek) without administrative leakages
                  or diversion.
                </p>
              </div>

              {/* Process Step Flow (Custom SVG Diagram) */}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-primary/40 p-6 rounded-2xl backdrop-blur-sm relative">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-gold-warm flex items-center justify-center font-bold text-title-lg mb-4">
                    01
                  </div>
                  <h4 className="font-title-md text-title-md text-white font-semibold">
                    Field Identification
                  </h4>
                  <p className="mt-2 font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                    Local search patrols identify street orphans, displaced
                    children, and medical emergencies.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-gold-warm font-medium">
                    <span className="material-symbols-outlined text-[14px]">
                      checklist
                    </span>
                    <span className="">CNIC &amp; Local Verification</span>
                  </div>
                </div>
                <div className="bg-primary/40 p-6 rounded-2xl backdrop-blur-sm relative">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-gold-warm flex items-center justify-center font-bold text-title-lg mb-4">
                    02
                  </div>
                  <h4 className="font-title-md text-title-md text-white font-semibold">
                    Shariah Board Review
                  </h4>
                  <p className="mt-2 font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                    Resident Islamic jurisprudence scholars certify Zakat
                    qualification under strict poverty lines.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-gold-warm font-medium">
                    <span className="material-symbols-outlined text-[14px]">
                      balance
                    </span>
                    <span className="">Mufti-Approved Dossier</span>
                  </div>
                </div>
                <div className="bg-primary/40 p-6 rounded-2xl backdrop-blur-sm relative">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-gold-warm flex items-center justify-center font-bold text-title-lg mb-4">
                    03
                  </div>
                  <h4 className="font-title-md text-title-md text-white font-semibold">
                    Direct Tamleek Transfer
                  </h4>
                  <p className="mt-2 font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                    Funds or emergency surgical treatments are transferred
                    directly into beneficiary custody.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-gold-warm font-medium">
                    <span className="material-symbols-outlined text-[14px]">
                      handshake
                    </span>
                    <span className="">Zero Agency Deductions</span>
                  </div>
                </div>
                <div className="bg-primary/40 p-6 rounded-2xl backdrop-blur-sm relative">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-gold-warm flex items-center justify-center font-bold text-title-lg mb-4">
                    04
                  </div>
                  <h4 className="font-title-md text-title-md text-white font-semibold">
                    Audited Reporting
                  </h4>
                  <p className="mt-2 font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                    Independent chartered accountants verify ledgers with
                    photographic receipts for all donors.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-gold-warm font-medium">
                    <span className="material-symbols-outlined text-[14px]">
                      verified
                    </span>
                    <span className="">KPMG &amp; Local Dual Audit</span>
                  </div>
                </div>
              </div>

              {/* Real-time Transparency Ledger Mini-Bar */}

              <div className="mt-12 bg-primary-container/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-dark flex items-center justify-center text-gold-warm">
                    <span className="material-symbols-outlined text-[26px]">
                      policy
                    </span>
                  </div>
                  <div>
                    <div className="font-title-md text-title-md text-white font-bold">
                      100% Zakat Policy Guaranteed
                    </div>
                    <div className="font-body-sm text-body-sm text-primary-fixed">
                      Administrative overhead is 100% covered by independent
                      endowment funds (Waqf) and private patrons.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    className="px-5 py-2.5 rounded-xl bg-zakat-gold-light text-on-secondary-container hover:bg-gold-warm font-label-md text-label-md font-bold transition-colors"
                    href="/zakat-calculator"
                  >
                    Calculate My Zakat
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ENGAGEMENT & CASE SPONSORSHIP SECTION */}

          <section className="w-full bg-surface-clean py-16" id="sponsor-box">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="bg-gradient-to-br from-surface-subtle-mint via-surface-clean to-surface p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                  <span className="px-3 py-1 rounded-full bg-amber-vibrant text-white font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Be The Catalyst
                  </span>
                  <h3 className="mt-4 font-headline-lg text-headline-lg text-emerald-dark">
                    Be the Reason a Despairing Mother Smiles Tomorrow
                  </h3>
                  <p className="mt-3 font-body-md text-body-md text-text-muted leading-relaxed">
                    There are currently 18 children in our emergency transit
                    care awaiting family tracing, and 34 pending pediatric eye
                    surgeries at the Chittagong ward. Choose a cause or make an
                    open contribution to our Emergency Reintegration Fund.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px]">
                        done_all
                      </span>
                      <span className="">100% Tax Deductible (US/UK)</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px]">
                        done_all
                      </span>
                      <span className="">
                        Direct Photo &amp; Clinical Dispatch
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px]">
                        done_all
                      </span>
                      <span className="">Shariah Tamleek Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Quick Donation / Sponsorship Widget */}

                <div className="w-full lg:w-96 bg-surface-clean p-6 rounded-2xl shadow-lg">
                  <h4 className="font-title-md text-title-md text-emerald-dark font-bold mb-4">
                    Direct Case Sponsorship
                  </h4>
                  <div className="space-y-3">
                    <label className="block font-label-sm text-label-sm text-text-muted uppercase">
                      Select Impact Tier
                    </label>
                    <div className="grid grid-cols-3 gap-2" id="tier-buttons">
                      {SPONSOR_TIERS.map(tier => (
                        <button
                          key={tier.amount}
                          className={`tier-btn py-2 px-3 rounded-lg bg-surface-subtle-mint text-primary font-label-md text-label-md font-bold transition-all ${
                            activeTier === tier.amount
                              ? 'active ring-2 ring-primary'
                              : ''
                          }`}
                          data-amount={tier.amount}
                          type="button"
                          onClick={() => setActiveTier(tier.amount)}
                        >
                          {tier.label}{' '}
                          <span className="block text-[10px] font-normal text-text-muted">
                            {tier.caption}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <label className="block font-label-sm text-label-sm text-text-muted uppercase mb-1">
                        Assigned Case Fund
                      </label>
                      <select className="w-full p-2.5 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="reunion">
                          Badshah Fund: Lost Child Reintegration
                        </option>
                        <option value="saifan">
                          Saifan Fund: Pediatric Eye Surgery
                        </option>
                        <option value="alo">
                          Project Alo: Chittagong Eye Trauma
                        </option>
                        <option value="general">
                          Emergency Zakat Pool (Immediate Need)
                        </option>
                      </select>
                    </div>
                    <button
                      className="w-full mt-4 py-3 rounded-xl bg-amber-vibrant hover:bg-secondary text-white font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
                      onClick={handleSponsorshipSubmit}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                      <span className="">Sponsor This Case Today</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CASE STUDY DETAIL MODAL (Badshah #BD-109) */}

          <div
            className={`fixed inset-0 z-50 ${
              openModals['modal-badshah'] ? '' : 'hidden'
            } bg-emerald-dark/60 backdrop-blur-md flex items-center justify-center p-4`}
            id="modal-badshah"
          >
            <div className="bg-surface-clean rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-dark text-white font-label-sm text-label-sm font-semibold">
                    CASE DOSSIER #BD-109
                  </span>
                  <span className="text-text-muted font-label-sm text-label-sm">
                    Verified Reintegration
                  </span>
                </div>
                <button
                  className="text-text-muted hover:text-emerald-dark p-1"
                  onClick={() => toggleModal('modal-badshah')}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    close
                  </span>
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-headline-md text-headline-md text-emerald-dark">
                  Case Investigation: Badshah’s Safe Homecoming
                </h3>
                <div className="mt-4 p-4 rounded-xl bg-surface-subtle-mint space-y-2 text-on-surface">
                  <p className="font-body-sm text-body-sm">
                    <strong>Initial Encounter:</strong> Child discovered on
                    platform 3, Tejgaon Station, showing signs of severe trauma,
                    dehydration, and acute distress.
                  </p>
                  <p className="font-body-sm text-body-sm">
                    <strong>Emergency Shelter:</strong> Transferred to GMCF
                    Child Protection Transit Center in Mirpur. Provided
                    nutritional stabilization and daily pediatric checkups.
                  </p>
                  <p className="font-body-sm text-body-sm">
                    <strong>Tracing Procedure:</strong> Social caseworkers
                    deployed geo-targeted photo notices across 12 Upazilas over
                    18 days with district police liaison.
                  </p>
                  <p className="font-body-sm text-body-sm">
                    <strong>Family Confirmation:</strong> Maternal match
                    confirmed via biometric birth certificates and formal Union
                    Parishad affidavit.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4">
                  <div className="text-[12px] text-text-muted">
                    Audited by: Sheikh Maulana Tariq • Chief Shariah Supervisor
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-white font-label-md text-label-md bg-primary-container"
                    onClick={() => toggleModal('modal-badshah')}
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY MODALS (Alo & Saifan) */}

          <div
            className={`fixed inset-0 z-50 ${
              openModals['modal-saifan'] ? '' : 'hidden'
            } bg-emerald-dark/60 backdrop-blur-md flex items-center justify-center p-4`}
            id="modal-saifan"
          >
            <div className="bg-surface-clean rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4">
                <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
                  Hospital Record: #KUR-204
                </span>
                <button
                  className="text-text-muted hover:text-emerald-dark"
                  onClick={() => toggleModal('modal-saifan')}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-2">
                Saifan’s Pediatric Clinical Ledger
              </h3>
              <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                Full cost breakdown covered via 100% Zakat fund: Emergency
                pediatric triage ($45), Medication &amp; post-operative
                rehabilitation ($85), 6 months growth nutrition packs ($50).
                Direct hospital receipts verified by Kurigram District Hospital.
              </p>
              <div className="mt-6 pt-4 flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg bg-emerald-dark text-white font-label-md text-label-md"
                  onClick={() => toggleModal('modal-saifan')}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
          <div
            className={`fixed inset-0 z-50 ${
              openModals['modal-alo'] ? '' : 'hidden'
            } bg-emerald-dark/60 backdrop-blur-md flex items-center justify-center p-4`}
            id="modal-alo"
          >
            <div className="bg-surface-clean rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4">
                <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
                  Surgical Registry: #ALO-772
                </span>
                <button
                  className="text-text-muted hover:text-emerald-dark"
                  onClick={() => toggleModal('modal-alo')}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-2">
                Project Alo (The Light) Clinical Summary
              </h3>
              <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                Corneal repair and pediatric lens implantation conducted under
                sterile ophthalmic theater conditions at Chittagong Eye
                Infirmary. 100% of medical consumables and specialist
                honorariums were subsidized under GMCF Sadaqah Jariyah
                Healthcare Endowment.
              </p>
              <div className="mt-6 pt-4 flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg bg-emerald-dark text-white font-label-md text-label-md"
                  onClick={() => toggleModal('modal-alo')}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
          <div
            className={`fixed inset-0 z-50 ${
              openModals['modal-special'] ? '' : 'hidden'
            } bg-emerald-dark/60 backdrop-blur-md flex items-center justify-center p-4`}
            id="modal-special"
          >
            <div className="bg-surface-clean rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4">
                <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
                  Inclusive Care Registry: #SPC-088
                </span>
                <button
                  className="text-text-muted hover:text-emerald-dark"
                  onClick={() => toggleModal('modal-special')}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold mt-2">
                Special Needs &amp; Neurodiverse Therapy
              </h3>
              <p className="mt-3 font-body-sm text-body-sm text-text-muted leading-relaxed">
                Comprehensive developmental interventions including sensory
                stimulation therapy, occupational toys, and caregiver
                psychosocial counseling. Over 85 impoverished children are
                currently receiving ongoing rehabilitation across Feni and Dhaka
                centers.
              </p>
              <div className="mt-6 pt-4 flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg bg-emerald-dark text-white font-label-md text-label-md"
                  onClick={() => toggleModal('modal-special')}
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* Client-side Interactive Controller Script */}
        </div>
      </main>
    </>
  );
}
