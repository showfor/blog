import { useRef, useEffect } from 'react'

// Canvas 粒子拖尾光标 —— 桌面端生效，移动端自动关闭
// 零额外依赖，30fps 节流，rAF 驱动

const TRAIL_LEN = 18   // 拖尾粒子数
const RADIUS = 3       // 最大粒子半径
const COLORS = ['200,255,0', '255,193,7'] // 酸橙绿 + 琥珀

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])    // { x, y, t } 历史位置队列
  const mouseRef = useRef({ x: -100, y: -100, active: false })
  const timeRef = useRef(0)

  useEffect(() => {
    // 仅在非触屏设备启用
    if ('ontouchstart' in window) return

    document.documentElement.classList.add('cursor-custom')
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animId

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onLeave = () => { mouseRef.current.active = false }
    const onEnter = () => { mouseRef.current.active = true }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const draw = (ts) => {
      timeRef.current = ts * 0.001
      const { x, y, active } = mouseRef.current
      const pts = pointsRef.current

      // 推入新点
      if (active) pts.push({ x, y, t: timeRef.current })
      // 裁掉过期点
      while (pts.length > TRAIL_LEN) pts.shift()

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      if (!active && pts.length === 0) {
        animId = requestAnimationFrame(draw)
        return
      }

      // 倒序绘制（最新 = 最大 = 最亮）
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i]
        const age = timeRef.current - p.t
        if (age > 0.5) { pts.splice(i, 1); continue }
        const alpha = 1 - age / 0.5
        const r = RADIUS * alpha
        const color = COLORS[(pts.length - 1 - i) % 2]

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => {
      document.documentElement.classList.remove('cursor-custom')
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
