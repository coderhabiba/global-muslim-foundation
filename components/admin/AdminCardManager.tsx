'use client';

import React, { useState } from 'react';
import { useDynamicCards, DynamicCampaign } from '@/lib/dynamic-cards';
import { FoundationProject } from '@/components/pages/ImpactPage';
import { UpcomingProject } from '@/components/pages/UpcomingProjectsPage';
import { OrphanProfile } from '@/lib/data/orphans';
import ImageSelectorField from './ImageSelectorField';

type CardTab = 'campaigns' | 'upcoming' | 'foundation' | 'orphans';

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
    resetAllCards,
  } = useDynamicCards();

  const [activeTab, setActiveTab] = useState<CardTab>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; type: CardTab } | null>(null);

  // Edit / Add modal states
  const [editingItem, setEditingItem] = useState<{ type: CardTab; isNew: boolean; data: any } | null>(null);

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
    }

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;
    if (type === 'campaigns') deleteCampaign(id);
    else if (type === 'upcoming') deleteUpcomingProject(id);
    else if (type === 'foundation') deleteFoundationProject(id);
    else if (type === 'orphans') deleteOrphan(id);

    setDeleteTarget(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-slate-50/70">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>১০০% ফুল ডাইনামিক কার্ড কন্ট্রোল ম্যানেজার</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700">view_carousel</span>
            <span>সকল কার্ড, ইভেন্ট ও প্রজেক্ট ম্যানেজমেন্ট (Add, Edit, Delete)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            সাইটের হোমপেইজ ক্যাম্পেইন, আসন্ন প্রজেক্ট, ফাউন্ডেশনের চলমান প্রজেক্ট ও এতিম শিশুদের কার্ড সরাসরি যোগ, এডিট ও ডিলিট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>নতুন কার্ড / প্রজেক্ট যুক্ত করুন</span>
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
            <span>১. হোমপেইজ ক্যাম্পেইন ({campaigns.length})</span>
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
            <span>২. আসন্ন প্রকল্প সমূহ ({upcomingProjects.length})</span>
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
            <span>৩. আমাদের প্রজেক্ট সমূহ ({foundationProjects.length})</span>
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
            <span>৪. এতিম শিশু প্রোফাইল ({orphans.length})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="কার্ডের নাম বা ক্যাটাগরি খুঁজুন..."
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
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{camp.titleBn}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{camp.descriptionBn}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>সংগৃহীত: ৳{camp.raisedBDT.toLocaleString()}</span>
                    <span className="text-slate-500">লক্ষ্য: ৳{camp.goalBDT.toLocaleString()}</span>
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
                  <span>এডিট</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: camp.id, title: camp.titleBn, type: 'campaigns' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>ডিলিট</span>
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
                    {p.categoryBn}
                  </span>
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {p.statusBn}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-amber-700 uppercase">{p.id}</span>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{p.titleBn}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{p.descriptionBn}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>বাজেট: ৳{p.estimatedBudgetBDT.toLocaleString()}</span>
                    <span className="text-slate-500">{p.targetDateBn}</span>
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
                  <span>এডিট</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: p.id, title: p.titleBn, type: 'upcoming' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>ডিলিট</span>
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
                    {f.categoryBn}
                  </span>
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    প্রজেক্ট {f.projectNoBn}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{f.titleBn}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{f.descriptionBn}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>সংগৃহীত: ৳{f.raisedBDT.toLocaleString()}</span>
                    <span className="text-slate-500">লক্ষ্য: ৳{f.goalBDT.toLocaleString()}</span>
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
                  <span>এডিট</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: f.id, title: f.titleBn, type: 'foundation' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>ডিলিট</span>
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
                    {o.isSponsored ? 'স্পনসরকৃত' : 'স্পনসর প্রয়োজন'}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    বয়স: {o.age} বছর
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="text-[11px] font-mono font-bold text-emerald-700">{o.id}</p>
                  <h4 className="font-bold text-slate-900 text-sm">{o.nameBn} ({o.nameEn})</h4>
                  <p className="text-xs text-slate-500">{o.classBn} • {o.locationBn}</p>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">স্বপ্ন: {o.dreamBn}</p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem({ type: 'orphans', isNew: false, data: { ...o } })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>এডিট</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: o.id, title: o.nameBn, type: 'orphans' })}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>ডিলিট</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700">edit_note</span>
                <span>{editingItem.isNew ? 'নতুন কার্ড যুক্ত করুন' : 'কার্ড এডিট করুন'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিরোনাম (বাংলা)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.data.titleBn || editingItem.data.nameBn || ''}
                    onChange={e =>
                      setEditingItem({
                        ...editingItem,
                        data: {
                          ...editingItem.data,
                          titleBn: e.target.value,
                          nameBn: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিরোনাম (ইংরেজি)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.data.titleEn || editingItem.data.nameEn || ''}
                    onChange={e =>
                      setEditingItem({
                        ...editingItem,
                        data: {
                          ...editingItem.data,
                          titleEn: e.target.value,
                          nameEn: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Image Selector Field */}
              <div>
                <ImageSelectorField
                  label="কার্ডের কভার ইমেজ"
                  value={editingItem.data.image || ''}
                  onChange={url =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, image: url },
                    })
                  }
                />
              </div>

              {/* Categorization & Financials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি / বিভাগ</label>
                  <input
                    type="text"
                    value={editingItem.data.categoryBn || editingItem.data.classBn || ''}
                    onChange={e =>
                      setEditingItem({
                        ...editingItem,
                        data: {
                          ...editingItem.data,
                          categoryBn: e.target.value,
                          classBn: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">সংগৃহীত তহবিল (টাকা)</label>
                  <input
                    type="number"
                    value={editingItem.data.raisedBDT ?? 0}
                    onChange={e =>
                      setEditingItem({
                        ...editingItem,
                        data: {
                          ...editingItem.data,
                          raisedBDT: Number(e.target.value),
                        },
                      })
                    }
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
                  value={editingItem.data.descriptionBn || editingItem.data.storyBn || ''}
                  onChange={e =>
                    setEditingItem({
                      ...editingItem,
                      data: {
                        ...editingItem.data,
                        descriptionBn: e.target.value,
                        storyBn: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm cursor-pointer"
                >
                  সংরক্ষণ করুন
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
              <h4 className="text-base font-bold text-slate-900">আপনি কি নিশ্চিত এই কার্ডটি মুছে ফেলতে চান?</h4>
              <p className="text-xs text-slate-500 font-medium">"{deleteTarget.title}" কার্ডটি পার্মানেন্টলি ডিলিট হয়ে যাবে এবং সাথে সাথে ওয়েবসাইট থেকে রিমুভ হবে।</p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                না, ফেরত যান
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                হ্যাঁ, কার্ডটি ডিলিট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
