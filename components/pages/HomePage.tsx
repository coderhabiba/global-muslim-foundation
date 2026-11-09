'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

const GIFT_AMOUNTS = [
  { value: '25', label: '$25', bordered: true, span: false },
  { value: '50', label: '$50', bordered: false, span: false },
  { value: '100', label: '$100', bordered: true, span: false },
  { value: '250', label: '$250', bordered: true, span: false },
  { value: 'custom', label: 'Custom Amount', bordered: true, span: true },
] as const;

const NISAB_THRESHOLD_USD = 520;

export default function HomePage() {
  const { localize, currency } = useSiteSettings();
  const { openPaymentModal, openLicenseModal } = useModalState();
  const [donorName, setDonorName] = useState('');
  const [donorContact, setDonorContact] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>(
    'one-time',
  );
  const [fund, setFund] = useState('meal');
  const [amountChoice, setAmountChoice] = useState('50');
  const [customAmount, setCustomAmount] = useState('50');
  const [isAmountHighlighted, setIsAmountHighlighted] = useState(false);
  const customAmountRef = useRef<HTMLInputElement>(null);
  const [zakatFields, setZakatFields] = useState({
    cash: '',
    gold: '',
    biz: '',
    debt: '',
  });

  const { netWealth, zakatDue } = useMemo(() => {
    const toAmount = (value: string) => parseFloat(value) || 0;
    const totalAssets =
      toAmount(zakatFields.gold) +
      toAmount(zakatFields.cash) +
      toAmount(zakatFields.biz);
    const net = Math.max(0, totalAssets - toAmount(zakatFields.debt));
    const due =
      net >= NISAB_THRESHOLD_USD ? Math.round(net * 0.025 * 100) / 100 : 0;

    return { netWealth: net, zakatDue: due };
  }, [zakatFields]);

  function formatMoney(value: number) {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  function handleAmountSelect(value: string) {
    setAmountChoice(value);

    if (value === 'custom') {
      customAmountRef.current?.focus();
      return;
    }

    setCustomAmount(value);
  }

  function updateZakatField(field: keyof typeof zakatFields, value: string) {
    setZakatFields(current => ({ ...current, [field]: value }));
  }

  function resetZakatFields() {
    setZakatFields({ cash: '', gold: '', biz: '', debt: '' });
  }

  function payZakatNow() {
    if (zakatDue > 0) {
      setCustomAmount(String(Math.round(zakatDue)));
      setAmountChoice('custom');
      setFund('zakat');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAmountHighlighted(true);
      window.setTimeout(() => setIsAmountHighlighted(false), 1500);
      return;
    }

    alert(
      localize(
        'Your net zakatable wealth is below the Nisab threshold ($520 USD) or currently zero.',
      ),
    );
  }

  return (
    <>
      <main className="w-full bg-surface-subtle-mint pt-[96px] sm:pt-[116px]">
        {/* Top Announcement Pill Bar */}

        <div className="w-full bg-surface-subtle-mint border-b border-border-subtle py-2.5 px-4 sm:px-8">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-primary">
            <div className="flex items-center gap-2 font-medium">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[12px] shadow-sm">
                <span className="material-symbols-outlined text-[13px]">
                  emergency_home
                </span>
              </span>
              <span className="">
                <strong>Ramadan &amp; Emergency Appeal:</strong> 100% of your
                Zakat funds provide immediate warm meals and urgent pediatric
                healthcare for destitute children.
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-emerald-dark">
                <span className="material-symbols-outlined text-[15px] text-amber-vibrant">
                  verified
                </span>
                Govt. Registered NGO No: NGO-AB-89423
              </span>
              <Link
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-emerald-dark underline font-bold"
                href="/zakat-calculator"
              >
                Instant Zakat Calculator →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section with Dual Column & Floating Interactive Donation Card */}

        <section className="relative w-full bg-gradient-to-b from-surface-subtle-mint/50 via-surface to-surface overflow-hidden py-12 lg:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Hero Narrative (7 Cols) */}

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zakat-gold-light border border-amber-300 text-secondary text-xs font-bold tracking-wide">
                  <span className="material-symbols-outlined text-[16px] text-amber-vibrant">
                    shield_with_heart
                  </span>
                  <span className="">
                    Trusted Global Humanitarian Relief &amp; Shariah Stewardship
                  </span>
                </div>
                <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[54px] font-bold text-on-surface tracking-tight leading-[1.15]">
                  Empowering Lives Through Faith,{' '}
                  <span className="text-primary italic underline decoration-gold-warm decoration-4 underline-offset-8">
                    Compassion &amp; Stewardship
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  <strong>One Meal One Hope</strong> — Transforming vulnerable
                  communities across Bangladesh and beyond with emergency
                  nourishment, pediatric surgical care, and sustainable Zakat
                  empowerment programs.
                </p>

                {/* Metric Value Badges */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-sm flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-surface-subtle-mint text-primary">
                      <span className="material-symbols-outlined text-[24px]">
                        restaurant
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-on-surface">
                        120,000+
                      </p>
                      <p className="text-xs text-text-muted font-medium">
                        Nutritious Meals Served
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-sm flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-surface-subtle-mint text-primary">
                      <span className="material-symbols-outlined text-[24px]">
                        medical_services
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-on-surface">
                        8,400+
                      </p>
                      <p className="text-xs text-text-muted font-medium">
                        Pediatric Surgeries &amp; Care
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-sm flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-zakat-gold-light text-amber-700">
                      <span className="material-symbols-outlined text-[24px]">
                        balance
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-on-surface">100%</p>
                      <p className="text-xs text-text-muted font-medium">
                        Shariah Zakat Policy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2 w-full">
                  <button
                    type="button"
                    onClick={() =>
                      openPaymentModal({
                        amount: currency === 'BDT' ? 1000 : 25,
                        cause: 'General Humanitarian & Relief Fund',
                      })
                    }
                    className="w-full sm:w-[260px] h-[52px] rounded-xl bg-secondary-container hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px] text-error">
                      favorite
                    </span>
                    <span>Make an Immediate Donation</span>
                  </button>
                  <Link
                    className="w-full sm:w-[260px] h-[52px] rounded-xl bg-surface-clean hover:bg-surface-subtle-mint text-primary font-bold text-sm border border-primary/20 shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 text-center"
                    href="/appeals"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      explore
                    </span>
                    <span>View Active Appeals &amp; Impact</span>
                  </Link>
                </div>

                {/* Field Photo Strip Preview */}

                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border-subtle mt-4">
                  <img
                    alt="Community relief activity by Global Muslim Charitable Foundation"
                    className="w-full h-52 sm:h-64 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    src="/images/drive-food-1.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Ground Operations
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-white mt-1.5 leading-snug">
                        Emergency warm meal distributions along railway
                        communities &amp; urban slums
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Quick Floating Donation Engine Card (5 Cols) */}

              <div className="lg:col-span-5">
                <div className="bg-surface-clean rounded-3xl shadow-xl p-6 sm:p-8 border border-border-subtle relative">
                  {/* Header Tag */}

                  <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-primary font-extrabold">
                        Instant Secure Donation
                      </span>
                      <h3 className="font-serif-heading text-2xl font-bold text-on-surface mt-0.5">
                        Extend a Helping Hand
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-surface-subtle-mint flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">
                        payments
                      </span>
                    </div>
                  </div>

                  {/* Frequency Switcher */}

                  <div className="mt-5">
                    <label className="text-xs font-bold text-on-surface-variant block mb-1.5 uppercase tracking-wider">
                      Donation Frequency
                    </label>
                    <div
                      className="grid grid-cols-2 gap-2 bg-surface-subtle-mint/70 p-1.5 rounded-xl border border-primary/10"
                      id="freq-wrapper"
                    >
                      <button
                        className={`freq-btn py-2 text-center rounded-lg text-sm font-bold transition-all ${
                          frequency === 'one-time'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-on-surface hover:text-primary'
                        }`}
                        data-freq="one-time"
                        type="button"
                        onClick={() => setFrequency('one-time')}
                      >
                        One-off Gift
                      </button>
                      <button
                        className={`freq-btn py-2 text-center rounded-lg text-sm font-semibold transition-all ${
                          frequency === 'monthly'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-on-surface hover:text-primary'
                        }`}
                        data-freq="monthly"
                        type="button"
                        onClick={() => setFrequency('monthly')}
                      >
                        Monthly Sadaqah
                      </button>
                    </div>
                  </div>

                  {/* Cause Selector */}

                  <div className="mt-4">
                    <label
                      className="text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider"
                      htmlFor="cause-select"
                    >
                      Select Designated Fund
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-surface-subtle-mint/80 border border-primary/20 text-on-surface font-semibold text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                        id="cause-select"
                        value={fund}
                        onChange={event => setFund(event.target.value)}
                      >
                        <option value="meal">
                          One Meal One Hope (Emergency Food Support)
                        </option>
                        <option value="alo">
                          Project Alo (Pediatric Medical &amp; Eye Surgery)
                        </option>
                        <option value="zakat">
                          100% General Zakat Fund (Shariah-Compliant)
                        </option>
                        <option value="winter">
                          Project Sheetolota (Winter Warmth &amp; Blankets)
                        </option>
                        <option value="water">
                          Clean Water Wells &amp; Dignified Sanitation
                        </option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3.5 top-3.5 pointer-events-none text-text-muted">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Amount Chips Grid */}

                  <div className="mt-4">
                    <label className="text-xs font-bold text-on-surface-variant block mb-2 uppercase tracking-wider">
                      Select Gift Amount (USD $)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {GIFT_AMOUNTS.map(option => (
                        <button
                          key={option.value}
                          className={`amt-btn py-2.5 rounded-xl text-sm font-bold transition-all ${
                            option.bordered ? 'border border-primary/20' : ''
                          } ${
                            amountChoice === option.value
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-subtle-mint text-primary hover:bg-primary hover:text-white'
                          } ${option.span ? 'col-span-2' : ''}`}
                          data-amt={option.value}
                          type="button"
                          onClick={() => handleAmountSelect(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Input */}

                  <div className="mt-3">
                    <div className="flex items-center rounded-xl bg-surface border border-border-subtle px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                      <span className="text-xl font-bold text-primary mr-2">
                        $
                      </span>
                      <input
                        ref={customAmountRef}
                        className={`w-full bg-transparent text-lg font-bold text-on-surface focus:outline-none ${
                          isAmountHighlighted ? 'bg-surface-subtle-mint' : ''
                        }`}
                        id="custom-amount-input"
                        placeholder="Enter amount"
                        type="number"
                        value={customAmount}
                        onChange={event => setCustomAmount(event.target.value)}
                      />
                      <span className="text-xs font-bold text-text-muted">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Donor Quick Inputs */}

                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary"
                      placeholder="Full Name (Optional)"
                      type="text"
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                    />
                    <input
                      className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary"
                      placeholder="Email / Phone"
                      type="text"
                      value={donorContact}
                      onChange={e => setDonorContact(e.target.value)}
                    />
                  </div>

                  {/* Instant Checkout CTA */}

                  <div className="mt-5">
                    <button
                      className="w-full py-3.5 rounded-xl bg-secondary-container hover:bg-amber-600 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      type="button"
                      onClick={() => {
                        const parsedAmt = parseFloat(customAmount) || 50;
                        const causeMap: Record<string, string> = {
                          meal: 'One Meal One Hope (Emergency Food Support)',
                          alo: 'Project Alo (Pediatric Medical & Eye Surgery)',
                          zakat: '100% General Zakat Fund (Shariah-Compliant)',
                          winter: 'Project Sheetolota (Winter Warmth & Blankets)',
                          water: 'Clean Water Wells & Dignified Sanitation',
                        };
                        openPaymentModal({
                          amount: currency === 'BDT' ? parsedAmt * 122 : parsedAmt,
                          currency: currency,
                          cause: causeMap[fund] || 'Humanitarian Relief',
                          donorName: donorName,
                          donorPhone: donorContact,
                        });
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        lock
                      </span>
                      <span className="">
                        EPS গেটওয়ে দিয়ে নিরাপদ অনুদান দিন (bKash/Card)
                      </span>
                    </button>
                  </div>

                  {/* Trust Payment Logos & Shariah Assurance */}

                  <div className="mt-4 pt-3.5 border-t border-border-subtle flex flex-wrap items-center justify-between text-xs text-text-muted gap-2">
                    <button
                      type="button"
                      onClick={() => openLicenseModal()}
                      className="flex items-center gap-1.5 font-medium text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified_user
                      </span>
                      <span className="underline">Govt Reg #NGO-AB-89423 (সনদ দেখুন)</span>
                    </button>
                    <div className="flex items-center gap-2 flex-wrap">
                      <img
                        src="/images/payment/bkash.svg"
                        alt="bKash"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <img
                        src="/images/payment/nagad.svg"
                        alt="Nagad"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <img
                        src="/images/payment/rocket.svg"
                        alt="Rocket"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <img
                        src="/images/payment/upay.svg"
                        alt="Upay"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <img
                        src="/images/payment/visa.svg"
                        alt="Visa"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <img
                        src="/images/payment/mastercard.svg"
                        alt="Mastercard"
                        className="h-5 w-auto object-contain rounded"
                      />
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[10px] text-emerald-900 font-mono font-bold">
                        EPS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics & Transparency Ribbon */}

        <section className="w-full bg-emerald-dark text-on-primary py-10 shadow-inner">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-2">
                <div className="font-serif-heading text-3xl sm:text-4xl text-gold-warm font-bold tracking-tight">
                  120,000+
                </div>
                <p className="text-sm font-semibold text-primary-fixed mt-1">
                  Meals Distributed
                </p>
                <span className="text-xs text-white/70 block mt-0.5">
                  Railway tracks &amp; urban slums
                </span>
              </div>
              <div className="p-2 border-l border-white/10">
                <div className="font-serif-heading text-3xl sm:text-4xl text-gold-warm font-bold tracking-tight">
                  8,400+
                </div>
                <p className="text-sm font-semibold text-primary-fixed mt-1">
                  Children Medical Treatments
                </p>
                <span className="text-xs text-white/70 block mt-0.5">
                  Pediatric surgeries &amp; medications
                </span>
              </div>
              <div className="p-2 border-l md:border-l border-white/10">
                <div className="font-serif-heading text-3xl sm:text-4xl text-gold-warm font-bold tracking-tight">
                  350+
                </div>
                <p className="text-sm font-semibold text-primary-fixed mt-1">
                  Clean Water Wells &amp; Washrooms
                </p>
                <span className="text-xs text-white/70 block mt-0.5">
                  Deep aquifers &amp; hygiene stations
                </span>
              </div>
              <div className="p-2 border-l border-white/10">
                <div className="font-serif-heading text-3xl sm:text-4xl text-gold-warm font-bold tracking-tight">
                  100%
                </div>
                <p className="text-sm font-semibold text-primary-fixed mt-1">
                  Shariah Board Verified
                </p>
                <span className="text-xs text-white/70 block mt-0.5">
                  Zero overhead deducted from Zakat
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent Appeals & Active Campaigns Grid */}

        <section className="w-full py-16 bg-surface" id="active-appeals">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            {/* Section Header */}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
                  Emergency Humanitarian Appeals
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface mt-1.5">
                  Active Appeals &amp; Dedicated Funds
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1.5">
                  Your charitable donation provides life-saving sustenance,
                  emergency surgeries, clean drinking water, and winter
                  protection to those facing acute hardship.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm">
                  All Campaigns
                </button>
                <button className="px-4 py-2 rounded-xl bg-surface-subtle-mint text-primary text-xs font-semibold hover:bg-surface-clean border border-primary/20">
                  Food Relief
                </button>
                <button className="px-4 py-2 rounded-xl bg-surface-subtle-mint text-primary text-xs font-semibold hover:bg-surface-clean border border-primary/20">
                  Healthcare
                </button>
              </div>
            </div>

            {/* Projects Cards Bento Grid (4 appeals) */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Campaign 1: One Meal One Hope */}

              <div className="bg-surface-clean rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    alt="One Meal One Hope food distribution"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src="/images/one-meal-one-hope.jpg"
                  />
                  <div className="absolute top-3 left-3 bg-amber-vibrant text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Food Relief
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Zakat Eligible
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <Link
                      href="/campaign-details"
                      className="block hover:underline"
                    >
                      <h3 className="font-serif-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        One Meal One Hope
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                      Daily hot nutritious meals and essential supplements for
                      abandoned street children and railway families across
                      Dhaka hubs.
                    </p>
                  </div>

                  {/* Progress Bar */}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">
                        Raised: $38,500
                      </span>
                      <span className="text-text-muted">Goal: $50,000</span>
                    </div>
                    <div className="w-full h-2 bg-surface-subtle-mint rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '77%' }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-amber-500">
                          group
                        </span>
                        620 Donors
                      </span>
                      <span className="font-bold text-primary">77% funded</span>
                    </div>
                  </div>
                  <Link
                    href="/campaign-details"
                    className="w-full py-2.5 rounded-xl bg-surface-subtle-mint hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      volunteer_activism
                    </span>
                    <span>View Appeal & Sponsor</span>
                  </Link>
                </div>
              </div>

              {/* Campaign 2: Project Alo: Eye Care & Pediatric Surgery */}

              <div className="bg-surface-clean rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    alt="Project Alo: Eye Care &amp; Pediatric Surgery"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src="/images/project-alo-eye-care.jpg"
                  />
                  <div className="absolute top-3 left-3 bg-oceanic-teal-deep text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Pediatric Care
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Zakat Eligible
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      Project Alo: Eye Care &amp; Pediatric Surgery
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                      Sight-restoring cataract surgery, chronic infection
                      treatments, and emergency prescription pharmaceuticals for
                      impoverished children.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">
                        Raised: $29,000
                      </span>
                      <span className="text-text-muted">Goal: $35,000</span>
                    </div>
                    <div className="w-full h-2 bg-surface-subtle-mint rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '83%' }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-amber-500">
                          group
                        </span>
                        410 Donors
                      </span>
                      <span className="font-bold text-primary">83% funded</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2.5 rounded-xl bg-surface-subtle-mint hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      medical_services
                    </span>
                    <span className="">Fund Pediatric Surgery</span>
                  </button>
                </div>
              </div>

              {/* Campaign 3: Project Sheetolota: Winter Blanket & Shelter */}

              <div className="bg-surface-clean rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    alt="Project Sheetolota winter blanket relief"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src="/images/project-sheetolota-blankets.jpg"
                  />
                  <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Winter Warmth
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Sadaqah
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      Project Sheetolota: Winter Blanket &amp; Shelter
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                      Heavy wool blankets, thermal jackets, and
                      weather-resistant bedding distributed to rural orphanages
                      and cold-struck families.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">
                        Raised: $31,000
                      </span>
                      <span className="text-text-muted">Goal: $40,000</span>
                    </div>
                    <div className="w-full h-2 bg-surface-subtle-mint rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '78%' }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-amber-500">
                          group
                        </span>
                        535 Donors
                      </span>
                      <span className="font-bold text-primary">78% funded</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2.5 rounded-xl bg-surface-subtle-mint hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      ac_unit
                    </span>
                    <span className="">Send Winter Blankets</span>
                  </button>
                </div>
              </div>

              {/* Campaign 4: Clean Water & Dignified Sanitation */}

              <div className="bg-surface-clean rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    alt="Clean water and sanitation facility"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src="/images/clean-water-well.jpg"
                  />
                  <div className="absolute top-3 left-3 bg-primary-container text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Clean Water &amp; Wash
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Sadaqah Jariyah
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      Clean Water &amp; Dignified Sanitation
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                      Installing deep arsenic-free tube wells and hygienic
                      communal washrooms across disaster-prone and
                      water-stressed communities.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">
                        Raised: $19,500
                      </span>
                      <span className="text-text-muted">Goal: $25,000</span>
                    </div>
                    <div className="w-full h-2 bg-surface-subtle-mint rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '78%' }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-amber-500">
                          group
                        </span>
                        290 Donors
                      </span>
                      <span className="font-bold text-primary">78% funded</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2.5 rounded-xl bg-surface-subtle-mint hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      water_drop
                    </span>
                    <span className="">Build a Water Well</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Stories Spotlight: Reconnection & Rehabilitation */}

        <section
          className="w-full py-16 bg-surface-subtle-mint/60 border-y border-border-subtle"
          id="story-spotlight"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Documented Field Impact
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface mt-1.5">
                Real Life Transformations: A Mother &amp; Child Reunited
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                Every donation is more than a metric—it saves lives, rescues
                lost children, and restores hope to families in their darkest
                hours.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Story 1: Badshah Reconnection (7 Cols) */}

              <div className="lg:col-span-7 bg-surface-clean rounded-3xl overflow-hidden border border-border-subtle shadow-md flex flex-col justify-between">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    alt="Lost child Badshah reunited with mother by foundation"
                    className="w-full h-full object-cover"
                    src="/images/badshah-reunion.jpg"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-dark/95 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur shadow">
                    Family Reconnection &amp; Child Welfare
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span className="">Tejgaon Community Center</span>
                      <span className="">•</span>
                      <span className="">Verified by Local Authorities</span>
                    </div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-on-surface">
                      "Bringing Badshah Back to His Mother's Embrace" — A
                      Miracle of Compassion
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                      Found wandering and distressed near the railway terminals,
                      8-year-old Badshah was taken into protective custody by
                      our emergency field team. Following 21 days of meticulous
                      cross-district verification and community coordination, he
                      was safely reunited with his tearful mother.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border-subtle mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        GMC
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-on-surface">
                          Child Protection &amp; Welfare Division
                        </p>
                        <p className="text-xs text-text-muted">
                          Global Muslim Charitable Foundation
                        </p>
                      </div>
                    </div>
                    <span className="text-primary font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer hover:underline">
                      Read Case Study →
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Stories (5 Cols) */}

              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Story 2: Pediatric Hope */}

                <div className="bg-surface-clean rounded-3xl overflow-hidden border border-border-subtle shadow-md p-5 flex flex-col justify-between flex-grow">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3.5">
                    <img
                      alt="Pediatric healthcare and maternal hope"
                      className="w-full h-full object-cover"
                      src="/images/pediatric-hope-saifan.jpg"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      Pediatric Hope
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-on-surface">
                      Saifan's Journey to Health &amp; Recovery
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Born with critical medical distress into extreme poverty,
                      Saifan received fully sponsored pediatric surgery and
                      vital nutrition care.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted font-medium">
                      100% Sponsored Care
                    </span>
                    <span className="text-primary font-bold">
                      View Medical Records →
                    </span>
                  </div>
                </div>

                {/* Story 3: Special Moments for Special Children */}

                <div className="bg-surface-clean rounded-3xl overflow-hidden border border-border-subtle shadow-md p-5 flex flex-col justify-between flex-grow">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3.5">
                    <img
                      alt="Special kids inclusive celebration"
                      className="w-full h-full object-cover"
                      src="/images/special-children-joy.jpg"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-secondary-container text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      Community Joy
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-on-surface">
                      Special Moments for Special Children
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Hosting inclusive festive gatherings, medical checks, and
                      joy-filled meals for neurodiverse and disabled youth in
                      partner centers.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted font-medium">
                      Over 85+ Children Hosted
                    </span>
                    <span className="text-primary font-bold">
                      Photo Gallery →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Interactive Zakat Calculator Section */}

        <section className="w-full py-16 bg-surface" id="quick-calculator">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-br from-emerald-dark via-[#065A4F] to-oceanic-teal-deep rounded-3xl text-on-primary p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Zakat Mandate & Policy (5 Cols) */}

                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-warm/20 text-gold-warm text-xs font-bold border border-gold-warm/30">
                    <span className="material-symbols-outlined text-[16px]">
                      balance
                    </span>
                    <span className="">
                      100% Shariah Compliant &amp; Independent Oversight
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl text-white font-bold leading-tight">
                    Calculate Your Zakat with{' '}
                    <span className="text-gold-warm italic">
                      100% Precision &amp; Confidence
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-primary-fixed leading-relaxed">
                    In strict compliance with Islamic jurisprudence, your Zakat
                    is segregated into an exclusive treasury. Not a single cent
                    is deducted for admin or overhead expenses—guaranteeing your
                    obligation directly lifts the poorest.
                  </p>
                  <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        ✓
                      </span>
                      <span className="text-white">
                        Direct supervision by Certified Shariah Advisory Council
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        ✓
                      </span>
                      <span className="text-white">
                        Independently audited yearly accounting reports
                        published
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        ✓
                      </span>
                      <span className="text-white">
                        Instant tax-deductible e-receipts and donor certificates
                      </span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Link
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary-container hover:bg-amber-600 text-slate-900 font-bold text-sm transition-all shadow-md"
                      href="/appeals"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        verified_user
                      </span>
                      <span className="">Review Our Zakat Policy</span>
                    </Link>
                  </div>
                </div>

                {/* Interactive Zakat Calculator Card (7 Cols) */}

                <div className="lg:col-span-7 bg-surface-clean rounded-3xl p-6 sm:p-8 text-on-surface shadow-2xl border border-border-subtle">
                  <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                    <div>
                      <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Zakat Calculator
                      </h3>
                      <p className="text-xs text-text-muted">
                        Instant calculation based on current Nisab threshold
                        (2.5%)
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-surface-subtle-mint text-primary font-bold text-xs rounded-full border border-primary/20">
                      Silver Nisab: $520 USD
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Cash in Hand &amp; Bank Accounts ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-text-muted">
                          $
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                          id="calc-cash"
                          placeholder="0"
                          type="number"
                          value={zakatFields.cash}
                          onChange={event =>
                            updateZakatField('cash', event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Gold &amp; Silver Value ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-text-muted">
                          $
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                          id="calc-gold"
                          placeholder="0"
                          type="number"
                          value={zakatFields.gold}
                          onChange={event =>
                            updateZakatField('gold', event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Business Merchandise &amp; Stocks ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-text-muted">
                          $
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                          id="calc-biz"
                          placeholder="0"
                          type="number"
                          value={zakatFields.biz}
                          onChange={event =>
                            updateZakatField('biz', event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Deduct: Immediate Liabilities &amp; Debts ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-text-muted">
                          $
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                          id="calc-debt"
                          placeholder="0"
                          type="number"
                          value={zakatFields.debt}
                          onChange={event =>
                            updateZakatField('debt', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instant Calculation Display Strip */}

                  <div className="mt-6 p-4 rounded-2xl bg-surface-subtle-mint border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider block">
                        Net Zakat-Eligible Wealth
                      </span>
                      <span
                        className="text-lg font-bold text-on-surface"
                        id="calc-net-assets"
                      >
                        {formatMoney(netWealth)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider block">
                        Your Zakat Due (2.5%)
                      </span>
                      <span
                        className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-primary"
                        id="calc-zakat-due"
                      >
                        {formatMoney(zakatDue)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      className="flex-grow py-3 rounded-xl bg-primary hover:bg-emerald-dark text-white font-bold text-sm transition-all shadow-md text-center"
                      id="calc-apply-btn"
                      type="button"
                      onClick={payZakatNow}
                    >
                      Pay This Zakat Now
                    </button>
                    <button
                      className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-dim text-on-surface font-semibold text-xs border border-border-subtle transition-all"
                      id="calc-reset-btn"
                      type="button"
                      onClick={resetZakatFields}
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer & Youth Engagement */}

        <section className="w-full py-16 bg-surface-subtle-mint/40 border-t border-border-subtle">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Visual */}

              <div className="lg:col-span-6 relative">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-border-subtle">
                  <img
                    alt="Youth volunteers of Global Muslim Charitable Foundation"
                    className="w-full h-80 sm:h-96 object-cover object-center"
                    src="/images/youth-volunteers.jpg"
                  />
                </div>

                {/* Floating Mini Badge */}

                <div className="absolute -bottom-5 right-5 bg-surface-clean rounded-2xl p-4 shadow-xl border border-border-subtle max-w-xs hidden sm:flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-slate-900 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[26px]">
                      diversity_3
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-on-surface">
                      850+ Active Youth
                    </p>
                    <p className="text-xs text-text-muted">
                      Dedicated frontline relief volunteers
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content & Form */}

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Community Action &amp; Stewardship
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface leading-tight">
                  Join Our 850+ Dedicated Youth Volunteers
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Whether distributing emergency winter blankets, supporting
                  medical triage camps, or tutoring street children—your time
                  and sincerity can illuminate a vulnerable child's world.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">
                      school
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">
                        Street Youth Literacy
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        Weekly foundational reading, numeracy &amp; moral
                        education.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">
                      local_shipping
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">
                        Emergency Field Dispatch
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        Rapid flood and winter relief response across rural
                        districts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sign-up Mini Bar */}

                <div className="pt-2">
                  <form
                    className="flex flex-col sm:flex-row items-center gap-2 max-w-md"
                    onSubmit={event => {
                      event.preventDefault();
                      alert(
                        localize(
                          'Thank you! Your volunteer application has been received. Our team will reach out shortly.',
                        ),
                      );
                    }}
                  >
                    <input
                      className="w-full bg-surface-clean border border-border-subtle rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary shadow-sm"
                      placeholder="Enter your email or phone..."
                      required
                      type="email"
                    />
                    <button
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-emerald-dark text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-colors shadow-sm"
                      type="submit"
                    >
                      Join Us →
                    </button>
                  </form>
                  <p className="text-xs text-text-muted mt-2">
                    No prior experience required. Compassion and commitment are
                    all you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance, Shariah Board & Annual Audit Report Assurance */}

        <section
          className="w-full py-14 bg-surface border-t border-border-subtle"
          id="governance"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="bg-surface-clean rounded-3xl p-6 sm:p-8 shadow-sm border border-border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-subtle-mint text-primary flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/20">
                    <span className="material-symbols-outlined text-[32px]">
                      assignment_turned_in
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-on-surface">
                      Independent Charter Audit
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Yearly financial and Zakat treasury audits conducted by
                      top-tier chartered accounting firms.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zakat-gold-light text-amber-700 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-300">
                    <span className="material-symbols-outlined text-[32px]">
                      menu_book
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-on-surface">
                      Shariah Advisory Council
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Supervised by renowned Islamic scholars to ensure 100%
                      adherence to authentic Zakat distribution.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start md:justify-end">
                  <a
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-subtle-mint hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all border border-primary/20 shadow-sm"
                    href="#"
                    onClick={event => {
                      event.preventDefault();
                      alert(
                        localize(
                          'Downloading the 2024 GMCF Annual Financial & Impact Report (PDF)...',
                        ),
                      );
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      download
                    </span>
                    <span className="">Download 2024 Annual Report (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
