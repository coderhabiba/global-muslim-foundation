'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// =========================================================
// TYPE DEFINITIONS
// =========================================================

export type FieldType = 'text' | 'textarea' | 'image' | 'url' | 'number' | 'select';

export interface SectionField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export interface PageSection {
  id: string;             // unique slug e.g. 'hero-banner'
  label: string;          // Bengali display name
  icon: string;           // Material Symbol icon name
  fields: SectionField[]; // List of editable fields
  isCore?: boolean;       // If true, cannot be deleted
  isVisible?: boolean;    // Can be toggled on/off (default true)
  order: number;          // For drag/sort ordering
  isCustom?: boolean;     // User-added custom section
}

export type PageSectionData = Record<string, string>; // fieldKey -> value

export interface PageConfig {
  pageKey: string;
  pageTitle: string;
  pageIcon: string;
  pageUrl: string;
  sections: PageSection[];
}

// =========================================================
// MASTER SECTION SCHEMA — All pages, all sections
// =========================================================

export const PAGE_SECTIONS_SCHEMA: PageConfig[] = [
  // -------------------------------------------------------
  // NAVBAR & FOOTER
  // -------------------------------------------------------
  {
    pageKey: 'header_footer',
    pageTitle: 'ন্যাভবার ও ফুটার',
    pageIcon: 'view_quilt',
    pageUrl: '/',
    sections: [
      {
        id: 'navbar-logo',
        label: 'লোগো ও ব্র্যান্ড পরিচিতি',
        icon: 'image',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'logoImage', label: 'ন্যাভবার লোগো ইমেজ', type: 'image', helpText: 'PNG বা SVG লোগো (পিক্সেল ব্যাকগ্রাউন্ড নেই এমন)' },
          { key: 'footerLogoImage', label: 'ফুটার লোগো ইমেজ', type: 'image', helpText: 'ফুটারে সাদা বা হালকা ব্যাকগ্রাউন্ডের লোগো' },
          { key: 'slogan', label: 'লোগোর নিচের ট্যাগলাইন / স্লোগান', type: 'text', placeholder: '"Your Kindness is someone\'s hope"' },
        ],
      },
      {
        id: 'navbar-menu',
        label: 'ন্যাভবার মেনু লেবেল',
        icon: 'menu',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'navAbout', label: 'মেনু ১ — আমাদের সম্পর্কে', type: 'text' },
          { key: 'navOrphan', label: 'মেনু ২ — দুস্থ শিশু স্পনসর', type: 'text' },
          { key: 'navUpcoming', label: 'মেনু ৩ — আসন্ন প্রকল্প', type: 'text' },
          { key: 'navProjects', label: 'মেনু ৪ — আমাদের প্রজেক্ট', type: 'text' },
          { key: 'navZakat', label: 'মেনু ৫ — যাকাত ক্যালকুলেটর', type: 'text' },
          { key: 'navGallery', label: 'মেনু ৬ — গ্যালারি', type: 'text' },
          { key: 'navVolunteer', label: 'মেনু ৭ — স্বেচ্ছাসেবক', type: 'text' },
          { key: 'navDonateBtn', label: 'অনুদান বাটন টেক্সট', type: 'text' },
        ],
      },
      {
        id: 'footer-contact',
        label: 'ফুটার যোগাযোগ তথ্য',
        icon: 'contact_phone',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'hotline', label: 'হটলাইন নম্বর', type: 'text', placeholder: '01913119525' },
          { key: 'email', label: 'অফিসিয়াল ইমেইল', type: 'text', placeholder: 'gmcfoundation2022@gmail.com' },
          { key: 'address', label: 'কেন্দ্রীয় কার্যালয়ের ঠিকানা', type: 'text' },
          { key: 'chairmanName', label: 'চেয়ারম্যানের নাম', type: 'text' },
          { key: 'registrationNo', label: 'সরকারি নিবন্ধন নম্বর', type: 'text' },
          { key: 'whatsappNumber', label: 'হোয়াটসঅ্যাপ নম্বর', type: 'text' },
        ],
      },
      {
        id: 'footer-social',
        label: 'সোশ্যাল মিডিয়া ও নেটওয়ার্ক লিংক',
        icon: 'share',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'facebookUrl', label: 'ফেসবুক পেজ URL', type: 'url', placeholder: 'https://facebook.com/...' },
          { key: 'youtubeUrl', label: 'ইউটিউব চ্যানেল URL', type: 'url', placeholder: 'https://youtube.com/...' },
          { key: 'whatsappNumber', label: 'হোয়াটসঅ্যাপ নম্বর / লিংক (WhatsApp)', type: 'text', placeholder: '+8801913119525 বা https://wa.me/8801913119525' },
          { key: 'linkedinUrl', label: 'লিংকডইন প্রোফাইল / পেজ URL (LinkedIn)', type: 'url', placeholder: 'https://linkedin.com/company/...' },
          { key: 'instagramUrl', label: 'ইনস্টাগ্রাম URL', type: 'url', placeholder: 'https://instagram.com/...' },
          { key: 'twitterUrl', label: 'টুইটার / X URL', type: 'url', placeholder: 'https://twitter.com/...' },
        ],
      },
      {
        id: 'footer-copyright',
        label: 'ফুটার কপিরাইট',
        icon: 'copyright',
        isCore: true,
        isVisible: true,
        order: 5,
        fields: [
          { key: 'copyrightText', label: 'কপিরাইট টেক্সট', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // HOME PAGE
  // -------------------------------------------------------
  {
    pageKey: 'home',
    pageTitle: '১. হোমপেজ (Home)',
    pageIcon: 'home',
    pageUrl: '/',
    sections: [
      {
        id: 'home-hero',
        label: 'হিরো ব্যানার সেকশন',
        icon: 'panorama',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'heroBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'heroTitle', label: 'মূল শিরোনাম (Heading)', type: 'text' },
          { key: 'heroSubtitle', label: 'সাব-টাইটেল / বিবরণ', type: 'textarea', rows: 3 },
          { key: 'heroBgImage', label: 'হিরো ব্যাকগ্রাউন্ড ইমেজ', type: 'image' },
          { key: 'heroPrimaryBtn', label: 'প্রধান বোতাম (Donate Button)', type: 'text' },
          { key: 'heroSecondaryBtn', label: 'দ্বিতীয় বোতাম (View Projects)', type: 'text' },
        ],
      },
      {
        id: 'home-stats',
        label: 'পরিসংখ্যান ব্যাজ (৪টি মেট্রিক)',
        icon: 'bar_chart',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'statsDonors', label: 'স্ট্যাট ১ — মোট দাতা', type: 'text', placeholder: '১২,৫০০+ দাতা' },
          { key: 'statsProjects', label: 'স্ট্যাট ২ — সফল প্রকল্প', type: 'text', placeholder: '৪৮+ সফল প্রকল্প' },
          { key: 'statsBeneficiaries', label: 'স্ট্যাট ৩ — উপকৃত মানুষ', type: 'text', placeholder: '১,৫০,০০০+ উপকৃত' },
          { key: 'statsTransparency', label: 'স্ট্যাট ৪ — স্বচ্ছতার হার', type: 'text', placeholder: '১০০% স্বচ্ছতা' },
        ],
      },
      {
        id: 'home-appeals',
        label: 'জরুরি আবেদন সেকশন (Urgent Appeals)',
        icon: 'campaign',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'appealTitle', label: 'আবেদন সেকশন শিরোনাম', type: 'text' },
          { key: 'appealSubtitle', label: 'আবেদন সেকশন সাব-টাইটেল', type: 'text' },
        ],
      },
      {
        id: 'home-water',
        label: 'বিশুদ্ধ পানি প্রকল্প সেকশন',
        icon: 'water_drop',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'waterSectionTitle', label: 'পানি প্রকল্প শিরোনাম', type: 'text' },
          { key: 'waterSectionDesc', label: 'পানি প্রকল্প বিবরণ', type: 'textarea', rows: 2 },
          { key: 'waterSectionCost', label: 'নলকূপ প্রতি খরচ', type: 'text', placeholder: '৳৬৫,০০০' },
          { key: 'waterSectionImage', label: 'পানি প্রকল্প ইমেজ', type: 'image' },
        ],
      },
      {
        id: 'home-food',
        label: 'খাদ্য কর্মসূচি সেকশন (One Meal One Hope)',
        icon: 'restaurant',
        isCore: true,
        isVisible: true,
        order: 5,
        fields: [
          { key: 'foodSectionTitle', label: 'খাদ্য প্রকল্প শিরোনাম', type: 'text' },
          { key: 'foodSectionDesc', label: 'খাদ্য প্রকল্প বিবরণ', type: 'textarea', rows: 2 },
          { key: 'foodSectionCost', label: 'খাবার প্রতি খরচ', type: 'text', placeholder: '৳১২০ প্রতি মিল' },
          { key: 'foodSectionImage', label: 'খাদ্য কর্মসূচি ইমেজ', type: 'image' },
        ],
      },
      {
        id: 'home-cta',
        label: 'যাকাত ও অনুদান আহ্বান ব্যানার (CTA)',
        icon: 'volunteer_activism',
        isCore: true,
        isVisible: true,
        order: 6,
        fields: [
          { key: 'ctaBannerTitle', label: 'CTA শিরোনাম', type: 'text' },
          { key: 'ctaBannerDesc', label: 'CTA বিবরণ', type: 'textarea', rows: 2 },
          { key: 'ctaBannerBtn', label: 'CTA বোতাম টেক্সট', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // ABOUT US PAGE
  // -------------------------------------------------------
  {
    pageKey: 'about',
    pageTitle: '২. আমাদের সম্পর্কে (About)',
    pageIcon: 'info',
    pageUrl: '/about',
    sections: [
      {
        id: 'about-header',
        label: 'পেজ শিরোনাম ও পরিচিতি',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ / লেবেল', type: 'text' },
          { key: 'pageTitle', label: 'পেজ শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
          { key: 'bannerImage', label: 'ব্যানার ইমেজ', type: 'image' },
        ],
      },
      {
        id: 'about-stats',
        label: '৪টি অডিট মেট্রিক',
        icon: 'fact_check',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'statZakatRatio', label: 'মেট্রিক ১ — যাকাত বণ্টন', type: 'text' },
          { key: 'statAdminCost', label: 'মেট্রিক ২ — প্রশাসনিক কর্তন', type: 'text' },
          { key: 'statFamiliesUplifted', label: 'মেট্রিক ৩ — পরিবার স্বাবলম্বী', type: 'text' },
          { key: 'statAuditRating', label: 'মেট্রিক ৪ — অডিট রেটিং', type: 'text' },
        ],
      },
      {
        id: 'about-pillars',
        label: 'স্বচ্ছতার চার স্তম্ভ',
        icon: 'foundation',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'pillarTitle', label: 'স্তম্ভ সেকশন শিরোনাম', type: 'text' },
          { key: 'pillarSubtitle', label: 'স্তম্ভ সেকশন সাব-টাইটেল', type: 'text' },
        ],
      },
      {
        id: 'about-mission-vision',
        label: 'মিশন ও ভিশন',
        icon: 'track_changes',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'missionTitle', label: 'মিশন শিরোনাম', type: 'text' },
          { key: 'missionDesc', label: 'মিশন বিবরণ', type: 'textarea', rows: 2 },
          { key: 'visionTitle', label: 'ভিশন শিরোনাম', type: 'text' },
          { key: 'visionDesc', label: 'ভিশন বিবরণ', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'about-registration',
        label: 'সরকারি নিবন্ধন ও আইনগত অনুমোদন',
        icon: 'verified',
        isCore: true,
        isVisible: true,
        order: 5,
        fields: [
          { key: 'regTitle', label: 'নিবন্ধন শিরোনাম', type: 'text' },
          { key: 'regNumber', label: 'নিবন্ধন নম্বর', type: 'text' },
          { key: 'regDetails', label: 'নিবন্ধন বিস্তারিত', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'about-board',
        label: 'পরিচালনা পর্ষদ ও উপদেষ্টা হেডিং',
        icon: 'groups',
        isCore: true,
        isVisible: true,
        order: 6,
        fields: [
          { key: 'boardHeading', label: 'পর্ষদ সেকশন শিরোনাম', type: 'text' },
          { key: 'boardSubheading', label: 'পর্ষদ সেকশন সাব-টাইটেল', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // SPONSOR ORPHAN PAGE
  // -------------------------------------------------------
  {
    pageKey: 'sponsor_orphan',
    pageTitle: '৩. দুস্থ শিশু স্পনসর (Sponsor Child)',
    pageIcon: 'child_care',
    pageUrl: '/sponsor-orphan',
    sections: [
      {
        id: 'orphan-header',
        label: 'পেজ শিরোনাম ও হাদিস',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
          { key: 'hadithQuote', label: 'হাদিসের বাণী', type: 'textarea', rows: 2 },
          { key: 'hadithSource', label: 'হাদিসের উৎস', type: 'text' },
        ],
      },
      {
        id: 'orphan-benefits',
        label: 'স্পনসরশিপ সুবিধা (৪টি)',
        icon: 'star',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'monthlyCostBdt', label: 'মাসিক খরচ (টাকা)', type: 'text' },
          { key: 'benefit1', label: 'সুবিধা ১', type: 'text' },
          { key: 'benefit2', label: 'সুবিধা ২', type: 'text' },
          { key: 'benefit3', label: 'সুবিধা ৩', type: 'text' },
          { key: 'benefit4', label: 'সুবিধা ৪', type: 'text' },
        ],
      },
      {
        id: 'orphan-packages',
        label: 'স্পনসরশিপ প্যাকেজ (৩টি)',
        icon: 'loyalty',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'package1Title', label: 'প্যাকেজ ১ নাম', type: 'text' },
          { key: 'package1Price', label: 'প্যাকেজ ১ মূল্য', type: 'text' },
          { key: 'package2Title', label: 'প্যাকেজ ২ নাম', type: 'text' },
          { key: 'package2Price', label: 'প্যাকেজ ২ মূল্য', type: 'text' },
          { key: 'package3Title', label: 'প্যাকেজ ৩ নাম', type: 'text' },
          { key: 'package3Price', label: 'প্যাকেজ ৩ মূল্য', type: 'text' },
        ],
      },
      {
        id: 'orphan-cta',
        label: 'CTA অনুদান আহ্বান',
        icon: 'favorite',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'ctaHeading', label: 'CTA শিরোনাম', type: 'text' },
          { key: 'ctaSubheading', label: 'CTA সাব-টাইটেল', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // UPCOMING PROJECTS PAGE
  // -------------------------------------------------------
  {
    pageKey: 'upcoming_projects',
    pageTitle: '৪. আসন্ন প্রকল্প (Upcoming)',
    pageIcon: 'construction',
    pageUrl: '/upcoming-projects',
    sections: [
      {
        id: 'upcoming-header',
        label: 'পেজ শিরোনাম',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'upcoming-featured',
        label: 'ফিচার্ড প্রকল্প (মেগা প্রোজেক্ট)',
        icon: 'star_rate',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'featuredProjectTitle', label: 'ফিচার্ড প্রকল্প নাম', type: 'text' },
          { key: 'featuredProjectTarget', label: 'বাজেট লক্ষ্যমাত্রা (৳)', type: 'text' },
          { key: 'featuredProjectDesc', label: 'প্রকল্প বিবরণ', type: 'textarea', rows: 3 },
          { key: 'featuredProjectLocation', label: 'অবস্থান / এলাকা', type: 'text' },
          { key: 'featuredProjectImage', label: 'প্রকল্প ইমেজ', type: 'image' },
        ],
      },
      {
        id: 'upcoming-project2',
        label: 'আসন্ন প্রকল্প ২',
        icon: 'assignment',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'project2Title', label: 'প্রকল্প ২ নাম', type: 'text' },
          { key: 'project2Target', label: 'বাজেট লক্ষ্যমাত্রা (৳)', type: 'text' },
          { key: 'project2Desc', label: 'প্রকল্প বিবরণ', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'upcoming-project3',
        label: 'আসন্ন প্রকল্প ৩',
        icon: 'assignment',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'project3Title', label: 'প্রকল্প ৩ নাম', type: 'text' },
          { key: 'project3Target', label: 'বাজেট লক্ষ্যমাত্রা (৳)', type: 'text' },
          { key: 'project3Desc', label: 'প্রকল্প বিবরণ', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // IMPACT / OUR PROJECTS PAGE
  // -------------------------------------------------------
  {
    pageKey: 'impact',
    pageTitle: '৫. আমাদের প্রজেক্ট (Impact)',
    pageIcon: 'volunteer_activism',
    pageUrl: '/impact',
    sections: [
      {
        id: 'impact-header',
        label: 'পেজ শিরোনাম',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'impact-stats',
        label: 'প্রভাব পরিসংখ্যান মেট্রিক কার্ডসমূহ (Quick Metrics)',
        icon: 'analytics',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'waterWellsCount', label: '১ম কার্ড — সংখ্যা / কাউন্ট', type: 'text', placeholder: '০' },
          { key: 'waterWellsLabel', label: '১ম কার্ড — বিবরণী লেবেল', type: 'text', placeholder: 'সুপেয় পানির নলকূপ' },
          { key: 'mealsDelivered', label: '২য় কার্ড — সংখ্যা / কাউন্ট', type: 'text', placeholder: '০' },
          { key: 'mealsDeliveredLabel', label: '২য় কার্ড — বিবরণী লেবেল', type: 'text', placeholder: 'খাবার প্যাকেট বিতরণ' },
          { key: 'familiesRehabilitated', label: '৩য় কার্ড — সংখ্যা / কাউন্ট', type: 'text', placeholder: '০' },
          { key: 'familiesRehabilitatedLabel', label: '৩য় কার্ড — বিবরণী লেবেল', type: 'text', placeholder: 'পুনর্বাসিত পরিবার' },
          { key: 'districtsCovered', label: '৪র্থ কার্ড — সংখ্যা / কাউন্ট', type: 'text', placeholder: '০' },
          { key: 'districtsCoveredLabel', label: '৪র্থ কার্ড — বিবরণী লেবেল', type: 'text', placeholder: 'জেলা কভারেজ' },
          { key: 'healthcareProvided', label: 'অতিরিক্ত মেট্রিক: বিনামূল্যে চিকিৎসা', type: 'text' },
          { key: 'orphansSupported', label: 'অতিরিক্ত মেট্রিক: এতিম শিশু সহায়তা', type: 'text' },
        ],
      },
      {
        id: 'impact-summary',
        label: 'অডিট সারসংক্ষেপ ও রিপোর্ট',
        icon: 'description',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'summaryHeading', label: 'অডিট সেকশন শিরোনাম', type: 'text' },
          { key: 'summaryText', label: 'অডিট সারসংক্ষেপ', type: 'textarea', rows: 2 },
          { key: 'reportDownloadTitle', label: 'রিপোর্ট ডাউনলোড বাটন টেক্সট', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // ZAKAT CALCULATOR PAGE
  // -------------------------------------------------------
  {
    pageKey: 'zakat_calculator',
    pageTitle: '৬. যাকাত ক্যালকুলেটর (Zakat)',
    pageIcon: 'calculate',
    pageUrl: '/zakat-calculator',
    sections: [
      {
        id: 'zakat-header',
        label: 'পেজ শিরোনাম',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'zakat-nisab',
        label: 'নিসাব ও যাকাত নিয়ম',
        icon: 'balance',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'nisabSilverBdt', label: 'রূপার নিসাব (টাকা)', type: 'text' },
          { key: 'nisabGoldBdt', label: 'সোনার নিসাব (টাকা)', type: 'text' },
          { key: 'ruleText', label: 'যাকাতের নিয়মাবলি', type: 'textarea', rows: 3 },
        ],
      },
      {
        id: 'zakat-policy',
        label: '১০০% যাকাত তামলিক পলিসি',
        icon: 'policy',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'policyHeading', label: 'পলিসি শিরোনাম', type: 'text' },
          { key: 'policyDescription', label: 'পলিসির বিস্তারিত', type: 'textarea', rows: 3 },
        ],
      },
      {
        id: 'zakat-faq',
        label: 'সাধারণ প্রশ্নোত্তর (FAQ)',
        icon: 'quiz',
        isCore: true,
        isVisible: true,
        order: 4,
        fields: [
          { key: 'faq1Q', label: 'প্রশ্ন ১', type: 'text' },
          { key: 'faq1A', label: 'উত্তর ১', type: 'textarea', rows: 2 },
          { key: 'faq2Q', label: 'প্রশ্ন ২', type: 'text' },
          { key: 'faq2A', label: 'উত্তর ২', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // GALLERY PAGE
  // -------------------------------------------------------
  {
    pageKey: 'gallery',
    pageTitle: '৭. ফটো গ্যালারি (Gallery)',
    pageIcon: 'photo_library',
    pageUrl: '/gallery',
    sections: [
      {
        id: 'gallery-header',
        label: 'পেজ শিরোনাম',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'gallery-filters',
        label: 'ফিল্টার ক্যাটাগরি ট্যাব (৫টি)',
        icon: 'filter_list',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'filterAll', label: 'ট্যাব ১ — সকল', type: 'text' },
          { key: 'filterFood', label: 'ট্যাব ২ — খাদ্য বিতরণ', type: 'text' },
          { key: 'filterWater', label: 'ট্যাব ৩ — সুপেয় পানি', type: 'text' },
          { key: 'filterOrphan', label: 'ট্যাব ৪ — এতিম শিশু', type: 'text' },
          { key: 'filterShelter', label: 'ট্যাব ৫ — ঘর নির্মাণ', type: 'text' },
          { key: 'bottomNotice', label: 'গ্যালারির নিচের নোটিশ', type: 'text' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // VOLUNTEER PAGE
  // -------------------------------------------------------
  {
    pageKey: 'volunteer',
    pageTitle: '৮. স্বেচ্ছাসেবক নিবন্ধন (Volunteer)',
    pageIcon: 'group_add',
    pageUrl: '/volunteer',
    sections: [
      {
        id: 'volunteer-header',
        label: 'পেজ শিরোনাম',
        icon: 'title',
        isCore: true,
        isVisible: true,
        order: 1,
        fields: [
          { key: 'pageBadge', label: 'টপ ব্যাজ টেক্সট', type: 'text' },
          { key: 'pageTitle', label: 'পেজ মূল শিরোনাম', type: 'text' },
          { key: 'pageSubtitle', label: 'পেজ সাব-টাইটেল', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'volunteer-form',
        label: 'নিবন্ধন ফরম টেক্সট',
        icon: 'assignment_ind',
        isCore: true,
        isVisible: true,
        order: 2,
        fields: [
          { key: 'formHeading', label: 'ফরম শিরোনাম', type: 'text' },
          { key: 'formSubheading', label: 'ফরম সাব-শিরোনাম', type: 'textarea', rows: 2 },
          { key: 'joinRequirement', label: 'যোগদানের যোগ্যতা ও নির্দেশিকা', type: 'textarea', rows: 2 },
          { key: 'contactNotice', label: 'আবেদন পরবর্তী যোগাযোগ নোটিশ', type: 'text' },
        ],
      },
      {
        id: 'volunteer-benefits',
        label: 'স্বেচ্ছাসেবকের সুবিধা (৩টি)',
        icon: 'emoji_events',
        isCore: true,
        isVisible: true,
        order: 3,
        fields: [
          { key: 'benefit1', label: 'সুবিধা ১', type: 'text' },
          { key: 'benefit2', label: 'সুবিধা ২', type: 'text' },
          { key: 'benefit3', label: 'সুবিধা ৩', type: 'text' },
        ],
      },
    ],
  },
];

// =========================================================
// CUSTOM SECTIONS CONTEXT — for user-added extra sections
// =========================================================

export interface CustomSection {
  id: string;
  pageKey: string;
  label: string;
  icon: string;
  fields: SectionField[];
  data: PageSectionData;
  isVisible: boolean;
  order: number;
}

interface CustomSectionsCtx {
  customSections: CustomSection[];
  addCustomSection: (section: Omit<CustomSection, 'id'>) => string;
  updateCustomSection: (id: string, updates: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  getPageCustomSections: (pageKey: string) => CustomSection[];
}

const CustomSectionsContext = createContext<CustomSectionsCtx | undefined>(undefined);

const CUSTOM_SECTIONS_KEY = 'gmcf:custom_sections_v1';

export function CustomSectionsProvider({ children }: { children: React.ReactNode }) {
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_SECTIONS_KEY);
      if (saved) setCustomSections(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const save = (sections: CustomSection[]) => {
    setCustomSections(sections);
    try {
      localStorage.setItem(CUSTOM_SECTIONS_KEY, JSON.stringify(sections));
    } catch (e) {
      console.error(e);
    }
  };

  const addCustomSection = (section: Omit<CustomSection, 'id'>) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newSection: CustomSection = { ...section, id };
    save([...customSections, newSection]);
    return id;
  };

  const updateCustomSection = (id: string, updates: Partial<CustomSection>) => {
    save(customSections.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteCustomSection = (id: string) => {
    save(customSections.filter(s => s.id !== id));
  };

  const getPageCustomSections = (pageKey: string) =>
    customSections.filter(s => s.pageKey === pageKey);

  return (
    <CustomSectionsContext.Provider
      value={{ customSections, addCustomSection, updateCustomSection, deleteCustomSection, getPageCustomSections }}
    >
      {children}
    </CustomSectionsContext.Provider>
  );
}

export function useCustomSections() {
  const ctx = useContext(CustomSectionsContext);
  if (!ctx) {
    return {
      customSections: [],
      addCustomSection: () => '',
      updateCustomSection: () => {},
      deleteCustomSection: () => {},
      getPageCustomSections: () => [],
    };
  }
  return ctx;
}
