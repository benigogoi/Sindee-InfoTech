import { useEffect, useRef, useState } from 'react'

export function useInView(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return { ref, isInView }
}
