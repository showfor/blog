import { useRef } from 'react'

// 发光卡片：沿用 gerenzhan 的 .glow-card（即原站 .border-glow-card）视觉。
// 交互分工：
//   · 鼠标移入/移动：根据光标位置实时更新 --cursor-angle（描边跟随）与 --edge-proximity（越近边缘越亮）。
//   · 进场环扫：进入视口后由 GSAP 驱动 --cursor-angle / --edge-proximity 做一次 conic 扫光
//     （见 src/animations/siteAnimations.js 的 runGlowSweep，1:1 复刻原站 delay:1500/duration:2250 段）。
//   · 滚动入场：通过 .reveal 标记类交由 GSAP ScrollTrigger.batch 统一处理（不再各自挂 IO）。
export default function GlowCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)

  // 鼠标移动：把光标坐标换算为「相对卡片中心的角度」与「距最近边的接近度」。
  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const cx = r.width / 2
    const cy = r.height / 2
    // 角度：以卡片中心为原点，0° 指向右、-90° 指向上，+90° 指向下；+90 让「环扫」从顶部开始。
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

  // 离开：复位接近度（描边随之淡出，除非正处于 sweep-active 进场扫光中）。
  function onLeave() {
    const el = ref.current
    if (el) el.style.setProperty('--edge-proximity', '0')
  }

  return (
    <Tag
      ref={ref}
      className={`glow-card reveal ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
