'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

const FILTER_PILLS = [
  { category: 'all', label: 'All Campaigns (6)' },
  { category: 'food', label: 'Food Security & Street Meals' },
  { category: 'medical', label: 'Pediatric & Eye Surgery' },
  { category: 'water', label: 'Clean Water & Sanitation' },
  { category: 'winter', label: 'Winter Blankets & Warmth' },
  { category: 'zakat', label: '\u2605 100% Zakat Eligible' },
];

const SORT_OPTIONS = [
  { value: 'urgent', label: 'Sort: Most Urgent Need' },
  { value: 'funded', label: 'Sort: Most Funded' },
  { value: 'target', label: 'Sort: Target Amount' },
  { value: 'alphabetical', label: 'Sort: Alphabetical' },
];

const MODAL_AMOUNTS = ['25', '50', '100', '250'];

const CAMPAIGN_META = [
  {
    categories: 'food zakat',
    progress: 77,
    urgency: 1,
    title: 'One Meal One Hope: Hot Meals for Street Children',
  },
  {
    categories: 'medical zakat',
    progress: 83,
    urgency: 1,
    title: 'Project Alo: Pediatric Sight & Eye Surgeries',
  },
  {
    categories: 'water',
    progress: 78,
    urgency: 2,
    title: 'Clean Water Wells & Sanitary Washrooms',
  },
  {
    categories: 'winter zakat',
    progress: 77.5,
    urgency: 2,
    title: 'Project Sheetolota: Heavy Blankets & Warm Coats',
  },
  {
    categories: 'medical zakat',
    progress: 74.6,
    urgency: 1,
    title: 'Emergency Pediatric Hospital Care & Nutrition',
  },
  {
    categories: 'medical',
    progress: 84,
    urgency: 3,
    title: 'Inclusive Special Children Therapy & Aid',
  },
];

