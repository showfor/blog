import { useEffect } from 'react'

/**
 * useReveal —— 原生滚动入场
 * 观察所有 .reveal 元素，进入视口即加 .is-visible
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    try {
      const io = new IntersectionObserver(
        (entries) => {
          const intersecting = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          intersecting.forEach((entry, i) => {
            const el = entry.target
            el.style.transitionDelay = Math.min(i, 7) * 60 + 'ms'
            el.classList.add('is-visible')
            io.unobserve(el)
          })
        },
        { threshold: 0.1 }
      )
      els.forEach((el) => io.observe(el))
      return () => io.disconnect()
    } catch {
      els.forEach((el) => el.classList.add('is-visible'))
    }
  }, [])
}
