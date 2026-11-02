import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Car, Utensils, Hotel, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects, type Project } from '@/data/projects'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

// Visual Mockup for each project in Work list using real imagery
function ProjectMockup({ project }: { project: Project }) {
  if (project.id === 'az-self-drive') {
    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between text-white overflow-hidden bg-midnight">
        {/* Real photography background */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/40" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center text-midnight font-bold text-xs">
              <Car className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-tight text-xs">A-Z Fleet</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-white/90">
            Automotive UI
          </span>
        </div>

        {/* Mock Car Showcase */}
        <div className="my-auto py-2 z-10">
          <div className="bg-midnight/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-semibold text-white">Mahindra Thar 4x4 Hardtop</span>
              <span className="text-lime text-xs font-bold font-mono">₹3,499 / day</span>
            </div>
            <div className="flex gap-2 text-[10px] text-white/70 mt-2">
              <span className="px-2 py-0.5 rounded bg-white/10">Manual</span>
              <span className="px-2 py-0.5 rounded bg-white/10">Diesel</span>
              <span className="px-2 py-0.5 rounded bg-lime/20 text-lime font-medium">Instant Reserve</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 -mb-6 px-6 py-2.5">
          <span>Fleet Dispatch: Guwahati • Shillong</span>
          <span className="text-lime font-medium">Live Concept</span>
        </div>
      </div>
    )
  }

  if (project.id === 'the-table') {
    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between text-[#F3F1EB] overflow-hidden bg-midnight">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/40" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-[#e27d60] flex items-center justify-center text-white font-bold text-xs">
              <Utensils className="w-3 h-3" />
            </div>
            <span className="font-serif italic tracking-wide text-xs">The Table</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-white/90">
            Dining Experience
          </span>
        </div>

        <div className="my-auto py-2 z-10">
          <div className="bg-midnight/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-1.5">
            <div className="text-[10px] uppercase tracking-widest text-[#e27d60] font-semibold">Tasting Menu</div>
            <div className="text-sm font-serif font-bold text-white">Smoked River Trout with Assamese Botanicals</div>
            <div className="text-xs text-white/70 leading-relaxed font-light">
              Table reservation system with instant WhatsApp confirmation.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 -mb-6 px-6 py-2.5">
          <span>7:00 PM – 11:30 PM Service</span>
          <span className="text-lime font-medium">Live Concept</span>
        </div>
      </div>
    )
  }

  if (project.id === 'the-grand-retreat') {
    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between text-white overflow-hidden bg-midnight">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/40" />

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center text-midnight font-bold text-xs">
              <Hotel className="w-3 h-3" />
            </div>
            <span className="font-serif tracking-wide text-xs">The Grand Retreat</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-white/90">
            Resort Portal
          </span>
        </div>

        <div className="my-auto py-2 z-10">
          <div className="bg-midnight/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl">
            <div className="text-[10px] uppercase tracking-widest text-lime font-semibold mb-1">Tea Garden Villa</div>
            <div className="text-sm font-serif font-bold text-white mb-2">Private Infinity Pool Overlooking Hills</div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px]">
              <div>
                <span className="text-white/50 block">Guests</span>
                <span className="font-semibold text-white">Up to 4</span>
              </div>
              <div>
                <span className="text-white/50 block">Sanctuary</span>
                <span className="font-semibold text-white">Forest View</span>
              </div>
              <div>
                <span className="text-white/50 block">Experience</span>
                <span className="font-semibold text-lime">All Inclusive</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 -mb-6 px-6 py-2.5">
          <span>Hillview Estate, Assam</span>
          <span className="text-lime font-medium">Live Concept</span>
        </div>
      </div>
    )
  }

  // CarePoint Clinic
  return (
    <div className="relative w-full h-full p-6 flex flex-col justify-between text-white overflow-hidden bg-midnight">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/40" />

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0f2942] font-bold text-xs">
            <Stethoscope className="w-3 h-3" />
          </div>
          <span className="font-bold tracking-tight text-xs">CarePoint Clinic</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-white/90">
          Healthcare Portal
        </span>
      </div>

      <div className="my-auto py-2 z-10">
        <div className="bg-midnight/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-lime">Cardiology & Internal Medicine</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Available Today</span>
          </div>
          <div className="text-sm font-bold text-white">Dr. A. Sarma, MD, FACC</div>
          <p className="text-xs text-white/70 line-clamp-2">
            Senior Consultant with over 18 years in comprehensive clinical medicine.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 z-10 bg-midnight/60 backdrop-blur-sm -mx-6 -mb-6 px-6 py-2.5">
        <span>OPD Timings: 9 AM - 6 PM</span>
        <span className="text-lime font-medium">Live Concept</span>
      </div>
    </div>
  )
}

export function WorkPage() {
  return (
    <PageMeta
      title="Our Work — Selected Design Concepts | Sindee Infotech"
      description="Explore our concept projects showcasing industry-specific website design, conversion strategy, and technical craftsmanship for Indian businesses."
    >
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-ivory border-b border-border">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-midnight" />
              Creative Portfolio
            </motion.div>
            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight tracking-tight">
              Selected Work
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-body-large text-muted-dark mt-5 leading-relaxed">
              Every project below is an original design concept developed to demonstrate what ambitious digital presence looks like for specific sectors — automotive, restaurants, boutique hospitality, and healthcare.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-dark">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span>Full case studies available for each concept below</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-warm-ivory">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-border hover:border-midnight/40 hover:shadow-2xl transition-all duration-500"
              >
                {/* Visual Preview */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-midnight">
                  <ProjectMockup project={project} />
                  
                  {/* Overlay badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-lime text-midnight text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                      Concept Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted uppercase tracking-wider mb-3">
                      <span>{project.number}</span>
                      <span>{project.industry}</span>
                    </div>

                    <h2 className="text-heading-2 text-midnight group-hover:text-midnight transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-body text-muted-dark mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-8 border-t border-border/70 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-dark">
                      {project.category}
                    </span>
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-midnight group-hover:text-lime-dark transition-colors"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty & Trust Note */}
      <section className="py-14 bg-white border-t border-b border-border">
        <div className="container-main max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest font-mono text-muted mb-2">Transparency Standard</p>
          <h3 className="text-xl font-bold text-midnight">No Fabricated Metrics or Fictitious Clients</h3>
          <p className="text-sm text-muted-dark mt-3 leading-relaxed">
            We hold ourselves to strict integrity. The concepts shown above demonstrate our architectural capabilities, art direction, and coding standards. When we partner with your business, your live project will join our verified client gallery.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-midnight text-white">
        <div className="container-main text-center max-w-2xl mx-auto">
          <h2 className="text-heading-1 text-white">
            Have a project in mind for your industry?
          </h2>
          <p className="text-body-large text-muted-light mt-4">
            Whether you operate a resort, clinic, dealership, boutique, or local service enterprise, we craft digital experiences made for your specific audience.
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
