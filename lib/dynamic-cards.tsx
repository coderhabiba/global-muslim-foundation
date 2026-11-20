'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FOUNDATION_PROJECTS, FoundationProject } from '@/components/pages/ImpactPage';
import { UPCOMING_PROJECTS, UpcomingProject } from '@/components/pages/UpcomingProjectsPage';
import { ORPHAN_PROFILES, OrphanProfile } from '@/lib/data/orphans';
import { NEWS_ARTICLES, NewsArticle } from '@/components/pages/CurrentNewsPage';
import { PROJECT_TOPICS, ProjectTopic } from '@/components/pages/GalleryPage';

export type { NewsArticle, ProjectTopic };

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
  {
    id: 'camp-05',
    titleBn: 'মাসিক খাবার বিতরণ: পথঅনাহারীদের মাঝে বিরিয়ানি ও নিরাপদ পানি বিতরণ',
    titleEn: 'Monthly Food Distribution: Hot Biryani & Clean Water for Dhaka Street Destitute',
    categoryBn: 'খাদ্য সহায়তা',
    categoryEn: 'Food Relief',
    image: '/images/volunteers-cooking-pots.jpg',
    raisedBDT: 0,
    goalBDT: 500000,
    donorsCount: 0,
    descriptionBn: 'প্রতি মাসে ঢাকার বিভিন্ন এলাকায় রাত্রে পথঅনাহারীদের মাঝে ১ প্যাকেট বিরিয়ানি ও ৫০০ মিলি পানি বিতরণ (প্রতি প্যাকেট মাত্র ১০০/- টাকা)।',
    descriptionEn: 'Distributing warm biryani packets and 500ml water bottles to homeless street destitute in Dhaka at night (Only 100 BDT per packet).',
    isUrgent: true,
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

  newsArticles: NewsArticle[];
  addNewsArticle: (item: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, item: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  galleryTopics: ProjectTopic[];
  addGalleryTopic: (item: Omit<ProjectTopic, 'id'>) => void;
  updateGalleryTopic: (id: string, item: Partial<ProjectTopic>) => void;
  deleteGalleryTopic: (id: string) => void;

  resetAllCards: () => void;
}

const DynamicCardContext = createContext<CardContextType | undefined>(undefined);

const STORAGE_KEYS = {
  campaigns: 'gmcf:dynamic_campaigns_v1',
  upcoming: 'gmcf:dynamic_upcoming_v1',
  foundation: 'gmcf:dynamic_foundation_v1',
  orphans: 'gmcf:dynamic_orphans_v1',
  news: 'gmcf:dynamic_news_v1',
  gallery: 'gmcf:dynamic_gallery_v1',
};

export function DynamicCardProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<DynamicCampaign[]>(DEFAULT_CAMPAIGNS);
  const [upcomingProjects, setUpcomingProjects] = useState<UpcomingProject[]>(UPCOMING_PROJECTS);
  const [foundationProjects, setFoundationProjects] = useState<FoundationProject[]>(FOUNDATION_PROJECTS);
  const [orphans, setOrphans] = useState<OrphanProfile[]>(ORPHAN_PROFILES);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [galleryTopics, setGalleryTopics] = useState<ProjectTopic[]>(PROJECT_TOPICS);

  // Initialize from LocalStorage with automatic merge for newly added items
  useEffect(() => {
    try {
      const storedCamp = localStorage.getItem(STORAGE_KEYS.campaigns);
      if (storedCamp) {
        const parsed: DynamicCampaign[] = JSON.parse(storedCamp);
        const existingIds = new Set(parsed.map(c => c.id));
        const missing = DEFAULT_CAMPAIGNS.filter(c => !existingIds.has(c.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setCampaigns(merged);
          localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(merged));
        } else {
          setCampaigns(parsed);
        }
      }

      const storedUp = localStorage.getItem(STORAGE_KEYS.upcoming);
      if (storedUp) {
        const parsed: UpcomingProject[] = JSON.parse(storedUp);
        const existingIds = new Set(parsed.map(u => u.id));
        const missing = UPCOMING_PROJECTS.filter(u => !existingIds.has(u.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setUpcomingProjects(merged);
          localStorage.setItem(STORAGE_KEYS.upcoming, JSON.stringify(merged));
        } else {
          setUpcomingProjects(parsed);
        }
      }

      const storedFnd = localStorage.getItem(STORAGE_KEYS.foundation);
      if (storedFnd) {
        const parsed: FoundationProject[] = JSON.parse(storedFnd);
        const existingIds = new Set(parsed.map(f => f.id));
        const missing = FOUNDATION_PROJECTS.filter(f => !existingIds.has(f.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setFoundationProjects(merged);
          localStorage.setItem(STORAGE_KEYS.foundation, JSON.stringify(merged));
        } else {
          setFoundationProjects(parsed);
        }
      }

      const storedOrp = localStorage.getItem(STORAGE_KEYS.orphans);
      if (storedOrp) {
        const parsed: OrphanProfile[] = JSON.parse(storedOrp);
        const existingIds = new Set(parsed.map(o => o.id));
        const missing = ORPHAN_PROFILES.filter(o => !existingIds.has(o.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setOrphans(merged);
          localStorage.setItem(STORAGE_KEYS.orphans, JSON.stringify(merged));
        } else {
          setOrphans(parsed);
        }
      }

      const storedNews = localStorage.getItem(STORAGE_KEYS.news);
      if (storedNews) {
        const parsed: NewsArticle[] = JSON.parse(storedNews);
        const existingIds = new Set(parsed.map(n => n.id));
        const missing = NEWS_ARTICLES.filter(n => !existingIds.has(n.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setNewsArticles(merged);
          localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(merged));
        } else {
          setNewsArticles(parsed);
        }
      }

      const storedGal = localStorage.getItem(STORAGE_KEYS.gallery);
      if (storedGal) {
        const parsed: ProjectTopic[] = JSON.parse(storedGal);
        const existingIds = new Set(parsed.map(g => g.id));
        const missing = PROJECT_TOPICS.filter(g => !existingIds.has(g.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setGalleryTopics(merged);
          localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(merged));
        } else {
          setGalleryTopics(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading card records from localStorage:', e);
    }

    // Load and sync dynamic cards from Supabase
    supabase
      .from('dynamic_cards')
      .select('id, category, data')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const camps: DynamicCampaign[] = [];
          const upcomings: UpcomingProject[] = [];
          const founds: FoundationProject[] = [];
          const orphs: OrphanProfile[] = [];
          const newsList: NewsArticle[] = [];
          const galleries: ProjectTopic[] = [];

          data.forEach(row => {
            if (row.category === 'campaigns') camps.push(row.data);
            else if (row.category === 'upcoming') upcomings.push(row.data);
            else if (row.category === 'foundation') founds.push(row.data);
            else if (row.category === 'orphans') orphs.push(row.data);
            else if (row.category === 'news') newsList.push(row.data);
            else if (row.category === 'gallery') galleries.push(row.data);
          });

          if (camps.length > 0) {
            setCampaigns(camps);
            try { localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(camps)); } catch (e) {}
          }
          if (upcomings.length > 0) {
            setUpcomingProjects(upcomings);
            try { localStorage.setItem(STORAGE_KEYS.upcoming, JSON.stringify(upcomings)); } catch (e) {}
          }
          if (founds.length > 0) {
            setFoundationProjects(founds);
            try { localStorage.setItem(STORAGE_KEYS.foundation, JSON.stringify(founds)); } catch (e) {}
          }
          if (orphs.length > 0) {
            setOrphans(orphs);
            try { localStorage.setItem(STORAGE_KEYS.orphans, JSON.stringify(orphs)); } catch (e) {}
          }
          if (newsList.length > 0) {
            setNewsArticles(newsList);
            try { localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(newsList)); } catch (e) {}
          }
          if (galleries.length > 0) {
            setGalleryTopics(galleries);
            try { localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(galleries)); } catch (e) {}
          }
        }
      });
  }, []);

  // Sync a single card category to Supabase
  const syncCategoryToSupabase = (category: string, list: any[]) => {
    // Upsert items into Supabase
    const rows = list.map(item => ({
      id: `${category}-${item.id}`,
      category,
      data: item,
      updated_at: new Date().toISOString(),
    }));

    if (rows.length > 0) {
      supabase
        .from('dynamic_cards')
        .upsert(rows, { onConflict: 'id' })
        .then(({ error }) => {
          if (error) console.error(`Supabase sync ${category} error:`, error.message);
        });
    }
  };

  const deleteCardFromSupabase = (category: string, itemId: string) => {
    supabase
      .from('dynamic_cards')
      .delete()
      .eq('id', `${category}-${itemId}`)
      .then(({ error }) => {
        if (error) console.error(`Supabase delete ${category} error:`, error.message);
      });
  };

  // Save Helpers
  const persistCampaigns = (list: DynamicCampaign[]) => {
    setCampaigns(list);
    try {
      localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('campaigns', list);
  };

  const persistUpcoming = (list: UpcomingProject[]) => {
    setUpcomingProjects(list);
    try {
      localStorage.setItem(STORAGE_KEYS.upcoming, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('upcoming', list);
  };

  const persistFoundation = (list: FoundationProject[]) => {
    setFoundationProjects(list);
    try {
      localStorage.setItem(STORAGE_KEYS.foundation, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('foundation', list);
  };

  const persistOrphans = (list: OrphanProfile[]) => {
    setOrphans(list);
    try {
      localStorage.setItem(STORAGE_KEYS.orphans, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('orphans', list);
  };

  const persistNews = (list: NewsArticle[]) => {
    setNewsArticles(list);
    try {
      localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('news', list);
  };

  const persistGallery = (list: ProjectTopic[]) => {
    setGalleryTopics(list);
    try {
      localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(list));
      window.dispatchEvent(new Event('gmcf:cards_updated'));
    } catch (e) {
      console.error(e);
    }
    syncCategoryToSupabase('gallery', list);
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
    deleteCardFromSupabase('campaigns', id);
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
    deleteCardFromSupabase('upcoming', id);
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
    deleteCardFromSupabase('foundation', id);
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
    deleteCardFromSupabase('orphans', id);
  };

  // News Actions
  const addNewsArticle = (item: Omit<NewsArticle, 'id'>) => {
    const newItem: NewsArticle = {
      ...item,
      id: 'news-' + (newsArticles.length + 1).toString().padStart(2, '0'),
    };
    persistNews([newItem, ...newsArticles]);
  };

  const updateNewsArticle = (id: string, patch: Partial<NewsArticle>) => {
    persistNews(newsArticles.map(n => (n.id === id ? { ...n, ...patch } : n)));
  };

  const deleteNewsArticle = (id: string) => {
    persistNews(newsArticles.filter(n => n.id !== id));
    deleteCardFromSupabase('news', id);
  };

  // Gallery Actions
  const addGalleryTopic = (item: Omit<ProjectTopic, 'id'>) => {
    const newItem: ProjectTopic = {
      ...item,
      id: 'gal-' + (galleryTopics.length + 1).toString().padStart(2, '0'),
    };
    persistGallery([newItem, ...galleryTopics]);
  };

  const updateGalleryTopic = (id: string, patch: Partial<ProjectTopic>) => {
    persistGallery(galleryTopics.map(g => (g.id === id ? { ...g, ...patch } : g)));
  };

  const deleteGalleryTopic = (id: string) => {
    persistGallery(galleryTopics.filter(g => g.id !== id));
    deleteCardFromSupabase('gallery', id);
  };

  const resetAllCards = () => {
    persistCampaigns(DEFAULT_CAMPAIGNS);
    persistUpcoming(UPCOMING_PROJECTS);
    persistFoundation(FOUNDATION_PROJECTS);
    persistOrphans(ORPHAN_PROFILES);
    persistNews(NEWS_ARTICLES);
    persistGallery(PROJECT_TOPICS);
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
        newsArticles,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        galleryTopics,
        addGalleryTopic,
        updateGalleryTopic,
        deleteGalleryTopic,
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
      newsArticles: NEWS_ARTICLES,
      addNewsArticle: () => {},
      updateNewsArticle: () => {},
      deleteNewsArticle: () => {},
      galleryTopics: PROJECT_TOPICS,
      addGalleryTopic: () => {},
      updateGalleryTopic: () => {},
      deleteGalleryTopic: () => {},
      resetAllCards: () => {},
    };
  }
  return ctx;
}

