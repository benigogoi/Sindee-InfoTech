import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, ArrowUpRight, Utensils, Car, Stethoscope, Compass } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { projects } from '@/data/projects'

/* ==========================================================================
   HERO INTERACTIVE VIEWPORT (Manual concept switcher, zero fake functionality)
   ========================================================================== */

interface HeroPreviewTab {
  id: string
  label: string
  industry: string
  title: string
  url: string
  image: string
  conceptBadge: string
  conceptDetail: string
}

const heroPreviewTabs: HeroPreviewTab[] = [
  {
    id: 'dining',
    label: 'Dining',
    industry: 'Hospitality',
    title: 'The Table — Contemporary Bistronomy',
    url: 'thetable.in',
    image: '/images/hero/hero-food.jpg',
    conceptBadge: 'Concept Interface',
    conceptDetail: 'Seasonal tasting menu layout & table reservation flow',
  },
  {
    id: 'resort',
    label: 'Resort',
    industry: 'Boutique Travel',
    title: 'The Grand Retreat — Forest Sanctuary',
    url: 'grandretreat.com',
    image: '/images/hero/hero-resort.jpg',
    conceptBadge: 'Concept Interface',
    conceptDetail: 'Private villa showcase & experiential reservation layout',
  },
  {
    id: 'fleet',
    label: 'Automotive',
    industry: 'Car Rental',
    title: 'A-Z Self Drive — Premium Fleet Portal',
    url: 'azselfdrive.com',
    image: '/images/hero/hero-car.jpg',
    conceptBadge: 'Concept Interface',
    conceptDetail: 'Automotive fleet catalog & vehicle booking architecture',
  },
]

