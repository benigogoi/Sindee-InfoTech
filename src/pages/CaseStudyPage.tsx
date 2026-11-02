import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Layers, Compass, Code, ShieldCheck } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/projects'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <PageMeta
        title="Project Not Found — Sindee Infotech"
        description="The requested concept project could not be found."
      >
        <div className="min-h-[70vh] flex flex-col items-center justify-center container-main text-center py-32">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">Error 404</span>
          <h1 className="text-heading-1 text-midnight mt-4">Concept Not Found</h1>
          <p className="text-body-large text-muted-dark mt-3 max-w-md">
            The project you are looking for does not exist or may have been relocated.
          </p>
          <div className="mt-8">
            <Button to="/work" variant="dark">
              Return to Portfolio
            </Button>
          </div>
        </div>
      </PageMeta>
    )
  }

  return (
    <PageMeta
      title={`${project.title} — Design Concept Case Study | Sindee Infotech`}
      description={`Case study for ${project.title} (${project.category}). Overview, business challenge, design direction, and feature breakdown.`}
    >
      {/* Header / Intro */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-warm-ivory border-b border-border">
        <div className="container-main">
          {/* Back link */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-dark hover:text-midnight transition-colors mb-8"
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
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-lime text-midnight text-xs font-bold uppercase tracking-wider">
                Concept Project
              </span>
              <span className="text-xs font-mono text-muted uppercase tracking-widest">
                {project.number} // {project.category}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight tracking-tight">
              {project.title}
            </motion.h1>

            <motion.p variants={fadeUpVariants} className="text-body-large text-muted-dark mt-6 max-w-3xl leading-relaxed">
              {project.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Visual Composition Showcase */}
      <section className="py-16 md:py-24 bg-midnight text-white">
        <div className="container-main">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-midnight-light p-6 md:p-12">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                <span className="ml-3 font-mono text-white/50 text-xs">preview // {project.slug}.sindeeinfotech.com</span>
              </div>
              <span className="text-lime font-mono text-xs uppercase tracking-wider">Art-Directed Interface</span>
            </div>

            {/* Immersive Mockup Area with Real Photography */}
            <div className={`mt-8 min-h-[380px] md:min-h-[500px] rounded-2xl p-8 md:p-14 flex flex-col justify-between border border-white/10 relative overflow-hidden bg-midnight`}>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/40" />

              <div className="flex justify-between items-start z-10">
                <div className="bg-midnight/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                  <span className="text-xs uppercase tracking-widest text-lime font-bold">Concept Demonstration</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{project.title}</h2>
                  <p className="text-xs text-white/70 mt-1">{project.category}</p>
                </div>
                <div className="hidden sm:block text-right bg-midnight/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                  <span className="text-[11px] font-mono text-white/50 block">Target Audience</span>
                  <span className="text-xs font-semibold text-white">{project.industry} Seekers</span>
                </div>
              </div>

              {/* Central Mock Component */}
              <div className="my-8 z-10 bg-midnight/85 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/15 max-w-2xl mx-auto w-full shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-lime animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-lime">Core Digital Experience</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white mb-2">
                  Tailored Information Flow for {project.industry}
                </div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-6">
                  {project.approach}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60 block">Speed Score</span>
                    <span className="text-sm font-bold text-lime mt-0.5 block">98/100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60 block">Mobile Flow</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Zero Friction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-white/60 block">Enquiry CTA</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Direct WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80 z-10 pt-4 border-t border-white/10 bg-midnight/60 backdrop-blur-sm -mx-8 md:-mx-14 -mb-8 md:-mb-14 px-8 md:px-14 py-3">
                <span>Designed for commercial performance</span>
                <span className="text-lime font-mono">Production Ready Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="section-padding bg-warm-ivory">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Challenge & Approach */}
            <div className="lg:col-span-7 space-y-12">
              {/* The Challenge */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-4">
                  <Compass className="w-4 h-4 text-midnight" />
                  <span>The Challenge</span>
                </div>
                <h3 className="text-heading-2 text-midnight mb-5">
                  Overcoming Industry Friction
                </h3>
                <p className="text-body-large text-muted-dark leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Our Approach */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted mb-4">
                  <Layers className="w-4 h-4 text-midnight" />
                  <span>Strategic Approach</span>
                </div>
                <h3 className="text-heading-2 text-midnight mb-5">
                  Art Direction & UX Strategy
                </h3>
                <p className="text-body-large text-muted-dark leading-relaxed">
                  {project.approach}
                </p>
              </div>
            </div>

            {/* Right Column: Key Features */}
            <div className="lg:col-span-5">
              <div className="bg-midnight text-white rounded-3xl p-8 md:p-12 border border-white/10 sticky top-28">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-lime mb-4">
                  <Code className="w-4 h-4 text-lime" />
                  <span>Key Specifications</span>
                </div>
                <h3 className="text-heading-2 text-white mb-6">
                  Included Features
                </h3>

                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-lime" />
                      </div>
                      <span className="text-sm text-muted-light leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-muted-light mb-4">
                    <ShieldCheck className="w-4 h-4 text-lime" />
                    <span>Production-ready design architecture</span>
                  </div>
                  <Button to="/contact" variant="primary" className="w-full justify-center">
                    Discuss a Similar Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Projects Navigation */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-1">More Concepts</span>
              <h4 className="text-xl font-bold text-midnight">Explore another industry case study</h4>
            </div>
            <div className="flex items-center gap-4">
              <Button to="/work" variant="secondary">
                View All Concepts
              </Button>
              <Button to="/contact" variant="primary">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
