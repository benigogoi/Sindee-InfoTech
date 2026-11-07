import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ExternalLink,
  Phone,
} from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import {
  fadeUpVariants,
  fadeInVariants,
  staggerContainerVariants,
} from '@/lib/animations'
import { CONTACT_CONFIG, API_CONFIG, EMAIL_URL, PHONE_URL } from '@/lib/config'

interface FormData {
  fullName: string
  businessName: string
  email: string
  phone: string
  projectType: string
  budget: string
  description: string
  hp_website?: string
}

const initialFormData: FormData = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  description: '',
  hp_website: '',
}

const projectTypeOptions = [
  'Website Development',
  'Web Application Development / SaaS',
  'Android Application Development',
  'Custom Software / ERP / CRM',
  'Branding & Creative Design',
  'Digital Marketing & SEO',
  'Other / Multiple Services',
]

const budgetOptions = [
  'Focused Web Project / Landing Page',
  'Commercial Website / Web Application MVP',
  'Advanced Web Platform / Android Application',
  'Custom Software / ERP / Enterprise Solution',
  'Custom Scope / Discuss During Scoping',
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'endpoint-unconfigured'

const contactFaqs = [
  {
    question: 'What information should I provide when reaching out?',
    answer:
      'A short overview of what your business does, what you want the website to achieve, any competitor or reference websites you admire, and your estimated timeframe is more than enough to start.',
  },
  {
    question: 'Do you work with businesses outside your immediate area?',
    answer:
      'Yes. We collaborate with business clients across India. All project coordination, design previews, and feedback reviews happen smoothly over video calls, email, and messaging.',
  },
  {
    question: 'Can I request a website redesign for an outdated existing site?',
    answer:
      'Yes, website redesign is one of our core services. We evaluate your current site, retain your existing domain and brand strengths, and build a modern, high-speed experience from the ground up.',
  },
  {
    question: 'How are projects priced?',
    answer:
      'We provide fixed-scope proposals based on the number of pages, custom functional workflows (such as bookings or e-commerce), and content requirements. We explain all inclusions upfront before work begins.',
  },
  {
    question: 'Do you provide ongoing technical maintenance after launch?',
    answer:
      'Yes. In addition to a dedicated handover period after deployment, we offer ongoing monthly maintenance arrangements covering security patches, backups, uptime monitoring, and content additions.',
  },
]

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [statusMessage, setStatusMessage] = useState('')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g., name@domain.com).'
    }

    if (formData.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number format.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    // Verify if endpoint is configured in config
    if (!API_CONFIG.contactFormEndpoint) {
      setStatus('endpoint-unconfigured')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch(API_CONFIG.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        let errMsg = 'An issue occurred while submitting your enquiry. Please reach out to us directly at hello@sindeeinfotech.com.'
        try {
          const errorData = await res.json()
          if (typeof errorData?.message === 'string' && errorData.message) {
            errMsg = errorData.message
          }
        } catch {
          if (res.status === 404) {
            errMsg = 'Form endpoint /api/contact was not found (404). Please ensure the backend serverless function is deployed.'
          } else if (res.status === 500 || res.status === 502) {
            errMsg = 'Email service is temporarily unavailable. Please reach out to hello@sindeeinfotech.com directly.'
          }
        }
        throw new Error(errMsg)
      }

      setStatus('success')
      setStatusMessage('Thank you. Your project enquiry has been received. We will review your requirements and reach out to you shortly.')
      setFormData(initialFormData)
    } catch (err: unknown) {
      setStatus('error')
      const msg =
        err instanceof Error && err.message
          ? err.message
          : 'An issue occurred while submitting your enquiry. Please reach out to us directly at hello@sindeeinfotech.com.'
      setStatusMessage(msg)
    }
  }

  // Generate mailto link with prefilled form details so no enquiry data is ever lost
  const prefilledMailto = `${EMAIL_URL}?subject=${encodeURIComponent(
    `Project Enquiry: ${formData.projectType || 'Website Development'} — ${formData.fullName}`,
  )}&body=${encodeURIComponent(
    `Full Name: ${formData.fullName}
Business Name: ${formData.businessName || 'N/A'}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Project Type: ${formData.projectType || 'Not specified'}
Estimated Budget: ${formData.budget || 'Not specified'}

