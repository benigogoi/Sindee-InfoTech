import { motion } from 'framer-motion'
import { Sparkles, Shield } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

export function AboutPage() {
  const beliefs = [
    {
      num: '01',
      title: 'Clarity over novelty',
      desc: 'Flashy animations that confuse visitors waste potential. We believe the highest form of design is clear communication that moves users toward action with confidence.',
    },
    {
      num: '02',
      title: 'Crafted, never assembled',
      desc: 'We do not sell pre-made templates stuffed with bloat. Each project is architected with purpose, responsive from day one, and built for performance.',
    },
    {
      num: '03',
      title: 'Radical transparency',
      desc: 'No vague pricing, no hidden hosting lock-ins, and no technical jargon designed to confuse. We believe in direct, honest partnerships.',
    },
    {
      num: '04',
      title: 'Real-world utility',
      desc: 'A website should be an active asset for your business — generating leads, booking tables, showcasing inventory, or establishing authority in your community.',
    },
  ]

  const workflowSteps = [
    {
      title: 'Direct Collaborative Discovery',
      desc: 'We speak directly with you to understand your customers, unique market strengths, and exact objectives.',
    },
    {
      title: 'Intentional Prototyping & Design',
      desc: 'We define the content hierarchy, typography, visual voice, and interactive flow before writing a line of code.',
    },
    {
      title: 'Modern Engineered Development',
      desc: 'Clean code built with React, Vite, and modern CSS — fast, secure, and ready for all modern browsers.',
    },
    {
      title: 'Handover & Dedicated Guidance',
      desc: 'We guide you through launch, set up domain records, test all forms, and remain available for support.',
    },
  ]

  return (
    <PageMeta
      title="About Us — Technology Meets Thoughtful Design | Sindee Infotech"
      description="Sindee Infotech was built around a simple belief: every business deserves a professional digital presence. Learn about our philosophy, values, and commitments."
    >
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-warm-ivory border-b border-border">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-midnight" />
              Our Story & Ethos
            </motion.div>

            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight tracking-tight">
              Technology meets thoughtful design.
            </motion.h1>

            <motion.div variants={fadeUpVariants} className="mt-8 space-y-6 text-body-large text-muted-dark leading-relaxed">
              <p className="text-xl md:text-2xl font-medium text-midnight leading-snug">
                Sindee Infotech was built around a simple belief: every business deserves a professional digital presence.
              </p>
              <p>
                We combine design thinking, modern technology and a practical understanding of business needs to create websites that are not only visually engaging but genuinely useful.
              </p>
              <p>
                Our focus is simple — understand the business, build the right solution and deliver an experience that customers can trust.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: Our Philosophy */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Core Foundation</span>
              <h2 className="text-heading-1 text-midnight mt-3">
                Our Philosophy
              </h2>
              <div className="w-12 h-1 bg-lime mt-4 rounded-full" />
              
              <div className="mt-8 relative rounded-2xl overflow-hidden shadow-xl border border-border">
                <img
                  src="/images/about/design-process.jpg"
                  alt="Thoughtful digital design process"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-midnight/80 to-transparent p-4 text-xs text-white/90">
                  Design thinking tailored for real-world business objectives
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-body text-muted-dark leading-relaxed">
              <p className="text-lg text-midnight font-medium">
                We believe the Indian small and medium business sector deserves international-grade digital presentation without enterprise agency overhead.
              </p>
              <p>
                Too many growing businesses end up with websites that look identical to a hundred others — slow, uninspired, and disconnected from what their customers actually care about.
              </p>
              <p>
                We reject that shortcut. By treating each project as a custom architectural endeavor, we craft digital storefronts, booking platforms, and company profiles that stand out in crowded markets.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-border">
                  <img
                    src="/images/about/studio.jpg"
                    alt="Creative workspace"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 bg-warm-ivory text-xs font-mono text-muted-dark">
                    Craftsmanship & Precision
                  </div>
                </div>
                <div className="p-6 bg-warm-ivory rounded-xl border border-border flex flex-col justify-center">
                  <span className="text-2xl font-bold text-midnight font-mono">100%</span>
                  <span className="text-xs text-muted-dark mt-1 font-medium">Bespoke Code & Layouts</span>
                  <p className="text-xs text-muted-dark/80 mt-2">
                    Every project is written from the ground up for speed and longevity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What We Believe */}
      <section className="section-padding bg-warm-ivory">
        <div className="container-main">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">Values & Principles</span>
            <h2 className="text-heading-1 text-midnight mt-3">
              What We Believe
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              These principles guide how we critique our own work and collaborate with business owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((belief) => (
              <motion.div
                key={belief.num}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-border flex flex-col justify-between hover:border-midnight/30 transition-colors"
              >
                <div>
                  <span className="text-sm font-mono font-bold text-lime-dark bg-warm-ivory px-3 py-1 rounded-lg inline-block mb-6">
                    {belief.num}
                  </span>
                  <h3 className="text-heading-3 text-midnight">
                    {belief.title}
                  </h3>
                  <p className="text-body text-muted-dark mt-3 leading-relaxed">
                    {belief.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: How We Work */}
      <section className="section-padding bg-midnight text-white">
        <div className="container-main">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime">Execution Flow</span>
            <h2 className="text-heading-1 text-white mt-3">
              How We Work
            </h2>
            <p className="text-body-large text-muted-light mt-4">
              A collaborative, calm, and transparent dynamic throughout your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-midnight-light border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-lime font-bold mb-4">
                    PHASE 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Commitment */}
      <section className="section-padding bg-warm-ivory border-t border-border">
        <div className="container-main">
          <div className="bg-white rounded-3xl p-8 md:p-14 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted">
                  <Shield className="w-4 h-4 text-midnight" />
                  <span>Our Commitment to You</span>
                </div>
                <h3 className="text-heading-2 text-midnight">
                  Honest guidance, clean code, zero lock-ins.
                </h3>
                <p className="text-body text-muted-dark leading-relaxed">
                  When you work with Sindee Infotech, you retain full ownership of your code, assets, domain records, and data. We build websites that are fast, accessible, and easily maintainable. If something doesn't make commercial sense for your current stage, we will openly tell you.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Button to="/contact" variant="dark">
                  Start a Conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-warm-ivory text-center">
        <div className="container-main max-w-2xl mx-auto">
          <h2 className="text-heading-2 text-midnight">
            Ready to partner on your next digital step?
          </h2>
          <p className="text-body text-muted-dark mt-3">
            Tell us about your business goals and let's explore what we can build together.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/contact" variant="primary">
              Contact Sindee Infotech
            </Button>
            <Button to="/work" variant="secondary">
              Review Selected Work
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
