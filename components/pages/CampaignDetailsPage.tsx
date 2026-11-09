'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { useSiteSettings } from '@/lib/site-settings';

const TABS = [
  { id: 'tab-about', icon: 'menu_book', label: 'About Appeal' },
  {
    id: 'tab-budget',
    icon: 'pie_chart',
    label: 'Cost Breakdown ($2/Meal)',
  },
  { id: 'tab-updates', icon: 'history_edu', label: 'Field Dispatch Log (4)' },
  { id: 'tab-shariah', icon: 'verified', label: 'Zakat Governance' },
];

export default function CampaignDetailsPage() {
  const { localize } = useSiteSettings();
  const mainImageRef = useRef<HTMLImageElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTab, setActiveTab] = useState('tab-about');
  const [activeThumb, setActiveThumb] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);
  const [amount, setAmount] = useState('50');
  const [isZakat, setIsZakat] = useState(true);

  const numericAmount = parseFloat(amount) || 0;
  const mealsCount = Math.floor(numericAmount / 2);

  function selectThumb(index: number) {
    setActiveThumb(index);
    const main = mainImageRef.current;
    const thumbImg = thumbRefs.current[index]?.querySelector('img');

    if (main && thumbImg) {
      main.src = thumbImg.src;
      if (thumbImg.hasAttribute('data-alt')) {
        main.setAttribute('data-alt', thumbImg.getAttribute('data-alt') ?? '');
      }
    }
  }

  function submitDonation() {
    const amt = amount || 50;
    const freqText = isMonthly ? 'monthly recurring' : 'one-time';
    const zakatNote = isZakat
      ? 'Designated as 100% Shariah Zakat.'
      : 'Sadaqah Relief Fund.';

    alert(
      localize(
        `JazakAllah Khair! Initiating secure checkout for $${amt} USD (${freqText}). ${zakatNote} Redirecting to bank gateway...`,
      ),
    );
  }

  return (
    <>
      <main className="w-full bg-surface pt-[96px] sm:pt-[116px]">
        <div className="flex flex-col w-full">
          {/* Sub-Header Breadcrumb & Status Ribbon */}

          <div className="bg-surface-clean shadow-sm">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1 font-label-md text-label-md"
                  href="/"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    home
                  </span>
                  Home
                </Link>
                <span className="material-symbols-outlined text-[14px] text-outline-variant">
                  chevron_right
                </span>
                <Link
                  className="hover:text-primary transition-colors font-label-md text-label-md"
                  href="/appeals"
                >
                  Appeals &amp; Relief
                </Link>
                <span className="material-symbols-outlined text-[14px] text-outline-variant">
                  chevron_right
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  One Meal One Hope (Street Food Aid)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zakat-gold-light text-on-secondary-container font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[14px] text-amber-vibrant">
                    verified
                  </span>
                  100% Zakat Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-subtle-mint text-primary font-label-md text-label-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  Live Distribution in Progress
                </span>
              </div>
            </div>
          </div>

          {/* Main Campaign Detail Grid */}

          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Rich Appeal Story & Media (7 cols) */}

              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Header Text Block */}

                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-surface-subtle-mint text-primary font-label-md text-label-md tracking-wider uppercase">
                      Emergency Food Aid
                    </span>
                    <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container font-label-md text-label-md tracking-wider uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        local_fire_department
                      </span>
                      High Priority Drive
                    </span>
                    <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md">
                      Dhaka Stations &amp; Slums
                    </span>
                  </div>
                  <h1 className="font-serif font-bold text-headline-xl text-emerald-dark tracking-tight leading-tight">
                    One Meal One Hope — Nourishing Vulnerable Lives Across
                    Railway Communities
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Partnered with{' '}
                    <strong className="text-on-surface">
                      Pally Life Development Society (PLDS)
                    </strong>{' '}
                    and local community kitchens to provide fresh hot cooked
                    meals, bottled clean water, and fruit juice packs to
                    malnourished children living along railway tracks in
                    Tejgaon, Kamalapur, and Mirpur.
                  </p>
                </div>

                {/* Dynamic Photo Gallery Component */}

                <div className="flex flex-col gap-3">
                  <div className="relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden bg-surface-container shadow-md group">
                    <img
                      alt="Main Appeal Field Photograph"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-alt="Dozens of underprivileged Bangladeshi street children sitting in rows along a Dhaka railway platform, happily holding up freshly packed white meal boxes and orange juice bottles under an open daytime sky, captured in crisp journalistic documentary style."
                      id="main-gallery-view"
                      ref={mainImageRef}
                      src="/images/street-children-meal-line.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-on-primary pointer-events-none">
                      <div className="flex items-center gap-2 text-label-sm font-label-sm uppercase tracking-widest text-primary-fixed mb-1">
                        <span className="material-symbols-outlined text-[15px]">
                          location_on
                        </span>
                        Tejgaon Railway Platform #2, Dhaka
                      </div>
                      <p className="font-title-md text-title-md font-semibold text-white drop-shadow-sm">
                        Afternoon lunch package distribution drive for 180+
                        street children and single-mother families.
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white font-label-md text-label-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim">
                        verified_user
                      </span>
                      Field Verified Dispatch
                    </div>
                  </div>

                  {/* Thumbnail Row with Active Selector */}

                  <div className="grid grid-cols-4 gap-3">
                    <button
                      className={`thumb-btn relative rounded-xl overflow-hidden h-20 bg-surface-container shadow-sm transition-all ${
                        activeThumb === 0
                          ? 'ring-2 ring-primary opacity-100'
                          : 'ring-0 hover:ring-2 hover:ring-primary/50 opacity-70 hover:opacity-100'
                      }`}
                      data-img-idx="0"
                      ref={node => {
                        thumbRefs.current[0] = node;
                      }}
                      onClick={() => selectThumb(0)}
                    >
                      <img
                        alt="Street meal distribution sidewalk"
                        className="w-full h-full object-cover"
                        data-alt="Rows of underprivileged children sitting along a brick boundary wall on the sidewalk receiving hot rice dishes and red cups of clean drinking water in Bangladesh."
                        src="/images/children-meal-rows.jpg"
                      />
                    </button>
                    <button
                      className={`thumb-btn relative rounded-xl overflow-hidden h-20 bg-surface-container shadow-sm transition-all ${
                        activeThumb === 1
                          ? 'ring-2 ring-primary opacity-100'
                          : 'ring-0 hover:ring-2 hover:ring-primary/50 opacity-70 hover:opacity-100'
                      }`}
                      data-img-idx="1"
                      ref={node => {
                        thumbRefs.current[1] = node;
                      }}
                      onClick={() => selectThumb(1)}
                    >
                      <img
                        alt="Balloons and meal boxes at railway"
                        className="w-full h-full object-cover"
                        data-alt="Joyful children on a railway platform holding up colorful celebration balloons and sweet meal parcels during a community nourishment event in Dhaka."
                        src="/images/railway-platform-children.jpg"
                      />
                    </button>
                    <button
                      className={`thumb-btn relative rounded-xl overflow-hidden h-20 bg-surface-container shadow-sm transition-all ${
                        activeThumb === 2
                          ? 'ring-2 ring-primary opacity-100'
                          : 'ring-0 hover:ring-2 hover:ring-primary/50 opacity-70 hover:opacity-100'
                      }`}
                      data-img-idx="2"
                      ref={node => {
                        thumbRefs.current[2] = node;
                      }}
                      onClick={() => selectThumb(2)}
                    >
                      <img
                        alt="Meal distribution alongside train tracks"
                        className="w-full h-full object-cover"
                        data-alt="Dozens of children seated in two neat lines along railway tracks raising meal packages and juice bottles toward the camera with big smiles."
                        src="/images/children-seated-outreach.jpg"
                      />
                    </button>
                    <button
                      className={`thumb-btn relative rounded-xl overflow-hidden h-20 bg-surface-container shadow-sm transition-all ${
                        activeThumb === 3
                          ? 'ring-2 ring-primary opacity-100'
                          : 'ring-0 hover:ring-2 hover:ring-primary/50 opacity-70 hover:opacity-100'
                      }`}
                      data-img-idx="3"
                      ref={node => {
                        thumbRefs.current[3] = node;
                      }}
                      onClick={() => selectThumb(3)}
                    >
                      <img
                        alt="Community kitchen prep"
                        className="w-full h-full object-cover"
                        data-alt="Volunteers in teal aprons stirring large steaming pots of nutritious chicken biryani and vegetable stew in a clean community kitchen facility."
                        src="/images/volunteers-cooking-pots.jpg"
                      />
                    </button>
                  </div>
                </div>

                {/* Navigation Tabs: Story, Breakdown, Field Updates, Impact */}

                <div className="bg-surface-clean rounded-2xl shadow-sm overflow-hidden">
                  <div className="flex items-center overflow-x-auto bg-surface-container-low px-2 pt-2 scrollbar-none">
                    {TABS.map(tab => (
                      <button
                        key={tab.id}
                        className={`tab-btn px-5 py-3 font-label-lg text-label-lg font-bold rounded-t-xl transition-colors flex items-center gap-2 shrink-0 ${
                          activeTab === tab.id
                            ? 'text-primary bg-surface-clean'
                            : 'text-on-surface-variant hover:text-primary hover:bg-surface-clean/50'
                        }`}
                        data-target={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {tab.icon}
                        </span>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 md:p-8">
                    {/* TAB 1: About the Appeal */}

                    <div
                      className={`tab-content flex flex-col gap-6${
                        activeTab === 'tab-about' ? '' : ' hidden'
                      }`}
                      id="tab-about"
                    >
                      <div>
                        <h3 className="font-serif font-bold text-headline-sm text-emerald-dark mb-3">
                          No Child Should Sleep with an Empty Stomach on the
                          Cold Concrete
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                          Every evening at the Tejgaon and Kamalapur railway
                          stations in Dhaka, hundreds of children gather not to
                          take a train, but to find shelter from the night.
                          Displaced by riverbank erosion, acute rural poverty,
                          and domestic tragedies, these youngsters scavenge for
                          survival. Most subsist on discarded scrap food or go
                          without a warm meal for over 36 consecutive hours.
                        </p>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Through the{' '}
                          <strong className="text-on-surface">
                            One Meal One Hope initiative
                          </strong>
                          , our mission is to eliminate acute hunger along the
                          rail corridor. Each single serving is not merely
                          calories—it is freshly prepared high-protein
                          nutrition, purified safe drinking water, and
                          unconditional human dignity served with warmth and
                          respect.
                        </p>
                      </div>

                      {/* High Impact Quote Banner */}

                      <div className="p-5 rounded-2xl bg-surface-subtle-mint flex items-start gap-4">
                        <span className="material-symbols-outlined text-[36px] text-primary shrink-0">
                          format_quote
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="font-serif italic font-semibold text-title-md text-emerald-dark">
                            “Whoever feeds a fasting person or an impoverished
                            child shall have a reward like theirs, without
                            diminishing from their reward in the slightest.”
                          </p>
                          <span className="font-label-md text-label-md text-tertiary uppercase tracking-wider font-bold">
                            — Sunan al-Tirmidhi | Prophetic Compassion in Action
                          </span>
                        </div>
                      </div>

                      {/* How the Food Relief Operates Grid */}

                      <div className="flex flex-col gap-3">
                        <h4 className="font-serif font-bold text-title-lg text-on-surface">
                          How the Relief Mechanism Functions Daily
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-surface-clean flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-[22px]">
                                soup_kitchen
                              </span>
                            </div>
                            <span className="font-title-md text-title-md font-bold text-on-surface">
                              1. Hygienic Cooking
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Prepared daily at 10:00 AM by licensed community
                              cooks in central sanitary kitchens using certified
                              halal ingredients.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-surface-clean flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-[22px]">
                                local_shipping
                              </span>
                            </div>
                            <span className="font-title-md text-title-md font-bold text-on-surface">
                              2. Mobile Logistics
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Insulated thermal vans transport hot food packages
                              to scheduled railway platforms and street cluster
                              hubs by 1:30 PM.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-surface-clean flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-[22px]">
                                favorite
                              </span>
                            </div>
                            <span className="font-title-md text-title-md font-bold text-on-surface">
                              3. Dignified Serving
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Volunteers sit with children, organizing clean
                              eating rows, distributing hand sanitizers, juices,
                              and essential medicines.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TAB 2: Cost Breakdown Graphic */}

                    <div
                      className={`tab-content flex flex-col gap-6${
                        activeTab === 'tab-budget' ? '' : ' hidden'
                      }`}
                      id="tab-budget"
                    >
                      <div>
                        <h3 className="font-serif font-bold text-headline-sm text-emerald-dark mb-2">
                          Complete Cost Transparency: Exactly Where $2 Goes
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          We maintain a strict 100% donation efficiency pledge.
                          Every individual US $2 donation translates directly
                          into one complete, hearty midday meal kit.
                          Administrative and marketing expenditures are fully
                          sponsored by an endowment trust fund.
                        </p>
                      </div>

                      {/* Cost breakdown chart visual */}

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-surface-container-low p-6 rounded-2xl">
                        <div className="md:col-span-5 flex flex-col items-center justify-center">
                          {/* Custom SVG Donut Chart representing $2 Breakdown */}

                          <div className="relative w-44 h-44 flex items-center justify-center">
                            <svg
                              className="w-full h-full transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              {/* Background Ring */}

                              <circle
                                cx="18"
                                cy="18"
                                fill="none"
                                r="15.9155"
                                stroke="#d9e3f6"
                                strokeWidth="4.5"
                              ></circle>

                              {/* Protein & Rice 60% ($1.20) */}

                              <circle
                                cx="18"
                                cy="18"
                                fill="none"
                                r="15.9155"
                                stroke="#00614f"
                                strokeDasharray="60, 100"
                                strokeDashoffset="0"
                                strokeWidth="4.5"
                              ></circle>

                              {/* Pure Water & Juice 20% ($0.40) */}

                              <circle
                                cx="18"
                                cy="18"
                                fill="none"
                                r="15.9155"
                                stroke="#fea619"
                                strokeDasharray="20, 100"
                                strokeDashoffset="-60"
                                strokeWidth="4.5"
                              ></circle>

                              {/* Thermal Eco Box & Hygiene 15% ($0.30) */}

                              <circle
                                cx="18"
                                cy="18"
                                fill="none"
                                r="15.9155"
                                stroke="#205f56"
                                strokeDasharray="15, 100"
                                strokeDashoffset="-80"
                                strokeWidth="4.5"
                              ></circle>

                              {/* Field Distribution Fuel 5% ($0.10) */}

                              <circle
                                cx="18"
                                cy="18"
                                fill="none"
                                r="15.9155"
                                stroke="#6e7a75"
                                strokeDasharray="5, 100"
                                strokeDashoffset="-95"
                                strokeWidth="4.5"
                              ></circle>
                            </svg>
                            <div className="absolute flex flex-col items-center text-center">
                              <span className="font-serif font-bold text-headline-sm text-emerald-dark leading-none">
                                $2.00
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                                Per Hot Meal
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-7 flex flex-col gap-3 font-body-sm text-body-sm">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-clean shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 rounded-full bg-primary shrink-0"></span>
                              <span className="font-semibold text-on-surface">
                                Fresh Halal Chicken / Egg, Fragrant Rice &amp;
                                Lentils
                              </span>
                            </div>
                            <span className="font-bold text-primary font-label-lg text-label-lg">
                              $1.20 (60%)
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-clean shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 rounded-full bg-secondary-container shrink-0"></span>
                              <span className="font-semibold text-on-surface">
                                Sealed Purified Water &amp; Fortified Fruit
                                Juice Bottle
                              </span>
                            </div>
                            <span className="font-bold text-on-surface font-label-lg text-label-lg">
                              $0.40 (20%)
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-clean shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 rounded-full bg-tertiary shrink-0"></span>
                              <span className="font-semibold text-on-surface">
                                Biodegradable Bento Box, Spoon &amp;
                                Antibacterial Wipe
                              </span>
                            </div>
                            <span className="font-bold text-on-surface font-label-lg text-label-lg">
                              $0.30 (15%)
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-clean shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 rounded-full bg-outline shrink-0"></span>
                              <span className="font-semibold text-on-surface">
                                Thermal Transport Fuel &amp; Volunteer Logistics
                              </span>
                            </div>
                            <span className="font-bold text-on-surface font-label-lg text-label-lg">
                              $0.10 (5%)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-zakat-gold-light text-on-secondary-container flex items-center gap-3">
                        <span className="material-symbols-outlined text-[24px] text-amber-vibrant shrink-0">
                          shield_lock
                        </span>
                        <p className="font-body-sm text-body-sm font-medium">
                          <strong>0% Admin Fee Guarantee:</strong> Our
                          foundation board pays all bank processing fees,
                          administrative salaries, and overheads separately.
                          100% of your chosen dollar count reaches the kitchen.
                        </p>
                      </div>
                    </div>

                    {/* TAB 3: Field Updates Timeline */}

                    <div
                      className={`tab-content flex flex-col gap-6${
                        activeTab === 'tab-updates' ? '' : ' hidden'
                      }`}
                      id="tab-updates"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-serif font-bold text-headline-sm text-emerald-dark">
                            Live Verified Dispatch Log
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Real-time reports sent by our ground coordinators in
                            Dhaka.
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-surface-subtle-mint text-primary font-label-md text-label-md font-bold">
                          Updated 4 Hours Ago
                        </span>
                      </div>

                      {/* Dispatch Timeline */}

                      <div className="flex flex-col gap-6 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-surface-variant">
                        {/* Dispatch Item 1 */}

                        <div className="flex items-start gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">
                              restaurant
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container-low flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-title-md text-title-md font-bold text-on-surface">
                                Tejgaon Station North Yard Drive
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-clean px-2 py-0.5 rounded shadow-sm">
                                Today, 2:15 PM BDT
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                              Distributed 320 hot chicken biryani lunch boxes
                              with mango juice bottles to street children and
                              elder porters along the outer railway platform
                              tracks. Special hydration packs handed out due to
                              the high midday heat.
                            </p>
                            <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-primary font-bold">
                              <span className="material-symbols-outlined text-[16px]">
                                person
                              </span>
                              Coordinator: Engr. Farhan Kabir (PLDS Field Ops)
                            </div>
                          </div>
                        </div>

                        {/* Dispatch Item 2 */}

                        <div className="flex items-start gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-surface-clean text-primary flex items-center justify-center shrink-0 z-10 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">
                              celebration
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container-low flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-title-md text-title-md font-bold text-on-surface">
                                Special Joy &amp; Nutrition Day
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-clean px-2 py-0.5 rounded shadow-sm">
                                3 Days Ago
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                              Arranged colorful balloons and sweet treat
                              packages along with warm nutritious meals for 240
                              children at Kamalapur rail shed. Conducted basic
                              handwashing and hygiene education session before
                              food distribution.
                            </p>
                            <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-primary font-bold">
                              <span className="material-symbols-outlined text-[16px]">
                                person
                              </span>
                              Coordinator: Dr. Sumaiya Akter (Child Welfare
                              Lead)
                            </div>
                          </div>
                        </div>

                        {/* Dispatch Item 3 */}

                        <div className="flex items-start gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-surface-clean text-primary flex items-center justify-center shrink-0 z-10 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">
                              inventory_2
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container-low flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-title-md text-title-md font-bold text-on-surface">
                                Emergency Food Relief Batch Stocking
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-clean px-2 py-0.5 rounded shadow-sm">
                                Last Week
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                              Secured 4,000 kg of aromatic rice, 1,200 dozen
                              farm eggs, and sanitary packing consumables for
                              the upcoming holy period kitchen rotations. All
                              batches certified compliant with national hygiene
                              benchmarks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TAB 4: Zakat & Shariah Governance */}

                    <div
                      className={`tab-content flex flex-col gap-6${
                        activeTab === 'tab-shariah' ? '' : ' hidden'
                      }`}
                      id="tab-shariah"
                    >
                      <div>
                        <h3 className="font-serif font-bold text-headline-sm text-emerald-dark mb-2">
                          Shariah Board Verification &amp; Tamleek Fulfillment
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Food charity designated for Zakat must fulfill the
                          core condition of <em>Tamleek</em> (complete
                          unconditional transfer of ownership to qualified{' '}
                          <em>Masarif al-Zakat</em> recipients, primarily{' '}
                          <em>Al-Fuqara</em> and <em>Al-Masakin</em>).
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-surface-subtle-mint flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-primary font-bold font-title-md text-title-md">
                            <span className="material-symbols-outlined text-[20px]">
                              verified
                            </span>
                            100% Direct Recipient Ownership
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Each food package is handed directly into the
                            physical possession of the beneficiary or their
                            legal guardian with no conditional reclaim or
                            third-party diversion.
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-surface-subtle-mint flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-primary font-bold font-title-md text-title-md">
                            <span className="material-symbols-outlined text-[20px]">
                              account_balance
                            </span>
                            Ring-Fenced Zakat Bank Account
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            All Zakat funds are deposited into an autonomous
                            Islamic bank escrow ledger separate from General
                            Sadaqah and operating reserves.
                          </p>
                        </div>
                      </div>
                      <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            Shariah Supervisory Board Endorsement
                          </span>
                          <span className="font-label-md text-label-md text-emerald-dark font-bold uppercase tracking-wider">
                            Fatwa Ref: GMCF-2024-ZK09
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                          “We have audited the procurement, kitchen preparation,
                          packaging, and station distribution mechanisms of 'One
                          Meal One Hope'. We confirm that all meals distributed
                          under Zakat allocations meet the criteria of authentic
                          Islamic charity.”
                        </p>
                        <div className="flex items-center gap-3 pt-2 text-label-md font-label-md text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            history_edu
                          </span>
                          Signed: Sheikh Dr. Mufti Ahmadullah &amp; Maulana
                          Zubair Hossain
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Impact Ribbon Bar */}

                <div className="p-6 md:p-8 rounded-2xl text-on-primary shadow-md flex flex-col gap-6 bg-primary-container">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-secondary-fixed-dim font-label-md text-label-md uppercase tracking-wider font-bold">
                        GMCF &amp; PLDS Joint Mission
                      </span>
                      <h3 className="font-serif font-bold text-headline-sm text-white mt-1">
                        Verified Milestone Statistics to Date
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-primary-fixed bg-white/10 px-3 py-1.5 rounded-xl font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px] text-amber-vibrant">
                        bolt
                      </span>
                      Audited Weekly
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold text-headline-md text-secondary-fixed-dim">
                        124,580+
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mt-1">
                        Meals Served
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold text-headline-md text-white">
                        45
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mt-1">
                        Kitchen Networks
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold text-headline-md text-secondary-fixed-dim">
                        9,200+
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mt-1">
                        Children Nourished
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold text-headline-md text-white">
                        100%
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mt-1">
                        Zero Admin Fee
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Wall of Dua & Donor Encouragement */}

                <div className="bg-surface-clean rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-headline-sm text-emerald-dark">
                        Recent Donors &amp; Words of Dua
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Community members worldwide standing with street
                        children.
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[28px] text-primary">
                      volunteer_activism
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Donor 1 */}

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary font-bold font-label-md text-label-md flex items-center justify-center">
                            TK
                          </div>
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            Br. Tariq Khan
                          </span>
                        </div>
                        <span className="font-label-lg text-label-lg font-bold text-primary">
                          $100 (50 Meals)
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                        “May Allah accept this as Sadaqah Jariyah for my late
                        mother. May no child remain hungry tonight.”
                      </p>
                      <span className="font-label-sm text-label-sm text-text-muted">
                        London, UK • 22 mins ago
                      </span>
                    </div>

                    {/* Donor 2 */}

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-zakat-gold-light text-secondary font-bold font-label-md text-label-md flex items-center justify-center">
                            AN
                          </div>
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            Anonymous Sister
                          </span>
                        </div>
                        <span className="font-label-lg text-label-lg font-bold text-primary">
                          $200 (Emergency Box)
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                        “Zakat allocation. Seeing their smiles holding the food
                        boxes brings tears to my eyes. Keep up the transparent
                        work.”
                      </p>
                      <span className="font-label-sm text-label-sm text-text-muted">
                        Toronto, Canada • 1 hour ago
                      </span>
                    </div>

                    {/* Donor 3 */}

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary font-bold font-label-md text-label-md flex items-center justify-center">
                            MH
                          </div>
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            Mahmudul Hasan
                          </span>
                        </div>
                        <span className="font-label-lg text-label-lg font-bold text-primary">
                          $50 (25 Meals)
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                        “Grateful to PLDS and GMCF team for reaching Tejgaon
                        rail area directly. Blesings to the volunteers.”
                      </p>
                      <span className="font-label-sm text-label-sm text-text-muted">
                        Dhaka, Bangladesh • 3 hours ago
                      </span>
                    </div>

                    {/* Donor 4 */}

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary font-bold font-label-md text-label-md flex items-center justify-center">
                            SZ
                          </div>
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            Dr. Salman &amp; Family
                          </span>
                        </div>
                        <span className="font-label-lg text-label-lg font-bold text-primary">
                          $300 (150 Meals)
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                        “Monthly pledge fulfilled. May Almighty protect our
                        little brothers and sisters.”
                      </p>
                      <span className="font-label-sm text-label-sm text-text-muted">
                        Dallas, TX • 5 hours ago
                      </span>
                    </div>
                  </div>
                </div>

                {/* Frequently Asked Questions Accordion */}

                <div className="bg-surface-clean rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif font-bold text-headline-sm text-emerald-dark">
                      Frequently Asked Questions
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Clarity on donations, ground execution, and tax receipts.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <details className="group p-4 rounded-xl bg-surface-container-low cursor-pointer [&amp;_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between font-title-md text-title-md font-bold text-on-surface">
                        <span className="">
                          Can I specify my donation strictly as Zakat vs General
                          Sadaqah?
                        </span>
                        <span className="material-symbols-outlined text-[20px] text-primary transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                        Yes. During giving, selecting the "Designate as Zakat"
                        checkbox routes your contribution into our ring-fenced
                        Zakat bank account. It is exclusively deployed to
                        purchase direct meals given directly to eligible
                        impoverished individuals without operational deductions.
                      </p>
                    </details>
                    <details className="group p-4 rounded-xl bg-surface-container-low cursor-pointer [&amp;_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between font-title-md text-title-md font-bold text-on-surface">
                        <span className="">
                          Can overseas donors visit the community kitchens in
                          Dhaka?
                        </span>
                        <span className="material-symbols-outlined text-[20px] text-primary transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                        Absolutely. We maintain an open-door policy for all
                        donors and independent observers. Contact our Gulshan-2
                        HQ at least 48 hours prior, and our donor-relations
                        officers will arrange a guided field briefing and
                        cooking inspection at the Tejgaon operations kitchen.
                      </p>
                    </details>
                    <details className="group p-4 rounded-xl bg-surface-container-low cursor-pointer [&amp;_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between font-title-md text-title-md font-bold text-on-surface">
                        <span className="">
                          Will I receive an official tax-deductible donation
                          receipt?
                        </span>
                        <span className="material-symbols-outlined text-[20px] text-primary transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                        Yes. Instantly after checkout, an automated receipt with
                        UK Gift Aid confirmation (Charity Reg #1184930) or US
                        501(c)(3) tax exemption identification is sent to your
                        registered email address.
                      </p>
                    </details>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Quick Giving Card & Progress (5 cols) */}

              <div className="lg:col-span-5 sticky top-28 flex flex-col gap-6">
                {/* Main Giving Card */}

                <div className="bg-surface-clean rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
                  {/* Goal Progress Tracker */}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif font-bold text-headline-lg text-emerald-dark leading-none">
                          $38,500
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          raised of $50,000 goal
                        </span>
                      </div>
                      <span className="font-title-md text-title-md font-bold text-primary">
                        77%
                      </span>
                    </div>

                    {/* Two-tone progress bar */}

                    <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-1000"
                        style={{ width: '77%' }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                      <span className="flex items-center gap-1 font-semibold text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          group
                        </span>
                        620 Verified Donors
                      </span>
                      <span className="flex items-center gap-1 text-amber-vibrant font-bold">
                        <span className="material-symbols-outlined text-[16px]">
                          schedule
                        </span>
                        18 Days Left in Current Batch
                      </span>
                    </div>
                  </div>

                  {/* Giving Frequency Toggle (One-time vs Monthly) */}

                  <div className="p-1 rounded-xl bg-surface-container-low flex items-center">
                    <button
                      className={`flex-1 py-2.5 rounded-lg font-label-lg text-label-lg font-bold transition-all text-center ${
                        isMonthly
                          ? 'text-on-surface-variant hover:text-primary'
                          : 'bg-primary text-white shadow-sm'
                      }`}
                      id="freq-one"
                      type="button"
                      onClick={() => setIsMonthly(false)}
                    >
                      One-Time Gift
                    </button>
                    <button
                      className={`flex-1 py-2.5 rounded-lg font-label-lg text-label-lg font-bold transition-all text-center flex items-center justify-center gap-1 ${
                        isMonthly
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                      id="freq-month"
                      type="button"
                      onClick={() => setIsMonthly(true)}
                    >
                      <span className="material-symbols-outlined text-[16px] text-secondary-container">
                        autorenew
                      </span>
                      Monthly Recurring
                    </button>
                  </div>

                  {/* Preset Food Packages (Radio Cards) */}

                  <div className="flex flex-col gap-2.5">
                    <label className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                      Select Your Meal Sponsorship Package:
                    </label>

                    {/* Package Option 1 */}

                    <div
                      className={`pkg-card p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        amount === '30'
                          ? 'bg-surface-subtle-mint ring-2 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-subtle-mint'
                      }`}
                      data-amount="30"
                      onClick={() => setAmount('30')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            amount === '30'
                              ? 'bg-primary text-white'
                              : 'bg-surface-clean text-primary'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[14px] check-mark${
                              amount === '30' ? '' : ' hidden'
                            }`}
                          >
                            check
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            $30 USD
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Feeds 15 Street Children with Hot Meals
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-primary bg-surface-clean px-2.5 py-1 rounded shadow-sm">
                        15 Meals
                      </span>
                    </div>

                    {/* Package Option 2 (Popular Choice) */}

                    <div
                      className={`pkg-card p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        amount === '50'
                          ? 'bg-surface-subtle-mint ring-2 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-subtle-mint'
                      }`}
                      data-amount="50"
                      onClick={() => setAmount('50')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            amount === '50'
                              ? 'bg-primary text-white'
                              : 'bg-surface-clean text-primary'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[14px] check-mark${
                              amount === '50' ? '' : ' hidden'
                            }`}
                          >
                            check
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-title-md text-title-md font-bold text-on-surface">
                              $50 USD
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                              Most Popular
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Feeds 25 Children + Clean Water Packs
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-primary bg-surface-clean px-2.5 py-1 rounded shadow-sm">
                        25 Meals
                      </span>
                    </div>

                    {/* Package Option 3 */}

                    <div
                      className={`pkg-card p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        amount === '100'
                          ? 'bg-surface-subtle-mint ring-2 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-subtle-mint'
                      }`}
                      data-amount="100"
                      onClick={() => setAmount('100')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            amount === '100'
                              ? 'bg-primary text-white'
                              : 'bg-surface-clean text-primary'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[14px] check-mark${
                              amount === '100' ? '' : ' hidden'
                            }`}
                          >
                            check
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            $100 USD
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Sponsors 50 Nutritious Meals &amp; Fruit Packs
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-primary bg-surface-clean px-2.5 py-1 rounded shadow-sm">
                        50 Meals
                      </span>
                    </div>

                    {/* Package Option 4 */}

                    <div
                      className={`pkg-card p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        amount === '200'
                          ? 'bg-surface-subtle-mint ring-2 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-subtle-mint'
                      }`}
                      data-amount="200"
                      onClick={() => setAmount('200')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            amount === '200'
                              ? 'bg-primary text-white'
                              : 'bg-surface-clean text-primary'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[14px] check-mark${
                              amount === '200' ? '' : ' hidden'
                            }`}
                          >
                            check
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            $200 USD
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Full Family Emergency Ration Box (1 Month)
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-primary bg-surface-clean px-2.5 py-1 rounded shadow-sm">
                        Family Pack
                      </span>
                    </div>
                  </div>

                  {/* Custom Donation Input */}

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
                      Or Enter Custom Amount:
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 font-serif font-bold text-headline-sm text-on-surface">
                        $
                      </span>
                      <input
                        className="w-full h-12 pl-10 pr-24 rounded-xl bg-surface-container-low text-on-surface font-title-lg text-title-lg font-bold focus:outline-none focus:bg-surface-clean focus:ring-2 focus:ring-primary shadow-inner"
                        id="custom-amount-val"
                        min="2"
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                      />
                      <span className="absolute right-4 font-label-md text-label-md text-primary font-bold">
                        USD ($)
                      </span>
                    </div>
                    <p
                      className="font-label-sm text-label-sm text-primary font-semibold"
                      id="meal-impact-counter"
                    >
                      {`\u2728 Your $${numericAmount} will directly serve ${mealsCount} nutritious warm meal sets.`}
                    </p>
                  </div>

                  {/* Toggles & Dedications Checkboxes */}

                  <div className="flex flex-col gap-2.5 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        checked={isZakat}
                        className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 bg-surface-clean"
                        id="chk-zakat"
                        type="checkbox"
                        onChange={event => setIsZakat(event.target.checked)}
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-on-surface">
                          Designate as 100% Zakat Fund
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Strict Tamleek shariah compliance with zero
                          administrative deductions.
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 bg-surface-clean"
                        id="chk-anon"
                        type="checkbox"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-on-surface">
                          Make My Gift Completely Anonymous
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Hide your name and country from the public donor wall.
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        defaultChecked
                        className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 bg-surface-clean"
                        id="chk-giftaid"
                        type="checkbox"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-on-surface">
                          Add UK Gift Aid / Tax Receipt
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Boost your gift by 25% at no extra cost to you.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Primary Direct Giving Button */}

                  <button
                    className="w-full py-4 rounded-full bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 text-white font-title-lg text-title-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 from-primary to-primary-container"
                    id="btn-submit-donation"
                    onClick={submitDonation}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      favorite
                    </span>
                    <span id="btn-donate-label" className="">
                      {`Sponsor ${mealsCount} Meals${isMonthly ? '/month' : ' Now'} ($${numericAmount})`}
                    </span>
                  </button>

                  {/* Alternative Instant Payment Methods */}

                  <div className="flex flex-col gap-2 pt-1 text-center">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest font-bold">
                      Or Express Fast Checkout
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          credit_card
                        </span>
                        Card
                      </button>
                      <button className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-amber-vibrant">
                          payments
                        </span>
                        PayPal
                      </button>
                      <button className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-error">
                          smartphone
                        </span>
                        bKash / MFS
                      </button>
                    </div>
                  </div>

                  {/* Trust Badges Strip */}

                  <div className="pt-3 flex items-center justify-center gap-4 text-label-sm font-label-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        lock
                      </span>
                      256-Bit SSL Encrypted
                    </span>
                    <span className="">•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        verified_user
                      </span>
                      100% Shariah Compliant
                    </span>
                  </div>
                </div>

                {/* Field Operations Contact Card */}

                <div className="p-5 rounded-2xl bg-surface-clean shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      support_agent
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md font-bold text-on-surface">
                      Questions About This Appeal?
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Speak directly with our Dhaka Field Director.
                    </span>
                    <a
                      className="font-label-md text-label-md text-primary font-bold hover:underline mt-1 flex items-center gap-1"
                      href="tel:+88018004673"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        call
                      </span>
                      +880 1800-4673 (Ext 4)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Urgent Appeals Carousel / Section */}

          <div className="bg-surface-container-low py-12 md:py-16">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded bg-surface-subtle-mint text-primary font-label-md text-label-md uppercase tracking-wider font-bold">
                    Comprehensive Relief
                  </span>
                  <h2 className="font-serif font-bold text-headline-lg text-emerald-dark mt-2">
                    Other Active Emergency Appeals
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Support companion humanitarian operations serving vulnerable
                    communities.
                  </p>
                </div>
                <Link
                  className="font-label-lg text-label-lg font-bold text-primary hover:text-emerald-dark flex items-center gap-1"
                  href="/appeals"
                >
                  View All Active Causes
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Project Alo */}

                <div className="bg-surface-clean rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                  <div className="relative h-48 bg-surface-container overflow-hidden">
                    <img
                      alt="Project Alo Eye Care"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="A smiling Bangladeshi child after cataract eye surgery wearing protective eye shield patch standing beside a female doctor in a rural clinic."
                      src="/images/cataract-surgery-success.jpg"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-label-sm font-bold">
                      Pediatric Surgery
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-serif font-bold text-title-lg text-on-surface group-hover:text-primary transition-colors">
                        Project Alo: Restoring Sight &amp; Pediatric Surgeries
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Restoring vision for 500 blind rural children through
                        free laser cataract operations and ophthalmology care.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: '82%' }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span className="">
                          <strong>$41,200</strong> of $50,000
                        </span>
                        <span className="text-primary font-bold">
                          82% Funded
                        </span>
                      </div>
                      <a
                        className="mt-2 w-full py-2.5 rounded-xl bg-surface-subtle-mint text-primary font-label-md text-label-md font-bold text-center hover:bg-primary hover:text-white transition-colors"
                        href="#"
                      >
                        Support Project Alo
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 2: Deep Tube Wells */}

                <div className="bg-surface-clean rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                  <div className="relative h-48 bg-surface-container overflow-hidden">
                    <img
                      alt="Clean Water Tube Wells"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Village women and young children pumping clean fresh water from a newly constructed blue manual hand tube well in a drought-affected rural Bangladesh village."
                      src="/images/village-water-pump.jpg"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-label-sm font-bold">
                      Water &amp; Sanitation
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-serif font-bold text-title-lg text-on-surface group-hover:text-primary transition-colors">
                        Deep Tube Wells: Lifesaving Pure Water
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Installing deep arsenic-free water pumps to prevent
                        waterborne illnesses across remote flood-prone
                        communities.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: '64%' }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span className="">
                          <strong>$19,200</strong> of $30,000
                        </span>
                        <span className="text-primary font-bold">
                          64% Funded
                        </span>
                      </div>
                      <a
                        className="mt-2 w-full py-2.5 rounded-xl bg-surface-subtle-mint text-primary font-label-md text-label-md font-bold text-center hover:bg-primary hover:text-white transition-colors"
                        href="#"
                      >
                        Build a Water Well ($350)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Project Sheetolota */}

                <div className="bg-surface-clean rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                  <div className="relative h-48 bg-surface-container overflow-hidden">
                    <img
                      alt="Winter Blankets Relief"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Elderly destitute villagers and children wrapped warmly in high quality thick red winter blankets during a nighttime cold wave relief distribution in northern Bangladesh."
                      src="/images/winter-blanket-distribution.jpg"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-label-sm font-bold">
                      Seasonal Emergency
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-serif font-bold text-title-lg text-on-surface group-hover:text-primary transition-colors">
                        Project Sheetolota: Winter Warmth &amp; Blankets
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Providing thick insulated winter quilts and sweaters to
                        thousands exposed to hypothermia in northern char
                        regions.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: '91%' }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span className="">
                          <strong>$27,300</strong> of $30,000
                        </span>
                        <span className="text-primary font-bold">
                          91% Funded
                        </span>
                      </div>
                      <a
                        className="mt-2 w-full py-2.5 rounded-xl bg-surface-subtle-mint text-primary font-label-md text-label-md font-bold text-center hover:bg-primary hover:text-white transition-colors"
                        href="#"
                      >
                        Sponsor Blankets ($15)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Client-side Script for Page Interactions */}
        </div>
      </main>
    </>
  );
}
