import { useRef, useCallback, useEffect } from 'react'

/* =========================================================================
 * 发光卡片（原站 BorderGlowCard / qc 组件，逐字自混淆 bundle orig.js）。
 *   · 鼠标移入/移动：onPointerMove 实时更新 --cursor-angle（描边跟随）与
 *     --edge-proximity（越近边缘越亮），数学与原站 h()/g() 完全一致。
 *   · 进场环扫：animated 为真时由原生 Kc（requestAnimationFrame）驱动
 *     --cursor-angle / --edge-proximity 的 conic 扫光，替代克隆版原 GSAP runGlowSweep。
 *   · 配色：zc() 解析 glowColor("40 80 80") 生成 --glow-color* 系列，
 *     Uc() 由 colors 生成 7 层 --gradient-* 径向渐变。
 * 全程不使用 GSAP / ScrollTrigger，与原站一致。
 * ========================================================================= */

function Gc(e) {
  return e * e * e
}
function Wc(e) {
  return 1 - (1 - e) ** 3
}
// 原生 rAF 缓动 tween（原站 Kc）
function Kc({ start = 0, end = 100, duration = 1000, delay = 0, ease = Wc, onUpdate, onEnd }) {
  const s = performance.now() + delay
  function c() {
    const r = performance.now() - s
    const l = Math.min(r / duration, 1)
    onUpdate && onUpdate(start + (end - start) * ease(l))
    l < 1 ? requestAnimationFrame(c) : onEnd && onEnd()
  }
  setTimeout(() => requestAnimationFrame(c), delay)
}

// glowColor("40 80 80") -> {h,s,l}
function Rc(e) {
  const t = e.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  return t
    ? { h: parseFloat(t[1]), s: parseFloat(t[2]), l: parseFloat(t[3]) }
    : { h: 40, s: 80, l: 80 }
}
// 生成 --glow-color / --glow-color-60 ... -10 系列（原站 zc）
function zc(e, t) {
  const { h: n, s: r, l: i } = Rc(e)
  const a = `${n}deg ${r}% ${i}%`
  const o = [100, 60, 50, 40, 30, 20, 10]
  const s = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const c = {}
  for (let e = 0; e < o.length; e++) {
    c[`--glow-color${s[e]}`] = `hsl(${a} / ${Math.min(o[e] * t, 100)}%)`
  }
  return c
}

const Bc = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const Vc = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
]
const Hc = [0, 1, 2, 0, 1, 2, 1]
// 由 colors 生成 7 层径向渐变 + base（原站 Uc）
function Uc(e) {
  const t = {}
  for (let n = 0; n < 7; n++) {
    const r = e[Math.min(Hc[n], e.length - 1)]
    t[Vc[n]] = `radial-gradient(at ${Bc[n]}, ${r} 0px, transparent 50%)`
  }
  return (t['--gradient-base'] = `linear-gradient(${e[0]} 0 100%)`), t
}

export default function GlowCard({
  as: Tag = 'div',
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
  children,
  style,
  ...rest
}) {
  const p = useRef(null)
  // rAF 节流句柄 + 最新指针事件缓存（避免每次 pointermove 都强制同步布局）。
  const pointerRaf = useRef(0)
  const lastPointerEvent = useRef(null)
  const m = useCallback((e) => {
    const { width, height } = e.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])
  // 边缘接近度（原站 h）
  const h = useCallback(
    (e, t, n) => {
      const [r, i] = m(e)
      const a = t - r
      const o = n - i
      let s = 1 / 0
      let c = 1 / 0
      a !== 0 && (s = r / Math.abs(a))
      o !== 0 && (c = i / Math.abs(o))
      return Math.min(Math.max(1 / Math.min(s, c), 0), 1)
    },
    [m]
  )
  // 光标角度（原站 g）
  const g = useCallback(
    (e, t, n) => {
      const [r, i] = m(e)
      const a = t - r
      const o = n - i
      if (a === 0 && o === 0) return 0
      const s = (180 / Math.PI) * Math.atan2(o, a) + 90
      return s < 0 ? s + 360 : s
    },
    [m]
  )
  // pointermove 处理（原站 _）：rAF 合并，每帧最多读 1 次 rect + 写 1 次变量。
  // 角度/接近度计算完全沿用原站 h()/g()，数学与像素输出零变化。
  const _ = useCallback(
    (e) => {
      lastPointerEvent.current = e
      if (pointerRaf.current) return
      pointerRaf.current = requestAnimationFrame(() => {
        pointerRaf.current = 0
        const e = lastPointerEvent.current
        const t = p.current
        if (!e || !t) return
        const n = t.getBoundingClientRect()
        const r = e.clientX - n.left
        const i = e.clientY - n.top
        const a = h(t, r, i)
        const o = g(t, r, i)
        t.style.setProperty('--edge-proximity', `${(a * 100).toFixed(3)}`)
        t.style.setProperty('--cursor-angle', `${o.toFixed(3)}deg`)
      })
    },
    [h, g]
  )

  // 卸载时取消未执行的 pointermove rAF，避免卸载后回调访问已销毁节点。
  useEffect(() => {
    return () => {
      if (pointerRaf.current) cancelAnimationFrame(pointerRaf.current)
    }
  }, [])

  // 进场环扫（原站 qc 的 animated 分支，原生 Kc）
  useEffect(() => {
    if (!animated || !p.current) return
    const e = p.current
    e.classList.add('sweep-active')
    e.style.setProperty('--cursor-angle', '110deg')
    Kc({ duration: 500, onUpdate: (t) => e.style.setProperty('--edge-proximity', t) })
    Kc({
      ease: Gc,
      duration: 1500,
      end: 50,
      onUpdate: (t) => {
        e.style.setProperty('--cursor-angle', `${t / 100 * 355 + 110}deg`)
      },
    })
    Kc({
      ease: Wc,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (t) => {
        e.style.setProperty('--cursor-angle', `${t / 100 * 355 + 110}deg`)
      },
    })
    Kc({
      ease: Gc,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (t) => e.style.setProperty('--edge-proximity', t),
      onEnd: () => e.classList.remove('sweep-active'),
    })
  }, [animated])

  const v = zc(glowColor, glowIntensity)
  return (
    <Tag
      ref={p}
      onPointerMove={_}
      className={`border-glow-card ${className}`.trim()}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...v,
        ...Uc(colors),
        ...(style || {}),
      }}
      {...rest}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </Tag>
  )
}
