'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';
import { useSiteCMS } from '@/lib/site-cms';

export type FoundationProject = {
  id: string;
  projectNoBn: string;
  projectNoEn: string;
  titleBn: string;
  titleEn: string;
  categoryKey: string;
  categoryBn: string;
  categoryEn: string;
  locationBn: string;
  locationEn: string;
  image: string;
  statusBn: string;
  statusEn: string;
  descriptionBn: string;
  descriptionEn: string;
  raisedBDT: number;
  raisedUSD: number;
  goalBDT: number;
  goalUSD: number;
  beneficiariesBn: string;
  beneficiariesEn: string;
  featuresBn: string[];
  featuresEn: string[];
  impactReportBn?: string;
  impactReportEn?: string;
};

export const FOUNDATION_PROJECTS: FoundationProject[] = [
  {
    id: 'PRJ-01',
    projectNoBn: '০১',
    projectNoEn: '01',
    titleBn: 'গৃহহীন ও অসহায় পরিবারের জন্য নিরাপদ টিনের ঘর নির্মাণ',
    titleEn: 'Safe Tin-Shed Shelter Construction for Destitute Families',
    categoryKey: 'shelter',
    categoryBn: 'আবাসন ও পুনর্বাসন',
    categoryEn: 'Shelter & Rehabilitation',
    locationBn: 'কুড়িগ্রাম ও গাইবান্ধা চরাঞ্চল',
    locationEn: 'Kurigram & Gaibandha Riverine Belt',
    image: '/images/drive-house-1.jpg',
    statusBn: 'চলমান কার্যক্রম',
    statusEn: 'Active Field Project',
    descriptionBn: 'ঝড়, বন্যা ও তীব্র শীতে ভিটেমাটি হারানো অতি দরিদ্র নদীভাঙন কবলিত পরিবারগুলোর জন্য মজবুত ঢেউখেলানো টিন, কংক্রিট পিলার ও উঁচু পাকা ভিটি দিয়ে স্থায়ী ও নিরাপদ বসতঘর নির্মাণ করে দেওয়া হচ্ছে।',
    descriptionEn: 'Constructing sturdy galvanized tin-sheet homes with concrete pillars and raised brick plinths for families who lost everything to severe riverbank erosion and seasonal flash floods.',
    raisedBDT: 1850000,
    raisedUSD: 15200,
    goalBDT: 2800000,
    goalUSD: 23000,
    beneficiariesBn: '৬৫টি গৃহহীন পরিবার',
    beneficiariesEn: '65 Homeless Families',
    featuresBn: [
      'উচ্চমানের মরিচারোধক ঢেউখেলানো রঙিন টিনের ছাউনি ও বেড়া',
      'বন্যা প্রতিরোধী আরসিসি কংক্রিট পিলার ও পাকা মেঝে',
      'সংলগ্ন স্বাস্থ্যসম্মত সেনিটারি ল্যাট্রিন ব্যবস্থা',
      'সম্পূর্ণ বিনামূল্যে দলিল হস্তান্তর ও দাতা নামফলক'
    ],
    featuresEn: [
      'Rust-resistant corrugated galvanized tin sheets & walls',
      'Flood-resilient RCC pillars with elevated cement flooring',
      'Attached hygienic sanitary latrine for each shelter',
      'Zero-cost deed handover with permanent donor plaque'
    ],
    impactReportBn: 'প্রতিটি ঘরের নির্মাণ ব্যয় প্রায় ৭০,০০০ টাকা। এর মাধ্যমে একটি অসহায় পরিবার বছরের পর বছর রোদ, বৃষ্টি, ঝড় ও শীতের প্রকোপ থেকে সম্পূর্ণ নিরাপদে বসবাস করতে পারে।',
    impactReportEn: 'Each complete family shelter costs approximately $600 USD / 70,000 BDT, providing multi-generational protection from severe monsoon rains and winter cold.'
  },
  {
    id: 'PRJ-02',
    projectNoBn: '০২',
    projectNoEn: '02',
    titleBn: 'ওয়ান মিল ওয়ান হোপ — পথশিশু ও অনাহারক্লিষ্টদের পুষ্টিকর গরম খাবার',
    titleEn: 'One Meal One Hope — Daily Nutritious Warm Meals for Street Children',
    categoryKey: 'food',
    categoryBn: 'খাদ্য ও পুষ্টি সহায়তা',
    categoryEn: 'Food & Nutrition Relief',
    locationBn: 'কমলাপুর, সদরঘাট ও তেজগাঁও রেলওয়ে এলাকা, ঢাকা',
    locationEn: 'Kamalapur, Sadarghat & Tejgaon Hubs, Dhaka',
    image: '/images/one-meal-one-hope.jpg',
    statusBn: 'দৈনিক চলমান',
    statusEn: 'Daily Outreach',
    descriptionBn: 'রাজধানীর বিভিন্ন রেলওয়ে স্টেশন ও ফুটপাতে অভুক্ত থাকা পথশিশু ও ছিন্নমূল মানুষের মুখে প্রতিদিন পুষ্টিকর গরম ভাত, ডাল, ডিম, মাংস ও দুধ তুলে দেওয়া হয়। কোনো শিশুর পেটে যেন ক্ষুধার জ্বালা না থাকে।',
    descriptionEn: 'Delivering fresh, hygienic and calorie-rich warm meals (rice, lentils, egg, meat, and milk) every single day to abandoned street children, orphans, and destitute labourers.',
    raisedBDT: 3200000,
    raisedUSD: 26500,
    goalBDT: 4000000,
    goalUSD: 33000,
    beneficiariesBn: 'দৈনিক ৫০০+ পথশিশু',
    beneficiariesEn: '500+ Daily Street Children',
    featuresBn: [
      'দৈনিক নিজস্ব কিচেনে স্বাস্থ্যসম্মত উপায়ে পুষ্টিকর খাবার রান্না',
      'ভিটামিন ও প্রোটিন সমৃদ্ধ সুষম খাদ্যতালিকা',
      'খাবারের পাশাপাশি মৌলিক স্বাস্থ্যপরীক্ষা ও নৈতিক শিক্ষা',
      '১০০% যাকাত ও সাধারণ সাদাকাহ তহবিল থেকে পরিচালিত'
    ],
    featuresEn: [
      'Hygienically prepared daily meals in GMCF dedicated community kitchen',
      'Balanced dietary menu packed with essential vitamins and protein',
      'Basic health screening and moral counseling paired with dining',
      '100% financed through transparent Zakat and Sadaqah funds'
    ],
    impactReportBn: 'গত এক বছরে ১,৮০,০০০-এর বেশি গরম খাবারের প্যাকেট সফলভাবে বিতরণ করা হয়েছে।',
    impactReportEn: 'Over 180,000 freshly cooked warm meal packages served across transit hubs in the past 12 months.'
  },
  {
    id: 'PRJ-03',
    projectNoBn: '০৩',
    projectNoEn: '03',
    titleBn: 'প্রজেক্ট আলো — গ্রামীণ প্রবীণ ও শিশুদের বিনামূল্যে চক্ষু ছানি অপারেশন',
    titleEn: 'Project Alo — Free Cataract Surgeries & Restoring Vision for Rural Poor',
    categoryKey: 'healthcare',
    categoryBn: 'চিকিৎসাসেবা ও স্বাস্থ্য',
    categoryEn: 'Healthcare & Medical Relief',
    locationBn: 'রংপুর, দিনাজপুর ও কুড়িগ্রাম জেলা',
    locationEn: 'Rangpur, Dinajpur & Kurigram Rural Wards',
    image: '/images/project-alo-eye-care.jpg',
    statusBn: 'চলমান ক্যাম্পেইন',
    statusEn: 'Active Medical Missions',
    descriptionBn: 'অর্থের অভাবে যেসকল অসহায় প্রবীণ ও শিশুরা ধীরে ধীরে দৃষ্টিশক্তি হারিয়ে চিরতরে অন্ধ হয়ে যাচ্ছিলেন, বিশেষজ্ঞ চক্ষু সার্জনদের মাধ্যমে তাদের চোখে অত্যাধুনিক ফ্যাকো লেন্স প্রতিস্থাপন ও চশমা বিতরণ।',
    descriptionEn: 'Sponsoring 100% cost-free Phaco cataract lens transplant surgeries, prescription glasses, and post-operative medical follow-up for impoverished villagers facing imminent blindness.',
    raisedBDT: 2450000,
    raisedUSD: 20200,
    goalBDT: 3500000,
    goalUSD: 29000,
    beneficiariesBn: '১,২০০+ সফল দৃষ্টি পুনরুদ্ধার',
    beneficiariesEn: '1,200+ Vision Restorations',
    featuresBn: [
      'আধুনিক ফ্যাকো সার্জারির মাধ্যমে ব্যথামুক্ত লেন্স প্রতিস্থাপন',
      'অপারেশনের পূর্ববর্তী ও পরবর্তী সম্পূর্ণ বিনামূল্যে ওষুধ প্রদান',
      'দূরবর্তী গ্রাম থেকে রোগীদের হাসপাতালে আনা-নেওয়ার পরিবহন খরচ',
      'প্রত্যেক রোগীর জন্য উন্নত মানের সুরক্ষা কালো চশমা'
    ],
    featuresEn: [
      'State-of-the-art sutureless Phaco micro-incisional surgery',
      'Pre- and post-operative antibiotics and eye drops provided free',
      'Dedicated transport conveyance from isolated river villages to eye hospitals',
      'Protective UV sunglasses and vision care kit for every beneficiary'
    ],
    impactReportBn: 'মাত্র ৫,৫০০ টাকায় একজন দৃষ্টিহীন মানুষের একটি চোখের ছানি অপারেশন ও নতুন লেন্স লাগানো সম্ভব।',
    impactReportEn: 'Just $45 USD / 5,500 BDT fully covers one complete surgical procedure, restoring light and independence to an elder.'
  },
  {
    id: 'PRJ-04',
    projectNoBn: '০৪',
    projectNoEn: '04',
    titleBn: 'গভীর সুপেয় পানি নলকূপ ও স্থায়ী স্যানিটেশন গ্রিড স্থাপন',
    titleEn: 'Deep Tube-wells & Arsenic-Free Clean Drinking Water Grid',
    categoryKey: 'water',
    categoryBn: 'বিশুদ্ধ খাবার পানি',
    categoryEn: 'Clean Water & WASH',
    locationBn: 'সুনামগঞ্জ হাওর, গাইবান্ধা ও বরগুনা উপকূলীয় অঞ্চল',
    locationEn: 'Sunamganj Haor & Coastal Barguna',
    image: '/images/clean-water-well.jpg',
    statusBn: 'সদকায়ে জারিয়াহ',
    statusEn: 'Sadaqah Jariyah',
    descriptionBn: 'আর্সেনিক ও লবণাক্ততামুক্ত বিশুদ্ধ পানির জন্য ৬৫০-৮০০ ফুট গভীরে শক্তিশালী সাবমার্সিবল পাম্প ও নলকূপ স্থাপন। সাথে রয়েছে মসজিদ ও মাদরাসা সংলগ্ন পরিচ্ছন্ন স্থায়ী ওজুখানা এবং ফিল্টারিং ব্যবস্থা।',
    descriptionEn: 'Drilling 650-800ft deep aquifer tube-wells and solar-assisted community filtration plants, delivering sweet and arsenic-free clean water to remote wetland villages.',
    raisedBDT: 4100000,
    raisedUSD: 33800,
    goalBDT: 5000000,
    goalUSD: 41000,
    beneficiariesBn: '৩৫,০০০+ গ্রামীণ অধিবাসী',
    beneficiariesEn: '35,000+ Villagers',
    featuresBn: [
      'আর্সেনিক ও ক্ষতিকর ধাতুমুক্ত নিরাপদ ভূগর্ভস্থ পানির ল্যাব টেস্ট',
      'ভারী ডিউটি হ্যান্ডপাম্প ও সোলার মোটর সংযুক্ত পানির ট্যাংক',
      'মসজিদ সংলগ্ন অজুখানা ও নারীদের জন্য আলাদা সংরক্ষিত ট্যাপ',
      'দাতা বা মরহুম পিতা-মাতার নামে স্থায়ী ধাতব নামফলক স্থাপন'
    ],
    featuresEn: [
      'Rigorous hydrogeological lab testing ensuring zero arsenic or salinity',
      'Heavy-duty cast iron pumps paired with solar motor storage reservoirs',
      'Community wudu facilities for village mosques and schools',
      'Permanent engraved commemorative metal nameplate for donors'
    ],
    impactReportBn: 'প্রতিটি নলকূপ দৈনিক গড়ে ২০০-৩০০ পরিবারের বিশুদ্ধ পানির চাহিদা মেটায় এবং পানিবাহিত ডায়রিয়া ও টাইফয়েড থেকে রক্ষা করে।',
    impactReportEn: 'Each deep water well safeguards an entire village from debilitating waterborne illnesses like cholera and arsenic poisoning for decades.'
  },
  {
    id: 'PRJ-05',
    projectNoBn: '০৫',
    projectNoEn: '05',
    titleBn: 'প্রজেক্ট শীতলতা — ছিন্নমূল ও চরাঞ্চলে উন্নত কম্বল ও শীতবস্ত্র বিতরণ',
    titleEn: 'Project Sheetal — Heavy Winter Blankets & Warm Clothing Outreach',
    categoryKey: 'winter',
    categoryBn: 'জরুরি শীতকালীন ত্রাণ',
    categoryEn: 'Emergency Winter Relief',
    locationBn: 'পঞ্চগড়, কুড়িগ্রাম ও ঠাকুরগাঁও উত্তরাঞ্চল',
    locationEn: 'Panchagarh, Kurigram & Northern Border Belt',
    image: '/images/winter-blanket-distribution.jpg',
    statusBn: 'মৌসুমি জরুরি কর্মসূচি',
    statusEn: 'Seasonal Response',
    descriptionBn: 'উত্তরাঞ্চলের হিমশীতল হাড়কাঁপানো শীতে ছিন্নমূল প্রবীণ, এতিম শিশু ও বিধবা মায়েদের ঘরে ঘরে গিয়ে উন্নত মানের ডাবল পার্টের উষ্ণ কম্বল, সোয়েটার ও শিশুদের শীতের পোশাক পৌঁছে দেওয়া হয়।',
    descriptionEn: 'Rushing premium heavy-weight fleece blankets, thermal sweaters, and woolen caps directly to elderly destitute villagers and children braving bitter northern sub-Himalayan cold waves.',
    raisedBDT: 1650000,
    raisedUSD: 13600,
    goalBDT: 2200000,
    goalUSD: 18000,
    beneficiariesBn: '৭,৫০০+ শীতার্ত পরিবার',
    beneficiariesEn: '7,500+ Families Protected',
    featuresBn: [
      'উচ্চমানের ডাবল পার্ট দীর্ঘস্থায়ী গরম কম্বল',
      'শিশুদের জন্য মাপমতো হুডি, সোয়েটার ও মোজা সেট',
      'প্রত্যন্ত চরাঞ্চলে সরাসরি বাড়ি বাড়ি গিয়ে বিতরণ',
      'ফটো ও ভিডিওসহ স্বচ্ছ অডিট প্রতিবেদন প্রদান'
    ],
    featuresEn: [
      'Thick double-ply thermal blankets built for extreme cold nights',
      'Custom-sized woolen hoodies, cardigans, and socks for toddlers',
      'Door-to-door hand delivery to bedridden elders in remote river isles',
      'Transparent photo & GPS verified delivery logs dispatched to sponsors'
    ],
    impactReportBn: 'মাত্র ৬০০ টাকায় একটি অসহায় পরিবারের জন্য একটি উন্নত ডাবল কম্বল উপহার দেওয়া যায়।',
    impactReportEn: 'Just $6 USD / 600 BDT provides a high-density double blanket that keeps a destitute family warm all winter.'
  },
  {
    id: 'PRJ-06',
    projectNoBn: '০৬',
    projectNoEn: '06',
    titleBn: 'এতিম ও হাফেজ শিক্ষার্থীদের সার্বিক অভিভাবকত্ব ও নৈতিক শিক্ষা',
    titleEn: 'Comprehensive Orphan Care & Quran Tahfeez Sponsorship',
    categoryKey: 'orphan',
    categoryBn: 'এতিম প্রতিপালন ও শিক্ষা',
    categoryEn: 'Orphan Care & Education',
    locationBn: 'সাভার ও রূপগঞ্জ মাদরাসা ক্যাম্পাস, ঢাকা',
    locationEn: 'Savar & Rupganj Residential Campuses, Dhaka',
    image: '/images/rural-madrasa-children.jpg',
    statusBn: 'আজীবন সদকায়ে জারিয়াহ',
    statusEn: 'Continuous Sadaqah',
    descriptionBn: 'পিতৃহীন ও অভিভাবকহীন শিশুদের নিরাপদ আবাসিক আশ্রয়, ৩ বেলা পুষ্টিকর খাবার, আধুনিক সাধারণ শিক্ষা এবং বিশুদ্ধ কুরআন হেফজ নিশ্চিত করে আদর্শ মানুষ হিসেবে গড়ে তোলার সমন্বিত প্রকল্প।',
    descriptionEn: 'Providing full boarding shelter, 3 warm daily meals, medical care, general curriculum schooling, and Quran memorization under dedicated mentors for vulnerable orphans.',
    raisedBDT: 3800000,
    raisedUSD: 31200,
    goalBDT: 4800000,
    goalUSD: 39500,
    beneficiariesBn: '১২০+ আবাসিক এতিম শিক্ষার্থী',
    beneficiariesEn: '120+ Resident Orphans',
    featuresBn: [
      'নিরাপদ আবাসিক হোস্টেল, বিছানা ও পরিষ্কার পোশাক',
      'অভিজ্ঞ কারী ও ওস্তাদের তত্ত্বাবধানে হিফজুল কুরআন',
      'স্কুল পাঠ্যক্রম, ইংরেজি ও কম্পিউটার বেসিক শিক্ষা',
      'প্রতি ত্রৈমাসিকে অভিভাবক ও স্পনসরকে প্রগ্রেস রিপোর্ট প্রদান'
    ],
    featuresEn: [
      'Full safe residential boarding with bedding, laundry and personal lockers',
      'Daily Quran Hifz under accredited Huffaz and Islamic scholars',
      'Modern primary academics, English basics and computer literacy',
      'Quarterly academic and health report cards shared with child sponsors'
    ],
    impactReportBn: 'প্রতি মাসে ৩,৫০০ টাকায় একজন এতিম শিশুর খাবার, লেখাপড়া ও চিকিৎসার সম্পূর্ণ দায়িত্ব নেওয়া যায়।',
    impactReportEn: 'A monthly pledge of $30 USD / 3,500 BDT sponsors all basic needs and schooling for an orphan child.'
  },
  {
    id: 'PRJ-07',
    projectNoBn: '০৭',
    projectNoEn: '07',
    titleBn: 'বিধবা ও দুস্থ নারীদের সেলাই প্রশিক্ষণ ও স্বাবলম্বীকরণ কর্মসূচি',
    titleEn: 'Widow Livelihood & Free Sewing Machine Empowerment',
    categoryKey: 'shelter',
    categoryBn: 'স্বাবলম্বীকরণ ও যাকাত',
    categoryEn: 'Livelihood & Self-Reliance',
    locationBn: 'বাগেরহাট ও জামালপুর জেলা',
    locationEn: 'Bagerhat & Jamalpur Rural Areas',
    image: '/images/resilient-mother-portrait.jpg',
    statusBn: 'যাকাত স্বাবলম্বীকরণ',
    statusEn: 'Zakat Empowerment',
    descriptionBn: 'স্বামীহারা অসহায় মায়েদের দক্ষ সেলাই ও দর্জি প্রশিক্ষণ প্রদান এবং সফল কোর্স শেষে বিনামূল্যে নতুন সেলাই মেশিন ও প্রাথমিক পুঁজি দিয়ে তাদের আত্মনির্ভরশীল করে তোলা হয়।',
    descriptionEn: 'Training widowed mothers in professional tailoring and embroidery, awarding each graduate a brand new heavy-duty sewing machine and starter cloth fabric to run home businesses.',
    raisedBDT: 1400000,
    raisedUSD: 11500,
    goalBDT: 2000000,
    goalUSD: 16500,
    beneficiariesBn: '১৮০ জন স্বাবলম্বী নারী',
    beneficiariesEn: '180 Empowered Mothers',
    featuresBn: [
      '৩ মাসের নিবিড় পেশাদার দর্জি ও নকশিকাঁথা প্রশিক্ষণ',
      'কোর্স শেষে সম্পূর্ণ নতুন হেভি-ডিউটি সেলাই মেশিন উপহার',
      'প্রাথমিক থান কাপড় ও সুতা ক্রয়ের এককালীন পুঁজি অনুদান',
      'তৈরি পোশাক বিক্রির স্থানীয় বাজার ও অর্ডার সংযোগ'
    ],
    featuresEn: [
      '3-month intensive professional tailoring curriculum',
      'Brand new industrial sewing machine gifted upon graduation',
      'Initial seed capital for raw textiles, threads, and sewing kits',
      'Linkage to local village markets and wholesale garment buyers'
    ],
    impactReportBn: 'একটি সেলাই মেশিনের মাধ্যমে একজন বিধবা মা প্রতি মাসে ৮,০০০-১২,০০০ টাকা আয় করে সন্তানের মুখে খাবার তুলে দিতে সক্ষম হচ্ছেন।',
    impactReportEn: 'One sewing machine grants a widowed mother the means to earn $70-$100 per month and feed her children with dignity.'
  },
  {
    id: 'PRJ-08',
    projectNoBn: '০৮',
    projectNoEn: '08',
    titleBn: 'জরুরি বন্যা ও প্রাকৃতিক দুর্যোগকালীন ত্রাণ এবং পুনর্বাসন',
    titleEn: 'Emergency Flood Relief & Rapid Disaster Rehabilitation',
    categoryKey: 'food',
    categoryBn: 'জরুরি দুর্যোগ সহায়তা',
    categoryEn: 'Emergency Disaster Relief',
    locationBn: 'সিলেট, নোয়াখালী ও ফেনী প্লাবিত অঞ্চল',
    locationEn: 'Sylhet, Noakhali & Feni Flood Belts',
    image: '/images/community-relief-meals.jpg',
    statusBn: 'জরুরি রেসপন্স টিম',
    statusEn: 'Rapid Response',
    descriptionBn: 'আকস্মিক পাহাড়ি ঢল ও বন্যায় পানিবন্দী হাজার হাজার পরিবারের কাছে স্পিডবোটের মাধ্যমে জরুরি শুকনো খাবার, বিশুদ্ধ পানি, ওরস্যালাইন, ওষুধ ও পুনর্বাসন সহায়তা পৌঁছানো।',
    descriptionEn: 'Mobilizing rapid speedboats and volunteer relief corps to deliver dry rations, bottled water, water purification tablets, and emergency medical kits to stranded flood victims.',
    raisedBDT: 2900000,
    raisedUSD: 24000,
    goalBDT: 3500000,
    goalUSD: 29000,
    beneficiariesBn: '১২,০০০+ দুর্গত মানুষ',
    beneficiariesEn: '12,000+ Flood Victims',
    featuresBn: [
      'বন্যাদুর্গত দুর্গম গ্রামে স্পিডবোটে করে জরুরি খাদ্যসামগ্রী পৌঁছানো',
      'পানি বিশুদ্ধকরণ ট্যাবলেট (হ্যালোট্যাব) ও খাবার স্যালাইন বিতরণ',
      'বন্যাপরবর্তী ক্ষতিগ্রস্ত ঘরবাড়ি মেরামতে জরুরি ঢেউটিন অনুদান',
      'বন্যাপরবর্তী বিনামূল্যে মেডিকেল ক্যাম্প ও চর্মরোগের চিকিৎসা'
    ],
    featuresEn: [
      'Emergency boat flotilla penetrating marooned river delta villages',
      'Thousands of water purification tablets and oral rehydration salts',
      'Post-flood tin-sheet grants to rebuild washed away homesteads',
      'Free mobile epidemic clinic combating waterborne fungal diseases'
    ],
    impactReportBn: 'গত আকস্মিক বন্যায় ৩,৫০০-এর বেশি পরিবারের কাছে সরাসরি শুকনো খাদ্য ও বিশুদ্ধ পানি পৌঁছে দিয়েছে GMCF টিম।',
    impactReportEn: 'Over 3,500 stranded households reached with critical food packs during the recent flash floods.'
  }
];