export default function AppealsPage() {
  const { localize, currency } = useSiteSettings();
  const { openPaymentModal, showAlert } = useModalState();
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [pillTouched, setPillTouched] = useState(false);
  const [sortValue, setSortValue] = useState('urgent');
  const [cardOrder, setCardOrder] = useState(() =>
    CAMPAIGN_META.map((_, index) => index),
  );
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() =>
    CAMPAIGN_META.map(() => true),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Emergency Appeal');
  const [modalAmount, setModalAmount] = useState('100');

  useEffect(() => {
    const needle = query.toLowerCase().trim();

    setVisibleCards(
      cardRefs.current.map(card => {
        const cardCategories = card?.getAttribute('data-categories') ?? '';
        const cardText = card?.textContent?.toLowerCase() ?? '';
        const matchesCategory =
          activeCategory === 'all' || cardCategories.includes(activeCategory);
        const matchesQuery = needle === '' || cardText.includes(needle);

        return matchesCategory && matchesQuery;
      }),
    );
  }, [query, activeCategory]);

  function handleSort(value: string) {
    setSortValue(value);
    setCardOrder(current => {
      const next = [...current];

      next.sort((a, b) => {
        const metaA = CAMPAIGN_META[a];
        const metaB = CAMPAIGN_META[b];

        if (value === 'funded') return metaB.progress - metaA.progress;
        if (value === 'urgent') return metaA.urgency - metaB.urgency;
        if (value === 'alphabetical')
          return metaA.title.localeCompare(metaB.title);
        return 0;
      });

      return next;
    });
  }

  function pillClassName(category: string) {
    const base =
      'filter-pill whitespace-nowrap px-4 py-1.5 rounded-full font-label-md transition-all';

    if (category === activeCategory) {
      if (category === 'zakat') {
        return `${base} text-white shadow-sm bg-secondary font-bold`;
      }
      if (category === 'all' && !pillTouched) {
        return `${base} text-white shadow-sm bg-oceanic-teal-deep`;
      }
      return `${base} text-white shadow-sm bg-emerald-dark`;
    }

    if (category === 'zakat') {
      return `${base} bg-zakat-gold-light text-secondary font-bold hover:bg-secondary-container hover:text-white`;
    }

    return `${base} bg-surface-subtle-mint text-emerald-dark hover:bg-emerald-dark hover:text-white`;
  }

  function openDonate(title: string) {
    setModalTitle(title);
    setModalOpen(true);
  }

  function closeDonate() {
    setModalOpen(false);
  }

  function submitDonation() {
    closeDonate();
    const amtNum = parseFloat(modalAmount) || 25;
    openPaymentModal({
      amount: currency === 'BDT' ? amtNum * 122 : amtNum,
      currency: currency,
      cause: modalTitle,
    });
  }

  return (
    <>
      <main suppressHydrationWarning className="w-full bg-surface-subtle-mint pt-[64px] sm:pt-[80px]">
        <div className="flex flex-col w-full">
          {/* Interactive Quick Donation Modal (Hidden by default, triggered via JS) */}

          <div
            className={`fixed inset-0 z-50 ${
              modalOpen ? 'flex' : 'hidden'
            } items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm`}
            id="quick-donate-modal"
            onClick={event => {
              if (event.target === event.currentTarget) closeDonate();
            }}
          >
            <div className="bg-surface-clean rounded-xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-vibrant">
                    volunteer_activism
                  </span>
                  <h4
                    className="font-serif text-title-lg text-emerald-dark"
                    id="modal-appeal-title"
                    suppressHydrationWarning
                  >
                    Support {modalTitle}
                  </h4>
                </div>
                <button
                  className="text-on-surface-variant hover:text-on-surface p-1"
                  id="close-modal-btn"
                  onClick={closeDonate}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="py-4 space-y-4">
                <div>
                  <label className="block font-label-md text-on-surface-variant mb-2">
                    Select Donation Amount (USD)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {MODAL_AMOUNTS.map(amount => (
                      <button
                        key={amount}
                        className={`modal-amt-chip py-2 rounded-lg font-label-lg text-center ${
                          modalAmount === amount
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-surface-subtle-mint text-primary hover:bg-primary hover:text-white transition-colors'
                        }`}
                        data-amt={amount}
                        type="button"
                        onClick={() => setModalAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block font-label-md text-on-surface-variant">
                    Custom Donation Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 font-title-md text-on-surface-variant">
                      $
                    </span>
                    <input
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-title-md text-on-surface"
                      id="modal-custom-input"
                      type="number"
                      value={modalAmount}
                      onChange={event => setModalAmount(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-subtle-mint rounded-lg text-oceanic-teal-deep">
                  <span className="material-symbols-outlined text-amber-vibrant">
                    verified
                  </span>
                  <p className="font-body-sm text-xs leading-relaxed">
                    100% Zakat Certified: Zero administrative commission taken.
                    Direct transfer to verified ground aid.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  className="w-full py-3 bg-amber-vibrant hover:bg-secondary text-white font-label-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  id="modal-submit-btn"
                  onClick={submitDonation}
                >
                  <span className="material-symbols-outlined">payments</span>
                  <span className="">Complete Secure Donation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Header Section */}

          <section className="relative bg-gradient-to-b from-surface-subtle-mint via-surface to-surface px-4 sm:px-8 pt-10 pb-16 overflow-hidden">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-10">
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-dark/10 text-emerald-dark">
                    <span className="w-2 h-2 rounded-full bg-amber-vibrant animate-pulse"></span>
                    <span className="font-label-sm uppercase tracking-wider text-emerald-dark">
                      Verified Field Operations • 100% Direct Delivery
                    </span>
                  </div>
                  <h1 className="font-serif text-headline-xl text-emerald-dark tracking-tight leading-tight">
                    Our Ongoing Appeals &amp; Humanitarian Causes
                  </h1>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                    Entrust your Zakat and Sadaqah where urgency meets real-time
                    verified impact. Supporting malnourished children, desperate
                    rural communities, clean water wells, and emergency eye
                    surgeries across Bangladesh.
                  </p>
                </div>

                {/* Metric Banner Pills */}

                <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
                  <div className="flex-1 sm:flex-initial p-4 rounded-xl bg-surface-clean shadow-sm border border-border-subtle min-w-[150px]">
                    <div className="flex items-center gap-1.5 text-primary mb-1">
                      <span className="material-symbols-outlined text-[18px]">
                        verified_user
                      </span>
                      <span className="font-label-sm uppercase">
                        Zakat Guarantee
                      </span>
                    </div>
                    <div className="font-headline-sm text-emerald-dark">
                      100%
                    </div>
                    <div className="font-label-sm text-on-surface-variant">
                      Zero Admin Cut
                    </div>
                  </div>
                  <div className="flex-1 sm:flex-initial p-4 rounded-xl bg-surface-clean shadow-sm border border-border-subtle min-w-[150px]">
                    <div className="flex items-center gap-1.5 text-amber-vibrant mb-1">
                      <span className="material-symbols-outlined text-[18px]">
                        groups
                      </span>
                      <span className="font-label-sm uppercase">
                        Active Beneficiaries
                      </span>
                    </div>
                    <div className="font-headline-sm text-emerald-dark">
                      142,800+
                    </div>
                    <div className="font-label-sm text-on-surface-variant">
                      Fed &amp; Sheltered
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Search & Filtering Bar */}

              <div className="bg-surface-clean rounded-2xl p-4 sm:p-5 shadow-sm border border-border-subtle space-y-4">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  {/* Search input */}

                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-on-surface-variant">
                      search
                    </span>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border-subtle bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-on-surface"
                      id="campaign-search"
                      placeholder="Search appeals (e.g., street food, eye surgery, tube well)..."
                      type="text"
                      value={query}
                      onChange={event => setQuery(event.target.value)}
                    />
                  </div>

                  {/* Sort dropdown & quick view */}

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        sort
                      </span>
                      <select
                        className="py-2.5 px-3 rounded-xl border border-border-subtle bg-surface font-label-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        id="campaign-sort"
                        value={sortValue}
                        onChange={event => handleSort(event.target.value)}
                      >
                        {SORT_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filter category tags */}

                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
                  {FILTER_PILLS.map(pill => (
                    <button
                      key={pill.category}
                      className={pillClassName(pill.category)}
                      data-category={pill.category}
                      onClick={() => {
                        setActiveCategory(pill.category);
                        setPillTouched(true);
                      }}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Campaigns Grid Section */}

          <section
            className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 w-full"
            id="active-appeals"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="appeals-grid"
            >
              {/* Campaign 1: One Meal One Hope */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[0] ? '' : ' hidden'}`}
                data-categories="food zakat"
                data-progress="77"
                data-urgency="1"
                ref={node => {
                  cardRefs.current[0] = node;
                }}
                style={{ order: cardOrder.indexOf(0) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Dozens of underprivileged Bangladeshi street children sitting in a straight line along a brick wall enjoying hot meals from plates, soft sunlight, documentary humanitarian photography"
                    src="/images/street-children-hot-meals.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-amber-vibrant text-white font-label-sm font-bold shadow-sm uppercase tracking-wider">
                      Food Relief
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zakat-gold-light text-secondary border border-amber-300 font-label-sm font-bold shadow-sm">
                      Zakat Eligible
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Kamalapur &amp; Mirpur, Dhaka</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          volunteer_activism
                        </span>{' '}
                        PLDS Partnership
                      </span>
                      <span className="text-amber-vibrant font-bold">
                        Urgent Daily Need
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      One Meal One Hope: Hot Meals for Street Children
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Providing hot, wholesome meals, clean bottled drinking
                      water, and dignified sitting spaces daily for hundreds of
                      homeless children surviving alongside railway lines and
                      urban sidewalks.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $50,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          schedule
                        </span>{' '}
                        14 Days Remaining
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="One Meal One Hope"
                        onClick={() => openDonate('One Meal One Hope')}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          favorite
                        </span>
                        <span className="">Donate Meal</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                        title="Read Full Campaign Details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* Campaign 2: Project Alo: Sight Restoring Surgery */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[1] ? '' : ' hidden'}`}
                data-categories="medical zakat"
                data-progress="83"
                data-urgency="1"
                ref={node => {
                  cardRefs.current[1] = node;
                }}
                style={{ order: cardOrder.indexOf(1) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="A young vulnerable boy resting gently on a clinic bed with a sterile white surgical bandage patch over one eye after cataract reconstruction surgery, teal background tone"
                    src="/images/vulnerable-child-care.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-white font-label-sm font-bold shadow-sm uppercase tracking-wider bg-oceanic-teal-deep">
                      Pediatric Surgery
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zakat-gold-light text-secondary border border-amber-300 font-label-sm font-bold shadow-sm">
                      Zakat Eligible
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Chittagong Eye Infirmary</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          visibility
                        </span>{' '}
                        Project Alo (Light)
                      </span>
                      <span className="text-emerald-dark font-bold">
                        High Medical Urgency
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      Project Alo: Pediatric Sight &amp; Eye Surgeries
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Restoring sight to impoverished orphans and rural children
                      suffering from reversible corneal damage, pediatric
                      cataracts, and traumatic eye injuries without medical
                      access.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $35,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          favorite_border
                        </span>{' '}
                        116 Operations Funded
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="Project Alo: Pediatric Surgery"
                        onClick={() =>
                          openDonate('Project Alo: Pediatric Surgery')
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          medical_services
                        </span>
                        <span className="">Sponsor Surgery</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* Campaign 3: Clean Water & Deep Tube Wells */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[2] ? '' : ' hidden'}`}
                data-categories="water"
                data-progress="78"
                data-urgency="2"
                ref={node => {
                  cardRefs.current[2] = node;
                }}
                style={{ order: cardOrder.indexOf(2) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Clean water installation project by Global Muslim Charitable Foundation"
                    src="/images/drive-water-1.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-oceanic-teal-deep text-white font-label-sm font-bold shadow-sm uppercase tracking-wider">
                      Water &amp; WASH
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-subtle-mint text-primary border border-primary/30 font-label-sm font-bold shadow-sm">
                      Sadaqah Jariyah
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Bakerganj, Barisal</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          water_drop
                        </span>{' '}
                        BHF Dignity Project
                      </span>
                      <span className="text-primary font-bold">
                        Continuous Charity
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      Clean Water Wells &amp; Sanitary Washrooms
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Installing deep submersible tube wells and durable brick
                      washroom facilities in coastal salinity-hit and
                      arsenic-prone rural regions, securing clean hydration for
                      entire villages.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $25,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          water
                        </span>{' '}
                        0 Wells Built
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="Clean Water &amp; Deep Tube Wells"
                        onClick={() =>
                          openDonate('Clean Water & Deep Tube Wells')
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          water_drop
                        </span>
                        <span className="">Fund a Water Well</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* Campaign 4: Project Sheetolota Winter Warmth */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[3] ? '' : ' hidden'}`}
                data-categories="winter zakat"
                data-progress="77.5"
                data-urgency="2"
                ref={node => {
                  cardRefs.current[3] = node;
                }}
                style={{ order: cardOrder.indexOf(3) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="A large group of rural madrasa orphan boys standing in colorful thobes holding boxed warm blankets and gift packages behind a blue campaign banner"
                    src="/images/rural-madrasa-children.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-oceanic-teal-deep text-white font-label-sm font-bold shadow-sm uppercase tracking-wider">
                      Winter Relief
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zakat-gold-light text-secondary border border-amber-300 font-label-sm font-bold shadow-sm">
                      Zakat Eligible
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Kurigram &amp; Rangpur</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          ac_unit
                        </span>{' '}
                        Project Sheetolota S2
                      </span>
                      <span className="text-amber-vibrant font-bold">
                        Seasonal Appeal
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      Project Sheetolota: Heavy Blankets &amp; Warm Coats
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Distributing heavy winter fleece blankets and thermal
                      sweaters to orphaned students living in unheated
                      corrugated tin orphanages across the northern riverine
                      cold belt.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $40,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          inventory_2
                        </span>{' '}
                        0 Blankets
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="Project Sheetolota: Winter Blanket &amp; Warmth"
                        onClick={() =>
                          openDonate(
                            'Project Sheetolota: Winter Blanket & Warmth',
                          )
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          favorite
                        </span>
                        <span className="">Send Warmth ($25)</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* Campaign 5: Emergency Pediatric Hospital Care & Nutrition */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[4] ? '' : ' hidden'}`}
                data-categories="medical zakat"
                data-progress="74.6"
                data-urgency="1"
                ref={node => {
                  cardRefs.current[4] = node;
                }}
                style={{ order: cardOrder.indexOf(4) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    alt="Pediatric emergency healthcare ward care for vulnerable Bangladeshi youth"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/images/pediatric-hope-saifan.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-white font-label-sm font-bold shadow-sm uppercase tracking-wider bg-oceanic-teal-deep">
                      Hospital Care
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zakat-gold-light text-secondary border border-amber-300 font-label-sm font-bold shadow-sm">
                      Zakat Eligible
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Dhaka Shishu Hospital</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          local_hospital
                        </span>{' '}
                        Critical Care
                      </span>
                      <span className="text-amber-vibrant font-bold">
                        High Priority
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      Emergency Pediatric Hospital Care &amp; Nutrition
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Covering emergency intensive pediatric treatments, blood
                      transfusions, and intensive therapeutic feeding formulas
                      for destitute mothers unable to afford emergency clinical
                      care.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $30,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          medication
                        </span>{' '}
                        0 Children Supported
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="Pediatric Emergency Hospital Care"
                        onClick={() =>
                          openDonate('Pediatric Emergency Hospital Care')
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          medical_information
                        </span>
                        <span className="">Donate Emergency Care</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* Campaign 6: Inclusive Special Children Support */}

              <article
                className={`campaign-card flex flex-col bg-surface-clean rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300${visibleCards[5] ? '' : ' hidden'}`}
                data-categories="medical"
                data-progress="84"
                data-urgency="3"
                ref={node => {
                  cardRefs.current[5] = node;
                }}
                style={{ order: cardOrder.indexOf(5) }}
              >
                <div className="relative w-full h-56 bg-surface-container overflow-hidden group">
                  <img
                    alt="Inclusive medical equipment, physical therapy, and cognitive educational support for children with developmental challenges"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/images/special-care-therapy.jpg"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-oceanic-teal-deep text-white font-label-sm font-bold shadow-sm uppercase tracking-wider">
                      Special Care
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-subtle-mint text-primary border border-primary/30 font-label-sm font-bold shadow-sm">
                      Sadaqah
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 text-white font-label-sm px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="">Rajshahi Specialized Centre</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          accessibility_new
                        </span>{' '}
                        Special Needs Care
                      </span>
                      <span className="text-primary font-bold">
                        Empowerment
                      </span>
                    </div>
                    <h3 className="font-serif text-title-lg text-emerald-dark font-bold hover:text-primary transition-colors">
                      Inclusive Special Children Therapy &amp; Aid
                    </h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3">
                      Providing tailored physiotherapy sessions, hearing aids,
                      orthotic braces, and sensory development therapy for
                      underprivileged children diagnosed with physical and
                      developmental disabilities.
                    </p>
                  </div>

                  {/* Progress and Funding metrics */}

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-label-md">
                        <span className="text-primary font-bold font-title-md">
                          $0{' '}
                          <span className="font-body-sm text-on-surface-variant font-normal">
                            raised
                          </span>
                        </span>
                        <span className="text-on-surface-variant">
                          0% of $20,000
                        </span>
                      </div>
                      <div className="w-full bg-surface-subtle-mint rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          assist_walker
                        </span>{' '}
                        0 Children Supported
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          group
                        </span>{' '}
                        0 Donors
                      </span>
                    </div>

                    {/* Action buttons */}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        className="open-donate-btn flex-1 py-2.5 px-4 bg-amber-vibrant hover:bg-secondary text-white font-label-md rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        data-title="Inclusive Special Children Support"
                        onClick={() =>
                          openDonate('Inclusive Special Children Support')
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          favorite
                        </span>
                        <span className="">Sponsor Care</span>
                      </button>
                      <Link
                        className="py-2.5 px-3 bg-surface-subtle-mint hover:bg-primary/20 text-primary font-label-md rounded-xl transition-colors flex items-center justify-center"
                        href="/campaign-details"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Interactive Transparency Ribbon & Zakat Trust Callout */}

          <section className="w-full text-on-primary py-12 px-4 sm:px-8 mt-12 bg-oceanic-teal-deep">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/15 pb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-zakat-gold-light shrink-0">
                    <span className="material-symbols-outlined text-[28px]">
                      gavel
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-title-lg text-white font-bold">
                      100% Shariah Compliant
                    </h4>
                    <p className="font-body-sm text-primary-fixed leading-relaxed">
                      Supervised under an independent board of certified Islamic
                      jurists ensuring pure 8-asnaf disbursement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-zakat-gold-light shrink-0">
                    <span className="material-symbols-outlined text-[28px]">
                      currency_exchange
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-title-lg text-white font-bold">
                      Zero Admin Overhead on Zakat
                    </h4>
                    <p className="font-body-sm text-primary-fixed leading-relaxed">
                      Operational and administrative overhead is funded solely
                      through dedicated private gift grants and Gift Aid.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-zakat-gold-light shrink-0">
                    <span className="material-symbols-outlined text-[28px]">
                      verified
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-title-lg text-white font-bold">
                      Audited Ground Delivery
                    </h4>
                    <p className="font-body-sm text-primary-fixed leading-relaxed">
                      Every meal, well, and surgery is verified via geo-tagged
                      receipts and video records provided to donors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick stats ribbon */}

              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="font-headline-lg text-zakat-gold-light">
                    340,000+
                  </div>
                  <div className="font-label-md text-primary-fixed uppercase tracking-wider">
                    Hot Meals Served
                  </div>
                </div>
                <div>
                  <div className="font-headline-lg text-zakat-gold-light">
                    420+
                  </div>
                  <div className="font-label-md text-primary-fixed uppercase tracking-wider">
                    Water Wells Dug
                  </div>
                </div>
                <div>
                  <div className="font-headline-lg text-zakat-gold-light">
                    1,150+
                  </div>
                  <div className="font-label-md text-primary-fixed uppercase tracking-wider">
                    Sight Surgeries
                  </div>
                </div>
                <div>
                  <div className="font-headline-lg text-zakat-gold-light">
                    100%
                  </div>
                  <div className="font-label-md text-primary-fixed uppercase tracking-wider">
                    Audit Rating
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Own Peer-to-Peer Fundraiser Section */}

          <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 w-full">
            <div className="bg-gradient-to-r from-surface-subtle-mint via-surface-clean to-surface-subtle-mint rounded-3xl p-8 sm:p-12 border border-border-subtle shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    celebration
                  </span>
                  <span className="font-label-sm uppercase tracking-wider">
                    Community Champion Program
                  </span>
                </div>
                <h2 className="font-serif text-headline-lg text-emerald-dark leading-tight">
                  Create a Dedicated Fundraiser in Honor of a Loved One
                </h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Rally your friends, family, and local community. Launch a
                  personalized Sadaqah Jariyah water well, sponsor orphan school
                  terms, or organize a Ramadan street meal drive in minutes.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span className="">Zero Platform Fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span className="">Personalized Memorial Page</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span className="">Full Video Completion Report</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <button className="px-6 py-3.5 bg-primary hover:bg-emerald-dark text-white font-label-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="">Start a Campaign</span>
                </button>
                <Link
                  className="px-6 py-3.5 bg-surface-clean hover:bg-surface-subtle-mint text-emerald-dark border border-border-subtle font-label-lg rounded-xl transition-colors flex items-center justify-center gap-2"
                  href="/about"
                >
                  <span className="material-symbols-outlined">menu_book</span>
                  <span className="">Fundraising Guide</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Interactive JavaScript for Filtering, Search, and Donation Modal */}
        </div>
      </main>
    </>
  );
}
