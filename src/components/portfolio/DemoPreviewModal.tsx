import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Monitor,
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react'
import type { Project } from '@/data/projects'
import { AzSelfDriveDemo } from './demos/AzSelfDriveDemo'
import { CrumbAndCoDemo } from './demos/CrumbAndCoDemo'
import { KazirangaHomestayDemo } from './demos/KazirangaHomestayDemo'
import { CarePointClinicDemo } from './demos/CarePointClinicDemo'
import { MysticDigitsDemo } from './demos/MysticDigitsDemo'
import { Link } from 'react-router-dom'
import { DeviceModeContext } from './DeviceModeContext'

interface DemoPreviewModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function DemoPreviewModal({ project, isOpen, onClose }: DemoPreviewModalProps) {
  // Device view mode: 'desktop' or 'mobile'
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop')

  // Toast notification for disabled links and demo actions
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (msg = 'Links disabled on demo') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToastMessage(msg)
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Ref and dynamic scale state for the mobile phone chassis simulator
  const canvasRef = useRef<HTMLDivElement>(null)
  const [phoneScale, setPhoneScale] = useState(1)

  // Check if user is on an actual small/mobile device screen (< 768px)
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effective mode: on small screens, always 'mobile'; on desktop, controlled by switcher
  const effectiveMode = isSmallScreen ? 'mobile' : deviceMode

