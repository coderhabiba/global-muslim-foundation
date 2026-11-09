'use client';

import { useEffect, useRef, useState } from 'react';

const SECTOR_OPTIONS = [
  { value: 'Emergency Relief', icon: 'soup_kitchen', label: 'Food & Relief' },
  {
    value: 'Medical Support',
    icon: 'medical_services',
    label: 'Medical Camps',
  },
  { value: 'Youth Education', icon: 'menu_book', label: 'Street Literacy' },
  { value: 'Media & Logistics', icon: 'photo_camera', label: 'Media & Comms' },
];

export default function VolunteerPage() {
  const successMsgRef = useRef<HTMLDivElement | null>(null);
  const [sector, setSector] = useState('Emergency Relief');
  const [submitCount, setSubmitCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (submitCount > 0) {
      successMsgRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [submitCount]);

  function preselectSector(sectorName: string) {
    setSector(sectorName);

    const target = document.getElementById('volunteer-application');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleVolunteerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      body.append(key, String(value));
    });

    fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(function () {});

    setSubmitCount(current => current + 1);
    form.reset();
  }

  function toggleFaq(index: number) {
    setOpenFaq(current => (current === index ? null : index));
  }

  return (
    <>
      <main suppressHydrationWarning className="w-full bg-surface-subtle-mint pt-[96px] sm:pt-[116px]">
        <div className="flex flex-col w-full">
          {/* Top Ambient Banner / Breadcrumb & Motivation Ribbon */}

          <section className="w-full bg-surface-subtle-mint px-4 sm:px-8 py-4">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-emerald-dark">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary">
                  <span className="material-symbols-outlined text-sm">
                    groups
                  </span>
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Youth Volunteer Corps • Bangladesh Field Division
                </span>
                <span className="hidden sm:inline text-outline-variant">•</span>
                <span className="hidden sm:inline font-body-sm text-body-sm text-text-muted">
                  "The best among you are those who bring greatest benefit to
                  humankind." (Hadith)
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-oceanic-teal-deep">
                  <span className="w-2 h-2 rounded-full bg-amber-vibrant animate-pulse"></span>
                  Spring 2025 Cohort Open (Dhaka, Chittagong, Sylhet)
                </span>
              </div>
            </div>
          </section>

          {/* Impact Hero Statement & Metrics Mosaic */}

          <section className="w-full bg-surface px-4 sm:px-8 pt-8 pb-12">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Editorial Title Block */}

                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle-mint text-primary w-fit">
                    <span className="material-symbols-outlined text-base">
                      emergency_share
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                      FRONT-LINE HUMANITARIAN ACTION • JOIN 850+ YOUTH
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-emerald-dark tracking-tight leading-tight">
                    Become the Guiding Light for Communities in Crisis
                  </h1>
                  <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
                    Whether serving nutritious warm meals at bustling railway
                    platforms, distributing emergency blankets to flood plains,
                    or assisting surgeons during pediatric eye camps — your time
                    and physical dedication convert faith into tangible rescue.
                  </p>

                  {/* Quick Trust Highlights */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="material-symbols-outlined text-primary text-2xl mt-0.5">
                        verified_user
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark">
                          Accredited Service
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Verified volunteer transcripts &amp; academic credit
                          certification.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="material-symbols-outlined text-secondary-container text-2xl mt-0.5">
                        health_and_safety
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark">
                          Field Safety First
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Medical standby kits, high-visibility uniforms &amp;
                          emergency transport.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Real Field Snapshot Mosaic */}

                <div className="lg:col-span-5 flex flex-col space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-clean">
                    <img
                      className="w-full h-72 object-cover object-center"
                      data-alt="A large, united group of young Bangladeshi humanitarian volunteers in light blue t-shirts gathered around a polished wooden conference table during an official field planning orientation. The atmosphere is warm, disciplined, and optimistic, with green indoor foliage in the foreground."
                      src="/images/youth-volunteer-group.jpg"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-dark/90 via-emerald-dark/40 to-transparent p-5 text-on-primary">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-vibrant text-surface-clean font-label-sm text-label-sm uppercase font-bold mb-1">
                        Dhaka Field Council Assembly
                      </span>
                      <p className="font-title-md text-title-md font-bold text-surface-clean">
                        Volunteer Leadership Session 2025
                      </p>
                      <p className="font-body-sm text-body-sm text-surface-container-high opacity-90">
                        Bangladesh Shishu Kalyan Parishad Central Hall, Dhaka
                      </p>
                    </div>
                  </div>

                  {/* Live Activity Bar */}

                  <div className="p-4 rounded-xl bg-surface-subtle-mint flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        schedule
                      </span>
                      <div>
                        <span className="font-label-md text-label-md text-emerald-dark block font-bold">
                          Next Deployment Briefing
                        </span>
                        <span className="font-body-sm text-body-sm text-text-muted">
                          Friday, 08:30 AM • Tejgaon Railway Node
                        </span>
                      </div>
                    </div>
                    <a
                      className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-emerald-dark transition-colors"
                      href="#volunteer-application"
                    >
                      Join Cohort
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* High-Contrast Live Metric Bar */}

          <section className="w-full bg-primary-container text-on-primary py-8 px-4 sm:px-8 shadow-md">
            <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center justify-center p-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary-fixed font-bold tracking-tight">
                    850
                  </span>
                  <span className="font-headline-md text-headline-md text-gold-warm font-bold">
                    +
                  </span>
                </div>
                <span className="font-label-md text-label-md text-surface-container-high uppercase tracking-wider mt-1">
                  Active Youth Volunteers
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim/90 text-xs mt-0.5">
                  Universities &amp; Local Youth Clubs
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary-fixed font-bold tracking-tight">
                    45
                  </span>
                </div>
                <span className="font-label-md text-label-md text-surface-container-high uppercase tracking-wider mt-1">
                  Field Deployments
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim/90 text-xs mt-0.5">
                  Active Relief Operations (2024-25)
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary-fixed font-bold tracking-tight">
                    12
                  </span>
                </div>
                <span className="font-label-md text-label-md text-surface-container-high uppercase tracking-wider mt-1">
                  Regional Dispatch Hubs
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim/90 text-xs mt-0.5">
                  Covering 64 Districts Across Bangladesh
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary-fixed font-bold tracking-tight">
                    100
                  </span>
                  <span className="font-headline-md text-headline-md text-gold-warm font-bold">
                    %
                  </span>
                </div>
                <span className="font-label-md text-label-md text-surface-container-high uppercase tracking-wider mt-1">
                  Certified Safety Training
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim/90 text-xs mt-0.5">
                  Shariah Volunteer Ethics &amp; First Aid
                </span>
              </div>
            </div>
          </section>

          {/* Interactive Volunteer Role Pathways */}

          <section className="w-full bg-surface-container-low px-4 sm:px-8 py-16">
            <div className="max-w-[1280px] mx-auto space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">
                    Choose Your Humanitarian Pathway
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-emerald-dark mt-1">
                    Where Can Your Dedication Create Immediate Impact?
                  </h2>
                  <p className="font-body-md text-body-md text-text-muted mt-2 max-w-2xl">
                    Select an operational pathway that resonates with your
                    schedule, skills, and heart. Every volunteer is provided
                    full logistics support, protective vests, and mentorship.
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:text-emerald-dark transition-colors self-start md:self-auto"
                  href="#volunteer-application"
                >
                  <span className="">Apply Directly for All Sectors</span>
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* 3-Card Pathways Grid */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pathway 1: Emergency Food & Railway Outreach */}

                <div className="bg-surface-clean rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Dozens of young street children seated in organized rows along an open railway platform in Dhaka holding up hygienic food boxes and fresh orange fruit juice bottles with wide smiles, captured during daytime food relief distribution."
                      src="/images/street-children-session.jpg"
                    />
                    <span className="absolute top-4 left-4 bg-amber-vibrant text-surface-clean px-3 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-md">
                      High Priority • Weekly Action
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span className="flex items-center gap-1 font-semibold text-emerald-dark">
                          <span className="material-symbols-outlined text-sm text-primary">
                            calendar_today
                          </span>
                          Fridays &amp; Saturdays
                        </span>
                        <span className="bg-surface-subtle-mint text-primary px-2.5 py-0.5 rounded-full font-bold">
                          Urban Outreach
                        </span>
                      </div>
                      <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold leading-snug">
                        Emergency Food &amp; Railway Outreach
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Direct street nourishment distribution providing fresh,
                        calorie-dense warm meals, hydration, and nutritional
                        juice to orphaned children and unhoused families around
                        metropolitan train stations.
                      </p>
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="bg-surface-subtle-mint/60 p-3.5 rounded-xl space-y-2">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-emerald-dark font-bold block">
                          Core Responsibilities
                        </span>
                        <ul className="text-xs text-text-muted space-y-1.5 font-body-sm">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Packaging hygienic hot meal boxes &amp; drink seal
                            check
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Crowd coordination &amp; respectful queue management
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Child health roll-call &amp; basic welfare check-in
                          </li>
                        </ul>
                      </div>
                      <div className="text-xs text-text-muted flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-secondary-container">
                          pin_drop
                        </span>
                        <span className="">
                          <strong>Key Zones:</strong> Tejgaon, Kamalapur,
                          Mirpur, Tongi
                        </span>
                      </div>
                      <button
                        className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2"
                        onClick={() => preselectSector('Emergency Relief')}
                      >
                        <span className="">Select This Pathway</span>
                        <span className="material-symbols-outlined text-sm">
                          navigate_next
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pathway 2: Project Alo Medical & Eye Camp Support */}

                <div className="bg-surface-clean rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Group of impoverished railway youth holding up packages with colorful yellow and orange polka dot balloons in the foreground, seated orderly near an outdoor train track line waiting for volunteer recreational engagement."
                      src="/images/railway-youth-outreach.jpg"
                    />
                    <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-md">
                      Medical Specialization
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span className="flex items-center gap-1 font-semibold text-emerald-dark">
                          <span className="material-symbols-outlined text-sm text-primary">
                            medical_services
                          </span>
                          Bi-Weekly / Camp Tours
                        </span>
                        <span className="bg-surface-subtle-mint text-primary px-2.5 py-0.5 rounded-full font-bold">
                          Healthcare
                        </span>
                      </div>
                      <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold leading-snug">
                        Project Alo Medical &amp; Eye Camps
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Assisting mobile health teams conducting vision
                        screening, cataract restorations, pediatric eye
                        checkups, and general primary care distribution in
                        hard-to-reach rural settlements.
                      </p>
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="bg-surface-subtle-mint/60 p-3.5 rounded-xl space-y-2">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-emerald-dark font-bold block">
                          Core Responsibilities
                        </span>
                        <ul className="text-xs text-text-muted space-y-1.5 font-body-sm">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Patient reception, digital vitals logging &amp;
                            token issue
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Elderly wheelchair transit &amp; patient
                            accompaniment
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Prescription eyeglass distribution &amp; drop
                            dispensing
                          </li>
                        </ul>
                      </div>
                      <div className="text-xs text-text-muted flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-secondary-container">
                          pin_drop
                        </span>
                        <span className="">
                          <strong>Key Zones:</strong> Kurigram, Sunamganj, Cox's
                          Bazar, Bhola
                        </span>
                      </div>
                      <button
                        className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2"
                        onClick={() => preselectSector('Medical Support')}
                      >
                        <span className="">Select This Pathway</span>
                        <span className="material-symbols-outlined text-sm">
                          navigate_next
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pathway 3: Special Needs & Street Literacy Workshops */}

                <div className="bg-surface-clean rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Young male and female humanitarian volunteers assembled proudly wearing badges and uniform attire during a workshop seminar, smiling warmly with indoor plants and conference podium background."
                      src="/images/humanitarian-volunteers.jpg"
                    />
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-md">
                      Education &amp; Care
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span className="flex items-center gap-1 font-semibold text-emerald-dark">
                          <span className="material-symbols-outlined text-sm text-primary">
                            school
                          </span>
                          Flexible / 2 Days/Month
                        </span>
                        <span className="bg-surface-subtle-mint text-primary px-2.5 py-0.5 rounded-full font-bold">
                          Youth Growth
                        </span>
                      </div>
                      <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold leading-snug">
                        Street Literacy &amp; Creative Workshops
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                        Empowering street children and underprivileged youth
                        with basic numeracy, conversational English, Islamic
                        moral values, handwashing hygiene habits, and
                        therapeutic art sessions.
                      </p>
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="bg-surface-subtle-mint/60 p-3.5 rounded-xl space-y-2">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-emerald-dark font-bold block">
                          Core Responsibilities
                        </span>
                        <ul className="text-xs text-text-muted space-y-1.5 font-body-sm">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Conducting interactive picture-book reading circles
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Distributing school kits, color pencils, and
                            exercise books
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">
                              check_circle
                            </span>
                            Life skills &amp; hand sanitization demonstration
                            games
                          </li>
                        </ul>
                      </div>
                      <div className="text-xs text-text-muted flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-secondary-container">
                          pin_drop
                        </span>
                        <span className="">
                          <strong>Key Zones:</strong> Gabtoli, Lalbagh,
                          Sadarghat, Chittagong Port
                        </span>
                      </div>
                      <button
                        className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2"
                        onClick={() => preselectSector('Youth Education')}
                      >
                        <span className="">Select This Pathway</span>
                        <span className="material-symbols-outlined text-sm">
                          navigate_next
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Volunteer Application & Onboarding Section */}

          <section
            className="w-full bg-surface px-4 sm:px-8 py-16"
            id="volunteer-application"
          >
            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Guidelines, Code of Conduct, Value Props */}

                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <span className="font-label-md text-label-md uppercase font-bold text-primary tracking-wider">
                      Enlistment Application
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-emerald-dark leading-tight">
                      Join Our Field Taskforce in 4 Simple Steps
                    </h2>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      Every applicant attends an accredited 3-hour orientation
                      session covering Shariah-aligned humanitarian ethics,
                      crisis safety precautions, and respectful beneficiary
                      engagement.
                    </p>
                  </div>

                  {/* Step Progression Roadmap Graphic */}

                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                        1
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark font-bold">
                          Online Application
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Submit your geographic availability and interest
                          sector below.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        2
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark font-bold">
                          Orientation &amp; Code of Ethics
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Virtual or in-person workshop at Dhaka HQ / District
                          Centers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        3
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark font-bold">
                          Field Deployment Assignment
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Receive your volunteer badge, uniform kit, and squad
                          leader invite.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-clean shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-surface-subtle-mint text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        4
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-emerald-dark font-bold">
                          Certification of Service
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Issued upon completing 24 verified service hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Official Shariah & Safety Guarantee Tag */}

                  <div className="p-5 rounded-2xl bg-zakat-gold-light/60 text-secondary space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-vibrant text-2xl">
                        verified
                      </span>
                      <span className="font-title-md text-title-md font-bold text-amber-900">
                        Volunteer Protection &amp; Care
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-amber-900/90 leading-relaxed">
                      Global Muslim Foundation provides zero-cost medical
                      insurance coverage during deployments, hot meals during
                      service, round-trip group transit for remote camps, and
                      strict safety guidelines.
                    </p>
                  </div>
                </div>

                {/* Right Column: Interactive Registration Card */}

                <div className="lg:col-span-7 bg-surface-clean rounded-2xl p-6 sm:p-8 shadow-xl">
                  <div className="border-b border-border-subtle pb-4 mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-title-lg text-title-lg text-emerald-dark font-bold">
                        Volunteer Candidate Profile
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-muted">
                        Complete the fields below to schedule your orientation
                        slot.
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-3xl">
                      badge
                    </span>
                  </div>
                  <form
                    className="space-y-6"
                    id="volunteer-form"
                    name="volunteer-application"
                    method="POST"
                    onSubmit={handleVolunteerSubmit}
                  >
                    <input
                      type="hidden"
                      name="form-name"
                      defaultValue="volunteer-application"
                    />

                    {/* Step 1: Personal Details */}

                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-primary block mb-3">
                        1. Personal &amp; Contact Information
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-label-md text-label-md text-on-surface mb-1">
                            Full Legal Name *
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            name="fullName"
                            placeholder="e.g., Tariqul Islam"
                            required
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="block font-label-md text-label-md text-on-surface mb-1">
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            name="phone"
                            placeholder="+880 1700-000000"
                            required
                            type="tel"
                          />
                        </div>
                        <div>
                          <label className="block font-label-md text-label-md text-on-surface mb-1">
                            Email Address *
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            name="email"
                            placeholder="volunteer@university.edu"
                            required
                            type="email"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1">
                              Age *
                            </label>
                            <input
                              className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              name="age"
                              max="40"
                              min="16"
                              placeholder="21"
                              required
                              type="number"
                            />
                          </div>
                          <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1">
                              City / District *
                            </label>
                            <select
                              name="district"
                              className="w-full px-3 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="Dhaka">Dhaka</option>
                              <option value="Chittagong">Chittagong</option>
                              <option value="Sylhet">Sylhet</option>
                              <option value="Rajshahi">Rajshahi</option>
                              <option value="Khulna">Khulna</option>
                              <option value="Cox's Bazar">Cox's Bazar</option>
                              <option value="Other">Other District</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Preferred Service Sector */}

                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-primary block mb-3">
                        2. Preferred Humanitarian Sector
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {SECTOR_OPTIONS.map(option => {
                          const isSelected = sector === option.value;
                          return (
                            <label className="cursor-pointer group block h-full" key={option.value}>
                              <input
                                checked={isSelected}
                                className="peer sr-only"
                                name="sector"
                                type="radio"
                                value={option.value}
                                onChange={() => setSector(option.value)}
                              />
                              <div
                                className={`h-full min-h-[96px] p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border ${
                                  isSelected
                                    ? 'bg-surface-subtle-mint border-primary shadow-sm ring-2 ring-primary/20 text-emerald-dark'
                                    : 'bg-white border-border-subtle hover:border-primary/40 hover:bg-surface-subtle-mint/40 text-text-muted hover:text-emerald-dark'
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                                    isSelected
                                      ? 'bg-primary text-white shadow-sm'
                                      : 'bg-surface-subtle-mint text-primary'
                                  }`}
                                >
                                  <span
                                    className="material-symbols-outlined text-[22px]"
                                    style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                                  >
                                    {option.icon}
                                  </span>
                                </div>
                                <span className="font-semibold text-xs sm:text-[13px] leading-tight text-center line-clamp-2">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Availability */}

                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-primary block mb-3">
                        3. Your Availability Windows
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer">
                          <input
                            defaultChecked
                            className="w-4 h-4 rounded text-primary focus:ring-primary"
                            name="availability"
                            value="Fridays/Saturdays"
                            type="checkbox"
                          />
                          <span className="font-body-sm text-body-sm text-on-surface">
                            Fridays / Saturdays
                          </span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer">
                          <input
                            className="w-4 h-4 rounded text-primary focus:ring-primary"
                            name="availability"
                            value="Weekday Afternoons"
                            type="checkbox"
                          />
                          <span className="font-body-sm text-body-sm text-on-surface">
                            Weekday Afternoons
                          </span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer">
                          <input
                            defaultChecked
                            className="w-4 h-4 rounded text-primary focus:ring-primary"
                            name="availability"
                            value="Rapid Crisis On-Call"
                            type="checkbox"
                          />
                          <span className="font-body-sm text-body-sm text-on-surface">
                            Rapid Crisis On-Call
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Step 4: Academic Background / Special Skills */}

                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">
                        4. University, Major or Skills (Optional)
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        name="skills"
                        placeholder="e.g., 3rd-year Medical Student at DMC, fluent in Bangla/English, Red Crescent First Aid certified..."
                        rows={2}
                      ></textarea>
                    </div>

                    {/* Form Submission Actions */}

                    <div className="space-y-3 pt-2">
                      <button
                        className="w-full py-4 rounded-full bg-amber-vibrant hover:bg-secondary text-surface-clean font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
                        type="submit"
                      >
                        <span className="material-symbols-outlined">send</span>
                        <span className="">
                          Submit Volunteer Application &amp; Join Orientation
                        </span>
                      </button>
                      <div
                        className={`p-4 rounded-xl bg-surface-subtle-mint text-emerald-dark font-body-sm text-body-sm flex items-center gap-3${
                          submitCount > 0 ? '' : ' hidden'
                        }`}
                        id="application-success-msg"
                        ref={successMsgRef}
                      >
                        <span className="material-symbols-outlined text-primary text-xl">
                          task_alt
                        </span>
                        <div className="">
                          <strong>JazakAllah Khayr!</strong> Your volunteer
                          profile has been submitted. Our field coordinator will
                          send your WhatsApp orientation invitation within 24
                          hours.
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-primary">
                            verified
                          </span>
                          Zero Registration Fees
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-primary">
                            security
                          </span>
                          Strict Privacy Policy
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-primary">
                            card_membership
                          </span>
                          Official Certificates
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive FAQ Accordion */}

          <section className="w-full bg-surface-container-low px-4 sm:px-8 py-16">
            <div className="max-w-[1000px] mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">
                  Got Questions?
                </span>
                <h2 className="font-headline-lg text-headline-lg text-emerald-dark font-bold">
                  Volunteer Questions &amp; Clear Answers
                </h2>
                <p className="font-body-md text-body-md text-text-muted max-w-xl mx-auto">
                  Everything you need to know about safety protocols, required
                  hours, certificates, and student credit equivalency.
                </p>
              </div>

              {/* FAQ Items List */}

              <div className="space-y-3" id="faq-accordion-group">
                {/* FAQ 1 */}

                <div className="bg-surface-clean rounded-xl p-5 shadow-sm">
                  <button
                    className="w-full flex items-center justify-between text-left group"
                    onClick={() => toggleFaq(0)}
                    type="button"
                  >
                    <span className="font-title-md text-title-md text-emerald-dark font-semibold group-hover:text-primary transition-colors">
                      Is prior humanitarian or disaster relief experience
                      required?
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary transform transition-transform duration-300${
                        openFaq === 0 ? ' rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`faq-content mt-3 pt-3 border-t border-border-subtle font-body-md text-body-md text-text-muted leading-relaxed${
                      openFaq === 0 ? '' : ' hidden'
                    }`}
                  >
                    No prior field experience is required. All newly registered
                    youth complete our foundational 3-hour orientation session
                    that instructs you in on-ground crisis safety, crowd
                    coordination ethics, and food hygiene standards. You will
                    always be paired alongside seasoned field supervisors during
                    your initial deployments.
                  </div>
                </div>

                {/* FAQ 2 */}

                <div className="bg-surface-clean rounded-xl p-5 shadow-sm">
                  <button
                    className="w-full flex items-center justify-between text-left group"
                    onClick={() => toggleFaq(1)}
                    type="button"
                  >
                    <span className="font-title-md text-title-md text-emerald-dark font-semibold group-hover:text-primary transition-colors">
                      How are emergency deployment safety protocols and
                      insurance managed?
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary transform transition-transform duration-300${
                        openFaq === 1 ? ' rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`faq-content mt-3 pt-3 border-t border-border-subtle font-body-md text-body-md text-text-muted leading-relaxed${
                      openFaq === 1 ? '' : ' hidden'
                    }`}
                  >
                    Safety is our highest institutional mandate. All volunteers
                    are registered under our collective group liability and
                    emergency medical policy during active duty. Every dispatch
                    team travels with a designated senior logistics lead,
                    paramedic standby kit, high-visibility identity vests, and
                    secure transport. We never send volunteers into uncontrolled
                    danger zones.
                  </div>
                </div>

                {/* FAQ 3 */}

                <div className="bg-surface-clean rounded-xl p-5 shadow-sm">
                  <button
                    className="w-full flex items-center justify-between text-left group"
                    onClick={() => toggleFaq(2)}
                    type="button"
                  >
                    <span className="font-title-md text-title-md text-emerald-dark font-semibold group-hover:text-primary transition-colors">
                      Can university students get formal community service
                      credits or internship validation?
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary transform transition-transform duration-300${
                        openFaq === 2 ? ' rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`faq-content mt-3 pt-3 border-t border-border-subtle font-body-md text-body-md text-text-muted leading-relaxed${
                      openFaq === 2 ? '' : ' hidden'
                    }`}
                  >
                    Yes! As a registered international NGO (UK Charity Reg
                    #1184930 and Bangladesh NGO Affairs Bureau accredited), GMCF
                    provides signed volunteer hour logs, recommendation letters
                    for scholarship or graduate admissions, and official
                    verification for university social internship requirements.
                  </div>
                </div>

                {/* FAQ 4 */}

                <div className="bg-surface-clean rounded-xl p-5 shadow-sm">
                  <button
                    className="w-full flex items-center justify-between text-left group"
                    onClick={() => toggleFaq(3)}
                    type="button"
                  >
                    <span className="font-title-md text-title-md text-emerald-dark font-semibold group-hover:text-primary transition-colors">
                      Are female volunteers accommodated with separate
                      arrangements and safe transport?
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary transform transition-transform duration-300${
                        openFaq === 3 ? ' rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`faq-content mt-3 pt-3 border-t border-border-subtle font-body-md text-body-md text-text-muted leading-relaxed${
                      openFaq === 3 ? '' : ' hidden'
                    }`}
                  >
                    Absolutely. Over 40% of our active squad leads and pediatric
                    coordinators are sisters. We uphold strict Islamic modesty
                    and safety protocols, including dedicated female volunteer
                    hubs, peer pairings, chaperoned group transport, and private
                    sanitation arrangements across all remote camp sites.
                  </div>
                </div>
              </div>

              {/* Quick Support Contact */}

              <div className="p-6 rounded-2xl bg-surface-clean flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-subtle-mint flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">
                      support_agent
                    </span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-emerald-dark font-bold">
                      Still have questions before applying?
                    </h4>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Chat directly with the Volunteer Dispatch Officer on
                      WhatsApp.
                    </p>
                  </div>
                </div>
                <a
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-emerald-dark transition-colors inline-flex items-center gap-2 shrink-0"
                  href="https://wa.me/88018004673"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-base">
                    chat
                  </span>
                  <span className="">WhatsApp Helpdesk</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
