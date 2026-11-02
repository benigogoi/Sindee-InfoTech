import { motion } from 'framer-motion'
import { Check, Sparkles, Globe, RefreshCw, Wrench, Shield } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import {
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
  staggerContainerVariants,
  staggerFastContainerVariants,
} from '@/lib/animations'

// Visual composition themed to each service with real photography and UI chrome
function ServiceVisual({ serviceId, index }: { serviceId: string; index: number }) {
  const service = services.find((s) => s.id === serviceId)
  const image = service?.image || '/images/services/business-websites.jpg'

  return (
    <motion.div
      variants={index % 2 === 0 ? slideInRightVariants : slideInLeftVariants}
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-midnight aspect-[4/3] md:aspect-auto md:h-[480px] group"
    >
      <img
        src={image}
        alt={service?.title || 'Service preview'}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30 p-6 md:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span>Service // 0{index + 1}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-lime text-midnight">
            Custom Architecture
          </span>
        </div>

        <div className="bg-midnight/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-lime block">
            Quality Standard
          </span>
          <p className="text-sm md:text-base font-bold text-white leading-snug">
            {service?.shortDescription}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-white/70 border-t border-white/10">
            <span className="text-lime font-bold">✓</span>
            <span>Mobile-First Responsive</span>
            <span className="text-white/30">•</span>
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const serviceIcons: Record<string, React.ReactNode> = {
  'business-websites': <Globe className="w-5 h-5" />,
  ecommerce: <Sparkles className="w-5 h-5" />,
  'website-redesign': <RefreshCw className="w-5 h-5" />,
  'custom-solutions': <Wrench className="w-5 h-5" />,
  'website-maintenance': <Shield className="w-5 h-5" />,
}

export function ServicesPage() {
  return (
    <PageMeta
      title="Our Services — Sindee Infotech"
      description="From business websites to custom web solutions, we build digital experiences that help your business grow."
    >
      {/* Hero Section */}
      <section className="bg-warm-ivory section-padding pt-32 md:pt-40">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p variants={fadeUpVariants} className="text-label text-muted mb-6">
              What We Do
            </motion.p>
            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight">
              Our Services
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-body-large text-muted-dark mt-6 max-w-2xl">
              We design and build digital experiences that help businesses look credible, 
              connect with their customers, and grow. Every project is approached with care, 
              craft, and commercial purpose.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <div className="space-y-0">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0
          const isDark = index % 2 !== 0

          return (
            <section
              key={service.id}
              id={service.id}
              className={`section-padding ${
                isDark ? 'bg-white' : 'bg-warm-ivory'
              } border-t border-border`}
            >
              <div className="container-main">
                <motion.div
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isReversed ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  {/* Visual Side */}
                  <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                    <ServiceVisual serviceId={service.id} index={index} />
                  </div>

                  {/* Content Side */}
                  <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                    <motion.div variants={staggerContainerVariants}>
                      <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-10 h-10 bg-lime/20 text-midnight rounded-xl">
                          {serviceIcons[service.id]}
                        </span>
                        <span className="text-label text-muted">{service.number}</span>
                      </motion.div>

                      <motion.h2
                        variants={fadeUpVariants}
                        className="text-heading-1 text-midnight mb-5"
                      >
                        {service.title}
                      </motion.h2>

                      <motion.p
                        variants={fadeUpVariants}
                        className="text-body-large text-muted-dark mb-8 leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div variants={fadeUpVariants} className="mb-8">
                        <h3 className="text-label text-midnight mb-4">What&rsquo;s Included</h3>
                        <motion.ul
                          variants={staggerFastContainerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5"
                        >
                          {service.features.map((feature) => (
                            <motion.li
                              key={feature}
                              variants={fadeUpVariants}
                              className="flex items-start gap-2.5 text-body text-midnight/80"
                            >
                              <Check className="w-4 h-4 text-lime-dark mt-1 flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>

                      {/* Ideal For */}
                      <motion.div variants={fadeUpVariants} className="mb-8">
                        <h3 className="text-label text-midnight mb-4">Ideal For</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.idealFor.map((item) => (
                            <span
                              key={item}
                              className="px-3.5 py-1.5 bg-warm-ivory text-midnight/70 text-[0.8125rem] rounded-full border border-border"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Deliverables */}
                      <motion.div variants={fadeUpVariants} className="mb-10">
                        <h3 className="text-label text-midnight mb-4">Deliverables</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((item) => (
                            <span
                              key={item}
                              className="px-3.5 py-1.5 bg-midnight/5 text-midnight/70 text-[0.8125rem] rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* CTA */}
                      <motion.div variants={fadeUpVariants}>
                        <Button to="/contact" variant="dark">
                          Discuss This Service
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Distinction Section: Included vs Optional */}
      <section className="bg-warm-ivory section-padding border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-heading-2 text-midnight mb-4">
              Clear Boundaries, No Surprises
            </h2>
            <p className="text-body-large text-muted-dark">
              We believe in complete transparency about what is covered in our projects 
              and what requires additional tools or subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Always Included */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-dark" />
                <h3 className="text-heading-3 text-midnight">Always Included</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Custom design tailored to your brand',
                  'Mobile, tablet, and desktop responsive layouts',
                  'Clean, semantic, accessible HTML',
                  'On-page SEO fundamentals and meta tags',
                  'Performance optimisation for fast loading',
                  'Testing across modern browsers and devices',
                  'Deployment assistance to your hosting provider',
                  'Post-launch support and handover period',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body text-muted-dark">
                    <Check className="w-4 h-4 text-lime-dark mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional / Third-Party */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                <h3 className="text-heading-3 text-midnight">Optional / Separate Costs</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Domain name registration (annual fee to registrar)',
                  'Web hosting server costs (billed by host)',
                  'Paid third-party plugins, themes, or extensions',
                  'Payment gateway transaction fees (Razorpay, etc.)',
                  'Professional copywriting and translation services',
                  'Stock photography licences (if required)',
                  'Ongoing content creation and social media management',
                  'Custom integrations with proprietary enterprise software',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body text-muted-dark">
                    <span className="w-4 h-4 rounded-full bg-muted/20 text-muted text-[10px] flex items-center justify-center mt-1 flex-shrink-0">
                      &bull;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-midnight text-white section-padding">
        <div className="container-main text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-heading-1 text-white mb-6">
              Not sure which service you need?
            </h2>
            <p className="text-body-large text-muted-light mb-10">
              Let&rsquo;s have a conversation. We will listen to where your business is today, 
              what you want to achieve, and recommend the right approach.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/contact" variant="primary">
                Let&rsquo;s Talk
              </Button>
              <Button to="/work" variant="secondary" className="border-border-dark text-white hover:border-white hover:bg-white hover:text-midnight">
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
