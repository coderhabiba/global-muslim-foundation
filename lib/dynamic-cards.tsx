'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { FOUNDATION_PROJECTS, FoundationProject } from '@/components/pages/ImpactPage';
import { UPCOMING_PROJECTS, UpcomingProject } from '@/components/pages/UpcomingProjectsPage';
import { ORPHAN_PROFILES, OrphanProfile } from '@/lib/data/orphans';

export interface DynamicCampaign {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  image: string;
  raisedBDT: number;
  goalBDT: number;
  donorsCount: number;
  descriptionBn: string;
  descriptionEn: string;
  isUrgent?: boolean;
}

export const DEFAULT_CAMPAIGNS: DynamicCampaign[] = [
  {
    id: 'camp-01',
    titleBn: 'ওয়ান মিল ওয়ান হোপ: সুবিধাবঞ্চিত অনাহারী মানুষের খাদ্য সহায়তা',
    titleEn: 'One Meal One Hope: Daily Nourishing Meals for the Destitute',
    categoryBn: 'খাদ্য সহায়তা',
    categoryEn: 'Food Relief',
    image: '/images/one-meal-one-hope.jpg',
    raisedBDT: 0,
    goalBDT: 500000,
    donorsCount: 0,
    descriptionBn: 'রেলওয়ে স্টেশন ও বস্তির ছিন্নমূল ক্ষুধার্ত পথশিশু এবং অসহায় বয়স্কদের মাঝে প্রতিদিন পুষ্টিকর গরম খাবার পরিবেশন।',
    descriptionEn: 'Daily freshly cooked hot, balanced meals served to homeless children and destitute elderly people.',
    isUrgent: true,
  },
  {
    id: 'camp-02',
    titleBn: 'প্রজেক্ট আলো: শিশুদের চোখের ছানি অপারেশন ও দৃষ্টিসেবা',
    titleEn: 'Project Alo: Pediatric Cataract Surgeries & Eye Health',
    categoryBn: 'চিকিৎসাসেবা',
    categoryEn: 'Healthcare',
    image: '/images/project-alo-eye-care.jpg',
    raisedBDT: 0,
    goalBDT: 800000,
    donorsCount: 0,
    descriptionBn: 'সুবিধাবঞ্চিত অন্ধত্ব ঝুঁকিতে থাকা শিশুদের বিনামূল্যে বিশ্বমানের লেন্স প্রতিস্থাপন ও চক্ষু পরীক্ষা।',
    descriptionEn: 'Restoring sight to underprivileged children through high-precision micro-surgeries and free medicine.',
    isUrgent: true,
  },
  {
    id: 'camp-03',
    titleBn: 'সুপেয় মিষ্টি পানির গভীর নলকূপ ও স্থায়ী ওজুখানা প্রকল্প',
    titleEn: 'Clean Water Deep Wells & Rural Ablution Stations',
    categoryBn: 'বিশুদ্ধ পানি',
    categoryEn: 'Clean Water',
    image: '/images/clean-water-well.jpg',
    raisedBDT: 0,
    goalBDT: 650000,
    donorsCount: 0,
    descriptionBn: 'উপকূলীয় লবণাক্ত ও আর্সেনিকপ্রবণ অঞ্চলে ৭৫০ ফুট গভীর পাইপ বসিয়ে স্থায়ী মিষ্টি খাবার পানির ব্যবস্থা।',
    descriptionEn: 'Installing 750ft deep arsenic-free community tube wells and hygienic wash blocks for villagers.',
    isUrgent: false,
  },
  {
    id: 'camp-04',
    titleBn: 'প্রজেক্ট শীতলতা: হাড়কাঁপানো শীতে উষ্ণ কম্বল বিতরণ',
    titleEn: 'Project Sheetal: Heavy Winter Blankets & Warm Clothing',
    categoryBn: 'শীতকালীন ত্রাণ',
    categoryEn: 'Winter Relief',
    image: '/images/winter-blanket-distribution.jpg',
    raisedBDT: 0,
    goalBDT: 700000,
    donorsCount: 0,
    descriptionBn: 'উত্তরবঙ্গের হিমপ্রবণ জনপদে সুবিধাবঞ্চিত শীতার্ত শিশু ও বয়োবৃদ্ধদের মাঝে ভারী কম্বল ও শীতবস্ত্র বিতরণ।',
    descriptionEn: 'Heavyweight double-ply winter fleece blankets delivered directly to impoverished rural communities.',
    isUrgent: false,
  },
];

interface CardContextType {
  campaigns: DynamicCampaign[];
  addCampaign: (item: Omit<DynamicCampaign, 'id'>) => void;
  updateCampaign: (id: string, item: Partial<DynamicCampaign>) => void;
  deleteCampaign: (id: string) => void;

  upcomingProjects: UpcomingProject[];
  addUpcomingProject: (item: Omit<UpcomingProject, 'id'>) => void;
  updateUpcomingProject: (id: string, item: Partial<UpcomingProject>) => void;
  deleteUpcomingProject: (id: string) => void;

  foundationProjects: FoundationProject[];
  addFoundationProject: (item: Omit<FoundationProject, 'id'>) => void;
  updateFoundationProject: (id: string, item: Partial<FoundationProject>) => void;
  deleteFoundationProject: (id: string) => void;

  orphans: OrphanProfile[];
  addOrphan: (item: Omit<OrphanProfile, 'id'>) => void;
  updateOrphan: (id: string, item: Partial<OrphanProfile>) => void;
  deleteOrphan: (id: string) => void;

  resetAllCards: () => void;
}

const DynamicCardContext = createContext<CardContextType | undefined>(undefined);