Project Description:
${formData.description || 'N/A'}`,
  )}`

  return (
    <PageMeta
      title="Contact — Start a Website Project | Sindee Infotech"
      description="Tell us about your website design, e-commerce, or redesign project. We build professional web experiences for ambitious businesses across India."
      canonicalUrl="https://sindeeinfotech.com/contact"
    >
      {/* SECTION 1: Hero */}
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 bg-warm-ivory border-b border-border">
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
              <Mail className="w-3.5 h-3.5 text-midnight" />
              <span>Direct Inquiries</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-display text-midnight tracking-tight"
            >
              Tell us what you're building.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark mt-6 max-w-2xl leading-relaxed"
            >
              Whether you need a new business website, a complete redesign or a custom digital solution, tell us about your requirements and we'll take it from there.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 & 3: Contact Form + Alternative Contact */}
      <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 bg-warm-ivory">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm">
                {/* SUCCESS STATE */}
                {status === 'success' && (
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime/20 mb-6">
                      <CheckCircle className="w-8 h-8 text-lime-dark" />
                    </div>
                    <h3 className="text-heading-2 text-midnight mb-3">Enquiry Received</h3>
                    <p className="text-body text-muted-dark max-w-md mx-auto leading-relaxed">
                      {statusMessage}
                    </p>
                    <div className="mt-8">
                      <Button
                        variant="dark"
                        onClick={() => setStatus('idle')}
                        icon={false}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ENDPOINT UNCONFIGURED NOTICE (Clean, honest backend transparency) */}
                {status === 'endpoint-unconfigured' && (
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-left py-6"
                  >
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
                      <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-900">
                          Form Backend Under Setup
                        </h4>
                        <p className="text-xs text-amber-800 mt-0.5">
                          Direct automated API submission is currently in configuration mode.
                        </p>
                      </div>
                    </div>

                    <p className="text-body text-muted-dark mb-6 leading-relaxed">
                      To ensure your enquiry is received immediately with zero data loss, you can send your completed details directly to our verified mailbox in one click:
                    </p>

                    <div className="p-6 rounded-2xl bg-warm-ivory border border-border mb-8 space-y-2 text-xs font-mono text-midnight">
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Type:</strong> {formData.projectType || 'Not specified'}</p>
                      <p><strong>Budget:</strong> {formData.budget || 'Not specified'}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a
                        href={prefilledMailto}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-midnight text-white text-sm font-semibold hover:bg-midnight-light transition-colors"
                      >
                        <Mail className="w-4 h-4 text-lime" />
                        <span>Send via Email Client</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="text-xs font-semibold text-muted-dark hover:text-midnight underline py-2 cursor-pointer"
                      >
                        Back to edit form
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* MAIN FORM */}
                {(status === 'idle' || status === 'loading' || status === 'error') && (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot field for spam prevention (visually hidden) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="hp_website">Leave this field blank</label>
                      <input
                        id="hp_website"
                        type="text"
                        name="hp_website"
                        value={formData.hp_website || ''}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="pb-4 border-b border-border">
                        <h2 className="text-heading-3 text-midnight">
                          Project Enquiry Form
                        </h2>
                        <p className="text-xs text-muted-dark mt-1">
                          Fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
                        </p>
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-red-700 leading-relaxed">
                            {statusMessage}
                          </p>
                        </div>
                      )}

                      {/* Row 1: Full Name & Business Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Sharma"
                            className={`w-full bg-warm-ivory/50 border rounded-xl px-4 py-3 text-sm text-midnight placeholder:text-muted outline-none transition-colors focus:bg-white focus:border-midnight ${
                              errors.fullName ? 'border-red-400' : 'border-border'
                            }`}
                            required
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500">{errors.fullName}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Business / Company Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="e.g. Hillview Resort"
                            className="w-full bg-warm-ivory/50 border border-border rounded-xl px-4 py-3 text-sm text-midnight placeholder:text-muted outline-none transition-colors focus:bg-white focus:border-midnight"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email Address & Phone Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. rahul@example.com"
                            className={`w-full bg-warm-ivory/50 border rounded-xl px-4 py-3 text-sm text-midnight placeholder:text-muted outline-none transition-colors focus:bg-white focus:border-midnight ${
                              errors.email ? 'border-red-400' : 'border-border'
                            }`}
                            required
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Phone / WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full bg-warm-ivory/50 border rounded-xl px-4 py-3 text-sm text-midnight placeholder:text-muted outline-none transition-colors focus:bg-white focus:border-midnight ${
                              errors.phone ? 'border-red-400' : 'border-border'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Row 3: Project Type & Estimated Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Type of Project
                          </label>
                          <div className="relative">
                            <select
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleChange}
                              className="w-full bg-warm-ivory/50 border border-border rounded-xl px-4 py-3 text-sm text-midnight outline-none transition-colors focus:bg-white focus:border-midnight appearance-none cursor-pointer"
                            >
                              <option value="">Select project type</option>
                              {projectTypeOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-midnight">
                            Estimated Budget
                          </label>
                          <div className="relative">
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full bg-warm-ivory/50 border border-border rounded-xl px-4 py-3 text-sm text-midnight outline-none transition-colors focus:bg-white focus:border-midnight appearance-none cursor-pointer"
                            >
                              <option value="">Select budget range</option>
                              {budgetOptions.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Row 4: Project Description */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-midnight">
                          Project Description
                        </label>
                        <textarea
                          name="description"
                          rows={5}
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Tell us about your business, current website (if any), desired features, and timeline…"
                          className="w-full bg-warm-ivory/50 border border-border rounded-xl px-4 py-3 text-sm text-midnight placeholder:text-muted outline-none transition-colors focus:bg-white focus:border-midnight resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={status === 'loading'}
                          icon={status !== 'loading'}
                          className="w-full sm:w-auto justify-center"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting Enquiry…</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Project Enquiry</span>
                              <Send className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Column: Verified Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Phone & WhatsApp Card */}
              <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-midnight text-lime flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                    Phone &amp; WhatsApp
                  </span>
                  <a
                    href={PHONE_URL}
                    className="text-lg font-bold text-midnight hover:text-muted-dark transition-colors inline-block mt-1"
                  >
                    {CONTACT_CONFIG.phone}
                  </a>
                </div>
                <p className="text-xs text-muted-dark leading-relaxed">
                  Call or WhatsApp us directly for project scoping, quotes, and technical consultations.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-midnight text-lime flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                    Direct Email
                  </span>
                  <a
                    href={EMAIL_URL}
                    className="text-lg font-bold text-midnight hover:text-muted-dark transition-colors inline-block mt-1"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>
                <p className="text-xs text-muted-dark leading-relaxed">
                  For RFPs, detailed briefs, or general questions, send us an email directly anytime.
                </p>
              </div>

              {/* Verified Location Card */}
              <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-midnight text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                    Operating Studio
                  </span>
                  <p className="text-lg font-bold text-midnight mt-1">
                    {CONTACT_CONFIG.address}
                  </p>
                </div>
                <p className="text-xs text-muted-dark leading-relaxed">
                  We work with ambitious hospitality, healthcare, automotive, and commercial businesses across India.
                </p>
              </div>

              {/* Consultation Note */}
              <div className="bg-midnight text-white rounded-3xl p-8 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-lime">
                  Our Consultation Standard
                </span>
                <h4 className="text-base font-bold text-white">
                  No Sales Aggression. Honest Technical Advice.
                </h4>
                <p className="text-xs text-muted-light leading-relaxed">
                  When you speak with us, you speak with the specialists who design and build the sites. If a simple website solves your problem, we will not try to sell you an enterprise application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: What Happens Next */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-main">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Next Steps
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              What Happens Next
            </h2>
            <p className="text-body-large text-muted-dark mt-4">
              Here is what you can expect once you submit your project enquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'You send requirements',
                desc: 'Submit the form above or email us your project details, goals, and any reference sites.',
              },
              {
                step: '02',
                title: 'We review your project',
                desc: 'We examine your business niche, evaluate the technical scope, and identify key conversion opportunities.',
              },
              {
                step: '03',
                title: 'Discuss scope & objectives',
                desc: 'We connect via email or brief call to clarify requirements, answer questions, and align on timeline.',
              },
              {
                step: '04',
                title: 'Proposal & kickoff',
                desc: 'We provide an itemized fixed-price proposal. Upon sign-off, discovery and design commence immediately.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-warm-ivory rounded-2xl p-6 border border-border flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-midnight bg-lime px-2.5 py-1 rounded-md inline-block mb-4">
                    STEP {st.step}
                  </span>
                  <h3 className="text-base font-bold text-midnight mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-muted-dark leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Contact FAQ */}
      <section className="section-padding bg-warm-ivory border-t border-border">
        <div className="container-main max-w-4xl">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Questions & Answers
            </span>
            <h2 className="text-heading-1 text-midnight mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {contactFaqs.map((faq, index) => {
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
                      className={`p-2 rounded-full bg-white text-midnight transition-transform duration-200 shrink-0 border border-border ${
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

      {/* SECTION 6: Closing CTA */}
      <section className="py-20 bg-midnight text-white text-center">
        <div className="container-main max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-3 block">
            Partner With Sindee Infotech
          </span>
          <h2 className="text-heading-1 text-white">
            Ready to stand out online?
          </h2>
          <p className="text-body-large text-muted-light mt-4">
            We are here to help your business build credibility, attract loyal customers, and grow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_URL}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-midnight text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-midnight" />
              <span>Call / WhatsApp {CONTACT_CONFIG.phone}</span>
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-lime text-midnight text-sm font-semibold hover:bg-lime-light transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email {CONTACT_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
