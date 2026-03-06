import { useState, useEffect, useRef } from 'react'

// During SSR, start visible so pre-rendered HTML has opacity:1 for crawlers.
// On the client, start hidden and animate in via IntersectionObserver.
const isSSR = typeof window === 'undefined'

export default function FadeIn({ children, delay = 0, className = '' }) {
  const [visible, setVisible] = useState(isSSR)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition:
          'opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)',
      }}
    >
      {children}
    </div>
  )
}
