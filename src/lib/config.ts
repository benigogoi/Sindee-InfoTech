/* ========================================
   CONTACT & BUSINESS CONFIGURATION
   
   Replace these placeholder values with 
   your actual business details before 
   deploying to production.
   ======================================== */

export const SITE_CONFIG = {
  name: 'Sindee Infotech',
  tagline: 'We build digital products that move businesses forward.',
  domain: 'sindeeinfotech.com',
  url: 'https://sindeeinfotech.com',
} as const

export const CONTACT_CONFIG = {
  /** Verified business email */
  email: 'hello@sindeeinfotech.com',
  /** Phone number - omitted until verified */
  phone: '',
  /** WhatsApp contact number in international format without spaces or symbols (e.g., '91XXXXXXXXXX') */
  whatsapp: '',
  /** Verified business location */
  address: 'Assam, India',
} as const

export const SOCIAL_CONFIG = {
  /** Replace with your actual verified social media URLs before displaying */
  instagram: '',
  linkedin: '',
  twitter: '',
  facebook: '',
} as const

export const API_CONFIG = {
  /** 
   * Form submission endpoint backed by Vercel Serverless Function & Resend.
   */
  contactFormEndpoint: '/api/contact',
} as const

export const WHATSAPP_PREFILLED_MESSAGE =
  "Hello Sindee InfoTech, I'm interested in discussing a project. Could you please assist me?"

export const getWhatsAppUrl = (customMessage?: string): string => {
  const rawNumber = CONTACT_CONFIG.whatsapp.trim().replace(/[^0-9]/g, '')
  if (!rawNumber) return ''
  const message = encodeURIComponent(customMessage || WHATSAPP_PREFILLED_MESSAGE)
  return `https://wa.me/${rawNumber}?text=${message}`
}

export const WHATSAPP_URL = getWhatsAppUrl()
export const EMAIL_URL = `mailto:${CONTACT_CONFIG.email}`
