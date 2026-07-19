import { useRef, useState, useEffect, useMemo } from 'react'
import { useLang } from '../context/LanguageProvider.jsx'
import { gsap } from 'gsap'
import { profile } from '../data/profile.js'
import BackgroundFX from './BackgroundFX.jsx'
import DotField from './DotField.jsx'

/**
 * HeroSection（#top）。逐字复刻原站 ga 组件：
 *   · 背景层：hero-bg-image / hero-bg / hero-frost / hero-dotfield(DotField) / 居中三旋转环
 *   · 标题：两行（accent + outline），GSAP 进场（受 openingComplete 控制）
 *   · 轮播：hero-carousel > hero-carousel-track > hero-carousel-item，拖拽/吸附/惯性/自动滚动
 *   · 点击卡片 -> GSAP FLIP 弹窗（modal），遮罩/关闭按钮收起
 * 拖拽/吸附/点击逻辑、自动滚动 rAF、弹窗 GSAP 时间线均逐字来自线上混淆 bundle。
 */
const U = gsap

const da = '/assets/hero-bg.jpg'
const fa = [
  { color: '#2a3a2a', label: 'Photography', img: 'https://picsum.photos/seed/photography/400/500' },
  { color: '#3a3a2a', label: '3D Render', img: 'https://picsum.photos/seed/3drender/400/500' },
  { color: '#2a2a3a', label: 'Brand Identity', img: 'https://picsum.photos/seed/brand/400/500' },
  { color: '#3a3a2a', label: 'AI Art', img: 'https://picsum.photos/seed/aiart/400/500' },
  { color: '#2a3a3a', label: 'UI Design', img: 'https://picsum.photos/seed/uidesign/400/500' },
  { color: '#3a2a3a', label: 'Game Art', img: 'https://picsum.photos/seed/gameart/400/500' },
  { color: '#2a3a2a', label: 'Poster', img: 'https://picsum.photos/seed/poster/400/500' },
  { color: '#2a3a3a', label: 'Illustration', img: 'https://picsum.photos/seed/illustration/400/500' },
]
const pa = 180
const ma = pa + 52
const ha = fa.length * ma

