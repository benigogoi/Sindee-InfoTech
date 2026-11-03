import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Globe,
  Hotel,
  Utensils,
  Car,
  Stethoscope,
  Briefcase,
  ChevronDown,
} from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/animations'

// Industry solutions data
interface IndustrySolution {
  id: string
  name: string
  icon: React.ReactNode
  challenge: string
  objective: string
  functionality: string[]
  benefit: string
}

const industrySolutions: IndustrySolution[] = [
  {
    id: 'hospitality',
    name: 'Hospitality, Resorts & Homestays',
    icon: <Hotel className="w-5 h-5" />,
    challenge:
      'High reliance on third-party OTA commissions and difficulties communicating property character through standard listing cards.',
    objective:
      'Create an immersive digital sanctuary that inspires travel, showcases room categories, and encourages direct booking enquiries.',
    functionality: [
      'High-resolution property and room visual showcases',
      'Direct reservation enquiry form with WhatsApp integration',
      'Interactive location map, local attractions, and itinerary guides',
      'Transparent amenities, seasonal tariffs, and guest policies',
    ],
    benefit:
      'Strengthens direct booking share and presents an elevated guest experience before arrival.',
  },
  {
    id: 'dining',
    name: 'Restaurants & Cafes',
    icon: <Utensils className="w-5 h-5" />,
    challenge:
      'Static PDF menus that are frustrating on mobile devices, alongside uncoordinated reservation phone calls during rush hours.',
    objective:
      'Provide a fast, appetizing menu browsing experience and a low-friction table reservation flow accessible on any smartphone.',
    functionality: [
      'Mobile-optimized digital menu with category filtering and dietary indicators',
      'Direct table reservation enquiries sent to staff WhatsApp or email',
      'Operating hours, location directions, and private dining information',
      'Chef story and culinary philosophy presentation',
    ],
    benefit:
      'Elevates dining appeal, reduces customer ordering friction, and simplifies reservations.',
  },
  {
    id: 'automotive',
    name: 'Automotive & Car Rentals',
    icon: <Car className="w-5 h-5" />,
    challenge:
      'Uncertainty about vehicle condition, obscure pricing structures, and complex booking steps that deter potential renters.',
    objective:
      'Display the fleet with transparent rental rates, clear vehicle specifications, and a confidence-building reservation enquiry.',
    functionality: [
      'Detailed vehicle catalogue with transmission, seating, and fuel specs',
      'Clear daily and weekly rental tariff display without hidden fees',
      'Quick reservation request with pickup and return date selectors',
      'Required documentation guidelines and rental terms',
    ],
    benefit:
      'Builds immediate customer confidence and accelerates rental booking decisions.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinics',
    icon: <Stethoscope className="w-5 h-5" />,
    challenge:
      'Patients struggle to find verified doctor credentials, available consulting hours, and straightforward appointment procedures.',
    objective:
      'Establish a reassuring, clinically organized digital presence where patients can discover specializations and book consultations.',
    functionality: [
      'Comprehensive doctor profiles with qualifications and areas of care',
      'OPD consulting schedule and department breakdowns',
      'Direct appointment request form with department selection',
      'Clinic location directions, clinic timings, and emergency guidelines',
    ],
    benefit:
      'Establishes medical credibility, reduces patient anxiety, and organizes enquiry intake.',
  },
  {
    id: 'professional',
    name: 'Professional Services & Consultancies',
    icon: <Briefcase className="w-5 h-5" />,
    challenge:
      'Generic corporate websites that fail to differentiate advisory expertise or explain client value clearly.',
    objective:
      'Position the firm as an authoritative leader through clear service breakdowns, case examples, and straightforward consultation pathways.',
    functionality: [
      'Structured practice area and service capability pages',
      'Client engagement workflow and deliverables overview',
      'Direct consultation enquiry questionnaire',
      'Firm credentials, leadership bios, and client guidance resources',
    ],
    benefit:
      'Attracts higher-intent corporate inquiries and demonstrates professional rigor.',
  },
]

