import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import {
  fadeUpVariants,
  fadeInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  staggerContainerVariants,
  staggerFastContainerVariants,
} from '@/lib/animations'
import { CONTACT_CONFIG, API_CONFIG, WHATSAPP_URL, EMAIL_URL, SITE_CONFIG } from '@/lib/config'

/* ——————————————————————————————————————————
   Form Data & Options
   —————————————————————————————————————————— */

interface FormData {
  fullName: string
  businessName: string
  email: string
  phone: string
  websiteType: string
  budget: string
  description: string
}

const initialFormData: FormData = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  websiteType: '',
  budget: '',
  description: '',
}

const websiteTypes = [
  'Business website',
  'E-commerce',
  'Website redesign',
  'Custom solution',
  'Not sure yet',
]

const budgetRanges = [
  'Below ₹10,000',
  '₹10,000–₹20,000',
  '₹20,000–₹40,000',
  '₹40,000+',
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'dev-mode'

/* ——————————————————————————————————————————
   Reusable Input Components
   —————————————————————————————————————————— */

const inputBaseClasses =
  'w-full bg-white border border-border rounded-xl px-4 py-3.5 text-midnight text-[0.9375rem] placeholder:text-muted-light outline-none transition-all duration-300 focus:border-lime focus:ring-2 focus:ring-lime/20'

const selectClasses =
  'w-full bg-white border border-border rounded-xl px-4 py-3.5 text-midnight text-[0.9375rem] outline-none transition-all duration-300 focus:border-lime focus:ring-2 focus:ring-lime/20 appearance-none cursor-pointer'

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[0.8125rem] font-semibold text-midnight">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

/* ——————————————————————————————————————————
   Contact Page
   —————————————————————————————————————————— */

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [statusMessage, setStatusMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    // Dev-mode: endpoint not configured
    if (!API_CONFIG.contactFormEndpoint) {
      setStatus('dev-mode')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch(API_CONFIG.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setStatusMessage("Your enquiry has been sent successfully. We'll get back to you soon!")
      setFormData(initialFormData)
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again or contact us directly.')
    }
  }

  return (
    <PageMeta
      title={`Contact — ${SITE_CONFIG.name}`}
      description="Get in touch with Sindee Infotech. Tell us about your project and let's build something great together."
    >
      {/* ———— Hero ———— */}
      <section className="pt-34 pb-16 md:pt-38 md:pb-22 bg-warm-ivory">
        <div className="container-main">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUpVariants} className="text-label text-muted mb-5">
              Get in Touch
            </motion.p>
            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight">
              Have a project in mind?
              <br />
              <span className="text-muted-dark">Let's talk.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-body-large text-muted-dark mt-6 max-w-xl">
              Share some details about what you're looking for and we'll get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ———— Form + Side Panel ———— */}
      <section className="section-padding bg-warm-ivory">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ———— Form Column ———— */}
            <motion.div
              variants={slideInLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
                {/* Success State */}
                {status === 'success' && (
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-16"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime/20 mb-6">
                      <CheckCircle className="w-8 h-8 text-lime-dark" />
                    </div>
                    <h3 className="text-heading-3 text-midnight mb-3">Thank you!</h3>
                    <p className="text-body text-muted-dark max-w-md mx-auto">{statusMessage}</p>
                    <div className="mt-8">
                      <Button variant="secondary" onClick={() => setStatus('idle')} icon={false}>
                        Send another enquiry
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Dev-mode State */}
                {status === 'dev-mode' && (
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-16"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-heading-3 text-midnight mb-3">Development Mode</h3>
                    <p className="text-body text-muted-dark max-w-md mx-auto mb-6">
                      Form submission is not configured yet. Please contact us directly via email or
                      WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button href={EMAIL_URL} variant="primary">
                        Send Email
                      </Button>
                      <Button href={WHATSAPP_URL} variant="secondary">
                        WhatsApp Us
                      </Button>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-caption underline underline-offset-2 hover:text-midnight transition-colors cursor-pointer"
                    >
                      Back to form
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {(status === 'idle' || status === 'loading' || status === 'error') && (
                  <form onSubmit={handleSubmit} noValidate>
                    <motion.div
                      variants={staggerFastContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      {/* Error banner */}
                      {status === 'error' && (
                        <motion.div
                          variants={fadeUpVariants}
                          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                          <p className="text-[0.875rem] text-red-700">{statusMessage}</p>
                        </motion.div>
                      )}

                      {/* Row: Full Name + Business Name */}
                      <motion.div
                        variants={fadeUpVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        <FormField label="Full Name" required>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`${inputBaseClasses} ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                            required
                            autoComplete="name"
                          />
                          {errors.fullName && (
                            <p className="text-[0.8125rem] text-red-500 mt-1">{errors.fullName}</p>
                          )}
                        </FormField>

                        <FormField label="Business Name">
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Your company (optional)"
                            className={inputBaseClasses}
                            autoComplete="organization"
                          />
                        </FormField>
                      </motion.div>

                      {/* Row: Email + Phone */}
                      <motion.div
                        variants={fadeUpVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        <FormField label="Email Address" required>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`${inputBaseClasses} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                            required
                            autoComplete="email"
                          />
                          {errors.email && (
                            <p className="text-[0.8125rem] text-red-500 mt-1">{errors.email}</p>
                          )}
                        </FormField>

                        <FormField label="Phone Number">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className={inputBaseClasses}
                            autoComplete="tel"
                          />
                        </FormField>
                      </motion.div>

                      {/* Row: Website Type + Budget */}
                      <motion.div
                        variants={fadeUpVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        <FormField label="Type of Website">
                          <div className="relative">
                            <select
                              name="websiteType"
                              value={formData.websiteType}
                              onChange={handleChange}
                              className={`${selectClasses} ${!formData.websiteType ? 'text-muted-light' : ''}`}
                            >
                              <option value="" disabled>
                                Select an option
                              </option>
                              {websiteTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                              <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </FormField>

                        <FormField label="Approximate Budget">
                          <div className="relative">
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className={`${selectClasses} ${!formData.budget ? 'text-muted-light' : ''}`}
                            >
                              <option value="" disabled>
                                Select a range
                              </option>
                              {budgetRanges.map((range) => (
                                <option key={range} value={range}>
                                  {range}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                              <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </FormField>
                      </motion.div>

                      {/* Textarea */}
                      <motion.div variants={fadeUpVariants}>
                        <FormField label="Project Description">
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell us about your project — goals, timeline, any specific requirements…"
                            rows={5}
                            className={`${inputBaseClasses} resize-none`}
                          />
                        </FormField>
                      </motion.div>

                      {/* Submit */}
                      <motion.div variants={fadeUpVariants} className="pt-2">
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
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Enquiry
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ———— Side Panel ———— */}
            <motion.aside
              variants={slideInRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-2 space-y-6"
            >
              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-midnight rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-lime/15">
                    <MessageCircle className="w-6 h-6 text-lime" />
                  </div>
                  <div>
                    <p className="text-label text-lime mb-1">Prefer WhatsApp?</p>
                    <p className="text-white font-semibold text-[0.9375rem]">Chat with us</p>
                  </div>
                </div>
                <p className="text-muted-light text-[0.875rem] leading-relaxed">
                  Get a quick response on WhatsApp. We typically reply within a few hours.
                </p>
                <p className="text-lime text-[0.875rem] font-semibold mt-3 group-hover:underline">
                  {CONTACT_CONFIG.whatsapp} →
                </p>
              </a>

              {/* Email CTA */}
              <a
                href={EMAIL_URL}
                className="group block bg-white rounded-2xl border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-midnight/5">
                    <Mail className="w-6 h-6 text-midnight" />
                  </div>
                  <div>
                    <p className="text-label text-muted mb-1">Email Us</p>
                    <p className="text-midnight font-semibold text-[0.9375rem]">Drop us a line</p>
                  </div>
                </div>
                <p className="text-muted-dark text-[0.875rem] leading-relaxed">
                  For detailed enquiries, proposals, or partnership opportunities.
                </p>
                <p className="text-midnight text-[0.875rem] font-semibold mt-3 group-hover:underline">
                  {CONTACT_CONFIG.email} →
                </p>
              </a>

              {/* Phone */}
              <div className="bg-white rounded-2xl border border-border p-7">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-midnight/5">
                    <Phone className="w-6 h-6 text-midnight" />
                  </div>
                  <div>
                    <p className="text-label text-muted mb-1">Call Us</p>
                    <p className="text-midnight font-semibold text-[0.9375rem]">
                      {CONTACT_CONFIG.phone}
                    </p>
                  </div>
                </div>
                <p className="text-muted-dark text-[0.875rem] leading-relaxed">
                  Available Monday – Saturday, 10 AM – 7 PM IST.
                </p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-border p-7">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-midnight/5">
                    <MapPin className="w-6 h-6 text-midnight" />
                  </div>
                  <div>
                    <p className="text-label text-muted mb-1">Location</p>
                    <p className="text-midnight font-semibold text-[0.9375rem]">
                      {CONTACT_CONFIG.address}
                    </p>
                  </div>
                </div>
                <p className="text-muted-dark text-[0.875rem] leading-relaxed">
                  Serving clients across India and worldwide.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
