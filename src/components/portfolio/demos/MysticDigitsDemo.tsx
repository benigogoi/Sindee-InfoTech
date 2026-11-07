import { useState } from 'react'
import {
  Sparkles,
  ExternalLink,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

export function MysticDigitsDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [userName, setUserName] = useState<string>('Siddhartha')
  const [birthDate, setBirthDate] = useState<string>('1994-08-15')
  const [activeChapter, setActiveChapter] = useState<number>(1)

  // Calculate Vedic Mulank (Day digit sum reduced to 1-9)
  const calculateMulank = (dateStr: string): number => {
    if (!dateStr) return 6
    const parts = dateStr.split('-')
    const day = parseInt(parts[2] || '15', 10)
    let sum = Math.floor(day / 10) + (day % 10)
    while (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10)
    }
    return sum || 6
  }

  // Calculate Vedic Bhagyank (Full date sum reduced to 1-9)
  const calculateBhagyank = (dateStr: string): number => {
    if (!dateStr) return 1
    const digits = dateStr.replace(/\D/g, '').split('').map(Number)
    let sum = digits.reduce((acc, curr) => acc + curr, 0)
    while (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10)
    }
    return sum || 1
  }

  const mulank = calculateMulank(birthDate)
  const bhagyank = calculateBhagyank(birthDate)

  const PLANETARY_RULERS: Record<number, { planet: string; traits: string; color: string; stone: string }> = {
    1: { planet: 'Surya (Sun)', traits: 'Natural Leadership, Strong Will, Executive Authority', color: 'Gold & Crimson Red', stone: 'Ruby (Manik)' },
    2: { planet: 'Chandra (Moon)', traits: 'Intuition, Emotional Sensitivity, Diplomacy', color: 'Pure White & Silver', stone: 'Natural Pearl (Moti)' },
    3: { planet: 'Guru (Jupiter)', traits: 'Wisdom, Higher Learning, Expansion & Guidance', color: 'Bright Yellow & Amber', stone: 'Yellow Sapphire (Pukhraj)' },
    4: { planet: 'Rahu (North Node)', traits: 'Unconventional Strategy, Tech Savvy, Breakthroughs', color: 'Electric Blue & Charcoal', stone: 'Hessonite (Gomed)' },
    5: { planet: 'Budha (Mercury)', traits: 'Commerce, Rapid Communication, Adaptability', color: 'Emerald Green', stone: 'Emerald (Panna)' },
    6: { planet: 'Shukra (Venus)', traits: 'Luxury, Creative Aesthetics, Harmony & Wealth', color: 'Diamond White & Pastels', stone: 'Diamond / White Zircon' },
    7: { planet: 'Ketu (South Node)', traits: 'Deep Spirituality, Research, Analytical Mysticism', color: 'Smoky Grey & Moss', stone: "Cat's Eye (Lehsuniya)" },
    8: { planet: 'Shani (Saturn)', traits: 'Discipline, Hard Work, Karmic Justice, Long-term Focus', color: 'Navy Blue & Dark Steel', stone: 'Blue Sapphire (Neelam)' },
    9: { planet: 'Mangal (Mars)', traits: 'Courage, Dynamic Energy, Protective Drive, Action', color: 'Coral Red & Copper', stone: 'Red Coral (Moonga)' },
  }

  const ruler = PLANETARY_RULERS[mulank] || PLANETARY_RULERS[6]

  const CHAPTERS = [
    {
      num: 1,
      title: 'Chapter 1: Vedic Mulank (Driver #) Deep-Dive',
      content:
        'Detailed breakdown of your primary soul vibration, innate character strengths, leadership style, and subconscious motivations calculated from your day of birth.',
    },
    {
      num: 2,
      title: 'Chapter 2: 3x3 Lo Shu Grid & Elemental Planes',
      content:
        'Visual Lo Shu matrix plotting your mental, emotional, and practical planes. Identifies arrows of thought, missing numbers, and natural elemental imbalances.',
    },
    {
      num: 3,
      title: 'Chapter 3: Personal Year 2026 Cycle Roadmap',
      content:
        'Month-by-month career, financial, and personal timing roadmap based on your active 9-year personal astrological cycle.',
    },
    {
      num: 4,
      title: 'Chapter 4: Vedic Gemstones & Astrological Remedies',
      content:
        'Prescribed planetary gemstones, auspicious metals, favorable days of the week, and authentic Sanskrit Vedic mantras for harmonic alignment.',
    },
  ]

  return (
    <div className="bg-[#070b18] text-[#e1e7f5] font-sans antialiased selection:bg-amber-400 selection:text-black">
      {/* 1. Live Web App Ticker */}
      <div className={`bg-gradient-to-r from-indigo-900 via-amber-600 to-indigo-900 text-white font-bold text-center tracking-wide flex items-center justify-center gap-2 ${
        isMobile ? 'py-1.5 px-3 text-[10px]' : 'py-2 px-4 text-[11px]'
      }`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span className="truncate">
          {isMobile
            ? 'LIVE APP: 14,000+ Reports Delivered • mysticdigits.in'
            : 'LIVE PRODUCTION PLATFORM: 14,000+ Automated Vedic Numerology Reports Delivered Worldwide • Deployed at mysticdigits.in'}
        </span>
      </div>

      {/* 2. Header */}
      <header className="border-b border-indigo-900/40 bg-[#0b1024]/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-black flex items-center justify-center font-serif font-black text-xs sm:text-base shadow-lg shrink-0">
            MD
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-xs sm:text-xl tracking-tight text-white truncate">
                MYSTICDIGITS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
                LIVE APP
              </span>
            </div>
            {!isMobile && (
              <p className="text-[10px] text-slate-400 font-mono truncate">Vedic Numerology Platform</p>
            )}
          </div>
        </div>

        <a
          href="https://mysticdigits.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
        >
          <span>{isMobile ? 'Visit App' : 'Launch mysticdigits.in'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </header>

      {/* 3. Hero Section with Real Web App Screenshot */}
      <section className={`relative border-b border-indigo-950/60 overflow-hidden bg-gradient-to-b from-[#0e1630] to-[#070b18] ${
        isMobile ? 'px-3 py-6' : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
      }`}>
        <div className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }>
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Full-Stack Web Application Built by Sindee InfoTech</span>
            </div>

            <h1 className={
              isMobile
                ? 'text-xl sm:text-2xl font-black tracking-tight text-white leading-snug'
                : 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight'
            }>
              Automated 27-Page <br />
              <span className="text-amber-400">Vedic Numerology Blueprint</span> Engine
            </h1>

            <p className={isMobile ? 'text-xs text-slate-300 leading-relaxed' : 'text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl'}>
              We engineered a high-converting web platform that executes intricate Vedic mathematical formulas in real time, generates publication-quality 27-page personalized reports, and automates email fulfillment in seconds.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 text-xs text-slate-300">
              <div className="p-2 sm:p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center sm:text-left">
                <span className="text-amber-400 font-bold block text-xs sm:text-sm">27 Pages</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Custom PDF</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center sm:text-left">
                <span className="text-amber-400 font-bold block text-xs sm:text-sm">&lt; 3 Sec</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Calculation</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center sm:text-left">
                <span className="text-amber-400 font-bold block text-xs sm:text-sm">100%</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Automated</span>
              </div>
            </div>
          </div>

          {/* Hero App Screenshot Visual */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
            <div className="rounded-2xl border border-indigo-700/40 overflow-hidden shadow-2xl bg-black">
              <img
                src="/images/portfolio/mystic-digits.png"
                alt="MysticDigits Vedic Numerology Platform preview"
                className="w-full h-auto object-cover"
              />
              <div className="p-2.5 sm:p-3 bg-[#0d142a] border-t border-indigo-900/60 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-mono text-[11px]">mysticdigits.in</span>
                <a
                  href="https://mysticdigits.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Open App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Interactive Vedic Calculation Engine */}
      <section className={`border-b border-indigo-950/60 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={`text-center mx-auto mb-6 ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Interactive Calculation
          </span>
          <h2 className={isMobile ? 'text-lg font-black text-white' : 'text-2xl sm:text-3xl font-black text-white'}>
            Try the Real-Time Vedic Calculation Algorithm
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Change the name and birth date below to see how the mathematical reduction algorithms compute Mulank and Bhagyank instantly.
          </p>
        </div>

        <div className={`rounded-3xl bg-[#0d152d] border border-indigo-800/50 shadow-2xl ${
          isMobile
            ? 'p-4 flex flex-col gap-6'
            : 'p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }`}>
          {/* Inputs */}
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-5 space-y-4'}>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
              User Input Parameters
            </span>

            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Full Legal Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#080d1c] border border-indigo-900/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Date of Birth (YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-[#080d1c] border border-indigo-900/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/30 text-xs text-slate-300">
              <span className="text-amber-400 font-bold block mb-0.5">Algorithm Note:</span>
              Mulank represents your Driver number (day vibration). Bhagyank represents your Conductor number (total destiny sum).
            </div>
          </div>

          {/* Real-time Calculation Result Display */}
          <div className={isMobile ? 'p-4 rounded-2xl bg-[#080d1c] border border-indigo-800/60 space-y-3 w-full' : 'lg:col-span-7 p-6 rounded-2xl bg-[#080d1c] border border-indigo-800/60 space-y-4'}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center">
                <span className="text-[10px] uppercase font-mono text-amber-300 font-bold block">
                  Mulank (Driver #)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-amber-400">{mulank}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block mt-1">Core Nature</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center">
                <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block">
                  Bhagyank (Destiny #)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">{bhagyank}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block mt-1">Life Path</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1 sm:pt-2">
              <div className="flex items-center justify-between py-1.5 border-b border-indigo-900/50">
                <span className="text-slate-400">Ruling Deity:</span>
                <span className="font-bold text-white">{ruler.planet}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-indigo-900/50">
                <span className="text-slate-400">Core Attributes:</span>
                <span className="font-bold text-amber-300 text-right truncate max-w-[190px]">{ruler.traits}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-indigo-900/50">
                <span className="text-slate-400">Gemstone:</span>
                <span className="font-bold text-emerald-300">{ruler.stone}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Cosmic Colors:</span>
                <span className="font-bold text-white">{ruler.color}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 27-Page Report Chapter Explorer */}
      <section className={`border-b border-indigo-950/60 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <h2 className={isMobile ? 'text-lg font-black text-white text-center mb-6' : 'text-2xl font-black text-white text-center mb-8'}>
          Inside the 27-Page Personalised Report
        </h2>

        <div className={isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-12 gap-6 items-start'}>
          <div className={isMobile ? 'space-y-2 w-full' : 'md:col-span-5 space-y-2'}>
            {CHAPTERS.map((ch) => (
              <button
                key={ch.num}
                onClick={() => setActiveChapter(ch.num)}
                className={`w-full p-3 sm:p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                  activeChapter === ch.num
                    ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                    : 'bg-[#0d142a] text-slate-300 border-indigo-900/50 hover:border-indigo-700/60'
                }`}
              >
                <span>{ch.title}</span>
                <BookOpen className="w-4 h-4 shrink-0" />
              </button>
            ))}
          </div>

          <div className={isMobile ? 'p-4 rounded-2xl bg-[#0d142a] border border-indigo-800/50 space-y-3 w-full' : 'md:col-span-7 p-6 rounded-2xl bg-[#0d142a] border border-indigo-800/50 space-y-3'}>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              Chapter Preview Summary
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {CHAPTERS.find((c) => c.num === activeChapter)?.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {CHAPTERS.find((c) => c.num === activeChapter)?.content}
            </p>

            <div className="pt-3 border-t border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Instant PDF download upon completion</span>
              <a
                href="https://mysticdigits.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>Generate Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-indigo-950/80 px-4 py-6 text-center text-xs text-slate-500">
        <p>© 2026 MysticDigits • Developed by Sindee InfoTech • Deployed Globally</p>
      </footer>
    </div>
  )
}