export default function HeroSection({ openingComplete = true }) {
  const { t } = useLang()
  const n = useRef(null) // hero-carousel-track
  const r = useRef(null) // hero-carousel 容器
  const i = useRef([]) // 轮播项 DOM 引用
  const a = useRef(null) // 标题行 1
  const o = useRef(null) // 标题行 2
  const s = useRef(null) // hero-card-modal 遮罩
  const c = useRef(null) // hero-card-modal-content
  const u = useRef(0) // 自动滚动位移
  const d = useRef(0) // 拖拽位移
  const f = useRef(0) // 速度
  const p = useRef(0) // 指针状态：0 空闲 / 1 按下 / 2 释放
  const m = useRef(0) // pointerdown 时 clientX
  const h = useRef(0) // 拖拽起点位移
  const g = useRef(0) // 最近一次 clientX
  const _ = useRef(0) // pointerdown 时间
  const [v, y] = useState(null) // 选中项数据
  const [b, x] = useState(false) // 弹窗是否打开
  const [S, C] = useState(false) // 动画锁
  const w = useRef(null) // 源卡片 rect
  const T = useRef({ scale: 1, rotate: 0 }) // 源卡片 transform
  const E = useMemo(() => fa.concat(fa), [])

  // 标题进场（GSAP，受 openingComplete 控制）
  useEffect(() => {
    if (openingComplete) {
      U.set([a.current, o.current], { opacity: 0, x: -100, scaleX: 0.8, skewX: -10 })
      U.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })
        .to(a.current, { opacity: 1, x: 0, scaleX: 1, skewX: 0, duration: 1 })
        .to(o.current, { opacity: 1, x: 0, scaleX: 1, skewX: 0, duration: 1 }, 0.2)
    }
  }, [openingComplete])

  // 自动滚动 + 拖拽惯性 + 轨道位移（rAF 循环，逐字自 bundle）
  // 交互节流：页面滚动时暂停轮播 rAF，让出主线程给滚动合成；松手空闲 150ms 后恢复。
  // 仅监听 scroll —— 不监听 pointerdown/touchstart，否则会打断轮播自身的拖拽跟手
  // （拖拽 onMove 依赖 tick 更新 transform，暂停会导致卡片不跟手）。
  useEffect(() => {
    let rafId = 0
    let e = 0
    let last = 0
    let paused = false
    let idleTimer = 0
    const tick = (o) => {
      if (paused) { rafId = 0; return }
      const now = performance.now()
      if (now - last < 33.333333333333336) {
        rafId = requestAnimationFrame(tick)
        return
      }
      last = now
      e = e || o
      const s = Math.min((o - e) / 1000, 0.1)
      e = o
      const c = 25 + 18 * Math.sin(o * 35e-5 + 1.2)
      const l = p.current
      if (l === 2) {
        const m = Math.abs(f.current)
        f.current *= m > 250 ? 0.86 : m > 80 ? 0.93 : 0.97
        d.current += f.current * s
        m < 6 && (p.current = 0)
      } else if (l === 0) {
        u.current += c * s
        u.current >= ha && (u.current -= ha)
      }
      const h = ((u.current + d.current) % ha + ha) % ha
      n.current && (n.current.style.transform = `translateX(${-h}px)`)
      rafId = requestAnimationFrame(tick)
    }
    const start = () => { if (rafId === 0 && !paused) rafId = requestAnimationFrame(tick) }
    const stop = () => { if (rafId !== 0) { cancelAnimationFrame(rafId); rafId = 0 } }
    const markActive = () => {
      stop()
      clearTimeout(idleTimer)
      paused = true
      idleTimer = setTimeout(() => { paused = false; start() }, 150)
    }
    rafId = requestAnimationFrame(tick)
    window.addEventListener('scroll', markActive, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
      window.removeEventListener('scroll', markActive)
    }
  }, [])

  // 拖拽 / 吸附 / 点击
  useEffect(() => {
    const el = r.current
    if (!el) return
    const onDown = (e) => {
      p.current = 1
      m.current = e.clientX
      h.current = d.current
      g.current = e.clientX
      _.current = performance.now()
    }
    const onMove = (e) => {
      if (p.current === 1) {
        d.current = h.current - (e.clientX - m.current)
        const t = performance.now()
        const n = t - _.current
        n > 0 && (f.current = ((e.clientX - g.current) / n) * 16)
        g.current = e.clientX
        _.current = t
      }
    }
    const onUp = (e) => {
      p.current = 2
      if (Math.abs(e.clientX - m.current) < 10) {
        const t = e.target.closest('.hero-carousel-item')
        if (t) {
          const n = Array.from(t.parentElement.children).indexOf(t)
          const r = E[n]
          r && A(r, n)
        }
      }
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [E])

  // 首屏性能：轮播图片用 data-src 占位，window.load + 空闲后才批量加载真实图片，
  // 避免首屏 16 张外部 picsum 请求/解码抢占主线程导致首次滑动卡顿。
  // 占位期间显示纯色背景 + placeholder 文字（与原站 .hero-carousel-placeholder 一致）。
  useEffect(() => {
    const loadImgs = () => {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1))
      return ric(() => {
        document.querySelectorAll('.hero-carousel-image[data-src]').forEach((img) => {
          img.src = img.getAttribute('data-src')
          img.removeAttribute('data-src')
        })
      }, { timeout: 3000 })
    }
    let ricId = null
    if (document.readyState === 'complete') ricId = loadImgs()
    else window.addEventListener('load', loadImgs, { once: true })
    return () => {
      window.removeEventListener('load', loadImgs)
      if (window.cancelIdleCallback && ricId) window.cancelIdleCallback(ricId)
    }
  }, [])

  // 打开弹窗（FLIP：从源卡片 rect 动画到居中放大）
  const O = () => {
    if (!(c.current && w.current)) return
    const e = w.current
    const t = T.current
    const n = Math.min(520, window.innerWidth - 40)
    const r = Math.min(650, window.innerHeight - 80)
    const i = (window.innerWidth - n) / 2
    const a = (window.innerHeight - r) / 2
    U.set(c.current, { left: e.left, top: e.top, width: e.width, height: e.height, scale: t.scale, rotate: t.rotate, borderRadius: 12, opacity: 1, x: 0, y: 0 })
    U.to(s.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    U.timeline({ defaults: { ease: 'power4.out' }, onComplete: () => C(false) })
      .to(c.current, { duration: 0.7, left: i, top: a - 60, width: n, height: r, scale: 1.15, rotate: 0, borderRadius: 28 })
      .to(c.current, { duration: 0.4, top: a, scale: 1, borderRadius: 24, ease: 'power2.out' })
  }
  // 关闭弹窗
  const k = () => {
    if (!(c.current && w.current)) {
      x(false)
      y(null)
      C(false)
      return
    }
    const e = w.current
    const t = T.current
    U.to(s.current, { opacity: 0, duration: 0.35, ease: 'power2.in' })
    U.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => { x(false); y(null); C(false) } })
      .to(c.current, { duration: 0.15, top: '+=30', scale: 0.95, ease: 'power2.in' })
      .to(c.current, { duration: 0.5, left: e.left, top: e.top, width: e.width, height: e.height, scale: t.scale, rotate: t.rotate, borderRadius: 12 })
  }
  // 点击卡片 -> 计算源 rect / transform 并打开
  const A = (e, t) => {
    if (!(S || b)) {
      const n = i.current[t]
      if (n) {
        const r = n.getBoundingClientRect()
        const a = window.getComputedStyle(n).transform || 'none'
        let o = 1
        let s = 0
        if (a !== 'none') {
          const c = a.match(/matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),/)
          if (c) {
            const l = parseFloat(c[1])
            const u = parseFloat(c[2])
            o = Math.sqrt(l * l + u * u)
            s = (180 / Math.PI) * Math.atan2(u, l)
          }
        }
        w.current = r
        T.current = { scale: o, rotate: s }
        y(e)
        x(true)
        C(true)
        requestAnimationFrame(() => O())
      }
    }
  }
  // 点击遮罩 / 关闭按钮
  const j = (e) => {
    e && e.stopPropagation()
    !(S || !b) && (C(true), k())
  }

  const D = useMemo(() => (e, t) => { i.current[t] = e }, [])

  const name = t(profile.identity.name) // "Amber River" | "琥珀川"
  // 名字按空格拆两行：英文 "Amber River" → accent=Amber, outline=River；
  // 中文 "琥珀川"（无空格）→ 只渲染 accent 行，避免 outline 行回退到硬编码 'River'。
  const nameParts = name.split(' ').filter(Boolean)
  const title1 = nameParts[0] || ''
  const title2 = nameParts.slice(1).join(' ')
  const hasSubtitle = nameParts.length > 1

  return (
    <section id="top" className="hero">
      <div className="hero-bg-image"><img src={da} alt="" fetchpriority="high" loading="eager" decoding="async" /></div>
      <div className="hero-bg" />
      <div className="hero-frost" />
      <div className="hero-dotfield">
        <DotField
          dotRadius={1.5}
          dotSpacing={28}
          cursorRadius={500}
          cursorForce={0.15}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(200, 255, 0, 0.35)"
          gradientTo="rgba(120, 200, 150, 0.25)"
          glowColor="#c8ff00"
        />
      </div>

      {/* 居中三旋转环（原站 avatar-ring，置于 Hero 中央） */}
      <div className="hero-rings" aria-hidden="true">
        <div className="avatar-ring ring-outer" />
        <div className="avatar-ring ring-mid" />
        <div className="avatar-ring ring-inner" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line accent" ref={a}>{title1}</span>
          {hasSubtitle && <span className="hero-title-line outline" ref={o}>{title2}</span>}
        </h1>
      </div>

      <div className="hero-carousel" ref={r}>
        <div className="hero-carousel-track" ref={n}>
          {E.map((item, idx) => (
            <div className="hero-carousel-item" key={idx} ref={(el) => D(el, idx)} style={{ background: item.color }}>
              {/* placeholder：图片未加载时的纯色 + 文字占位（复刻原站 .hero-carousel-placeholder），
                  避免空白卡片 + 让首屏零外部图片请求 */}
              <div className="hero-carousel-placeholder">{item.label}</div>
              <img data-src={item.img} alt={item.label} className="hero-carousel-image" loading="lazy" decoding="async" />
              <div className="hero-carousel-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {b && v && (
        <div ref={s} className="hero-card-modal" style={{ opacity: 0 }} onClick={j}>
          <div ref={c} className="hero-card-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={v.img} alt={v.label} className="hero-card-modal-image" />
            <div className="hero-card-modal-label">{v.label}</div>
            <button className="hero-card-modal-close" onClick={j}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
