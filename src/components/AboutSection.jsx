import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 解析指标字符串：提取前导数字与后缀（如 "95%+" -> num=95, suffix="%+"）。
function parseMetric(value) {
  const m = String(value).match(/^(\d+)(.*)$/)
  if (!m) return { num: 0, suffix: String(value) }
  return { num: parseInt(m[1], 10), suffix: m[2] || '' }
}

// 数字滚动：IntersectionObserver 触发后，用 requestAnimationFrame 自实现，不引库。
function useCountUp(target, active) {
  const { num, suffix } = parseMetric(target)
  const [display, setDisplay] = useState('0' + suffix)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!active) return
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(num + suffix)
      return
    }
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * num) + suffix)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, num, suffix])

  return display
}

function MetricItem({ value, label, active }) {
  const display = useCountUp(value, active)
  return (
    <div className="metric">
      <span className="metric-value">{display}</span>
      <span className="metric-label">{label}</span>
    </div>
  )
}

// 个人经历 AboutSection（#about）：左发光卡片（H2 + intro + 电话/邮箱），右 4 项数字滚动指标。
export default function AboutSection() {
  const { headline, intro, phone, email, metrics } = profile
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Profile</span>
          <h2 className="section-title">个人经历</h2>
        </div>

        <div className="about-grid">
          <GlowCard className="about-card">
            <h3 className="about-headline">{headline}</h3>
            <p className="about-intro">{intro}</p>
            <div className="about-contact">
              <a className="about-contact-row" href={`tel:${phone}`}>
                <AppIcon name="phone" /> {phone}
              </a>
              <a className="about-contact-row" href={`mailto:${email}`}>
                <AppIcon name="mail" /> {email}
              </a>
            </div>
          </GlowCard>

          <div className="about-metrics" ref={ref}>
            {metrics.map((m) => (
              <MetricItem key={m.label} value={m.value} label={m.label} active={active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
