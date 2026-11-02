import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG, CONTACT_CONFIG, SOCIAL_CONFIG, EMAIL_URL } from '@/lib/config'

const footerLinks = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Our Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Business Websites', path: '/services#business-websites' },
    { label: 'E-commerce', path: '/services#ecommerce' },
    { label: 'Website Redesign', path: '/services#website-redesign' },
    { label: 'Custom Solutions', path: '/services#custom-solutions' },
    { label: 'Maintenance', path: '/services#website-maintenance' },
  ],
  social: [
    { label: 'Instagram', url: SOCIAL_CONFIG.instagram },
    { label: 'LinkedIn', url: SOCIAL_CONFIG.linkedin },
    { label: 'Twitter', url: SOCIAL_CONFIG.twitter },
  ],
}

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      {/* Main Footer */}
      <div className="container-main pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="text-white font-bold text-lg tracking-tight">
              SINDEE INFOTECH
            </Link>
            <p className="mt-5 text-muted-light text-body max-w-sm leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 mt-6 text-lime hover:text-lime-light transition-colors text-[0.9375rem] font-medium"
            >
              {CONTACT_CONFIG.email}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-muted mb-5">Pages</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-light hover:text-white transition-colors text-[0.9375rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-label text-muted mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-light hover:text-white transition-colors text-[0.9375rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-muted mb-5">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-light hover:text-white transition-colors text-[0.9375rem]"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-muted text-sm">{CONTACT_CONFIG.phone}</p>
              <p className="text-muted text-sm mt-1">{CONTACT_CONFIG.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Sindee Infotech. All rights reserved.
          </p>
          <Link
            to="/privacy"
            className="text-muted hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
