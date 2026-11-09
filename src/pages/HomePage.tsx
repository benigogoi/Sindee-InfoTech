import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Layers,
  Smartphone,
  Palette,
  Sparkles,
  Compass,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  X,
  Eye,
  Check,
  Lock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
} from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects, type Project } from '@/data/projects'
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/config'
import { DemoPreviewModal } from '@/components/portfolio/DemoPreviewModal'

/**
 * Official WhatsApp SVG Icon (24x24)
 */
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.7C7.02 10.92 7.91 12.09 8.03 12.25C8.16 12.41 9.77 14.9 12.25 15.96C12.84 16.22 13.3 16.37 13.66 16.48C14.25 16.67 14.79 16.64 15.22 16.58C15.7 16.51 16.69 15.98 16.9 15.39C17.11 14.8 17.11 14.3 17.05 14.19C16.99 14.09 16.82 14.03 16.57 13.91C16.32 13.78 15.09 13.17 14.86 13.09C14.64 13 14.47 12.96 14.31 13.21C14.14 13.45 13.66 14.03 13.52 14.19C13.37 14.35 13.23 14.37 12.98 14.25C12.73 14.12 11.92 13.86 10.96 13.01C10.22 12.35 9.71 11.53 9.57 11.28C9.42 11.04 9.55 10.9 9.68 10.78C9.79 10.67 9.93 10.49 10.05 10.35C10.18 10.2 10.22 10.1 10.3 9.94C10.39 9.77 10.34 9.63 10.28 9.51C10.22 9.38 9.73 8.18 9.52 7.68C9.32 7.19 9.12 7.26 8.97 7.25C8.83 7.24 8.68 7.24 8.53 7.24V7.33Z" />
    </svg>
  )
}

/* ==========================================================================
   NEW HERO: BESPOKE E-COMMERCE CUSTOMER JOURNEY (SMOOTH, INTUITIVE & USER-FRIENDLY)
   ========================================================================== */

interface JourneyStep {
  id: number
  pill: string
  action: string
  benefit: string
  url: string
  cart: string
}

const STEP_DURATION = 5500 // 5.5s per step gives ample time to absorb

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    pill: '1. Store',
    action: 'Customer lands on bespoke digital storefront with <1s page load',
    benefit: 'Fast Luxury UX',
    url: 'atelier-noir.com',
    cart: 'Bag (0)',
  },
  {
    id: 2,
    pill: '2. Browse',
    action: 'Customer effortlessly filters audio models without page reloads',
    benefit: 'Zero-Lag Filtering',
    url: 'atelier-noir.com/catalogue',
    cart: 'Bag (0)',
  },
  {
    id: 3,
    pill: '3. Add Bag',
    action: '1-Tap Add to Bag with instant stock verification & price breakdown',
    benefit: 'High-Converting Drawer',
    url: 'atelier-noir.com/noir-1',
    cart: 'Bag (1) ● ₹24,900',
  },
  {
    id: 4,
    pill: '4. Instant Pay',
    action: 'Zero-friction 1-click UPI checkout via verified GPay / PhonePe / Paytm',
    benefit: 'Zero Drop-Off Flow',
    url: 'atelier-noir.com/checkout',
    cart: 'Bag (1) ● ₹24,900',
  },
  {
    id: 5,
    pill: '5. WhatsApp',
    action: 'Order confirmed and instant live courier dispatch link sent on WhatsApp',
    benefit: 'Post-Purchase Retention',
    url: 'atelier-noir.com/confirmed',
    cart: 'Bag (0) ✓ Paid',
  },
]

// Smooth directional slide variants to avoid abrupt cuts
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 35 : -35,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.28 },
      scale: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -35 : 35,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
    },
  }),
}

