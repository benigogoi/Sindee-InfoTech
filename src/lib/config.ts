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
  /** Replace with your actual business email */
  email: 'hello@sindeeinfotech.com',
  /** Replace with your actual phone number */
  phone: '+91-XXXXX-XXXXX',
  /** Replace with your actual WhatsApp number (with country code, no spaces) */
  whatsapp: '91XXXXXXXXXX',
  /** Replace with your actual business address */
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

export const WHATSAPP_URL = `https://wa.me/${CONTACT_CONFIG.whatsapp}`
export const EMAIL_URL = `mailto:${CONTACT_CONFIG.email}`
