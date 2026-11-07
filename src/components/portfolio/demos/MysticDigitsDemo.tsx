import { useState } from 'react'
import {
  Sparkles,
  Calendar,
  User,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

// Real Mandala / Yantra SVG matching LifeScript/src/components/Mandala.tsx
function Mandala({ className }: { className?: string }) {
  const rings = [220, 180, 140]
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 360) / 12)

  return (
    <svg
      className={className}
      viewBox="0 0 440 440"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.55">
        {rings.map((r) => (
          <circle key={r} cx="220" cy="220" r={r} />
        ))}
        {spokes.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x = 220 + 220 * Math.sin(rad)
          const y = 220 - 220 * Math.cos(rad)
          return <line key={deg} x1="220" y1="220" x2={x} y2={y} />
        })}
      </g>
      <g stroke="currentColor" strokeWidth="1">
        <polygon points="220,80 339,290 101,290" opacity="0.7" />
        <polygon points="220,360 101,150 339,150" opacity="0.7" />
      </g>
      <circle cx="220" cy="220" r="44" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="220" cy="220" r="3.5" fill="currentColor" stroke="none" />
      {spokes.map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x = 220 + 220 * Math.sin(rad)
        const y = 220 - 220 * Math.cos(rad)
        return (
          <circle
            key={`dot-${deg}`}
            cx={x}
            cy={y}
            r="2.2"
            fill="currentColor"
            stroke="none"
            opacity="0.8"
          />
        )
      })}
    </svg>
  )
}

function ShieldCheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 9.5" />
    </svg>
  )
}

function SparkleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5 14 12l-2 3.5L10 12z" />
    </svg>
  )
}

function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

const PLANETARY_RULERS: Record<
  number,
  {
    planet: string
    traits: string
    color: string
    stone: string
    mantra: string
    day: string
  }
> = {
  1: {
    planet: 'Surya (Sun)',
    traits: 'Natural Leadership, Visionary Will, Executive Ambition',
    color: 'Gold, Copper, Crimson Red',
    stone: 'Ruby (Manik)',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namaha',
    day: 'Sunday',
  },
  2: {
    planet: 'Chandra (Moon)',
    traits: 'Intuitive Empathy, Emotional Depth, Harmonious Diplomacy',
    color: 'Pure White, Silver, Cream',
    stone: 'Natural Pearl (Moti)',
    mantra: 'Om Shram Shreem Shroum Sah Chandraya Namaha',
    day: 'Monday',
  },
  3: {
    planet: 'Guru (Jupiter)',
    traits: 'Wisdom, Higher Philosophy, Optimism & Scholarly Influence',
    color: 'Saffron Yellow, Amber, Gold',
    stone: 'Yellow Sapphire (Pukhraj)',
    mantra: 'Om Gram Greem Groum Sah Gurave Namaha',
    day: 'Thursday',
  },
  4: {
    planet: 'Rahu (North Node)',
    traits: 'Unconventional Strategy, Breakthrough Innovation, Technological Edge',
    color: 'Electric Blue, Smoky Charcoal',
    stone: 'Hessonite Garnet (Gomed)',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namaha',
    day: 'Saturday',
  },
  5: {
    planet: 'Budha (Mercury)',
    traits: 'Analytical Commerce, Fluid Communication, Rapid Versatility',
    color: 'Emerald Green, Turquoise',
    stone: 'Natural Emerald (Panna)',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namaha',
    day: 'Wednesday',
  },
  6: {
    planet: 'Shukra (Venus)',
    traits: 'Creative Aesthetics, Luxury, Grace, Harmony & Magnetic Charm',
    color: 'Diamond White, Soft Pastels',
    stone: 'Diamond or White Zircon',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namaha',
    day: 'Friday',
  },
  7: {
    planet: 'Ketu (South Node)',
    traits: 'Spiritual Mysticism, Analytical Research, Deep Introspection',
    color: 'Smoky Grey, Earthy Moss',
    stone: "Cat's Eye (Lehsuniya)",
    mantra: 'Om Sram Sreem Sroum Sah Ketave Namaha',
    day: 'Tuesday',
  },
  8: {
    planet: 'Shani (Saturn)',
    traits: 'Perseverance, Karmic Mastery, Strategic Long-term Construction',
    color: 'Midnight Navy, Slate, Steel',
    stone: 'Blue Sapphire (Neelam)',
    mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namaha',
    day: 'Saturday',
  },
  9: {
    planet: 'Mangal (Mars)',
    traits: 'Dynamic Courage, Protective Passion, Pioneering Drive',
    color: 'Blood Coral Red, Crimson',
    stone: 'Red Coral (Moonga)',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namaha',
    day: 'Tuesday',
  },
}