// FAQ Data
interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How much does a business website cost?',
    answer:
      'Our website projects typically start at ₹9,999 for focused business starter websites (up to 5 core pages), ₹17,999 for comprehensive multi-page business websites (up to 8 pages), and ₹29,999+ for advanced e-commerce or custom functional platforms. Every project receives a fixed-scope quotation with zero hidden surprises.',
  },
  {
    question: 'How long does website development take?',
    answer:
      'Project turnaround depends on scope and content availability. A focused business website is typically completed within 2 to 3 weeks once text and imagery are provided. Multi-page platforms and custom solutions generally take 3 to 5 weeks. We agree upon a realistic milestone schedule before starting.',
  },
  {
    question: 'Will my website work properly on mobile phones?',
    answer:
      'Yes, absolutely. Every website we build is developed mobile-first and tested across real smartphone screens (360px to 430px), tablets, and high-resolution desktop displays. Navigation, typography, forms, and imagery are designed specifically for touch interaction.',
  },
  {
    question: 'Can I update the website content myself?',
    answer:
      'Yes. Depending on your needs, we can structure your site with a manageable content layer, or provide clean documentation and ongoing maintenance support where we handle content updates for you quickly and reliably.',
  },
  {
    question: 'Do you provide domain name and web hosting?',
    answer:
      'We guide you through purchasing your domain and hosting directly in your own name from reputable providers (such as Cloudflare, Hostinger, or AWS), ensuring you maintain 100% legal ownership of your digital assets. We handle the full technical configuration and DNS deployment at no extra charge.',
  },
  {
    question: 'Can you redesign our existing website?',
    answer:
      'Yes. Our website redesign service begins with an audit of your existing site to identify navigation bottlenecks, mobile responsiveness flaws, and visual inconsistencies. We then re-architect the design from the ground up while preserving your existing domain authority and URLs.',
  },
  {
    question: 'Do you offer ongoing website maintenance?',
    answer:
      'Yes. We provide monthly maintenance arrangements covering technical monitoring, performance checks, security updates, regular content additions, and priority technical assistance.',
  },
  {
    question: 'Can you build custom website functionality like booking systems or portals?',
    answer:
      'Yes. Through our Custom Web Solutions service, we build purpose-designed workflows including table reservations, appointment request management, fleet availability displays, and third-party API integrations.',
  },
]