function HeroEcommerceJourneyComposition() {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

  // Continuous auto-advancing timer with smooth predictability
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
    }, STEP_DURATION)
    return () => clearInterval(timer)
  }, [isPlaying, activeStep])

  const step = JOURNEY_STEPS[activeStep]

  const handleStepSelect = (idx: number) => {
    setDirection(idx >= activeStep ? 1 : -1)
    setActiveStep(idx)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveStep((prev) => (prev === 0 ? JOURNEY_STEPS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
  }

  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Ambient Neon Backlight */}
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-lime/20 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-[70px] pointer-events-none -z-10" />

      {/* Unified High-End Device Frame */}
      <div className="relative w-full rounded-2xl bg-[#0F172A] border border-white/10 shadow-2xl overflow-hidden text-white">
        
        {/* 1. Window Header: Title, Live Status & Controls */}
        <div className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#1E293B]/90 border-b border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
            </div>
            <div className="ml-1 sm:ml-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
              <span className="font-mono text-[10px] sm:text-[10.5px] font-bold text-white tracking-wide uppercase truncate">
                Live Demo: E-Commerce Funnel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-lime/20 text-lime px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase hidden sm:inline">
              5-Step Tour
            </span>

            {/* Play/Pause & Step Navigation Controls */}
            <div className="flex items-center gap-0.5 border-l border-white/10 pl-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous step"
                className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-lime transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next step"
                className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Next step"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Story-Style Segmented Progress Bars & Step Pills */}
        <div className="px-3 sm:px-3.5 pt-1.5 pb-1 bg-[#0F172A] border-b border-white/10 space-y-1">
          {/* 5 Progress Bars with real-time linear filling */}
          <div className="grid grid-cols-5 gap-1">
            {JOURNEY_STEPS.map((s, idx) => {
              const isPast = idx < activeStep
              const isCurrent = idx === activeStep
              return (
                <div
                  key={s.id}
                  onClick={() => handleStepSelect(idx)}
                  className="h-1 bg-white/15 rounded-full overflow-hidden cursor-pointer hover:bg-white/25 transition-colors relative"
                  title={s.pill}
                >
                  {isPast ? (
                    <div className="h-full bg-lime rounded-full w-full" />
                  ) : isCurrent ? (
                    <motion.div
                      key={`prog-${activeStep}-${isPlaying}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying ? '100%' : '50%' }}
                      transition={{
                        duration: isPlaying ? 5.5 : 0.2,
                        ease: 'linear',
                      }}
                      className="h-full bg-lime rounded-full"
                    />
                  ) : (
                    <div className="h-full bg-lime rounded-full w-0" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Step Selector Pills aligned with progress bars */}
          <div className="grid grid-cols-5 gap-1 pt-0.5">
            {JOURNEY_STEPS.map((s, idx) => {
              const isActive = idx === activeStep
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleStepSelect(idx)}
                  className={`w-full py-0.5 rounded text-[9px] sm:text-[10px] font-mono transition-all flex items-center justify-center truncate cursor-pointer ${
                    isActive
                      ? 'bg-lime text-midnight font-bold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{s.pill}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Plain-English Narrative Guide Banner */}
        <div className="px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-midnight via-[#1E293B] to-midnight border-b border-white/10 flex items-center justify-between text-[10px] sm:text-[10.5px]">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0 animate-ping" />
            <span className="font-mono text-lime font-bold uppercase tracking-wider shrink-0 text-[9px] sm:text-[9.5px]">
              Stage {step.id} of 5:
            </span>
            <span className="text-white/95 font-medium truncate">{step.action}</span>
          </div>
          <span className="text-[8.5px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0 font-bold uppercase tracking-wider">
            {step.benefit}
          </span>
        </div>

        {/* 4. Simulated Browser Screen */}
        <div className="bg-[#FAF9F6] text-neutral-900">
          
          {/* Top Browser Bar + Live Cart Counter */}
          <div className="px-3 sm:px-3.5 py-1 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5">
              <Lock className="w-2.5 h-2.5 text-emerald-600" />
              <span className="text-neutral-700 bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-[9.5px] sm:text-[10px] shadow-2xs">
                {step.url}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-800">
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] transition-colors ${
                activeStep >= 2 ? 'bg-lime text-midnight font-bold shadow-xs' : 'bg-neutral-200 text-neutral-600'
              }`}>
                {step.cart}
              </span>
            </div>
          </div>

          {/* Main Stage: Compact Height (240px) to Fit in 1 Screen Above The Fold */}
          <div className="p-3 sm:p-3.5 h-[235px] sm:h-[245px] flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              {activeStep === 0 && (
                /* Step 1: Storefront Homepage */
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex items-center justify-between gap-3 relative"
                >
                  <div className="w-1/2 pr-1 space-y-1.5">
                    <div className="inline-flex items-center gap-1 bg-neutral-200/80 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-widest text-neutral-700">
                      <span>● EDITION 04 / ACOUSTIC</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                      Pure Form.<br />
                      <span className="italic font-light text-neutral-700">Precision Sound.</span>
                    </h3>
                    <p className="text-[10px] sm:text-[10.5px] text-neutral-600 leading-snug font-normal line-clamp-2">
                      Custom 40mm titanium drivers draped in French calfskin leather for pristine clarity.
                    </p>
                    <div className="pt-0.5 relative inline-block">
                      <button
                        type="button"
                        onClick={() => handleStepSelect(1)}
                        className="inline-flex items-center gap-1.5 bg-midnight text-white text-[10.5px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full hover:bg-black transition-all shadow-md group cursor-pointer"
                      >
                        <span>Explore Catalogue</span>
                        <ArrowRight className="w-3 h-3 text-lime group-hover:translate-x-1 transition-transform" />
                      </button>
                      {/* Animated Simulated Cursor Hover */}
                      <motion.div
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute -bottom-2.5 -right-6 flex items-center gap-1 bg-midnight text-lime px-1.5 py-0.2 rounded-full text-[8px] font-mono shadow-md border border-lime/40 pointer-events-none"
                      >
                        <MousePointer2 className="w-2.5 h-2.5 fill-lime text-lime" />
                        <span>Click to explore</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="w-1/2 h-full max-h-[210px] rounded-lg overflow-hidden shadow-md border-2 border-white relative shrink-0">
                    <img
                      src="/images/hero/luxury-headphones.jpg"
                      alt="Noir I Headphones on Travertine"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-midnight/80 backdrop-blur text-white px-1.5 py-0.5 rounded text-[8.5px] font-mono">
                      Noir I Studio • ₹24,900
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                /* Step 2: Pure Audio Catalogue Grid */
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex flex-col justify-between space-y-1.5 relative"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                    <div>
                      <span className="font-serif tracking-[0.15em] text-[10.5px] font-bold uppercase text-neutral-900 block">
                        ATELIER NOIR • AUDIO
                      </span>
                      <span className="text-[8.5px] text-neutral-500 font-mono">2 Handcrafted Models</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-mono">
                      <span className="px-1.5 py-0.2 bg-midnight text-white rounded font-bold">All</span>
                      <span className="px-1.5 py-0.2 bg-neutral-100 text-neutral-600 rounded">Over-Ear</span>
                      <span className="px-1.5 py-0.2 bg-neutral-100 text-neutral-600 rounded">Earbuds</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 items-center flex-1">
                    {/* Product 1: Targeted Item with Cursor */}
                    <div
                      onClick={() => handleStepSelect(2)}
                      className="bg-white p-2 rounded-lg border-2 border-lime shadow-sm relative space-y-1 cursor-pointer hover:shadow-md transition-all ring-1 ring-lime/30"
                    >
                      <div className="h-20 sm:h-22 rounded overflow-hidden bg-neutral-100 relative">
                        <img
                          src="/images/hero/luxury-headphones.jpg"
                          alt="Noir I Wireless"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-midnight text-lime text-[8px] font-mono font-bold px-1 py-0.2 rounded">
                          FLAGSHIP
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between px-0.5">
                        <div>
                          <span className="text-[10px] font-bold tracking-tight text-neutral-900 block font-serif">
                            Noir I Wireless
                          </span>
                          <span className="text-[8px] text-neutral-500 font-mono uppercase">
                            Over-Ear Studio
                          </span>
                        </div>
                        <span className="text-[10.5px] font-bold text-neutral-900 font-mono">₹24,900</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStepSelect(2)
                        }}
                        className="w-full bg-midnight text-lime text-[9px] font-mono font-bold py-1 rounded text-center flex items-center justify-center gap-1 shadow-xs hover:bg-black transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                        <span>CUSTOMER SELECTS THIS →</span>
                      </button>
                    </div>

                    {/* Product 2: Bluetooth Wireless Earbuds */}
                    <div className="bg-white p-2 rounded-lg border border-neutral-200 shadow-xs space-y-1 opacity-90">
                      <div className="h-20 sm:h-22 rounded overflow-hidden bg-neutral-100 relative">
                        <img
                          src="/images/hero/luxury-earbuds.jpg"
                          alt="Noir Pods Pro"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-neutral-200 text-neutral-700 text-[8px] font-mono font-bold px-1 py-0.2 rounded">
                          NEW
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between px-0.5">
                        <div>
                          <span className="text-[10px] font-bold tracking-tight text-neutral-900 block font-serif">
                            Noir Pods Pro
                          </span>
                          <span className="text-[8px] text-neutral-500 font-mono uppercase">
                            True Wireless
                          </span>
                        </div>
                        <span className="text-[10.5px] font-bold text-neutral-900 font-mono">₹14,900</span>
                      </div>
                      <div className="w-full bg-neutral-100 text-neutral-600 text-[9px] font-mono py-1 rounded text-center font-semibold">
                        View Specs
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                /* Step 3: Product Detail & Add to Bag */
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex items-center justify-between gap-3 relative"
                >
                  <div className="w-1/2 h-full max-h-[210px] rounded-lg overflow-hidden shadow-md border-2 border-white relative shrink-0">
                    <img
                      src="/images/hero/luxury-headphones.jpg"
                      alt="Noir I Detail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">
                      IN STOCK • READY TO SHIP
                    </div>
                  </div>

                  <div className="w-1/2 space-y-1.5">
                    <div>
                      <span className="text-[8.5px] font-mono tracking-widest uppercase font-bold text-neutral-500 block">
                        ACOUSTIC MASTER SERIES
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                        Noir I Wireless Transducer
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">₹24,900</span>
                      <span className="text-[8.5px] font-mono text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-bold">
                        Free Express Delivery
                      </span>
                    </div>

                    <p className="text-[9.5px] text-neutral-600 font-normal leading-snug line-clamp-2">
                      Active hybrid noise cancellation, custom 40mm beryllium drivers, 38h battery life with Qi charge.
                    </p>

                    <div className="grid grid-cols-3 gap-1 text-center text-[7.5px] sm:text-[8px] font-mono font-semibold text-neutral-700">
                      <div className="p-0.5 rounded bg-white border border-neutral-200">🎧 Beryllium</div>
                      <div className="p-0.5 rounded bg-white border border-neutral-200">⚡ 38h Battery</div>
                      <div className="p-0.5 rounded bg-white border border-neutral-200">🛡️ 2-Yr Warr.</div>
                    </div>

                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleStepSelect(3)}
                        className="w-full bg-midnight text-lime font-mono tracking-wider font-bold text-[10.5px] py-1.5 rounded-lg shadow-md flex items-center justify-center gap-1.5 border-2 border-lime hover:bg-black transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3 text-lime" />
                        <span>✓ 1-TAP ADDED TO BAG</span>
                      </button>
                    </div>

                    <div className="text-[8.5px] font-mono text-neutral-500 text-center tracking-wider">
                      Instant Checkout Drawer Ready →
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                /* Step 4: 1-Click Checkout & UPI Payment */
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex flex-col justify-between space-y-1.5 relative"
                >
                  <div className="bg-white p-2 rounded-lg border border-neutral-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded overflow-hidden border border-neutral-200 shrink-0">
                        <img
                          src="/images/hero/luxury-headphones.jpg"
                          alt="Summary Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-serif font-bold text-neutral-900 leading-tight">
                          Noir I Wireless Transducer
                        </div>
                        <div className="text-[8.5px] text-neutral-500 font-mono">
                          Qty: 1 • Expedited Courier (Next Day)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-neutral-900 font-mono block">₹24,900</span>
                      <span className="text-[8px] text-emerald-600 font-mono font-bold">Zero Delivery Fee</span>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg border-2 border-lime shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-900">
                      <span className="flex items-center gap-1 font-serif">
                        ⚡ Instant UPI / Apple Pay / Cards
                      </span>
                      <span className="text-[8px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                        BIOMETRIC READY
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-neutral-800 bg-neutral-50 p-1.5 rounded flex items-center justify-between border border-neutral-200">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">UPI ID:</span>
                        <span>rahul.verma@oksbi</span>
                      </div>
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[9px]">
                        <Check className="w-2.5 h-2.5" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStepSelect(4)}
                    className="w-full bg-midnight text-white font-mono tracking-wider font-bold text-[10.5px] py-2 rounded-lg shadow-md flex items-center justify-center gap-1.5 border border-lime hover:bg-black transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                    <span>AUTHORIZE &amp; PAY ₹24,900 (1-CLICK)</span>
                  </button>
                </motion.div>
              )}

              {activeStep === 4 && (
                /* Step 5: Confirmed & WhatsApp Dispatch */
                <motion.div
                  key="step-5"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex flex-col items-center justify-center text-center space-y-1.5 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-lime text-midnight flex items-center justify-center shadow-md font-extrabold text-base">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  <div>
                    <span className="text-[8.5px] font-mono tracking-widest uppercase font-bold text-neutral-500">
                      ORDER CONFIRMED • #NOIR-9204
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                      Thank you, Rahul! 🎉
                    </h3>
                    <p className="text-[10px] text-neutral-600 mt-0.5 max-w-xs">
                      Payment of <strong className="text-neutral-900 font-bold">₹24,900</strong> received. Packaging has begun at our atelier.
                    </p>
                  </div>

                  {/* WhatsApp Live Tracking Card */}
                  <div className="w-full max-w-sm bg-[#0F172A] text-white p-2 rounded-lg text-left flex items-start gap-2 shadow-lg border border-lime/40">
                    <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 font-bold text-[10px] shadow">
                      💬
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[9.5px] text-lime font-mono">WhatsApp Concierge Active</span>
                        <span className="text-[7.5px] font-mono bg-lime/20 text-lime px-1 py-0.2 rounded font-bold">SENT</span>
                      </div>
                      <p className="text-[9px] text-white/90 leading-tight">
                        "Hi Rahul! 🎧 Your Noir I Wireless is ready. Live dispatch link: <span className="text-lime underline">track.atelier-noir.com/9204</span>"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full max-w-sm pt-0.5 px-0.5">
                    <span className="text-[8.5px] font-mono text-neutral-500">
                      Automated messaging cuts support inquiries by 65%
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStepSelect(0)}
                      className="text-[8.5px] font-mono text-midnight hover:text-black font-bold underline cursor-pointer"
                    >
                      ↻ Replay Demo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 5. Bottom Micro Status & Help Strip */}
        <div className="px-3 sm:px-3.5 py-1.5 bg-[#0B0F17] border-t border-white/10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono text-white/60">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80">Sindee Infotech Digital Engine</span>
            <span className="text-white/40 hidden sm:inline">• 100% Responsive</span>
          </div>

          <span className="text-lime font-medium">
            Hover to pause • Click any step or button to test
          </span>
        </div>

      </div>
    </div>
  )
}

/* ==========================================================================
   PREVIOUS VERSION (KEPT COMMENTED OUT FOR EASY REVERT)
   ==========================================================================
function HeroMultiDeviceComposition() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-midnight/15 bg-midnight text-white">
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-midnight-light border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]/80" />
            </div>
            <div className="ml-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/70 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              sindeeinfotech.com/showcase
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-mono text-lime bg-lime/10 px-2 py-0.5 rounded-full font-semibold">
            Digital Products
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-gradient-to-br from-midnight via-midnight-light to-[#0e1726] space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-lime text-midnight font-bold flex items-center justify-center text-[10px]">
                S
              </div>
              <span className="font-bold text-xs tracking-tight text-white">
                Enterprise Cloud Platform
              </span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ● Systems Live
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] font-mono uppercase text-muted-light block">Workflows</span>
              <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">1,400+</span>
              <span className="text-[9px] text-emerald-400 font-medium">↑ Real-time</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] font-mono uppercase text-muted-light block">Uptime</span>
              <span className="text-sm sm:text-base font-bold text-lime mt-0.5 block">99.98%</span>
              <span className="text-[9px] text-white/60 font-medium">Reliable</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] font-mono uppercase text-muted-light block">Latency</span>
              <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">18ms</span>
              <span className="text-[9px] text-emerald-400 font-medium">Optimized</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-white/90">Software Architecture Throughput</span>
              <span className="font-mono text-[9px] text-muted-light">Scalable APIs</span>
            </div>
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/60 w-20 truncate">Web &amp; SaaS</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-lime rounded-full w-[95%]" />
                </div>
                <span className="text-[9px] font-mono text-lime font-bold">95%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/60 w-20 truncate">Android Apps</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[90%]" />
                </div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-1 sm:-bottom-6 sm:-right-3 md:-bottom-7 md:-right-4 w-36 sm:w-44 md:w-48 rounded-2xl p-2 bg-midnight border border-white/20 shadow-2xl backdrop-blur-xl z-20">
        <div className="w-10 sm:w-12 h-2 bg-white/10 rounded-full mx-auto mb-1.5" />
        <div className="rounded-xl bg-midnight-light p-2.5 border border-white/10 space-y-1.5 text-white">
          <div className="flex items-center justify-between text-[8px] font-mono text-muted-light pb-1 border-b border-white/10">
            <span>Android App</span>
            <span className="text-lime font-bold">5G ● Active</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-[8px] font-mono uppercase text-lime block font-semibold">Mobile Solutions</span>
            <p className="text-[10px] font-bold text-white leading-tight">Instant Sync &amp; Push</p>
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[8px] font-bold text-white">Cloud Synced</span>
            <span className="px-1.5 py-0.2 rounded-full bg-lime text-midnight text-[8px] font-bold">Verified</span>
          </div>
        </div>
      </div>
    </div>
  )
}
========================================================================== */

/* ==========================================================================
   SECTION 1: HERO (Compact Single-Viewport Fitting & Balanced Typography)
   ========================================================================== */

function HeroSection() {
  return (
    <section className="relative pt-4 pb-6 sm:pt-5 sm:pb-8 lg:py-6 xl:py-8 bg-warm-ivory border-b border-border/70 overflow-hidden lg:min-h-[calc(100vh-5rem)] lg:flex lg:items-center">
      <div className="container-main w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Headline and Positioning */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 sm:space-y-4">
            {/* Status Kicker */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-[10.5px] sm:text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse shrink-0" aria-hidden="true" />
              <span>Digital Product &amp; Software Development</span>
            </div>

            {/* Headline */}
            <h1 className="text-[1.85rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.6rem] font-extrabold text-midnight tracking-tight leading-[1.12] max-w-2xl">
              We Build Digital Products{' '}
              <br className="hidden sm:inline" />
              That Move Businesses Forward.
            </h1>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-base text-muted-dark max-w-xl leading-relaxed">
              From professional websites and custom software to Android applications, we turn business ideas into powerful digital experiences.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <Button to="/contact" variant="primary" className="py-2.5 px-5 text-xs sm:text-sm">
                Start a Project
              </Button>
              <a
                href="#our-work"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-midnight hover:text-lime-dark transition-colors"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Capabilities Summary Strip */}
            <div className="pt-3 border-t border-border/70 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[11px] sm:text-xs text-muted-dark font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Websites &amp; E-commerce</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Web &amp; Custom Software</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Android Applications</span>
              </div>
            </div>
          </div>

          {/* Right Column: E-Commerce Customer Journey Showcase */}
          <div className="lg:col-span-5 xl:col-span-5">
            <HeroEcommerceJourneyComposition />
            {/* PREVIOUS VERSION (Uncomment below to revert easily):
            <HeroMultiDeviceComposition />
            */}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 2: OUR SERVICES (4 Compact Core Service Cards)
   ========================================================================== */

function ServicesSection() {
  const coreServices = [
    {
      id: 'website-development',
      number: '01',
      title: 'Website Development',
      description:
        'Professional, responsive corporate websites, business landing pages, and e-commerce platforms engineered for growth.',
      icon: Globe,
      slug: 'website-development',
    },
    {
      id: 'custom-software',
      number: '02',
      title: 'Web & Custom Software Development',
      description:
        'Tailored web applications, SaaS platforms, internal business portals, and intelligent workflow automation systems.',
      icon: Layers,
      slug: 'web-applications',
    },
    {
      id: 'android-apps',
      number: '03',
      title: 'Android App Development',
      description:
        'Native and cross-platform Android mobile applications designed for seamless user experience and business operations.',
      icon: Smartphone,
      slug: 'android-apps',
    },
    {
      id: 'branding-marketing',
      number: '04',
      title: 'Branding & Digital Marketing',
      description:
        'Strategic visual identity, UI/UX systems, search engine optimization (SEO), and conversion-driven digital marketing.',
      icon: Palette,
      slug: 'branding-design',
    },
  ]

  return (
    <section className="bg-warm-ivory py-12 md:py-16 border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-label text-muted mb-2">Our Capabilities</p>
          <h2 className="text-heading-1 text-midnight">
            Our Services
          </h2>
          <p className="text-body text-muted-dark mt-2">
            Comprehensive digital solutions designed to help your business establish, innovate and scale online.
          </p>
        </div>

        {/* 4 Compact Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {coreServices.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-5 sm:p-6 border border-border hover:border-midnight/40 transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-midnight text-lime flex items-center justify-center group-hover:bg-lime group-hover:text-midnight transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-dark bg-warm-ivory px-2 py-0.5 rounded">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-midnight leading-snug min-h-[2.75rem] flex items-center">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-dark mt-2.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-border/70">
                  <Link
                    to={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-midnight group-hover:text-lime-dark transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 3: OUR WORK (Featured Project: MysticDigits)
   ========================================================================== */

function OurWorkSection() {
  const [selectedDemo, setSelectedDemo] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mysticDigits = projects.find((p) => p.id === 'mystic-digits') || projects[0]

  const handleOpenDemo = (p: Project) => {
    setSelectedDemo(p)
    setIsModalOpen(true)
  }

  return (
    <section id="our-work" className="bg-midnight text-white py-12 md:py-18 border-b border-white/10">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="max-w-xl">
            <p className="text-label text-lime mb-2">Featured Project</p>
            <h2 className="text-heading-1 text-white">Our Work</h2>
            <p className="text-body text-muted-light mt-2">
              Explore some of the digital experiences we&apos;ve created.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-muted-light self-start sm:self-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Live Production Website
          </span>
        </div>

        {/* Featured Live Project Card: MysticDigits */}
        <article className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-midnight-light shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Visual Column: Browser Mockup of MysticDigits */}
            <div className="lg:col-span-7 bg-[#0b1020] p-4 sm:p-7 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Browser Window Chrome */}
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
                    </div>
                    <span className="ml-2 font-mono text-white/70 text-[11px] truncate">
                      https://mysticdigits.in
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] uppercase font-bold tracking-wider">
                    ● Live Site
                  </span>
                </div>

                {/* Genuine Screenshot / Mockup */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1326] group">
                  <img
                    src={mysticDigits.image}
                    alt="MysticDigits personalised Vedic numerology report platform"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1326]/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white shadow-lg">
                      <span className="font-mono text-[9px] text-amber-300 uppercase tracking-wider block font-bold">
                        Live Web App
                      </span>
                      <span className="font-bold text-xs">27-Page Personalised Vedic Report</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-light font-mono">
                <span className="text-white/50 text-[11px] mr-1">Stack:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">Next.js</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">React</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">Automated PDF</span>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 p-5 sm:p-7 md:p-9 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Featured Project
                  </span>
                  <span className="text-muted-light text-[11px]">{mysticDigits.industry}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {mysticDigits.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-lime mt-1">
                  {mysticDigits.category}
                </p>

                <p className="text-white/85 text-sm sm:text-base mt-3.5 leading-relaxed">
                  {mysticDigits.description}
                </p>

                {/* Highlights */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-lime font-bold block">
                    Key Features
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0 mt-1.5" />
                      <span>27-page custom Vedic numerology report generator.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0 mt-1.5" />
                      <span>Mulank &amp; Bhagyank algorithmic calculation engine.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0 mt-1.5" />
                      <span>Automated digital intake and email report fulfillment.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenDemo(mysticDigits)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime text-midnight text-xs sm:text-sm font-bold hover:bg-lime-light transition-all duration-200 shadow-md cursor-pointer active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Demo</span>
                </button>

                <a
                  href={mysticDigits.url || 'https://mysticdigits.in/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all duration-200 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Regional SME Demonstrated Work Cards */}
        <div className="mt-12 md:mt-16 pt-10 md:pt-14 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
            <div>
              <p className="text-label text-lime mb-2">Regional Business Solutions</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Solutions Built for Assam &amp; Northeast SMEs
              </h3>
              <p className="text-sm text-muted-light mt-1.5 max-w-xl leading-relaxed">
                Practical, mobile-friendly websites designed for car rentals, home bakers, nature homestays, and regional clinics.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-colors self-start sm:self-end shrink-0"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 text-lime" />
            </Link>
          </div>

          {/* 4 SME Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects
              .filter((p) => p.id !== 'mystic-digits')
              .map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-white/10 bg-midnight-light/80 overflow-hidden hover:border-lime/40 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Thumbnail Image - Clicking opens demo */}
                    <div
                      onClick={() => handleOpenDemo(project)}
                      className="relative aspect-[16/10] overflow-hidden bg-[#0d1326] cursor-pointer"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-transparent opacity-80" />
                      
                      {/* Hover Quick-Preview Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-xl bg-lime text-midnight text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Launch Demo</span>
                        </span>
                      </div>

                      {project.location && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[10px] font-mono text-white/90 border border-white/10">
                          {project.location}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-lime font-bold block mb-1">
                        {project.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-lime transition-colors leading-snug">
                        {project.title}
                      </h4>
                      <p className="text-xs text-muted-light mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <div className="pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => handleOpenDemo(project)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-lime text-midnight text-xs font-bold hover:bg-lime-light transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Interactive Demo Popup Modal */}
      <DemoPreviewModal
        project={selectedDemo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

/* ==========================================================================
   SECTION 4: WHY CHOOSE US (Compact 4-Point Grid)
   ========================================================================== */

function WhyChooseUsSection() {
  const points = [
    {
      num: '01',
      title: 'Business-Focused Solutions',
      desc: 'We align engineering with your commercial goals, ensuring every digital product delivers measurable business value.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Creative & Modern Design',
      desc: 'Clean typography, thoughtful layouts and refined aesthetics create an engaging experience that earns customer trust.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Reliable Technical Execution',
      desc: 'Built on modern frameworks with clean architecture for high-speed performance, rock-solid security and reliable scale.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'End-to-End Capabilities',
      desc: 'From initial concept and UI/UX to development and launch, we manage your complete product lifecycle under one roof.',
      icon: Boxes,
    },
  ]

  return (
    <section className="bg-warm-ivory py-12 md:py-16 border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-label text-muted mb-2">Our Advantage</p>
          <h2 className="text-heading-1 text-midnight">
            Why Choose Sindee InfoTech?
          </h2>
          <p className="text-body text-muted-dark mt-2">
            We combine business understanding, design excellence and technical execution to build solutions that serve real business objectives.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {points.map((pt) => {
            const Icon = pt.icon
            return (
              <div
                key={pt.num}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-border hover:border-midnight/30 transition-all duration-200 flex flex-col justify-between hover:shadow-sm h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono text-xs font-bold text-lime-dark bg-warm-ivory px-2.5 py-1 rounded-md inline-block">
                      {pt.num}
                    </span>
                    <Icon className="w-5 h-5 text-midnight shrink-0" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-midnight mb-2 min-h-[2.5rem] flex items-center">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-muted-dark leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 5: OUR PROCESS (How We Work — 4 Steps)
   ========================================================================== */

function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your business, objectives and requirements.',
    },
    {
      step: '02',
      title: 'Design',
      desc: 'Plan the solution and create the right user experience.',
    },
    {
      step: '03',
      title: 'Develop',
      desc: 'Build, test and refine the solution.',
    },
    {
      step: '04',
      title: 'Launch',
      desc: 'Deploy the finished product and provide support where agreed.',
    },
  ]

  return (
    <section className="bg-white py-12 md:py-16 border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-label text-muted mb-2">Execution</p>
          <h2 className="text-heading-1 text-midnight">
            How We Work
          </h2>
          <p className="text-body text-muted-dark mt-2">
            A transparent four-step process turning business ideas into finished digital products.
          </p>
        </div>

        {/* 4 Steps: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-warm-ivory/60 rounded-2xl p-5 sm:p-6 border border-border flex flex-col justify-between transition-all duration-200 hover:bg-warm-ivory h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-lime-dark bg-midnight px-2.5 py-1 rounded">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-muted">
                    Step {index + 1} of 4
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-midnight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-dark leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 6: CONTACT / FINAL CTA (WhatsApp Enquiry + Contact Us)
   ========================================================================== */

function ContactSection() {
  const [showWhatsAppNotice, setShowWhatsAppNotice] = useState(false)
  const whatsappUrl = getWhatsAppUrl()
  const isConfigured = Boolean(CONTACT_CONFIG.whatsapp && whatsappUrl)

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault()
      setShowWhatsAppNotice(true)
    }
  }

  return (
    <>
      <section className="py-14 md:py-20 bg-midnight text-white relative overflow-hidden">
        <div className="container-main relative z-10 text-center max-w-2xl mx-auto">
          <span className="text-label text-lime tracking-widest uppercase">
            Start a Conversation
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Have a Project in Mind?
          </h2>

          <p className="text-body text-muted-light mt-4 leading-relaxed max-w-lg mx-auto text-sm sm:text-base">
            Let&apos;s discuss your requirements and explore how Sindee InfoTech can help bring your ideas to life.
          </p>

          {/* Two Clear Actions */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            {isConfigured ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp Enquiry</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp Enquiry</span>
              </button>
            )}

            <Button to="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Fallback Dialog for WhatsApp number awaiting config */}
      {showWhatsAppNotice && !isConfigured && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/70 backdrop-blur-sm"
          onClick={() => setShowWhatsAppNotice(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowWhatsAppNotice(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-midnight hover:bg-black/5 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-midnight">WhatsApp Enquiry</h3>
                <p className="text-xs text-muted-dark">Sindee InfoTech Support</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-dark leading-relaxed mb-5">
              Our direct WhatsApp business line is being updated. In the meantime, you can reach us immediately via our contact page or email.
            </p>

            <div className="flex gap-2.5">
              <Link
                to="/contact"
                onClick={() => setShowWhatsAppNotice(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-midnight text-white text-xs font-semibold hover:bg-midnight-light transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Go to Contact Form
              </Link>
              <button
                type="button"
                onClick={() => setShowWhatsAppNotice(false)}
                className="px-3.5 py-2 rounded-xl border border-border text-xs font-medium text-muted-dark hover:text-midnight transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ==========================================================================
   HOMEPAGE MAIN EXPORT
   ========================================================================== */

export function HomePage() {
  return (
    <PageMeta
      title="Sindee InfoTech | Website, Software & Android App Development"
      description="Sindee InfoTech builds professional websites, web applications, Android apps and custom software to help businesses grow and succeed digitally."
      canonicalUrl="https://sindeeinfotech.com/"
    >
      <HeroSection />
      <ServicesSection />
      <OurWorkSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <ContactSection />
    </PageMeta>
  )
}
