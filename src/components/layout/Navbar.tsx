import { useState, useEffect, useCallback, useRef } from 'react'
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
  const prevPathname = useRef(location.pathname)
  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      prevPathname.current = location.pathname
      setIsMobileMenuOpen(false)
    }
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
      <header
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-200 print:static ${
          isScrolled
            ? 'bg-warm-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(16,24,39,0.08)] py-3 md:py-3.5'
            : 'bg-warm-ivory/80 backdrop-blur-sm border-b border-border/40 py-3.5 md:py-4.5'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-lg shrink-0"
            aria-label="Sindee Infotech - Home"
          >
            <img
              src="/logo.png"
              alt="Sindee Infotech"
              className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-9"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm xl:text-[0.9375rem] font-medium transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm ${
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
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0">
            <Button to="/contact" variant="dark" icon={false} className="text-sm px-5 py-2.5">
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center text-midnight rounded-xl hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime transition-colors shrink-0"
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
      </header>

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
            className="fixed inset-0 z-40 bg-warm-ivory flex flex-col justify-between pt-20 pb-8 px-6 sm:px-12 overflow-y-auto"
            style={{
              paddingTop: 'max(5rem, calc(5rem + env(safe-area-inset-top, 0px)))',
              paddingBottom: 'max(2rem, calc(2rem + env(safe-area-inset-bottom, 0px)))',
            }}
          >
            <div className="flex flex-col justify-center flex-1 max-w-md mx-auto w-full my-auto py-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted mb-4 sm:mb-6">
                Navigation
              </span>
              <div className="space-y-1 sm:space-y-2">
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
                        className={`block text-2xl sm:text-3xl font-bold py-2 sm:py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-md ${
                          active
                            ? 'text-midnight font-extrabold'
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
                className="mt-8 pt-6 border-t border-border"
              >
                <Button
                  to="/contact"
                  variant="primary"
                  className="w-full justify-center text-base py-3.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start a Project
                </Button>
                <p className="text-xs text-muted-dark text-center mt-3 font-mono">
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
