import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMetaProps {
  title: string
  description: string
  children: ReactNode
}

export function PageMeta({ title, description, children }: PageMetaProps) {
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
    if (canonical) {
      canonical.setAttribute('href', `https://sindeeinfotech.com${location.pathname}`)
    }
  }, [title, description, location.pathname])

  return <>{children}</>
}
