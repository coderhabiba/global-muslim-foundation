'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface ProjectDocumentaryPlayerProps {
  videoUrl?: string;
  coverImage?: string;
  videoDuration?: string;
  videoTitle?: string;
  videoSubtitle?: string;
  videoBadge?: string;
  isBn?: boolean;
  onDonateClick: () => void;
}

interface Chapter {
  id: number;
  timeStart: number; // in seconds
  timeEnd: number;
  timestampStr: string;
  titleBn: string;
  titleEn: string;
  locationBn: string;
  locationEn: string;
  narrativeBn: string;
  narrativeEn: string;
  image: string;
  badgeBn: string;
  badgeEn: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    timeStart: 0,
    timeEnd: 55,
    timestampStr: 'রাত ১১:৩০',
    titleBn: 'বিশাল ডেকচিতে গরম বিরিয়ানি রান্না ও ১০০ টাকার ফুড প্যাক প্রস্তুতি',
    titleEn: 'Warm Biryani Cooking & 100 BDT Food Pack Preparation',
    locationBn: 'কেন্দ্রীয় খাদ্য রান্নাশালা, ঢাকা',
    locationEn: 'Central Relief Kitchen Hub, Dhaka',
    narrativeBn:
      'মধ্যরাতের নিস্তব্ধতায় নিবেদিত তরুণ স্বেচ্ছাসেবকরা পরম মায়ায় রান্না করছেন গরম সুস্বাদু বিরিয়ানি। প্রতিটি প্যাকেটের সাথে সিল করা হচ্ছে ৫০০ মিলি বিশুদ্ধ খাবার পানির বোতল — প্রতি প্যাকেটের বাজেট মাত্র ১০০/- টাকা।',
    narrativeEn:
      'Under the quiet Dhaka night, dedicated youth volunteers prepare freshly cooked hot biryani and seal 500ml pure drinking water bottles — each complete nutrition pack sponsored for just 100 BDT ($1 USD).',
    image: '/images/volunteers-cooking-pots.jpg',
    badgeBn: 'পর্ব ০১ • রান্না ও প্যাকেজিং',
    badgeEn: 'Part 01 • Cooking & Packing',
  },
  {
    id: 2,
    timeStart: 55,
    timeEnd: 110,
    timestampStr: 'রাত ০১:০০',
    titleBn: 'ভ্যানে করে মধ্যরাতের নিস্তব্ধতায় ঢাকার বিভিন্ন পয়েন্টে পৌঁছানো',
    titleEn: 'Dispatched by Van Across Street Hubs Across Dhaka City',
    locationBn: 'কমলাপুর রেলস্টেশন ও কারওয়ান বাজার ফ্লাইওভার',
    locationEn: 'Kamalapur Station & Karwan Bazar Flyovers',
    narrativeBn:
      'ভ্যানভর্তি তাজা গরম খাবারের বাক্স নিয়ে টিম ছুটে চলেছে রাজধানীর ফুটপাত, রেললাইন ও ফ্লাইওভারের নিচে। যেখানে প্রচণ্ড ক্লান্তিতে খালি পেটে ঘুমিয়ে আছেন শত শত ছিন্নমূল অনাহারী মানুষ।',
    narrativeEn:
      'Loaded with steaming food boxes, relief volunteers navigate late-night Dhaka pavements and bridges where destitute people sleep without dinner on bare concrete.',
    image: '/images/drive-food-1.jpg',
    badgeBn: 'পর্ব ০২ • রাজপথে মাঠপর্যায়ের যাত্রা',
    badgeEn: 'Part 02 • Midnight Field Outreach',
  },
  {
    id: 3,
    timeStart: 110,
    timeEnd: 165,
    timestampStr: 'রাত ০২:১৫',
    titleBn: 'প্রতিটি অনাহারী মানুষের হাতে পরম সম্মানের সাথে খাবার ও নিরাপদ পানি বিতরণ',
    titleEn: 'Handing Out Warm Meals & Pure Water with Unwavering Dignity',
    locationBn: 'সদরঘাট লঞ্চ টার্মিনাল, মিরপুর ও গাবতলী বাস টার্মিনাল',
    locationEn: 'Sadarghat Ferry Port, Mirpur & Gabtoli Terminals',
    narrativeBn:
      'কোনো ক্যামেরা বা অহংকার নয়, মানবতার সেবায় শতভাগ আমানতদারিতার সাথে প্রতিটি অনাহারীর মুখে তুলে দেওয়া হচ্ছে এক বেলার সম্মানজনক খাবার ও তৃষ্ণা মেটানোর সুপেয় বিশুদ্ধ পানি।',
    narrativeEn:
      'With zero ostentation and complete Shariah trustworthiness, wholesome biryani hampers and bottled water are handed directly to hungry hands.',
    image: '/images/street-children-hot-meals.jpg',
    badgeBn: 'পর্ব ০৩ • সরাসরি খাদ্য বিতরণ',
    badgeEn: 'Part 03 • Direct Meal Handover',
  },
  {
    id: 4,
    timeStart: 165,
    timeEnd: 215,
    timestampStr: 'রাত ০৩:০০',
    titleBn: 'পেট পুরে তৃপ্তির আহার ও এক ফোঁটা নিরাপদ পানির পরম স্বস্তি',
    titleEn: 'Heartfelt Relief of a Full Dinner & Dignified Sleep for the Homeless',
    locationBn: 'ঢাকা শহরের বিভিন্ন ফুটপাত ও বস্তি সংলগ্ন এলাকা',
    locationEn: 'Dhaka Pavements & Slum Hubs Across 64 Districts Network',
    narrativeBn:
      'সারাদিনের অনাহার আর ক্লান্তির পর পেট পুরে পরম তৃপ্তিতে গরম বিরিয়ানি খেয়ে তারা শান্তিতে ঘুমাতে পারে। আপনার মাত্র ১০০ টাকার অনুদানে বেঁচে থাকে তাদের এই হাসি ও তৃপ্তির দোয়া।',
    narrativeEn:
      'After a long day of hunger, a single 100 BDT gift brings warm food, clean water, and peaceful sleep to homeless souls. Your Sadaqah sustains this smile.',
    image: '/images/children-meal-rows.jpg',
    badgeBn: 'পর্ব ০৪ • অনাহারীর মুখে তৃপ্তির হাসি',
    badgeEn: 'Part 04 • The Joy of Full Stomachs',
  },
];