export function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeIndustry, setActiveIndustry] = useState<string>('hospitality')

  const selectedIndustry =
    industrySolutions.find((item) => item.id === activeIndustry) || industrySolutions[0]

  return (
    <PageMeta
      title="Services — Specialist Web Design & Development | Sindee Infotech"
      description="We design and develop high-performance business websites, e-commerce stores, website redesigns, and custom web solutions for ambitious businesses."
      canonicalUrl="https://sindeeinfotech.com/services"
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
              <Globe className="w-3.5 h-3.5 text-midnight" />
              <span>Services & Capabilities</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              Digital experiences built around your business.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6 max-w-2xl leading-relaxed"
            >
              From your first business website to advanced digital platforms, we design and develop solutions that help businesses build credibility, connect with customers and grow.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button to="/contact" variant="primary">
                Discuss Your Project
              </Button>
              <a
                href="#services-overview"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border text-midnight text-sm font-semibold hover:bg-white transition-colors"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Services Overview */}
      <section id="services-overview" className="section-padding bg-white">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Core Offerings
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              Specialist Services. Zero Generic Templates.
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              Every business has distinct operational requirements. We match the right architectural approach to your commercial goals.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="rounded-3xl border border-border bg-warm-ivory/40 p-8 md:p-12 lg:p-14 transition-all duration-300 hover:border-midnight/30"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                      !isEven ? 'lg:[direction:rtl]' : ''
                    }`}
                  >
                    {/* Visual Media Column */}
                    <div className={`lg:col-span-5 ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-midnight shadow-xl border border-border">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                          <span className="px-3 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/10 font-mono">
                            Service // {service.number}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-lime text-midnight font-bold font-mono text-[11px]">
                            Engineered Bespoke
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                      <div className="flex items-center gap-3 text-xs font-mono text-muted mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-midnight text-lime font-bold">
                          {service.number}
                        </span>
                        <span className="uppercase tracking-wider">Specialist Practice</span>
                      </div>

                      <h3 className="text-heading-2 text-midnight">
                        {service.title}
                      </h3>

                      <p className="text-body-large text-muted-dark mt-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Capabilities Grid */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-midnight font-bold mb-3">
                          Capabilities & Scope
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.slice(0, 6).map((feature) => (
                            <div key={feature} className="flex items-start gap-2 text-sm text-midnight/80">
                              <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ideal For */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono uppercase text-muted mr-1">Ideal for:</span>
                        {service.idealFor.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-white text-midnight/80 text-xs rounded-full border border-border font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-8">
                        <Button to="/contact" variant="dark">
                          Discuss {service.title}
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: Industry Solutions */}
      <section className="section-padding bg-warm-ivory border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Sector Expertise
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              Industry-Specific Solutions
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              We design websites that solve the operational and customer-journey challenges unique to each industry.
            </p>
          </div>

          {/* Industry Tab Selectors */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {industrySolutions.map((industry) => {
              const active = industry.id === activeIndustry
              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-midnight text-white shadow-md'
                      : 'bg-white text-muted-dark hover:text-midnight border border-border hover:border-midnight/30'
                  }`}
                >
                  <span className={active ? 'text-lime' : 'text-muted-dark'}>
                    {industry.icon}
                  </span>
                  <span>{industry.name}</span>
                </button>
              )
            })}
          </div>

          {/* Active Industry Detail Card */}
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted">
                    Industry Challenge
                  </span>
                  <p className="text-body-large text-midnight font-medium mt-2 leading-relaxed">
                    {selectedIndustry.challenge}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted">
                    What The Website Achieves
                  </span>
                  <p className="text-body text-muted-dark mt-2 leading-relaxed">
                    {selectedIndustry.objective}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-warm-ivory border border-border">
                  <span className="text-xs font-mono uppercase tracking-widest text-midnight font-bold">
                    Primary Commercial Benefit
                  </span>
                  <p className="text-sm text-midnight/80 mt-1">
                    {selectedIndustry.benefit}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 bg-warm-ivory/50 rounded-2xl p-6 md:p-8 border border-border flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-wider text-midnight font-bold mb-4">
                    Relevant Website Functionality
                  </h4>
                  <ul className="space-y-3">
                    {selectedIndustry.functionality.map((func, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-midnight/80">
                        <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <Button to="/contact" variant="dark" className="w-full justify-center">
                    Discuss a {selectedIndustry.name} Website
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Our Approach */}
      <section className="section-padding bg-midnight text-white">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime">
              Our Methodology
            </span>
            <h2 className="text-heading-1 text-white mt-3">
              How We Approach Every Project
            </h2>
            <p className="text-body-large text-muted-light mt-4">
              We unite commercial strategy, visual design, and clean engineering into one cohesive workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Business-First Thinking',
                description:
                  'We begin by clarifying your revenue model, core clientele, and primary call-to-action before designing a single pixel.',
              },
              {
                number: '02',
                title: 'Clear Information Architecture',
                description:
                  'Visitors should find what they need in seconds. We organize menus, content sections, and inquiry pathways logically.',
              },
              {
                number: '03',
                title: 'Purposeful Visual Design',
                description:
                  'We avoid visual clutter and generic templates. Every color, font, and composition choice reinforces your brand credibility.',
              },
              {
                number: '04',
                title: 'Responsive Engineering',
                description:
                  'Mobile is not an afterthought. Layouts adapt fluidly across phone, tablet, and desktop viewports with zero clipping.',
              },
              {
                number: '05',
                title: 'Performance & Speed',
                description:
                  'Optimized assets, clean modern code, and fast page loads ensure visitors stay engaged and search engines rank your site.',
              },
              {
                number: '06',
                title: 'Direct, Honest Partnership',
                description:
                  'No convoluted sales intermediaries. You communicate directly with the team designing and building your digital presence.',
              },
            ].map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-2xl bg-midnight-light border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-lime font-bold mb-4 block">
                    {pillar.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Engagement Process */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Engagement Lifecycle
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              The Five Stages to Launch
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              A structured, transparent pathway from initial discovery through to live deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                name: 'Discover',
                detail:
                  'Review business goals, target clientele, brand assets, and technical requirements.',
              },
              {
                step: '02',
                name: 'Plan',
                detail:
                  'Define page hierarchy, sitemap, content scope, and conversion pathways.',
              },
              {
                step: '03',
                name: 'Design & Build',
                detail:
                  'Craft bespoke responsive layouts, typography systems, and clean interactive components.',
              },
              {
                step: '04',
                name: 'Refine',
                detail:
                  'Review drafts together, implement feedback rounds, and test across device viewports.',
              },
              {
                step: '05',
                name: 'Launch',
                detail:
                  'Connect custom domain, deploy to hosting, verify forms, and hand over complete ownership.',
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="bg-warm-ivory rounded-2xl p-6 border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-midnight text-lime flex items-center justify-center font-mono font-bold text-xs mb-4">
                    {stage.step}
                  </div>
                  <h3 className="text-base font-bold text-midnight mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-muted-dark leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Project Scope & Transparency */}
      <section className="section-padding bg-warm-ivory border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Commercial Clarity
            </span>
            <h2 className="text-heading-2 text-midnight mt-3">
              What Is Always Included vs. Third-Party Costs
            </h2>
            <p className="text-body text-muted-dark mt-2">
              We operate with complete commercial transparency. No hidden charges or surprise invoices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h3 className="text-base font-bold text-midnight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-dark" />
                <span>Always Included In Our Service</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-dark">
                {[
                  'Bespoke visual design tailored to your brand identity',
                  'Mobile, tablet, and desktop responsive development',
                  'On-page SEO fundamentals and meta tags',
                  'Inquiry and contact form setup with validation',
                  'DNS and domain setup assistance',
                  'Cross-browser and cross-device testing',
                  'Dedicated post-launch handover and support window',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border">
              <h3 className="text-base font-bold text-midnight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                <span>External / Third-Party Exclusions</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-dark">
                {[
                  'Domain registration fees (paid directly to registrar like Cloudflare/GoDaddy)',
                  'Web hosting fees (paid directly to your chosen hosting provider)',
                  'Payment gateway transaction fees (charged per-transaction by Razorpay, etc.)',
                  'Specialized copywriting or professional translation services',
                  'Paid third-party API or premium plugin subscriptions',
                  'Commercial stock photography licences (if required beyond free open-access libraries)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-main max-w-4xl">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Common Questions
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-body-large text-muted-dark mt-3">
              Straightforward answers about our services, pricing, and project workflows.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div key={index} className="py-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold text-midnight group-hover:text-muted-dark transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`p-2 rounded-full bg-warm-ivory text-midnight transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-midnight text-lime' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-body text-muted-dark mt-4 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: Final CTA */}
      <section className="bg-midnight text-white section-padding">
        <div className="container-main text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-4 block">
            Start Your Transformation
          </span>
          <h2 className="text-display text-white">
            Let's build a website that works as hard as your business.
          </h2>
          <p className="text-body-large text-muted-light mt-6">
            Tell us where your business stands today and what you want to achieve. We will advise you on the right digital strategy with zero pressure.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/contact" variant="primary">
              Tell Us About Your Project
            </Button>
            <Button
              to="/portfolio"
              variant="secondary"
              className="border-border-dark text-white hover:border-white hover:bg-white hover:text-midnight"
            >
              Explore Selected Concepts
            </Button>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