const REPORT_CHAPTERS = [
  { n: '01', t: 'Mulank (Birth Driver)', d: 'The single-digit vibration of the day you were born — your instincts, personality, and internal engine.' },
  { n: '02', t: 'Bhagyank (Destiny Number)', d: 'The conductor number drawn from your full birth date — the karmic direction your life consistently pulls toward.' },
  { n: '03', t: 'Lo Shu Energy Matrix', d: 'Your 3×3 elemental grid plotting mental, emotional, and practical planes, including missing numbers.' },
  { n: '04', t: 'Chaldean Name Analysis', d: 'The vibrational balance between your birth name and destiny number, with alignment recommendations.' },
  { n: '05', t: 'Year Ahead Forecast', d: 'Month-by-month personal astrological cycle roadmap for career, relationships, and financial timing.' },
  { n: '06', t: 'The Year After', d: 'What the upcoming cycle holds and how to strategically prepare your investments and goals.' },
  { n: '07', t: 'Auspicious Elements', d: 'Your personal favorable colors, lucky days of the week, ruling gemstones, metal, and auspicious compass direction.' },
  { n: '08', t: 'Vedic Planetary Remedies', d: 'Simple, authentic daily remedies and behavioral adjustments aligned with your primary ruling planet.' },
  { n: '09', t: 'Sacred Sanskrit Mantra', d: 'A targeted Vedic mantra chosen specifically to activate weak planes and stabilize planetary energies.' },
  { n: '10', t: 'Closing Blessing & Guidance', d: 'A reflective synthesis unifying your reading into an actionable roadmap for daily life.' },
]

const SAMPLE_PAGES = [
  {
    id: 'cover',
    title: 'Cover Page',
    src: '/images/portfolio/demos/mystic-digits/sample-cover.webp',
    desc: 'Bespoke cover featuring your name rendered in gold foil Vedic calligraphy.',
  },
  {
    id: 'loshu',
    title: 'Lo Shu Matrix',
    src: '/images/portfolio/demos/mystic-digits/sample-loshu.webp',
    desc: 'Your natal 3×3 grid displaying active elemental arrows and missing numbers.',
  },
  {
    id: 'lucky',
    title: 'Lucky Elements',
    src: '/images/portfolio/demos/mystic-digits/sample-lucky.webp',
    desc: 'Vedic gemstones, ruling deities, metals, colors, and direction of prosperity.',
  },
  {
    id: 'months',
    title: 'Year Ahead',
    src: '/images/portfolio/demos/mystic-digits/sample27-months.webp',
    desc: 'Month-by-month strategic timing roadmap across your 9-year personal cycle.',
  },
  {
    id: 'money',
    title: 'Financial Alignment',
    src: '/images/portfolio/demos/mystic-digits/sample27-money.webp',
    desc: 'Wealth vibrations, business partnerships, and career timing indicators.',
  },
]

const FAQS = [
  {
    q: 'How is your numerology report calculated?',
    a: 'Everything is derived from two sacred inputs: your full name and your complete date of birth. Your Mulank comes from the day you were born, reduced to a single digit. Your Bhagyank comes from your full date of birth (day, month, and year) added together and reduced. Your Lo Shu grid plots every digit into a 3×3 Vedic matrix revealing innate strengths and elemental imbalances.',
  },
  {
    q: 'What is the difference between Mulank and Bhagyank?',
    a: 'Mulank is your driver number — it governs your temperament, instinctive reactions, and how you engage with the world day-to-day. Bhagyank is your destiny number, governing where life guides you over time regardless of temporary moods. A complete Vedic reading interprets both together.',
  },
  {
    q: 'Is this Indian Vedic numerology or Western numerology?',
    a: 'This is authentic Indian Vedic numerology based on the Chaldean-Vedic system used across India for millennia — incorporating Mulank, Bhagyank, planetary rulers, and Vedic remedies, rather than the Western Pythagorean system.',
  },
  {
    q: 'How much does the report cost and when is it delivered?',
    a: 'The complete 27-page report is ₹249 with zero recurring fees or subscriptions. It is generated through an automated pipeline and delivered directly to your inbox as a high-resolution PDF within 24 hours.',
  },
]

