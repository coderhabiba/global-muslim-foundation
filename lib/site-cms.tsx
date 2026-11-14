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
  | 'volunteer'
  | 'appeals'
  | 'news';

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
    // 3 Hero Metric Value Badges
    heroBadge1Value?: string;
    heroBadge1Label?: string;
    heroBadge2Value?: string;
    heroBadge2Label?: string;
    heroBadge3Value?: string;
    heroBadge3Label?: string;
    // 4 Green Impact Banner Metrics
    bannerStat1Value?: string;
    bannerStat1Title?: string;
    bannerStat1Desc?: string;
    bannerStat2Value?: string;
    bannerStat2Title?: string;
    bannerStat2Desc?: string;
    bannerStat3Value?: string;
    bannerStat3Title?: string;
    bannerStat3Desc?: string;
    bannerStat4Value?: string;
    bannerStat4Title?: string;
    bannerStat4Desc?: string;
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
    // Volunteer section in Home page
    volunteerSectionBadge?: string;
    volunteerSectionTitle?: string;
    volunteerCount?: string;
    volunteerCountLabel?: string;
    volunteerSubtext?: string;
    // Transformation Story Spotlight in Home Page
    storySectionBadge?: string;
    storySectionTitle?: string;
    storySectionSubtitle?: string;
    story1Tag?: string;
    story1Location?: string;
    story1Title?: string;
    story1Desc?: string;
    story1Image?: string;
    story2Title?: string;
    story2Desc?: string;
    story2Image?: string;
  };
  about: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    statZakatRatio: string;
    statAdminCost: string;
    statFamiliesUplifted: string;
    statAuditRating: string;
    // Story Response & Field Volunteer Metrics
    storyResponseTime?: string;
    storyResponseDesc?: string;
    storyVolunteerCount?: string;
    storyVolunteerDesc?: string;
    pillarTitle: string;
    pillarSubtitle: string;
    // 4 Foundational Pillars
    pillar1Title?: string;
    pillar1Desc?: string;
    pillar1Feature?: string;
    pillar2Title?: string;
    pillar2Desc?: string;
    pillar2Feature?: string;
    pillar3Title?: string;
    pillar3Desc?: string;
    pillar3Feature?: string;
    pillar4Title?: string;
    pillar4Desc?: string;
    pillar4Feature?: string;
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
    // 3 Global Registered Offices
    office1Title?: string;
    office1City?: string;
    office1Address?: string;
    office1Phone?: string;
    office1Email?: string;
    office2Title?: string;
    office2City?: string;
    office2Address?: string;
    office2Phone?: string;
    office2Email?: string;
    office3Title?: string;
    office3City?: string;
    office3Address?: string;
    office3Phone?: string;
    office3Email?: string;
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
    // Live Metric Bar (4 Stats)
    stat1Value?: string;
    stat1Title?: string;
    stat1Desc?: string;
    stat2Value?: string;
    stat2Title?: string;
    stat2Desc?: string;
    stat3Value?: string;
    stat3Title?: string;
    stat3Desc?: string;
    stat4Value?: string;
    stat4Title?: string;
    stat4Desc?: string;
    formHeading: string;
    formSubheading: string;
    joinRequirement: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    contactNotice: string;
  };
  appeals: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
  };
  news: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
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
    heroTitle: 'মানবতার সেবায় নিবেদিত বিশ্বস্ত হাত — সহানুভূতি ও দায়িত্বশীলতা',
    heroSubtitle: 'জরুরি খাদ্য সহায়তা, শিশুদের অস্ত্রোপচার সেবা এবং টেকসই যাকাতভিত্তিক ক্ষমতায়ন কর্মসূচির মাধ্যমে বাংলাদেশ ও তার বাইরের অসহায় জনগোষ্ঠীর জীবন বদলে দেওয়া।',
    heroPrimaryBtn: 'অনলাইন অনুদান দিন',
    heroSecondaryBtn: 'আমাদের কার্যক্রম দেখুন',
    heroBgImage: '/images/hero-relief.jpg',
    // 3 Hero Metric Value Badges
    heroBadge1Value: '০',
    heroBadge1Label: 'পুষ্টিকর খাবার পরিবেশন',
    heroBadge2Value: '০',
    heroBadge2Label: 'শিশু অস্ত্রোপচার ও সেবা',
    heroBadge3Value: '100%',
    heroBadge3Label: 'শরিয়াহ যাকাত নীতি',
    // 4 Green Impact Banner Metrics
    bannerStat1Value: '০',
    bannerStat1Title: 'খাবার বিতরণ',
    bannerStat1Desc: 'রেললাইন ও শহরের বস্তি',
    bannerStat2Value: '০',
    bannerStat2Title: 'শিশুদের চিকিৎসা',
    bannerStat2Desc: 'শিশু অস্ত্রোপচার ও ওষুধ',
    bannerStat3Value: '০',
    bannerStat3Title: 'বিশুদ্ধ পানির নলকূপ ও টয়লেট',
    bannerStat3Desc: 'গভীর ভূগর্ভস্থ পানি ও স্বাস্থ্যবিধি কেন্দ্র',
    bannerStat4Value: '100%',
    bannerStat4Title: 'শরিয়াহ বোর্ড কর্তৃক যাচাইকৃত',
    bannerStat4Desc: 'যাকাত থেকে শূন্য ওভারহেড কাটা হয়',
    statsDonors: '০',
    statsProjects: '০',
    statsBeneficiaries: '০',
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
    // Volunteer section in Home page
    volunteerSectionBadge: 'কমিউনিটি ও সমাজকল্যাণ',
    volunteerSectionTitle: 'আমাদের নিবেদিত তরুণ স্বেচ্ছাসেবক পরিবারে যুক্ত হোন',
    volunteerCount: '০',
    volunteerCountLabel: 'সক্রিয় তরুণ',
    volunteerSubtext: 'সম্মুখসারির নিবেদিত স্বেচ্ছাসেবী',
    // Transformation Story Spotlight in Home Page
    storySectionBadge: 'মাঠপর্যায়ের বাস্তব রূপান্তরের গল্প',
    storySectionTitle: 'বাস্তব জীবন রূপান্তর: মা ও সন্তানের পুনর্মিলন',
    storySectionSubtitle: 'আপনার প্রতিটি অনুদান শুধু একটি পরিসংখ্যান নয়—এটি জীবন বাঁচায়, হারিয়ে যাওয়া শিশুদের ঘরে ফেরায় এবং অসহায় পরিবারগুলোকে আশার আলো দেখায়।',
    story1Tag: 'পারিবারিক পুনর্মিলন ও শিশু কল্যাণ',
    story1Location: 'তেজগাঁও কমিউনিটি সেন্টার • প্রশাসন কর্তৃক যাচাইকৃত',
    story1Title: '"বাদশাহকে তার মায়ের পরম স্নেহে ফিরিয়ে আনা" — সহানুভূতির এক বাস্তব অলৌকিক ঘটনা',
    story1Desc: 'রেলওয়ে টার্মিনালের কাছে অসহায় অবস্থায় ঘুরে বেড়ানো ৮ বছর বয়সী বাদশাহকে আমাদের টিম পরম যত্নে উদ্ধার করে। ২১ দিনের নিবিড় তদন্তের পর তাকে মায়ের অশ্রুসজল চোখে কোলে ফিরিয়ে দেওয়া হয়।',
    story1Image: '/images/badshah-reunion.jpg',
    story2Title: 'সাইফানের সুস্থতা ও নতুন জীবনের যাত্রা',
    story2Desc: 'চরম দারিদ্র্যের মাঝে মারাত্মক স্বাস্থ্যঝুঁকিতে থাকা শিশু সাইফানকে দেওয়া হয়েছে জরুরি পেডিয়াট্রিক সার্জারি ও পুষ্টি সেবা।',
    story2Image: '/images/pediatric-hope-saifan.jpg',
  },
  about: {
    pageBadge: 'পবিত্র আমানতের ভিত্তিতে প্রতিষ্ঠিত • নিবন্ধিত দাতব্য সংস্থা #1184930',
    pageTitle: 'নিষ্ঠাবান দায়িত্বশীলতা। পূর্ণ স্বচ্ছতা। মর্যাদাপূর্ণ মানবিক কাজ।',
    pageSubtitle: 'শূন্য-ওভারহেড যাকাত বিতরণ, যাচাইকৃত তামলিক মালিকানা এবং টেকসই দারিদ্র্য বিমোচনের মাধ্যমে বাংলাদেশ ও তার বাইরের দুস্থ, এতিম ও দুর্যোগকবলিত পরিবারগুলোর জীবিকা উন্নয়নে প্রতিশ্রুতিবদ্ধ।',
    statZakatRatio: '১০০% যাকাত বণ্টন',
    statAdminCost: '৳০ কোনো প্রশাসনিক কর্তন নেই',
    statFamiliesUplifted: '০ পরিবার স্বাবলম্বী',
    statAuditRating: 'গ্রেড এ স্বাধীন সিএ অডিট',
    // Story Response & Field Volunteer Metrics
    storyResponseTime: '৪৮ ঘণ্টা',
    storyResponseDesc: 'ঘূর্ণিঝড় ও বন্যা দুর্যোগে সর্বোচ্চ রেসপন্স সময়',
    storyVolunteerCount: '০',
    storyVolunteerDesc: 'সারাদেশের ৬৪ জেলায় সক্রিয় তরুণ স্বেচ্ছাসেবক',
    pillarTitle: 'আমানতদারিতা ও স্বচ্ছতার চার স্তম্ভ',
    pillarSubtitle: 'আমাদের সকল কার্যক্রমের মূলভিত্তি ইসলামী শরীয়াহ ও পূর্ণ জবাবদিহিতা।',
    // 4 Foundational Pillars
    pillar1Title: 'শরীয়াহ সততা ও বিশ্বস্ততা (Shariah Integrity)',
    pillar1Desc: 'প্রতিটি যাকাত ও সদকাহ তহবিল সুনির্দিষ্ট শরীয়াহ নীতিমালায় ১০০% বিশ্বস্ততার সাথে সরাসরি হকদারদের কাছে পৌঁছানো হয়।',
    pillar1Feature: 'স্বতন্ত্র শরীয়াহ বোর্ড অনুমোদিত',
    pillar2Title: 'মর্যাদা ও পূর্ণ তামলিক (Dignity & Tamleek)',
    pillar2Desc: 'সহায়তা প্রদানের ক্ষেত্রে সুবিধাভোগীদের সম্মান রক্ষা এবং প্রত্যক্ষ মালিকানা নিশ্চিত করা আমাদের প্রধান নীতি।',
    pillar2Feature: 'প্রত্যক্ষ সম্পদ হস্তান্তর নীতিমালা',
    pillar3Title: 'মাঠপর্যায়ে কঠোর যাচাই (Ground-Truth Verification)',
    pillar3Desc: 'প্রতিটি বিতরণ কার্যক্রম জিও-ট্যাগ ছবি, জাতীয় পরিচয়পত্র যাচাই এবং স্বচ্ছ মাস্টাররোলের মাধ্যমে নথিবদ্ধ করা হয়।',
    pillar3Feature: 'জিপিএস সময়-চিহ্নিত অডিট রেকর্ড',
    pillar4Title: 'স্বাধীন প্রশাসন ও জিরো-ওভারহেড (Radical Stewardship)',
    pillar4Desc: 'সকল প্রশাসনিক ও অপারেশনাল ব্যয় স্বতন্ত্র প্রাতিষ্ঠানিক তহবিল থেকে নির্বাহ করা হয়—সাধারণ অনুদান শতভাগ মাঠেই যায়।',
    pillar4Feature: '১০০% জিরো-প্রশাসনিক কর্তন গ্যারান্টি',
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
    // 3 Global Registered Offices
    office1Title: 'প্রধান কার্যালয় (Principal Head Office)',
    office1City: 'সাভার, ঢাকা (বাংলাদেশ)',
    office1Address: 'House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh',
    office1Phone: '01913119525',
    office1Email: 'gmcfoundation2022@gmail.com',
    office2Title: 'যুক্তরাজ্য লিয়াজোঁ (UK Statutory Reg)',
    office2City: 'লন্ডন, যুক্তরাজ্য',
    office2Address: '104 Whitechapel High St, London E1 7PT, United Kingdom',
    office2Phone: '+44 20 7946 0912',
    office2Email: 'uk@gmcfoundation.org',
    office3Title: 'উত্তর আমেরিকা প্রতিনিধি (USA Liaison)',
    office3City: 'নিউ ইয়র্ক, যুক্তরাষ্ট্র',
    office3Address: 'Jackson Heights, Queens, NY 11372, United States',
    office3Phone: '+1 718 555 0194',
    office3Email: 'usa@gmcfoundation.org',
  },
  sponsor_orphan: {
    pageBadge: 'রাসূলুল্লাহ (ﷺ) এর সুন্নাহ — এতিম ও দুস্থ শিশুর অভিভাবকত্ব',
    pageTitle: 'একটি দুস্থ শিশুর মুখে হাসি ফোটান, জান্নাতে রাসূল (ﷺ)-এর সঙ্গী হোন',
    pageSubtitle: 'হাদিস শরিফে এসেছে: "আমি এবং এতিমের প্রতিপালনকারী জান্নাতে এভাবে থাকব" (তর্জনী ও মধ্যমা আঙুল একত্র করে দেখালেন) — সহিহ বুখারি। আপনার সামান্য মাসিক সহায়তা একটি অসহায় শিশুর সমগ্র ভবিষ্যৎ বদলে দিতে পারে।',
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
    pageBadge: 'স্থায়ী সদকায়ে জারিয়াহ ও ভবিষ্যৎ মানবিক কর্মপরিকল্পনা',
    pageTitle: 'আমাদের আসন্ন প্রকল্পসমূহ — চিরস্থায়ী কল্যাণের পথে অংশীদার হোন',
    pageSubtitle: 'সাময়িক ত্রাণের পাশাপাশি প্রান্তিক মানুষের ভাগ্য চিরতরে বদলে দিতে GMCF গ্রহণ করেছে দীর্ঘমেয়াদী স্থায়ী অবকাঠামো প্রকল্প। আপনার যাকাত, দান ও সদকায়ে জারিয়াহ দিয়ে এই মহতী উদ্যোগগুলোতে শরিক হোন।',
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
    pageBadge: 'মাঠপর্যায়ে বাস্তবায়িত ও চলমান মানবিক প্রকল্পসমূহ • শতভাগ শরীয়াহ নিরীক্ষিত',
    pageTitle: 'আমাদের প্রজেক্ট সমূহ — মানবতার কল্যাণে স্থায়ী পরিবর্তন',
    pageSubtitle: 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)-এর প্রতিটি প্রজেক্ট সরাসরি প্রান্তিক মানুষের জীবনে টেকসই পরিবর্তন আনে। গৃহহীনদের নিরাপদ টিনের ঘর, ক্ষুধার্তদের ওয়ান মিল ওয়ান হোপ, চোখের আলো ফিরিয়ে দেওয়া কিংবা সুপেয় পানি—আপনার প্রতিটি অনুদান পৌঁছে যায় নির্ধারিত খাতে।',
    waterWellsCount: '০',
    waterWellsLabel: 'সুপেয় পানির নলকূপ',
    mealsDelivered: '০',
    mealsDeliveredLabel: 'খাবার প্যাকেট বিতরণ',
    familiesRehabilitated: '০',
    familiesRehabilitatedLabel: 'পুনর্বাসিত পরিবার',
    healthcareProvided: '০',
    orphansSupported: '০',
    districtsCovered: '০',
    districtsCoveredLabel: 'জেলা কভারেজ',
    summaryHeading: 'শতভাগ স্বচ্ছতা ও চার্টার্ড একাউন্ট্যান্ট অডিট',
    summaryText: 'প্রতিটি অনুদানের ব্যাংক স্টেটমেন্ট, ভাউচার ও ভিডিও প্রমাণাদি দাতাদের কাছে উন্মুক্ত রাখা হয়।',
    reportDownloadTitle: 'বাৎসরিক অডিট রিপোর্ট ডাউনলোড করুন (PDF)',
  },
  zakat_calculator: {
    pageBadge: '100% যাকাত নীতি নিশ্চিত',
    pageTitle: 'আপনার সম্পদ পবিত্র করুন — পূর্ণ শরিয়াহ নিষ্ঠার সাথে',
    pageSubtitle: 'আপনার যাকাতের প্রতিটি পয়সা শূন্য পরিচালন ও প্রশাসনিক কর্তনীতে যাচাইকৃত আসনাফ পরিবারগুলোর কাছে পৌঁছে। যোগ্য আলেমদের তত্ত্বাবধান, স্বতন্ত্র নিরীক্ষা এবং মানুষের মর্যাদা রক্ষায় সরাসরি হস্তান্তর।',
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
    pageBadge: 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — ফিল্ড ফটো গ্যালারি',
    pageTitle: 'মানবতার সেবায় আমাদের মাঠপর্যায়ের স্থিরচিত্র',
    pageSubtitle: 'আপনার প্রতিটি যাকাত ও সাদাকাহ কীভাবে অভাবী মানুষের জীবনে আশার আলো জ্বালাচ্ছে — প্রকল্পভিত্তিক গ্যালারি এবং সহায়তাপ্রাপ্ত মানুষদের বাস্তব স্লাইডারে সরাসরি দেখুন।',
    filterAll: 'সকল চিত্র',
    filterFood: 'খাদ্য বিতরণ',
    filterWater: 'বিশুদ্ধ সুপেয় পানি',
    filterOrphan: 'এতিম শিশু কল্যাণ',
    filterShelter: 'ঘর নির্মাণ ও পুনর্বাসন',
    bottomNotice: 'সকল আলোকচিত্র ফাউন্ডেশনের ফিল্ড অফিসার ও ভলান্টিয়ারদের দ্বারা সংগৃহীত।',
  },
  volunteer: {
    pageBadge: 'সম্মুখসারির মানবিক কাজ • স্বেচ্ছাসেবক টিমে যোগ দিন',
    pageTitle: 'সংকটে থাকা জনগোষ্ঠীর পথপ্রদর্শক আলো হয়ে উঠুন',
    pageSubtitle: 'ব্যস্ত রেল প্ল্যাটফর্মে পুষ্টিকর গরম খাবার পরিবেশন, বন্যাপ্রবণ এলাকায় জরুরি কম্বল বিতরণ বা শিশু চক্ষু ক্যাম্প সার্জনদের সহায়তা—আপনার সময় ও শ্রম বিশ্বাসকে বাস্তব উদ্ধারে রূপান্তরিত করে।',
    stat1Value: '০',
    stat1Title: 'সক্রিয় তরুণ স্বেচ্ছাসেবক',
    stat1Desc: 'বিশ্ববিদ্যালয় ও স্থানীয় যুব ক্লাব',
    stat2Value: '০',
    stat2Title: 'মাঠ মোতায়েন',
    stat2Desc: 'সক্রিয় ত্রাণ অভিযান (2024-25)',
    stat3Value: '০',
    stat3Title: 'আঞ্চলিক বিতরণ কেন্দ্র',
    stat3Desc: 'বাংলাদেশের 64 জেলায় ছড়িয়ে আছে',
    stat4Value: '100%',
    stat4Title: 'প্রত্যয়িত নিরাপত্তা প্রশিক্ষণ',
    stat4Desc: 'শরীয়াহ স্বেচ্ছাসেবী নীতি ও ফার্স্ট এইড',
    formHeading: 'স্বেচ্ছাসেবক নিবন্ধন ফরম',
    formSubheading: 'নিচের প্রয়োজনীয় তথ্যসমূহ পূরণ করে আজই যুক্ত হোন আমাদের দেশব্যাপী স্বেচ্ছাসেবী টিমে।',
    joinRequirement: 'ন্যূনতম বয়স ১৮ বছর, সততা ও মানবিক সেবায় নিবেদিতপ্রাণ মনোভাব।',
    benefit1: 'মাঠপর্যায়ে সরাসরি আর্তমানবতার সেবার অনন্য সুযোগ',
    benefit2: 'অফিসিয়াল স্বেচ্ছাসেবা সনদপত্র ও লিডারশিপ অভিজ্ঞতা',
    benefit3: 'জাতীয় দুর্যোগ ব্যবস্থাপনা ও ফার্স্ট এইড ট্রেনিং',
    contactNotice: 'আবেদন জমার পর আমাদের কোঅর্ডিনেশন টিম ৭ কার্যদিবসের মধ্যে যোগাযোগ করবে।',
  },
  appeals: {
    pageBadge: 'যাচাইকৃত ফিল্ড অপারেশন • ১০০% সরাসরি বিতরণ',
    pageTitle: 'আমাদের চলমান মানবিক আবেদন ও জরুরি ফান্ডসমূহ',
    pageSubtitle: 'আপনার যাকাত ও সদকাহ পৌঁছে দিন চরম সংকটে থাকা অপুষ্টিতে ভোগা শিশু, বিধবা পরিবার, গভীর নলকূপ স্থাপন ও জরুরি সার্জারি কার্যক্রমে।',
    stat1Value: '100%',
    stat1Label: 'যাকাত গ্যারান্টি • জিরো অ্যাডমিন কাট',
    stat2Value: '০',
    stat2Label: 'সরাসরি সহায়তাপ্রাপ্ত ও আশ্রয়প্রাপ্ত',
  },
  news: {
    pageBadge: 'ফিল্ড নিউজ ও মানবিক ডিসপ্যাচ',
    pageTitle: 'সরাসরি মাঠপর্যায়ের প্রতিবেদন ও মানবিক খবর',
    pageSubtitle: 'মাঠপর্যায়ে ত্রাণ বিতরণ, আর্সেনিকমুক্ত নলকূপ স্থাপন এবং এতিম প্রতিপালন কার্যক্রমের সরাসরি খবরাখবর ও স্বচ্ছ চিত্র।',
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
        if (parsed.impact) {
          const MOCK_STRINGS = new Set([
            '১৮৫+',
            '১৮৫+ গভীর নলকূপ স্থাপন',
            '১,৮৫০+',
            '1,850+',
            '৭৫,০০০+',
            '৭৫,০০০+ প্যাকেট খাদ্য বিতরণ',
            '১,৮০,০০০+',
            '180,000+',
            '১২০+',
            '১২০+ গৃহহীন পরিবার পুনর্বাসন',
            '৬৫০+',
            '650+',
            '২৮টি',
            '২৮টি জেলায় সরাসরি ফিল্ড অপারেশন',
            '28',
            '28টি',
            '৮,৫০০+',
            '৮,৫০০+ সুবিধাবঞ্চিতদের বিনামূল্যে চিকিৎসা',
            '৩৫০+',
            '৩৫০+ এতিম শিশু সরাসরি প্রতিপালন',
          ]);
          if (MOCK_STRINGS.has(parsed.impact.waterWellsCount)) parsed.impact.waterWellsCount = '০';
          if (MOCK_STRINGS.has(parsed.impact.mealsDelivered)) parsed.impact.mealsDelivered = '০';
          if (MOCK_STRINGS.has(parsed.impact.familiesRehabilitated)) parsed.impact.familiesRehabilitated = '০';
          if (MOCK_STRINGS.has(parsed.impact.districtsCovered)) parsed.impact.districtsCovered = '০';
          if (MOCK_STRINGS.has(parsed.impact.healthcareProvided)) parsed.impact.healthcareProvided = '০';
          if (MOCK_STRINGS.has(parsed.impact.orphansSupported)) parsed.impact.orphansSupported = '০';
          if (
            !parsed.impact.pageBadge ||
            parsed.impact.pageBadge === 'FIELD AUDITED RESULTS • 100% ACCOUNTABILITY'
          ) {
            parsed.impact.pageBadge = 'মাঠপর্যায়ে বাস্তবায়িত ও চলমান মানবিক প্রকল্পসমূহ • শতভাগ শরীয়াহ নিরীক্ষিত';
          }
          if (
            !parsed.impact.pageTitle ||
            parsed.impact.pageTitle === 'আমাদের কার্যক্রমের প্রভাব ও অগ্রগতি'
          ) {
            parsed.impact.pageTitle = 'আমাদের প্রজেক্ট সমূহ — মানবতার কল্যাণে স্থায়ী পরিবর্তন';
          }
          if (
            !parsed.impact.pageSubtitle ||
            parsed.impact.pageSubtitle === 'মাঠপর্যায়ে বাস্তবায়িত প্রতিটি প্রকল্পের বাস্তব ফলাফল, পরিসংখ্যান ও সংখ্যাগত অগ্রগতি।'
          ) {
            parsed.impact.pageSubtitle =
              'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)-এর প্রতিটি প্রজেক্ট সরাসরি প্রান্তিক মানুষের জীবনে টেকসই পরিবর্তন আনে। গৃহহীনদের নিরাপদ টিনের ঘর, ক্ষুধার্তদের ওয়ান মিল ওয়ান হোপ, চোখের আলো ফিরিয়ে দেওয়া কিংবা সুপেয় পানি—আপনার প্রতিটি অনুদান পৌঁছে যায় নির্ধারিত খাতে।';
          }
        }
        if (parsed.home) {
          if (parsed.home.heroTitle === 'মানবতার সেবায় নিবেদিত বিশ্বস্ত হাত') {
            parsed.home.heroTitle = 'মানবতার সেবায় নিবেদিত বিশ্বস্ত হাত — সহানুভূতি ও দায়িত্বশীলতা';
          }
          if (
            !parsed.home.heroSubtitle ||
            parsed.home.heroSubtitle ===
              'ক্ষুধার্তের মুখে খাবার, বিশুদ্ধ পানি ও সুবিধাবঞ্চিত এতিম শিশুদের উজ্জ্বল ভবিষ্যৎ গড়তে আপনার যাকাত ও সদকা পৌঁছে দিন সরাসরি মানুষের কাছে।'
          ) {
            parsed.home.heroSubtitle =
              'জরুরি খাদ্য সহায়তা, শিশুদের অস্ত্রোপচার সেবা এবং টেকসই যাকাতভিত্তিক ক্ষমতায়ন কর্মসূচির মাধ্যমে বাংলাদেশ ও তার বাইরের অসহায় জনগোষ্ঠীর জীবন বদলে দেওয়া।';
          }
          const HOME_MOCK_VALS = new Set(['120,000+', '8,400+', '350+', '12,500+ দাতা', '৪৮+ সফল প্রকল্প', '১,৫০,০০০+ উপকৃত']);
          if (HOME_MOCK_VALS.has(parsed.home.heroBadge1Value)) parsed.home.heroBadge1Value = '০';
          if (HOME_MOCK_VALS.has(parsed.home.heroBadge2Value)) parsed.home.heroBadge2Value = '০';
          if (HOME_MOCK_VALS.has(parsed.home.bannerStat1Value)) parsed.home.bannerStat1Value = '০';
          if (HOME_MOCK_VALS.has(parsed.home.bannerStat2Value)) parsed.home.bannerStat2Value = '০';
          if (HOME_MOCK_VALS.has(parsed.home.bannerStat3Value)) parsed.home.bannerStat3Value = '০';
          if (HOME_MOCK_VALS.has(parsed.home.statsDonors)) parsed.home.statsDonors = '০';
          if (HOME_MOCK_VALS.has(parsed.home.statsProjects)) parsed.home.statsProjects = '০';
          if (HOME_MOCK_VALS.has(parsed.home.statsBeneficiaries)) parsed.home.statsBeneficiaries = '০';
          if (parsed.home.volunteerCount === '850+' || parsed.home.volunteerCount === '৮৫০+') parsed.home.volunteerCount = '০';
          if (!parsed.home.volunteerCount) parsed.home.volunteerCount = '০';
          if (parsed.home.volunteerSectionTitle && parsed.home.volunteerSectionTitle.includes('850+')) {
            parsed.home.volunteerSectionTitle = 'আমাদের নিবেদিত তরুণ স্বেচ্ছাসেবক পরিবারে যুক্ত হোন';
          }
        }
        if (parsed.about) {
          if (
            !parsed.about.pageBadge ||
            parsed.about.pageBadge === 'ESTABLISHED WITH SACRED TRUST • REGISTERED NGO'
          ) {
            parsed.about.pageBadge = 'পবিত্র আমানতের ভিত্তিতে প্রতিষ্ঠিত • নিবন্ধিত দাতব্য সংস্থা #1184930';
          }
          if (
            !parsed.about.pageTitle ||
            parsed.about.pageTitle === 'আমাদের লক্ষ্য, ভিশন ও প্রাতিষ্ঠানিক ইতিহাস'
          ) {
            parsed.about.pageTitle = 'নিষ্ঠাবান দায়িত্বশীলতা। পূর্ণ স্বচ্ছতা। মর্যাদাপূর্ণ মানবিক কাজ।';
          }
          if (
            !parsed.about.pageSubtitle ||
            parsed.about.pageSubtitle === 'একটি ক্ষুধামুক্ত, স্বাবলম্বী ও ন্যায়ভিত্তিক মানবিক সমাজ গড়ার আজীবন প্রত্যয়।'
          ) {
            parsed.about.pageSubtitle =
              'শূন্য-ওভারহেড যাকাত বিতরণ, যাচাইকৃত তামলিক মালিকানা এবং টেকসই দারিদ্র্য বিমোচনের মাধ্যমে বাংলাদেশ ও তার বাইরের দুস্থ, এতিম ও দুর্যোগকবলিত পরিবারগুলোর জীবিকা উন্নয়নে প্রতিশ্রুতিবদ্ধ।';
          }
          if (parsed.about.statFamiliesUplifted === '১৮,৪০০+ পরিবার স্বাবলম্বী' || parsed.about.statFamiliesUplifted === '18,400+') {
            parsed.about.statFamiliesUplifted = '০ পরিবার স্বাবলম্বী';
          }
          if (parsed.about.storyVolunteerCount === '১,২০০+' || parsed.about.storyVolunteerCount === '1,200+') {
            parsed.about.storyVolunteerCount = '০';
          }
          if (!parsed.about.storyVolunteerCount) {
            parsed.about.storyVolunteerCount = '০';
          }
          if (!parsed.about.storyResponseTime) {
            parsed.about.storyResponseTime = '৪৮ ঘণ্টা';
          }
          if (!parsed.about.storyResponseDesc) {
            parsed.about.storyResponseDesc = 'ঘূর্ণিঝড় ও বন্যা দুর্যোগে সর্বোচ্চ রেসপন্স সময়';
          }
          if (!parsed.about.storyVolunteerDesc) {
            parsed.about.storyVolunteerDesc = 'সারাদেশের ৬৪ জেলায় সক্রিয় তরুণ স্বেচ্ছাসেবক';
          }
        }
        if (parsed.sponsor_orphan) {
          if (!parsed.sponsor_orphan.pageBadge || parsed.sponsor_orphan.pageBadge === 'SPONSOR A VULNERABLE CHILD • SADQA JARIYAH') {
            parsed.sponsor_orphan.pageBadge = 'রাসূলুল্লাহ (ﷺ) এর সুন্নাহ — এতিম ও দুস্থ শিশুর অভিভাবকত্ব';
          }
          if (!parsed.sponsor_orphan.pageTitle || parsed.sponsor_orphan.pageTitle === 'একটি এতিম শিশুর অভিভাবক হোন') {
            parsed.sponsor_orphan.pageTitle = 'একটি দুস্থ শিশুর মুখে হাসি ফোটান, জান্নাতে রাসূল (ﷺ)-এর সঙ্গী হোন';
          }
          if (!parsed.sponsor_orphan.pageSubtitle || parsed.sponsor_orphan.pageSubtitle === 'আপনার সামান্য ভালোবাসায় বদলে যেতে পারে একজন এতিম শিশুর ভবিষ্যৎ ও আখিরাত।') {
            parsed.sponsor_orphan.pageSubtitle =
              'হাদিস শরিফে এসেছে: "আমি এবং এতিমের প্রতিপালনকারী জান্নাতে এভাবে থাকব" (তর্জনী ও মধ্যমা আঙুল একত্র করে দেখালেন) — সহিহ বুখারি। আপনার সামান্য মাসিক সহায়তা একটি অসহায় শিশুর সমগ্র ভবিষ্যৎ বদলে দিতে পারে।';
          }
        }
        if (parsed.upcoming_projects) {
          if (
            !parsed.upcoming_projects.pageBadge ||
            parsed.upcoming_projects.pageBadge === 'STRATEGIC EXPANSION & SUSTAINABLE INFRASTRUCTURE'
          ) {
            parsed.upcoming_projects.pageBadge = 'স্থায়ী সদকায়ে জারিয়াহ ও ভবিষ্যৎ মানবিক কর্মপরিকল্পনা';
          }
          if (
            !parsed.upcoming_projects.pageTitle ||
            parsed.upcoming_projects.pageTitle === 'আসন্ন ও ভবিষ্যত মানবিক প্রকল্পসমূহ'
          ) {
            parsed.upcoming_projects.pageTitle = 'আমাদের আসন্ন প্রকল্পসমূহ — চিরস্থায়ী কল্যাণের পথে অংশীদার হোন';
          }
          if (
            !parsed.upcoming_projects.pageSubtitle ||
            parsed.upcoming_projects.pageSubtitle === 'দূরদর্শী পরিকল্পনার মাধ্যমে দীর্ঘমেয়াদী সামাজিক পরিবর্তন ও স্থায়ী অবকাঠামো নির্মাণ।'
          ) {
            parsed.upcoming_projects.pageSubtitle =
              'সাময়িক ত্রাণের পাশাপাশি প্রান্তিক মানুষের ভাগ্য চিরতরে বদলে দিতে GMCF গ্রহণ করেছে দীর্ঘমেয়াদী স্থায়ী অবকাঠামো প্রকল্প। আপনার যাকাত, দান ও সদকায়ে জারিয়াহ দিয়ে এই মহতী উদ্যোগগুলোতে শরিক হোন।';
          }
        }
        if (parsed.zakat_calculator) {
          if (
            !parsed.zakat_calculator.pageBadge ||
            parsed.zakat_calculator.pageBadge === 'ACCURATE SHARIAH COMPLIANT ZAKAT CALCULATION' ||
            parsed.zakat_calculator.pageBadge === '১০০% যাকাত তামলিক পলিসি'
          ) {
            parsed.zakat_calculator.pageBadge = '100% যাকাত নীতি নিশ্চিত';
          }
          if (
            !parsed.zakat_calculator.pageTitle ||
            parsed.zakat_calculator.pageTitle === 'সহজ ও নির্ভুল শরীয়াহ সম্মত যাকাত ক্যালকুলেটর' ||
            parsed.zakat_calculator.pageTitle === 'আপনার সম্পদ পবিত্র করুন সম্পূর্ণ শরীয়াহ মোতাবেক'
          ) {
            parsed.zakat_calculator.pageTitle = 'আপনার সম্পদ পবিত্র করুন — পূর্ণ শরিয়াহ নিষ্ঠার সাথে';
          }
          if (
            !parsed.zakat_calculator.pageSubtitle ||
            parsed.zakat_calculator.pageSubtitle === 'আপনার বাৎসরিক সঞ্চয়, সোনা, রূপা ও ব্যবসার সম্পদের যাকাত হিসাব করুন নিমেষেই।' ||
            parsed.zakat_calculator.pageSubtitle.includes('আপনার দেওয়া প্রতিটি পয়সা কোনো রকম')
          ) {
            parsed.zakat_calculator.pageSubtitle =
              'আপনার যাকাতের প্রতিটি পয়সা শূন্য পরিচালন ও প্রশাসনিক কর্তনীতে যাচাইকৃত আসনাফ পরিবারগুলোর কাছে পৌঁছে। যোগ্য আলেমদের তত্ত্বাবধান, স্বতন্ত্র নিরীক্ষা এবং মানুষের মর্যাদা রক্ষায় সরাসরি হস্তান্তর।';
          }
        }
        if (parsed.gallery) {
          if (
            !parsed.gallery.pageBadge ||
            parsed.gallery.pageBadge === 'VERIFIED FIELD DISPATCHES & HIGH-RES MEDIA'
          ) {
            parsed.gallery.pageBadge = 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — ফিল্ড ফটো গ্যালারি';
          }
          if (
            !parsed.gallery.pageTitle ||
            parsed.gallery.pageTitle === 'মাঠপর্যায়ের কাজের আলোকচিত্র গ্যালারি'
          ) {
            parsed.gallery.pageTitle = 'মানবতার সেবায় আমাদের মাঠপর্যায়ের স্থিরচিত্র';
          }
          if (
            !parsed.gallery.pageSubtitle ||
            parsed.gallery.pageSubtitle === 'বন্যাদুর্গত অঞ্চল, রেলওয়ে স্লাম ও প্রত্যন্ত চরে আমাদের স্বেচ্ছাসেবকদের সেবামূলক কর্মকাণ্ড।'
          ) {
            parsed.gallery.pageSubtitle =
              'আপনার প্রতিটি যাকাত ও সাদাকাহ কীভাবে অভাবী মানুষের জীবনে আশার আলো জ্বালাচ্ছে — প্রকল্পভিত্তিক গ্যালারি এবং সহায়তাপ্রাপ্ত মানুষদের বাস্তব স্লাইডারে সরাসরি দেখুন।';
          }
        }
        if (parsed.volunteer) {
          if (
            !parsed.volunteer.pageBadge ||
            parsed.volunteer.pageBadge === 'BECOME A HUMANITARIAN AMBASSADOR' ||
            parsed.volunteer.pageBadge.includes('850+')
          ) {
            parsed.volunteer.pageBadge = 'সম্মুখসারির মানবিক কাজ • স্বেচ্ছাসেবক টিমে যোগ দিন';
          }
          if (
            !parsed.volunteer.pageTitle ||
            parsed.volunteer.pageTitle === 'আমাদের স্বেচ্ছাসেবক পরিবারের অংশ হোন' ||
            parsed.volunteer.pageTitle === 'মানবতার দুর্দিনে আপনিও হোন আশার বাতিঘর'
          ) {
            parsed.volunteer.pageTitle = 'সংকটে থাকা জনগোষ্ঠীর পথপ্রদর্শক আলো হয়ে উঠুন';
          }
          if (
            !parsed.volunteer.pageSubtitle ||
            parsed.volunteer.pageSubtitle === 'আপনার মেধা, সময় ও মানবিক আবেগকে কাজে লাগিয়ে আর্তমানবতার পাশে দাঁড়ান।'
          ) {
            parsed.volunteer.pageSubtitle =
              'ব্যস্ত রেল প্ল্যাটফর্মে পুষ্টিকর গরম খাবার পরিবেশন, বন্যাপ্রবণ এলাকায় জরুরি কম্বল বিতরণ বা শিশু চক্ষু ক্যাম্প সার্জনদের সহায়তা—আপনার সময় ও শ্রম বিশ্বাসকে বাস্তব উদ্ধারে রূপান্তরিত করে।';
          }
          const VOL_MOCKS = new Set(['850+', '45', '12']);
          if (!parsed.volunteer.stat1Value || VOL_MOCKS.has(parsed.volunteer.stat1Value)) parsed.volunteer.stat1Value = '০';
          if (!parsed.volunteer.stat1Title) parsed.volunteer.stat1Title = 'সক্রিয় তরুণ স্বেচ্ছাসেবক';
          if (!parsed.volunteer.stat1Desc) parsed.volunteer.stat1Desc = 'বিশ্ববিদ্যালয় ও স্থানীয় যুব ক্লাব';
          if (!parsed.volunteer.stat2Value || VOL_MOCKS.has(parsed.volunteer.stat2Value)) parsed.volunteer.stat2Value = '০';
          if (!parsed.volunteer.stat2Title) parsed.volunteer.stat2Title = 'মাঠ মোতায়েন';
          if (!parsed.volunteer.stat2Desc) parsed.volunteer.stat2Desc = 'সক্রিয় ত্রাণ অভিযান (2024-25)';
          if (!parsed.volunteer.stat3Value || VOL_MOCKS.has(parsed.volunteer.stat3Value)) parsed.volunteer.stat3Value = '০';
          if (!parsed.volunteer.stat3Title) parsed.volunteer.stat3Title = 'আঞ্চলিক বিতরণ কেন্দ্র';
          if (!parsed.volunteer.stat3Desc) parsed.volunteer.stat3Desc = 'বাংলাদেশের 64 জেলায় ছড়িয়ে আছে';
          if (!parsed.volunteer.stat4Value) parsed.volunteer.stat4Value = '100%';
          if (!parsed.volunteer.stat4Title) parsed.volunteer.stat4Title = 'প্রত্যয়িত নিরাপত্তা প্রশিক্ষণ';
          if (!parsed.volunteer.stat4Desc) parsed.volunteer.stat4Desc = 'শরীয়াহ স্বেচ্ছাসেবী নীতি ও ফার্স্ট এইড';
        }
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
          appeals: { ...DEFAULT_CMS_CONTENT.appeals, ...(parsed.appeals || {}) },
          news: { ...DEFAULT_CMS_CONTENT.news, ...(parsed.news || {}) },
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
