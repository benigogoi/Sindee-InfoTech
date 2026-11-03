import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Compass,
  Layers,
  Palette,
  Eye,
  Sparkles,
} from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/projects'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

// Extended design direction metadata for each concept
interface ProjectDesignProfile {
  colorPalette: { name: string; hex: string; role: string }[]
  typography: string
  photographyDirection: string
  uxFocus: string
  designRationale: string
}

const designProfiles: Record<string, ProjectDesignProfile> = {
  'az-self-drive': {
    colorPalette: [
      { name: 'Midnight Charcoal', hex: '#101827', role: 'Dominant dark foundation' },
      { name: 'Electric Lime', hex: '#C7F36B', role: 'High-contrast action accents' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'High-contrast technical text' },
      { name: 'Cool Slate', hex: '#6B7280', role: 'Secondary vehicle specifications' },
    ],
    typography:
      'Engineered geometric sans-serif with bold weights for vehicle models and tabular figures for daily rental rates.',
    photographyDirection:
      'Cinematic automotive photography showcasing rugged SUVs and vehicles in natural Northeast Indian terrain.',
    uxFocus:
      'Engineered a single-viewport discovery card architecture demonstrating upfront prototype daily rates, vehicle specifications, and a direct inquiry pathway.',
    designRationale:
      'Car rental users often encounter confusing deposit rules and ambiguous vehicle specs. This concept was designed to explore clean information hierarchy, highlighting sample daily tariffs, vehicle transmission details, and a clear enquiry pathway.',
  },
  'the-table': {
    colorPalette: [
      { name: 'Warm Terracotta', hex: '#D97706', role: 'Sensory appetite accent' },
      { name: 'Espresso Black', hex: '#1C1917', role: 'Intimate ambiance background' },
      { name: 'Warm Ivory', hex: '#F3F1EB', role: 'Editorial menu surface' },
      { name: 'Sage Leaf', hex: '#84CC16', role: 'Fresh botanical highlights' },
    ],
    typography:
      'Contemporary editorial serif for dining headlines and dish titles, paired with humanistic sans-serif for ingredient breakdowns.',
    photographyDirection:
      'Editorial, natural-light food photography highlighting Assamese botanicals, fresh river catch, and intimate dining spaces.',
    uxFocus:
      'Mobile-first digital menu architecture organized by courses with dietary indicators, paired with a demonstration table reservation enquiry flow.',
    designRationale:
      'Restaurant guests make dining decisions on mobile devices within minutes. By replacing static PDF menus with responsive, categorized courses and a direct reservation enquiry pathway, this design demonstrates how to present offerings and table requests with minimal friction.',
  },
  'the-grand-retreat': {
    colorPalette: [
      { name: 'Forest Deep', hex: '#14281D', role: 'Serene sanctuary tone' },
      { name: 'Warm Ivory', hex: '#F3F1EB', role: 'Generous breathing space' },
      { name: 'Soft Brass', hex: '#D4AF37', role: 'Restrained luxury accents' },
      { name: 'Stone Grey', hex: '#4B5563', role: 'Subtle architectural details' },
    ],
    typography:
      'Refined editorial serif evoking boutique hospitality heritage, supported by understated modern sans-serif navigation.',
    photographyDirection:
      'Sweeping landscape photography, villa architecture, private pools, and tea-garden vistas that evoke tranquility.',
    uxFocus:
      'Generous whitespace, room category showcase cards, sample tariff inclusions, and demonstration date-inquiry intake.',
    designRationale:
      'Boutique resorts often seek to strengthen their direct brand presence. This concept demonstrates a tranquil visual aesthetic with generous spatial breathing room, curated amenity showcases, and direct reservation enquiry pathways.',
  },
  'carepoint-clinic': {
    colorPalette: [
      { name: 'Clinical Navy', hex: '#0F2942', role: 'Authority and medical trust' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'Sterile, clean legibility' },
      { name: 'Calming Sage', hex: '#10B981', role: 'Healthcare reassuring indicator' },
      { name: 'Neutral Slate', hex: '#64748B', role: 'Consultation scheduling text' },
    ],
    typography:
      'Highly legible, accessible sans-serif with pronounced line height and clear contrast ratios optimized for all age groups.',
    photographyDirection:
      'Authentic medical consult environments, verified clinician portraits, and clear departmental signage.',
    uxFocus:
      'Clear access to practitioner credentials, specialization directories, simulated OPD consulting schedules, and demonstration appointment intake.',
    designRationale:
      'Patients seeking healthcare information need rapid clarity. The prototype layout prioritizes legibility and clinical structure, organizing practitioner profiles, clinic timings, and appointment request forms for immediate comprehension.',
  },
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()

  // Normalize slug to handle both hyphenated variants
  const normalizedSlug =
    slug === 'a-z-self-drive' ? 'az-self-drive' : slug || ''

  const project = projects.find(
    (p) => p.slug === normalizedSlug || p.id === normalizedSlug,
  )

  if (!project) {
    return (
      <PageMeta
        title="Concept Project Not Found — Sindee Infotech"
        description="The requested website concept project could not be found."
      >
        <div className="min-h-[70vh] flex flex-col items-center justify-center container-main text-center py-32">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">
            Error 404
          </span>
          <h1 className="text-heading-1 text-midnight mt-4">Concept Not Found</h1>
          <p className="text-body-large text-muted-dark mt-3 max-w-md">
            The concept project you are looking for does not exist or may have been relocated.
          </p>
          <div className="mt-8">
            <Button to="/portfolio" variant="dark">
              Return to Portfolio
            </Button>
          </div>
        </div>
      </PageMeta>
    )
  }

  const profile =
    designProfiles[project.id] || designProfiles['az-self-drive']

  const relatedProjects = projects.filter((p) => p.id !== project.id)

  return (
    <PageMeta
      title={`${project.title} — Concept Project Case Study | Sindee Infotech`}
      description={`Case study for ${project.title} (${project.category}). Hypothetical challenge, design direction, architecture rationale, and demonstrated features.`}
    >
      {/* SECTION 1: Project Introduction & Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-ivory border-b border-border">
        <div className="container-main">
          {/* Back link */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-dark hover:text-midnight transition-colors mb-8 focus-visible:ring-2 focus-visible:ring-lime rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider shadow-sm">
                Concept Project
              </span>
              <span className="text-xs font-mono text-muted uppercase tracking-widest">
                Concept // {project.number} • {project.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6 max-w-3xl leading-relaxed"
            >
              {project.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Large Visual Showcase */}
      <section className="py-12 md:py-20 bg-midnight text-white">
        <div className="container-main">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-midnight-light p-6 md:p-10">
            {/* Browser-style Chrome */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                <span className="ml-3 font-mono text-white/50 text-xs hidden sm:inline-block">
                  concept.sindeeinfotech.com / {project.slug}
                </span>
              </div>
              <span className="text-lime font-mono text-xs uppercase tracking-wider">
                Art Direction Showcase
              </span>
            </div>

            {/* Hero Image Container */}
            <div className="relative mt-8 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-midnight border border-white/10">
              <img
                src={project.image}
                alt={`${project.title} concept project preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-lime">
                    Design Concept
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 max-w-md">
                    {project.category}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono">
                  Concept Demonstration Only
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: The Challenge & Design Direction */}
      <section className="section-padding bg-warm-ivory border-t border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Challenge & Rationale */}
            <div className="lg:col-span-7 space-y-10">
              {/* Challenge */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-4">
                  <Compass className="w-4 h-4 text-midnight" />
                  <span>The Hypothetical Challenge</span>
                </div>
                <h2 className="text-heading-2 text-midnight mb-4">
                  The Problem We Explored
                </h2>
                <p className="text-body text-muted-dark leading-relaxed">
                  {project.challenge}
                </p>
                <div className="mt-6 p-5 rounded-2xl bg-warm-ivory/80 border border-border text-xs text-muted-dark leading-relaxed space-y-1.5">
                  <p className="font-bold text-midnight font-mono uppercase tracking-wider text-[11px]">
                    Concept Project Prototype Notice
                  </p>
                  <p>
                    This project is an original design concept developed to demonstrate UX architecture, visual art direction, and technical execution. All company names, sample tariffs, vehicle models, menu items, consulting schedules, and booking flows shown in this study are fictional prototype design elements. They do not represent operational pricing, actual availability, commercial results, or client endorsements.
                  </p>
                </div>
              </div>

              {/* Design Rationale */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-4">
                  <Eye className="w-4 h-4 text-midnight" />
                  <span>Design Rationale</span>
                </div>
                <h3 className="text-heading-2 text-midnight mb-4">
                  Why This Architecture Works
                </h3>
                <p className="text-body text-muted-dark leading-relaxed">
                  {profile.designRationale}
                </p>
              </div>

              {/* Strategic Approach */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-4">
                  <Layers className="w-4 h-4 text-midnight" />
                  <span>Strategic Approach</span>
                </div>
                <h3 className="text-heading-2 text-midnight mb-4">
                  UX & Content Strategy
                </h3>
                <p className="text-body text-muted-dark leading-relaxed">
                  {project.approach}
                </p>
              </div>
            </div>

            {/* Right Column: Specifications & Design Profile */}
            <div className="lg:col-span-5 space-y-8">
              {/* Design Direction Specifications */}
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-6">
                  <Palette className="w-4 h-4 text-midnight" />
                  <span>Design Direction</span>
                </div>

                {/* Color Palette */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-3">
                    Color Palette
                  </h4>
                  <div className="space-y-2.5">
                    {profile.colorPalette.map((col) => (
                      <div key={col.hex} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="font-semibold text-midnight">{col.name}</span>
                        </div>
                        <span className="font-mono text-muted">{col.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="mb-6 pt-6 border-t border-border">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-2">
                    Typography Treatment
                  </h4>
                  <p className="text-xs text-muted-dark leading-relaxed">
                    {profile.typography}
                  </p>
                </div>

                {/* Photography */}
                <div className="pt-6 border-t border-border">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-2">
                    Art & Photography
                  </h4>
                  <p className="text-xs text-muted-dark leading-relaxed">
                    {profile.photographyDirection}
                  </p>
                </div>
              </div>

              {/* Key Features Demonstrated */}
              <div className="bg-midnight text-white rounded-3xl p-8 md:p-10 border border-white/10">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-lime mb-4">
                  <Sparkles className="w-4 h-4 text-lime" />
                  <span>Demonstrated Features</span>
                </div>
                <h3 className="text-heading-3 text-white mb-6">
                  Included Prototype Capabilities
                </h3>

                <ul className="space-y-3.5">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-lime" />
                      </div>
                      <span className="text-xs text-muted-light leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button to="/contact" variant="primary" className="w-full justify-center">
                    Discuss a Similar Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Related Projects */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                Explore More
              </span>
              <h2 className="text-heading-2 text-midnight mt-2">
                Other Concept Projects
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-midnight hover:text-muted-dark transition-colors"
            >
              <span>View All Concepts</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                to={`/portfolio/${rel.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-warm-ivory/30 hover:border-midnight/40 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                  <img
                    src={rel.image}
                    alt={`${rel.title} concept project preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-lime text-midnight text-[10px] font-bold uppercase tracking-wider">
                      Concept
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-bold text-midnight group-hover:text-midnight/80 transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold text-midnight">
                    <span>Explore Concept</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-lime-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Closing CTA */}
      <section className="py-20 bg-midnight text-white">
        <div className="container-main text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-3 block">
            Start Your Engagement
          </span>
          <h2 className="text-heading-1 text-white">
            Have a similar project in mind?
          </h2>
          <p className="text-body-large text-muted-light mt-4">
            We build custom websites that present your business with authority, credibility, and thoughtful user experience.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/contact" variant="primary">
              Discuss Your Project
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
