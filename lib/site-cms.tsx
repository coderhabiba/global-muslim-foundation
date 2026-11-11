'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type SitePageKey =
  | 'header_footer'
  | 'home'
  | 'about'
  | 'sponsor_orphan'
  | 'upcoming_projects'
  | 'impact'
  | 'zakat_calculator'
  | 'gallery'
  | 'volunteer';

export interface SiteCMSContent {
  header_footer: {
    slogan: string;
    hotline: string;
    email: string;
    address: string;
    registrationNo: string;
    facebookUrl: string;
    youtubeUrl: string;
    whatsappNumber: string;
    copyrightText: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryBtn: string;
    heroSecondaryBtn: string;
    heroBgImage: string;
    statsDonors: string;
    statsProjects: string;
    statsBeneficiaries: string;
    statsTransparency: string;
    appealTitle: string;
    appealSubtitle: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    bannerImage: string;
    regTitle: string;
    regNumber: string;
    regDetails: string;
  };
  sponsor_orphan: {
    pageTitle: string;
    pageSubtitle: string;
    monthlyCostBdt: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    ctaHeading: string;
    ctaSubheading: string;
  };
  upcoming_projects: {
    pageTitle: string;
    pageSubtitle: string;
    featuredProjectTitle: string;
    featuredProjectTarget: string;
    featuredProjectDesc: string;
    featuredProjectImage: string;
  };
  impact: {
    pageTitle: string;
    pageSubtitle: string;
    mealsDelivered: string;
    waterWellsCount: string;
    familiesRehabilitated: string;
    healthcareProvided: string;
    summaryText: string;
  };
  zakat_calculator: {
    pageTitle: string;
    pageSubtitle: string;
    nisabSilverBdt: string;
    nisabGoldBdt: string;
    ruleText: string;
    policyHeading: string;
    policyDescription: string;
  };
  gallery: {
    pageTitle: string;
    pageSubtitle: string;
    filterAll: string;
    filterFood: string;
    filterWater: string;
    filterOrphan: string;
    filterShelter: string;
  };
  volunteer: {
    pageTitle: string;
    pageSubtitle: string;
    formHeading: string;
    formSubheading: string;
    joinRequirement: string;
    contactNotice: string;
  };
}

