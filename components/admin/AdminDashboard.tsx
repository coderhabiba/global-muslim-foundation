'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModalState } from '@/lib/modal-context';
import { supabase } from '@/lib/supabase';

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

const DEFAULT_DONATIONS: DonationRecord[] = [
  {
    id: 'EPS849204912',
    donorName: 'Dr. Rafiqul Islam',
    donorPhone: '01711234567',
    donorEmail: 'rafiqul@gmail.com',
    amount: 15000,
    currency: 'BDT',
    cause: 'Clean Water Tube Well Project',
    method: 'BKASH',
    status: 'SUCCESS',
    date: '2025-05-14 11:32:04',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS920194012',
    donorName: 'Taslima Akhter',
    donorPhone: '01819876543',
    donorEmail: 'taslima.ak@yahoo.com',
    amount: 5000,
    currency: 'BDT',
    cause: 'Gaza Emergency Nourishment Appeal',
    method: 'NAGAD',
    status: 'SUCCESS',
    date: '2025-05-14 09:15:20',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS103948291',
    donorName: 'Shahidul Alam',
    donorPhone: '01913110000',
    donorEmail: 's.alam@corporate.com',
    amount: 50000,
    currency: 'BDT',
    cause: 'General Zakat Fund (100% Policy)',
    method: 'CARD (VISA)',
    status: 'SUCCESS',
    date: '2025-05-13 18:44:11',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS583920194',
    donorName: 'Farhana Kabir',
    donorPhone: '01672345678',
    donorEmail: 'farhana@outlook.com',
    amount: 3500,
    currency: 'BDT',
    cause: 'Project Alo (Pediatric Medical Aid)',
    method: 'ROCKET',
    status: 'SUCCESS',
    date: '2025-05-13 14:20:45',
    gateway: 'EPS Easy Payment System',
  },
  {
    id: 'EPS384910293',
    donorName: 'Anonymous Donor',
    donorPhone: '01700000000',
    donorEmail: 'anonymous@donor.org',
    amount: 10000,
    currency: 'BDT',
    cause: 'One Meal One Hope (Street Food Aid)',
    method: 'UPAY',
    status: 'SUCCESS',
    date: '2025-05-12 21:05:30',
    gateway: 'EPS Easy Payment System',
  },
];