  // Automatically compute scale factor so the phone chassis fits 100% inside the viewport
  // with comfortable margins all around, exactly matching the 50% zoom appearance.
  useEffect(() => {
    if (!canvasRef.current || effectiveMode !== 'mobile' || isSmallScreen) return
    const el = canvasRef.current

    const computeScale = () => {
      // Available height and width inside the modal canvas
      const availableHeight = el.clientHeight - 36 // 18px top and 18px bottom breathing margin
      const availableWidth = el.clientWidth - 36 // 18px horizontal margin
      if (availableHeight <= 0 || availableWidth <= 0) return

      const naturalHeight = 760
      const naturalWidth = 385

      const vScale = availableHeight / naturalHeight
      const hScale = availableWidth / naturalWidth

      // Scale to fit completely within the canvas; never exceed 1.0 (natural size)
      const targetScale = Math.min(1, Math.max(0.42, Math.min(vScale, hScale)))
      setPhoneScale(targetScale)
    }

    computeScale()
    const ro = new ResizeObserver(computeScale)
    ro.observe(el)
    window.addEventListener('resize', computeScale)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', computeScale)
    }
  }, [isOpen, effectiveMode, isSmallScreen])

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  // Intercept all links and simulated external action clicks inside the demo canvas
  const handleDemoClickCapture = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement

    // 1. Intercept any <a> tag inside the demo
    const link = target.closest('a')
    if (link) {
      e.preventDefault()
      e.stopPropagation()
      showToast('Links disabled on demo')
      return
    }

    // 2. Intercept simulated external buttons (WhatsApp, Booking, Pre-Order, Calling)
    const btn = target.closest('button')
    if (btn) {
      // Allow internal tab/filter/selector switches marked with data-interactive or tab roles
      if (
        btn.dataset.interactive === 'true' ||
        btn.getAttribute('role') === 'tab' ||
        btn.closest('[role="tablist"]') ||
        btn.dataset.tab
      ) {
        return
      }

      const text = (btn.textContent || '').toLowerCase()
      const isExternalAction =
        text.includes('whatsapp') ||
        text.includes('book') ||
        text.includes('reserve') ||
        text.includes('pre-order') ||
        text.includes('order') ||
        text.includes('inquire') ||
        text.includes('enquire') ||
        text.includes('call') ||
        text.includes('submit') ||
        text.includes('checkout')

      if (isExternalAction) {
        e.preventDefault()
        e.stopPropagation()
        showToast('Links disabled on demo')
        return
      }
    }
  }

  // Determine domain name to display in address bar
  const demoDomain = project.id === 'mystic-digits'
    ? 'mysticdigits.in'
    : `${project.slug}.sindeeinfotech.com`

  const renderDemoContent = () => {
    switch (project.id) {
      case 'az-self-drive':
        return <AzSelfDriveDemo />
      case 'crumb-and-co':
        return <CrumbAndCoDemo />
      case 'kaziranga-homestay':
        return <KazirangaHomestayDemo />
      case 'carepoint-clinic':
        return <CarePointClinicDemo />
      case 'mystic-digits':
        return <MysticDigitsDemo />
      default:
        return (
          <div className="p-12 text-center text-white">
            <h3 className="text-xl font-bold">Interactive Demo Loading...</h3>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-3 lg:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full h-full md:h-[94vh] max-w-7xl bg-[#090d16] border border-white/15 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar / Chrome Frame */}
          <div className="shrink-0 bg-[#0d1322] border-b border-white/10 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
            {/* Left: Project identity & Window dots */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Fake Mac / Window dots */}
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Title & Industry badge */}
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-xs sm:text-sm text-white truncate">
                  {project.title}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-lime-400/20 text-lime-300 border border-lime-400/30 shrink-0">
                  Interactive Demo
                </span>
              </div>
            </div>

            {/* Center: Device Switcher (Desktop only) */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 shrink-0">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-lime text-midnight shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-lime text-midnight shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View (390px)</span>
              </button>
            </div>

            {/* Right: Simulated URL & Close Button */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono text-white/50 max-w-[220px] truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">https://{demoDomain}</span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close interactive demo modal"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prominent Demo Notice Banner (Visible at a Glance) */}
          <div className="shrink-0 bg-gradient-to-r from-emerald-950/70 via-[#101827] to-emerald-950/70 border-b border-lime/25 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center gap-2 text-center text-white/90">
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime shrink-0 hidden sm:inline-block" />
            <p className="leading-snug max-w-4xl text-[11px] sm:text-xs">
              <span className="font-bold text-lime uppercase tracking-wider text-[10px] sm:text-[11px] mr-1.5 px-1.5 py-0.5 rounded bg-lime/10 border border-lime/30 inline-block font-mono">
                Demo Notice
              </span>
              Of course, your real website will feature your full product catalogue, authentic business photography, real-time booking integrations, and complete custom features. This interactive demo gives a quick glance of what your business presence could become.
            </p>
          </div>

          {/* Modal Main Body (Scrollable Demo Canvas) with Click Interceptor */}
          <DeviceModeContext.Provider value={effectiveMode}>
            <div
              ref={canvasRef}
              onClickCapture={handleDemoClickCapture}
              className={`flex-1 min-h-0 relative ${
                effectiveMode === 'desktop' || isSmallScreen
                  ? 'overflow-y-auto bg-[#070b12]'
                  : 'overflow-hidden flex items-center justify-center bg-[#05080f]/95 p-2 sm:p-4'
              }`}
            >
              {effectiveMode === 'desktop' ? (
                // Desktop View: Full-width canvas with vertical scroll
                <div className="w-full min-h-full pb-16">
                  {renderDemoContent()}
                </div>
              ) : isSmallScreen ? (
                // Real Mobile Screen: Native full-width mobile view (no frame wrapper)
                <div className="w-full min-h-full pb-16">
                  {renderDemoContent()}
                </div>
              ) : (
                // Desktop View in Mobile Mode: Centered, Proportional iPhone 16 Pro Mockup Chassis
                // Automatically scaled to fit completely within the modal viewport on ANY screen height!
                <div
                  style={{
                    width: `${385 * phoneScale}px`,
                    height: `${760 * phoneScale}px`,
                  }}
                  className="relative flex items-center justify-center shrink-0 my-auto select-none transition-all duration-150"
                >
                  <div
                    style={{
                      width: '385px',
                      height: '760px',
                      transform: `scale(${phoneScale})`,
                      transformOrigin: 'top left',
                    }}
                    className="absolute top-0 left-0 bg-[#1c2130] rounded-[50px] p-[10px] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.14)] flex flex-col ring-1 ring-white/10"
                  >
                    {/* Simulated Hardware Side Buttons */}
                    <div className="absolute -left-[13px] top-[105px] w-[3px] h-[26px] bg-slate-600 rounded-l-sm" />
                    <div className="absolute -left-[13px] top-[148px] w-[3px] h-[48px] bg-slate-600 rounded-l-sm" />
                    <div className="absolute -left-[13px] top-[208px] w-[3px] h-[48px] bg-slate-600 rounded-l-sm" />
                    <div className="absolute -right-[13px] top-[158px] w-[3px] h-[72px] bg-slate-600 rounded-r-sm" />

                    {/* Inner Screen Bezel */}
                    <div className="relative w-full h-full bg-[#0a0e17] rounded-[40px] overflow-hidden flex flex-col shadow-inner select-text">
                      {/* Top Status Bar & Dynamic Island */}
                      <div className="bg-black/95 pt-3 pb-2 px-6 flex items-center justify-between text-[11px] font-mono text-white/90 shrink-0 select-none z-30">
                        <span className="font-semibold text-xs tracking-tight">9:41</span>
                        {/* Dynamic Island Pill */}
                        <div className="w-24 h-5 bg-[#12141a] rounded-full flex items-center justify-between px-2.5 shadow-inner border border-white/5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1e2230] flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-[#0d101a]" />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#182a4d]/60" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span>5G</span>
                          <div className="w-5 h-2.5 border border-white/80 rounded-xs p-0.5 flex items-center">
                            <div className="w-full h-full bg-white rounded-2xs" />
                          </div>
                        </div>
                      </div>

                      {/* Phone Screen Scrollable Area */}
                      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative bg-[#0a0e17]">
                        {renderDemoContent()}
                      </div>

                      {/* Phone Home Indicator Bar */}
                      <div className="bg-black/95 py-2.5 flex justify-center shrink-0 z-30 select-none">
                        <span className="w-32 h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Toast Notification when a link or action is clicked */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 max-w-[90vw]"
                  >
                    <div className="px-4 py-2.5 rounded-xl bg-[#0d1322]/95 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-lime/40 backdrop-blur-md flex items-center gap-2.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-lime shrink-0" />
                      <span>{toastMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DeviceModeContext.Provider>

          {/* Sticky Bottom Bar CTA for Sindee InfoTech */}
          <div className="shrink-0 bg-[#0d1322] border-t border-white/10 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/80">
              <Sparkles className="w-4 h-4 text-lime shrink-0" />
              <span>
                Want a fast, high-converting one-page website like this for your business?
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-lime text-midnight font-bold hover:bg-lime-light transition-all shadow-md active:scale-95 text-xs cursor-pointer"
              >
                <span>Get a Site Like This</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
