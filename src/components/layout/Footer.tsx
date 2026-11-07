import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { CONTACT_CONFIG, EMAIL_URL } from '@/lib/config'

const footerLinks = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Our Work', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Website Development', path: '/services#website-development' },
    { label: 'Web Application Development', path: '/services#web-applications' },
    { label: 'Android App Development', path: '/services#android-apps' },
    { label: 'Custom Software Development', path: '/services#custom-software' },
    { label: 'Branding & Creative Design', path: '/services#branding-design' },
    { label: 'Digital Marketing & SEO', path: '/services#digital-marketing-seo' },
  ],
}

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      {/* Main Footer */}
      <div className="container-main pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="text-white font-bold text-lg md:text-xl tracking-tight inline-block hover:opacity-85 transition-opacity"
            >
              SINDEE INFOTECH
            </Link>
            <p className="text-muted-light text-body max-w-sm leading-relaxed">
              Digital Product &amp; Software Development Company. We turn business ideas into powerful digital experiences — from professional websites and web applications to Android apps and custom business software.
            </p>
            <div className="pt-2">
              <a
                href={EMAIL_URL}
                className="inline-flex items-center gap-2 text-lime hover:text-lime-light transition-colors text-[0.9375rem] font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>{CONTACT_CONFIG.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <p className="text-white text-xs font-mono uppercase tracking-widest mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-light hover:text-white transition-colors text-[0.9375rem] inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-4">
            <p className="text-white text-xs font-mono uppercase tracking-widest mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-light hover:text-white transition-colors text-[0.9375rem] inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-2.5 text-muted-light text-sm">
              <MapPin className="w-4 h-4 text-lime shrink-0 mt-0.5" />
              <span>{CONTACT_CONFIG.address} — Serving businesses across India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted">
          <p>© {CURRENT_YEAR} Sindee Infotech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-muted hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-muted hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