const DEFAULT_VOLUNTEERS: VolunteerCandidate[] = [
  {
    id: 'VOL-2025-01',
    name: 'তানভীর আহমেদ',
    phone: '01788-992211',
    email: 'tanvir.vol@gmcf.org',
    district: 'ঢাকা (সাভার / আশুলিয়া)',
    category: 'জরুরি খাদ্য ও বস্ত্র বিতরণ',
    skills: 'ফিল্ড কোঅর্ডিনেশন ও যানবাহন সাপোর্ট',
    image: '/images/humanitarian-volunteers.jpg',
    date: '2025-05-14',
    status: 'APPROVED',
  },
  {
    id: 'VOL-2025-02',
    name: 'ফারজানা আক্তার রিতু',
    phone: '01922-334455',
    email: 'ritu.medical@gmcf.org',
    district: 'ঢাকা (মিরপুর)',
    category: 'মেডিকেল ও প্রাথমিক চিকিৎসা সহায়তা',
    skills: 'নার্সিং ডিপ্লোমা ও শিশু স্বাস্থ্য',
    image: '/images/resilient-mother-portrait.jpg',
    date: '2025-05-13',
    status: 'PENDING',
  },
  {
    id: 'VOL-2025-03',
    name: 'মাহমুদুল হাসান',
    phone: '01811-223344',
    email: 'hasan.media@gmcf.org',
    district: 'গাজীপুর',
    category: 'মিডিয়া, ফটোগ্রাফি ও সোশাল ক্যাম্পেইন',
    skills: 'ডিএসএলআর ভিডিওগ্রাফি ও গ্রাফিক্স ডিজাইন',
    image: '/images/youth-volunteers.jpg',
    date: '2025-05-12',
    status: 'APPROVED',
  },
  {
    id: 'VOL-2025-04',
    name: 'আব্দুল করিম',
    phone: '01555-667788',
    email: 'karim.wash@gmcf.org',
    district: 'নারায়ণগঞ্জ',
    category: 'সুপেয় পানি ও গভীর নলকূপ স্থাপন',
    skills: 'প্লাম্বিং ও টেকনিক্যাল মেরামত',
    image: '/images/clean-water-well.jpg',
    date: '2025-05-11',
    status: 'PENDING',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { openLicenseModal, openPaymentModal } = useModalState();
  const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'members' | 'volunteers' | 'campaigns' | 'settings'>('overview');
  
  const [donations, setDonations] = useState<DonationRecord[]>(DEFAULT_DONATIONS);
  const [members, setMembers] = useState<MemberRecord[]>(DEFAULT_MEMBERS);
  const [volunteers, setVolunteers] = useState<VolunteerCandidate[]>(DEFAULT_VOLUNTEERS);
  
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

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('gmcf:admin_auth');
    if (!authData) {
      router.push('/login');
      return;
    }

    // 1. Load donations from localStorage & Supabase
    try {
      const storedDonations = JSON.parse(localStorage.getItem('gmcf:donations') || '[]');
      if (storedDonations && storedDonations.length > 0) {
        setDonations([...storedDonations, ...DEFAULT_DONATIONS]);
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
      if (storedVolunteers && Array.isArray(storedVolunteers) && storedVolunteers.length > 0) {
        setVolunteers(storedVolunteers);
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
    if (confirm(`আপনি কি নিশ্চিতভাবে "${name}" কে স্বেচ্ছাসেবক তালিকা থেকে মুছে ফেলতে চান?`)) {
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
      const newMember: MemberRecord = {
        ...memberForm,
        id: 'm-' + Date.now(),
      };
      updated = [newMember, ...members];
      supabase
        .from('members')
        .insert({
          name_bn: newMember.nameBn,
          name_en: newMember.nameEn,
          role_bn: newMember.roleBn,
          role_en: newMember.roleEn,
          category: newMember.category,
          department_bn: newMember.departmentBn,
          image: newMember.image,
          phone: newMember.phone,
          email: newMember.email,
          location_bn: newMember.locationBn,
          bio_bn: newMember.bioBn,
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
    if (confirm(`আপনি কি নিশ্চিতভাবে "${name}" কে সদস্য তালিকা থেকে মুছে ফেলতে চান?`)) {
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
    }
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

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div data-l10n="off" className="min-h-screen bg-slate-100 flex flex-row items-stretch">
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Modern Fixed Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-emerald-950 text-white flex flex-col h-screen border-r border-emerald-900 shadow-2xl transition-transform duration-300 ease-in-out lg:sticky lg:top-0 shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header with Emblem, Title & Reg Badge */}
        <div className="p-4 border-b border-emerald-900/80 shrink-0 bg-emerald-950">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-3 group min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src="/images/gmcf-logo-emblem.png"
                  alt="GMCF Emblem Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-white leading-tight truncate">
                  Global Muslim
                </p>
                <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold truncate">
                  Charitable Foundation
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold truncate">
                    Reg: S-14086/2023
                  </span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Items (Scrolls internally so footer is ALWAYS locked visible) */}
        <nav className="p-3.5 flex-1 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            প্রধান মেনু
          </div>

          <button
            onClick={() => {
              setActiveTab('overview');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">ড্যাশবোর্ড ওভারভিউ</span>
            </div>
            <span className="bg-emerald-500/25 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full">
              লাইভ
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('donations');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'donations'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">অনুদান তালিকা</span>
            </div>
            <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
              {donations.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('members');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'members'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">সদস্য তালিকা</span>
            </div>
            <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
              {members.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('volunteers');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'volunteers'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">স্বেচ্ছাসেবক আবেদনপত্র</span>
            </div>
            <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
              {volunteers.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('campaigns');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">চলমান ক্যাম্পেইন</span>
            </div>
            <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
              ৪টি
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-800 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm tracking-wide">প্রাতিষ্ঠানিক সেটিংস</span>
            </div>
          </button>

          <div className="pt-3 px-3 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            অফিসিয়াল শর্টকাট
          </div>

          <a
            href="/images/permit.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-200 hover:bg-emerald-900/70 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span>সরকারি লাইসেন্স (PDF)</span>
          </a>

          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-200 hover:bg-emerald-900/70 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span>মূল ওয়েবসাইটে যান</span>
          </Link>
        </nav>

        {/* Sidebar Footer User Info & Logout (FIXED & ALWAYS VISIBLE without scrolling) */}
        <div className="p-3.5 border-t border-emerald-900 bg-emerald-950 shrink-0">
          <div className="flex items-center justify-between gap-3 bg-emerald-900/60 p-3 rounded-2xl border border-emerald-800 shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                MA
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm truncate">Mohammad Ali Mostafa</p>
                <p className="text-xs text-emerald-300 truncate font-medium">Chairman (Super Admin)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md active:scale-95 text-xs font-bold"
              title="লগআউট করুন"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sleek, Clean Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Active Section Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Open Sidebar"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  {activeTab === 'overview' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">dashboard</span>
                      <span>ড্যাশবোর্ড ওভারভিউ ও রিয়েলটাইম অ্যানালিটিক্স</span>
                    </>
                  )}
                  {activeTab === 'donations' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">payments</span>
                      <span>অনলাইন অনুদান ব্যবস্থাপনা</span>
                    </>
                  )}
                  {activeTab === 'members' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">badge</span>
                      <span>সদস্য ও ট্রাস্টি বোর্ড ব্যবস্থাপনা</span>
                    </>
                  )}
                  {activeTab === 'volunteers' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">volunteer_activism</span>
                      <span>স্বেচ্ছাসেবক আবেদনপত্র ও টিম</span>
                    </>
                  )}
                  {activeTab === 'campaigns' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">campaign</span>
                      <span>চলমান মানবিক ক্যাম্পেইনসমূহ</span>
                    </>
                  )}
                  {activeTab === 'settings' && (
                    <>
                      <span className="material-symbols-outlined text-emerald-700 text-[22px]">settings</span>
                      <span>প্রাতিষ্ঠানিক সরকারি তথ্যাদি ও সেটিংস</span>
                    </>
                  )}
                </h2>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — রেজিস্টার্ড এনজিও পোর্টাল
                </p>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => openLicenseModal()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>লাইসেন্স সনদ</span>
              </button>

              <button
                onClick={() => openPaymentModal({ amount: 5000, cause: 'Test EPS Gateway Transaction' })}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>EPS টেস্ট অনুদান</span>
              </button>

              {/* Direct Top-Bar Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                title="ড্যাশবোর্ড থেকে লগআউট করুন"
              >
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-6 max-w-[1600px] w-full text-sm">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                  সর্বমোট অনুদান সংগ্রহ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">
                  ৳{totalDonationsBdt.toLocaleString()}
                </h3>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  ১০০% যাকাত পলিসি নিশ্চিত
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                  সদস্য ও ট্রাস্টি সংখ্যা
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">
                  {members.length} জন
                </h3>
                <span className="text-xs text-teal-600 font-bold flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  পরিচালনা ও ট্রাস্টি বোর্ড
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shrink-0">
                <span className="material-symbols-outlined text-3xl">supervised_user_circle</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                  স্বেচ্ছাসেবক টিম
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">
                  {volunteers.length} জন
                </h3>
                <span className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                  {pendingVolunteersCount} জন অনুমোদনের অপেক্ষায়
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 shrink-0">
                <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                  সরকারি নিবন্ধন স্ট্যাটাস
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-mono">
                  S-14086/2023
                </h3>
                <a
                  href="/images/permit.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 mt-1.5 underline"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  স্বীকৃত লাইসেন্স (Permit PDF)
                </a>
              </div>
              <a
                href="/images/permit.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-13 h-13 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-700 flex items-center justify-center transition-colors cursor-pointer border border-teal-100 shrink-0"
                title="View Government License Permit"
              >
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </a>
            </div>
          </div>

          {/* Active Content Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col">
          <div className="flex border-b border-slate-200 px-4 sm:px-6 gap-2 bg-slate-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              ওভারভিউ ড্যাশবোর্ড
            </button>

            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'donations'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              অনুদান তালিকা ({donations.length})
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'members'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
              সদস্য তালিকা ({members.length})
            </button>

            <button
              onClick={() => setActiveTab('volunteers')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'volunteers'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              স্বেচ্ছাসেবক আবেদনপত্র ({volunteers.length})
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              চলমান ক্যাম্পেইন ওভারভিউ
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'settings'
                  ? 'border-emerald-700 text-emerald-800 bg-white shadow-sm -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              প্রাতিষ্ঠানিক তথ্য ও সেটিংস
            </button>
          </div>

          {/* Tab 0: Modern Overview Dashboard */}
          {activeTab === 'overview' && (
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-slate-50/60">
              {/* Live Status Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                  <span className="material-symbols-outlined text-[180px]">volunteer_activism</span>
                </div>
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3 backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন — লাইভ এডমিন কনসোল</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-serif-heading">
                    স্বাগতম, জনাব মোহাম্মদ আলী মোস্তফা
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 leading-relaxed">
                    আপনার মানবিক ত্রাণ ও অনুদান পোর্টালটি সরাসরি Supabase ক্লাউড ও EPS পেমেন্ট গেটওয়ের সাথে সুসংগঠিতভাবে সংযুক্ত। সাম্প্রতিক সকল তথ্য নিচের অ্যানালিটিক্সে পর্যবেক্ষণ করুন।
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-1">
                    <button
                      onClick={() => setActiveTab('donations')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">payments</span>
                      <span>সকল অনুদান দেখুন ({donations.length})</span>
                    </button>
                    <button
                      onClick={() => openAddMemberModal()}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                      <span>নতুন সদস্য যুক্ত করুন</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3-Column Visual Metrics & Realtime Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Payment Methods Breakdown */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-700 text-[18px]">account_balance</span>
                        পেমেন্ট মেথড বিভাজন
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">EPS গেটওয়ে</span>
                    </div>

                    <div className="space-y-3.5 mt-4">
                      {/* bKash */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-700 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                            বিকাশ (bKash)
                          </span>
                          <span className="font-mono text-slate-900">৬০%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full w-[60%] transition-all"></div>
                        </div>
                      </div>

                      {/* Nagad */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-700 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                            নগদ (Nagad)
                          </span>
                          <span className="font-mono text-slate-900">২৫%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full w-[25%] transition-all"></div>
                        </div>
                      </div>

                      {/* Bank / Card / Rocket */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-700 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                            কার্ড ও ব্যাংক ট্রান্সফার
                          </span>
                          <span className="font-mono text-slate-900">১৫%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full w-[15%] transition-all"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>সফল ট্রানজেকশন রেট</span>
                    <span className="font-bold text-emerald-700 font-mono">৯৯.৮% শতভাগ স্বচ্ছ</span>
                  </div>
                </div>

                {/* 2. Top Humanitarian Causes */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-700 text-[18px]">pie_chart</span>
                        শীর্ষ মানবিক খাতসমূহ
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        ১০০% যাকাত
                      </span>
                    </div>

                    <div className="space-y-3 mt-3 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span className="font-semibold text-slate-800 line-clamp-1">সুপেয় পানি ও নলকূপ প্রকল্প</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">৳১,০৫,০০০</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                          <span className="font-semibold text-slate-800 line-clamp-1">বাৎসরিক ফরজ যাকাত ফান্ড</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">৳৫০,০০০</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span className="font-semibold text-slate-800 line-clamp-1">ওয়ান মিল ওয়ান হোপ (খাদ্য)</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">৳১৮,৫০০</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span className="font-semibold text-slate-800 line-clamp-1">প্রজেক্ট আলো (চিকিৎসা সহায়তা)</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">৳৩,৫০০</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-between cursor-pointer w-full"
                  >
                    <span>ক্যাম্পেইন অগ্রগতি দেখুন</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 3. Fast Audit & Quick Actions */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-600 text-[18px]">verified</span>
                        সরকারি অডিট ও দ্রুত শর্টকাট
                      </h4>
                      <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                        এনজিও লাইসেন্স
                      </span>
                    </div>

                    <div className="space-y-2.5 mt-3">
                      <a
                        href="/images/permit.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-50 flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">সরকারি লাইসেন্স পারমিট</p>
                            <p className="text-[10px] text-slate-500">Reg: S-14086/2023</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-700 text-[18px]">open_in_new</span>
                      </a>

                      <button
                        onClick={() => openAddVolunteerModal()}
                        className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between group transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">person_add</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">নতুন ভলান্টিয়ার তালিকাভুক্তি</p>
                            <p className="text-[10px] text-slate-500">মাঠপর্যায়ের টিম যুক্ত করুন</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-amber-700 text-[18px]">add_circle</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between group transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-slate-800">প্রতিষ্ঠানের অফিসিয়াল প্রোফাইল</p>
                            <p className="text-[10px] text-slate-500">সাভার প্রধান কার্যালয় ও হটলাইন</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-700 text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>শরীয়াহ অডিট বোর্ড</span>
                    <span className="font-bold text-slate-800">অনুমোদিত ও সক্রিয়</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table Preview in Overview */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-[20px]">history</span>
                    <h4 className="text-sm font-bold text-slate-900">সাম্প্রতিক অনুদানসমূহ (রিয়েলটাইম প্রিভিউ)</h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('donations')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>সম্পূর্ণ তালিকা দেখুন</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">ট্রানজেকশন ID</th>
                        <th className="py-3 px-4">দাতার নাম ও যোগাযোগ</th>
                        <th className="py-3 px-4">মানবিক খাত</th>
                        <th className="py-3 px-4">পরিমাণ</th>
                        <th className="py-3 px-4">পদ্ধতি</th>
                        <th className="py-3 px-4">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {donations.slice(0, 4).map(d => (
                        <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800">{d.id}</td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">{d.donorName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{d.donorPhone}</p>
                          </td>
                          <td className="py-3 px-4 text-slate-700 font-medium">{d.cause}</td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-800">৳{d.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {d.method}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Donations List */}
          {activeTab === 'donations' && (
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="দাতা, মোবাইল নম্বর, ট্রানজেকশন ID বা খাত দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-slate-50"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
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
                    className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    CSV এক্সপোর্ট
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-4">ট্রানজেকশন ID</th>
                      <th className="p-4">দাতার নাম ও যোগাযোগ</th>
                      <th className="p-4">উদ্দেশ্য / খাত</th>
                      <th className="p-4">পরিমাণ</th>
                      <th className="p-4">পেমেন্ট মাধ্যম</th>
                      <th className="p-4">স্ট্যাটাস</th>
                      <th className="p-4">তারিখ ও সময়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                          কোনো অনুদানের রেকর্ড খুঁজে পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map(d => (
                        <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-mono text-emerald-800 font-bold text-sm">{d.id}</td>
                          <td className="p-4">
                            <span className="font-bold text-slate-900 block text-sm">{d.donorName}</span>
                            <span className="text-slate-500 font-mono text-xs">{d.donorPhone}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-slate-800 font-medium text-sm line-clamp-1">{d.cause}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-mono font-black text-emerald-800 text-base">
                              ৳{d.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 rounded-md font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                              {d.method}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              {d.status}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 font-mono text-xs">
                            {d.date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Members Management (Full CRUD with Photo) */}
          {activeTab === 'members' && (
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="সদস্যের নাম, পদবী বা মোবাইল দিয়ে খুঁজুন..."
                    value={memberSearchTerm}
                    onChange={e => setMemberSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-slate-50"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                </div>

                <button
                  type="button"
                  onClick={openAddMemberModal}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>নতুন সদস্য যুক্ত করুন</span>
                </button>
              </div>

              {/* Members Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-4 w-16 text-center">ছবি</th>
                      <th className="p-4">নাম ও পরিচিতি</th>
                      <th className="p-4">পদবী ও দায়িত্ব</th>
                      <th className="p-4">ক্যাটাগরি</th>
                      <th className="p-4">মোবাইল ও ইমেইল</th>
                      <th className="p-4">অবস্থান / জেলা</th>
                      <th className="p-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                          কোনো সদস্যের রেকর্ড খুঁজে পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 text-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 mx-auto bg-slate-100 flex items-center justify-center shadow-xs">
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
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">
                                  person
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-900 block text-base">{m.nameBn}</span>
                            <span className="text-slate-500 text-xs">{m.nameEn}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-emerald-900 block text-sm">{m.roleBn}</span>
                            <span className="text-slate-600 text-xs">{m.departmentBn || m.roleEn}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                                m.category === 'board'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : m.category === 'advisor'
                                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              }`}
                            >
                              {m.category === 'board'
                                ? 'ট্রাস্টি বোর্ড'
                                : m.category === 'advisor'
                                ? 'উপদেষ্টা'
                                : 'ব্যবস্থাপনা'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-slate-800 font-semibold block text-sm">{m.phone || '—'}</span>
                            <span className="text-slate-500 text-xs block">{m.email || '—'}</span>
                          </td>
                          <td className="p-4 text-slate-700 text-sm max-w-[180px] truncate">
                            {m.locationBn || 'ঢাকা, বাংলাদেশ'}
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => openEditMemberModal(m)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                              title="সম্পাদনা করুন"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                              <span>এডিট</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMember(m.id, m.nameBn)}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
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

          {/* Tab 3: Volunteer Applications (Full CRUD with Photo) */}
          {activeTab === 'volunteers' && (
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="স্বেচ্ছাসেবকের নাম, ফোন বা জেলা দিয়ে খুঁজুন..."
                    value={volunteerSearchTerm}
                    onChange={e => setVolunteerSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-slate-50"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                </div>

                <button
                  type="button"
                  onClick={openAddVolunteerModal}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>নতুন স্বেচ্ছাসেবক যুক্ত করুন</span>
                </button>
              </div>

              {/* Volunteers Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-4 w-16 text-center">ছবি</th>
                      <th className="p-4">আইডি ও নাম</th>
                      <th className="p-4">মোবাইল ও ইমেইল</th>
                      <th className="p-4">ঠিকানা / জেলা</th>
                      <th className="p-4">পছন্দের মানবিক খাত</th>
                      <th className="p-4">দক্ষতা ও অভিজ্ঞতা</th>
                      <th className="p-4">স্ট্যাটাস</th>
                      <th className="p-4 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 text-sm">
                          কোনো স্বেচ্ছাসেবকের রেকর্ড খুঁজে পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredVolunteers.map(v => (
                        <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 text-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 mx-auto bg-slate-100 flex items-center justify-center shadow-xs">
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
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">
                                  volunteer_activism
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-900 block text-base">{v.name}</span>
                            <span className="font-mono text-slate-500 text-xs">{v.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-slate-800 font-mono font-semibold block text-sm">{v.phone}</span>
                            <span className="text-slate-500 text-xs block">{v.email || '—'}</span>
                          </td>
                          <td className="p-4 text-slate-700 text-sm">{v.district}</td>
                          <td className="p-4">
                            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md border border-emerald-200 font-bold text-xs inline-block">
                              {v.category}
                            </span>
                          </td>
                          <td className="p-4 text-slate-700 text-sm max-w-xs">{v.skills}</td>
                          <td className="p-4">
                            <span
                              className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                                v.status === 'APPROVED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : v.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {v.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            {v.status !== 'APPROVED' && (
                              <button
                                onClick={() => handleStatusChange(v.id, 'APPROVED')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                              >
                                অনুমোদন
                              </button>
                            )}
                            {v.status !== 'REJECTED' && (
                              <button
                                onClick={() => handleStatusChange(v.id, 'REJECTED')}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                              >
                                বাতিল
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => openEditVolunteerModal(v)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                              title="সম্পাদনা"
                            >
                              <span className="material-symbols-outlined text-[15px] align-middle">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteVolunteer(v.id, v.name)}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                              title="মুছুন"
                            >
                              <span className="material-symbols-outlined text-[15px] align-middle">delete</span>
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

          {/* Tab 4: Campaigns Overview */}
          {activeTab === 'campaigns' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-food-1.jpg"
                    alt="Food Aid"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      One Meal One Hope (জরুরি খাদ্য বিতরণ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">রেলওয়ে ও বস্তি এলাকায় সুবিধাবঞ্চিতদের খাদ্য সরবরাহ</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৪,৫০,০০০ / লক্ষ্য: ৳১০,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-water-1.jpg"
                    alt="Water"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Clean Water Wells (গভীর নলকূপ স্থাপন)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">খরা ও আর্সেনিক আক্রান্ত অঞ্চলে নিরাপদ পানির সংস্থান</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৭,৮০,০০০ / লক্ষ্য: ৳১৫,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/orphans/Abdul-Hakim.jpg"
                    alt="Orphan"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Sponsor An Orphan (এতিম প্রতিপালন ও শিক্ষা)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">মাসিক স্পনসরশিপ ও কোরআন হিফজ শিক্ষা নিশ্চিতকরণ</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৬,২০,০০০ / লক্ষ্য: ৳১২,০০,০০০
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <img
                    src="/images/drive-house-1.jpg"
                    alt="Housing"
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      সক্রিয় ক্যাম্পেইন
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      Emergency Shelter &amp; Rebuild (ঘর নির্মাণ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">নদীভাঙন ও গৃহহীন পরিবারের স্থায়ী পুনর্বাসন</p>
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-800">
                      সংগৃহীত: ৳৫,১৫,০০০ / লক্ষ্য: ৳২০,০০,০০০
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Institutional Settings */}
          {activeTab === 'settings' && (
            <div className="p-4 sm:p-6 space-y-5 max-w-2xl">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                  প্রাতিষ্ঠানিক সরকারি তথ্যাদি (GMCF Official)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-500 font-bold block mb-1">চেয়ারম্যানের নাম</label>
                    <input
                      type="text"
                      readOnly
                      value="Mohammad Ali Mostafa"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">ফাউন্ডেশনের পূর্ণ নাম</label>
                    <input
                      type="text"
                      readOnly
                      value="Global Muslim Charitable Foundation"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">অফিসিয়াল ইমেইল</label>
                    <input
                      type="text"
                      readOnly
                      value="gmcfoundation2022@gmail.com"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">অফিসিয়াল হটলাইন</label>
                    <input
                      type="text"
                      readOnly
                      value="01913119525"
                      className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 font-bold block mb-1 text-xs">নিবন্ধিত কেন্দ্রীয় কার্যালয়</label>
                  <input
                    type="text"
                    readOnly
                    value="House #99, Kaisharchor, Vakurta, Savar, Dhaka-1340, Bangladesh"
                    className="w-full bg-white px-3 py-2 border rounded-xl font-semibold border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                  সরকারি অনুদান ও অডিট কমপ্লায়েন্স
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন বাংলাদেশ সরকারের সোসাইটি রেজিস্ট্রেশন অ্যাক্ট ১৮৬০ এর আওতায় নিবন্ধিত (রেজি নং: S-14086/2023)। সংগৃহীত সকল অনুদান চার্টার্ড একাউন্ট্যান্ট দ্বারা অডিটকৃত এবং পূর্ণাঙ্গভাবে শরীয়াহ সম্মত খাতসমূহে তামলিক নিশ্চিত করে ব্যয় করা হয়।
                </p>
                <div className="pt-2">
                  <a
                    href="/images/permit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-900 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    অফিসিয়াল পারমিট লাইসেন্স ডাউনলোড করুন
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        </main>
      </div>

      {/* ============================================================== */}
      {/* Member Modal (Add / Edit) */}
      {/* ============================================================== */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center material-symbols-outlined text-lg">
                  badge
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-serif-heading">
                  {editingMemberId ? 'সদস্যের তথ্য সম্পাদনা করুন' : 'নতুন সদস্য যুক্ত করুন'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ আল আমিন"
                    value={memberForm.nameBn}
                    onChange={e => setMemberForm({ ...memberForm, nameBn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Name (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Md. Al Amin"
                    value={memberForm.nameEn}
                    onChange={e => setMemberForm({ ...memberForm, nameEn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">পদবী / ভূমিকা (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সিনিয়র ট্রাস্টি / কোঅর্ডিনেটর"
                    value={memberForm.roleBn}
                    onChange={e => setMemberForm({ ...memberForm, roleBn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={memberForm.category}
                    onChange={e => setMemberForm({ ...memberForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 bg-white"
                  >
                    <option value="board">পরিচালনা পর্ষদ ও ট্রাস্টি বোর্ড</option>
                    <option value="management">নির্বাহী ব্যবস্থাপনা ও কোঅর্ডিনেটর</option>
                    <option value="advisor">শরীয়াহ ও আইনি উপদেষ্টা</option>
                  </select>
                </div>
              </div>

              {/* Photo Input & Preview */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">ছবির লিংক (Photo URL)</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border border-slate-300 overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                    {memberForm.image ? (
                      <img src={memberForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">person</span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="/images/humanitarian-volunteers.jpg বা যেকোনো ছবির লিংক"
                    value={memberForm.image}
                    onChange={e => setMemberForm({ ...memberForm, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                {/* Preset Avatars */}
                <div className="mt-2">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">প্রিসেট ছবি বেছে নিন:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMemberForm({ ...memberForm, image: av.url })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                          memberForm.image === av.url
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                        }`}
                      >
                        {av.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    placeholder="01913119525"
                    value={memberForm.phone}
                    onChange={e => setMemberForm({ ...memberForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    placeholder="member@gmcf.org"
                    value={memberForm.email}
                    onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">অবস্থান / ঠিকানা</label>
                <input
                  type="text"
                  placeholder="যেমন: সাভার, ঢাকা"
                  value={memberForm.locationBn}
                  onChange={e => setMemberForm({ ...memberForm, locationBn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
                <textarea
                  rows={2}
                  placeholder="সদস্যের অবদান বা দায়িত্বের সংক্ষিপ্ত বিবরণ..."
                  value={memberForm.bioBn}
                  onChange={e => setMemberForm({ ...memberForm, bioBn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow cursor-pointer"
                >
                  {editingMemberId ? 'হালনাগাদ সংরক্ষণ করুন' : 'সদস্য যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* Volunteer Modal (Add / Edit) */}
      {/* ============================================================== */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center material-symbols-outlined text-lg">
                  volunteer_activism
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-serif-heading">
                  {editingVolunteerId ? 'স্বেচ্ছাসেবকের তথ্য সম্পাদনা করুন' : 'নতুন স্বেচ্ছাসেবক যুক্ত করুন'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVolunteerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVolunteer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">স্বেচ্ছাসেবকের পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সাব্বির আহমেদ"
                    value={volunteerForm.name}
                    onChange={e => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="01700-000000"
                    value={volunteerForm.phone}
                    onChange={e => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ইমেইল</label>
                  <input
                    type="email"
                    placeholder="volunteer@gmcf.org"
                    value={volunteerForm.email}
                    onChange={e => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">জেলা / ঠিকানা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ঢাকা (সাভার)"
                    value={volunteerForm.district}
                    onChange={e => setVolunteerForm({ ...volunteerForm, district: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">পছন্দের মানবিক খাত</label>
                  <input
                    type="text"
                    placeholder="যেমন: খাদ্য বিতরণ / চিকিৎসা ক্যাম্প"
                    value={volunteerForm.category}
                    onChange={e => setVolunteerForm({ ...volunteerForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">অনুমোদন অবস্থা (Status)</label>
                  <select
                    value={volunteerForm.status}
                    onChange={e => setVolunteerForm({ ...volunteerForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 bg-white"
                  >
                    <option value="APPROVED">APPROVED (অনুমোদিত)</option>
                    <option value="PENDING">PENDING (অপেক্ষমান)</option>
                    <option value="REJECTED">REJECTED (বাতিল)</option>
                  </select>
                </div>
              </div>

              {/* Photo Input & Preview */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">ছবির লিংক (Photo URL)</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border border-slate-300 overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                    {volunteerForm.image ? (
                      <img src={volunteerForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">volunteer_activism</span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="/images/youth-volunteers.jpg বা যেকোনো ছবির লিংক"
                    value={volunteerForm.image}
                    onChange={e => setVolunteerForm({ ...volunteerForm, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>
                {/* Preset Avatars */}
                <div className="mt-2">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">প্রিসেট ছবি বেছে নিন:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setVolunteerForm({ ...volunteerForm, image: av.url })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                          volunteerForm.image === av.url
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                        }`}
                      >
                        {av.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">দক্ষতা ও অভিজ্ঞতা</label>
                <textarea
                  rows={2}
                  placeholder="যেমন: ফিল্ড কোঅর্ডিনেশন, নার্সিং, ডিএসএলআর ফটোগ্রাফি ইত্যাদি..."
                  value={volunteerForm.skills}
                  onChange={e => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsVolunteerModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow cursor-pointer"
                >
                  {editingVolunteerId ? 'হালনাগাদ সংরক্ষণ করুন' : 'স্বেচ্ছাসেবক যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
