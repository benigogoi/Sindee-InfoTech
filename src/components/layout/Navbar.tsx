import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface NavLink {
  label: string
  path: string
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Our Work', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    },
    [isMobileMenuOpen],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const isLinkActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path === '/portfolio') {
      return (
        location.pathname === '/portfolio' ||
        location.pathname === '/work' ||
        location.pathname.startsWith('/portfolio/') ||
        location.pathname.startsWith('/work/')
      )
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-warm-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(16,24,39,0.08)] py-3 md:py-4'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-midnight font-bold text-lg md:text-xl tracking-tight hover:opacity-85 transition-opacity z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm"
          >
            SINDEE INFOTECH
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[0.9375rem] font-medium transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm ${
                    active ? 'text-midnight font-semibold' : 'text-muted-dark hover:text-midnight'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-lime rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button to="/contact" variant="dark" icon={false} className="text-sm px-5 py-2.5">
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center text-midnight rounded-xl hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime transition-colors"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-warm-ivory flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12"
          >
            <div className="flex flex-col justify-center flex-1 max-w-md mx-auto w-full">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6">
                Navigation
              </span>
              <div className="space-y-2">
                {navLinks.map((link, index) => {
                  const active = isLinkActive(link.path)
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-3xl sm:text-4xl font-bold py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-md ${
                          active
                            ? 'text-midnight'
                            : 'text-muted-dark hover:text-midnight'
                        }`}
                      >
                        {link.label}
                        {active && (
                          <span className="inline-block w-2.5 h-2.5 bg-lime rounded-full ml-3 align-middle" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.35 }}
                className="mt-10 pt-8 border-t border-border"
              >
                <Button
                  to="/contact"
                  variant="primary"
                  className="w-full justify-center text-base py-3.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start a Project
                </Button>
                <p className="text-xs text-muted-dark text-center mt-4">
                  hello@sindeeinfotech.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
