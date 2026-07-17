import { useEffect, useRef } from 'react'

// 发光卡片：照搬 gerenzhan 的 .border-glow-card。
// 鼠标移入时根据光标位置更新 --cursor-angle（描边跟随）与 --edge-proximity（接近边缘越亮），
// 离开时复位。同时承担滚动入场（复用 .reveal 机制）。
export default function GlowCard({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.unobserve(el)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const cx = r.width / 2
    const cy = r.height / 2
    const angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90
    el.style.setProperty('--cursor-angle', `${angle}deg`)
    const distTop = y
    const distBottom = r.height - y
    const distLeft = x
    const distRight = r.width - x
    const minDist = Math.min(distTop, distBottom, distLeft, distRight)
    const prox = Math.max(0, Math.min(100, 100 - (minDist / Math.max(r.width, r.height)) * 100))
    el.style.setProperty('--edge-proximity', String(prox))
  }

  function onLeave() {
    const el = ref.current
    if (el) el.style.setProperty('--edge-proximity', '0')
  }

  return (
    <Tag
      ref={ref}
      className={`glow-card reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
