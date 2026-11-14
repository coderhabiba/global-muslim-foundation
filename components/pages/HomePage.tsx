'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { useSiteSettings } from '@/lib/site-settings';
import { useSiteCMS } from '@/lib/site-cms';
import { useDynamicCards } from '@/lib/dynamic-cards';
import { useModalState } from '@/lib/modal-context';
import { getProjectAmounts } from '@/components/payment/EpsPaymentModal';
import { DynamicLiveCounter } from '@/components/system/DynamicLiveCounter';

// ── EPS Callback Handler (needs Suspense wrapper for useSearchParams) ─────────
function EpsCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showAlert, openPaymentModal } = useModalState();
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  useEffect(() => {
    const paymentResult = searchParams.get('payment');
    const txId = searchParams.get('txId');
    if (!paymentResult) return;

    // Clean URL so refresh doesn't re-trigger
    router.replace('/', { scroll: false });

    if (paymentResult === 'success') {
      showAlert({
        type: 'success',
        title: isBn ? 'জাযাকাল্লাহু খাইরান! অনুদান সম্পন্ন হয়েছে ✓' : 'Payment Successful — Jazakallahu Khairan! ✓',
        message: isBn
          ? `আপনার মহৎ অনুদান সফলভাবে গৃহীত হয়েছে।${txId ? ` ট্রানজেকশন আইডি: ${txId}` : ''} আল্লাহ আপনার দানকে কবুল করুন।`
          : `Your generous donation has been successfully received via EPS.${txId ? ` Transaction ID: ${txId}` : ''} May Allah accept your giving.`,
        confirmText: isBn ? 'আলহামদুলিল্লাহ' : 'Alhamdulillah',
      });
    } else if (paymentResult === 'fail') {
      showAlert({
        type: 'error',
        title: isBn ? 'পেমেন্ট সম্পন্ন হয়নি' : 'Payment Unsuccessful',
        message: isBn
          ? 'দুঃখিত, পেমেন্ট প্রক্রিয়া সম্পন্ন হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Sorry, your payment could not be processed. Please try again.',
        confirmText: isBn ? 'আবার চেষ্টা করুন' : 'Try Again',
        onConfirm: () => openPaymentModal(),
      });
    } else if (paymentResult === 'cancel') {
      showAlert({
        type: 'info',
        title: isBn ? 'পেমেন্ট বাতিল করা হয়েছে' : 'Payment Cancelled',
        message: isBn
          ? 'আপনি পেমেন্ট প্রক্রিয়া বাতিল করেছেন। যেকোনো সময় আবার অনুদান দিতে পারবেন।'
          : 'You cancelled the payment. You can donate again anytime.',
        confirmText: isBn ? 'ঠিক আছে' : 'OK',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // renders nothing — side-effect only
}
// ─────────────────────────────────────────────────────────────────────────────

const GIFT_AMOUNTS = [
  { value: '25', label: '$25', bordered: true, span: false },
  { value: '50', label: '$50', bordered: false, span: false },
  { value: '100', label: '$100', bordered: true, span: false },
  { value: '250', label: '$250', bordered: true, span: false },
  { value: 'custom', label: 'Custom Amount', bordered: true, span: true },
] as const;

const NISAB_THRESHOLD_USD = 520;

export default function HomePage() {
  const { localize, currency, language } = useSiteSettings();
  const { openPaymentModal, openLicenseModal, showAlert } = useModalState();
  const { cms } = useSiteCMS();
  const { campaigns } = useDynamicCards();
  const isBn = language === 'bn';
  const [campaignTab, setCampaignTab] = useState<'all' | 'food' | 'healthcare' | 'water'>('all');

  const filteredCampaigns = useMemo(() => {
    if (campaignTab === 'all') return campaigns;
    if (campaignTab === 'food') {
      return campaigns.filter(c => 
        (c.categoryEn && c.categoryEn.toLowerCase().includes('food')) || 
        (c.categoryBn && c.categoryBn.includes('খাদ্য'))
      );
    }
    if (campaignTab === 'healthcare') {
      return campaigns.filter(c => 
        (c.categoryEn && (c.categoryEn.toLowerCase().includes('health') || c.categoryEn.toLowerCase().includes('medical') || c.categoryEn.toLowerCase().includes('pediatric') || c.categoryEn.toLowerCase().includes('eye'))) || 
        (c.categoryBn && (c.categoryBn.includes('চিকিৎসা') || c.categoryBn.includes('স্বাস্থ্য') || c.categoryBn.includes('অস্ত্রোপচার')))
      );
    }
    if (campaignTab === 'water') {
      return campaigns.filter(c => 
        (c.categoryEn && c.categoryEn.toLowerCase().includes('water')) || 
        (c.categoryBn && c.categoryBn.includes('পানি'))
      );
    }
    return campaigns;
  }, [campaigns, campaignTab]);

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

  const currencySymbol = currency === 'BDT' ? '৳' : '$';
  const nisabThreshold = currency === 'BDT' ? 95000 : NISAB_THRESHOLD_USD;

  const { netWealth, zakatDue } = useMemo(() => {
    const toAmount = (value: string) => parseFloat(value) || 0;
    const totalAssets =
      toAmount(zakatFields.gold) +
      toAmount(zakatFields.cash) +
      toAmount(zakatFields.biz);
    const net = Math.max(0, totalAssets - toAmount(zakatFields.debt));
    const due =
      net >= nisabThreshold ? Math.round(net * 0.025 * 100) / 100 : 0;

    return { netWealth: net, zakatDue: due };
  }, [zakatFields, nisabThreshold]);

  function formatMoney(value: number) {
    if (currency === 'BDT') {
      return `৳${Math.round(value).toLocaleString('en-US')}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      openPaymentModal({
        amount: Math.round(zakatDue),
        currency,
        cause: isBn ? 'যাকাত তহবিল (Zakat Fund)' : 'General Zakat Fund',
      });
      return;
    }

    if (netWealth > 0 && netWealth < nisabThreshold) {
      showAlert({
        title: isBn ? 'নিসাব সীমা বিজ্ঞপ্তি' : 'Nisab Threshold Notice',
        message: isBn
          ? `আপনার হিসাবকৃত মোট সম্পদ (${formatMoney(netWealth)}) বর্তমান রৌপ্য নিসাব সীমার (${currency === 'BDT' ? '৳৯৫,০০০' : '$520'}) নিচে রয়েছে, তাই আপনার ওপর যাকাত আবশ্যক নয়। তবে আপনি সাধারণ সদকা হিসেবে যেকোনো পরিমাণ অনুদান প্রদান করতে পারেন।`
          : `Your net wealth (${formatMoney(netWealth)}) is below the Nisab threshold (${currency === 'BDT' ? '৳95,000' : '$520 USD'}). Zakat is not obligatory, but voluntary Sadaqah is always welcomed.`,
        type: 'info',
        confirmText: isBn ? 'সদকা প্রদান করুন' : 'Donate as Sadaqah',
        onConfirm: () =>
          openPaymentModal({
            amount: currency === 'BDT' ? 1000 : 25,
            currency,
            cause: isBn ? 'সাধারণ সদকা তহবিল' : 'General Sadaqah Fund',
          }),
      });
      return;
    }

    showAlert({
      title: isBn ? 'যাকাত হিসাব' : 'Zakat Calculator',
      message: isBn
        ? 'অনুগ্রহ করে আপনার সম্পদের পরিমাণ ইনপুট দিন।'
        : 'Please enter your asset amounts to calculate your Zakat.',
      type: 'warning',
    });
  }

  return (
    <>
      {/* EPS payment callback handler — zero DOM output, Suspense required for useSearchParams */}
      <Suspense fallback={null}>
        <EpsCallbackHandler />
      </Suspense>

      <main suppressHydrationWarning className="w-full bg-surface-subtle-mint pt-[64px] sm:pt-[80px]">
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
                    {isBn ? cms.home.heroBadge : 'Trusted Global Humanitarian Relief & Shariah Stewardship'}
                  </span>
                </div>
                <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[54px] font-bold text-on-surface tracking-tight leading-[1.15]">
                  {isBn ? (
                    (() => {
                      const highlightPhrase = 'সহানুভূতি ও দায়িত্বশীলতা';
                      const title = (cms.home.heroTitle || 'মানবতার সেবায় নিবেদিত বিশ্বস্ত হাত').trim();

                      if (title.includes(highlightPhrase)) {
                        const parts = title.split(highlightPhrase);
                        return (
                          <>
                            {parts[0]}
                            <span className="text-primary italic underline decoration-gold-warm decoration-[3px] sm:decoration-4 underline-offset-[3px] sm:underline-offset-4 inline">
                              {highlightPhrase}
                            </span>
                            {parts.slice(1).join(highlightPhrase)}
                          </>
                        );
                      }

                      return (
                        <>
                          {title} —{' '}
                          <span className="text-primary italic underline decoration-gold-warm decoration-[3px] sm:decoration-4 underline-offset-[3px] sm:underline-offset-4 inline">
                            {highlightPhrase}
                          </span>
                        </>
                      );
                    })()
                  ) : (
                    <>
                      Empowering Lives Through Faith,{' '}
                      <span className="text-primary italic underline decoration-gold-warm decoration-4 underline-offset-8">
                        Compassion &amp; Stewardship
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  {isBn ? (
                    cms.home.heroSubtitle ||
                    'জরুরি খাদ্য সহায়তা, শিশুদের অস্ত্রোপচার সেবা এবং টেকসই যাকাতভিত্তিক ক্ষমতায়ন কর্মসূচির মাধ্যমে বাংলাদেশ ও তার বাইরের অসহায় জনগোষ্ঠীর জীবন বদলে দেওয়া।'
                  ) : (
                    <>
                      <strong>One Meal One Hope</strong> — Transforming vulnerable
                      communities across Bangladesh and beyond with emergency
                      nourishment, pediatric surgical care, and sustainable Zakat
                      empowerment programs.
                    </>
                  )}
                </p>

                {/* Metric Value Badges (3 Dynamic Cards - Screenshot 1 Style) */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-xs flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        restaurant
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-zinc-950 font-mono tracking-tight leading-none mb-1">
                        <DynamicLiveCounter
                          value={cms.home.heroBadge1Value}
                          defaultValue={isBn ? '০' : '0'}
                          fluctuateRange={[-3, 5]}
                          showLiveDot={false}
                        />
                      </p>
                      <p className="text-xs text-zinc-500 font-medium leading-tight truncate">
                        {isBn ? (cms.home.heroBadge1Label || 'পুষ্টিকর খাবার পরিবেশন') : 'Nutritious Meals Served'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-xs flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        medical_services
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-zinc-950 font-mono tracking-tight leading-none mb-1">
                        <DynamicLiveCounter
                          value={cms.home.heroBadge2Value}
                          defaultValue={isBn ? '০' : '0'}
                          fluctuateRange={[-2, 4]}
                          showLiveDot={false}
                        />
                      </p>
                      <p className="text-xs text-zinc-500 font-medium leading-tight truncate">
                        {isBn ? (cms.home.heroBadge2Label || 'শিশু অস্ত্রোপচার ও সেবা') : 'Pediatric Surgery & Care'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-clean rounded-2xl p-4 border border-border-subtle shadow-xs flex items-center gap-3.5 hover:border-amber-300 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        balance
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-zinc-950 font-mono tracking-tight leading-none mb-1">
                        <DynamicLiveCounter
                          value={cms.home.heroBadge3Value}
                          defaultValue="100%"
                          fluctuateRange={[0, 0]}
                        />
                      </p>
                      <p className="text-xs text-zinc-500 font-medium leading-tight truncate">
                        {isBn ? (cms.home.heroBadge3Label || 'শরিয়াহ যাকাত নীতি') : 'Shariah Zakat Policy'}
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
                        cause: isBn ? 'সাধারণ মানবিক ও জরুরি ত্রাণ তহবিল' : 'General Humanitarian & Relief Fund',
                      })
                    }
                    className="w-full sm:w-[260px] h-[52px] rounded-xl bg-secondary-container hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px] text-amber-900">
                      volunteer_activism
                    </span>
                    <span>{isBn ? (cms.home.heroPrimaryBtn || 'অনলাইন অনুদান দিন') : 'Make an Immediate Donation'}</span>
                  </button>
                  <Link
                    className="w-full sm:w-[260px] h-[52px] rounded-xl bg-surface-clean hover:bg-surface-subtle-mint text-primary font-bold text-sm border border-primary/20 shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 text-center"
                    href="/impact"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      explore
                    </span>
                    <span>{isBn ? (cms.home.heroSecondaryBtn || 'আমাদের কার্যক্রম দেখুন') : 'View Active Appeals & Impact'}</span>
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
                    <div className="flex items-center justify-between mb-1">
                      <label
                        className="text-xs font-bold text-on-surface-variant uppercase tracking-wider"
                        htmlFor="cause-select"
                      >
                        {isBn ? 'মানবিক প্রকল্প / খাত নির্বাচন করুন' : 'Select Designated Fund'}
                      </label>
                      <Link href="/impact" className="text-[11px] text-emerald-800 hover:underline font-bold flex items-center gap-0.5">
                        <span>{isBn ? 'প্রজেক্ট বিস্তারিত' : 'Project Details'}</span>
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      </Link>
                    </div>
                    <div className="relative">
                      <select
                        className="w-full bg-surface-subtle-mint/80 border border-primary/20 text-on-surface font-semibold text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                        id="cause-select"
                        value={fund}
                        onChange={event => {
                          const newFund = event.target.value;
                          setFund(newFund);
                          const matchedCampaign = campaigns.find(c => c.id === newFund);
                          const targetTitle = matchedCampaign ? (isBn ? matchedCampaign.titleBn : matchedCampaign.titleEn) : 'General Relief';
                          const amtConfig = getProjectAmounts(targetTitle, 'USD');
                          setCustomAmount(String(amtConfig.defaultAmt));
                          setAmountChoice(String(amtConfig.defaultAmt));
                        }}
                      >
                        <option value="general">
                          {isBn ? '১. সাধারণ মানবিক ও জরুরি ত্রাণ তহবিল (100% Policy)' : 'General Humanitarian Relief Fund'}
                        </option>
                        {campaigns.map((c, i) => (
                          <option key={c.id} value={c.id}>
                            {i + 2}. {isBn ? c.titleBn : c.titleEn}
                          </option>
                        ))}
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
                        const selectedCampaign = campaigns.find(c => c.id === fund);
                        const targetCause = selectedCampaign
                          ? (isBn ? selectedCampaign.titleBn : selectedCampaign.titleEn)
                          : (isBn ? 'সাধারণ মানবিক ও জরুরি ত্রাণ তহবিল' : 'General Humanitarian Relief Fund');

                        openPaymentModal({
                          amount: currency === 'BDT' ? parsedAmt * 122 : parsedAmt,
                          currency: currency,
                          cause: targetCause,
                          donorName: donorName,
                          donorPhone: donorContact,
                        });
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        volunteer_activism
                      </span>
                      <span>
                        {isBn ? 'নিরাপদ অনুদান দিন' : 'Give Securely'}
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
                      <span className="underline">
                        {isBn
                          ? 'Govt Reg #S-14086/2023 (সনদ দেখুন)'
                          : 'Govt Reg #S-14086/2023 (View Permit)'}
                      </span>
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

        {/* Dynamic Impact Banner - 4 Pillars (Screenshot 2 Style) */}

        <section className="w-full bg-[#044E42] text-on-primary py-6 sm:py-8 shadow-inner">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/10 text-center">
              <div className="px-3 sm:px-4">
                <div className="font-serif-heading text-3xl sm:text-4xl lg:text-[42px] text-[#E5A93C] font-black tracking-tight font-mono leading-none">
                  <DynamicLiveCounter
                    value={cms.home.bannerStat1Value}
                    defaultValue={isBn ? '০' : '0'}
                    fluctuateRange={[-3, 6]}
                    showLiveDot={false}
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                  {isBn ? (cms.home.bannerStat1Title || 'খাবার বিতরণ') : 'Meal Distribution'}
                </p>
                <span className="text-xs sm:text-[13px] text-emerald-200/80 block mt-0.5 leading-normal">
                  {isBn ? (cms.home.bannerStat1Desc || 'রেললাইন ও শহরের বস্তি') : 'Railways & Urban Slums'}
                </span>
              </div>

              <div className="px-3 sm:px-4">
                <div className="font-serif-heading text-3xl sm:text-4xl lg:text-[42px] text-[#E5A93C] font-black tracking-tight font-mono leading-none">
                  <DynamicLiveCounter
                    value={cms.home.bannerStat2Value}
                    defaultValue={isBn ? '০' : '0'}
                    fluctuateRange={[-2, 4]}
                    showLiveDot={false}
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                  {isBn ? (cms.home.bannerStat2Title || 'শিশুদের চিকিৎসা') : 'Child Medical Treatment'}
                </p>
                <span className="text-xs sm:text-[13px] text-emerald-200/80 block mt-0.5 leading-normal">
                  {isBn ? (cms.home.bannerStat2Desc || 'শিশু অস্ত্রোপচার ও ওষুধ') : 'Pediatric Surgery & Medicine'}
                </span>
              </div>

              <div className="px-3 sm:px-4">
                <div className="font-serif-heading text-3xl sm:text-4xl lg:text-[42px] text-[#E5A93C] font-black tracking-tight font-mono leading-none">
                  <DynamicLiveCounter
                    value={cms.home.bannerStat3Value}
                    defaultValue={isBn ? '০' : '0'}
                    fluctuateRange={[-1, 3]}
                    showLiveDot={false}
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                  {isBn ? (cms.home.bannerStat3Title || 'বিশুদ্ধ পানির নলকূপ ও টয়লেট') : 'Clean Water Wells & Sanitation'}
                </p>
                <span className="text-xs sm:text-[13px] text-emerald-200/80 block mt-0.5 leading-normal">
                  {isBn ? (cms.home.bannerStat3Desc || 'গভীর ভূগর্ভস্থ পানি ও স্বাস্থ্যবিধি কেন্দ্র') : 'Deep Groundwater & Hygiene Centers'}
                </span>
              </div>

              <div className="px-3 sm:px-4">
                <div className="font-serif-heading text-3xl sm:text-4xl lg:text-[42px] text-[#E5A93C] font-black tracking-tight font-mono leading-none">
                  <DynamicLiveCounter
                    value={cms.home.bannerStat4Value}
                    defaultValue="100%"
                    fluctuateRange={[0, 0]}
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                  {isBn ? (cms.home.bannerStat4Title || 'শরিয়াহ বোর্ড কর্তৃক যাচাইকৃত') : 'Verified by Shariah Board'}
                </p>
                <span className="text-xs sm:text-[13px] text-emerald-200/80 block mt-0.5 leading-normal">
                  {isBn ? (cms.home.bannerStat4Desc || 'যাকাত থেকে শূন্য ওভারহেড কাটা হয়') : 'Zero overhead deducted from Zakat'}
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
                  {isBn ? 'জরুরি মানবিক আবেদন' : 'Emergency Humanitarian Appeals'}
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface mt-1.5">
                  {isBn ? (cms.home.appealTitle || 'চলমান জরুরি মানবিক আবেদনসমূহ') : (cms.home.appealTitle || 'Active Appeals & Dedicated Funds')}
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1.5">
                  {isBn ? (cms.home.appealSubtitle || 'তাত্ক্ষণিক ত্রাণ ও স্থায়ী পুনর্বাসনে আপনার হাত বাড়িয়ে দিন।') : (cms.home.appealSubtitle || 'Your charitable donation provides life-saving sustenance, emergency surgeries, clean drinking water, and winter protection.')}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCampaignTab('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    campaignTab === 'all'
                      ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                      : 'bg-surface-subtle-mint text-primary hover:bg-surface-clean border border-primary/20'
                  }`}
                >
                  {isBn ? 'সকল কার্যক্রম' : 'All Campaigns'}
                </button>
                <button
                  type="button"
                  onClick={() => setCampaignTab('food')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    campaignTab === 'food'
                      ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                      : 'bg-surface-subtle-mint text-primary hover:bg-surface-clean border border-primary/20'
                  }`}
                >
                  {isBn ? 'খাদ্য সহায়তা' : 'Food Relief'}
                </button>
                <button
                  type="button"
                  onClick={() => setCampaignTab('healthcare')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    campaignTab === 'healthcare'
                      ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                      : 'bg-surface-subtle-mint text-primary hover:bg-surface-clean border border-primary/20'
                  }`}
                >
                  {isBn ? 'চিকিৎসাসেবা' : 'Healthcare'}
                </button>
              </div>
            </div>

            {/* Projects Cards Bento Grid (Dynamic campaigns from Card Context) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCampaigns.length === 0 ? (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
                  <p className="text-sm font-semibold text-slate-600">
                    {isBn ? 'এই ক্যাটাগরিতে বর্তমানে কোনো ক্যাম্পেইন পাওয়া যায়নি।' : 'No campaigns currently found in this category.'}
                  </p>
                </div>
              ) : (
                filteredCampaigns.map((camp, idx) => {
                const percentage = Math.min(100, Math.round((camp.raisedBDT / (camp.goalBDT || 1)) * 100));
                const projNum = (idx + 1).toString().padStart(2, "0");
                const title = isBn ? camp.titleBn : camp.titleEn;
                const desc = isBn ? camp.descriptionBn : camp.descriptionEn;
                const category = isBn ? camp.categoryBn : camp.categoryEn;

                return (
                  <div
                    key={camp.id}
                    className="bg-surface-clean rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl transition-all flex flex-col group"
                  >
                    <div className="relative">
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        <img
                          alt={title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          src={camp.image || "/images/one-meal-one-hope.jpg"}
                        />
                        <div className="absolute top-3 left-3 bg-[#0e4d36] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          {category}
                        </div>
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {isBn ? "যাকাত উপযুক্ত" : "Zakat Eligible"}
                        </div>
                      </div>

                      {/* Bottom Divider Bar & Circular Emblem */}
                      <div className="relative w-full h-0">
                        <div className="absolute left-0 right-[72px] top-0 h-[1px] bg-[#144d46] z-10" />
                        <div className="absolute -top-[16px] right-0 w-[18px] h-[18px] pointer-events-none z-10 overflow-hidden">
                          <svg viewBox="0 0 18 18" className="w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 16 Q 8 16 18 0 L 18 18 L 0 18 Z" fill="#ffffff" />
                            <path d="M 0 16 Q 8 16 18 0" fill="none" stroke="#144d46" strokeWidth="1" />
                          </svg>
                        </div>
                        <div className="absolute -top-[27px] right-[18px] w-[54px] h-[54px] rounded-full bg-white p-[3px] shadow-[0_4px_12px_rgba(0,0,0,0.18)] z-20 flex items-center justify-center border border-slate-100">
                          <img src="/images/gmcf-logo-emblem.png" alt="GMCF Badge" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-4 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 pr-14">
                          <span className="text-xs font-black text-[#0e4d36] tracking-wider uppercase">
                            {isBn ? "প্রজেক্ট নং : " + projNum : "Project No : " + projNum}
                          </span>
                        </div>
                        <Link href="/impact" className="block hover:underline">
                          <h3 className="font-serif-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                          {desc}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-primary">
                            {isBn ? "সংগৃহীত: ৳" + camp.raisedBDT.toLocaleString() : "Raised: ৳" + camp.raisedBDT.toLocaleString()}
                          </span>
                          <span className="text-text-muted">
                            {isBn ? "লক্ষ্য: ৳" + camp.goalBDT.toLocaleString() : "Goal: ৳" + camp.goalBDT.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-surface-subtle-mint rounded-full overflow-hidden">
                          <div className="h-full bg-[#0e4d36] rounded-full" style={{ width: percentage + "%" }}></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-amber-500">group</span>
                            {isBn ? camp.donorsCount + " জন দাতা" : camp.donorsCount + " Donors"}
                          </span>
                          <span className="font-bold text-primary">{percentage}%</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openPaymentModal({ amount: isBn ? 1000 : 25, cause: title })}
                        className="w-full py-2.5 rounded-xl bg-surface-subtle-mint hover:bg-[#0e4d36] text-[#0e4d36] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                        <span>{isBn ? "আপিলে দান করুন" : "View Appeal & Sponsor"}</span>
                      </button>
                    </div>
                  </div>
                );
              }))}
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
                {cms.home.storySectionBadge || (isBn ? 'মাঠপর্যায়ের বাস্তব রূপান্তরের গল্প' : 'Documented Field Impact')}
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface mt-1.5">
                {cms.home.storySectionTitle || (isBn ? 'বাস্তব জীবন রূপান্তর: মা ও সন্তানের পুনর্মিলন' : 'Real Life Transformations: A Mother & Child Reunited')}
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                {cms.home.storySectionSubtitle || (isBn ? 'আপনার প্রতিটি অনুদান শুধু একটি পরিসংখ্যান নয়—এটি জীবন বাঁচায়, হারিয়ে যাওয়া শিশুদের ঘরে ফেরায়।' : 'Every donation is more than a metric—it saves lives, rescues lost children, and restores hope to families.')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Story 1: Badshah Reconnection (7 Cols) */}

              <div className="lg:col-span-7 bg-surface-clean rounded-3xl overflow-hidden border border-border-subtle shadow-md flex flex-col justify-between">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    alt="Lost child Badshah reunited with mother by foundation"
                    className="w-full h-full object-cover"
                    src={cms.home.story1Image || '/images/badshah-reunion.jpg'}
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-dark/95 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur shadow">
                    {cms.home.story1Tag || (isBn ? 'পারিবারিক পুনর্মিলন ও শিশু কল্যাণ' : 'Family Reconnection & Child Welfare')}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span className="">{cms.home.story1Location || (isBn ? 'তেজগাঁও কমিউনিটি সেন্টার • প্রশাসন কর্তৃক যাচাইকৃত' : 'Tejgaon Community Center • Verified by Local Authorities')}</span>
                    </div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-on-surface">
                      {cms.home.story1Title || (isBn ? '"বাদশাহকে তার মায়ের পরম স্নেহে ফিরিয়ে আনা" — সহানুভূতির এক বাস্তব অলৌকিক ঘটনা' : '"Bringing Badshah Back to His Mother\'s Embrace" — A Miracle of Compassion')}
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                      {cms.home.story1Desc || (isBn ? 'রেলওয়ে টার্মিনালের কাছে অসহায় অবস্থায় ঘুরে বেড়ানো ৮ বছর বয়সী বাদশাহকে আমাদের টিম পরম যত্নে উদ্ধার করে। ২১ দিনের নিবিড় তদন্তের পর তাকে মায়ের কোলে ফিরিয়ে দেওয়া হয়।' : 'Found wandering and distressed near the railway terminals, 8-year-old Badshah was taken into protective custody and reunited with his mother.')}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border-subtle mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        GMC
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-on-surface">
                          {isBn ? 'শিশু সুরক্ষা ও কল্যাণ বিভাগ' : 'Child Protection & Welfare Division'}
                        </p>
                        <p className="text-xs text-text-muted">
                          Global Muslim Charitable Foundation
                        </p>
                      </div>
                    </div>
                    <span className="text-primary font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer hover:underline">
                      {isBn ? 'সম্পূর্ণ কেস স্টাডি দেখুন →' : 'Read Case Study →'}
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
                      src={cms.home.story2Image || '/images/pediatric-hope-saifan.jpg'}
                    />
                    <span className="absolute top-2.5 right-2.5 bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {isBn ? 'পেডিয়াট্রিক সার্জারি' : 'Pediatric Hope'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-on-surface">
                      {cms.home.story2Title || (isBn ? 'সাইফানের সুস্থতা ও নতুন জীবনের যাত্রা' : "Saifan's Journey to Health & Recovery")}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      {cms.home.story2Desc || (isBn ? 'চরম দারিদ্র্যের মাঝে মারাত্মক স্বাস্থ্যঝুঁকিতে থাকা শিশু সাইফানকে দেওয়া হয়েছে জরুরি পেডিয়াট্রিক সার্জারি ও পুষ্টি সেবা।' : 'Born with critical medical distress into extreme poverty, Saifan received fully sponsored pediatric surgery.')}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted font-medium">
                      {isBn ? '১০০% অনুদানে চিকিৎসা সম্পন্ন' : '100% Sponsored Care'}
                    </span>
                    <span className="text-primary font-bold">
                      {isBn ? 'মেডিকেল রেকর্ড দেখুন →' : 'View Medical Records →'}
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

        <section className="w-full py-14 sm:py-16 bg-[#f8faf9]" id="quick-calculator">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-br from-[#044E42] via-[#065A4F] to-[#022c22] rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Zakat Mandate & Policy (5 Cols) */}

                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-400/30">
                    <span className="material-symbols-outlined text-[16px]">
                      balance
                    </span>
                    <span>
                      {isBn
                        ? '১০০% শরীয়াহ সম্মত ও স্বাধীন পর্যবেক্ষণ'
                        : '100% Shariah Compliant & Independent Oversight'}
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl text-white font-bold leading-tight">
                    {isBn ? (
                      <>
                        হিসাব করুন আপনার পবিত্র যাকাত —{' '}
                        <span className="text-amber-400 italic">
                          পূর্ণ স্বচ্ছতা ও নির্ভুলতায়
                        </span>
                      </>
                    ) : (
                      <>
                        Calculate Your Zakat with{' '}
                        <span className="text-amber-400 italic">
                          100% Precision &amp; Confidence
                        </span>
                      </>
                    )}
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                    {isBn
                      ? 'ইসলামী শরীয়াহ বিধি মোতাবেক আপনার যাকাত সম্পূর্ণ আলাদা সুরক্ষিত তহবিলে জমা রাখা হয়। কোনো রকম প্রশাসনিক বা পরিচালন ব্যয় কর্তন ছাড়া শতভাগ অর্থ সরাসরি উপযুক্ত দরিদ্রদের মাঝে বিতরণ করা হয়।'
                      : 'In strict compliance with Islamic jurisprudence, your Zakat is segregated into an exclusive treasury. Not a single cent is deducted for admin or overhead expenses—guaranteeing your obligation directly lifts the poorest.'}
                  </p>
                  <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                      <span className="text-white/95">
                        {isBn
                          ? 'যোগ্য শরীয়াহ উপদেষ্টা কাউন্সিলের প্রত্যক্ষ তত্ত্বাবধান'
                          : 'Direct supervision by Certified Shariah Advisory Council'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                      <span className="text-white/95">
                        {isBn
                          ? 'বাৎসরিক চার্টার্ড একাউন্ট্যান্টস অডিট রিপোর্ট প্রকাশ'
                          : 'Independently audited yearly accounting reports published'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                      <span className="text-white/95">
                        {isBn
                          ? 'শতভাগ সরাসরি তামলিক (হকদারকে মালিকানা প্রদান)'
                          : '100% Direct Tamleek to vetted eligible beneficiaries'}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Link
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all shadow-md"
                      href="/zakat-calculator"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        verified_user
                      </span>
                      <span>
                        {isBn ? 'বিস্তারিত যাকাত নির্দেশিকা ও পলিসি' : 'Review Our Zakat Policy'}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Interactive Zakat Calculator Card (7 Cols) */}

                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                    <div>
                      <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-slate-900">
                        {isBn ? 'সহজ যাকাত ক্যালকুলেটর' : 'Zakat Calculator'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isBn
                          ? 'বর্তমান নিসাব সীমার ভিত্তিতে তাৎক্ষণিক হিসাব (২.৫%)'
                          : 'Instant calculation based on current Nisab threshold (2.5%)'}
                      </p>
                    </div>
                    <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-full border border-emerald-300 w-fit shrink-0">
                      {isBn
                        ? (currency === 'BDT' ? 'রৌপ্য নিসাব: ৳৯৫,০০০' : 'সিলভার নিসাব: $520 USD')
                        : (currency === 'BDT' ? 'Silver Nisab: ৳95,000' : 'Silver Nisab: $520 USD')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {isBn ? `নগদ টাকা ও ব্যাংক ব্যালেন্স (${currencySymbol})` : `Cash in Hand & Bank Accounts (${currencySymbol})`}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                          {currencySymbol}
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
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
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {isBn ? `স্বর্ণ ও রূপার বাজারমূল্য (${currencySymbol})` : `Gold & Silver Value (${currencySymbol})`}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                          {currencySymbol}
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
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
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {isBn ? `ব্যবসায়িক পণ্য ও বিনিয়োগ (${currencySymbol})` : `Business Merchandise & Stocks (${currencySymbol})`}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                          {currencySymbol}
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
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
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {isBn ? `বাদ: তাৎক্ষণিক দেনা ও ঋণ (${currencySymbol})` : `Deduct: Immediate Liabilities & Debts (${currencySymbol})`}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                          {currencySymbol}
                        </span>
                        <input
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
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

                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">
                        {isBn ? 'যাকাতযোগ্য মোট সম্পদ' : 'Net Zakat-Eligible Wealth'}
                      </span>
                      <span
                        className="text-lg font-bold text-slate-900"
                        id="calc-net-assets"
                      >
                        {formatMoney(netWealth)}
                      </span>
                    </div>
                    <div className="text-center sm:text-right">
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">
                        {isBn ? 'আপনার প্রদেয় যাকাত (২.৫%)' : 'Your Zakat Due (2.5%)'}
                      </span>
                      <span
                        className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#0e4d36]"
                        id="calc-zakat-due"
                      >
                        {formatMoney(zakatDue)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      className="flex-grow py-3 rounded-xl bg-[#0e4d36] hover:bg-emerald-950 text-white font-bold text-sm transition-all shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
                      id="calc-apply-btn"
                      type="button"
                      onClick={payZakatNow}
                    >
                      <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                      <span>{isBn ? 'এখনই এই যাকাত প্রদান করুন' : 'Pay This Zakat Now'}</span>
                    </button>
                    <button
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-all cursor-pointer"
                      id="calc-reset-btn"
                      type="button"
                      onClick={resetZakatFields}
                    >
                      {isBn ? 'রিসেট' : 'Reset Form'}
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
                      <DynamicLiveCounter
                        value={cms.home.volunteerCount || cms.volunteer?.stat1Value}
                        defaultValue={isBn ? '০' : '0'}
                        fluctuateRange={[-2, 4]}
                      />
                      {' '}{isBn ? (cms.home.volunteerCountLabel || 'সক্রিয় তরুণ') : 'Active Youth'}
                    </p>
                    <p className="text-xs text-text-muted">
                      {isBn ? (cms.home.volunteerSubtext || 'সম্মুখসারির নিবেদিত স্বেচ্ছাসেবী') : 'Dedicated frontline relief volunteers'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content & Form */}

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  {isBn ? (cms.home.volunteerSectionBadge || 'কমিউনিটি ও সমাজকল্যাণ') : 'Community Action & Stewardship'}
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-on-surface leading-tight">
                  {isBn ? (cms.home.volunteerSectionTitle || 'আমাদের নিবেদিত তরুণ স্বেচ্ছাসেবক পরিবারে যুক্ত হোন') : 'Join Our Dedicated Youth Volunteers'}
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
                      showAlert({
                        title: isBn ? 'স্বেচ্ছাসেবক নিবন্ধন' : 'Volunteer Application',
                        message: localize(
                          'Thank you! Your volunteer application has been received. Our team will reach out shortly.',
                        ),
                        type: 'success',
                      });
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
                    href="/images/permit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
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