const TOTAL_DURATION_SEC = 215; // 3m 35s

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatVideoEmbedUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  return trimmed;
}

export default function ProjectDocumentaryPlayer({
  videoUrl,
  coverImage,
  videoDuration,
  videoTitle,
  videoSubtitle,
  videoBadge,
  isBn = true,
  onDonateClick,
}: ProjectDocumentaryPlayerProps) {
  // Player mode: 'documentary' or 'youtube'
  const isCustomYoutubeUrl =
    videoUrl &&
    videoUrl.trim() !== '' &&
    !videoUrl.includes('dQw4w9WgXcQ') &&
    !videoUrl.includes('ScMzIvxBSi4');

  const [activeMode, setActiveMode] = useState<'documentary' | 'youtube'>(
    isCustomYoutubeUrl ? 'youtube' : 'documentary'
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Find current chapter
  const currentChapter =
    CHAPTERS.find(c => currentTime >= c.timeStart && currentTime < c.timeEnd) ||
    CHAPTERS[CHAPTERS.length - 1];

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && activeMode === 'documentary') {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            return TOTAL_DURATION_SEC;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeMode]);

  // Web Audio API ambient soundscape synthesis
  useEffect(() => {
    if (!isMuted && isPlaying && activeMode === 'documentary') {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Clean previous oscillators
        oscNodesRef.current.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscNodesRef.current = [];

        // Master gain
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft ambient volume
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Warm harmonic drone chords (C3, G3, C4)
        const freqs = [130.81, 196.0, 261.63];
        freqs.forEach(freq => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle low-pass warmth
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          osc.connect(filter);
          filter.connect(gainNode);
          osc.start();
          oscNodesRef.current.push(osc);
        });
      } catch (err) {
        console.warn('AudioContext not allowed or supported:', err);
      }
    } else {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
          setTimeout(() => {
            oscNodesRef.current.forEach(osc => {
              try {
                osc.stop();
                osc.disconnect();
              } catch {}
            });
            oscNodesRef.current = [];
          }, 600);
        } catch {}
      }
    }
  }, [isMuted, isPlaying, activeMode]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      oscNodesRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  const handleStartPlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (currentTime >= TOTAL_DURATION_SEC) {
      setCurrentTime(0);
    }
  };

  const togglePlay = () => {
    if (!hasStarted) {
      handleStartPlay();
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = Math.round(ratio * TOTAL_DURATION_SEC);
    setCurrentTime(targetTime);
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handleJumpChapter = (chapter: Chapter) => {
    setCurrentTime(chapter.timeStart);
    setHasStarted(true);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black text-white shadow-2xl border border-emerald-800/40 select-none group ${
        isFullscreen ? 'h-screen w-screen rounded-none' : 'aspect-video'
      }`}
    >
      {/* If YouTube mode selected & URL exists */}
      {activeMode === 'youtube' && videoUrl ? (
        <div className="relative w-full h-full">
          <iframe
            src={formatVideoEmbedUrl(videoUrl)}
            title="GMCF Video Stream"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Top Switcher Pill */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveMode('documentary')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">movie</span>
              <span>{isBn ? 'সরাসরি ফিল্ড ডকুমেন্টারি দেখুন' : 'Switch to Field Documentary'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Built-in High-Definition Documentary Player */
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">
          {/* Background Scene Image with Cinematic Ken Burns Movement */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {CHAPTERS.map(ch => {
              const isActive = ch.id === currentChapter.id;
              return (
                <div
                  key={ch.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-1' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={ch.image}
                    alt={ch.titleBn}
                    className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-linear ${
                      isPlaying && isActive ? 'scale-110 translate-x-1 translate-y-1' : 'scale-100'
                    }`}
                  />
                  {/* Cinematic Film Vignette & Dark Shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* INITIAL COVER OVERLAY (Before First Play) */}
          {!hasStarted && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-black/40 hover:bg-black/30 transition-colors"
              onClick={handleStartPlay}
            >
              <div className="relative flex items-center justify-center mb-4">
                <span className="absolute w-24 h-24 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                <span className="absolute w-20 h-20 rounded-full bg-amber-400/40 blur-xs pointer-events-none" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[42px] ml-1 text-slate-950">
                    play_arrow
                  </span>
                </div>
              </div>

              <div className="max-w-xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/30 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isBn ? (videoBadge || 'ফিল্ড ডকুমেন্টারি • মাসিক কার্যক্রমের ভিডিও') : 'Field Documentary • Monthly Drive'}</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif-heading text-white drop-shadow-md">
                  {isBn ? (videoTitle || 'রাতের আঁধারে ক্ষুধার্ত মানুষের মুখে এক প্যাকেট গরম খাবার ও নিরাপদ পানি') : 'Midnight Warm Meals & Clean Water for Dhaka Destitute'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow-xs max-w-lg mx-auto">
                  {isBn ? (videoSubtitle || 'ঢাকার রাজপথে মধ্যরাতে বিরিয়ানি ও বিশুদ্ধ পানি বিতরণের প্রামাণ্যচিত্র।') : 'Documentary of late-night biryani hampers and bottled water on Dhaka streets.'}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-amber-400/30">
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>{isBn ? 'ডকুমেন্টারিটি শুরু করতে ক্লিক করুন (৩ মিনিট ৩৫ সেকেন্ড)' : 'Click to Play Full Documentary (3m 35s)'}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TOP HUD BAR (During Playback) */}
          <div
            className={`relative z-10 p-4 sm:p-6 flex items-start justify-between gap-4 transition-opacity duration-300 ${
              hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Live Camera Watermark & Chapter Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[10px] font-mono font-black tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>REC • GMCF FIELD</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-amber-400 font-mono text-[10px] font-bold border border-white/10">
                  1080p FHD
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-slate-300 font-mono text-[10px] font-bold border border-white/10 hidden sm:inline-block">
                  {currentChapter.timestampStr}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-400 text-[16px]">location_on</span>
                <span>{isBn ? currentChapter.locationBn : currentChapter.locationEn}</span>
              </h4>
            </div>

            {/* Top Right HUD Actions */}
            <div className="flex items-center gap-2">
              {/* Audio Ambience Toggle */}
              <button
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
                  !isMuted
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-black/60 text-slate-300 border border-white/15 hover:bg-black/80'
                }`}
                title={isMuted ? 'সাউন্ড চালু করুন' : 'মিউট করুন'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {!isMuted ? 'volume_up' : 'volume_off'}
                </span>
                <span className="hidden sm:inline">
                  {!isMuted ? (isBn ? 'সাউন্ড চালু' : 'Sound On') : (isBn ? 'সাউন্ড মিউট' : 'Sound Off')}
                </span>
              </button>

              {/* Subtitles CC Toggle */}
              <button
                type="button"
                onClick={() => setShowSubtitles(prev => !prev)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 backdrop-blur-md cursor-pointer ${
                  showSubtitles
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-black/60 text-slate-300 border border-white/15'
                }`}
                title="সাবটাইটেল চালু/বন্ধ"
              >
                <span className="material-symbols-outlined text-[16px]">closed_caption</span>
                <span className="text-[10px]">CC</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                title="ফুলস্ক্রিন"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>
          </div>

          {/* CENTER LIVE SUBTITLES HUD (During Playback) */}
          {hasStarted && showSubtitles && (
            <div className="relative z-10 px-4 sm:px-8 py-2 max-w-3xl mx-auto w-full text-center">
              <div className="inline-block bg-black/75 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 shadow-2xl">
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                  {isBn ? currentChapter.badgeBn : currentChapter.badgeEn}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed font-serif-heading">
                  {isBn ? currentChapter.narrativeBn : currentChapter.narrativeEn}
                </p>
              </div>
            </div>
          )}

          {/* BOTTOM CONTROLS & TIMELINE DOCK */}
          <div
            className={`relative z-10 p-3 sm:p-5 bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300 ${
              hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Clickable Seek Progress Bar */}
            <div
              className="relative w-full h-3 sm:h-3.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer overflow-hidden mb-3 transition-all"
              onClick={handleSeek}
              title="টাইমলাইন স্ক্রল করুন"
            >
              {/* Elapsed Progress */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / TOTAL_DURATION_SEC) * 100}%` }}
              />

              {/* Chapter division dots */}
              {CHAPTERS.map(ch => (
                <div
                  key={ch.id}
                  className="absolute top-0 bottom-0 w-0.5 bg-black/60 pointer-events-none"
                  style={{ left: `${(ch.timeStart / TOTAL_DURATION_SEC) * 100}%` }}
                />
              ))}
            </div>

            {/* Bottom Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Left: Play/Pause, Rewind, Time Counter */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentTime(prev => Math.max(0, prev - 10))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="১০ সেকেন্ড পেছনে যান"
                >
                  <span className="material-symbols-outlined text-[16px]">replay_10</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentTime(prev => Math.min(TOTAL_DURATION_SEC, prev + 10))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="১০ সেকেন্ড সামনে যান"
                >
                  <span className="material-symbols-outlined text-[16px]">forward_10</span>
                </button>

                <div className="font-mono text-[11px] font-bold text-slate-300">
                  <span className="text-white">{formatSeconds(currentTime)}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-slate-400">{formatSeconds(TOTAL_DURATION_SEC)}</span>
                </div>
              </div>

              {/* Center: Chapter Quick Selector Chips (Desktop) */}
              <div className="hidden lg:flex items-center gap-1.5">
                {CHAPTERS.map(ch => {
                  const isActive = ch.id === currentChapter.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleJumpChapter(ch)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {ch.id}. {ch.timestampStr}
                    </button>
                  );
                })}
              </div>

              {/* Right: Quick Donate Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onDonateClick}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[11px] sm:text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">volunteer_activism</span>
                  <span>{isBn ? '১০০ টাকায় খাবার অনুদান' : 'Donate 100 BDT'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