const STORAGE_KEYS = {
  campaigns: 'gmcf:dynamic_campaigns_v1',
  upcoming: 'gmcf:dynamic_upcoming_v1',
  foundation: 'gmcf:dynamic_foundation_v1',
  orphans: 'gmcf:dynamic_orphans_v1',
};

export function DynamicCardProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<DynamicCampaign[]>(DEFAULT_CAMPAIGNS);
  const [upcomingProjects, setUpcomingProjects] = useState<UpcomingProject[]>(UPCOMING_PROJECTS);
  const [foundationProjects, setFoundationProjects] = useState<FoundationProject[]>(FOUNDATION_PROJECTS);
  const [orphans, setOrphans] = useState<OrphanProfile[]>(ORPHAN_PROFILES);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedCamp = localStorage.getItem(STORAGE_KEYS.campaigns);
      if (storedCamp) setCampaigns(JSON.parse(storedCamp));

      const storedUp = localStorage.getItem(STORAGE_KEYS.upcoming);
      if (storedUp) setUpcomingProjects(JSON.parse(storedUp));

      const storedFnd = localStorage.getItem(STORAGE_KEYS.foundation);
      if (storedFnd) setFoundationProjects(JSON.parse(storedFnd));

      const storedOrp = localStorage.getItem(STORAGE_KEYS.orphans);
      if (storedOrp) setOrphans(JSON.parse(storedOrp));
    } catch (e) {
      console.error('Error loading card records from localStorage:', e);
    }
  }, []);

  // Save Helpers
  const persistCampaigns = (list: DynamicCampaign[]) => {
    setCampaigns(list);
    try {
      localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const persistUpcoming = (list: UpcomingProject[]) => {
    setUpcomingProjects(list);
    try {
      localStorage.setItem(STORAGE_KEYS.upcoming, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const persistFoundation = (list: FoundationProject[]) => {
    setFoundationProjects(list);
    try {
      localStorage.setItem(STORAGE_KEYS.foundation, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const persistOrphans = (list: OrphanProfile[]) => {
    setOrphans(list);
    try {
      localStorage.setItem(STORAGE_KEYS.orphans, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  // Campaigns Actions
  const addCampaign = (item: Omit<DynamicCampaign, 'id'>) => {
    const newItem: DynamicCampaign = {
      ...item,
      id: 'camp-' + Date.now().toString().slice(-4),
    };
    persistCampaigns([newItem, ...campaigns]);
  };

  const updateCampaign = (id: string, patch: Partial<DynamicCampaign>) => {
    persistCampaigns(campaigns.map(c => (c.id === id ? { ...c, ...patch } : c)));
  };

  const deleteCampaign = (id: string) => {
    persistCampaigns(campaigns.filter(c => c.id !== id));
  };

  // Upcoming Actions
  const addUpcomingProject = (item: Omit<UpcomingProject, 'id'>) => {
    const newItem: UpcomingProject = {
      ...item,
      id: 'proj-' + (upcomingProjects.length + 1).toString().padStart(2, '0'),
    };
    persistUpcoming([newItem, ...upcomingProjects]);
  };

  const updateUpcomingProject = (id: string, patch: Partial<UpcomingProject>) => {
    persistUpcoming(upcomingProjects.map(p => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteUpcomingProject = (id: string) => {
    persistUpcoming(upcomingProjects.filter(p => p.id !== id));
  };

  // Foundation Actions
  const addFoundationProject = (item: Omit<FoundationProject, 'id'>) => {
    const newItem: FoundationProject = {
      ...item,
      id: 'PRJ-' + (foundationProjects.length + 1).toString().padStart(2, '0'),
    };
    persistFoundation([newItem, ...foundationProjects]);
  };

  const updateFoundationProject = (id: string, patch: Partial<FoundationProject>) => {
    persistFoundation(foundationProjects.map(p => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteFoundationProject = (id: string) => {
    persistFoundation(foundationProjects.filter(p => p.id !== id));
  };

  // Orphan Actions
  const addOrphan = (item: Omit<OrphanProfile, 'id'>) => {
    const newItem: OrphanProfile = {
      ...item,
      id: 'GMCF-ORP-' + (orphans.length + 1).toString().padStart(2, '0'),
    };
    persistOrphans([newItem, ...orphans]);
  };

  const updateOrphan = (id: string, patch: Partial<OrphanProfile>) => {
    persistOrphans(orphans.map(o => (o.id === id ? { ...o, ...patch } : o)));
  };

  const deleteOrphan = (id: string) => {
    persistOrphans(orphans.filter(o => o.id !== id));
  };

  const resetAllCards = () => {
    persistCampaigns(DEFAULT_CAMPAIGNS);
    persistUpcoming(UPCOMING_PROJECTS);
    persistFoundation(FOUNDATION_PROJECTS);
    persistOrphans(ORPHAN_PROFILES);
  };

  return (
    <DynamicCardContext.Provider
      value={{
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
      }}
    >
      {children}
    </DynamicCardContext.Provider>
  );
}

export function useDynamicCards() {
  const ctx = useContext(DynamicCardContext);
  if (!ctx) {
    return {
      campaigns: DEFAULT_CAMPAIGNS,
      addCampaign: () => {},
      updateCampaign: () => {},
      deleteCampaign: () => {},
      upcomingProjects: UPCOMING_PROJECTS,
      addUpcomingProject: () => {},
      updateUpcomingProject: () => {},
      deleteUpcomingProject: () => {},
      foundationProjects: FOUNDATION_PROJECTS,
      addFoundationProject: () => {},
      updateFoundationProject: () => {},
      deleteFoundationProject: () => {},
      orphans: ORPHAN_PROFILES,
      addOrphan: () => {},
      updateOrphan: () => {},
      deleteOrphan: () => {},
      resetAllCards: () => {},
    };
  }
  return ctx;
}

