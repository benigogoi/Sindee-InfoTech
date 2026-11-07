import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layers, Eye } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects, type Project } from '@/data/projects'
import { DemoPreviewModal } from '@/components/portfolio/DemoPreviewModal'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

// Filter Categories
type CategoryFilter =
  | 'All'
  | 'Digital Products'
  | 'Car Rentals'
  | 'Home Bakery'
  | 'Homestays & Resorts'
  | 'Healthcare'

const filterCategories: CategoryFilter[] = [
  'All',
  'Digital Products',
  'Car Rentals',
  'Home Bakery',
  'Homestays & Resorts',
  'Healthcare',
]

function ProjectCard({
  project,
  onOpenDemo,
}: {
  project: Project
  onOpenDemo: (project: Project) => void
}) {
  const isLive = project.status === 'Live'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border border-border bg-white overflow-hidden hover:border-midnight/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        {/* Visual Thumbnail - Clickable to open interactive demo */}
        <div
          onClick={() => onOpenDemo(project)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-midnight cursor-pointer group/img"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-95"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Quick-Preview Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
            <span className="px-3.5 py-1.5 rounded-xl bg-lime text-midnight text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5" />
              <span>Launch Live Demo</span>
            </span>
          </div>

          {/* Badges Overlay */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
            {isLive ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Product
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md text-lime text-[11px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                SME Showcase
              </span>
            )}

            {project.location && (
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono border border-white/10">
                {project.location}
              </span>
            )}
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
            <span className="text-[10px] uppercase font-mono tracking-wider text-lime font-bold block mb-0.5">
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-sm">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-muted-dark leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Feature Highlights */}
          <div className="space-y-1.5 pt-2 border-t border-border/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-lime-dark" />
              Key Features &amp; Workflow
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.highlights?.map((hl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md bg-warm-ivory text-midnight text-xs font-medium border border-border/80"
                >
                  {hl}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-border/70 flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-bold text-muted">
          #{project.number}
        </span>

        <div className="flex items-center gap-2">
          {/* Primary View Demo Action */}
          <button
            type="button"
            onClick={() => onOpenDemo(project)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lime text-midnight text-xs font-bold hover:bg-lime-dark transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Demo</span>
          </button>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-midnight/5 text-midnight text-xs font-semibold hover:bg-midnight/10 transition-colors border border-border"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [selectedDemo, setSelectedDemo] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDemo = (project: Project) => {
    setSelectedDemo(project)
    setIsModalOpen(true)
  }

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Digital Products') {
      return project.id === 'mystic-digits'
    }
    if (selectedCategory === 'Car Rentals') {
      return project.id === 'az-self-drive'
    }
    if (selectedCategory === 'Home Bakery') {
      return project.id === 'crumb-and-co'
    }
    if (selectedCategory === 'Homestays & Resorts') {
      return project.id === 'kaziranga-homestay'
    }
    if (selectedCategory === 'Healthcare') {
      return project.id === 'carepoint-clinic'
    }
    return true
  })

  return (
    <PageMeta
      title="Our Work — Websites & Digital Products | Sindee InfoTech"
      description="Explore our portfolio of verified digital products and practical website solutions built for regional businesses, home bakers, car rentals, eco-homestays, and clinics across Assam and Northeast India."
      canonicalUrl="https://sindeeinfotech.com/portfolio"
    >
      {/* SECTION 1: Hero */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 bg-warm-ivory border-b border-border">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-midnight" />
              <span>Real Work &amp; SME Solutions</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              Selected Work Built for Real Businesses.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-4 max-w-2xl leading-relaxed"
            >
              From custom software platforms like MysticDigits to clean booking websites for local car rentals, home bakers, and nature homestays in Assam, we build digital products that move businesses forward.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Category Filter Bar */}
      <section className="bg-warm-ivory border-b border-border py-4 sm:py-5 sticky top-[56px] md:top-[64px] z-30 backdrop-blur-md bg-warm-ivory/95">
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

      {/* SECTION 3: Projects Gallery (Compact Card Grid) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDemo={handleOpenDemo}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Interactive Demo Popup Modal */}
      <DemoPreviewModal
        project={selectedDemo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* SECTION 4: SME Transparency & Client Commitment */}
      <section className="py-14 sm:py-16 bg-warm-ivory border-t border-b border-border">
        <div className="container-main max-w-3xl text-center">
          <span className="text-xs uppercase tracking-widest font-mono text-muted mb-2 block font-semibold">
            Our Approach to Local Businesses
          </span>
          <h2 className="text-heading-2 text-midnight font-bold">
            Honest Engineering for Growing Companies
          </h2>
          <p className="text-body text-muted-dark mt-3 leading-relaxed">
            Every business has distinct operational requirements. Whether you need a WhatsApp order builder for a boutique bakery, a 4x4 fleet booking interface, or an automated digital product pipeline, we design around your practical business goals without charging for unnecessary complexity.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/contact" variant="primary">
              Discuss Your Project
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