export const DEFAULT_CMS_CONTENT: SiteCMSContent = {
  header_footer: {
    slogan: '“Your Kindness is someone\'s hope”',
    hotline: '01913119525',
    email: 'gmcfoundation2022@gmail.com',
    address: 'House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh',
    registrationNo: 'S-14086/2023',
    facebookUrl: 'https://facebook.com/globalmuslimcharitablefoundation',
    youtubeUrl: 'https://youtube.com',
    whatsappNumber: '+8801913119525',
    copyrightText: '© 2026 Global Muslim Charitable Foundation (GMCF). All Rights Reserved.',
  },
  home: {
    heroBadge: '১০০% যাকাত পলিসি নিশ্চিত ও নিবন্ধিত এনজিও',
    heroTitle: 'মানবতার সেবায় নিবেদিত বিশ্বস্ত হাত',
    heroSubtitle: 'ক্ষুধার্তের মুখে খাবার, বিশুদ্ধ পানি ও সুবিধাবঞ্চিত এতিম শিশুদের উজ্জ্বল ভবিষ্যৎ গড়তে আপনার যাকাত ও সদকা পৌঁছে দিন সরাসরি মানুষের কাছে।',
    heroPrimaryBtn: 'অনলাইন অনুদান দিন',
    heroSecondaryBtn: 'আমাদের কার্যক্রম দেখুন',
    heroBgImage: '/images/hero-relief.jpg',
    statsDonors: '১২,৫০০+ দাতা',
    statsProjects: '৪৮+ সফল প্রকল্প',
    statsBeneficiaries: '১,৫০,০০০+ উপকৃত',
    statsTransparency: '১০০% স্বচ্ছতা',
    appealTitle: 'চলমান জরুরি মানবিক আবেদনসমূহ',
    appealSubtitle: 'তাত্ক্ষণিক ত্রাণ ও স্থায়ী পুনর্বাসনে আপনার হাত বাড়িয়ে দিন।',
  },
  about: {
    pageTitle: 'আমাদের লক্ষ্য ও ইতিহাস',
    pageSubtitle: 'একটি ক্ষুধামুক্ত, স্বাবলম্বী ও ন্যায়ভিত্তিক মানবিক সমাজ গড়ার প্রত্যয়।',
    missionTitle: 'আমাদের মূল মিশন',
    missionDesc: 'শরীয়াহ সম্মত যাকাত ও অনুদান ব্যবস্থাপনার মাধ্যমে প্রান্তিক ও অসহায় মানুষের অধিকার প্রতিষ্ঠা করা।',
    visionTitle: 'আমাদের দীর্ঘমেয়াদী ভিশন',
    visionDesc: 'বাংলাদেশ ও বৈশ্বিক দুর্যোগপীড়িত অঞ্চলে টেকসই বিশুদ্ধ পানি, শিক্ষা ও খাদ্য নিরাপত্তা নিশ্চিত করা।',
    bannerImage: '/images/humanitarian-volunteers.jpg',
    regTitle: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত',
    regNumber: 'রেজিস্ট্রেশন নং: S-14086/2023',
    regDetails: 'সোসাইটি রেজিস্ট্রেশন অ্যাক্ট ১৮৬০ এর আওতায় সরকার কর্তৃক আনুষ্ঠানিকভাবে নিবন্ধিত ও অনুমোদিত।',
  },
  sponsor_orphan: {
    pageTitle: 'একটি এতিম শিশুর অভিভাবক হোন',
    pageSubtitle: 'আপনার সামান্য ভালোবাসায় বদলে যেতে পারে একজন এতিম শিশুর ভবিষ্যৎ ও আখিরাত।',
    monthlyCostBdt: '৩,৫০০',
    benefit1: 'পুষ্টিকর খাদ্য ও নিরাপদ বাসস্থান',
    benefit2: 'নিয়মিত মানসম্মত স্কুল ও কোরআন হিফজ শিক্ষা',
    benefit3: 'প্রয়োজনীয় স্বাস্থ্যসেবা ও পোশাক-পরিচ্ছদ',
    ctaHeading: 'আজই একটি শিশুর দায়িত্ব নিন',
    ctaSubheading: 'রাসূলুল্লাহ (সা.) বলেছেন: আমি ও এতিমের লালনপালনকারী জান্নাতে পাশাপাশি থাকব।',
  },
  upcoming_projects: {
    pageTitle: 'আসন্ন ও ভবিষ্যত মানবিক প্রকল্পসমূহ',
    pageSubtitle: 'দূরদর্শী পরিকল্পনার মাধ্যমে দীর্ঘমেয়াদী সামাজিক পরিবর্তন ও অবকাঠামো নির্মাণ।',
    featuredProjectTitle: 'প্রজেক্ট নূর — অত্যাধুনিক হিফজখানা ও কারিগরি শিক্ষা কমপ্লেক্স',
    featuredProjectTarget: '৫০,০০,০০০',
    featuredProjectDesc: 'সুবিধাবঞ্চিত শিশুদের দ্বীনি শিক্ষা ও আধুনিক আইটি কারিগরি প্রশিক্ষণ প্রদানের লক্ষ্যে স্থায়ী কমপ্লেক্স নির্মাণ।',
    featuredProjectImage: '/images/drive-house-1.jpg',
  },
  impact: {
    pageTitle: 'আমাদের কার্যক্রমের প্রভাব ও অগ্রগতি',
    pageSubtitle: 'মাঠপর্যায়ে বাস্তবায়িত প্রতিটি প্রকল্পের বাস্তব ফলাফল ও সংখ্যাগত অগ্রগতি।',
    mealsDelivered: '৭৫,০০০+ প্যাকেট খাদ্য বিতরণ',
    waterWellsCount: '১৮৫+ গভীর নলকূপ স্থাপন',
    familiesRehabilitated: '১২০+ গৃহহীন পরিবার পুনর্বাসন',
    healthcareProvided: '৮,৫০০+ সুবিধাবঞ্চিতদের বিনামূল্যে চিকিৎসা',
    summaryText: 'প্রতিটি অনুদানের অডিট রিপোর্ট এবং মাঠপর্যায়ের চিত্র সরাসরি আপনাদের সামনে প্রকাশ করা হয়।',
  },
  zakat_calculator: {
    pageTitle: 'সহজ ও নির্ভুল শরীয়াহ সম্মত যাকাত ক্যালকুলেটর',
    pageSubtitle: 'আপনার বাৎসরিক সঞ্চয়, সোনা, রূপা ও ব্যবসার সম্পদের যাকাত হিসাব করুন নিমেষেই।',
    nisabSilverBdt: '৯৫,০০০',
    nisabGoldBdt: '৭,৫০,০০০',
    ruleText: 'সম্পদ নিসাব পরিমাণ পৌঁছানোর পর পুরো এক বছর অতিবাহিত হলে ২.৫% হারে যাকাত প্রদান ফরজ।',
    policyHeading: '১০০% যাকাত তামলিক পলিসি',
    policyDescription: 'যাকাতের অর্থ হতে প্রশাসনিক বা অপারেশনাল কোনো ব্যয় কাটা হয় না, শতভাগ অর্থ সরাসরি উপযুক্ত দরিদ্রদের মালিকানায় প্রদান করা হয়।',
  },
  gallery: {
    pageTitle: 'মাঠপর্যায়ের কাজের আলোকচিত্র গ্যালারি',
    pageSubtitle: 'বন্যাদুর্গত অঞ্চল, রেলওয়ে স্লাম ও প্রত্যন্ত চরে আমাদের স্বেচ্ছাসেবকদের সেবামূলক কর্মকাণ্ড।',
    filterAll: 'সকল চিত্র',
    filterFood: 'খাদ্য বিতরণ',
    filterWater: 'বিশুদ্ধ সুপেয় পানি',
    filterOrphan: 'এতিম শিশু কল্যাণ',
    filterShelter: 'ঘর নির্মাণ ও পুনর্বাসন',
  },
  volunteer: {
    pageTitle: 'আমাদের স্বেচ্ছাসেবক পরিবারের অংশ হোন',
    pageSubtitle: 'আপনার মেধা, সময় ও মানবিক আবেগকে কাজে লাগিয়ে আর্তমানবতার পাশে দাঁড়ান।',
    formHeading: 'স্বেচ্ছাসেবক নিবন্ধন ফরম',
    formSubheading: 'নিচের প্রয়োজনীয় তথ্যসমূহ পূরণ করে আজই যুক্ত হোন আমাদের দেশব্যাপী স্বেচ্ছাসেবী টিমে।',
    joinRequirement: 'ন্যূনতম বয়স ১৮ বছর ও মানবিক সেবায় নিবেদিতপ্রাণ মনোভাব।',
    contactNotice: 'আবেদন জমার পর আমাদের কোঅর্ডিনেশন টিম ৭ কার্যদিবসের মধ্যে যোগাযোগ করবে।',
  },
};

