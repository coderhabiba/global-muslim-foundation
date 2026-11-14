'use client';

import React, { useState } from 'react';
import { useDynamicCards, DynamicCampaign, NewsArticle, ProjectTopic } from '@/lib/dynamic-cards';
import { FoundationProject } from '@/components/pages/ImpactPage';
import { UpcomingProject } from '@/components/pages/UpcomingProjectsPage';
import { OrphanProfile } from '@/lib/data/orphans';
import { useSiteSettings } from '@/lib/site-settings';
import ImageSelectorField from './ImageSelectorField';

type CardTab = 'campaigns' | 'upcoming' | 'foundation' | 'orphans' | 'news' | 'gallery';

export default function AdminCardManager() {
  const {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    upcomingProjects,
    addUpcomingProject,
    updateUpcomingProject,
    deleteUpcomingProject,
    foundationProjects,
    addFoundationProject,
    updateFoundationProject,
    deleteFoundationProject,
    orphans,
    addOrphan,
    updateOrphan,
    deleteOrphan,
    newsArticles,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    galleryTopics,
    addGalleryTopic,
    updateGalleryTopic,
    deleteGalleryTopic,
    resetAllCards,
  } = useDynamicCards();

  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<CardTab>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; type: CardTab } | null>(null);

  // Edit / Add modal states
  const [editingItem, setEditingItem] = useState<{ type: CardTab; isNew: boolean; data: any } | null>(null);
  const [successToast, setSuccessToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });

  const showSuccess = (msg: string) => {
    setSuccessToast({ show: true, msg });
    setTimeout(() => setSuccessToast({ show: false, msg: '' }), 3500);
  };

  // Filtered lists
  const filteredCampaigns = campaigns.filter(c =>
    c.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.categoryBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUpcoming = upcomingProjects.filter(p =>
    p.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFoundation = foundationProjects.filter(f =>
    f.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.categoryBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrphans = orphans.filter(o =>
    o.nameBn.includes(searchTerm) ||
    o.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNews = newsArticles.filter(n =>
    n.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.categoryBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.tagBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGallery = galleryTopics.filter(g =>
    g.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.categoryLabelBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.locationBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    if (activeTab === 'campaigns') {
      setEditingItem({
        type: 'campaigns',
        isNew: true,
        data: {
          titleBn: '',
          titleEn: '',
          categoryBn: 'জরুরি মানবিক সহায়তা',
          categoryEn: 'Emergency Relief',
          image: '/images/one-meal-one-hope.jpg',
          raisedBDT: 0,
          goalBDT: 500000,
          donorsCount: 0,
          descriptionBn: '',
          descriptionEn: '',
          isUrgent: true,
        },
      });
    } else if (activeTab === 'upcoming') {
      setEditingItem({
        type: 'upcoming',
        isNew: true,
        data: {
          titleBn: '',
          titleEn: '',
          categoryBn: 'স্থায়ী অবকাঠামো ও সেবা',
          categoryEn: 'Strategic Infrastructure',
          targetDateBn: '২০২৬-২০২৭',
          targetDateEn: '2026-2027',
          locationBn: 'সাভার, ঢাকা',
          locationEn: 'Savar, Dhaka',
          estimatedBudgetBDT: 5000000,
          estimatedBudgetUSD: 42000,
          raisedBDT: 0,
          raisedUSD: 0,
          statusBn: 'পরিকল্পনাধীন',
          statusEn: 'In Planning',
          image: '/images/clean-water-well.jpg',
          descriptionBn: '',
          descriptionEn: '',
          beneficiaryCountBn: '৫,০০০+ মানুষ',
          beneficiaryCountEn: '5,000+ People',
          highlightsBn: ['স্বচ্ছ অডিট সম্পন্ন', 'শরীয়াহ তত্ত্বাবধানে পরিচালিত'],
          highlightsEn: ['Independently audited', 'Supervised under Shariah Board'],
        },
      });
    } else if (activeTab === 'foundation') {
      setEditingItem({
        type: 'foundation',
        isNew: true,
        data: {
          projectNoBn: '০' + (foundationProjects.length + 1),
          projectNoEn: (foundationProjects.length + 1).toString().padStart(2, '0'),
          titleBn: '',
          titleEn: '',
          categoryKey: 'shelter',
          categoryBn: 'আবাসন ও পুনর্বাসন',
          categoryEn: 'Shelter & Rehabilitation',
          locationBn: 'কুড়িগ্রাম ও গাইবান্ধা',
          locationEn: 'Kurigram & Gaibandha',
          image: '/images/drive-house-1.jpg',
          statusBn: 'চলমান কার্যক্রম',
          statusEn: 'Active Field Project',
          descriptionBn: '',
          descriptionEn: '',
          raisedBDT: 0,
          raisedUSD: 0,
          goalBDT: 2500000,
          goalUSD: 20000,
          beneficiariesBn: '১০০+ পরিবার',
          beneficiariesEn: '100+ Families',
          featuresBn: ['মজবুত ঢেউখেলানো টিন', 'উঁচু পাকা ভিটি'],
          featuresEn: ['Durable tin-sheets', 'Raised concrete plinths'],
        },
      });
    } else if (activeTab === 'orphans') {
      setEditingItem({
        type: 'orphans',
        isNew: true,
        data: {
          nameBn: '',
          nameEn: '',
          age: 8,
          gender: 'boy',
          classBn: 'হিফজুল কুরআন বিভাগ',
          classEn: 'Quran Tahfeez Section',
          locationBn: 'সাভার, ঢাকা',
          locationEn: 'Savar, Dhaka',
          dreamBn: 'হিফজ সম্পন্ন করে আদর্শ আলেম ও শিক্ষক হতে চায়',
          dreamEn: 'Aspires to be a Quran scholar and moral teacher',
          storyBn: 'পিতা হারিয়ে অসহায়। পারিবারিক দারিদ্র্যের কারণে পড়াশোনা ও পুষ্টিকর খাবার অনিশ্চিত।',
          storyEn: 'Lost father and living in poverty. Needs compassionate guardianship.',
          image: '/images/rural-madrasa-children.jpg',
          isSponsored: false,
          statusBn: 'জরুরি স্পনসর প্রয়োজন',
          statusEn: 'Needs Immediate Sponsor',
        },
      });
    } else if (activeTab === 'news') {
      setEditingItem({
        type: 'news',
        isNew: true,
        data: {
          titleBn: '',
          titleEn: '',
          categoryBn: 'জরুরি ত্রাণ তৎপরতা',
          categoryEn: 'Emergency Response',
          tagBn: 'মাঠপর্যায়ের রিপোর্ট',
          tagEn: 'Field Report',
          dateBn: 'নভেম্বর ২০২৬',
          dateEn: 'November 2026',
          readTimeBn: '৩ মিনিট পঠন',
          readTimeEn: '3 min read',
          image: '/images/drive-food-1.jpg',
          featured: false,
          excerptBn: '',
          excerptEn: '',
          contentBnText: 'বিগত এক সপ্তাহে GMCF টিম চরাঞ্চলের দুর্গম এলাকায় পৌঁছে জরুরি সহায়তা প্রদান করেছে।\n\nপ্রতিটি পরিবারের মাঝে পুষ্টিকর খাদ্যপণ্য ও খাবার পানি সফলভাবে বিতরণ করা হয়েছে।',
          contentEnText: 'GMCF field teams successfully distributed critical relief across riverine islands.\n\nEach relief pack included staple food, pure water, and pediatric essentials.',
        },
      });
    } else if (activeTab === 'gallery') {
      setEditingItem({
        type: 'gallery',
        isNew: true,
        data: {
          titleBn: '',
          titleEn: '',
          category: 'food',
          categoryLabelBn: 'ক্ষুধা নিবারণ ও খাদ্য',
          categoryLabelEn: 'Hunger Relief & Food',
          locationBn: 'ঢাকা ও উত্তরাঞ্চলের বিভিন্ন এলাকা',
          locationEn: 'Dhaka & Northern Region',
          dateBn: '২০২৫ - ২০২৬',
          dateEn: '2025 - 2026',
          descBn: '',
          descEn: '',
          image: '/images/drive-food-1.jpg',
          additionalImages: '/images/drive-food-2.jpg\n/images/drive-food-3.jpg',
          images: ['/images/drive-food-1.jpg', '/images/drive-food-2.jpg', '/images/drive-food-3.jpg'],
        },
      });
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, isNew, data } = editingItem;

    if (type === 'campaigns') {
      if (isNew) addCampaign(data);
      else updateCampaign(data.id, data);
    } else if (type === 'upcoming') {
      if (isNew) addUpcomingProject(data);
      else updateUpcomingProject(data.id, data);
    } else if (type === 'foundation') {
      if (isNew) addFoundationProject(data);
      else updateFoundationProject(data.id, data);
    } else if (type === 'orphans') {
      if (isNew) addOrphan(data);
      else updateOrphan(data.id, data);
    } else if (type === 'news') {
      const rawBn = data.contentBnText !== undefined ? data.contentBnText : data.contentBn;
      const rawEn = data.contentEnText !== undefined ? data.contentEnText : data.contentEn;
      const payload = {
        ...data,
        contentBn: Array.isArray(rawBn)
          ? rawBn
          : typeof rawBn === 'string'
          ? rawBn.split('\n\n').map((s: string) => s.trim()).filter(Boolean)
          : [],
        contentEn: Array.isArray(rawEn)
          ? rawEn
          : typeof rawEn === 'string'
          ? rawEn.split('\n\n').map((s: string) => s.trim()).filter(Boolean)
          : [],
      };
      delete payload.contentBnText;
      delete payload.contentEnText;
      if (isNew) addNewsArticle(payload);
      else updateNewsArticle(payload.id, payload);
    } else if (type === 'gallery') {
      const cover = data.image || (data.images && data.images[0]) || '/images/drive-food-1.jpg';
      let extraImgs: string[] = [];
      if (data.additionalImages && typeof data.additionalImages === 'string') {
        extraImgs = data.additionalImages.split('\n').map((s: string) => s.trim()).filter(Boolean);
      } else if (Array.isArray(data.images)) {
        extraImgs = data.images.slice(1);
      }
      const combinedImages = [cover, ...extraImgs.filter((img: string) => img !== cover)];
      const payload = {
        ...data,
        images: combinedImages,
      };
      delete payload.additionalImages;
      delete payload.image;
      if (isNew) addGalleryTopic(payload);
      else updateGalleryTopic(payload.id, payload);
    }

    setEditingItem(null);
    showSuccess(isBn ? 'কার্ডটি সফলভাবে লাইভ সেভ হয়েছে!' : 'Card successfully saved live!');
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;
    if (type === 'campaigns') deleteCampaign(id);
    else if (type === 'upcoming') deleteUpcomingProject(id);
    else if (type === 'foundation') deleteFoundationProject(id);
    else if (type === 'orphans') deleteOrphan(id);
    else if (type === 'news') deleteNewsArticle(id);
    else if (type === 'gallery') deleteGalleryTopic(id);

    setDeleteTarget(null);
    showSuccess(isBn ? 'কার্ডটি সফলভাবে মুছে ফেলা হয়েছে!' : 'Card successfully deleted!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-slate-50/70 relative">
      {/* Floating Success Toast */}
      {successToast.show && (
        <div className="fixed top-6 right-6 z-[9999] max-w-sm w-[calc(100vw-3rem)] bg-white border-2 border-emerald-500 shadow-2xl rounded-2xl p-4 flex items-center gap-3 ring-4 ring-emerald-500/15 animate-in fade-in slide-in-from-top-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
          <p className="text-sm font-bold text-slate-800 flex-1 leading-snug">
            {successToast.msg}
          </p>
          <button
            type="button"
            onClick={() => setSuccessToast({ show: false, msg: '' })}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{isBn ? '১০০% ফুল ডাইনামিক কার্ড কন্ট্রোল ম্যানেজার' : '100% Dynamic Card Manager'}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700">view_carousel</span>
            <span>{isBn ? 'সকল কার্ড, ইভেন্ট ও প্রজেক্ট ম্যানেজমেন্ট (Add, Edit, Delete)' : 'All Cards, Events & Projects Management (Add, Edit, Delete)'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? 'সাইটের হোমপেইজ ক্যাম্পেইন, আসন্ন প্রজেক্ট, ফাউন্ডেশনের চলমান প্রজেক্ট ও এতিম শিশুদের কার্ড সরাসরি যোগ, এডিট ও ডিলিট করুন।'
              : 'Add, edit, or delete homepage campaigns, upcoming projects, active field drives, orphan profiles, news articles, and gallery albums.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>{isBn ? 'নতুন কার্ড / প্রজেক্ট যুক্ত করুন' : 'Add New Card / Project'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => { setActiveTab('campaigns'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'campaigns'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>{isBn ? `১. হোমপেইজ ক্যাম্পেইন (${campaigns.length})` : `1. Homepage Campaigns (${campaigns.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('upcoming'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">construction</span>
            <span>{isBn ? `২. আসন্ন প্রকল্প সমূহ (${upcomingProjects.length})` : `2. Upcoming Projects (${upcomingProjects.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('foundation'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'foundation'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            <span>{isBn ? `৩. আমাদের প্রজেক্ট সমূহ (${foundationProjects.length})` : `3. Foundation Projects (${foundationProjects.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('orphans'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orphans'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">child_care</span>
            <span>{isBn ? `৪. এতিম শিশু প্রোফাইল (${orphans.length})` : `4. Orphan Profiles (${orphans.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('news'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'news'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">newspaper</span>
            <span>{isBn ? `৫. ফিল্ড নিউজ ও ডিসপ্যাচ (${newsArticles.length})` : `5. Field News & Dispatches (${newsArticles.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('gallery'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            <span>{isBn ? `৬. ফটো গ্যালারি অ্যালবাম (${galleryTopics.length})` : `6. Photo Gallery Albums (${galleryTopics.length})`}</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={isBn ? "কার্ডের নাম বা ক্যাটাগরি খুঁজুন..." : "Search cards or categories..."}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* 1. Tab: HomePage Campaigns List */}
      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((camp, idx) => (
            <div key={camp.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img src={camp.image} alt={camp.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {camp.categoryBn}
                  </span>
                  <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {isBn ? camp.titleBn : (camp.titleEn || camp.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isBn ? camp.descriptionBn : (camp.descriptionEn || camp.descriptionBn)}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>{isBn ? 'সংগৃহীত' : 'Raised'}: ৳{camp.raisedBDT.toLocaleString()}</span>
                    <span className="text-slate-500">{isBn ? 'লক্ষ্য' : 'Goal'}: ৳{camp.goalBDT.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({ type: 'campaigns', isNew: false, data: { ...camp } })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: camp.id, title: camp.titleBn, type: 'campaigns' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Tab: Upcoming Projects List */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpcoming.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img src={p.image} alt={p.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-[#144d46] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {isBn ? p.categoryBn : (p.categoryEn || p.categoryBn)}
                  </span>
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {isBn ? p.statusBn : (p.statusEn || p.statusBn)}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-amber-700 uppercase">{p.id}</span>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {isBn ? p.titleBn : (p.titleEn || p.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isBn ? p.descriptionBn : (p.descriptionEn || p.descriptionBn)}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>{isBn ? 'বাজেট' : 'Budget'}: ৳{p.estimatedBudgetBDT.toLocaleString()}</span>
                    <span className="text-slate-500">{isBn ? p.targetDateBn : (p.targetDateEn || p.targetDateBn)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({ type: 'upcoming', isNew: false, data: { ...p } })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: p.id, title: p.titleBn, type: 'upcoming' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Tab: Foundation Projects List */}
      {activeTab === 'foundation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoundation.map(f => (
            <div key={f.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img src={f.image} alt={f.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-[#0e4d36] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {isBn ? f.categoryBn : (f.categoryEn || f.categoryBn)}
                  </span>
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {isBn ? `প্রজেক্ট ${f.projectNoBn}` : `Project ${f.projectNoEn || f.projectNoBn}`}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {isBn ? f.titleBn : (f.titleEn || f.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isBn ? f.descriptionBn : (f.descriptionEn || f.descriptionBn)}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>{isBn ? 'সংগৃহীত' : 'Raised'}: ৳{f.raisedBDT.toLocaleString()}</span>
                    <span className="text-slate-500">{isBn ? 'লক্ষ্য' : 'Goal'}: ৳{f.goalBDT.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({ type: 'foundation', isNew: false, data: { ...f } })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: f.id, title: f.titleBn, type: 'foundation' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Tab: Orphans List */}
      {activeTab === 'orphans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrphans.map(o => (
            <div key={o.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img src={o.image} alt={o.nameBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${o.isSponsored ? 'bg-slate-700 text-white' : 'bg-emerald-600 text-white'}`}>
                    {o.isSponsored ? (isBn ? 'স্পনসরকৃত' : 'Sponsored') : (isBn ? 'স্পনসর প্রয়োজন' : 'Needs Sponsor')}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {isBn ? `বয়স: ${o.age} বছর` : `Age: ${o.age} yrs`}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="text-[11px] font-mono font-bold text-emerald-700">{o.id}</p>
                  <h4 className="font-bold text-slate-900 text-sm">{isBn ? o.nameBn : (o.nameEn || o.nameBn)} ({isBn ? o.nameEn : o.nameBn})</h4>
                  <p className="text-xs text-slate-500">
                    {isBn ? o.classBn : (o.classEn || o.classBn)} • {isBn ? o.locationBn : (o.locationEn || o.locationBn)}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">
                    {isBn ? 'স্বপ্ন' : 'Dream'}: {isBn ? o.dreamBn : (o.dreamEn || o.dreamBn)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({ type: 'orphans', isNew: false, data: { ...o } })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: o.id, title: isBn ? o.nameBn : (o.nameEn || o.nameBn), type: 'orphans' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Tab: News Articles List */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(article => (
            <div key={article.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img src={article.image} alt={article.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {isBn ? article.categoryBn : (article.categoryEn || article.categoryBn)}
                  </span>
                  <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {isBn ? article.tagBn : (article.tagEn || article.tagBn)}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span>{isBn ? article.dateBn : (article.dateEn || article.dateBn)}</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{isBn ? article.readTimeBn : (article.readTimeEn || article.readTimeBn)}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {isBn ? article.titleBn : (article.titleEn || article.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {isBn ? article.excerptBn : (article.excerptEn || article.excerptBn)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({
                    type: 'news',
                    isNew: false,
                    data: {
                      ...article,
                      contentBnText: Array.isArray(article.contentBn) ? article.contentBn.join('\n\n') : (article.contentBn || ''),
                      contentEnText: Array.isArray(article.contentEn) ? article.contentEn.join('\n\n') : (article.contentEn || ''),
                    }
                  })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: article.id, title: isBn ? article.titleBn : (article.titleEn || article.titleBn), type: 'news' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Tab: Gallery Topics List */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(topic => (
            <div key={topic.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img src={topic.images[0] || '/images/drive-food-1.jpg'} alt={topic.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {isBn ? topic.categoryLabelBn : (topic.categoryLabelEn || topic.categoryLabelBn)}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">photo_library</span>
                    <span>{isBn ? `${topic.images.length} টি ছবি` : `${topic.images.length} Photos`}</span>
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="line-clamp-1">{isBn ? topic.locationBn : (topic.locationEn || topic.locationBn)}</span>
                    <span>•</span>
                    <span>{isBn ? topic.dateBn : (topic.dateEn || topic.dateBn)}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {isBn ? topic.titleBn : (topic.titleEn || topic.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {isBn ? topic.descBn : (topic.descEn || topic.descBn)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({
                    type: 'gallery',
                    isNew: false,
                    data: {
                      ...topic,
                      image: topic.images[0] || '',
                      additionalImages: topic.images.slice(1).join('\n')
                    }
                  })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: topic.id, title: isBn ? topic.titleBn : (topic.titleEn || topic.titleBn), type: 'gallery' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{isBn ? 'ডিলিট' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700">edit_note</span>
                  <span>{editingItem.isNew ? (isBn ? 'নতুন আইটেম / কার্ড যুক্ত করুন' : 'Add New Item / Card') : (isBn ? 'আইটেম / কার্ড এডিট করুন' : 'Edit Item / Card')}</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isBn ? 'বিভাগ: ' : 'Category: '}{
                    editingItem.type === 'campaigns' ? (isBn ? 'হোমপেইজ ক্যাম্পেইন' : 'Homepage Campaigns') :
                    editingItem.type === 'upcoming' ? (isBn ? 'আসন্ন প্রকল্প' : 'Upcoming Projects') :
                    editingItem.type === 'foundation' ? (isBn ? 'ফাউন্ডেশনের প্রজেক্ট' : 'Foundation Projects') :
                    editingItem.type === 'orphans' ? (isBn ? 'এতিম শিশু প্রোফাইল' : 'Orphan Profiles') :
                    editingItem.type === 'news' ? (isBn ? 'ফিল্ড নিউজ ও ডিসপ্যাচ' : 'Field News & Dispatches') : (isBn ? 'ফটো গ্যালারি অ্যালবাম' : 'Gallery Albums')
                  }
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              {/* === NEWS FORM === */}
              {editingItem.type === 'news' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">সংবাদের শিরোনাম (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="যেমন: উত্তরবঙ্গের বন্যাকবলিত এলাকায় খাদ্য ত্রাণ বিতরণ..."
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Headline / Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleEn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleEn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="e.g. Emergency Food Relief Distribution Across Northern Bangladesh..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি (বাংলা)</label>
                      <input
                        type="text"
                        value={editingItem.data.categoryBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, categoryBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="জরুরি ত্রাণ তৎপরতা"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category (English)</label>
                      <input
                        type="text"
                        value={editingItem.data.categoryEn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, categoryEn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="Emergency Response"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ট্যাগ (বাংলা)</label>
                      <input
                        type="text"
                        value={editingItem.data.tagBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, tagBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="মাঠপর্যায়ের রিপোর্ট"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">পঠন সময় ও তারিখ</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          value={editingItem.data.dateBn || ''}
                          onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, dateBn: e.target.value } })}
                          className="w-full px-2 py-2 border rounded-xl"
                          placeholder="৮ নভেম্বর, ২০২৬"
                        />
                        <input
                          type="text"
                          value={editingItem.data.readTimeBn || ''}
                          onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, readTimeBn: e.target.value } })}
                          className="w-full px-2 py-2 border rounded-xl"
                          placeholder="৪ মিনিট পঠন"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <ImageSelectorField
                      label="সংবাদের কভার ছবি"
                      value={editingItem.data.image || ''}
                      onChange={url => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: url } })}
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">সংক্ষিপ্ত সারসংক্ষেপ (বাংলা)</label>
                    <textarea
                      rows={2}
                      value={editingItem.data.excerptBn || ''}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerptBn: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl leading-relaxed"
                      placeholder="কার্ডের সামনে প্রদর্শিত সংক্ষিপ্ত ২-৩ লাইনের বিবরণ..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700 block">মূল প্রতিবেদনের বিস্তারিত বিবরণ (বাংলা)</label>
                      <span className="text-[10px] text-emerald-700 font-semibold">প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার (ফাঁকা লাইন) দিন</span>
                    </div>
                    <textarea
                      rows={4}
                      value={editingItem.data.contentBnText ?? (Array.isArray(editingItem.data.contentBn) ? editingItem.data.contentBn.join('\n\n') : editingItem.data.contentBn || '')}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, contentBnText: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl leading-relaxed font-sans"
                      placeholder="প্রথম প্যারাগ্রাফ...&#10;&#10;দ্বিতীয় প্যারাগ্রাফ..."
                    />
                  </div>
                </>
              )}

              {/* === GALLERY FORM === */}
              {editingItem.type === 'gallery' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">অ্যালবামের নাম (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="যেমন: ওয়ান মিল ওয়ান হোপ: নিয়মিত খাদ্য বিতরণ কর্মসূচি"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Album Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleEn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleEn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="e.g. One Meal One Hope: Hot Nourishing Food Outreach"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি টাইপ</label>
                      <select
                        value={editingItem.data.category || 'food'}
                        onChange={e => {
                          const cat = e.target.value;
                          const labels: Record<string, { bn: string; en: string }> = {
                            food: { bn: 'ক্ষুধা নিবারণ ও খাদ্য', en: 'Hunger Relief & Food' },
                            water: { bn: 'নিরাপদ খাবার পানি', en: 'Clean Water Project' },
                            house: { bn: 'আবাসন ও পুনর্বাসন', en: 'Shelter & Rehabilitation' },
                            orphan: { bn: 'এতিম প্রতিপালন ও শিক্ষা', en: 'Orphan Care & Education' },
                            medical: { bn: 'চিকিৎসা ও স্বাস্থ্যসেবা', en: 'Medical & Healthcare' },
                          };
                          setEditingItem({
                            ...editingItem,
                            data: {
                              ...editingItem.data,
                              category: cat,
                              categoryLabelBn: labels[cat]?.bn || 'অন্যান্য',
                              categoryLabelEn: labels[cat]?.en || 'General Relief',
                            },
                          });
                        }}
                        className="w-full px-3 py-2 border rounded-xl bg-white"
                      >
                        <option value="food">ক্ষুধা নিবারণ ও খাদ্য (Food)</option>
                        <option value="water">নিরাপদ খাবার পানি (Water)</option>
                        <option value="house">আবাসন ও পুনর্বাসন (House / Shelter)</option>
                        <option value="orphan">এতিম প্রতিপালন ও শিক্ষা (Orphan)</option>
                        <option value="medical">চিকিৎসা ও স্বাস্থ্যসেবা (Medical)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">স্থান (বাংলা)</label>
                      <input
                        type="text"
                        value={editingItem.data.locationBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, locationBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="কমলাপুর ও তেজগাঁও বস্তি এলাকা"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">বছর বা সময়কাল (বাংলা)</label>
                      <input
                        type="text"
                        value={editingItem.data.dateBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, dateBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="২০২৪ - ২০২৬"
                      />
                    </div>
                  </div>

                  <div>
                    <ImageSelectorField
                      label="অ্যালবামের প্রধান কভার ফটো"
                      value={editingItem.data.image || (editingItem.data.images && editingItem.data.images[0]) || ''}
                      onChange={url => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: url } })}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700 block">অতিরিক্ত ফটোগুলোর তালিকা (প্রতি লাইনে একটি URL বা পাথ)</label>
                      <span className="text-[10px] text-slate-500">গ্যালারি স্লাইডার ও মডেলে প্রদর্শিত হবে</span>
                    </div>
                    <textarea
                      rows={3}
                      value={editingItem.data.additionalImages ?? (Array.isArray(editingItem.data.images) ? editingItem.data.images.slice(1).join('\n') : '')}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, additionalImages: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                      placeholder="/images/drive-food-2.jpg&#10;/images/drive-food-3.jpg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">অ্যালবামের বিবরণ (বাংলা)</label>
                    <textarea
                      rows={2}
                      value={editingItem.data.descBn || ''}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, descBn: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl"
                      placeholder="এই অ্যালবামের কার্যক্রম সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                    />
                  </div>
                </>
              )}

              {/* === ORPHANS FORM === */}
              {editingItem.type === 'orphans' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">শিশুর নাম (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.nameBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, nameBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Child Name (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.nameEn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, nameEn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">বয়স (বছর)</label>
                      <input
                        type="number"
                        value={editingItem.data.age ?? 8}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, age: Number(e.target.value) } })}
                        className="w-full px-3 py-2 border rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">লিঙ্গ</label>
                      <select
                        value={editingItem.data.gender || 'boy'}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, gender: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl bg-white"
                      >
                        <option value="boy">ছেলে শিশু (Boy)</option>
                        <option value="girl">মেয়ে শিশু (Girl)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">মাদরাসা শ্রেণি / বিভাগ</label>
                      <input
                        type="text"
                        value={editingItem.data.classBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, classBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="হিফজুল কুরআন বিভাগ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">এলাকা / জেলা (বাংলা)</label>
                      <input
                        type="text"
                        value={editingItem.data.locationBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, locationBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="সাভার, ঢাকা"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.data.isSponsored || false}
                          onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, isSponsored: e.target.checked } })}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="font-bold text-slate-700">ইতিমধ্যে স্পনসর পেয়েছে (Sponsored)?</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <ImageSelectorField
                      label="শিশুর ছবি"
                      value={editingItem.data.image || ''}
                      onChange={url => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: url } })}
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">ভবিষ্যৎ স্বপ্ন / লক্ষ্য (বাংলা)</label>
                    <input
                      type="text"
                      value={editingItem.data.dreamBn || ''}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, dreamBn: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl"
                      placeholder="যেমন: হিফজ সম্পন্ন করে আদর্শ শিক্ষক হতে চায়"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">পারিবারিক পটভূমি ও গল্প (বাংলা)</label>
                    <textarea
                      rows={2}
                      value={editingItem.data.storyBn || ''}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, storyBn: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl"
                      placeholder="পিতা হারিয়ে অসহায়..."
                    />
                  </div>
                </>
              )}

              {/* === CAMPAIGNS / UPCOMING / FOUNDATION PROJECTS FORM === */}
              {(editingItem.type === 'campaigns' || editingItem.type === 'upcoming' || editingItem.type === 'foundation') && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">প্রকল্পের নাম (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Project Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.titleEn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, titleEn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <ImageSelectorField
                      label="কার্ডের কভার ইমেজ"
                      value={editingItem.data.image || ''}
                      onChange={url => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: url } })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                      <input
                        type="text"
                        value={editingItem.data.categoryBn || ''}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, categoryBn: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">সংগৃহীত তহবিল (টাকা)</label>
                      <input
                        type="number"
                        value={editingItem.data.raisedBDT ?? 0}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, raisedBDT: Number(e.target.value) } })}
                        className="w-full px-3 py-2 border rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">লক্ষ্যমাত্রা / বাজেট (টাকা)</label>
                      <input
                        type="number"
                        value={editingItem.data.goalBDT ?? editingItem.data.estimatedBudgetBDT ?? 100000}
                        onChange={e =>
                          setEditingItem({
                            ...editingItem,
                            data: {
                              ...editingItem.data,
                              goalBDT: Number(e.target.value),
                              estimatedBudgetBDT: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full px-3 py-2 border rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">বিস্তারিত বিবরণ (বাংলা)</label>
                    <textarea
                      rows={3}
                      value={editingItem.data.descriptionBn || ''}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, descriptionBn: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm cursor-pointer"
                >
                  {isBn ? 'সংরক্ষণ করুন' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Confirmation Modal for Delete (Never alert) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                {isBn ? 'আপনি কি নিশ্চিত এই কার্ডটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this card?'}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {isBn
                  ? `"${deleteTarget.title}" কার্ডটি পার্মানেন্টলি ডিলিট হয়ে যাবে এবং সাথে সাথে ওয়েবসাইট থেকে রিমুভ হবে।`
                  : `"${deleteTarget.title}" will be permanently removed and disappear from the website immediately.`}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                {isBn ? 'না, ফেরত যান' : 'No, Keep Card'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                {isBn ? 'হ্যাঁ, কার্ডটি ডিলিট করুন' : 'Yes, Delete Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

