import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '')
      const scrollToHash = () => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      // Brief delay to ensure component render completes
      const timeoutId = setTimeout(scrollToHash, 60)
      return () => clearTimeout(timeoutId)
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}