interface CMSContextValue {
  cms: SiteCMSContent;
  updatePageContent: <K extends SitePageKey>(pageKey: K, newContent: Partial<SiteCMSContent[K]>) => void;
  resetPageContent: (pageKey?: SitePageKey) => void;
  isSaving: boolean;
}

const CMSContext = createContext<CMSContextValue | null>(null);

const STORAGE_KEY = 'gmcf:site_cms_v1';

export function SiteCMSProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCms(prev => ({
          ...DEFAULT_CMS_CONTENT,
          ...parsed,
          header_footer: { ...DEFAULT_CMS_CONTENT.header_footer, ...(parsed.header_footer || {}) },
          home: { ...DEFAULT_CMS_CONTENT.home, ...(parsed.home || {}) },
          about: { ...DEFAULT_CMS_CONTENT.about, ...(parsed.about || {}) },
          sponsor_orphan: { ...DEFAULT_CMS_CONTENT.sponsor_orphan, ...(parsed.sponsor_orphan || {}) },
          upcoming_projects: { ...DEFAULT_CMS_CONTENT.upcoming_projects, ...(parsed.upcoming_projects || {}) },
          impact: { ...DEFAULT_CMS_CONTENT.impact, ...(parsed.impact || {}) },
          zakat_calculator: { ...DEFAULT_CMS_CONTENT.zakat_calculator, ...(parsed.zakat_calculator || {}) },
          gallery: { ...DEFAULT_CMS_CONTENT.gallery, ...(parsed.gallery || {}) },
          volunteer: { ...DEFAULT_CMS_CONTENT.volunteer, ...(parsed.volunteer || {}) },
        }));
      }
    } catch (e) {
      console.error('Failed to load CMS content from localStorage:', e);
    }
  }, []);

  const updatePageContent = <K extends SitePageKey>(pageKey: K, newContent: Partial<SiteCMSContent[K]>) => {
    setIsSaving(true);
    setCms(prev => {
      const updated = {
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          ...newContent,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        // Also dispatch custom event for cross-component immediate update
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('gmcf:cms_updated'));
        }
      } catch (e) {
        console.error('Failed to save CMS content:', e);
      }
      return updated;
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  const resetPageContent = (pageKey?: SitePageKey) => {
    setCms(prev => {
      let updated: SiteCMSContent;
      if (pageKey) {
        updated = {
          ...prev,
          [pageKey]: DEFAULT_CMS_CONTENT[pageKey],
        };
      } else {
        updated = DEFAULT_CMS_CONTENT;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('gmcf:cms_updated'));
        }
      } catch (e) {
        console.error('Failed to reset CMS content:', e);
      }
      return updated;
    });
  };

  return (
    <CMSContext.Provider value={{ cms, updatePageContent, resetPageContent, isSaving }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useSiteCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    // Graceful fallback if outside provider
    return {
      cms: DEFAULT_CMS_CONTENT,
      updatePageContent: () => {},
      resetPageContent: () => {},
      isSaving: false,
    };
  }
  return context;
}
