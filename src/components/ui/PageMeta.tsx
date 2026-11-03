import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMetaProps {
  title: string
  description: string
  canonicalUrl?: string
  children: ReactNode
}

export function PageMeta({ title, description, canonicalUrl, children }: PageMetaProps) {
  const location = useLocation()

  useEffect(() => {
    document.title = title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)
    const canonical = document.querySelector('link[rel="canonical"]')
    const href = canonicalUrl || `https://sindeeinfotech.com${location.pathname === '/' ? '' : location.pathname}`
    if (canonical) {
      canonical.setAttribute('href', href || 'https://sindeeinfotech.com')
    }
  }, [title, description, canonicalUrl, location.pathname])

  return <>{children}</>
}
