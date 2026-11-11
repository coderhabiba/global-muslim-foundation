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
    logoImage: string;
    footerLogoImage: string;
    slogan: string;
    hotline: string;
    email: string;
    address: string;
    registrationNo: string;
    chairmanName: string;
    facebookUrl: string;
    youtubeUrl: string;
    whatsappNumber: string;
    instagramUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    copyrightText: string;
    navAbout: string;
    navOrphan: string;
    navUpcoming: string;
    navProjects: string;
    navZakat: string;
    navGallery: string;
    navVolunteer: string;
    navDonateBtn: string;
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
    quickDonationHeading: string;
    quickDonationSubheading: string;
    appealTitle: string;
    appealSubtitle: string;
    waterSectionTitle: string;
    waterSectionDesc: string;
    waterSectionCost: string;
    waterSectionImage: string;
    foodSectionTitle: string;
    foodSectionDesc: string;
    foodSectionCost: string;
    foodSectionImage: string;
    ctaBannerTitle: string;
    ctaBannerDesc: string;
    ctaBannerBtn: string;
  };
  about: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    statZakatRatio: string;
    statAdminCost: string;
    statFamiliesUplifted: string;
    statAuditRating: string;
    pillarTitle: string;
    pillarSubtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    bannerImage: string;
    regTitle: string;
    regNumber: string;
    regDetails: string;
    boardHeading: string;
    boardSubheading: string;
  };
  sponsor_orphan: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    hadithQuote: string;
    hadithSource: string;
    monthlyCostBdt: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    package1Title: string;
    package1Price: string;
    package2Title: string;
    package2Price: string;
    package3Title: string;
    package3Price: string;
    ctaHeading: string;
    ctaSubheading: string;
  };
  upcoming_projects: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    featuredProjectTitle: string;
    featuredProjectTarget: string;
    featuredProjectDesc: string;
    featuredProjectLocation: string;
    featuredProjectImage: string;
    project2Title: string;
    project2Target: string;
    project2Desc: string;
    project3Title: string;
    project3Target: string;
    project3Desc: string;
  };
  impact: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    mealsDelivered: string;
    mealsDeliveredLabel?: string;
    waterWellsCount: string;
    waterWellsLabel?: string;
    familiesRehabilitated: string;
    familiesRehabilitatedLabel?: string;
    healthcareProvided: string;
    orphansSupported: string;
    districtsCovered: string;
    districtsCoveredLabel?: string;
    summaryHeading: string;
    summaryText: string;
    reportDownloadTitle: string;
  };
  zakat_calculator: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    nisabSilverBdt: string;
    nisabGoldBdt: string;
    ruleText: string;
    policyHeading: string;
    policyDescription: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
  };
  gallery: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    filterAll: string;
    filterFood: string;
    filterWater: string;
    filterOrphan: string;
    filterShelter: string;
    bottomNotice: string;
  };
  volunteer: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    formHeading: string;
    formSubheading: string;
    joinRequirement: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    contactNotice: string;
  };
}

