'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useModalState } from '@/lib/modal-context';
import { useDynamicCards } from '@/lib/dynamic-cards';
import { useSiteCMS, SitePageKey, SiteCMSContent } from '@/lib/site-cms';
import AdminCardManager from '@/components/admin/AdminCardManager';
import AdminSectionEditor from '@/components/admin/AdminSectionEditor';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Layers,
  HeartHandshake,
  Users,
  HandHeart,
  FolderKanban,
  Settings,
  Search,
  Download,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  LogOut,
  X,
  FileText,
  BadgeCheck,
  Menu,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  TrendingUp,
  PieChart,
  History,
  Sparkles,
  ArrowUpRight,
  Activity,
  Calendar,
  DollarSign,
  Award,
} from 'lucide-react';

type DonationRecord = {
  id: string;
  donorName: string;
  donorPhone: string;
  donorEmail: string;
  amount: number;
  currency: string;
  cause: string;
  method: string;
  status: string;
  date: string;
  gateway: string;
};

export type MemberRecord = {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  category: 'board' | 'management' | 'advisor';
  departmentBn?: string;
  image: string;
  phone?: string;
  email?: string;
  locationBn?: string;
  bioBn?: string;
};

export type VolunteerCandidate = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  district: string;
  category: string;
  skills: string;
  image?: string;
  date: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
};

const PRESET_AVATARS = [
  { label: 'ভলান্টিয়ার ১', url: '/images/humanitarian-volunteers.jpg' },
  { label: 'ভলান্টিয়ার ২', url: '/images/youth-volunteers.jpg' },
  { label: 'মা ও স্বাস্থ্য', url: '/images/resilient-mother-portrait.jpg' },
  { label: 'চিকিৎসা কর্মী', url: '/images/pediatric-hope-saifan.jpg' },
  { label: 'ফিল্ড কর্মী', url: '/images/clean-water-well.jpg' },
  { label: 'খাদ্য বিতরণ', url: '/images/street-children-hot-meals.jpg' },
  { label: 'মাদরাসা সেবা', url: '/images/rural-madrasa-children.jpg' },
  { label: 'ডকুমেন্টারি', url: '/images/child-portrait-documentary.jpg' },
];