export default function ImpactPage() {
  const { language, currency } = useSiteSettings();
  const { openPaymentModal } = useModalState();
  const { cms } = useSiteCMS();
  const cmsImpact = cms.impact;
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<FoundationProject | null>(null);

  const categories = [
    { key: 'all', labelBn: 'সকল প্রজেক্ট', labelEn: 'All Projects' },
    { key: 'shelter', labelBn: 'আবাসন ও পুনর্বাসন', labelEn: 'Shelter & Homes' },
    { key: 'food', labelBn: 'খাদ্য ও পুষ্টি', labelEn: 'Food Relief' },
    { key: 'healthcare', labelBn: 'চিকিৎসাসেবা', labelEn: 'Healthcare' },
    { key: 'water', labelBn: 'বিশুদ্ধ পানি', labelEn: 'Clean Water' },
    { key: 'winter', labelBn: 'শীতকালীন ত্রাণ', labelEn: 'Winter Relief' },
    { key: 'orphan', labelBn: 'এতিম প্রতিপালন', labelEn: 'Orphan Care' }
  ];

  const filteredProjects = FOUNDATION_PROJECTS.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.categoryKey === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      project.titleBn.toLowerCase().includes(q) ||
      project.titleEn.toLowerCase().includes(q) ||
      project.locationBn.toLowerCase().includes(q) ||
      project.locationEn.toLowerCase().includes(q) ||
      project.projectNoBn.includes(q) ||
      project.projectNoEn.includes(q);

    return matchesCategory && matchesQuery;
  });

  const handleDonateToProject = (project: FoundationProject) => {
    openPaymentModal({
      amount: currency === 'BDT' ? 2500 : 30,
      currency,
      cause: `Project Support: ${project.projectNoEn} - ${project.titleEn}`
    });
  };

  return (
    <main data-l10n="off" className="w-full bg-[#f8faf9] pt-[64px] sm:pt-[80px] min-h-screen">
      {/* Editorial Hero Banner */}
      <section className="relative w-full bg-gradient-to-b from-[#eef8f2] via-white to-[#f8faf9] pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">
              verified
            </span>
            <span>
              {isBn
                ? (cmsImpact.pageBadge || 'মাঠপর্যায়ে বাস্তবায়িত ও চলমান মানবিক প্রকল্পসমূহ • শতভাগ শরীয়াহ নিরীক্ষিত')
                : 'Verified Field Projects & Continuous Impact • 100% Shariah Audited'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-serif-heading tracking-tight leading-tight max-w-4xl mx-auto">
            {isBn ? (
              <span>{cmsImpact.pageTitle || 'আমাদের প্রজেক্ট সমূহ — মানবতার কল্যাণে স্থায়ী পরিবর্তন'}</span>
            ) : (
              <>
                Our Foundation Projects —{' '}
                <span className="text-[#0e4d36]">Sustainable Impact for Humanity</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? (cmsImpact.pageSubtitle || 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)-এর প্রতিটি প্রজেক্ট সরাসরি প্রান্তিক মানুষের জীবনে টেকসই পরিবর্তন আনে। গৃহহীনদের নিরাপদ টিনের ঘর, ক্ষুধার্তদের ওয়ান মিল ওয়ান হোপ, চোখের আলো ফিরিয়ে দেওয়া কিংবা সুপেয় পানি—আপনার প্রতিটি অনুদান পৌঁছে যায় নির্ধারিত খাতে।')
              : 'GMCF executes permanent, transparent field projects across Bangladesh: constructing resilient tin shelters, daily hot meals, free cataract surgeries, clean water wells, and orphan guardianship.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-[#0e4d36] block">
                {isBn ? (cmsImpact.waterWellsCount || '১,৮৫০+') : '1,850+'}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {isBn ? 'সুপেয় পানির নলকূপ' : 'Clean Water Wells'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-amber-600 block">
                {isBn ? (cmsImpact.mealsDelivered || '১,৮০,০০০+') : '180,000+'}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {isBn ? 'খাবার প্যাকেট বিতরণ' : 'Nutritious Meals Served'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-[#0e4d36] block">
                {isBn ? (cmsImpact.familiesRehabilitated || '৬৫০+') : '650+'}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {isBn ? 'পুনর্বাসিত পরিবার' : 'Rehabilitated Families'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-amber-600 block">
                {isBn ? (cmsImpact.districtsCovered || '২৮টি') : '28'}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {isBn ? 'জেলা কভারেজ' : 'Districts Reached'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="w-full px-4 sm:px-8 py-8 max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0e4d36] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder={isBn ? 'প্রজেক্ট বা এলাকা দিয়ে খুঁজুন...' : 'Search projects or location...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0e4d36] focus:outline-none focus:ring-1 focus:ring-[#0e4d36]"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid — EVERY CARD EXACTLY MATCHES USER'S SCREENSHOT DESIGN */}
      <section className="w-full px-4 sm:px-8 pb-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => {
            const budget = currency === 'BDT' ? project.goalBDT : project.goalUSD;
            const raised = currency === 'BDT' ? project.raisedBDT : project.raisedUSD;
            const percentage = Math.min(100, Math.round((raised / budget) * 100));
            const symbol = currency === 'BDT' ? '৳' : '$';

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header with Dark Green Divider Bar & Circular Emblem (EXACT User Screenshot Design) */}
                <div className="relative">
                  {/* Photo Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={isBn ? project.titleBn : project.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Top Left: Category Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                      <span className="bg-[#144d46] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {isBn ? project.categoryBn : project.categoryEn}
                      </span>
                    </div>

                    {/* Top Right: Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                        {isBn ? project.statusBn : project.statusEn}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot-Identical Bottom Divider: 1px straight line from left, meeting circular badge, and gentle curve to right edge */}
                  <div className="relative w-full h-0">
                    {/* 1px horizontal green line from left edge to circular badge */}
                    <div className="absolute left-0 right-[72px] top-0 h-[1px] bg-[#144d46] z-10" />

                    {/* Gentle Upward Curved Corner on the Right (1px line with white mask underneath) */}
                    <div className="absolute -top-[16px] right-0 w-[18px] h-[18px] pointer-events-none z-10 overflow-hidden">
                      <svg
                        viewBox="0 0 18 18"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                      >
                        {/* White mask under curve to smoothly clip the photo corner */}
                        <path
                          d="M 0 16 Q 8 16 18 0 L 18 18 L 0 18 Z"
                          fill="#ffffff"
                        />
                        {/* 1px green curved stroke */}
                        <path
                          d="M 0 16 Q 8 16 18 0"
                          fill="none"
                          stroke="#144d46"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>

                    {/* Circular Logo Badge (54px x 54px, centered on baseline, exactly meeting line on left and curve on right) */}
                    <div
                      className="absolute -top-[27px] right-4 w-[54px] h-[54px] rounded-full bg-white border border-[#144d46] shadow-sm flex items-center justify-center p-1.5 z-20 group-hover:scale-105 transition-transform duration-300"
                      title="GMCF Verified Project"
                    >
                      <img
                        src="/images/gmcf-logo-emblem.png"
                        alt="GMCF Badge"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 pt-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Prominent "প্রজেক্ট নং" label exactly as in user screenshot */}
                    <div className="flex items-center gap-1.5 mb-2 pr-16">
                      <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        {isBn ? 'প্রজেক্ট নং' : 'Project No'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-[#0a3d40]">
                        : {project.projectNoBn}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0e4d36] transition-colors leading-snug">
                      {isBn ? project.titleBn : project.titleEn}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-600">
                        location_on
                      </span>
                      <span>{isBn ? project.locationBn : project.locationEn}</span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {isBn ? project.descriptionBn : project.descriptionEn}
                    </p>

                    {/* Progress Bar & Stats */}
                    <div className="mt-3.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-slate-700 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-[#0e4d36]">
                            groups
                          </span>
                          {isBn ? project.beneficiariesBn : project.beneficiariesEn}
                        </span>
                        <span className="text-[#0e4d36]">{percentage}% অর্জিত</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0e4d36] to-amber-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                        <span>সংগৃহীত: {symbol}{raised.toLocaleString()}</span>
                        <span>লক্ষ্য: {symbol}{budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDonateToProject(project)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0e4d36] to-teal-800 hover:from-emerald-950 hover:to-teal-900 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        volunteer_activism
                      </span>
                      <span>{isBn ? 'এই প্রজেক্টে অনুদান দিন' : 'Donate to Project'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProjectForModal(project)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title={isBn ? 'বিস্তারিত রিপোর্ট দেখুন' : 'View Details'}
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span className="hidden sm:inline">{isBn ? 'বিস্তারিত' : 'Details'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Project Modal */}
      {selectedProjectForModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProjectForModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedProjectForModal.image}
                alt={selectedProjectForModal.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedProjectForModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  {isBn ? `প্রজেক্ট নং : ${selectedProjectForModal.projectNoBn}` : `Project No : ${selectedProjectForModal.projectNoEn}`} • {isBn ? selectedProjectForModal.categoryBn : selectedProjectForModal.categoryEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-heading leading-tight">
                  {isBn ? selectedProjectForModal.titleBn : selectedProjectForModal.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {isBn ? 'প্রকল্পের বিবরণ ও উদ্দেশ্য:' : 'Project Scope & Objective:'}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {isBn ? selectedProjectForModal.descriptionBn : selectedProjectForModal.descriptionEn}
                </p>
              </div>

              {selectedProjectForModal.impactReportBn && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    {isBn ? 'মাঠপর্যায়ের বাস্তবায়ন চিত্র:' : 'Field Impact Summary:'}
                  </span>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    {isBn ? selectedProjectForModal.impactReportBn : selectedProjectForModal.impactReportEn}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isBn ? 'প্রকল্পের মূল সুবিধাসমূহ:' : 'Key Highlights:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {(isBn ? selectedProjectForModal.featuresBn : selectedProjectForModal.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#0e4d36] text-[16px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const prj = selectedProjectForModal;
                    setSelectedProjectForModal(null);
                    handleDonateToProject(prj);
                  }}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0e4d36] to-teal-800 hover:from-emerald-950 hover:to-teal-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                  <span>{isBn ? 'এই প্রজেক্টে অর্থায়ন করুন' : 'Contribute to this Project'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProjectForModal(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Dedication Plaque Banner */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-gradient-to-br from-emerald-950 via-[#0e4d36] to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-800/40">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              <span>{isBn ? 'আজীবন সদকায়ে জারিয়াহ ফলক' : 'Dedicated Sadaqah Jariyah Plaque'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-heading">
              {isBn
                ? 'একটি সম্পূর্ণ নিরাপদ ঘর বা গভীর নলকূপ স্পনসর করুন'
                : 'Sponsor a Complete Family Shelter or Deep Aquifer Well'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isBn
                ? 'আপনার বা আপনার প্রিয় মরহুম পিতা-মাতার নামে আজীবন সদকায়ে জারিয়াহ হিসেবে একটি সম্পূর্ণ নিরাপদ টিনের ঘর (৭০,০০০ টাকা) বা একটি গভীর নলকূপ (৫৫,০০০ টাকা) নির্মাণ করে দিতে পারেন। প্রকল্প শেষে নামফলক ও সম্পূর্ণ ভিডিও রিপোর্ট প্রদান করা হয়।'
                : 'Dedicate an entire tin-shed family home ($600) or deep community tube well ($450) in memory of your loved ones, receiving official dedication plaques and audited completion videos.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openPaymentModal({ amount: currency === 'BDT' ? 70000 : 600, currency, cause: 'Full Shelter / Water Well Sponsorship with Dedication Plaque' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{isBn ? 'নামফলকসহ পূর্ণাঙ্গ স্পনসর' : 'Sponsor Full Project'}</span>
            </button>
            <Link
              href="/gallery"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>{isBn ? 'ফিল্ড ফটো গ্যালারি' : 'View Field Photos'}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
