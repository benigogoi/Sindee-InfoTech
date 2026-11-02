import { useEffect, useRef, useState } from 'react'

export function useInView(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isInView }
}
