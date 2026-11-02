import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import {
  fadeUpVariants,
  fadeInVariants,
  slideInRightVariants,
  staggerContainerVariants,
  staggerFastContainerVariants,
} from '@/lib/animations'
import { SITE_CONFIG } from '@/lib/config'

/* ==========================================================================
   HERO VISUAL — SVG/CSS Browser Preview Compositions
   ========================================================================== */

function BrowserFrame({
  title,
  color,
  children,
  className = '',
}: {
  title: string
  color: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-2xl border border-white/10 ${className}`}
      style={{ background: color }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-black/20 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[10px] text-white/40 font-medium tracking-wide">
          {title}
        </span>
      </div>
      {/* Content area */}
      <div className="p-4">{children}</div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] md:min-h-[480px]">
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full border border-lime/20" />
        <div className="absolute bottom-12 left-4 w-20 h-20 rounded-full bg-lime/5" />
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <rect
            x="50"
            y="50"
            width="300"
            height="300"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-midnight"
          />
          <rect
            x="100"
            y="100"
            width="200"
            height="200"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-midnight"
          />
        </svg>
      </div>

      {/* Main browser — Restaurant */}
      <motion.div
        variants={fadeUpVariants}
        className="absolute top-4 left-0 md:left-4 w-[75%] md:w-[70%] z-20"
      >
        <BrowserFrame title="thetable.in" color="#2d1810">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-[11px] font-semibold tracking-wider uppercase">
                The Table
              </span>
              <div className="flex gap-3">
                <span className="text-white/40 text-[9px]">Menu</span>
                <span className="text-white/40 text-[9px]">Reserve</span>
                <span className="text-white/40 text-[9px]">About</span>
              </div>
            </div>
            <div className="relative w-full h-28 md:h-36 rounded-lg overflow-hidden group">
              <img
                src="/images/hero/hero-food.jpg"
                alt="The Table Culinary Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                <div>
                  <p className="text-white text-xs font-semibold">
                    A dining experience
                  </p>
                  <p className="text-white/70 text-[9px] mt-0.5">
                    Contemporary cuisine · Warm ambiance
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-9 rounded bg-amber-900/40 border border-amber-800/30 flex items-center justify-center">
                <span className="text-white/70 text-[9px] font-medium">Appetisers</span>
              </div>
              <div className="flex-1 h-9 rounded bg-amber-900/40 border border-amber-800/30 flex items-center justify-center">
                <span className="text-white/70 text-[9px] font-medium">Chef's Table</span>
              </div>
              <div className="flex-1 h-9 rounded bg-lime/20 border border-lime/30 flex items-center justify-center">
                <span className="text-lime text-[9px] font-semibold">Book Now</span>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </motion.div>

      {/* Second browser — Hotel */}
      <motion.div
        variants={slideInRightVariants}
        className="absolute top-32 md:top-40 right-0 w-[65%] md:w-[60%] z-30"
      >
        <BrowserFrame title="grandretreat.com" color="#1a2f1a">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-[11px] font-semibold tracking-widest uppercase">
                Grand Retreat
              </span>
              <div className="flex gap-3">
                <span className="text-white/40 text-[9px]">Suites</span>
                <span className="text-white/40 text-[9px]">Sanctuary</span>
              </div>
            </div>
            <div className="relative w-full h-24 md:h-28 rounded-lg overflow-hidden">
              <img
                src="/images/hero/hero-resort.jpg"
                alt="Grand Retreat Resort"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                <div>
                  <p className="text-white text-xs font-semibold">
                    Your serene escape
                  </p>
                  <p className="text-white/70 text-[9px] mt-0.5">
                    Luxury · Wellness · Nature
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px]">
              <span className="text-white/70">Forest Villa</span>
              <span className="text-lime font-bold">Available Today</span>
            </div>
          </div>
        </BrowserFrame>
      </motion.div>

      {/* Third browser — Automotive */}
      <motion.div
        variants={fadeUpVariants}
        className="absolute bottom-2 left-6 md:left-12 w-[60%] md:w-[55%] z-40 hidden sm:block"
      >
        <BrowserFrame title="azselfdrive.com" color="#101827">
          <div className="space-y-2">
            <div className="relative w-full h-20 md:h-24 rounded-lg overflow-hidden">
              <img
                src="/images/hero/hero-car.jpg"
                alt="Self-drive car fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent flex items-end p-2">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] text-white font-bold">A-Z Self Drive</span>
                  <span className="text-[9px] text-lime font-mono">Instant Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </motion.div>

      {/* Floating accent elements */}
      <div className="absolute -top-2 right-16 w-4 h-4 rounded-full bg-lime/30 z-40" />
      <div className="absolute bottom-20 -right-2 w-3 h-3 rounded-full bg-lime/20 z-40" />
    </div>
  )
}

/* ==========================================================================
   PROJECT PREVIEW — CSS-based compositions per project
   ========================================================================== */

function ProjectPreview({
  project,
}: {
  project: (typeof projects)[0]
}) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-700 ease-out border border-white/10 bg-midnight">
      {/* Real Project Image with Zoom */}
      <img
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Sophisticated editorial overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-black/20 flex flex-col justify-between p-5 md:p-6 pointer-events-none">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span>{project.slug}.sindeeinfotech.com</span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-md">
            {project.industry}
          </span>
        </div>

        {/* Bottom subtle label */}
        <div className="flex items-end justify-between">
          <div className="bg-midnight/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-lime block">Live Concept Preview</span>
            <span className="text-sm font-bold text-white block">{project.title}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-lime text-midnight flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
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
    <section className="bg-warm-ivory pt-20 md:pt-24">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-label text-muted mb-5"
            >
              {SITE_CONFIG.name}
            </motion.p>
            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight"
            >
              Your business deserves a better digital presence.
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6"
            >
              We design and build thoughtful digital experiences that help
              ambitious businesses establish credibility, connect with customers
              and grow.
            </motion.p>
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-4 mt-9"
            >
              <Button variant="primary" to="/contact">
                Start a Project
              </Button>
              <Button variant="secondary" to="/work">
                Explore Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Visual Composition */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative lg:pl-8"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION B: TRUST / POSITIONING STRIP
   ========================================================================== */

const trustLabels = ['Strategy', 'Design', 'Development', 'Digital Experience']

function TrustStrip() {
  return (
    <section className="bg-warm-ivory">
      <div className="container-main">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="border-t border-b border-border py-10 md:py-14"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-body-large text-midnight font-semibold max-w-md">
              Digital experiences built around real business goals.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {trustLabels.map((label) => (
                <span key={label} className="text-label text-muted">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION C: WHAT WE DO — Services Overview
   ========================================================================== */

function ServicesSection() {
  const topServices = services.slice(0, 4)

  return (
    <section className="bg-warm-ivory section-padding">
      <div className="container-main">
        <SectionHeader
          label="What We Do"
          title="Good design gets attention. Good websites create opportunities."
          className="mb-16 md:mb-22"
        />

        {/* Editorial asymmetric layout */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-0"
        >
          {topServices.map((service, index) => (
            <motion.div key={service.id} variants={fadeUpVariants}>
              <Link
                to="/services"
                className="group block border-t border-border py-10 md:py-14"
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start ${
                    index % 2 !== 0 ? 'md:text-right' : ''
                  }`}
                >
                  {/* Number */}
                  <div
                    className={`md:col-span-1 ${
                      index % 2 !== 0 ? 'md:order-4' : ''
                    }`}
                  >
                    <span className="text-label text-lime-dark">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    className={`md:col-span-4 ${
                      index % 2 !== 0 ? 'md:order-3' : ''
                    }`}
                  >
                    <h3 className="text-heading-3 text-midnight group-hover:text-lime-dark transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  {/* Spacer for asymmetry */}
                  <div
                    className={`hidden md:block md:col-span-2 ${
                      index % 2 !== 0 ? 'md:order-1' : ''
                    }`}
                  />

                  {/* Description */}
                  <div
                    className={`md:col-span-5 ${
                      index % 2 !== 0
                        ? 'md:order-2 md:text-left'
                        : ''
                    }`}
                  >
                    <p className="text-body text-muted-dark">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-border" />
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <Button variant="ghost" to="/services">
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION D: SELECTED WORK — Editorial Portfolio
   ========================================================================== */

function WorkSection() {
  return (
    <section className="bg-midnight section-padding">
      <div className="container-main">
        <SectionHeader
          label="Selected Work"
          title="Work that speaks for itself."
          description="Concept projects that demonstrate our design thinking and development approach."
          dark
          className="mb-16 md:mb-22"
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-20 md:space-y-28"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={fadeUpVariants}>
              <Link
                to={`/work/${project.slug}`}
                className="group block"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  {/* Preview */}
                  <div className={index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <ProjectPreview project={project} />
                  </div>

                  {/* Info */}
                  <div
                    className={`space-y-4 ${
                      index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-label text-lime">
                        {project.number}
                      </span>
                      <span className="text-[11px] tracking-wider uppercase text-midnight-lighter bg-white/5 border border-border-dark rounded-full px-3 py-1 font-medium text-muted-light">
                        Concept Project
                      </span>
                    </div>
                    <p className="text-caption !text-muted-light">
                      {project.category}
                    </p>
                    <h3 className="text-heading-2 text-white group-hover:text-lime transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-body text-muted-light max-w-md">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-label text-lime/80 pt-2 group-hover:gap-3 transition-all duration-300">
                      View Project
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 md:mt-22"
        >
          <Button variant="primary" to="/work">
            View All Work
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION E: WHY SINDEE INFOTECH — Differentiators
   ========================================================================== */

const differentiators = [
  {
    number: '01',
    title: 'Designed with purpose',
    description:
      'Every website starts with understanding your business and customers. We focus on what matters — creating a clear, compelling online presence that serves your goals.',
  },
  {
    number: '02',
    title: 'Built for real people',
    description:
      'Easy navigation, responsive layouts and intuitive experiences. Your visitors should find what they need quickly and enjoy the process.',
  },
  {
    number: '03',
    title: 'Performance matters',
    description:
      'Clean development and optimised assets for a fast experience. Because a slow website loses visitors before they even see what you offer.',
  },
  {
    number: '04',
    title: 'Partnership beyond launch',
    description:
      'Reliable support and assistance as your digital presence evolves. We stay with you after launch to ensure everything runs smoothly.',
  },
]

function WhyUsSection() {
  return (
    <section className="bg-warm-ivory section-padding">
      <div className="container-main">
        <SectionHeader
          label="Why Sindee Infotech"
          title="Not just another website. A better way to present your business."
          className="mb-16 md:mb-22"
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-0"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={item.number}
              variants={fadeUpVariants}
              className={`border-t border-border py-10 md:py-12 ${
                index >= 2 ? '' : ''
              }`}
            >
              <div className="flex gap-5">
                <span className="text-label text-lime-dark shrink-0 pt-1">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-heading-3 text-midnight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-muted-dark">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION F: OUR PROCESS — Timeline
   ========================================================================== */

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your business, audience and goals. This conversation shapes everything that follows.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'We define the sitemap, content strategy and feature set. A clear plan means no surprises.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description:
      'We design and develop your website simultaneously, sharing progress at every stage.',
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'We review every detail together — tweaking, testing and polishing until everything feels right.',
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'Your website goes live. We handle the technical setup and stay available for post-launch support.',
  },
]

function ProcessSection() {
  return (
    <section className="bg-midnight section-padding overflow-hidden">
      <div className="container-main">
        <SectionHeader
          label="Our Process"
          title="From first conversation to launch."
          description="A straightforward, collaborative process designed to make your experience smooth and your website exceptional."
          dark
          className="mb-16 md:mb-22"
        />

        {/* Desktop: Horizontal timeline */}
        <motion.div
          variants={staggerFastContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="hidden md:block"
        >
          <div className="grid grid-cols-5 gap-0">
            {processSteps.map((step, index) => (
              <motion.div key={step.number} variants={fadeUpVariants}>
                <div className="relative pr-6 lg:pr-8">
                  {/* Connector line */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-lime shrink-0" />
                    {index < processSteps.length - 1 && (
                      <div className="h-px flex-1 bg-border-dark" />
                    )}
                  </div>
                  <span className="text-label text-lime/60 block mb-3">
                    {step.number}
                  </span>
                  <h3 className="text-heading-3 text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-caption !text-muted-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: Vertical timeline */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="md:hidden"
        >
          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeUpVariants}
                className="relative flex gap-5"
              >
                {/* Vertical line & dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-lime shrink-0 mt-1" />
                  {index < processSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border-dark" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <span className="text-label text-lime/60 block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-heading-3 text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-caption !text-muted-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION G: PRICING
   ========================================================================== */

const pricingTiers = [
  {
    name: 'Starter',
    price: '₹9,999',
    description: 'Perfect for small businesses and personal brands starting their online journey.',
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Contact form',
      'Basic SEO setup',
      'WhatsApp integration',
      'Google Maps',
      '1 month post-launch support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹17,999',
    description: 'For growing businesses that need a more comprehensive digital presence.',
    features: [
      'Up to 10 pages',
      'Custom responsive design',
      'Advanced contact forms',
      'On-page SEO optimisation',
      'Google Analytics setup',
      'Social media integration',
      'WhatsApp chat widget',
      'Blog / news section',
      '2 months post-launch support',
    ],
    highlighted: true,
  },
  {
    name: 'Advanced',
    price: '₹29,999',
    description: 'For established businesses requiring sophisticated web solutions.',
    features: [
      'Unlimited pages',
      'Premium custom design',
      'E-commerce / booking functionality',
      'CMS integration',
      'Advanced SEO & analytics',
      'Third-party integrations',
      'Performance optimisation',
      'Custom functionality',
      'Priority support',
      '3 months post-launch support',
    ],
    highlighted: false,
  },
]

function PricingSection() {
  return (
    <section className="bg-warm-ivory section-padding">
      <div className="container-main">
        <SectionHeader
          label="Pricing"
          title="An investment in your business's digital future."
          description="Transparent starting points. Every project is scoped individually to match your needs."
          align="center"
          className="mb-16 md:mb-22"
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUpVariants}
              className={`relative rounded-2xl p-7 md:p-8 transition-shadow duration-300 ${
                tier.highlighted
                  ? 'bg-midnight text-white shadow-[0_8px_40px_rgba(16,24,39,0.15)] md:-mt-4 md:mb-[-1rem] md:py-10'
                  : 'bg-white border border-border'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 text-[11px] tracking-wider uppercase bg-lime text-midnight font-semibold px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3
                  className={`text-label mb-4 ${
                    tier.highlighted ? 'text-lime' : 'text-muted'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-heading-2 ${
                      tier.highlighted ? 'text-white' : 'text-midnight'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlighted ? 'text-muted-light' : 'text-muted'
                    }`}
                  >
                    starting
                  </span>
                </div>
                <p
                  className={`text-sm mt-3 leading-relaxed ${
                    tier.highlighted ? 'text-muted-light' : 'text-muted-dark'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              <div
                className={`border-t pt-6 mb-6 ${
                  tier.highlighted ? 'border-border-dark' : 'border-border'
                }`}
              >
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.highlighted ? 'text-lime' : 'text-lime-dark'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          tier.highlighted ? 'text-muted-light' : 'text-muted-dark'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                to="/contact"
                className="w-full justify-center"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-caption mt-10 max-w-xl mx-auto"
        >
          Every project is different. Final pricing depends on functionality,
          content and project requirements.{' '}
          <Link
            to="/contact"
            className="text-midnight font-semibold hover:text-lime-dark transition-colors underline underline-offset-2"
          >
            Request a Quote
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

/* ==========================================================================
   SECTION H: FINAL CTA
   ========================================================================== */

function FinalCTA() {
  return (
    <section className="bg-midnight section-padding">
      <div className="container-main">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p variants={fadeUpVariants} className="text-label text-lime mb-5">
            Let&apos;s Work Together
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="text-heading-1 text-white">
            Ready to build something better?
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-body-large text-muted-light mt-5 max-w-xl mx-auto"
          >
            Let&apos;s create a digital presence that reflects the quality of
            your business.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="mt-10">
            <Button variant="primary" to="/contact">
              Tell Us About Your Project
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   HOME PAGE
   ========================================================================== */

export function HomePage() {
  return (
    <PageMeta
      title="Sindee Infotech — Web Design & Development Studio"
      description="We design and build thoughtful digital experiences that help ambitious businesses establish credibility, connect with customers and grow."
    >
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <WorkSection />
      <WhyUsSection />
      <ProcessSection />
      <PricingSection />
      <FinalCTA />
    </PageMeta>
  )
}
