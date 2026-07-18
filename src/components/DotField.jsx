import { memo, useRef, useEffect } from 'react'

const TAU = Math.PI * 2

/**
 * DotField（原站组件 ua）。2D canvas 点阵 + 光标凸起(bulge)/发光。
 * 逐字移植自线上混淆 bundle（orig.js 的 ua 组件），包括：
 *   · 点阵按 dotSpacing 网格生成、随容器 resize 重算
 *   · 光标进入 cursorRadius 内时 bulge-only 凸起（或 force 推动），否则回弹静止
 *   · glow 径向渐变 svg circle 跟随光标，opacity 由速度缓动
 *   · 30fps 无关的 rAF 渲染、IntersectionObserver(threshold:0) + visibilitychange 暂停
 * 默认配置与原站一致；Hero 中以显式 props 覆盖为 lime 绿配色。
 */
function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  ...p
}) {
  const m = useRef(null) // canvas 元素
  const h = useRef(null) // svg 元素
  const g = useRef(null) // glow circle 元素
  const _ = useRef([]) // 点阵
  const v = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 }) // 光标
  const y = useRef(null) // rAF id
  const b = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 }) // 容器尺寸/偏移
  const x = useRef(0) // glow opacity 当前值
  const S = useRef(0) // glow opacity 目标值
  const C = useRef({}) // 配置快照
  C.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  }
  const w = useRef(null) // 手动触发 resize 的句柄
  const T = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`) // 渐变 id
  const E = useRef(false) // 初始化守卫（StrictMode 双调用安全）

  useEffect(() => {
    if (E.current) return
    E.current = true

    let teardown = null
    const init = () => {
    const e = m.current
    const t = g.current
    if (!e) return
    const n = e.getContext('2d', { alpha: true })
    const r = Math.min(window.devicePixelRatio || 1, 1.5)
    let a = true // 是否进入视口
    let o = !document.hidden // 是否可见
    let grad = null // 缓存的静态线性渐变（仅在 resize 时重建，避免每帧 new）

    let i // resize 防抖 timer

    function s() {
      clearTimeout(i)
      i = setTimeout(c, 100)
    }
    function c() {
      const t = e.parentElement
      if (!t) return
      const a = t.getBoundingClientRect()
      const os = a.width
      const sh = a.height
      if (os === 0 || sh === 0) {
        i = setTimeout(c, 100)
        return
      }
      e.width = os * r
      e.height = sh * r
      e.style.width = `${os}px`
      e.style.height = `${sh}px`
      n.setTransform(r, 0, 0, r, 0, 0)
      b.current = { w: os, h: sh, offsetX: a.left + window.scrollX, offsetY: a.top + window.scrollY }
      l(os, sh)
      // 缓存线性渐变：坐标仅在 resize 变化，颜色来自静态 props，无需每帧重建
      grad = n.createLinearGradient(0, 0, os, sh)
      grad.addColorStop(0, C.current.gradientFrom)
      grad.addColorStop(1, C.current.gradientTo)
    }
    function l(e, t) {
      const n = C.current
      const r = n.dotRadius + n.dotSpacing
      const i = Math.floor(e / r)
      const a = Math.floor(t / r)
      const os = (e % r) / 2
      const sh = (t % r) / 2
      const c = new Array(a * i)
      let l = 0
      for (let e = 0; e < a; e++) {
        for (let t = 0; t < i; t++) {
          const n = os + t * r + r / 2
          const i = sh + e * r + r / 2
          c[l++] = { ax: n, ay: i, sx: n, sy: i, vx: 0, vy: 0, x: n, y: i }
        }
      }
      _.current = c
    }
    function u(e) {
      const t = b.current
      v.current.x = e.pageX - t.offsetX
      v.current.y = e.pageY - t.offsetY
    }
    function d() {
      const e = v.current
      const t = e.prevX - e.x
      const n = e.prevY - e.y
      const r = Math.sqrt(t * t + n * n)
      e.speed += (r - e.speed) * 0.5
      e.speed < 0.001 && (e.speed = 0)
      e.prevX = e.x
      e.prevY = e.y
    }
    i = setTimeout(c, 100)
    let p = 0
    function h() {
      const now = performance.now()
      if (now - (h._last || 0) < 33.333333333333336) {
        y.current = requestAnimationFrame(h)
        return
      }
      h._last = now
      p++
      d() // 光标速度衰减并入 rAF 循环（取代已移除的 setInterval(d,20) 50Hz 定时器）
      const e = _.current
      const r = v.current
      const { w: i, h: s } = b.current
      const c = C.current
      const l = e.length
      const u = p * 0.02
      const dn = Math.min(r.speed / 5, 1)
      S.current += (dn - S.current) * 0.06
      S.current < 0.001 && (S.current = 0)
      const f = S.current
      x.current += (f - x.current) * 0.08
      // 光标静止（速度+glow 衰减到 0）且无 sparkle/wave → 点阵完全静止，
      // 跳过 clearRect/遍历/fill 节省 CPU（滚动时主线程让给页面合成）。
      // rAF 循环继续（满足"背景不停"），仅回调变轻；光标移动时立即恢复重绘。
      const idle = !c.sparkle && c.waveAmplitude === 0 && x.current < 0.001 && S.current < 0.001
      if (!idle) {
        t && (t.setAttribute('cx', r.x), t.setAttribute('cy', r.y), (t.style.opacity = x.current))
        n.clearRect(0, 0, i, s)
        // 复用缓存的静态渐变（仅在 resize 时重建），避免每帧 new createLinearGradient
        if (!grad && i > 0 && s > 0) {
          grad = n.createLinearGradient(0, 0, i, s)
          grad.addColorStop(0, c.gradientFrom)
          grad.addColorStop(1, c.gradientTo)
        }
        n.fillStyle = grad
        const g = c.cursorRadius
        const w = g * g
        const T = c.dotRadius / 2
        const E = c.bulgeOnly
        n.beginPath()
        for (let t = 0; t < l; t++) {
          const i = e[t]
          const a = r.x - i.ax
          const o = r.y - i.ay
          const s = a * a + o * o
          if (s < w && f > 0.01) {
            const e = Math.sqrt(s)
            if (E) {
              const t = 1 - e / g
              const n = t * t * c.bulgeStrength * f
              const r = Math.atan2(o, a)
              i.sx += (i.ax - Math.cos(r) * n - i.sx) * 0.15
              i.sy += (i.ay - Math.sin(r) * n - i.sy) * 0.15
            } else {
              const t = Math.atan2(o, a)
              const n = (500 / e) * (r.speed * c.cursorForce)
              i.vx += Math.cos(t) * -n
              i.vy += Math.sin(t) * -n
            }
          } else E && ((i.sx += (i.ax - i.sx) * 0.1), (i.sy += (i.ay - i.sy) * 0.1))
          E || ((i.vx *= 0.9), (i.vy *= 0.9), (i.x = i.ax + i.vx), (i.y = i.ay + i.vy), (i.sx += (i.x - i.sx) * 0.1), (i.sy += (i.y - i.sy) * 0.1))
          let l = i.sx
          let d = i.sy
          c.waveAmplitude > 0 && ((d += Math.sin(i.ax * 0.03 + u) * c.waveAmplitude), (l += Math.cos(i.ay * 0.03 + u * 0.7) * c.waveAmplitude * 0.5))
          c.sparkle && ((t * 2654435761 ^ p >> 3) >>> 0) % 100 < 3
            ? (n.moveTo(l + T * 1.8, d), n.arc(l, d, T * 1.8, 0, TAU))
            : (n.moveTo(l + T, d), n.arc(l, d, T, 0, TAU))
        }
        n.fill()
      }
      a && o && (y.current = requestAnimationFrame(h))
    }
    const T = () => {
      y.current === null && a && o && (y.current = requestAnimationFrame(h))
    }
    const D = () => {
      y.current !== null && (cancelAnimationFrame(y.current), (y.current = null))
    }
    const O = new IntersectionObserver(([e]) => {
      a = e.isIntersecting
      a ? T() : D()
    }, { threshold: 0 })
    O.observe(e)
    const k = () => {
      o = !document.hidden
      o ? T() : D()
    }
    document.addEventListener('visibilitychange', k)

    c()
    window.addEventListener('resize', s)
    window.addEventListener('mousemove', u, { passive: true })
    T()
    w.current = () => {
      const { w: e, h: t } = b.current
      e > 0 && t > 0 && l(e, t)
    }
    teardown = () => {
      cancelAnimationFrame(y.current)
      clearTimeout(i)
      window.removeEventListener('resize', s)
      window.removeEventListener('mousemove', u)
      document.removeEventListener('visibilitychange', k)
      O.disconnect()
    }
    }

    // 首屏关键路径优化：把点阵分配 + 起 rAF 循环从挂载同步初始化移出，
    // 改为 requestIdleCallback 调度的「预热型」延迟 —— 首次滑动手势不再与
    // 点阵初始化 + 首帧 draw 抢主线程。{ timeout: 4000 } 兜底：持续滚动时也在
    // 4s 内启动；正常情况首屏渲染后很快 idle，点阵及时出现、30fps 动画对细微点阵不可感知。
    const ric = window.requestIdleCallback || ((cb) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1))
    // 首屏滑动卡顿修复：rIC 触发后若用户正在滑动，推迟 init 到滑动停止，
    // 避免点阵网格构建 + 首帧 draw 撞首次滑动手势造成掉帧。
    let lastScrollAt = 0
    let scrollRetry = 0
    const onScrollCheck = () => { lastScrollAt = performance.now() }
    window.addEventListener('scroll', onScrollCheck, { passive: true })
    const tryInit = () => {
      if (performance.now() - lastScrollAt < 300) {
        scrollRetry = setTimeout(tryInit, 200)
        return
      }
      window.removeEventListener('scroll', onScrollCheck)
      init()
    }
    const ricId = ric(tryInit, { timeout: 4000 })
    return () => {
      if (window.cancelIdleCallback && ricId) cancelIdleCallback(ricId)
      clearTimeout(scrollRetry)
      window.removeEventListener('scroll', onScrollCheck)
      if (teardown) teardown()
    }
  }, [])

  useEffect(() => {
    w.current && w.current()
  }, [dotRadius, dotSpacing])

  return (
    <div className="dot-field-container" {...p}>
      <canvas ref={m} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <svg ref={h} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <radialGradient id={T.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle ref={g} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${T.current})`} style={{ opacity: 0, willChange: 'opacity' }} />
      </svg>
    </div>
  )
}

DotField.displayName = 'DotField'
export default memo(DotField)
