import { motion } from 'framer-motion'
import {
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

export function AboutPage() {
  const principles = [
    {
      number: '01',
      title: 'Design with Purpose',
      description:
        'Every layout choice, typography pairing, and visual element must serve a clear business or user objective. We do not design decoration for its own sake.',
    },
    {
      number: '02',
      title: 'Built for Real People',
      description:
        'Websites should be intuitive to navigate, easy to read on any smartphone, and accessible to everyone. Clarity always wins over unnecessary novelty.',
    },
    {
      number: '03',
      title: 'Engineering Matters',
      description:
        'A beautiful website must also be responsive, reliable, fast, and maintainable. We build with clean, modern code that stands up to real-world usage.',
    },
    {
      number: '04',
      title: 'Long-Term Partnership',
      description:
        'Our relationship does not end on launch day. We guide you through domain setup, handover, and ongoing technical maintenance as your business evolves.',
    },
  ]

  const workflowSteps = [
    {
      number: '01',
      title: 'Understand the Business',
      desc: 'We listen to your commercial objectives, customer profiles, competitive landscape, and primary conversion targets.',
    },
    {
      number: '02',
      title: 'Define the Requirements',
      desc: 'We map out the required sitemap, page features, integrations, and content scope with clear commercial boundaries.',
    },
    {
      number: '03',
      title: 'Plan the Experience',
      desc: 'We establish information architecture and user journeys so visitors find critical details in seconds.',
    },
    {
      number: '04',
      title: 'Design & Develop',
      desc: 'We engineer bespoke layouts and responsive components with clean code, typography, and purposeful visual design.',
    },
    {
      number: '05',
      title: 'Test & Refine',
      desc: 'We verify performance across real mobile devices, browsers, and screen viewports, resolving every bug.',
    },
    {
      number: '06',
      title: 'Launch & Hand Over',
      desc: 'We configure DNS records, deploy the production site, provide clear documentation, and grant you 100% asset ownership.',
    },
  ]

  const differentiators = [
    {
      title: 'Direct Communication',
      desc: 'You work directly with the designers and engineers building your website. No account managers or convoluted agency layers.',
    },
    {
      title: 'Design & Code Under One Workflow',
      desc: 'We bridge aesthetics and technical execution seamlessly. What is designed is built to exact specifications without translation loss.',
    },
    {
      title: 'Business-Focused Thinking',
      desc: 'We focus on what drives commercial success: customer trust, clear offerings, easy contact, and high conversion.',
    },
    {
      title: 'Transparent Project Scope',
      desc: 'Fixed quotations, clear revision windows, and itemized third-party costs. You always know what is included.',
    },
    {
      title: 'Practical, Long-Lasting Solutions',
      desc: 'We avoid fragile plugins and bloated site builders, choosing stable, modern web technologies built to last.',
    },
    {
      title: 'Meticulous Attention to Detail',
      desc: 'From mobile tap targets to typographic scale, we inspect every detail before your customers ever see it.',
    },
  ]

  return (
    <PageMeta
      title="About Us — Digital Product & Software Development | Sindee InfoTech"
      description="Sindee InfoTech is a digital product and software development company. We turn business ideas into powerful digital experiences across web, mobile and custom software."
      canonicalUrl="https://sindeeinfotech.com/about"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-midnight" />
              <span>Company Philosophy &amp; Ethos</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              Great digital products don&apos;t happen by accident.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6 max-w-2xl leading-relaxed"
            >
              We bring design clarity, business strategy and engineering rigor together to create digital solutions that solve real business problems and scale with your ambition.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Our Philosophy */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Manifesto */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                Our Point of View
              </span>
              <h2 className="text-heading-1 text-midnight">
                A website should do more than look attractive.
              </h2>
              <div className="w-12 h-1 bg-lime rounded-full" />
              <p className="text-body text-muted-dark leading-relaxed">
                Too many growing businesses end up with websites that look identical to a hundred others — uninspired, sluggish, and disconnected from the real questions their customers have.
              </p>
              <p className="text-body text-muted-dark leading-relaxed">
                We believe that a professional business website is an active asset. It must communicate clearly, build trust immediately, and make it effortless for customers to choose you.
              </p>
            </div>

            {/* Right Column: Six Pillars of Utility */}
            <div className="lg:col-span-7 bg-warm-ivory/50 rounded-3xl p-8 md:p-12 border border-border">
              <h3 className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-6">
                What Every Website Must Achieve
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Communicate Clearly',
                    desc: 'Explain what you offer in plain, compelling language without jargon.',
                  },
                  {
                    title: 'Build Immediate Trust',
                    desc: 'Project professionalism through thoughtful design, typography, and verified details.',
                  },
                  {
                    title: 'Make Information Accessible',
                    desc: 'Ensure contact details, pricing, and services are accessible in one click.',
                  },
                  {
                    title: 'Work Across All Devices',
                    desc: 'Deliver a flawless experience on smartphones, tablets, and desktops.',
                  },
                  {
                    title: 'Help Customers Take Action',
                    desc: 'Guide visitors naturally toward phone calls, WhatsApp inquiries, or contact forms.',
                  },
                  {
                    title: 'Support Business Growth',
                    desc: 'Scale smoothly as you add new services, inventory, or locations.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-dark shrink-0" />
                      <h4 className="text-sm font-bold text-midnight">{item.title}</h4>
                    </div>
                    <p className="text-xs text-muted-dark pl-3.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: What We Believe In */}
      <section className="section-padding bg-warm-ivory">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Guiding Principles
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              What We Believe In
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              These four principles guide every design review, code commit, and client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="bg-white rounded-3xl p-8 md:p-10 border border-border flex flex-col justify-between hover:border-midnight/30 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-midnight bg-lime px-3 py-1 rounded-md inline-block mb-6">
                    {principle.number}
                  </span>
                  <h3 className="text-heading-2 text-midnight mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-body text-muted-dark leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: How We Work */}
      <section className="section-padding bg-midnight text-white">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime">
              Structured Execution
            </span>
            <h2 className="text-heading-1 text-white mt-3">
              How We Work
            </h2>
            <p className="text-body-large text-muted-light mt-4">
              A transparent, calm workflow designed to deliver high-quality outcomes on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="bg-midnight-light border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-lime font-bold mb-4 block">
                    STAGE // {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Sindee Infotech */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              The Specialist Advantage
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              Why Sindee Infotech
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              We are a specialist web design and development studio. We focus on doing one thing exceptionally well: building high-performance websites for businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-warm-ivory/50 border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-midnight text-lime flex items-center justify-center text-xs font-mono font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-midnight mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-muted-dark leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Ownership Commitment */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-warm-ivory border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-midnight" />
                  <span>Our Independence Guarantee</span>
                </div>
                <h4 className="text-xl font-bold text-midnight">
                  100% Asset & Code Ownership
                </h4>
                <p className="text-sm text-muted-dark leading-relaxed">
                  You own your domain, hosting account, source code, and content. We never lock you into proprietary closed platforms or hold your digital presence hostage.
                </p>
              </div>
              <Button to="/contact" variant="dark" className="shrink-0">
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Final CTA */}
      <section className="bg-midnight text-white section-padding">
        <div className="container-main text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-3 block">
            Let's Collaborate
          </span>
          <h2 className="text-display text-white">
            Let's create something worth remembering.
          </h2>
          <p className="text-body-large text-muted-light mt-4">
            Tell us about your business goals and let's explore how thoughtful website design can help you grow.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/contact" variant="primary">
              Start a Conversation
            </Button>
            <Button
              to="/portfolio"
              variant="secondary"
              className="border-border-dark text-white hover:border-white hover:bg-white hover:text-midnight"
            >
              Explore Our Concepts
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