const DEFAULT_MEMBERS: MemberRecord[] = [
  {
    id: 'm1',
    category: 'board',
    nameBn: 'মোহাম্মদ আলী মোস্তফা',
    nameEn: 'Mohammad Ali Mostafa',
    roleBn: 'চেয়ারম্যান ও প্রতিষ্ঠাতা',
    roleEn: 'Chairman & Founder',
    departmentBn: 'পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড',
    locationBn: '৯৯, কায়সারচর, ভাকুর্তা, সাভার, ঢাকা',
    image: '/images/humanitarian-volunteers.jpg',
    phone: '01913119525',
    email: 'gmcfoundation2022@gmail.com',
    bioBn: 'ফাউন্ডেশনের দূরদর্শী অভিভাবক ও দিকনির্দেশক। শতভাগ স্বচ্ছতা ও জিরো অ্যাডমিন খরচে প্রতিটি সহায়তা সরাসরি দুস্থদের কাছে পৌঁছে দিতে অগ্রণী ভূমিকা পালন করছেন।',
  },
  {
    id: 'm2',
    category: 'board',
    nameBn: 'মুফতি মাওলানা আব্দুল কুদ্দুস',
    nameEn: 'Mufti Mawlana Abdul Quddus',
    roleBn: 'প্রধান শরীয়াহ উপদেষ্টা ও অডিটর',
    roleEn: 'Chief Shariah Advisor',
    departmentBn: 'কেন্দ্রীয় শরীয়াহ বোর্ড',
    locationBn: 'ঢাকা, বাংলাদেশ',
    image: '/images/rural-madrasa-children.jpg',
    phone: '01711-223344',
    email: 'shariah@gmcf.org',
    bioBn: 'যাকাতের হকদার ও তামলিক নির্ধারণ, নিসাব মূল্যায়ন এবং প্রতিটি তহবিল বণ্টনে পূর্ণ শরীয়াহ নীতিমালার কঠোর তত্ত্বাবধানকারী।',
  },
  {
    id: 'm3',
    category: 'board',
    nameBn: 'ব্যারিস্টার ফারহান চৌধুরী',
    nameEn: 'Barrister Farhan Chowdhury',
    roleBn: 'আইন ও কমপ্লায়েন্স পরিচালক',
    roleEn: 'Legal & Compliance Director',
    departmentBn: 'আইন ও এনজিও ব্যুরো সেল',
    locationBn: 'সুপ্রিম কোর্ট ও সাভার অফিস',
    image: '/images/resilient-mother-portrait.jpg',
    phone: '01819-887766',
    email: 'legal@gmcf.org',
    bioBn: 'এনজিও বিষয়ক ব্যুরো, বার্ষিক বিধিবদ্ধ অডিট এবং আন্তর্জাতিক অনুদান মনিটরিং নিশ্চিতকরণ।',
  },
  {
    id: 'm4',
    category: 'management',
    nameBn: 'প্রকৌশলী মাহমুদুর রহমান',
    nameEn: 'Engr. Mahmudur Rahman',
    roleBn: 'ফিল্ড অপারেশন ও সুপেয় পানি সমন্বয়ক',
    roleEn: 'Field Operations & WASH Lead',
    departmentBn: 'প্রকৌশল ও পুনর্বাসন সেল',
    locationBn: 'সুনামগঞ্জ ও কুড়িগ্রাম ক্যাম্প',
    image: '/images/clean-water-well.jpg',
    phone: '01722-445566',
    email: 'operations@gmcf.org',
    bioBn: 'চরাঞ্চল ও বন্যাদুর্গত এলাকায় গভীর নলকূপ স্থাপন, ঘর নির্মাণ ও টেকনিক্যাল টিম পরিচালনা করেন।',
  },
  {
    id: 'm5',
    category: 'management',
    nameBn: 'ডাঃ শাহানা আক্তার',
    nameEn: 'Dr. Shahana Akhter',
    roleBn: 'চিকিৎসা ও শিশু স্বাস্থ্য পরিচালক',
    roleEn: 'Medical Outreach Director',
    departmentBn: 'প্রজেক্ট আলো মেডিকেল টিম',
    locationBn: 'ঢাকা ও ফিল্ড মেডিকেল ক্যাম্প',
    image: '/images/pediatric-hope-saifan.jpg',
    phone: '01911-778899',
    email: 'health@gmcf.org',
    bioBn: 'দৃষ্টিহীনদের চোখের ছানি অপারেশন ও শিশুদের জরুরি সার্জারি তত্ত্বাবধানে নিবেদিত।',
  },
  {
    id: 'm6',
    category: 'management',
    nameBn: 'তানভীর হোসেন',
    nameEn: 'Tanvir Hossain',
    roleBn: 'খাদ্য ও জরুরি ত্রাণ সমন্বয়ক',
    roleEn: 'Relief & Emergency Food Coordinator',
    departmentBn: 'ওয়ান মিল ওয়ান হোপ প্রোগ্রাম',
    locationBn: 'সাভার কেন্দ্রীয় রান্নাঘর',
    image: '/images/street-children-hot-meals.jpg',
    phone: '01633-998877',
    email: 'relief@gmcf.org',
    bioBn: 'পথশিশু ও অনাহারী মানুষের জন্য প্রতিদিন খাবার রান্না ও বিতরণ নেটওয়ার্ক তদারকি করেন।',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { openLicenseModal, openPaymentModal } = useModalState();
  const { campaigns } = useDynamicCards();
  const [activeTab, setActiveTab] = useState<'overview' | 'section_editor' | 'donations' | 'members' | 'volunteers' | 'campaigns' | 'settings'>('overview');
  const [chartTimeframe, setChartTimeframe] = useState<'7d' | '30d' | 'year'>('7d');
  const [isMounted, setIsMounted] = useState(false);

  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>(DEFAULT_MEMBERS);
  const [volunteers, setVolunteers] = useState<VolunteerCandidate[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [volunteerSearchTerm, setVolunteerSearchTerm] = useState('');

  // Member Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Omit<MemberRecord, 'id'>>({
    nameBn: '',
    nameEn: '',
    roleBn: '',
    roleEn: '',
    category: 'board',
    departmentBn: 'পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড',
    image: '/images/humanitarian-volunteers.jpg',
    phone: '',
    email: '',
    locationBn: 'ঢাকা, বাংলাদেশ',
    bioBn: '',
  });

  // Delete Confirmation Modal State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: 'member' | 'volunteer';
    id: string;
    name: string;
  }>({
    isOpen: false,
    type: 'member',
    id: '',
    name: '',
  });

  // Volunteer Modal State
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [editingVolunteerId, setEditingVolunteerId] = useState<string | null>(null);
  const [volunteerForm, setVolunteerForm] = useState<Omit<VolunteerCandidate, 'id' | 'date'>>({
    name: '',
    phone: '',
    email: '',
    district: 'ঢাকা',
    category: 'জরুরি খাদ্য ও বস্ত্র বিতরণ',
    skills: 'ফিল্ড অপারেশন ও সহায়তা',
    image: '/images/youth-volunteers.jpg',
    status: 'PENDING',
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check authentication
    const authData = localStorage.getItem('gmcf:admin_auth');
    if (!authData) {
      router.push('/login');
      return;
    }

    // 1. Load donations from localStorage & Supabase
    try {
      const storedDonations = JSON.parse(localStorage.getItem('gmcf:donations') || '[]');
      if (Array.isArray(storedDonations)) {
        const mockDonationIds = new Set(['EPS849204912', 'EPS920194012', 'EPS103948291', 'EPS583920194', 'EPS384910293']);
        const cleaned = storedDonations.filter((d: DonationRecord) => !mockDonationIds.has(d.id));
        if (cleaned.length !== storedDonations.length) {
          localStorage.setItem('gmcf:donations', JSON.stringify(cleaned));
        }
        setDonations(cleaned);
      }
    } catch (e) {
      console.error(e);
    }
    supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: DonationRecord[] = data.map(d => ({
            id: d.transaction_id || d.id,
            donorName: d.donor_name || 'Anonymous Donor',
            donorPhone: d.donor_phone || '',
            donorEmail: d.donor_email || '',
            amount: Number(d.amount) || 0,
            currency: d.currency || 'BDT',
            cause: d.cause || 'General Relief',
            method: (d.payment_method || 'EPS').toUpperCase(),
            status: (d.status || 'SUCCESS').toUpperCase(),
            date: new Date(d.created_at).toISOString().replace('T', ' ').substring(0, 19),
            gateway: 'EPS Easy Payment System',
          }));
          setDonations(prev => {
            const existingIds = new Set(mapped.map(m => m.id));
            const rest = prev.filter(p => !existingIds.has(p.id));
            return [...mapped, ...rest];
          });
        }
      });

    // 2. Load members from localStorage & Supabase
    try {
      const storedMembers = JSON.parse(localStorage.getItem('gmcf:members') || '[]');
      if (storedMembers && Array.isArray(storedMembers) && storedMembers.length > 0) {
        setMembers(storedMembers);
      }
    } catch (e) {
      console.error(e);
    }
    supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: MemberRecord[] = data.map(d => ({
            id: d.id,
            nameBn: d.name_bn,
            nameEn: d.name_en || d.name_bn,
            roleBn: d.role_bn,
            roleEn: d.role_en || d.role_bn,
            category: (d.category || 'board') as any,
            departmentBn: d.department_bn || '',
            image: d.image || '/images/humanitarian-volunteers.jpg',
            phone: d.phone || '',
            email: d.email || '',
            locationBn: d.location_bn || '',
            bioBn: d.bio_bn || '',
          }));
          setMembers(prev => {
            const existingIds = new Set(mapped.map(m => m.id));
            const rest = prev.filter(p => !existingIds.has(p.id));
            return [...mapped, ...rest];
          });
        }
      });

    // 3. Load volunteers from localStorage & Supabase
    try {
      const storedVolunteers = JSON.parse(localStorage.getItem('gmcf:volunteers') || '[]');
      if (Array.isArray(storedVolunteers)) {
        const mockVolIds = new Set(['VOL-2025-01', 'VOL-2025-02', 'VOL-2025-03', 'VOL-2025-04']);
        const cleanedVols = storedVolunteers.filter((v: VolunteerCandidate) => !mockVolIds.has(v.id));
        if (cleanedVols.length !== storedVolunteers.length) {
          localStorage.setItem('gmcf:volunteers', JSON.stringify(cleanedVols));
        }
        setVolunteers(cleanedVols);
      }
    } catch (e) {
      console.error(e);
    }
    supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: VolunteerCandidate[] = data.map(v => ({
            id: v.id,
            name: v.full_name || 'Volunteer',
            phone: v.phone || '',
            email: v.email || '',
            district: v.district || 'ঢাকা',
            category: v.interests || 'মাঠ পর্যায়ের ত্রাণ',
            skills: v.skills || 'স্বেচ্ছাসেবা',
            image: v.image || '/images/youth-volunteers.jpg',
            date: new Date(v.created_at).toISOString().substring(0, 10),
            status: (v.status === 'APPROVED' || v.status === 'approved' ? 'APPROVED' : v.status === 'REJECTED' || v.status === 'rejected' ? 'REJECTED' : 'PENDING'),
          }));
          setVolunteers(prev => {
            const existingIds = new Set(mapped.map(m => m.id));
            const rest = prev.filter(p => !existingIds.has(p.id));
            return [...mapped, ...rest];
          });
        }
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('gmcf:admin_auth');
    document.cookie = 'gmcf_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  // Volunteer CRUD
  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'PENDING' | 'REJECTED') => {
    const updated = volunteers.map(v => (v.id === id ? { ...v, status: newStatus } : v));
    setVolunteers(updated);
    try {
      localStorage.setItem('gmcf:volunteers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    supabase.from('volunteers').update({ status: newStatus }).eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase update status:', error.message);
    });
  };

  const openAddVolunteerModal = () => {
    setEditingVolunteerId(null);
    setVolunteerForm({
      name: '',
      phone: '',
      email: '',
      district: 'ঢাকা',
      category: 'জরুরি খাদ্য ও বস্ত্র বিতরণ',
      skills: 'মাঠ পর্যায়ের সমন্বয় ও ভলান্টিয়ার সাপোর্ট',
      image: '/images/youth-volunteers.jpg',
      status: 'PENDING',
    });
    setIsVolunteerModalOpen(true);
  };

  const openEditVolunteerModal = (v: VolunteerCandidate) => {
    setEditingVolunteerId(v.id);
    setVolunteerForm({
      name: v.name,
      phone: v.phone,
      email: v.email || '',
      district: v.district,
      category: v.category,
      skills: v.skills,
      image: v.image || '/images/youth-volunteers.jpg',
      status: v.status,
    });
    setIsVolunteerModalOpen(true);
  };

  const handleSaveVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name.trim() || !volunteerForm.phone.trim()) {
      alert('স্বেচ্ছাসেবকের নাম ও ফোন নম্বর দেওয়া আবশ্যক!');
      return;
    }
    let updated: VolunteerCandidate[];
    if (editingVolunteerId) {
      updated = volunteers.map(v =>
        v.id === editingVolunteerId ? { ...v, ...volunteerForm, id: editingVolunteerId } : v
      );
      supabase
        .from('volunteers')
        .update({
          full_name: volunteerForm.name,
          phone: volunteerForm.phone,
          email: volunteerForm.email,
          district: volunteerForm.district,
          interests: volunteerForm.category,
          skills: volunteerForm.skills,
          image: volunteerForm.image,
          status: volunteerForm.status,
        })
        .eq('id', editingVolunteerId)
        .then(({ error }) => {
          if (error) console.error('Supabase update volunteer:', error.message);
        });
    } else {
      const newVol: VolunteerCandidate = {
        ...volunteerForm,
        id: 'VOL-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().substring(0, 10),
      };
      updated = [newVol, ...volunteers];
      supabase
        .from('volunteers')
        .insert({
          full_name: newVol.name,
          phone: newVol.phone,
          email: newVol.email,
          district: newVol.district,
          interests: newVol.category,
          skills: newVol.skills,
          image: newVol.image,
          status: newVol.status,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase insert volunteer:', error.message);
        });
    }
    setVolunteers(updated);
    try {
      localStorage.setItem('gmcf:volunteers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsVolunteerModalOpen(false);
  };

  const handleDeleteVolunteer = (id: string, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      type: 'volunteer',
      id,
      name,
    });
  };

  // Member CRUD
  const openAddMemberModal = () => {
    setEditingMemberId(null);
    setMemberForm({
      nameBn: '',
      nameEn: '',
      roleBn: '',
      roleEn: '',
      category: 'board',
      departmentBn: 'পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড',
      image: '/images/humanitarian-volunteers.jpg',
      phone: '',
      email: '',
      locationBn: 'ঢাকা, বাংলাদেশ',
      bioBn: '',
    });
    setIsMemberModalOpen(true);
  };

  const openEditMemberModal = (m: MemberRecord) => {
    setEditingMemberId(m.id);
    setMemberForm({
      nameBn: m.nameBn,
      nameEn: m.nameEn,
      roleBn: m.roleBn,
      roleEn: m.roleEn,
      category: m.category,
      departmentBn: m.departmentBn || '',
      image: m.image,
      phone: m.phone || '',
      email: m.email || '',
      locationBn: m.locationBn || '',
      bioBn: m.bioBn || '',
    });
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.nameBn.trim() || !memberForm.roleBn.trim()) {
      alert('সদস্যের নাম ও পদবী দেওয়া আবশ্যক!');
      return;
    }
    let updated: MemberRecord[];
    if (editingMemberId) {
      updated = members.map(m =>
        m.id === editingMemberId ? { ...m, ...memberForm, id: editingMemberId } : m
      );
      supabase
        .from('members')
        .update({
          name_bn: memberForm.nameBn,
          name_en: memberForm.nameEn,
          role_bn: memberForm.roleBn,
          role_en: memberForm.roleEn,
          category: memberForm.category,
          department_bn: memberForm.departmentBn,
          image: memberForm.image,
          phone: memberForm.phone,
          email: memberForm.email,
          location_bn: memberForm.locationBn,
          bio_bn: memberForm.bioBn,
        })
        .eq('id', editingMemberId)
        .then(({ error }) => {
          if (error) console.error('Supabase update member:', error.message);
        });
    } else {
      const newMem: MemberRecord = {
        ...memberForm,
        id: 'm' + Date.now().toString().slice(-4),
      };
      updated = [newMem, ...members];
      supabase
        .from('members')
        .insert({
          name_bn: newMem.nameBn,
          name_en: newMem.nameEn,
          role_bn: newMem.roleBn,
          role_en: newMem.roleEn,
          category: newMem.category,
          department_bn: newMem.departmentBn,
          image: newMem.image,
          phone: newMem.phone,
          email: newMem.email,
          location_bn: newMem.locationBn,
          bio_bn: newMem.bioBn,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase insert member:', error.message);
        });
    }
    setMembers(updated);
    try {
      localStorage.setItem('gmcf:members', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsMemberModalOpen(false);
  };

  const handleDeleteMember = (id: string, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      type: 'member',
      id,
      name,
    });
  };

  const confirmDeleteAction = () => {
    const { type, id } = deleteConfirmation;
    if (type === 'member') {
      const updated = members.filter(m => m.id !== id);
      setMembers(updated);
      try {
        localStorage.setItem('gmcf:members', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      supabase
        .from('members')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Supabase delete member:', error.message);
        });
    } else if (type === 'volunteer') {
      const updated = volunteers.filter(v => v.id !== id);
      setVolunteers(updated);
      try {
        localStorage.setItem('gmcf:volunteers', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      supabase
        .from('volunteers')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Supabase delete volunteer:', error.message);
        });
    }

    setDeleteConfirmation({ isOpen: false, type: 'member', id: '', name: '' });
  };

  const totalDonationsBdt = donations.reduce(
    (sum, d) => sum + (d.currency === 'BDT' ? d.amount : d.amount * 122),
    0
  );
  const pendingVolunteersCount = volunteers.filter(v => v.status === 'PENDING').length;

  const filteredDonations = donations.filter(
    d =>
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorPhone.includes(searchTerm)
  );

  const filteredMembers = members.filter(
    m =>
      m.nameBn.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
      m.roleBn.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
      (m.phone && m.phone.includes(memberSearchTerm))
  );

  const filteredVolunteers = volunteers.filter(
    v =>
      v.name.toLowerCase().includes(volunteerSearchTerm.toLowerCase()) ||
      v.phone.includes(volunteerSearchTerm) ||
      v.district.toLowerCase().includes(volunteerSearchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(volunteerSearchTerm.toLowerCase())
  );

  const NAV_ITEMS = [
    {
      id: 'overview' as const,
      label: 'ড্যাশবোর্ড ওভারভিউ',
      icon: LayoutDashboard,
      badge: 'লাইভ',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'section_editor' as const,
      label: 'সেকশন এডিটর (WP-স্টাইল)',
      icon: Layers,
      badge: 'WP-Live',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      id: 'donations' as const,
      label: 'অনলাইন অনুদান তালিকা',
      icon: HeartHandshake,
      badge: donations.length.toString(),
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700/60 font-mono',
    },
    {
      id: 'members' as const,
      label: 'সদস্য ও ট্রাস্টি বোর্ড',
      icon: Users,
      badge: members.length.toString(),
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700/60 font-mono',
    },
    {
      id: 'volunteers' as const,
      label: 'স্বেচ্ছাসেবক আবেদনপত্র',
      icon: HandHeart,
      badge: volunteers.length.toString(),
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700/60 font-mono',
    },
    {
      id: 'campaigns' as const,
      label: 'সকল কার্ড ও প্রজেক্ট',
      icon: FolderKanban,
      badge: 'CRUD',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'settings' as const,
      label: 'প্রাতিষ্ঠানিক সেটিংস',
      icon: Settings,
      badge: 'GMCF',
      badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700/60',
    },
  ];

  const currentChartData = useMemo(() => {
    if (donations.length === 0) {
      if (chartTimeframe === '7d') {
        return ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'].map(label => ({
          label,
          amount: 0,
          donors: 0,
        }));
      }
      if (chartTimeframe === '30d') {
        return ['১-৭ মে', '৮-১৪ মে', '১৫-২১ মে', '২২-২৮ মে'].map(label => ({
          label,
          amount: 0,
          donors: 0,
        }));
      }
      return ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন'].map(label => ({
        label,
        amount: 0,
        donors: 0,
      }));
    }

    const map = new Map<string, { amount: number; donors: number }>();
    donations.forEach(d => {
      const dateStr = d.date ? d.date.split(' ')[0] : 'আজ';
      const existing = map.get(dateStr) || { amount: 0, donors: 0 };
      existing.amount += (d.currency === 'BDT' ? d.amount : d.amount * 122);
      existing.donors += 1;
      map.set(dateStr, existing);
    });

    return Array.from(map.entries()).map(([label, val]) => ({
      label,
      amount: val.amount,
      donors: val.donors,
    }));
  }, [donations, chartTimeframe]);

  const sectorDistribution = useMemo(() => {
    if (donations.length === 0) return [];
    const map = new Map<string, number>();
    donations.forEach(d => {
      const cause = d.cause || 'সাধারণ অনুদান';
      map.set(cause, (map.get(cause) || 0) + (d.currency === 'BDT' ? d.amount : d.amount * 122));
    });
    const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
    const colors = ['#10b981', '#0ea5e9', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#6366f1'];
    return Array.from(map.entries()).map(([name, amount], idx) => ({
      name,
      amount,
      value: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: colors[idx % colors.length],
    }));
  }, [donations]);

  return (
    <div data-l10n="off" className="min-h-screen bg-zinc-50/70 text-zinc-900 flex flex-row items-stretch antialiased selection:bg-zinc-900 selection:text-white">
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* ============================================================== */}
      {/* Ultra-Clean shadcn Left Sidebar */}
      {/* ============================================================== */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-zinc-950 text-zinc-100 flex flex-col h-screen border-r border-zinc-800/80 shadow-2xl transition-transform duration-300 ease-in-out lg:sticky lg:top-0 shrink-0',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-zinc-800/80 shrink-0 bg-zinc-950/80 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-3 group min-w-0">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:border-zinc-700 transition-colors">
                <img
                  src="/images/gmcf-logo-emblem.png"
                  alt="GMCF Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-100 tracking-tight leading-tight truncate">
                  Global Muslim
                </p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium truncate">
                  Charitable Foundation
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium truncate">
                    Reg: S-14086/2023
                  </span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer shrink-0 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-3 flex-1 space-y-1 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            প্রধান মেনু
          </div>

          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer text-left',
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700/70 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70'
                )}
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors',
                    isActive ? 'text-emerald-400' : 'text-zinc-400'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 truncate text-left">{item.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-md border shrink-0',
                    item.badgeColor
                  )}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Locked Footer */}
        <div className="p-3 border-t border-zinc-800/80 shrink-0 bg-zinc-950/90">
          <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/80 p-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ক্লাউড সিঙ্ক সক্রিয়
              </span>
              <span className="text-[10px] font-mono text-zinc-500">v2.5.0</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="mt-2.5 flex items-center justify-between text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              <span>লাইভ সাইট ভিজিট করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* Right Column Workspace */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 border-b border-zinc-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 -ml-1 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
              aria-label="মেনু খুলুন"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Active Tab Icon */}
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200/70 text-zinc-700 hidden sm:flex items-center justify-center shrink-0">
              {activeTab === 'overview' && <LayoutDashboard className="w-4 h-4 text-emerald-600" />}
              {activeTab === 'section_editor' && <Layers className="w-4 h-4 text-indigo-600" />}
              {activeTab === 'donations' && <HeartHandshake className="w-4 h-4 text-emerald-600" />}
              {activeTab === 'members' && <Users className="w-4 h-4 text-zinc-800" />}
              {activeTab === 'volunteers' && <HandHeart className="w-4 h-4 text-amber-600" />}
              {activeTab === 'campaigns' && <FolderKanban className="w-4 h-4 text-amber-600" />}
              {activeTab === 'settings' && <Settings className="w-4 h-4 text-zinc-600" />}
            </div>

            <div className="min-w-0 flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-semibold text-zinc-900 tracking-tight truncate">
                {activeTab === 'overview' && 'ওভারভিউ ড্যাশবোর্ড'}
                {activeTab === 'section_editor' && 'সেকশন এডিটর (WordPress-স্টাইল)'}
                {activeTab === 'donations' && 'অনলাইন অনুদান ব্যবস্থাপনা'}
                {activeTab === 'members' && 'সদস্য ও ট্রাস্টি বোর্ড'}
                {activeTab === 'volunteers' && 'স্বেচ্ছাসেবক আবেদনপত্র ও টিম'}
                {activeTab === 'campaigns' && 'কার্ড ও প্রজেক্ট ম্যানেজার'}
                {activeTab === 'settings' && 'প্রাতিষ্ঠানিক সেটিংস'}
              </h1>
              
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-mono border border-zinc-200/60 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>S-14086/2023</span>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openLicenseModal()}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-xs font-medium shadow-2xs transition-colors cursor-pointer active:scale-95"
              title="সরকারি লাইসেন্স সনদ দেখুন"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              <span className="hidden md:inline">লাইসেন্স</span>
            </button>

            <button
              type="button"
              onClick={() => openPaymentModal({ amount: 5000, cause: 'Test EPS Gateway Transaction' })}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-2xs transition-colors cursor-pointer active:scale-95"
              title="EPS পেমেন্ট টেস্ট করুন"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-100 shrink-0" />
              <span className="hidden sm:inline">EPS টেস্ট</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-md border border-red-200/80 bg-red-50/50 hover:bg-red-100 text-red-700 text-xs font-medium transition-colors cursor-pointer active:scale-95"
              title="ড্যাশবোর্ড থেকে লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </header>

        {/* Main Content View */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-6 max-w-7xl w-full mx-auto">
          {/* ========================================================== */}
          {/* 4 Premium Animated Executive KPI Cards with Framer Motion */}
          {/* ========================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI Card 1: Total Funds */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  সর্বমোট অনুদান সংগ্রহ
                </span>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-mono">
                ৳{totalDonationsBdt.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <CheckCircle2 className="w-3 h-3" />
                  {donations.length} টি সফল ট্রানজেকশন
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">EPS গেটওয়ে</span>
              </div>
            </motion.div>

            {/* KPI Card 2: Zakat Compliance */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  যাকাত ও তামলিক বণ্টন
                </span>
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-mono">
                ১০০% নীতি
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                  <CheckCircle2 className="w-3 h-3" />
                  জিরো এডমিন কস্ট
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">শরীয়াহ অনুমোদিত</span>
              </div>
            </motion.div>

            {/* KPI Card 3: Board & Members */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  সদস্য ও ট্রাস্টি বোর্ড
                </span>
                <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200/80 text-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-mono">
                {members.length} জন
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-100">
                <div className="flex items-center -space-x-1.5 overflow-hidden">
                  {members.slice(0, 3).map((m, idx) => (
                    <img
                      key={idx}
                      src={m.image}
                      alt={m.nameBn}
                      className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-600 font-medium">৩টি জোনাল সেল</span>
              </div>
            </motion.div>

            {/* KPI Card 4: Volunteers & Ground Force */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  স্বেচ্ছাসেবক ফিল্ড ফোর্স
                </span>
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HandHeart className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-mono">
                {volunteers.length} জন
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  <Clock className="w-3 h-3" />
                  {pendingVolunteersCount} জন অপেক্ষমান
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">৬৪ জেলা</span>
              </div>
            </motion.div>
          </div>

          {/* Main Card with Segmented Tabs Header */}
          <div className="rounded-xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden flex-1 flex flex-col">
            {/* shadcn Tabs List Bar */}
            <div className="p-2 border-b border-zinc-200/80 bg-zinc-50/70">
              <div className="inline-flex h-9 items-center justify-start rounded-lg bg-zinc-200/60 p-1 text-zinc-600 w-full overflow-x-auto gap-1">
                {NAV_ITEMS.map(tab => {
                  const Icon = tab.icon;
                  const isCurrent = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer',
                        isCurrent
                          ? 'bg-white text-zinc-950 shadow-2xs font-semibold'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================== */}
            {/* TAB CONTENT 0: Executive Overview & Interactive Charts */}
            {/* ========================================================== */}
            {activeTab === 'overview' && (
              <div className="p-5 sm:p-6 space-y-6 flex-1">
                {/* Executive Welcome Card */}
                <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 text-white shadow-xs relative overflow-hidden">
                  <div className="relative z-10 max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>লাইভ এডমিন কন্ট্রোল সেন্টার ও অ্যানালিটিক্স</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      স্বাগতম, জনাব মোহাম্মদ আলী মোস্তফা
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের রিয়েলটাইম অনুদান প্রবাহ, প্রকল্প বাস্তবায়ন ও আর্থিক অডিট তথ্যাদি নিচে ইন্টারেক্টিভ চার্টে প্রদর্শিত হচ্ছে।
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('donations')}
                        className="h-9 px-3.5 bg-white text-zinc-900 hover:bg-zinc-100 rounded-md text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <HeartHandshake className="w-4 h-4 text-zinc-700" />
                        <span>অনলাইন অনুদান তালিকা ({donations.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openAddMemberModal()}
                        className="h-9 px-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 rounded-md text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>নতুন সদস্য যুক্ত করুন</span>
                      </button>
                      <a
                        href="/images/permit.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 px-3.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/80 rounded-md text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>সরকারি লাইসেন্স সনদ (S-14086/2023)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* Interactive Recharts Section: Trend + Distribution */}
                {/* ====================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left (2 Cols): Area Chart for Donation Growth */}
                  <div className="lg:col-span-2 rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <h3 className="text-sm font-semibold text-zinc-900">
                              অনুদান সংগ্রহ ট্রেন্ড ও অ্যানালিটিক্স
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            রিয়েলটাইম সংগ্রহ পরিমাণ ও দাতার সংখ্যার গ্রাফ
                          </p>
                        </div>

                        {/* Timeframe Filter Buttons */}
                        <div className="inline-flex items-center rounded-lg bg-zinc-100 p-1 border border-zinc-200/80 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setChartTimeframe('7d')}
                            className={cn(
                              'px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                              chartTimeframe === '7d'
                                ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                                : 'text-zinc-600 hover:text-zinc-900'
                            )}
                          >
                            ৭ দিন
                          </button>
                          <button
                            type="button"
                            onClick={() => setChartTimeframe('30d')}
                            className={cn(
                              'px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                              chartTimeframe === '30d'
                                ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                                : 'text-zinc-600 hover:text-zinc-900'
                            )}
                          >
                            ৩০ দিন
                          </button>
                          <button
                            type="button"
                            onClick={() => setChartTimeframe('year')}
                            className={cn(
                              'px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                              chartTimeframe === 'year'
                                ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                                : 'text-zinc-600 hover:text-zinc-900'
                            )}
                          >
                            মাসিক
                          </button>
                        </div>
                      </div>

                      {/* Interactive Area Chart */}
                      <div className="mt-5 w-full h-[280px]">
                        {isMounted && (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={currentChartData}
                              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                              <XAxis
                                dataKey="label"
                                stroke="#71717a"
                                fontSize={11}
                                tickLine={false}
                                axisLine={{ stroke: '#e4e4e7' }}
                              />
                              <YAxis
                                stroke="#71717a"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={val => `৳${(val / 1000).toFixed(0)}k`}
                              />
                              <Tooltip
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white shadow-xl text-xs space-y-1">
                                        <p className="font-semibold text-zinc-300">{label}</p>
                                        <p className="font-mono font-bold text-emerald-400 text-sm">
                                          ৳{Number(payload[0].value).toLocaleString()}
                                        </p>
                                        {payload[0].payload?.donors && (
                                          <p className="text-[11px] text-zinc-400">
                                            দাতার সংখ্যা: {payload[0].payload.donors} জন
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#donationGradient)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        রিয়েলটাইম ব্যাংক ও EPS ট্রানজেকশন সিঙ্ক
                      </span>
                      <span className="font-mono font-semibold text-zinc-800">
                        সর্বশেষ আপডেট: আজ
                      </span>
                    </div>
                  </div>

                  {/* Right (1 Col): Donut / Pie Chart for Sector Distribution */}
                  <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-zinc-700" />
                          <h3 className="text-sm font-semibold text-zinc-900">মানবিক খাত বণ্টন</h3>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          ১০০% যাকাত
                        </span>
                      </div>

                      {/* Pie Chart */}
                      <div className="mt-3 w-full h-[180px]">
                        {isMounted && sectorDistribution.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={sectorDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={48}
                                outerRadius={72}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {sectorDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-white shadow-xl text-xs">
                                        <p className="font-semibold">{data.name}</p>
                                        <p className="font-mono text-emerald-400 font-bold">{data.value}% তহবিল</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center p-3 rounded-lg bg-zinc-50 border border-dashed border-zinc-200">
                            <PieChart className="w-6 h-6 text-zinc-300 mb-1" />
                            <p className="text-xs font-medium text-zinc-600">খাতভিত্তিক কোনো লেনদেন নেই</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">নতুন অনুদান জমা হলে পাই-চার্ট সক্রিয় হবে</p>
                          </div>
                        )}
                      </div>

                      {/* Custom Legend */}
                      <div className="space-y-1.5 mt-2 text-xs">
                        {sectorDistribution.length === 0 ? (
                          <div className="py-2 text-center text-[11px] text-zinc-400">
                            খাতভিত্তিক অনুদান শূন্য (৳০)
                          </div>
                        ) : (
                          sectorDistribution.map((s, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-zinc-50 transition-colors">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: s.color }}
                                />
                                <span className="text-zinc-700 text-[11px] truncate">{s.name}</span>
                              </div>
                              <span className="font-mono font-semibold text-zinc-900 text-xs">
                                {s.value}%
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('campaigns')}
                      className="mt-4 pt-3 border-t border-zinc-100 text-xs font-semibold text-zinc-800 hover:text-zinc-950 flex items-center justify-between cursor-pointer w-full"
                    >
                      <span>ক্যাম্পেইন অগ্রগতি দেখুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* 2-Column: Campaign Progress & Quick Action Audit */}
                {/* ====================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Campaign Progress Bars */}
                  <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <FolderKanban className="w-4 h-4 text-zinc-700" />
                        <h3 className="text-sm font-semibold text-zinc-900">
                          চলমান প্রকল্পের তহবিল সংগ্রহ অগ্রগতি
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">Target vs Raised</span>
                    </div>

                    <div className="space-y-4 mt-4 text-xs">
                      {campaigns.length === 0 ? (
                        <div className="py-6 text-center text-zinc-400 text-xs">
                          কোনো সক্রিয় ক্যাম্পেইন পাওয়া যায়নি।
                        </div>
                      ) : (
                        campaigns.slice(0, 4).map((c, idx) => {
                          const pct = c.goalBDT > 0 ? Math.min(100, Math.round((c.raisedBDT / c.goalBDT) * 100)) : 0;
                          const barColors = ['bg-emerald-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500'];
                          return (
                            <div key={c.id || idx} className="space-y-1.5">
                              <div className="flex items-center justify-between font-medium">
                                <span className="text-zinc-900 truncate pr-2">{c.titleBn}</span>
                                <span className="font-mono font-bold text-zinc-900 shrink-0">
                                  {pct}% (৳{c.raisedBDT.toLocaleString()})
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                                <div
                                  className={cn('h-full rounded-full transition-all duration-500', barColors[idx % barColors.length])}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Quick Audit & Shortcuts Card */}
                  <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-zinc-700" />
                          <h3 className="text-sm font-semibold text-zinc-900">
                            সরকারি অডিট, কমপ্লায়েন্স ও দ্রুত শর্টকাট
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                          এনজিও সনদ
                        </span>
                      </div>

                      <div className="space-y-2.5 mt-4">
                        <a
                          href="/images/permit.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 flex items-center justify-between group transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-900">সরকারি লাইসেন্স পারমিট (PDF)</p>
                              <p className="text-[11px] text-zinc-500 font-mono">রেজিস্ট্রেশন নং: S-14086/2023</p>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900" />
                        </a>

                        <button
                          type="button"
                          onClick={() => openAddVolunteerModal()}
                          className="w-full p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 flex items-center justify-between group transition-colors cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                              <Plus className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-900">নতুন ভলান্টিয়ার তালিকাভুক্তি</p>
                              <p className="text-[11px] text-zinc-500">মাঠপর্যায়ের টিম যুক্ত করুন</p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab('section_editor')}
                          className="w-full p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 flex items-center justify-between group transition-colors cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-900">সেকশন এডিটর (WordPress-স্টাইল)</p>
                              <p className="text-[11px] text-zinc-500">লাইভ পেইজ ও কার্ডসমূহ কাস্টমাইজ করুন</p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>শরীয়াহ অডিট বোর্ড</span>
                      <span className="font-semibold text-zinc-800">অনুমোদিত ও সক্রিয়</span>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* Recent Donations Table in Overview */}
                {/* ====================================================== */}
                <div className="rounded-xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-zinc-700" />
                      <h3 className="text-sm font-semibold text-zinc-900">সাম্প্রতিক অনুদানসমূহ (রিয়েলটাইম প্রিভিউ)</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('donations')}
                      className="text-xs font-medium text-zinc-700 hover:text-zinc-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>সম্পূর্ণ তালিকা দেখুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50/75 text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200/80 text-[11px]">
                        <tr>
                          <th className="py-3 px-4">ট্রানজেকশন ID</th>
                          <th className="py-3 px-4">দাতার নাম ও যোগাযোগ</th>
                          <th className="py-3 px-4">মানবিক খাত</th>
                          <th className="py-3 px-4">পরিমাণ</th>
                          <th className="py-3 px-4">পদ্ধতি</th>
                          <th className="py-3 px-4">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 font-normal">
                        {donations.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-zinc-400">
                              এখনও কোনো অনলাইন অনুদান রেকর্ড নেই।
                            </td>
                          </tr>
                        ) : (
                          donations.slice(0, 4).map(d => (
                            <tr key={d.id} className="hover:bg-zinc-50/70 transition-colors">
                              <td className="py-3 px-4 font-mono font-semibold text-zinc-900">{d.id}</td>
                              <td className="py-3 px-4">
                                <p className="font-semibold text-zinc-900">{d.donorName}</p>
                                <p className="text-[11px] text-zinc-500 font-mono">{d.donorPhone}</p>
                              </td>
                              <td className="py-3 px-4 text-zinc-700">{d.cause}</td>
                              <td className="py-3 px-4 font-mono font-bold text-zinc-900 text-sm">৳{d.amount.toLocaleString()}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-mono border border-zinc-200">
                                  {d.method}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium text-[11px] inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  {d.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: WP-Style Section Editor */}
            {activeTab === 'section_editor' && (
              <AdminSectionEditor />
            )}

            {/* TAB CONTENT: Donations */}
            {activeTab === 'donations' && (
              <div className="p-5 sm:p-6 space-y-4 flex-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="দাতা, মোবাইল নম্বর, ট্রানজেকশন ID বা খাত দিয়ে খুঁজুন..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 h-9 border border-zinc-200 rounded-md text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const csv = [
                        ['Transaction ID', 'Donor Name', 'Phone', 'Email', 'Amount', 'Currency', 'Cause', 'Method', 'Status', 'Date'],
                        ...donations.map(d => [d.id, d.donorName, d.donorPhone, d.donorEmail, d.amount, d.currency, `"${d.cause}"`, d.method, d.status, d.date]),
                      ].map(r => r.join(',')).join('\n');
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.setAttribute('download', 'gmcf_eps_donations.csv');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="h-9 px-3 border border-zinc-200 hover:bg-zinc-50 rounded-md text-xs font-medium text-zinc-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV এক্সপোর্ট</span>
                  </button>
                </div>

                <div className="rounded-lg border border-zinc-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50/75 text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200 text-[11px]">
                      <tr>
                        <th className="p-3.5">ট্রানজেকশন ID</th>
                        <th className="p-3.5">দাতার নাম ও যোগাযোগ</th>
                        <th className="p-3.5">উদ্দেশ্য / খাত</th>
                        <th className="p-3.5">পরিমাণ</th>
                        <th className="p-3.5">পেমেন্ট মাধ্যম</th>
                        <th className="p-3.5">স্ট্যাটাস</th>
                        <th className="p-3.5">তারিখ ও সময়</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      {filteredDonations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-zinc-400">
                            কোনো অনুদানের রেকর্ড খুঁজে পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredDonations.map(d => (
                          <tr key={d.id} className="hover:bg-zinc-50/70 transition-colors">
                            <td className="p-3.5 font-mono text-zinc-900 font-semibold">{d.id}</td>
                            <td className="p-3.5">
                              <span className="font-semibold text-zinc-900 block">{d.donorName}</span>
                              <span className="text-zinc-500 font-mono text-[11px]">{d.donorPhone}</span>
                            </td>
                            <td className="p-3.5 text-zinc-700">{d.cause}</td>
                            <td className="p-3.5 font-mono font-bold text-zinc-900 text-sm">
                              ৳{d.amount.toLocaleString()}
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-mono border border-zinc-200">
                                {d.method}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {d.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-zinc-500 font-mono text-[11px]">{d.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Members */}
            {activeTab === 'members' && (
              <div className="p-5 sm:p-6 space-y-4 flex-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="সদস্যের নাম, পদবী বা মোবাইল দিয়ে খুঁজুন..."
                      value={memberSearchTerm}
                      onChange={e => setMemberSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 h-9 border border-zinc-200 rounded-md text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={openAddMemberModal}
                    className="h-9 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন সদস্য যুক্ত করুন</span>
                  </button>
                </div>

                <div className="rounded-lg border border-zinc-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50/75 text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200 text-[11px]">
                      <tr>
                        <th className="p-3.5 w-14 text-center">ছবি</th>
                        <th className="p-3.5">নাম ও পরিচিতি</th>
                        <th className="p-3.5">পদবী ও দায়িত্ব</th>
                        <th className="p-3.5">ক্যাটাগরি</th>
                        <th className="p-3.5">যোগাযোগ</th>
                        <th className="p-3.5">অবস্থান</th>
                        <th className="p-3.5 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      {filteredMembers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-zinc-400">
                            কোনো সদস্যের রেকর্ড খুঁজে পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredMembers.map(m => (
                          <tr key={m.id} className="hover:bg-zinc-50/70 transition-colors">
                            <td className="p-3.5 text-center">
                              <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 mx-auto bg-zinc-100 flex items-center justify-center">
                                {m.image ? (
                                  <img
                                    src={m.image}
                                    alt={m.nameBn}
                                    className="w-full h-full object-cover"
                                    onError={e => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <Users className="w-4 h-4 text-zinc-400" />
                                )}
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-zinc-900 block">{m.nameBn}</span>
                              <span className="text-zinc-500 text-[11px]">{m.nameEn}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-medium text-zinc-900 block">{m.roleBn}</span>
                              <span className="text-zinc-500 text-[11px]">{m.departmentBn || m.roleEn}</span>
                            </td>
                            <td className="p-3.5">
                              <span
                                className={cn(
                                  'inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border',
                                  m.category === 'board'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : m.category === 'advisor'
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                )}
                              >
                                {m.category === 'board'
                                  ? 'ট্রাস্টি বোর্ড'
                                  : m.category === 'advisor'
                                  ? 'উপদেষ্টা'
                                  : 'ব্যবস্থাপনা'}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-mono text-zinc-800 block text-xs">{m.phone || '—'}</span>
                              <span className="text-zinc-500 text-[11px] block">{m.email || '—'}</span>
                            </td>
                            <td className="p-3.5 text-zinc-600 max-w-[160px] truncate">
                              {m.locationBn || 'ঢাকা, বাংলাদেশ'}
                            </td>
                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => openEditMemberModal(m)}
                                className="h-7 px-2.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-md text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                title="সম্পাদনা করুন"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>এডিট</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteMember(m.id, m.nameBn)}
                                className="h-7 px-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-md text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>ডিলিট</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Volunteers */}
            {activeTab === 'volunteers' && (
              <div className="p-5 sm:p-6 space-y-4 flex-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="স্বেচ্ছাসেবকের নাম, ফোন বা জেলা দিয়ে খুঁজুন..."
                      value={volunteerSearchTerm}
                      onChange={e => setVolunteerSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 h-9 border border-zinc-200 rounded-md text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={openAddVolunteerModal}
                    className="h-9 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন স্বেচ্ছাসেবক যুক্ত করুন</span>
                  </button>
                </div>

                <div className="rounded-lg border border-zinc-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50/75 text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200 text-[11px]">
                      <tr>
                        <th className="p-3.5 w-14 text-center">ছবি</th>
                        <th className="p-3.5">আইডি ও নাম</th>
                        <th className="p-3.5">যোগাযোগ</th>
                        <th className="p-3.5">ঠিকানা / জেলা</th>
                        <th className="p-3.5">মানবিক খাত</th>
                        <th className="p-3.5">দক্ষতা</th>
                        <th className="p-3.5">স্ট্যাটাস</th>
                        <th className="p-3.5 text-right">পদক্ষেপ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      {filteredVolunteers.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-zinc-400">
                            কোনো স্বেচ্ছাসেবকের রেকর্ড খুঁজে পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredVolunteers.map(v => (
                          <tr key={v.id} className="hover:bg-zinc-50/70 transition-colors">
                            <td className="p-3.5 text-center">
                              <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 mx-auto bg-zinc-100 flex items-center justify-center">
                                {v.image ? (
                                  <img
                                    src={v.image}
                                    alt={v.name}
                                    className="w-full h-full object-cover"
                                    onError={e => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <HandHeart className="w-4 h-4 text-zinc-400" />
                                )}
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-zinc-900 block">{v.name}</span>
                              <span className="font-mono text-zinc-500 text-[11px]">{v.id}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-zinc-800 font-mono block text-xs">{v.phone}</span>
                              <span className="text-zinc-500 text-[11px] block">{v.email || '—'}</span>
                            </td>
                            <td className="p-3.5 text-zinc-600">{v.district}</td>
                            <td className="p-3.5">
                              <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">
                                {v.category}
                              </span>
                            </td>
                            <td className="p-3.5 text-zinc-600 max-w-xs truncate">{v.skills}</td>
                            <td className="p-3.5">
                              <span
                                className={cn(
                                  'inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border',
                                  v.status === 'APPROVED'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : v.status === 'PENDING'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : 'bg-red-50 text-red-800 border-red-200'
                                )}
                              >
                                {v.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                              {v.status !== 'APPROVED' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(v.id, 'APPROVED')}
                                  className="h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                                >
                                  অনুমোদন
                                </button>
                              )}
                              {v.status !== 'REJECTED' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(v.id, 'REJECTED')}
                                  className="h-7 px-2.5 bg-zinc-100 hover:bg-red-50 hover:text-red-700 text-zinc-700 rounded-md text-xs font-medium cursor-pointer transition-colors"
                                >
                                  বাতিল
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => openEditVolunteerModal(v)}
                                className="h-7 px-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-md text-xs cursor-pointer transition-colors shadow-2xs"
                                title="সম্পাদনা"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteVolunteer(v.id, v.name)}
                                className="h-7 px-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-md text-xs cursor-pointer transition-colors shadow-2xs"
                                title="মুছুন"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Campaigns & Dynamic Card Manager */}
            {activeTab === 'campaigns' && (
              <AdminCardManager />
            )}

            {/* TAB CONTENT: Settings */}
            {activeTab === 'settings' && (
              <div className="p-5 sm:p-6 space-y-6 max-w-3xl">
                <div className="bg-zinc-50/70 p-5 rounded-xl border border-zinc-200 space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-900 border-b border-zinc-200 pb-2.5 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-zinc-700" />
                    প্রাতিষ্ঠানিক সরকারি তথ্যাদি (GMCF Official)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-zinc-600 font-medium block mb-1">চেয়ারম্যানের নাম</label>
                      <input
                        type="text"
                        readOnly
                        value="Mohammad Ali Mostafa"
                        className="w-full bg-white px-3 py-2 border rounded-md border-zinc-200 text-zinc-900 font-medium shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-600 font-medium block mb-1">ফাউন্ডেশনের পূর্ণ নাম</label>
                      <input
                        type="text"
                        readOnly
                        value="Global Muslim Charitable Foundation"
                        className="w-full bg-white px-3 py-2 border rounded-md border-zinc-200 text-zinc-900 font-medium shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-600 font-medium block mb-1">অফিসিয়াল ইমেইল</label>
                      <input
                        type="text"
                        readOnly
                        value="gmcfoundation2022@gmail.com"
                        className="w-full bg-white px-3 py-2 border rounded-md border-zinc-200 text-zinc-900 font-medium shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-600 font-medium block mb-1">অফিসিয়াল হটলাইন</label>
                      <input
                        type="text"
                        readOnly
                        value="01913119525"
                        className="w-full bg-white px-3 py-2 border rounded-md border-zinc-200 text-zinc-900 font-medium shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-600 font-medium block mb-1 text-xs">নিবন্ধিত কেন্দ্রীয় কার্যালয়</label>
                    <input
                      type="text"
                      readOnly
                      value="House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh"
                      className="w-full bg-white px-3 py-2 border rounded-md border-zinc-200 text-zinc-900 font-medium text-xs shadow-2xs"
                    />
                  </div>
                </div>

                <div className="bg-zinc-50/70 p-5 rounded-xl border border-zinc-200 space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-900 border-b border-zinc-200 pb-2.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    সরকারি অনুদান ও অডিট কমপ্লায়েন্স
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন বাংলাদেশ সরকারের সোসাইটি রেজিস্ট্রেশন অ্যাক্ট ১৮৬০ এর আওতায় নিবন্ধিত (রেজি নং: S-14086/2023)। সংগৃহীত সকল অনুদান চার্টার্ড একাউন্ট্যান্ট দ্বারা অডিটকৃত এবং পূর্ণাঙ্গভাবে শরীয়াহ সম্মত খাতসমূহে তামলিক নিশ্চিত করে ব্যয় করা হয়।
                  </p>
                  <div className="pt-1">
                    <a
                      href="/images/permit.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white rounded-md text-xs font-medium hover:bg-zinc-800 transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>অফিসিয়াল পারমিট লাইসেন্স ডাউনলোড করুন</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ============================================================== */}
      {/* shadcn Dialog: Member Modal (Add / Edit) */}
      {/* ============================================================== */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8 border border-zinc-200 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {editingMemberId ? 'সদস্যের তথ্য সম্পাদনা করুন' : 'নতুন সদস্য যুক্ত করুন'}
                </h3>
                <p className="text-xs text-zinc-500">পরিচালনা পর্ষদ বা ব্যবস্থাপনা টিমের প্রোফাইল হালনাগাদ</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                className="w-7 h-7 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ আল আমিন"
                    value={memberForm.nameBn}
                    onChange={e => setMemberForm({ ...memberForm, nameBn: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">Name (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Md. Al Amin"
                    value={memberForm.nameEn}
                    onChange={e => setMemberForm({ ...memberForm, nameEn: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">পদবী / ভূমিকা (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সিনিয়র ট্রাস্টি / কোঅর্ডিনেটর"
                    value={memberForm.roleBn}
                    onChange={e => setMemberForm({ ...memberForm, roleBn: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={memberForm.category}
                    onChange={e => setMemberForm({ ...memberForm, category: e.target.value as any })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-white"
                  >
                    <option value="board">পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড</option>
                    <option value="management">নির্বাহী ব্যবস্থাপনা ও কোঅর্ডিনেটর</option>
                    <option value="advisor">শরীয়াহ ও আইনি উপদেষ্টা</option>
                  </select>
                </div>
              </div>

              {/* Photo Input */}
              <div>
                <label className="font-medium text-zinc-700 block mb-1">ছবির লিংক (Photo URL)</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md border border-zinc-200 overflow-hidden shrink-0 bg-zinc-50 flex items-center justify-center">
                    {memberForm.image ? (
                      <img src={memberForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="/images/humanitarian-volunteers.jpg বা ছবির URL"
                    value={memberForm.image}
                    onChange={e => setMemberForm({ ...memberForm, image: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                {/* Presets */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMemberForm({ ...memberForm, image: av.url })}
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer',
                        memberForm.image === av.url
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-zinc-200'
                      )}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    placeholder="01913119525"
                    value={memberForm.phone}
                    onChange={e => setMemberForm({ ...memberForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    placeholder="member@gmcf.org"
                    value={memberForm.email}
                    onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-zinc-700 block mb-1">অবস্থান / ঠিকানা</label>
                <input
                  type="text"
                  placeholder="যেমন: সাভার, ঢাকা"
                  value={memberForm.locationBn}
                  onChange={e => setMemberForm({ ...memberForm, locationBn: e.target.value })}
                  className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div>
                <label className="font-medium text-zinc-700 block mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
                <textarea
                  rows={2}
                  placeholder="সদস্যের অবদান বা দায়িত্বের সংক্ষিপ্ত বিবরণ..."
                  value={memberForm.bioBn}
                  onChange={e => setMemberForm({ ...memberForm, bioBn: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="h-9 px-4 border border-zinc-200 text-zinc-700 rounded-md hover:bg-zinc-50 font-medium cursor-pointer shadow-2xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md font-medium shadow-2xs cursor-pointer"
                >
                  {editingMemberId ? 'হালনাগাদ সংরক্ষণ করুন' : 'সদস্য যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* shadcn Dialog: Volunteer Modal (Add / Edit) */}
      {/* ============================================================== */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8 border border-zinc-200 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {editingVolunteerId ? 'স্বেচ্ছাসেবকের তথ্য সম্পাদনা করুন' : 'নতুন স্বেচ্ছাসেবক যুক্ত করুন'}
                </h3>
                <p className="text-xs text-zinc-500">মাঠপর্যায়ের ত্রাণ ও মেডিকেল টিমের ভলান্টিয়ার এন্ট্রি</p>
              </div>
              <button
                type="button"
                onClick={() => setIsVolunteerModalOpen(false)}
                className="w-7 h-7 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVolunteer} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">স্বেচ্ছাসেবকের পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সাব্বির আহমেদ"
                    value={volunteerForm.name}
                    onChange={e => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="01700-000000"
                    value={volunteerForm.phone}
                    onChange={e => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">ইমেইল</label>
                  <input
                    type="email"
                    placeholder="volunteer@gmcf.org"
                    value={volunteerForm.email}
                    onChange={e => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">জেলা / ঠিকানা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ঢাকা (সাভার)"
                    value={volunteerForm.district}
                    onChange={e => setVolunteerForm({ ...volunteerForm, district: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">পছন্দের মানবিক খাত</label>
                  <input
                    type="text"
                    placeholder="যেমন: খাদ্য বিতরণ / চিকিৎসা ক্যাম্প"
                    value={volunteerForm.category}
                    onChange={e => setVolunteerForm({ ...volunteerForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <div>
                  <label className="font-medium text-zinc-700 block mb-1">অনুমোদন অবস্থা (Status)</label>
                  <select
                    value={volunteerForm.status}
                    onChange={e => setVolunteerForm({ ...volunteerForm, status: e.target.value as any })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-white"
                  >
                    <option value="APPROVED">APPROVED (অনুমোদিত)</option>
                    <option value="PENDING">PENDING (অপেক্ষমান)</option>
                    <option value="REJECTED">REJECTED (বাতিল)</option>
                  </select>
                </div>
              </div>

              {/* Photo Input */}
              <div>
                <label className="font-medium text-zinc-700 block mb-1">ছবির লিংক (Photo URL)</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md border border-zinc-200 overflow-hidden shrink-0 bg-zinc-50 flex items-center justify-center">
                    {volunteerForm.image ? (
                      <img src={volunteerForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <HandHeart className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="/images/youth-volunteers.jpg বা ছবির URL"
                    value={volunteerForm.image}
                    onChange={e => setVolunteerForm({ ...volunteerForm, image: e.target.value })}
                    className="w-full px-3 py-1.5 h-9 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                {/* Presets */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setVolunteerForm({ ...volunteerForm, image: av.url })}
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer',
                        volunteerForm.image === av.url
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-zinc-200'
                      )}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium text-zinc-700 block mb-1">দক্ষতা ও অভিজ্ঞতা</label>
                <textarea
                  rows={2}
                  placeholder="যেমন: ফিল্ড কোঅর্ডিনেশন, নার্সিং, ডিএসএলআর ফটোগ্রাফি..."
                  value={volunteerForm.skills}
                  onChange={e => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-md border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsVolunteerModalOpen(false)}
                  className="h-9 px-4 border border-zinc-200 text-zinc-700 rounded-md hover:bg-zinc-50 font-medium cursor-pointer shadow-2xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md font-medium shadow-2xs cursor-pointer"
                >
                  {editingVolunteerId ? 'হালনাগাদ সংরক্ষণ করুন' : 'স্বেচ্ছাসেবক যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* shadcn Alert Dialog: Delete Confirmation */}
      {/* ============================================================== */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 text-center animate-in fade-in-0 zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-zinc-900 mb-1.5">
              মুছে ফেলার নিশ্চিতকরণ
            </h3>

            <p className="text-xs text-zinc-600 leading-relaxed mb-5">
              আপনি কি নিশ্চিতভাবে <span className="font-semibold text-zinc-900">"{deleteConfirmation.name}"</span> কে{' '}
              {deleteConfirmation.type === 'member' ? 'সদস্য তালিকা' : 'স্বেচ্ছাসেবক তালিকা'} থেকে স্থায়ীভাবে মুছে ফেলতে চান? এই প্রক্রিয়া অপরিবর্তনীয়।
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmation({ isOpen: false, type: 'member', id: '', name: '' })}
                className="w-1/2 h-9 px-4 rounded-md border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors text-xs cursor-pointer shadow-2xs"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className="w-1/2 h-9 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors text-xs cursor-pointer shadow-2xs active:scale-95"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
