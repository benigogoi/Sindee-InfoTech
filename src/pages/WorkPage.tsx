import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, Car, Utensils, Hotel, Stethoscope, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects, type Project } from '@/data/projects'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

// Filter Categories
type CategoryFilter = 'All' | 'Hospitality' | 'Restaurant' | 'Automotive' | 'Healthcare'

const filterCategories: CategoryFilter[] = [
  'All',
  'Hospitality',
  'Restaurant',
  'Automotive',
  'Healthcare',
]

// Distinctive editorial mockups for each concept project
function ProjectPreviewCard({ project }: { project: Project }) {
  if (project.id === 'az-self-drive') {
    return (
      <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between text-white overflow-hidden bg-midnight">
        <img
          src={project.image}
          alt="A-Z Self Drive vehicle fleet concept preview"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center text-midnight font-bold text-xs">
              <Car className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-tight text-xs">A-Z Fleet</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider shadow-sm">
            Concept Project
          </span>
        </div>

        <div className="my-auto py-4 z-10 max-w-sm">
          <div className="bg-midnight/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-white">Mahindra Thar 4x4 (Sample Model)</span>
              <span className="text-lime text-xs font-bold font-mono">₹3,499 / day (Sample)</span>
            </div>
            <div className="flex gap-2 text-[10px] text-white/70">
              <span className="px-2 py-0.5 rounded bg-white/10">Manual</span>
              <span className="px-2 py-0.5 rounded bg-white/10">Diesel 4x4</span>
              <span className="px-2 py-0.5 rounded bg-lime/20 text-lime font-medium">Demonstration Booking</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3">
          <span>Fleet Hub: Demonstration Hub</span>
          <span className="text-lime font-medium">Concept Prototype</span>
        </div>
      </div>
    )
  }

  if (project.id === 'the-table') {
    return (
      <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between text-[#F3F1EB] overflow-hidden bg-midnight">
        <img
          src={project.image}
          alt="The Table contemporary restaurant concept preview"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-[#e27d60] flex items-center justify-center text-white font-bold text-xs">
              <Utensils className="w-3 h-3" />
            </div>
            <span className="font-serif italic tracking-wide text-xs">The Table</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider shadow-sm">
            Concept Project
          </span>
        </div>

        <div className="my-auto py-4 z-10 max-w-sm">
          <div className="bg-midnight/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#e27d60] font-semibold block">
              Curated Menu Experience
            </span>
            <div className="text-sm font-serif font-bold text-white">
              Seasonal Botanicals & Fresh River Catch
            </div>
            <p className="text-xs text-white/70 font-light">
              Interactive menu browsing and zero-friction table reservations.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3">
          <span>Service: Sample Dining Hours</span>
          <span className="text-lime font-medium">Concept Prototype</span>
        </div>
      </div>
    )
  }

  if (project.id === 'the-grand-retreat') {
    return (
      <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between text-white overflow-hidden bg-midnight">
        <img
          src={project.image}
          alt="The Grand Retreat luxury boutique resort concept preview"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center text-midnight font-bold text-xs">
              <Hotel className="w-3 h-3" />
            </div>
            <span className="font-serif tracking-wide text-xs">The Grand Retreat</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider shadow-sm">
            Concept Project
          </span>
        </div>

        <div className="my-auto py-4 z-10 max-w-sm">
          <div className="bg-midnight/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-lime font-semibold">
              Boutique Sanctuary
            </div>
            <div className="text-sm font-serif font-bold text-white">
              Private Hillview Pool Villa
            </div>
            <div className="flex gap-2 text-[10px] text-white/70 pt-1">
              <span className="px-2 py-0.5 rounded bg-white/10">Forest View</span>
              <span className="px-2 py-0.5 rounded bg-white/10">All-Inclusive</span>
              <span className="px-2 py-0.5 rounded bg-lime/20 text-lime font-medium">Demonstration Booking</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3">
          <span>Location: Prototype Retreat</span>
          <span className="text-lime font-medium">Concept Prototype</span>
        </div>
      </div>
    )
  }

  // CarePoint Clinic
  return (
    <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between text-white overflow-hidden bg-midnight">
      <img
        src={project.image}
        alt="CarePoint Clinic modern healthcare website concept preview"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0f2942] font-bold text-xs">
            <Stethoscope className="w-3 h-3" />
          </div>
          <span className="font-bold tracking-tight text-xs">CarePoint Clinic</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider shadow-sm">
          Concept Project
        </span>
      </div>

      <div className="my-auto py-4 z-10 max-w-sm">
        <div className="bg-midnight/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-lime font-semibold">
            Clinical Care Portal
          </div>
          <div className="text-sm font-bold text-white">
            Comprehensive Cardiology & Internal Medicine
          </div>
          <div className="flex gap-2 text-[10px] text-white/70 pt-1">
            <span className="px-2 py-0.5 rounded bg-white/10">Verified Doctors</span>
            <span className="px-2 py-0.5 rounded bg-white/10">OPD Timings</span>
            <span className="px-2 py-0.5 rounded bg-lime/20 text-lime font-medium">Demonstration Enquiry</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3">
        <span>OPD Hours: Sample Schedule</span>
        <span className="text-lime font-medium">Concept Prototype</span>
      </div>
    </div>
  )
}

export function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Hospitality') {
      return project.id === 'the-grand-retreat'
    }
    if (selectedCategory === 'Restaurant') {
      return project.id === 'the-table'
    }
    if (selectedCategory === 'Automotive') {
      return project.id === 'az-self-drive'
    }
    if (selectedCategory === 'Healthcare') {
      return project.id === 'carepoint-clinic'
    }
    return true
  })

  return (
    <PageMeta
      title="Portfolio — Selected Website Design Concepts | Sindee Infotech"
      description="Explore our original concept projects in hospitality, dining, automotive, and healthcare. Designed to demonstrate architectural craft and responsive execution."
    >
      {/* SECTION 1: Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-warm-ivory border-b border-border">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-midnight" />
              <span>Demonstrated Capabilities</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              Selected work. Different industries. One design philosophy.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6 max-w-2xl leading-relaxed"
            >
              Explore original website concepts created to demonstrate our approach to visual design, user experience and technical execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Category Filter Bar */}
      <section className="bg-warm-ivory border-b border-border py-6 sticky top-[72px] md:top-20 z-30 backdrop-blur-md bg-warm-ivory/95">
        <div className="container-main">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-mono uppercase text-muted tracking-wider mr-2 hidden sm:inline-block">
              Filter:
            </span>
            {filterCategories.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-midnight text-lime shadow-sm'
                      : 'bg-white text-muted-dark hover:text-midnight border border-border'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: Projects Gallery (Editorial Alternating Layout) */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="space-y-16 md:space-y-24">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isEven = index % 2 === 0
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-3xl border border-border bg-warm-ivory/30 overflow-hidden hover:border-midnight/30 transition-all duration-300"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                        !isEven ? 'lg:[direction:rtl]' : ''
                      }`}
                    >
                      {/* Visual Mockup Column */}
                      <div className={`lg:col-span-7 ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-midnight">
                          <ProjectPreviewCard project={project} />
                        </div>
                      </div>

                      {/* Content Column */}
                      <div
                        className={`p-8 lg:p-12 lg:col-span-5 flex flex-col justify-between ${
                          !isEven ? 'lg:[direction:ltr]' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                            <span className="px-2.5 py-1 rounded bg-midnight text-lime font-bold">
                              {project.number}
                            </span>
                            <span className="uppercase tracking-wider font-semibold">
                              {project.category}
                            </span>
                          </div>

                          <div className="mb-2">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-lime/20 text-midnight text-[11px] font-bold uppercase tracking-wider mb-2">
                              Concept Project
                            </span>
                          </div>

                          <h2 className="text-heading-1 text-midnight group-hover:text-midnight/90 transition-colors">
                            {project.title}
                          </h2>

                          <p className="text-body text-muted-dark mt-4 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Design Direction & Features */}
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-3 flex items-center gap-2">
                              <Layers className="w-3.5 h-3.5 text-lime-dark" />
                              <span>Key Concept Features</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.features.slice(0, 4).map((feat, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white text-midnight/80 text-xs rounded-full border border-border"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA Link */}
                        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                          <span className="text-xs font-mono text-muted uppercase">
                            Architecture Case
                          </span>
                          <Link
                            to={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight text-white hover:bg-midnight-light transition-colors text-sm font-semibold group/btn"
                          >
                            <span>View Concept</span>
                            <ArrowUpRight className="w-4 h-4 text-lime group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: Integrity & Transparency Statement */}
      <section className="py-16 bg-warm-ivory border-t border-b border-border">
        <div className="container-main max-w-3xl text-center">
          <span className="text-xs uppercase tracking-widest font-mono text-muted mb-2 block">
            Agency Transparency Standard
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-midnight">
            Authentic Concepts, Never Fabricated Results
          </h3>
          <p className="text-body text-muted-dark mt-3 leading-relaxed">
            The projects presented above are original design and architecture concepts crafted to illustrate our visual standards, user-flow planning, and technical execution. All company names, sample tariffs, service hours, and product details shown in these previews are fictional prototype elements for demonstration purposes only. We do not invent client results, commercial metrics, or fictitious client logos.
          </p>
        </div>
      </section>

      {/* SECTION 5: Closing CTA */}
      <section className="py-20 md:py-24 bg-midnight text-white">
        <div className="container-main text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-3 block">
            Next Steps
          </span>
          <h2 className="text-heading-1 text-white">
            Have a project in mind?
          </h2>
          <p className="text-body-large text-muted-light mt-4">
            Whether you operate in hospitality, healthcare, retail, automotive, or professional services, we build digital experiences designed for your audience.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/contact" variant="primary">
              Let's Discuss It
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
