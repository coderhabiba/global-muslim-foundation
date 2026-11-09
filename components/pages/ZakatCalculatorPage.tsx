'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useSiteSettings } from '@/lib/site-settings';

const NISAB_SILVER_USD = 581.75;

const EMPTY_FIELDS = {
  cashHome: '',
  cashBank: '',
  goldVal: '',
  silverVal: '',
  inventory: '',
  stocks: '',
  propResale: '',
  rentalIncome: '',
  debtsDue: '',
  billsDue: '',
};

function parseNum(value: string) {
  const parsed = parseFloat(value);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

function formatMoney(num: number) {
  return (
    '$' +
    num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export default function ZakatCalculatorPage() {
  const { localize } = useSiteSettings();
  const [fields, setFields] = useState({ ...EMPTY_FIELDS });
  const [openFaqs, setOpenFaqs] = useState([false, false, false, false]);
  // Legacy only adds the transition class once recompute() has run at least once.
  const [hasRecomputed, setHasRecomputed] = useState(false);

  function updateField(key: keyof typeof EMPTY_FIELDS, value: string) {
    setFields(current => ({ ...current, [key]: value }));
    setHasRecomputed(true);
  }

  const assets =
    parseNum(fields.cashHome) +
    parseNum(fields.cashBank) +
    parseNum(fields.goldVal) +
    parseNum(fields.silverVal) +
    parseNum(fields.inventory) +
    parseNum(fields.stocks) +
    parseNum(fields.propResale) +
    parseNum(fields.rentalIncome);

  const debts = parseNum(fields.debtsDue) + parseNum(fields.billsDue);
  const netWealth = Math.max(0, assets - debts);
  const zakatDue = netWealth >= NISAB_SILVER_USD ? netWealth * 0.025 : 0;

  const nisabReached = netWealth >= NISAB_SILVER_USD;
  const nisabStatusText = nisabReached
    ? 'Nisab Reached (Zakat Obligatory)'
    : netWealth > 0
      ? 'Below Nisab ($581.75) — Optional Sadaqah'
      : 'Pending Assessment';
  const nisabIcon = nisabReached ? 'check_circle' : 'info';
  const nisabIconClass = nisabReached
    ? 'material-symbols-outlined text-primary text-[28px]'
    : netWealth > 0
      ? 'material-symbols-outlined text-amber-vibrant text-[28px]'
      : 'material-symbols-outlined text-primary text-[28px]';
  const nisabBoxClass = `${
    nisabReached
      ? 'p-4 rounded-xl bg-surface-subtle-mint'
      : 'p-4 rounded-xl bg-surface-container-low'
  } flex items-center gap-3${hasRecomputed ? ' transition-colors' : ''}`;

  function resetFields() {
    setFields({ ...EMPTY_FIELDS });
    setHasRecomputed(true);
  }

  function fulfillZakat() {
    setHasRecomputed(true);
    if (zakatDue > 0) {
      alert(
        localize(
          'Your calculated Zakat of ' +
            formatMoney(zakatDue) +
            ' has been transferred to your donation tray.',
        ),
      );
    } else {
      alert(
        localize(
          'Your current net wealth is below the Nisab threshold. You can still contribute voluntary Sadaqah.',
        ),
      );
    }
  }

  function toggleFaq(index: number) {
    setOpenFaqs(current =>
      current.map((isOpen, position) =>
        position === index ? !isOpen : isOpen,
      ),
    );
  }

  return (
    <>
      <main className="w-full bg-surface-container-low pt-[96px] sm:pt-[116px]">
        <div className="flex flex-col w-full">
          {/* Section 1: Hero Banner & Trust Foundation */}

          <section className="relative w-full bg-surface-container-low overflow-hidden py-16 lg:py-24">
            {/* Ambient Islamic Motif Decorative Layers */}

            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl"></div>
              <svg
                className="w-full h-full object-cover opacity-10"
                fill="none"
                viewBox="0 0 800 800"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="text-primary"
                  cx="400"
                  cy="400"
                  r="380"
                  stroke="currentColor"
                  strokeDasharray="8 8"
                  strokeWidth="1"
                ></circle>
                <circle
                  className="text-primary"
                  cx="400"
                  cy="400"
                  r="280"
                  stroke="currentColor"
                  strokeWidth="1"
                ></circle>
                <path
                  className="text-primary"
                  d="M400 20L450 350L780 400L450 450L400 780L350 450L20 400L350 350Z"
                  stroke="currentColor"
                  strokeWidth="0.75"
                ></path>
              </svg>
            </div>
            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Text Column */}

                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-subtle-mint text-primary w-fit shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                    <span className="font-label-md text-label-md tracking-wider uppercase">
                      100% Zakat Policy Guaranteed
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Purify Your Wealth with{' '}
                    <span className="text-primary italic">
                      Absolute Shariah Integrity
                    </span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Every single cent of your Zakat reaches vetted Asnaf
                    families with zero operational or administrative deductions.
                    Supervised by qualified scholars, independently audited, and
                    directly transferred to preserve human dignity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="bg-surface-clean rounded-xl p-4 shadow-sm flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-[20px]">
                          account_balance
                        </span>
                        <span>Ring-Fenced</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Separate trust accounts solely for designated Zakat
                        payouts.
                      </p>
                    </div>
                    <div className="bg-surface-clean rounded-xl p-4 shadow-sm flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-[20px]">
                          transfer_within_a_station
                        </span>
                        <span>Tamleek Direct</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Unconditional ownership transferred to verified
                        recipients.
                      </p>
                    </div>
                    <div className="bg-surface-clean rounded-xl p-4 shadow-sm flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-[20px]">
                          assignment_turned_in
                        </span>
                        <span>0% Overhead</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Operational expenditures funded exclusively via separate
                        gift funds.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Field Photo Spotlight (Project Alo / Dignity) */}

                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden bg-surface-clean shadow-xl group">
                    <img
                      className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      data-alt="A portrait of a resilient mother in a soft white veil gently cradling her young child in an impoverished village setting, capturing quiet human dignity and resilience with warm daylight tones, soft greenery in the background, and deep emerald oceanic green accents reflecting the charitable foundation visual identity."
                      src="/images/resilient-mother-portrait.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-oceanic-teal-deep/90 via-oceanic-teal-deep/30 to-transparent flex flex-col justify-end p-6 text-on-primary">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-vibrant text-on-secondary font-label-sm text-label-sm w-fit uppercase mb-2">
                        <span className="material-symbols-outlined text-[14px]">
                          local_hospital
                        </span>
                        <span>Field Case #ZA-482: Project Alo</span>
                      </div>
                      <h2 className="font-title-lg text-title-lg text-on-primary leading-tight">
                        Pediatric Sight Restoration &amp; Family Rehabilitation
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-primary/80 mt-1">
                        Direct Zakat beneficiary receiving surgical trauma care
                        in Kurigram district.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Live Nisab Benchmark Ticker */}

          <section className="w-full bg-emerald-dark text-on-primary py-8">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-zakat-gold-light">
                    <span className="material-symbols-outlined text-[24px]">
                      scale
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-primary">
                      Today's Live Nisab Values
                    </h3>
                    <p className="font-label-md text-label-md text-primary-fixed">
                      Updated dynamically per London Bullion Market Association
                      (LBMA) standards
                    </p>
                  </div>
                </div>
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  data-money="off"
                >
                  {/* Silver Nisab (Recommended for Charity) */}

                  <div className="bg-black/25 rounded-xl p-3 flex flex-col">
                    <div className="flex items-center justify-between text-primary-fixed font-label-sm text-label-sm">
                      <span>Silver Nisab (612.36g)</span>
                      <span className="text-zakat-gold-light">Preferred</span>
                    </div>
                    <span
                      className="font-headline-sm text-headline-sm text-on-primary font-bold mt-1"
                      id="nisab-silver-usd"
                    >
                      $581.75
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary/60">
                      USD Benchmark
                    </span>
                  </div>

                  {/* Silver Nisab BDT */}

                  <div className="bg-black/25 rounded-xl p-3 flex flex-col">
                    <span className="text-primary-fixed font-label-sm text-label-sm">
                      Silver Nisab (BDT)
                    </span>
                    <span
                      className="font-headline-sm text-headline-sm text-on-primary font-bold mt-1"
                      id="nisab-silver-bdt"
                    >
                      ৳68,450
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary/60">
                      Local Market Rate
                    </span>
                  </div>

                  {/* Silver Nisab GBP */}

                  <div className="bg-black/25 rounded-xl p-3 flex flex-col">
                    <span className="text-primary-fixed font-label-sm text-label-sm">
                      Silver Nisab (GBP)
                    </span>
                    <span
                      className="font-headline-sm text-headline-sm text-on-primary font-bold mt-1"
                      id="nisab-silver-gbp"
                    >
                      £458.20
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary/60">
                      UK Standard
                    </span>
                  </div>

                  {/* Gold Nisab (87.48g) */}

                  <div className="bg-black/25 rounded-xl p-3 flex flex-col">
                    <span className="text-primary-fixed font-label-sm text-label-sm">
                      Gold Nisab (87.48g)
                    </span>
                    <span
                      className="font-headline-sm text-headline-sm text-on-primary font-bold mt-1"
                      id="nisab-gold-usd"
                    >
                      $6,820.00
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary/60">
                      Alternative Benchmark
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Interactive 5-Step Comprehensive Zakat Calculator */}

          <section className="w-full bg-surface py-16" id="quick-calculator">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary bg-surface-subtle-mint px-3 py-1 rounded-full mb-3">
                  5-Category Shariah Matrix
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Calculate Your Annual Zakat Obligation
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Enter all assets possessed over one lunar year (Hawl). Debts
                  and immediate living liabilities are deducted automatically
                  before applying the obligatory 2.5% rate.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: 5-Category Form Panels */}

                <div className="lg:col-span-7 flex flex-col space-y-6">
                  {/* Category A: Liquid Cash & Savings */}

                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center font-bold">
                        <span>A</span>
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Liquid Cash &amp; Bank Balances
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Immediate funds held in physical cash, current, and
                          savings accounts.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-cash-home"
                        >
                          Cash in Hand / Wallets ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-cash-home"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.cashHome}
                          onChange={event =>
                            updateField('cashHome', event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-cash-bank"
                        >
                          Checking &amp; Savings Deposits ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-cash-bank"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.cashBank}
                          onChange={event =>
                            updateField('cashBank', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category B: Gold, Silver & Precious Metals */}

                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                        <span>B</span>
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Gold, Silver &amp; Precious Bullion
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Market value of bullion, coins, and ornamental jewelry
                          above customary personal use.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-gold-value"
                        >
                          Gold Value ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-gold-value"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.goldVal}
                          onChange={event =>
                            updateField('goldVal', event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-silver-value"
                        >
                          Silver Value ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-silver-value"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.silverVal}
                          onChange={event =>
                            updateField('silverVal', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category C: Business Inventory & Stocks */}

                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center font-bold">
                        <span>C</span>
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Business Trade Assets &amp; Equity Stocks
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Net trade inventory value, wholesale stock, and
                          marketable stock equities.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-inventory"
                        >
                          Resale Inventory / Stock-in-Trade ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-inventory"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.inventory}
                          onChange={event =>
                            updateField('inventory', event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-stocks"
                        >
                          Shares, Mutual Funds &amp; Crypto ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-stocks"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.stocks}
                          onChange={event =>
                            updateField('stocks', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category D: Real Estate for Trade & Rental Income */}

                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center font-bold">
                        <span>D</span>
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Properties for Resale &amp; Accrued Rent
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Do not count your primary residence. Enter plots
                          bought for quick flipping or net collected rent.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-prop-resale"
                        >
                          Plot / Property Bought for Resale ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-prop-resale"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.propResale}
                          onChange={event =>
                            updateField('propResale', event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-rental-income"
                        >
                          Net Undistributed Rental Income ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-rental-income"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.rentalIncome}
                          onChange={event =>
                            updateField('rentalIncome', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category E: Liabilities & Immediate Debts */}

                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center font-bold">
                        <span>E</span>
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Short-term Liabilities (Deductions)
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Debts currently overdue, unpaid utility obligations,
                          and urgent personal borrowings.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-debts-due"
                        >
                          Debts Due Immediately ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-debts-due"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.debtsDue}
                          onChange={event =>
                            updateField('debtsDue', event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-label-md text-label-md text-on-surface mb-1"
                          htmlFor="step-bills-due"
                        >
                          Pending Business / Household Bills ($)
                        </label>
                        <input
                          className="calc-field w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none transition-colors"
                          id="step-bills-due"
                          min="0"
                          placeholder="0.00"
                          type="number"
                          value={fields.billsDue}
                          onChange={event =>
                            updateField('billsDue', event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Real-Time Summary & Checkout Card */}

                <div className="lg:col-span-5 sticky top-36">
                  <div className="bg-surface-clean rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <span className="font-label-md text-label-md uppercase tracking-wider text-text-muted">
                          Assessment Card
                        </span>
                        <h3 className="font-title-lg text-title-lg text-on-surface">
                          Zakat Status Summary
                        </h3>
                      </div>
                      <button
                        className="text-primary hover:text-oceanic-teal-deep font-label-md text-label-md flex items-center gap-1"
                        id="calc-reset-all"
                        onClick={resetFields}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          refresh
                        </span>
                        <span>Reset</span>
                      </button>
                    </div>

                    {/* Breakdown lines */}

                    <div className="space-y-3 font-body-sm text-body-sm">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Total Zakatable Assets (A+B+C+D):</span>
                        <span
                          className="font-bold text-on-surface"
                          id="summary-total-assets"
                        >
                          {formatMoney(assets)}
                        </span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Total Deductible Liabilities (E):</span>
                        <span
                          className="font-bold text-error"
                          id="summary-total-debts"
                        >
                          {'-' + formatMoney(debts)}
                        </span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant pt-2">
                        <span className="font-title-md text-title-md text-on-surface">
                          Net Wealth:
                        </span>
                        <span
                          className="font-title-md text-title-md text-primary font-bold"
                          id="summary-net-wealth"
                        >
                          {formatMoney(netWealth)}
                        </span>
                      </div>
                    </div>

                    {/* Nisab Qualifier Badge */}

                    <div className={nisabBoxClass} id="nisab-status-box">
                      <span className={nisabIconClass} id="nisab-icon">
                        {nisabIcon}
                      </span>
                      <div>
                        <p
                          className="font-title-md text-title-md text-on-surface"
                          id="nisab-status-text"
                        >
                          {nisabStatusText}
                        </p>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          Silver Nisab threshold: $581.75 USD
                        </p>
                      </div>
                    </div>

                    {/* Due Amount Callout */}

                    <div className="p-6 rounded-2xl bg-emerald-dark text-on-primary flex flex-col items-center justify-center text-center">
                      <span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed">
                        Your Net Obligation (2.5%)
                      </span>
                      <div
                        className="font-headline-xl text-headline-xl text-zakat-gold-light font-bold mt-2"
                        id="summary-zakat-due"
                      >
                        {formatMoney(zakatDue)}
                      </div>
                      <p className="font-label-sm text-label-sm text-on-primary/80 mt-1">
                        100% Ring-Fenced • Shariah Supervised
                      </p>
                    </div>

                    {/* Target Allocation Selector */}

                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface mb-1"
                        htmlFor="zakat-cause-allocation"
                      >
                        Direct My Zakat Towards:
                      </label>
                      <select
                        className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:bg-surface-clean focus:outline-none"
                        id="zakat-cause-allocation"
                      >
                        <option value="where-most-needed">
                          Where Most Needed (Crisis Priority)
                        </option>
                        <option value="project-alo">
                          Project Alo: Pediatric Surgery &amp; Eyes
                        </option>
                        <option value="gaza-emergency">
                          Gaza Urgent Nourishment &amp; Tents
                        </option>
                        <option value="widow-support">
                          Widows &amp; Destitute Mothers Care
                        </option>
                        <option value="clean-water">
                          Deep Wells for Asnaf Communities
                        </option>
                      </select>
                    </div>

                    {/* Primary Fulfillment Action */}

                    <button
                      className="w-full py-4 px-6 rounded-xl bg-secondary-container hover:bg-amber-vibrant text-on-surface font-title-md text-title-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      id="btn-fulfill-zakat"
                      onClick={fulfillZakat}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        payments
                      </span>
                      <span>Fulfill Zakat Now</span>
                    </button>

                    {/* Audit Guarantee Tagline */}

                    <div className="flex items-center justify-center gap-2 text-center text-text-muted font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span>
                        Tax-deductible receipt generated instantaneously
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Governance, Shariah Integrity & Ring-Fenced Stewardship */}

          <section
            className="w-full bg-surface-container-low py-16 lg:py-24"
            id="governance"
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Visual: Child Medical Care (Project Alo Case Study) */}

                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative bg-surface-clean rounded-3xl p-6 shadow-md">
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      <img
                        className="w-full h-72 object-cover object-center"
                        data-alt="Close up documentary photograph of a young Bengali boy with a soft sterile eye bandage sitting patiently in a clinic bed, wearing a modest patterned shirt, bathed in natural light, evoking vulnerable hope and pediatric healing under humanitarian medical care."
                        src="/images/child-portrait-documentary.jpg"
                      />
                      <div className="absolute bottom-3 left-3 bg-oceanic-teal-deep/90 text-on-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm backdrop-blur-md">
                        Verified Asnaf Case #BD-109
                      </div>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-on-surface">
                      Tamleek in Practice: Young Saifan's Journey
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                      Through the Tamleek protocol, medical equipment, hospital
                      stipends, and immediate eye surgery funds are handed
                      unconditionally to Saifan's widowed guardian, fulfilling
                      full Shariah ownership before surgical release.
                    </p>
                    <div className="mt-4 pt-4 flex items-center justify-between font-label-md text-label-md text-primary">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          verified
                        </span>{' '}
                        100% Medical Recovery
                      </span>
                      <span className="text-text-muted">
                        Zero admin cost deducted
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Governance Protocols */}

                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-6">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary bg-surface-subtle-mint px-3 py-1 rounded-full w-fit">
                    Strict Institutional Governance
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    How We Safeguard Your Sacred Obligation
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Zakat is not a voluntary gift; it is a divinely ordained
                    right belonging exclusively to the eight Qur'anic categories
                    (Surah At-Tawbah 9:60). Our rigorous governance framework
                    guarantees your obligation is fulfilled impeccably.
                  </p>
                  <div className="space-y-4">
                    {/* Pillar 1 */}

                    <div className="bg-surface-clean rounded-2xl p-5 shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px]">
                          lock
                        </span>
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface">
                          Ring-Fenced Bank Accounts
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Zakat donations enter an isolated trust account
                          separated from administrative budgets, Sadaqah Jariyah
                          funds, and gift endowments. No currency blending ever
                          occurs.
                        </p>
                      </div>
                    </div>

                    {/* Pillar 2 */}

                    <div className="bg-surface-clean rounded-2xl p-5 shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px]">
                          supervised_user_circle
                        </span>
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface">
                          Scholarly Shariah Board Oversight
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Every aid disbursement proposal is reviewed and signed
                          off by our resident council of certified Muftis,
                          confirming strict eligibility before cash or in-kind
                          assets are transferred.
                        </p>
                      </div>
                    </div>

                    {/* Pillar 3 */}

                    <div className="bg-surface-clean rounded-2xl p-5 shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-subtle-mint text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px]">
                          rule_folder
                        </span>
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface">
                          Independent Tier-1 Financial Audits
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Annual compliance evaluations performed by
                          international certified accounting firms confirming
                          100% pass-through ratio with zero administrative
                          attrition.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Common Zakat Questions & Downloadable Reports */}

          <section className="w-full bg-surface py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary bg-surface-subtle-mint px-3 py-1 rounded-full">
                  Knowledge Hub
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">
                  Frequently Asked Questions on Zakat
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Clear rulings based on standard consensus to help you
                  calculate and fulfill with peace of heart.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Accordion Q&A */}

                <div className="lg:col-span-8 space-y-4">
                  {/* Item 1 */}

                  <div
                    className="bg-surface-clean rounded-2xl shadow-sm p-5 cursor-pointer faq-item"
                    onClick={() => toggleFaq(0)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Should I use Gold or Silver Nisab for my calculations?
                      </h3>
                      <span className="material-symbols-outlined text-primary faq-icon">
                        {openFaqs[0] ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    <div
                      className={`faq-content mt-3 pt-3 text-on-surface-variant font-body-sm text-body-sm${
                        openFaqs[0] ? '' : ' hidden'
                      }`}
                    >
                      Classical scholars and majority contemporary fatwa
                      councils recommend using the <strong>Silver Nisab</strong>{' '}
                      for cash and liquid wealth. Because silver has a lower
                      dollar threshold, it allows more destitute families to
                      benefit from collective aid. Gold Nisab is commonly
                      utilized when assessing gold bullion directly.
                    </div>
                  </div>

                  {/* Item 2 */}

                  <div
                    className="bg-surface-clean rounded-2xl shadow-sm p-5 cursor-pointer faq-item"
                    onClick={() => toggleFaq(1)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        How do I calculate Zakat on pensions, 401(k), and
                        retirement funds?
                      </h3>
                      <span className="material-symbols-outlined text-primary faq-icon">
                        {openFaqs[1] ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    <div
                      className={`faq-content mt-3 pt-3 text-on-surface-variant font-body-sm text-body-sm${
                        openFaqs[1] ? '' : ' hidden'
                      }`}
                    >
                      If your retirement fund is inaccessible without heavy
                      early-withdrawal penalties, Zakat is only due upon the
                      actual accessible cash value or calculated on the
                      underlying zakatable assets (cash and trade equities,
                      roughly 25-40% of the total fund portfolio) after
                      subtracting estimated exit tax penalties.
                    </div>
                  </div>

                  {/* Item 3 */}

                  <div
                    className="bg-surface-clean rounded-2xl shadow-sm p-5 cursor-pointer faq-item"
                    onClick={() => toggleFaq(2)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Is Zakat due on personal jewelry worn regularly?
                      </h3>
                      <span className="material-symbols-outlined text-primary faq-icon">
                        {openFaqs[2] ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    <div
                      className={`faq-content mt-3 pt-3 text-on-surface-variant font-body-sm text-body-sm${
                        openFaqs[2] ? '' : ' hidden'
                      }`}
                    >
                      According to the Hanafi school of jurisprudence, Zakat is
                      due on all gold and silver regardless of whether it is
                      worn or stored. In the Shafi'i, Maliki, and Hanbali
                      schools, customary personal jewelry kept without intention
                      of asset storage is exempt. For precaution, many donors
                      choose to purify all precious metals.
                    </div>
                  </div>

                  {/* Item 4 */}

                  <div
                    className="bg-surface-clean rounded-2xl shadow-sm p-5 cursor-pointer faq-item"
                    onClick={() => toggleFaq(3)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Can Zakat be paid in advance for emergency crises like
                        Gaza?
                      </h3>
                      <span className="material-symbols-outlined text-primary faq-icon">
                        {openFaqs[3] ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    <div
                      className={`faq-content mt-3 pt-3 text-on-surface-variant font-body-sm text-body-sm${
                        openFaqs[3] ? '' : ' hidden'
                      }`}
                    >
                      Yes, it is permissible and highly encouraged according to
                      authentic prophetic narrations to prepay Zakat one or two
                      years ahead to alleviate acute disasters, famine, and
                      medical crises facing vulnerable communities.
                    </div>
                  </div>
                </div>

                {/* Download Reports Box */}

                <div className="lg:col-span-4 flex flex-col space-y-4">
                  <div className="bg-surface-subtle-mint rounded-2xl p-6 shadow-sm flex flex-col space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">
                          description
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-on-surface">
                        Official Governance Dispatches
                      </h4>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Download our signed Shariah Board rulings, financial
                      distribution ledgers, and independent audit statements for
                      complete donor confidence.
                    </p>
                    <div className="space-y-2 pt-2">
                      <Link
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-clean text-on-surface hover:text-primary transition-colors text-body-sm font-body-sm shadow-sm"
                        href="/about#governance"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            verified
                          </span>
                          <span>2024 Shariah Compliance Fatwa</span>
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </Link>
                      <Link
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-clean text-on-surface hover:text-primary transition-colors text-body-sm font-body-sm shadow-sm"
                        href="/about#governance"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            policy
                          </span>
                          <span>100% Zakat Policy Ledger (PDF)</span>
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </Link>
                      <Link
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-clean text-on-surface hover:text-primary transition-colors text-body-sm font-body-sm shadow-sm"
                        href="/about#governance"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            analytics
                          </span>
                          <span>Independent Audit Statement</span>
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-surface-clean rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-3">
                    <span className="material-symbols-outlined text-amber-vibrant text-[32px]">
                      support_agent
                    </span>
                    <h5 className="font-title-md text-title-md text-on-surface">
                      Need Scholarly Consultation?
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Our Shariah research team is available to assist with
                      complex asset holdings, commercial equity, or family
                      trusts.
                    </p>
                    <a
                      className="text-primary font-title-md text-title-md hover:underline font-bold"
                      href="mailto:shariah@gmcf-global.org"
                    >
                      shariah@gmcf-global.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
