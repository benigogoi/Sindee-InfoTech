import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/config'
import { MessageSquare, X } from 'lucide-react'

/**
 * Official WhatsApp Brand SVG Icon (24x24 viewBox)
 */
function WhatsAppIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.7C7.02 10.92 7.91 12.09 8.03 12.25C8.16 12.41 9.77 14.9 12.25 15.96C12.84 16.22 13.3 16.37 13.66 16.48C14.25 16.67 14.79 16.64 15.22 16.58C15.7 16.51 16.69 15.98 16.9 15.39C17.11 14.8 17.11 14.3 17.05 14.19C16.99 14.09 16.82 14.03 16.57 13.91C16.32 13.78 15.09 13.17 14.86 13.09C14.64 13 14.47 12.96 14.31 13.21C14.14 13.45 13.66 14.03 13.52 14.19C13.37 14.35 13.23 14.37 12.98 14.25C12.73 14.12 11.92 13.86 10.96 13.01C10.22 12.35 9.71 11.53 9.57 11.28C9.42 11.04 9.55 10.9 9.68 10.78C9.79 10.67 9.93 10.49 10.05 10.35C10.18 10.2 10.22 10.1 10.3 9.94C10.39 9.77 10.34 9.63 10.28 9.51C10.22 9.38 9.73 8.18 9.52 7.68C9.32 7.19 9.12 7.26 8.97 7.25C8.83 7.24 8.68 7.24 8.53 7.24V7.33Z" />
    </svg>
  )
}

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showNotice, setShowNotice] = useState(false)
  const whatsappUrl = getWhatsAppUrl()
  const isConfigured = Boolean(CONTACT_CONFIG.whatsapp && whatsappUrl)

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault()
      setShowNotice(true)
    }
  }

  return (
    <>
      {/* Floating Button Container */}
      <div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex items-center select-none print:hidden"
        style={{
          bottom: 'max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))',
          right: 'max(1.25rem, calc(1.25rem + env(safe-area-inset-right, 0px)))',
        }}
      >
        {/* Desktop Tooltip */}
        <div
          role="tooltip"
          id="whatsapp-tooltip"
          className={`hidden md:block absolute right-full mr-3.5 px-3.5 py-1.5 rounded-xl bg-midnight text-white text-xs font-medium tracking-tight whitespace-nowrap shadow-lg border border-white/10 transition-all duration-200 pointer-events-none ${
            showTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2'
          }`}
        >
          Chat with us on WhatsApp
          {/* Arrow */}
          <span
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-midnight rotate-45 border-t border-r border-white/10"
            aria-hidden="true"
          />
        </div>

        {/* WhatsApp Button */}
        {isConfigured ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Sindee InfoTech on WhatsApp"
            aria-describedby="whatsapp-tooltip"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
          >
            <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            aria-label="Chat with Sindee InfoTech on WhatsApp"
            aria-describedby="whatsapp-tooltip"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
          >
            <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>

      {/* Graceful modal fallback when WhatsApp number is awaiting configuration */}
      {showNotice && !isConfigured && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/70 backdrop-blur-sm"
          onClick={() => setShowNotice(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-border relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowNotice(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-midnight hover:bg-black/5 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 id="whatsapp-dialog-title" className="text-lg font-bold text-midnight">
                  Connect on WhatsApp
                </h3>
                <p className="text-xs text-muted-dark font-medium">Sindee InfoTech Support</p>
              </div>
            </div>

            <p className="text-sm text-muted-dark leading-relaxed mb-6">
              Our direct WhatsApp business line is being updated. In the meantime, you can reach us immediately via email or by sending a quick message through our contact page.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                onClick={() => setShowNotice(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-midnight text-white text-sm font-semibold hover:bg-midnight-light transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Go to Contact Form
              </Link>
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-dark hover:text-midnight transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
