import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, ArrowUpRight, Utensils, Car, Stethoscope } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

/* ==========================================================================
   HERO INTERACTIVE VIEWPORT
   ========================================================================== */

interface ViewportTab {
  id: string
  label: string
  industry: string
  title: string
  url: string
  image: string
  spec: string
}

const viewportTabs: ViewportTab[] = [
  {
    id: 'dining',
    label: 'Dining',
    industry: 'Hospitality',
    title: 'The Table — Modern Bistronomy',
    url: 'thetable.in',
    image: '/images/hero/hero-food.jpg',
    spec: 'Seasonal Tasting Menu • Table Reservations',
  },
  {
    id: 'resort',
    label: 'Resort',
    industry: 'Luxury Travel',
    title: 'The Grand Retreat — Forest Sanctuary',
    url: 'grandretreat.com',
    image: '/images/hero/hero-resort.jpg',
    spec: 'Private Villas • Wellness Retreat',
  },
  {
    id: 'fleet',
    label: 'Automotive',
    industry: 'Car Rental',
    title: 'A-Z Self Drive — Premium Fleet',
    url: 'azselfdrive.com',
    image: '/images/hero/hero-car.jpg',
    spec: '4x4 Self-Drive Fleet • Instant Booking',
  },
]

function HeroViewport() {
  const [activeTab, setActiveTab] = useState<string>('dining')
  const current = viewportTabs.find((t) => t.id === activeTab) || viewportTabs[0]

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-midnight/15 bg-midnight text-white">
      {/* Browser Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-midnight-light border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
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

      {/* Viewport Screen Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-midnight">
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="eager"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none" />

        {/* Viewport Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
          <div className="bg-midnight/85 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 max-w-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-lime block mb-1">
              {current.industry}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
              {current.title}
            </h4>
            <p className="text-[11px] text-white/70 mt-1">
              {current.spec}
            </p>
          </div>
        </div>
      </div>

      {/* Manual Tab Switcher Controls */}
      <div className="px-4 py-3 bg-midnight-light border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-light hidden sm:inline-block">
          Select Concept Preview:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
          {viewportTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
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
   SECTION A: HERO
   ========================================================================== */

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-warm-ivory border-b border-border/70 overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Architectural Manifesto */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 md:space-y-7"
          >
            {/* Agency Status Kicker */}
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Specialist Web Design & Development Agency
            </motion.div>

            {/* Approved Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              We make businesses impossible to <span className="underline decoration-lime decoration-4 underline-offset-8">overlook</span>.
            </motion.h1>

            {/* Approved Supporting Copy */}
            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark max-w-xl leading-relaxed"
            >
              We design and develop high-quality websites that help businesses build trust, attract customers and grow online.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 pt-2">
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
            </motion.div>

            {/* Substantive Pillars */}
            <motion.div variants={fadeUpVariants} className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-dark font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight" />
                <span>Bespoke Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight" />
                <span>Mobile-First Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-midnight" />
                <span>Transparent Scope</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Browser Viewport */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6"
          >
            <HeroViewport />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION B: POSITIONING & MANIFESTO STRIP
   ========================================================================== */

function PositioningStrip() {
  return (
    <section className="bg-white border-b border-border overflow-hidden">
      {/* Upper Tier: Core Statement */}
      <div className="container-main py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm md:text-base font-semibold text-midnight tracking-tight">
            Digital experiences built around real business goals.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-label text-muted">
            <span className="font-semibold text-midnight">Strategy</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="font-semibold text-midnight">Design</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="font-semibold text-midnight">Development</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="font-semibold text-midnight">Optimisation</span>
          </div>
        </div>
      </div>

      {/* Lower Tier: Restrained Typography Marquee */}
      <div className="bg-midnight text-white py-3 border-t border-border/20 overflow-hidden whitespace-nowrap select-none">
        <div className="inline-flex gap-8 text-xs font-mono tracking-widest uppercase text-muted-light animate-[marquee_35s_linear_infinite]">
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
          <span>SINDEE INFOTECH</span>
          <span className="text-lime">✦</span>
          <span>SPECIALIST WEB DESIGN & DEVELOPMENT</span>
          <span className="text-lime">✦</span>
          <span>CRAFTED WITH PURPOSE</span>
          <span className="text-lime">✦</span>
          <span>BUILT FOR REAL BUSINESSES</span>
          <span className="text-lime">✦</span>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION C: WHAT WE DO (Services Overview)
   ========================================================================== */

function ServicesSection() {
  const topServices = services.slice(0, 4)

  const serviceIndustryFits = [
    ['Restaurants & Cafes', 'Clinics', 'Local Services', 'Professional Firms'],
    ['Retail Stores', 'Artisan Brands', 'Apparel', 'Product Makers'],
    ['Outdated Sites', 'Low Conversion Sites', 'Rebranding Companies'],
    ['Booking Workflows', 'Client Portals', 'Custom Integrations'],
  ]

  return (
    <section className="bg-warm-ivory section-padding border-b border-border">
      <div className="container-main">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="text-label text-muted mb-3">Our Core Services</p>
          <h2 className="text-heading-1 text-midnight">
            Good design gets attention. Good websites create opportunities.
          </h2>
          <p className="text-body-large text-muted-dark mt-4">
            We focus on purpose-driven web design and clean engineering that make your business look credible, accessible, and ready to convert visitors.
          </p>
        </div>

        {/* Scannable Editorial Catalog */}
        <div className="space-y-6">
          {topServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-border hover:border-midnight/40 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Number & Service Info */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-lime-dark bg-warm-ivory px-2.5 py-1 rounded">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                      Core Service
                    </span>
                  </div>

                  <h3 className="text-heading-2 text-midnight group-hover:text-midnight transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-body text-muted-dark leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Industry Fit Tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {serviceIndustryFits[index]?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-warm-ivory text-midnight/80 text-xs font-medium border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Thumbnail Preview & Action Link */}
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
                  <div className="relative w-full sm:w-64 h-36 rounded-xl overflow-hidden border border-border bg-midnight shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-mono text-white/90">
                        {service.slug}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/services#${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-midnight group-hover:text-lime-dark transition-colors pt-2"
                  >
                    <span>View Service Details & Deliverables</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Action */}
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
   SECTION D: SELECTED WORK (Visual Centrepiece)
   ========================================================================== */

function WorkSection() {
  const [grandRetreat, theTable, azSelfDrive, carePoint] = projects

  return (
    <section id="selected-work" className="bg-midnight text-white section-padding">
      <div className="container-main">
        {/* Header */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              All Projects Labelled Concept Project
            </span>
          </div>
        </div>

        {/* Editorial Portfolio Showcase */}
        <div className="space-y-10">
          {/* Project 01: The Grand Retreat (Commanding Hero Showcase) */}
          {grandRetreat && (
            <motion.article
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden bg-black">
                  <img
                    src={grandRetreat.image}
                    alt={grandRetreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3 py-1 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-4">
                      <span>{grandRetreat.number}</span>
                      <span>{grandRetreat.industry}</span>
                    </div>

                    <h3 className="text-heading-1 text-white group-hover:text-lime transition-colors">
                      {grandRetreat.title}
                    </h3>
                    <p className="text-sm font-medium text-lime/80 mt-1">
                      {grandRetreat.category}
                    </p>

                    <p className="text-body text-muted-light mt-4 leading-relaxed">
                      {grandRetreat.description}
                    </p>

                    <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2 text-xs text-white/80">
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Resort Villa Showcase</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Reservation Enquiries</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Wellness Experience</span>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10">
                    <Link
                      to={`/work/${grandRetreat.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:underline"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Asymmetric Offset Pair: The Table (Left) & A-Z Self Drive (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Project 02: The Table */}
            {theTable && (
              <motion.article
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="lg:col-span-6 group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                  <img
                    src={theTable.image}
                    alt={theTable.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                    <Utensils className="w-3.5 h-3.5 text-[#e27d60]" />
                    <span className="font-serif italic text-white/90">Contemporary Dining UI</span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-3">
                      <span>{theTable.number}</span>
                      <span>{theTable.industry}</span>
                    </div>

                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors">
                      {theTable.title}
                    </h3>
                    <p className="text-body text-muted-light mt-3 leading-relaxed">
                      {theTable.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/60">{theTable.category}</span>
                    <Link
                      to={`/work/${theTable.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:underline"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Project 03: A-Z Self Drive */}
            {azSelfDrive && (
              <motion.article
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="lg:col-span-6 group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                  <img
                    src={azSelfDrive.image}
                    alt={azSelfDrive.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-transparent to-black/30" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                    <Car className="w-3.5 h-3.5 text-lime" />
                    <span className="font-mono text-white/90">Fleet Reservation Portal</span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-3">
                      <span>{azSelfDrive.number}</span>
                      <span>{azSelfDrive.industry}</span>
                    </div>

                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors">
                      {azSelfDrive.title}
                    </h3>
                    <p className="text-body text-muted-light mt-3 leading-relaxed">
                      {azSelfDrive.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/60">{azSelfDrive.category}</span>
                    <Link
                      to={`/work/${azSelfDrive.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:underline"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}
          </div>

          {/* Project 04: CarePoint Clinic (Clinical Showcase) */}
          {carePoint && (
            <motion.article
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group bg-midnight-light rounded-3xl overflow-hidden border border-white/10 hover:border-lime/40 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div className="lg:col-span-6 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-light uppercase tracking-wider mb-4">
                      <span>{carePoint.number}</span>
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
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Clear Services Directory</span>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10">
                    <Link
                      to={`/work/${carePoint.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:underline"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[360px] overflow-hidden bg-black">
                  <img
                    src={carePoint.image}
                    alt={carePoint.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-midnight-light via-transparent to-transparent hidden lg:block" />
                  <div className="absolute top-5 right-5 z-10">
                    <span className="px-3 py-1 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow">
                      Concept Project
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                    <Stethoscope className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="font-sans text-white/90">Healthcare Architecture</span>
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </div>

        {/* Transparency Standard Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-lime mb-2">Transparency Standard</p>
          <p className="text-sm text-muted-light leading-relaxed">
            All projects shown above are original design concepts created to demonstrate our technical approach, visual standards, and industry architectures. We do not publish fictional reviews or fabricated client metrics.
          </p>
        </div>

        {/* View All Work Button */}
        <div className="mt-10 text-center">
          <Button to="/work" variant="primary">
            Explore All Concept Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION E: WHY SINDEE INFOTECH (Architectural Grid)
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
            <motion.div
              key={diff.num}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="bg-white rounded-2xl p-8 md:p-10 border border-border hover:border-midnight/30 transition-all duration-300 flex flex-col justify-between"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION F: OUR PROCESS (Vertical Milestone Blueprint)
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
      deliverable: 'Approved content architecture',
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
      deliverable: 'Approved production build',
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
          {/* Left Column: Sticky Context */}
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

          {/* Right Column: Milestone Sequence */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.phase}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-warm-ivory rounded-2xl p-6 sm:p-8 border border-border"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-dark" />
                  <span className="text-muted">Key Milestone:</span>
                  <span>{step.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION G: PRICING (Transparent Investment Framework)
   ========================================================================== */

function PricingSection() {
  const tiers = [
    {
      name: 'STARTER',
      price: '₹9,999',
      tagline: 'Ideal for small businesses establishing their first professional digital presence.',
      featured: false,
      features: [
        'Up to 5 custom-designed pages',
        'Mobile-first responsive layout',
        'Direct contact enquiry form',
        'WhatsApp click-to-chat integration',
        'Interactive Google Maps setup',
        'Baseline on-page SEO setup',
        'Hosting & deployment assistance',
      ],
    },
    {
      name: 'PROFESSIONAL',
      price: '₹17,999',
      tagline: 'Comprehensive digital presence for growing commercial businesses.',
      featured: true,
      features: [
        'Up to 8 custom-designed pages',
        'Everything in Starter included',
        'Photo gallery or portfolio showcase',
        'Service or product catalogue layout',
        'Custom enquiry capture forms',
        'Enhanced design customisation',
        'Speed optimisation & analytics setup',
        'Post-launch handover support',
      ],
    },
    {
      name: 'ADVANCED',
      price: '₹29,999',
      tagline: 'Purpose-built web solutions for businesses requiring custom workflows.',
      featured: false,
      features: [
        'Custom multi-page architecture',
        'Online booking or order enquiry features',
        'Payment gateway integration assistance',
        'Custom third-party integrations',
        'Advanced functionality and forms',
        'Dedicated technical support',
      ],
    },
  ]

  return (
    <section className="bg-warm-ivory section-padding border-b border-border">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <p className="text-label text-muted mb-3">Investment Framework</p>
          <h2 className="text-heading-1 text-midnight">
            An investment in your business's digital future.
          </h2>
          <p className="text-body-large text-muted-dark mt-4">
            Transparent starting points for businesses in India. Every project is scoped individually to match your requirements.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                tier.featured
                  ? 'bg-midnight text-white shadow-2xl ring-2 ring-lime lg:-translate-y-2'
                  : 'bg-white text-midnight border border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-xs font-bold tracking-widest ${
                      tier.featured ? 'text-lime' : 'text-muted-dark'
                    }`}
                  >
                    {tier.name}
                  </span>
                  {tier.featured && (
                    <span className="px-3 py-1 rounded-full bg-lime text-midnight text-[10px] font-bold uppercase tracking-wider">
                      Most Selected
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xs uppercase tracking-wider opacity-70">starting at</span>
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                </div>

                <p
                  className={`text-sm mt-3 leading-relaxed ${
                    tier.featured ? 'text-muted-light' : 'text-muted-dark'
                  }`}
                >
                  {tier.tagline}
                </p>

                <div className={`my-8 border-t ${tier.featured ? 'border-white/10' : 'border-border'}`} />

                <ul className="space-y-3.5 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.featured ? 'text-lime' : 'text-midnight'
                        }`}
                      />
                      <span className={tier.featured ? 'text-white/90' : 'text-muted-dark'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4">
                <Button
                  to="/contact"
                  variant={tier.featured ? 'primary' : 'dark'}
                  className="w-full justify-center"
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Exclusions & Scope Disclaimers */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-xs text-muted-dark leading-relaxed">
            * Note: Every project is different. Final pricing depends on functionality, content volume and project requirements. Third-party domain registration, web hosting, and premium third-party service subscriptions are billed directly by their respective providers.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION H: FINAL CTA
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
   MAIN HOMEPAGE EXPORT
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
