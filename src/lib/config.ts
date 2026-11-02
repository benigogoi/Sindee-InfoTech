/* ========================================
   CONTACT & BUSINESS CONFIGURATION
   
   Replace these placeholder values with 
   your actual business details before 
   deploying to production.
   ======================================== */

export const SITE_CONFIG = {
  name: 'Sindee Infotech',
  tagline: 'We build digital experiences that move businesses forward.',
  domain: 'sindeeinfotech.com',
  url: 'https://sindeeinfotech.com',
} as const

export const CONTACT_CONFIG = {
  /** Verified business email */
  email: 'hello@sindeeinfotech.com',
  /** Phone number - omitted until verified */
  phone: '',
  /** WhatsApp contact (optional) */
  whatsapp: '',
  /** Verified business location */
  address: 'Assam, India',
} as const

export const SOCIAL_CONFIG = {
  /** Replace with your actual social media URLs */
  instagram: 'https://instagram.com/sindeeinfotech',
  linkedin: 'https://linkedin.com/company/sindeeinfotech',
  twitter: 'https://twitter.com/sindeeinfotech',
  facebook: 'https://facebook.com/sindeeinfotech',
} as const

export const API_CONFIG = {
  /** 
   * Replace with your actual form submission endpoint.
   * Until configured, the contact form will show a 
   * development-mode message instead of submitting.
   */
  contactFormEndpoint: '',
} as const

export const WHATSAPP_URL = CONTACT_CONFIG.whatsapp
  ? `https://wa.me/${CONTACT_CONFIG.whatsapp}`
  : ''
export const EMAIL_URL = `mailto:${CONTACT_CONFIG.email}`