export const DEFAULT_CMS_CONTENT: SiteCMSContent = {
  header_footer: {
    logoImage: '/images/gmcf-logo-full.png',
    footerLogoImage: '/images/gmcf-logo-full.png',
    slogan: '“Your Kindness is someone\'s hope”',
    hotline: '01913119525',
    email: 'gmcfoundation2022@gmail.com',
    address: 'House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh',
    registrationNo: 'S-14086/2023',
    chairmanName: 'মোহাম্মদ আলী মোস্তফা',
    facebookUrl: 'https://facebook.com/globalmuslimcharitablefoundation',
    youtubeUrl: 'https://youtube.com',
    whatsappNumber: '+8801913119525',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    copyrightText: '© 2026 Global Muslim Charitable Foundation (GMCF). All Rights Reserved.',
    navAbout: 'আমাদের সম্পর্কে',
    navOrphan: 'দুস্থ শিশু স্পনসর',
    navUpcoming: 'আসন্ন প্রকল্প',
    navProjects: 'আমাদের প্রজেক্ট সমূহ',
    navZakat: 'যাকাত ক্যালকুলেটর',
    navGallery: 'গ্যালারি',
    navVolunteer: 'স্বেচ্ছাসেবক',
    navDonateBtn: 'অনলাইন অনুদান',
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
    quickDonationHeading: 'তাত্ক্ষণিক সাধারণ দান ও সদকা',
    quickDonationSubheading: 'সহজ EPS গেটওয়ের মাধ্যমে বিকাশ, নগদ, কার্ডে তাৎক্ষণিক অনুদান দিন।',
    appealTitle: 'চলমান জরুরি মানবিক আবেদনসমূহ',
    appealSubtitle: 'তাত্ক্ষণিক ত্রাণ ও স্থায়ী পুনর্বাসনে আপনার হাত বাড়িয়ে দিন।',
    waterSectionTitle: 'সুপেয় নিরাপদ পানি ও গভীর নলকূপ প্রকল্প',
    waterSectionDesc: 'আর্সেনিক ও খরা কবলিত দূরবর্তী গ্রামে স্থায়ী সুপেয় পানির সংস্থান নিশ্চিতকরণ।',
    waterSectionCost: '৳৬৫,০০০',
    waterSectionImage: '/images/clean-water-well.jpg',
    foodSectionTitle: 'ওয়ান মিল ওয়ান হোপ — ক্ষুধার্তের মুখে আহার',
    foodSectionDesc: 'বস্তিবাসী ও ছিন্নমূল শিশুদের প্রতিদিন পুষ্টিকর খাদ্য বিতরণ কর্মসূচি।',
    foodSectionCost: '৳১২০ প্রতি মিল',
    foodSectionImage: '/images/drive-food-1.jpg',
    ctaBannerTitle: 'আপনার যাকাত হোক অসহায় মানুষের বাঁচার সম্বল',
    ctaBannerDesc: 'শতভাগ স্বচ্ছতা ও সরাসরি মুস্তাহিকদের হাতে অর্থ পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।',
    ctaBannerBtn: 'এখনই যাকাত ফান্ডে দিন',
  },
  about: {
    pageBadge: 'ESTABLISHED WITH SACRED TRUST • REGISTERED NGO',
    pageTitle: 'আমাদের লক্ষ্য, ভিশন ও প্রাতিষ্ঠানিক ইতিহাস',
    pageSubtitle: 'একটি ক্ষুধামুক্ত, স্বাবলম্বী ও ন্যায়ভিত্তিক মানবিক সমাজ গড়ার আজীবন প্রত্যয়।',
    statZakatRatio: '১০০% যাকাত বণ্টন',
    statAdminCost: '৳০ কোনো প্রশাসনিক কর্তন নেই',
    statFamiliesUplifted: '১৮,৪০০+ পরিবার স্বাবলম্বী',
    statAuditRating: 'গ্রেড এ স্বাধীন সিএ অডিট',
    pillarTitle: 'আমানতদারিতা ও স্বচ্ছতার চার স্তম্ভ',
    pillarSubtitle: 'আমাদের সকল কার্যক্রমের মূলভিত্তি ইসলামী শরীয়াহ ও পূর্ণ জবাবদিহিতা।',
    missionTitle: 'আমাদের মূল মিশন',
    missionDesc: 'শরীয়াহ সম্মত যাকাত ও অনুদান ব্যবস্থাপনার মাধ্যমে প্রান্তিক ও অসহায় মানুষের অধিকার প্রতিষ্ঠা করা।',
    visionTitle: 'আমাদের দীর্ঘমেয়াদী ভিশন',
    visionDesc: 'বাংলাদেশ ও বৈশ্বিক দুর্যোগপীড়িত অঞ্চলে টেকসই বিশুদ্ধ পানি, শিক্ষা ও খাদ্য নিরাপত্তা নিশ্চিত করা।',
    bannerImage: '/images/humanitarian-volunteers.jpg',
    regTitle: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত',
    regNumber: 'রেজিস্ট্রেশন নং: S-14086/2023',
    regDetails: 'সোসাইটি রেজিস্ট্রেশন অ্যাক্ট ১৮৬০ এর আওতায় সরকার কর্তৃক আনুষ্ঠানিকভাবে নিবন্ধিত ও অনুমোদিত।',
    boardHeading: 'সম্মানিত পরিচালনা পর্ষদ ও উপদেষ্টা পরিষদ',
    boardSubheading: 'যোগ্য ও আমানতদার আলেম এবং ট্রাস্টি বোর্ডের সার্বক্ষণিক দিকনির্দেশনায় পরিচালিত।',
  },
  sponsor_orphan: {
    pageBadge: 'SPONSOR A VULNERABLE CHILD • SADQA JARIYAH',
    pageTitle: 'একটি এতিম শিশুর অভিভাবক হোন',
    pageSubtitle: 'আপনার সামান্য ভালোবাসায় বদলে যেতে পারে একজন এতিম শিশুর ভবিষ্যৎ ও আখিরাত।',
    hadithQuote: '“আমি ও এতিমের লালনপালনকারী জান্নাতে এভাবে পাশাপাশি থাকব — দুই আঙুল তুলে ইশারা করলেন।”',
    hadithSource: 'সহীহ বুখারী, হাদিস নং ৫৩০৪',
    monthlyCostBdt: '৩,৫০০',
    benefit1: 'নিয়মিত পুষ্টিকর খাদ্য ও নিরাপদ স্বাস্থ্যসম্মত বাসস্থান',
    benefit2: 'মানসম্মত আধুনিক স্কুল ও পবিত্র কোরআন হিফজ শিক্ষা',
    benefit3: 'প্রয়োজনীয় স্বাস্থ্যসেবা, মৌসুমী পোশাক ও ঈদ উপহার',
    benefit4: 'ধারাবাহিক প্রগ্রেস রিপোর্ট ও শিশুর সরাসরি ভিডিও আপডেট',
    package1Title: 'মাসিক বেসিক স্পনসরশিপ',
    package1Price: '৳৩,৫০০ / মাস',
    package2Title: 'বাৎসরিক পূর্ণাঙ্গ শিক্ষা ও আবাসন',
    package2Price: '৳৪২,০০০ / বছর',
    package3Title: 'আজীবন হিফজ স্পনসর ফান্ড',
    package3Price: '৳১,০০,০০০ এককালীন',
    ctaHeading: 'আজই একটি শিশুর দায়িত্ব নিন',
    ctaSubheading: 'আপনার অনুদানের প্রতিটি পয়সা শিশুর উজ্জ্বল ভবিষ্যতের জন্য ব্যয় করা হয়।',
  },
  upcoming_projects: {
    pageBadge: 'STRATEGIC EXPANSION & SUSTAINABLE INFRASTRUCTURE',
    pageTitle: 'আসন্ন ও ভবিষ্যত মানবিক প্রকল্পসমূহ',
    pageSubtitle: 'দূরদর্শী পরিকল্পনার মাধ্যমে দীর্ঘমেয়াদী সামাজিক পরিবর্তন ও স্থায়ী অবকাঠামো নির্মাণ।',
    featuredProjectTitle: 'প্রজেক্ট নূর — অত্যাধুনিক হিফজখানা ও কারিগরি শিক্ষা কমপ্লেক্স',
    featuredProjectTarget: '৫০,০০,০০০',
    featuredProjectDesc: 'সুবিধাবঞ্চিত শিশুদের দ্বীনি শিক্ষা ও আধুনিক আইটি কারিগরি প্রশিক্ষণ প্রদানের লক্ষ্যে স্থায়ী কমপ্লেক্স নির্মাণ।',
    featuredProjectLocation: 'সাভার, ঢাকা',
    featuredProjectImage: '/images/drive-house-1.jpg',
    project2Title: 'সোলার ওয়াটার ট্রিটমেন্ট প্ল্যান্ট (উপকূলীয় অঞ্চল)',
    project2Target: '২৫,০০,০০০',
    project2Desc: 'লবণাক্ততা কবলিত সমুদ্র উপকূলীয় অঞ্চলে আর্সেনিক ও লবণমুক্ত মিষ্টি পানি সরবরাহ স্টেশন।',
    project3Title: 'জরুরি অ্যাম্বুলেন্স ও ভ্রাম্যমাণ ফ্রি মেডিকেল ক্লিনিক',
    project3Target: '৩০,০০,০০০',
    project3Desc: 'বন্যা ও দুর্যোগে প্রত্যন্ত চরাঞ্চলের রোগীদের জরুরি চিকিৎসায় মোবাইল ক্লিনিক ভ্যান।',
  },
  impact: {
    pageBadge: 'FIELD AUDITED RESULTS • 100% ACCOUNTABILITY',
    pageTitle: 'আমাদের কার্যক্রমের প্রভাব ও অগ্রগতি',
    pageSubtitle: 'মাঠপর্যায়ে বাস্তবায়িত প্রতিটি প্রকল্পের বাস্তব ফলাফল, পরিসংখ্যান ও সংখ্যাগত অগ্রগতি।',
    waterWellsCount: '১৮৫+',
    waterWellsLabel: 'সুপেয় পানির নলকূপ',
    mealsDelivered: '৭৫,০০০+',
    mealsDeliveredLabel: 'খাবার প্যাকেট বিতরণ',
    familiesRehabilitated: '১২০+',
    familiesRehabilitatedLabel: 'পুনর্বাসিত পরিবার',
    healthcareProvided: '৮,৫০০+',
    orphansSupported: '৩৫০+',
    districtsCovered: '২৮টি',
    districtsCoveredLabel: 'জেলা কভারেজ',
    summaryHeading: 'শতভাগ স্বচ্ছতা ও চার্টার্ড একাউন্ট্যান্ট অডিট',
    summaryText: 'প্রতিটি অনুদানের ব্যাংক স্টেটমেন্ট, ভাউচার ও ভিডিও প্রমাণাদি দাতাদের কাছে উন্মুক্ত রাখা হয়।',
    reportDownloadTitle: 'বাৎসরিক অডিট রিপোর্ট ডাউনলোড করুন (PDF)',
  },
  zakat_calculator: {
    pageBadge: 'ACCURATE SHARIAH COMPLIANT ZAKAT CALCULATION',
    pageTitle: 'সহজ ও নির্ভুল শরীয়াহ সম্মত যাকাত ক্যালকুলেটর',
    pageSubtitle: 'আপনার বাৎসরিক সঞ্চয়, সোনা, রূপা ও ব্যবসার সম্পদের যাকাত হিসাব করুন নিমেষেই।',
    nisabSilverBdt: '৯৫,০০০',
    nisabGoldBdt: '৭,৫০,০০০',
    ruleText: 'সম্পদ নিসাব পরিমাণ পৌঁছানোর পর পুরো এক চন্দ্র বছর অতিবাহিত হলে ২.৫% হারে যাকাত প্রদান ফরজ।',
    policyHeading: '১০০% যাকাত তামলিক পলিসি',
    policyDescription: 'যাকাতের অর্থ হতে প্রশাসনিক বা অপারেশনাল কোনো ব্যয় কাটা হয় না, শতভাগ অর্থ সরাসরি উপযুক্ত দরিদ্রদের মালিকানায় প্রদান করা হয়।',
    faq1Q: 'আমার সোনার অলংকারের উপর কীভাবে যাকাত হিসাব করব?',
    faq1A: 'সাড়ে সাত ভরি স্বর্ণ বা সমমূল্যের উদ্বৃত্ত সম্পদ থাকলে বর্তমান বাজারদরে ২.৫% যাকাত প্রযোজ্য হবে।',
    faq2Q: 'ব্যবসায়িক পণ্যের যাকাত কীভাবে নির্ধারিত হয়?',
    faq2A: 'বছরের শেষে অবিক্রিত পণ্যের পাইকারি ক্রয়মূল্য এবং চলতি দেনা বাদ দিয়ে অবশিষ্টের উপর ২.৫% যাকাত দিতে হয়।',
  },
  gallery: {
    pageBadge: 'VERIFIED FIELD DISPATCHES & HIGH-RES MEDIA',
    pageTitle: 'মাঠপর্যায়ের কাজের আলোকচিত্র গ্যালারি',
    pageSubtitle: 'বন্যাদুর্গত অঞ্চল, রেলওয়ে স্লাম ও প্রত্যন্ত চরে আমাদের স্বেচ্ছাসেবকদের সেবামূলক কর্মকাণ্ড।',
    filterAll: 'সকল চিত্র',
    filterFood: 'খাদ্য বিতরণ',
    filterWater: 'বিশুদ্ধ সুপেয় পানি',
    filterOrphan: 'এতিম শিশু কল্যাণ',
    filterShelter: 'ঘর নির্মাণ ও পুনর্বাসন',
    bottomNotice: 'সকল আলোকচিত্র ফাউন্ডেশনের ফিল্ড অফিসার ও ভলান্টিয়ারদের দ্বারা সংগৃহীত।',
  },
  volunteer: {
    pageBadge: 'BECOME A HUMANITARIAN AMBASSADOR',
    pageTitle: 'আমাদের স্বেচ্ছাসেবক পরিবারের অংশ হোন',
    pageSubtitle: 'আপনার মেধা, সময় ও মানবিক আবেগকে কাজে লাগিয়ে আর্তমানবতার পাশে দাঁড়ান।',
    formHeading: 'স্বেচ্ছাসেবক নিবন্ধন ফরম',
    formSubheading: 'নিচের প্রয়োজনীয় তথ্যসমূহ পূরণ করে আজই যুক্ত হোন আমাদের দেশব্যাপী স্বেচ্ছাসেবী টিমে।',
    joinRequirement: 'ন্যূনতম বয়স ১৮ বছর, সততা ও মানবিক সেবায় নিবেদিতপ্রাণ মনোভাব।',
    benefit1: 'মাঠপর্যায়ে সরাসরি আর্তমানবতার সেবার অনন্য সুযোগ',
    benefit2: 'অফিসিয়াল স্বেচ্ছাসেবা সনদপত্র ও লিডারশিপ অভিজ্ঞতা',
    benefit3: 'জাতীয় দুর্যোগ ব্যবস্থাপনা ও ফার্স্ট এইড ট্রেনিং',
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

const STORAGE_KEY = 'gmcf:site_cms_v2';

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
    return {
      cms: DEFAULT_CMS_CONTENT,
      updatePageContent: () => {},
      resetPageContent: () => {},
      isSaving: false,
    };
  }
  return context;
}