function HeroViewport() {
  const [activeTab, setActiveTab] = useState<string>('dining')
  const current = heroPreviewTabs.find((t) => t.id === activeTab) || heroPreviewTabs[0]

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-midnight/15 bg-midnight text-white">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-midnight-light border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]/80" />
          </div>
          <div className="ml-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
            https://{current.url}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-mono text-lime bg-lime/10 px-2.5 py-0.5 rounded-full">
          Design Concept
        </span>
      </div>

      {/* Screen Canvas */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-midnight">
        <img
          key={current.id}
          src={current.image}
          alt={`${current.title} - ${current.conceptDetail}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="eager"
        />
        {/* Subtle Dark Vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none" />

        {/* Viewport Concept Meta Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 pointer-events-none">
          <div className="bg-midnight/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 max-w-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-lime block mb-1">
              {current.industry} • {current.conceptBadge}
            </span>
            <p className="text-sm font-bold text-white leading-snug">
              {current.title}
            </p>
            <p className="text-[11px] text-white/70 mt-1">
              {current.conceptDetail}
            </p>
          </div>
        </div>
      </div>

      {/* Concept Switcher Controls (Manual, Accessible) */}
      <div className="px-4 py-3 bg-midnight-light border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-muted-light">
          Switch Design Concept:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto" role="tablist" aria-label="Hero Concept Previews">
          {heroPreviewTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-label={`Show ${tab.label} website concept`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-lime text-midnight font-semibold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   SECTION 1: HERO
   ========================================================================== */

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-warm-ivory border-b border-border/70 overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Headline and Positioning */}
          <div className="lg:col-span-6 space-y-6 md:space-y-7">
            {/* Agency Status Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" aria-hidden="true" />
              Specialist Web Design & Development Agency
            </div>

            {/* Approved Headline */}
            <h1 className="text-display text-midnight tracking-tight max-w-2xl">
              We make businesses impossible to{' '}
              <span className="underline decoration-lime decoration-4 underline-offset-8">overlook</span>.
            </h1>

            {/* Approved Supporting Copy */}
            <p className="text-body-large text-muted-dark max-w-xl leading-relaxed">
              We design and develop high-quality websites that help businesses build trust, attract customers and grow online.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button to="/contact" variant="primary">
                Start a Project
              </Button>
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.9375rem] font-semibold text-midnight hover:text-lime-dark transition-colors"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Hallmarks */}
            <div className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-dark font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Bespoke Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Mobile-First Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight shrink-0" />
                <span>Transparent Scope</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Concept Viewport */}
          <div className="lg:col-span-6">
            <HeroViewport />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 2: POSITIONING STRIP (Single Manifesto + Seamless Marquee)
   ========================================================================== */

function PositioningStrip() {
  return (
    <section className="bg-white border-b border-border overflow-hidden">
      {/* Manifesto Statement */}
      <div className="container-main py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm md:text-base font-semibold text-midnight tracking-tight">
            Digital experiences built around real business goals.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-label text-muted">
            <span className="font-semibold text-midnight">Strategy</span>
            <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span className="font-semibold text-midnight">Design</span>
            <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span className="font-semibold text-midnight">Development</span>
            <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span className="font-semibold text-midnight">Optimisation</span>
          </div>
        </div>
      </div>

      {/* Seamless Marquee Ribbon */}
      <div className="bg-midnight text-white py-3 border-t border-border/20 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
          {/* First Marquee Stream */}
          <div className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-muted-light pr-8 shrink-0">
            <span>SINDEE INFOTECH</span>
            <span className="text-lime" aria-hidden="true">✦</span>
            <span>SPECIALIST WEB DESIGN & DEVELOPMENT</span>
            <span className="text-lime" aria-hidden="true">✦</span>
            <span>CRAFTED WITH PURPOSE</span>
            <span className="text-lime" aria-hidden="true">✦</span>
            <span>BUILT FOR REAL BUSINESSES</span>
            <span className="text-lime" aria-hidden="true">✦</span>
            <span>MODERN CODING STANDARDS</span>
            <span className="text-lime" aria-hidden="true">✦</span>
          </div>
          {/* Second Duplicate Stream for Seamless Infinite Loop */}
          <div className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-muted-light pr-8 shrink-0" aria-hidden="true">
            <span>SINDEE INFOTECH</span>
            <span className="text-lime">✦</span>
            <span>SPECIALIST WEB DESIGN & DEVELOPMENT</span>
            <span className="text-lime">✦</span>
            <span>CRAFTED WITH PURPOSE</span>
            <span className="text-lime">✦</span>
            <span>BUILT FOR REAL BUSINESSES</span>
            <span className="text-lime">✦</span>
            <span>MODERN CODING STANDARDS</span>
            <span className="text-lime">✦</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 3: SERVICES (Editorial Catalogue Layout)
   ========================================================================== */

function ServicesSection() {
  const topServices = services.slice(0, 4)

  const serviceIndustryFits: Record<string, string[]> = {
    'business-websites': ['Restaurants & Cafes', 'Healthcare & Clinics', 'Boutique Hotels', 'Local Services'],
    ecommerce: ['Retail Businesses', 'Artisan Brands', 'Apparel & Goods', 'Specialty Products'],
    'website-redesign': ['Outdated Web Presences', 'Low-Conversion Sites', 'Rebranding Companies'],
    'custom-solutions': ['Booking Workflows', 'Client Portals', 'API Integrations', 'Custom Dashboards'],
  }

  return (
    <section className="bg-warm-ivory section-padding border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <p className="text-label text-muted mb-3">Our Core Services</p>
          <h2 className="text-heading-1 text-midnight">
            Good design gets attention. Good websites create opportunities.
          </h2>
          <p className="text-body-large text-muted-dark mt-4">
            We focus on purpose-driven web design and clean engineering that make your business look credible, accessible, and ready to convert visitors.
          </p>
        </div>

        {/* Editorial Service Catalogue Rows */}
        <div className="divide-y divide-border border-y border-border">
          {topServices.map((service) => (
            <div
              key={service.id}
              className="py-10 md:py-14 transition-colors duration-200 hover:bg-white/60 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Service Information */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-lime-dark bg-midnight px-2.5 py-1 rounded">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                      Specialist Service
                    </span>
                  </div>

                  <h3 className="text-heading-2 text-midnight group-hover:text-midnight transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-body text-muted-dark leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  {/* Suitable Profile Tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {serviceIndustryFits[service.id]?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-warm-ivory text-midnight/80 text-xs font-medium border border-border/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link */}
                  <div className="pt-2">
                    <Link
                      to={`/services#${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-midnight group-hover:text-lime-dark transition-colors"
                    >
                      <span>Explore Deliverables & Scope</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Service Preview Image */}
                <div className="lg:col-span-5 flex justify-start lg:justify-end">
                  <div className="relative w-full max-w-md h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-midnight shadow-md">
                    <img
                      src={service.image}
                      alt={`${service.title} preview showcase`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-mono text-white/90">
                        Capability // {service.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <Button to="/services" variant="secondary">
            View All Services & Deliverables
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 4: SELECTED WORK (Visual Centrepiece — Explicit Slug-Based Lookups)
   ========================================================================== */

function WorkSection() {
  // Explicit slug-based lookups to guarantee correct mapping
  const grandRetreat = projects.find((p) => p.slug === 'the-grand-retreat')
  const theTable = projects.find((p) => p.slug === 'the-table')
  const azSelfDrive = projects.find((p) => p.slug === 'az-self-drive')
  const carePoint = projects.find((p) => p.slug === 'carepoint-clinic')

  return (
    <section id="selected-work" className="bg-midnight text-white section-padding">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-label text-lime mb-3">Portfolio Highlights</p>
            <h2 className="text-heading-1 text-white">Work that speaks for itself.</h2>
            <p className="text-body-large text-muted-light mt-4">
              Original design concepts developed to showcase industry-specific aesthetics, user journeys, and technical craftsmanship.
            </p>
          </div>
          <div className="self-start md:self-end">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-muted-light">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
              All Projects Labelled Concept Project
            </span>
          </div>
        </div>

        {/* Distinct Editorial Showcases */}
        <div className="space-y-12">
          {/* Project 01: The Grand Retreat (Quiet Luxury, Hospitality) */}
          {grandRetreat && (
            <article className="group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[440px] overflow-hidden bg-black">
                  <img
                    src={grandRetreat.image}
                    alt={`${grandRetreat.title} luxury resort concept showcase`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3.5 py-1.5 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-4">
                      <span>01</span>
                      <span>{grandRetreat.industry}</span>
                    </div>

                    <h3 className="text-heading-1 text-white group-hover:text-lime transition-colors">
                      {grandRetreat.title}
                    </h3>
                    <p className="text-sm font-medium text-lime/90 mt-1">
                      {grandRetreat.category}
                    </p>

                    <p className="text-body text-muted-light mt-4 leading-relaxed">
                      {grandRetreat.description}
                    </p>

                    <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2 text-xs text-white/80">
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Resort Villa Showcase</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Serene Information Architecture</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Reservation Enquiries</span>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10">
                    <Link
                      to={`/portfolio/${grandRetreat.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:underline"
                    >
                      <span>View Concept</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Asymmetric Pair: The Table (Food-Led) & A-Z Self Drive (Automotive) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Project 02: The Table */}
            {theTable && (
              <article className="lg:col-span-6 group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                    <img
                      src={theTable.image}
                      alt={`${theTable.title} restaurant dining concept`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                        Concept Project
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                      <Utensils className="w-3.5 h-3.5 text-[#e27d60]" />
                      <span className="font-serif italic text-white/90">Contemporary Dining UI</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-3">
                      <span>02</span>
                      <span>{theTable.industry}</span>
                    </div>

                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors">
                      {theTable.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-400/90 mt-1">
                      {theTable.category}
                    </p>
                    <p className="text-body text-muted-light mt-3 leading-relaxed">
                      {theTable.description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/60">Digital Menu & Table Enquiries</span>
                    <Link
                      to={`/portfolio/${theTable.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:underline"
                    >
                      <span>View Concept</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Project 03: A-Z Self Drive */}
            {azSelfDrive && (
              <article className="lg:col-span-6 group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                    <img
                      src={azSelfDrive.image}
                      alt={`${azSelfDrive.title} car rental vehicle fleet`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                        Concept Project
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                      <Car className="w-3.5 h-3.5 text-lime" />
                      <span className="font-mono text-white/90">Automotive Fleet UI</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-3">
                      <span>03</span>
                      <span>{azSelfDrive.industry}</span>
                    </div>

                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors">
                      {azSelfDrive.title}
                    </h3>
                    <p className="text-xs font-medium text-indigo-400/90 mt-1">
                      {azSelfDrive.category}
                    </p>
                    <p className="text-body text-muted-light mt-3 leading-relaxed">
                      {azSelfDrive.description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/60">Fleet Showcase & Booking</span>
                    <Link
                      to={`/portfolio/${azSelfDrive.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:underline"
                    >
                      <span>View Concept</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )}
          </div>

          {/* Project 04: CarePoint Clinic (Reassuring Healthcare) */}
          {carePoint && (
            <article className="group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div className="lg:col-span-6 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-4">
                      <span>04</span>
                      <span>{carePoint.industry}</span>
                    </div>

                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors">
                      {carePoint.title}
                    </h3>
                    <p className="text-sm font-medium text-cyan-400 mt-1">
                      {carePoint.category}
                    </p>

                    <p className="text-body text-muted-light mt-4 leading-relaxed">
                      {carePoint.description}
                    </p>

                    <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2 text-xs text-white/80">
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Doctor Profiles</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Appointment Enquiries</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Clinical Information Architecture</span>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10">
                    <Link
                      to={`/portfolio/${carePoint.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:underline"
                    >
                      <span>View Concept</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[360px] overflow-hidden bg-black">
                  <img
                    src={carePoint.image}
                    alt={`${carePoint.title} clinic healthcare concept`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-midnight-light via-transparent to-transparent hidden lg:block" />
                  <div className="absolute top-5 right-5 z-10">
                    <span className="px-3.5 py-1.5 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                    <Stethoscope className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="font-sans text-white/90">Healthcare Architecture</span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* Transparency Standard Notice */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-lime mb-2">Transparency Standard</p>
          <p className="text-sm text-muted-light leading-relaxed">
            All projects shown above are original design concepts created to demonstrate our technical approach, visual standards, and industry architectures. We do not publish fictional reviews, client claims, or fabricated commercial statistics.
          </p>
        </div>

        {/* View All Work Action */}
        <div className="mt-10 text-center">
          <Button to="/portfolio" variant="primary">
            Explore All Concept Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 5: WHY SINDEE INFOTECH (Architectural 4-Cell Matrix)
   ========================================================================== */

function WhyUsSection() {
  const differentiators = [
    {
      num: '01',
      title: 'Designed with purpose',
      desc: 'Every layout, typography decision and user journey starts with understanding your commercial goals and customer mindset. We design websites to solve problems, not just fill space.',
    },
    {
      num: '02',
      title: 'Built for real people',
      desc: 'Easy navigation, responsive layouts and clear information hierarchy. Your visitors should find what they need quickly on any device and enjoy the experience.',
    },
    {
      num: '03',
      title: 'Engineered for performance',
      desc: 'Clean, modern code and optimized assets for fast loading. We avoid bloated builders and unnecessary plugins that slow your site down and hurt search rankings.',
    },
    {
      num: '04',
      title: 'Partnership beyond launch',
      desc: 'Direct collaboration and reliable technical assistance as your digital presence evolves. We guide you through setup and remain accessible after your site goes live.',
    },
  ]

  return (
    <section className="bg-warm-ivory section-padding border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <p className="text-label text-muted mb-3">Our Standards</p>
          <h2 className="text-heading-1 text-midnight">
            Not just another website. A better way to present your business.
          </h2>
          <p className="text-body-large text-muted-dark mt-4">
            Most businesses end up with generic templates that fail to engage customers. We combine design clarity and solid code to build websites that command respect.
          </p>
        </div>

        {/* Architectural 4-Cell Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {differentiators.map((diff) => (
            <div
              key={diff.num}
              className="bg-white rounded-2xl p-8 md:p-10 border border-border hover:border-midnight/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-lime-dark bg-warm-ivory px-3 py-1.5 rounded-md inline-block mb-6">
                  STANDARD // {diff.num}
                </span>
                <h3 className="text-heading-3 text-midnight mb-3">
                  {diff.title}
                </h3>
                <p className="text-body text-muted-dark leading-relaxed">
                  {diff.desc}
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
   SECTION 6: OUR PROCESS (Guaranteed Visible Milestone Timeline)
   Content renders immediately without depending on viewport animation triggers.
   ========================================================================== */

function ProcessSection() {
  const steps = [
    {
      phase: '01',
      title: 'Discover',
      desc: 'We learn about your business, target audience, competitive strengths and objectives. This conversation shapes the foundation of the project.',
      deliverable: 'Scope alignment & project plan',
    },
    {
      phase: '02',
      title: 'Plan',
      desc: 'We map out the sitemap, information architecture, wireframes and visual design direction. A clear plan ensures no unexpected delays.',
      deliverable: 'Approved content architecture & wireframes',
    },
    {
      phase: '03',
      title: 'Design & Build',
      desc: 'We develop your website using modern React and Tailwind standards, bringing the design to life with responsive typography and interactions.',
      deliverable: 'Functional staging preview',
    },
    {
      phase: '04',
      title: 'Refine',
      desc: 'We review iterations together, test cross-browser responsiveness across phones, tablets and desktops, and apply agreed refinements.',
      deliverable: 'Approved production candidate',
    },
    {
      phase: '05',
      title: 'Launch',
      desc: 'We handle the deployment, configure search engine metadata, connect your domain records, and provide complete handover guidance.',
      deliverable: 'Live website & technical handover',
    },
  ]

  return (
    <section className="bg-white section-padding border-b border-border">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <p className="text-label text-muted">Execution Flow</p>
            <h2 className="text-heading-1 text-midnight">
              From first conversation to launch.
            </h2>
            <p className="text-body-large text-muted-dark leading-relaxed">
              A structured, collaborative approach that keeps your project transparent, organized and aligned with your expectations at every phase.
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="dark">
                Discuss Your Requirements
              </Button>
            </div>
          </div>

          {/* Right Column: Connected Vertical Milestone Timeline */}
          {/* Plain semantic HTML with zero reliance on hidden animation states */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.phase}
                className="bg-warm-ivory rounded-2xl p-6 sm:p-8 border border-border transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold text-lime-dark bg-midnight px-2.5 py-1 rounded">
                    PHASE {step.phase}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    Step {index + 1} of 5
                  </span>
                </div>

                <h3 className="text-xl font-bold text-midnight mb-2">
                  {step.title}
                </h3>

                <p className="text-body text-muted-dark leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-medium text-midnight/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-dark shrink-0" aria-hidden="true" />
                  <span className="text-muted">Key Milestone:</span>
                  <span>{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 7: PRICING (Editorial Investment Comparison & Commercial Disclaimers)
   ========================================================================== */

function PricingSection() {
  const tiers = [
    {
      name: 'STARTER',
      price: '₹9,999',
      intendedFor: 'Local businesses & independent brands establishing a verified online footprint.',
      includedScope: [
        'Up to 5 custom-designed pages',
        'Mobile-first responsive design',
        'Direct contact enquiry form',
        'WhatsApp click-to-chat integration',
        'Interactive Google Maps setup',
        'Baseline on-page SEO setup',
        'Hosting & deployment assistance',
      ],
      deliverables: 'Complete 5-page responsive website, search meta tags, deployment assistance',
    },
    {
      name: 'PROFESSIONAL',
      price: '₹17,999',
      intendedFor: 'Growing commercial businesses requiring a richer portfolio or catalogue showcase.',
      includedScope: [
        'Up to 8 custom-designed pages',
        'Everything in Starter included',
        'Photo gallery or portfolio showcase',
        'Service or product catalogue layout',
        'Custom enquiry capture forms',
        'Enhanced design customisation',
        'Speed optimisation & analytics setup',
        'Post-launch handover support',
      ],
      deliverables: 'Comprehensive multi-page website, catalogue layouts, speed audit, handover session',
    },
    {
      name: 'ADVANCED',
      price: '₹29,999',
      intendedFor: 'Established businesses requiring purpose-built workflows or integrations.',
      includedScope: [
        'Custom multi-page architecture',
        'Online booking or order enquiry features',
        'Payment gateway integration assistance',
        'Custom third-party integrations',
        'Advanced functionality and forms',
        'Dedicated technical support',
      ],
      deliverables: 'Bespoke web solution, custom workflows, integration testing, technical documentation',
    },
  ]

  return (
    <section className="bg-warm-ivory section-padding border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
          <p className="text-label text-muted mb-3">Investment Framework</p>
          <h2 className="text-heading-1 text-midnight">
            An investment in your business's digital future.
          </h2>
          <p className="text-body-large text-muted-dark mt-4">
            Transparent baseline tiers for businesses in India. Every project is scoped individually to match your specific requirements.
          </p>
        </div>

        {/* Structured Editorial Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-border flex flex-col justify-between transition-shadow duration-200 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold tracking-widest text-midnight">
                    {tier.name}
                  </span>
                  <span className="text-xs font-mono text-muted uppercase">
                    Baseline Package
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xs uppercase tracking-wider text-muted-dark">starting at</span>
                  <span className="text-4xl font-extrabold tracking-tight text-midnight">{tier.price}</span>
                </div>

                <div className="mt-4 p-3 bg-warm-ivory rounded-xl border border-border/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-dark block mb-1">
                    Intended For:
                  </span>
                  <p className="text-xs text-midnight/90 leading-relaxed font-medium">
                    {tier.intendedFor}
                  </p>
                </div>

                <div className="my-6 border-t border-border" />

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-dark block mb-3">
                    Included Scope:
                  </span>
                  <ul className="space-y-3 text-sm">
                    {tier.includedScope.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-lime-dark" />
                        <span className="text-muted-dark text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted block mb-1">
                    Key Deliverable:
                  </span>
                  <p className="text-xs text-midnight/80 font-medium">
                    {tier.deliverables}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border">
                <Button
                  to="/contact"
                  variant="dark"
                  className="w-full justify-center"
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Unambiguous Commercial Scope & Exclusions Notice */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-border max-w-4xl mx-auto space-y-3 text-left">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-midnight" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-midnight font-bold">
              Commercial Scope & Exclusions Policy
            </h4>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted-dark leading-relaxed list-disc list-inside">
            <li>Payment gateway assistance covers configuration guidance; gateway merchant verification and transaction fees are separate.</li>
            <li>Third-party domain registration and web hosting fees are paid directly to providers unless specified in a written agreement.</li>
            <li>Custom third-party integrations and complex booking logic require individual scoping and specification.</li>
            <li>Extensive copywriting, brand photography, and large volume data entry may require additional scoping.</li>
            <li>Final pricing depends on the agreed project brief and deliverable milestones.</li>
            <li>No hidden agency markups on software licenses or recurring host bills.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION 8: FINAL CTA (Linked to Verified Contact Page)
   ========================================================================== */

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-midnight text-white relative overflow-hidden">
      <div className="container-main relative z-10 text-center max-w-3xl mx-auto">
        <span className="text-label text-lime tracking-widest uppercase">
          Start Today
        </span>

        <h2 className="text-display text-white mt-4 tracking-tight">
          Ready to build something better?
        </h2>

        <p className="text-body-large text-muted-light mt-6 leading-relaxed max-w-xl mx-auto">
          Let&apos;s create a digital presence that reflects the quality of your business. Tell us about your project and we&apos;ll discuss the right approach.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/contact" variant="primary">
            Tell Us About Your Project
          </Button>
          <Button
            to="/work"
            variant="secondary"
            className="border-white/20 text-white hover:bg-white hover:text-midnight"
          >
            Explore All Work
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   HOMEPAGE MAIN EXPORT
   ========================================================================== */

export function HomePage() {
  return (
    <PageMeta
      title="Sindee Infotech — Specialist Web Design & Development Agency"
      description="We design and develop high-quality websites that help businesses build trust, attract customers and grow online."
    >
      <HeroSection />
      <PositioningStrip />
      <ServicesSection />
      <WorkSection />
      <WhyUsSection />
      <ProcessSection />
      <PricingSection />
      <FinalCTA />
    </PageMeta>
  )
}