export function MysticDigitsDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [userName, setUserName] = useState<string>('Siddhartha')
  const [birthDate, setBirthDate] = useState<string>('1994-08-15')
  const [activeSample, setActiveSample] = useState<number>(0)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

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
  const ruler = PLANETARY_RULERS[mulank] || PLANETARY_RULERS[6]

  // Count digit occurrences in birthDate for Lo Shu Grid
  const dateDigits = birthDate.replace(/\D/g, '')
  const getDigitCount = (d: number): number => {
    return dateDigits.split('').filter((char) => char === String(d)).length
  }

  // Traditional Lo Shu grid positions:
  // 4  9  2  (Mental Plane)
  // 3  5  7  (Emotional Plane)
  // 8  1  6  (Practical Plane)
  const loShuLayout = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ]

  const scrollToCalculator = () => {
    const el = document.getElementById('vedic-calculator')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#05050a] text-[#e8e8f0] font-sans antialiased selection:bg-[#c9a84c] selection:text-black min-h-screen">
      {/* 1. Production Platform Ribbon */}
      <div
        className={`bg-[#0d0d14] border-b border-[#c9a84c]/20 text-[#c9a84c] text-center font-mono font-semibold tracking-wide flex items-center justify-center gap-2 px-3 ${
          isMobile ? 'py-1.5 text-[10px]' : 'py-2 text-[11px]'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#e6c766] shrink-0" />
        <span className="truncate">
          {isMobile
            ? 'LIVE APP: 14,000+ Reports Delivered • mysticdigits.in'
            : 'LIVE PRODUCTION APP: 14,000+ Automated Vedic Numerology Reports Delivered Worldwide • mysticdigits.in'}
        </span>
      </div>

      {/* 2. Authentic Site Header */}
      <header className="border-b border-[#c9a84c]/15 bg-[#05050a]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/portfolio/mystic-digits-logo.png"
            alt="Mystic Digits"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        <nav className="flex items-center gap-4 sm:gap-7">
          <button
            type="button"
            onClick={scrollToCalculator}
            className="text-xs sm:text-sm text-[#9a9ab0] hover:text-[#e6c766] transition-colors cursor-pointer hidden md:inline-block"
          >
            Free Mulank Calculator
          </button>
          <button
            type="button"
            onClick={scrollToCalculator}
            className="text-xs sm:text-sm text-[#9a9ab0] hover:text-[#e6c766] transition-colors cursor-pointer hidden sm:inline-block"
          >
            About
          </button>
          <button
            type="button"
            onClick={scrollToCalculator}
            className="text-xs sm:text-sm text-[#9a9ab0] hover:text-[#e6c766] transition-colors cursor-pointer hidden sm:inline-block"
          >
            FAQ
          </button>

          <button
            type="button"
            onClick={scrollToCalculator}
            className="px-4 py-2 sm:px-5 sm:py-2 rounded text-[11px] sm:text-xs font-['Marcellus',serif] font-bold tracking-widest text-[#0d0d12] bg-gradient-to-b from-[#e6c766] to-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_28px_rgba(201,168,76,0.5)] transition-all cursor-pointer uppercase shrink-0"
          >
            Get My Report
          </button>
        </nav>
      </header>

      {/* 3. Hero Section (Pixel-Accurate to Live Site) */}
      <section className="relative text-center overflow-hidden px-4 pt-12 pb-16 sm:pt-20 sm:pb-24 flex flex-col items-center">
        {/* Warm central radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] max-w-[140vw] pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(circle, rgba(201, 168, 76, 0.20) 0%, rgba(224, 90, 78, 0.06) 42%, transparent 70%)',
          }}
        />

        {/* Slowly rotating decorative Mandala Yantra */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] max-w-[120vw] text-[#c9a84c] opacity-30 pointer-events-none z-0 animate-[spin_160s_linear_infinite]">
          <Mandala className="w-full h-full" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {/* Eyebrow */}
          <div className="font-['Marcellus',serif] tracking-[4px] text-[11px] sm:text-xs text-[#c9a84c] uppercase opacity-90 font-medium">
            Indian &bull; Vedic Numerology
          </div>

          {/* Main Display Headline */}
          <h1 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08] tracking-tight">
            Your life, written in{' '}
            <em className="italic text-[#e6c766] not-italic font-normal">
              numbers.
            </em>
            <span className="block font-['Marcellus',serif] text-xs sm:text-sm md:text-base font-normal tracking-[3px] text-[#c9a84c] uppercase mt-3 opacity-95">
              Personalised Indian Numerology Report
            </span>
          </h1>

          {/* Lede Description */}
          <p className="text-xs sm:text-base text-[#9a9ab0] max-w-xl mx-auto leading-relaxed pt-2">
            A beautiful 27-page numerology report, prepared uniquely from your
            name and date of birth &mdash; your Mulank, Bhagyank, Lo Shu grid,
            the year ahead, and your personal Vedic remedies. Delivered to your
            inbox.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded text-xs sm:text-sm font-['Marcellus',serif] font-bold tracking-[2.5px] text-[#0d0d12] bg-gradient-to-b from-[#e6c766] to-[#c9a84c] shadow-[0_0_32px_rgba(201,168,76,0.35)] hover:shadow-[0_0_42px_rgba(201,168,76,0.55)] hover:-translate-y-0.5 transition-all cursor-pointer uppercase"
            >
              Get My Report
            </button>
          </div>

          {/* Price Note */}
          <div className="text-xs text-[#9a9ab0] font-sans">
            Just{' '}
            <strong className="font-['Cormorant_Garamond',serif] text-[#e6c766] text-lg font-bold">
              ₹249
            </strong>{' '}
            &bull; delivered within 24 hours
          </div>

          {/* Calculator Explanatory Note */}
          <p className="text-xs sm:text-sm text-[#9a9ab0] max-w-lg mx-auto leading-relaxed pt-3">
            Curious what your numbers say before you order? Find your Mulank
            &mdash; your birth number &mdash; and your Bhagyank, the destiny
            number, in seconds with our free calculator. When you&apos;re ready,
            your full numerology report reads them together, deeply and
            personally.
          </p>

          {/* Secondary Ghost CTA */}
          <div className="pt-1">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 text-[11px] sm:text-xs font-['Marcellus',serif] tracking-[2px] uppercase transition-colors cursor-pointer"
            >
              <span>Try the Free Mulank Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Row Badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 pt-6 border-t border-[#c9a84c]/15 text-xs text-[#9a9ab0]">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-[#c9a84c]" />
              <span>Calculated from real Vedic numerology</span>
            </div>
            <div className="flex items-center gap-2">
              <SparkleIcon className="w-4 h-4 text-[#c9a84c]" />
              <span>Free instant preview, no signup</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-[#c9a84c]" />
              <span>Delivered within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Live Vedic Calculator Section */}
      <section
        id="vedic-calculator"
        className="px-4 py-12 sm:py-16 max-w-5xl mx-auto border-t border-[#c9a84c]/20"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-['Marcellus',serif] text-xs text-[#c9a84c] tracking-[3px] uppercase block mb-2 font-bold">
            Interactive Live Calculator
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl text-white font-normal">
            Calculate Your Sacred Vedic Numbers
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9ab0] mt-2 leading-relaxed">
            Enter any name and date of birth to instantly compute authentic
            Mulank, Bhagyank, and your 3×3 Lo Shu Energy Matrix.
          </p>
        </div>

        {/* Input Controls */}
        <div className="bg-[#0e0e18] border border-[#c9a84c]/30 rounded-2xl p-6 sm:p-8 shadow-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-['Marcellus',serif] uppercase tracking-wider text-[#c9a84c] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Siddhartha Sharma"
                className="w-full bg-[#151524] border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#e6c766] transition-colors font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-['Marcellus',serif] uppercase tracking-wider text-[#c9a84c] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-[#151524] border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e6c766] transition-colors font-mono cursor-pointer"
              />
            </div>
          </div>

          {/* Output Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: Driver & Conductor Badges */}
            <div className="md:col-span-6 space-y-4">
              {/* Mulank Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#18182c] to-[#121220] border border-[#c9a84c]/40 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#c9a84c] uppercase font-bold block">
                      Driver Number &bull; Personality
                    </span>
                    <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-white mt-1">
                      Mulank {mulank} &mdash; {ruler.planet}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 border border-[#c9a84c]/40 flex items-center justify-center font-['Cormorant_Garamond',serif] text-2xl font-black text-[#e6c766] shrink-0">
                    {mulank}
                  </div>
                </div>
                <p className="text-xs text-[#9a9ab0] mt-3 leading-relaxed">
                  {ruler.traits}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-mono">Gemstone</span>
                    <span className="text-white font-semibold">{ruler.stone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">Auspicious Colors</span>
                    <span className="text-white font-semibold">{ruler.color}</span>
                  </div>
                </div>
              </div>

              {/* Bhagyank Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#18182c] to-[#121220] border border-[#c9a84c]/40 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#c9a84c] uppercase font-bold block">
                      Conductor Number &bull; Life Destiny
                    </span>
                    <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-white mt-1">
                      Bhagyank {bhagyank}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 border border-[#c9a84c]/40 flex items-center justify-center font-['Cormorant_Garamond',serif] text-2xl font-black text-[#e6c766] shrink-0">
                    {bhagyank}
                  </div>
                </div>
                <p className="text-xs text-[#9a9ab0] mt-3 leading-relaxed">
                  Governs your macro destiny, karmic life direction, career
                  pulls, and major transitions across your 9-year cycles.
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 text-[11px] flex justify-between">
                  <span className="text-slate-400 font-mono">Ruling Day</span>
                  <span className="text-[#e6c766] font-semibold">{ruler.day}</span>
                </div>
              </div>
            </div>

            {/* Right: 3x3 Lo Shu Matrix */}
            <div className="md:col-span-6 p-5 rounded-xl bg-[#121220] border border-[#c9a84c]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#c9a84c] uppercase font-bold">
                    Vedic Lo Shu 3×3 Grid
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Natal Matrix
                  </span>
                </div>

                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto my-3">
                  {loShuLayout.map((row, rIdx) =>
                    row.map((digit) => {
                      const count = getDigitCount(digit)
                      const isPresent = count > 0
                      return (
                        <div
                          key={`loshu-${rIdx}-${digit}`}
                          className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                            isPresent
                              ? 'bg-[#c9a84c]/20 border-[#e6c766] text-[#e6c766] shadow-[0_0_12px_rgba(201,168,76,0.3)]'
                              : 'bg-[#181828]/50 border-white/5 text-slate-600'
                          }`}
                        >
                          <span className="text-xl font-['Cormorant_Garamond',serif] font-bold">
                            {digit}
                          </span>
                          <span className="text-[9px] font-mono">
                            {isPresent ? `${count}x` : '—'}
                          </span>
                        </div>
                      )
                    }),
                  )}
                </div>

                <div className="space-y-1 text-[11px] text-[#9a9ab0] mt-3 pt-3 border-t border-white/10 text-center font-mono">
                  <p>Row 1: Mental Plane (4-9-2)</p>
                  <p>Row 2: Emotional Plane (3-5-7)</p>
                  <p>Row 3: Practical Action Plane (8-1-6)</p>
                </div>
              </div>

              <div className="pt-3 text-center">
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  &bull; Included in your 27-Page Custom Reading
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Authentic Sample Pages Preview Carousel */}
      <section className="px-4 py-12 max-w-5xl mx-auto border-t border-[#c9a84c]/20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-['Marcellus',serif] text-xs text-[#c9a84c] tracking-[3px] uppercase block mb-1 font-bold">
            Actual Report Pages
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl text-white font-normal">
            Take a Look Inside the 27-Page Report
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9ab0] mt-2">
            Every page is custom-typeset from your individual Vedic charts.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-6">
          {SAMPLE_PAGES.map((sample, idx) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => setActiveSample(idx)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-['Marcellus',serif] tracking-wider transition-all cursor-pointer ${
                activeSample === idx
                  ? 'bg-gradient-to-b from-[#e6c766] to-[#c9a84c] text-[#0d0d12] font-bold shadow-md'
                  : 'bg-[#151522] border border-[#c9a84c]/20 text-[#9a9ab0] hover:text-white'
              }`}
            >
              {sample.title}
            </button>
          ))}
        </div>

        {/* Selected Sample Image Display */}
        <div className="bg-[#0e0e18] border border-[#c9a84c]/30 rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto shadow-2xl">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl max-w-md mx-auto aspect-[3/4] bg-black">
            <img
              src={SAMPLE_PAGES[activeSample].src}
              alt={SAMPLE_PAGES[activeSample].title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <h4 className="font-['Cormorant_Garamond',serif] text-lg font-bold text-white">
              {SAMPLE_PAGES[activeSample].title}
            </h4>
            <p className="text-xs text-[#9a9ab0] mt-1 max-w-md mx-auto">
              {SAMPLE_PAGES[activeSample].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 6. The 10 Report Chapters Grid */}
      <section className="px-4 py-12 max-w-5xl mx-auto border-t border-[#c9a84c]/20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-['Marcellus',serif] text-xs text-[#c9a84c] tracking-[3px] uppercase block mb-1 font-bold">
            Comprehensive Analysis
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl text-white font-normal">
            What You Receive in Your 27-Page Report
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REPORT_CHAPTERS.map((ch) => (
            <div
              key={ch.n}
              className="p-5 rounded-xl bg-[#0f0f1c] border border-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-['Cormorant_Garamond',serif] text-xl font-black text-[#e6c766]">
                  {ch.n}
                </span>
                <h3 className="font-['Marcellus',serif] text-sm text-white font-bold">
                  {ch.t}
                </h3>
              </div>
              <p className="text-xs text-[#9a9ab0] leading-relaxed pl-7">
                {ch.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Authentic FAQs Accordion */}
      <section className="px-4 py-12 max-w-3xl mx-auto border-t border-[#c9a84c]/20">
        <div className="text-center mb-8">
          <span className="font-['Marcellus',serif] text-xs text-[#c9a84c] tracking-[3px] uppercase block mb-1 font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl text-white font-normal">
            Vedic Calculation Clarity
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#c9a84c]/20 bg-[#0e0e18] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm text-white font-semibold hover:text-[#e6c766] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#c9a84c] transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 text-xs text-[#9a9ab0] leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final Order CTA */}
      <section className="px-4 py-12 max-w-3xl mx-auto text-center border-t border-[#c9a84c]/20">
        <div className="bg-gradient-to-b from-[#181828] to-[#0f0f1a] border border-[#c9a84c]/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
            Instant 24-Hour Digital Handover
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl text-white font-normal">
            Ready to Read What Your Numbers Say?
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9ab0] max-w-md mx-auto leading-relaxed">
            Order your complete 27-page personalised PDF report prepared from
            your birth chart and name vibration.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded text-xs sm:text-sm font-['Marcellus',serif] font-bold tracking-[2px] text-[#0d0d12] bg-gradient-to-b from-[#e6c766] to-[#c9a84c] shadow-[0_0_28px_rgba(201,168,76,0.35)] hover:shadow-[0_0_40px_rgba(201,168,76,0.55)] transition-all cursor-pointer uppercase"
            >
              <span>Order Your Report &bull; ₹249</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-400 font-mono">
            <span>&bull; Razorpay Secure Payment</span>
            <span>&bull; PDF Delivered to Email</span>
          </div>
        </div>
      </section>

      {/* 9. Authentic Footer */}
      <footer className="border-t border-[#c9a84c]/20 px-4 py-8 text-center text-xs text-[#9a9ab0] space-y-2">
        <p className="font-['Marcellus',serif] tracking-wider text-white">
          MYSTICDIGITS &bull; Indian Vedic Numerology Platform
        </p>
        <p className="text-[10px] text-slate-500 max-w-xl mx-auto leading-relaxed">
          Numerology provides introspective philosophical perspectives based on
          ancient Indian Chaldean-Vedic mathematical traditions. All
          calculations and automated PDF reports are for personal guidance.
        </p>
        <p className="text-[10px] text-slate-600 font-mono pt-2">
          &copy; 2026 Mystic Digits &bull; Developed &amp; Engineered by Sindee
          Infotech
        </p>
      </footer>
    </div>
  )
}
