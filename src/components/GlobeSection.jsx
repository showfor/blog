import { useRef, useEffect, useState, useCallback } from 'react'

// ============================================================
//  实时访客地球仪 — Canvas 2D orthographic projection
//  数据来源：ipapi.co 免费 IP 地理定位 + localStorage 累积
//  零额外依赖。
// ============================================================

// 默认种子城市（站点主人座标 + 全球主要城市），与真实访客合并显示。
const SEED_CITIES = [
  { lat: 22.55, lng: 114.06, city: 'Shenzhen', weight: 4 },
  { lat: 37.77, lng: -122.42, city: 'San Francisco', weight: 2 },
  { lat: 40.71, lng: -74.01, city: 'New York', weight: 2 },
  { lat: 51.51, lng: -0.13, city: 'London', weight: 2 },
  { lat: 35.69, lng: 139.69, city: 'Tokyo', weight: 3 },
  { lat: -33.87, lng: 151.21, city: 'Sydney', weight: 1 },
  { lat: 48.86, lng: 2.35, city: 'Paris', weight: 1 },
  { lat: 55.76, lng: 37.62, city: 'Moscow', weight: 1 },
  { lat: -23.55, lng: -46.63, city: 'São Paulo', weight: 1 },
  { lat: 19.43, lng: -99.13, city: 'Mexico City', weight: 1 },
  { lat: 1.35, lng: 103.82, city: 'Singapore', weight: 2 },
  { lat: 37.57, lng: 126.98, city: 'Seoul', weight: 2 },
  { lat: -1.28, lng: 36.82, city: 'Nairobi', weight: 1 },
  { lat: 25.20, lng: 55.27, city: 'Dubai', weight: 1 },
  { lat: 59.33, lng: 18.07, city: 'Stockholm', weight: 1 },
]

// localStorage key
const LS_KEY = 'globe_visitors'
const MAX_STORED = 30 // 最多保留 30 个不重复城市
const DEBOUNCE_MS = 1000 * 60 * 10 // 10 分钟内不重复记录同一个 IP（API 节流）

function loadStored() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.filter(v => typeof v.lat === 'number' && typeof v.lng === 'number')
  } catch { return [] }
}

function saveStored(visitors) {
  try {
    const trimmed = visitors.slice(-MAX_STORED)
    localStorage.setItem(LS_KEY, JSON.stringify(trimmed))
  } catch { /* quota exceeded — silently ignore */ }
}

// Orthographic projection on y-axis rotation
function project(lat, lng, rot, R) {
  const la = (lat * Math.PI) / 180
  const lo = ((lng - rot) * Math.PI) / 180
  const x3d = Math.cos(la) * Math.sin(lo)
  const y3d = Math.sin(la)
  const z3d = Math.cos(la) * Math.cos(lo)
  return { sx: R * x3d, sy: R * y3d, z: z3d, visible: z3d > -0.05 }
}

// 简化大洲轮廓顶点
const CONTINENTS = [
  [65,-165,58,-150,50,-130,43,-125,38,-123,34,-118,28,-113,21,-108,19,-99,16,-93,19,-80,30,-81,34,-77,42,-70,48,-65,52,-80,56,-87,58,-95,62,-120,65,-145,65,-165],
  [12,-72,8,-77,4,-78,-3,-80,-8,-78,-15,-75,-19,-68,-23,-67,-25,-60,-21,-51,-15,-42,-5,-36,-3,-41,0,-49,5,-56,8,-62,10,-67,12,-72],
  [43,-5,45,7,47,12,48,25,45,36,41,45,36,45,34,42,36,28,36,23,37,15,38,8,39,0,43,-5],
  [37,9,36,14,32,20,30,26,26,30,22,30,18,35,5,39,-1,40,-5,38,-8,35,-12,34,-17,35,-20,37,-25,35,-30,28,-34,23,-35,17,-30,11,-17,11,-5,8,0,6,7,0,12,-5,15,-5,17,-8,19,-15,23,-17,28,-9,31,-2,30,5,37,9],
  [70,140,75,130,75,110,73,90,72,70,68,55,52,51,45,52,41,45,43,30,41,25,38,20,36,25,32,35,30,40,26,35,22,37,17,37,11,43,8,43,5,46,-2,44,-8,40,-6,35,-3,30,-1,28,6,25,10,26,15,25,18,18,21,20,23,25,28,30,35,35,40,42,43,48,50,55,53,62,55,72,56,83,60,95,64,105,66,115,68,130,70,140],
  [-14,130,-20,135,-22,140,-12,142,-10,137,-14,130],
]

const GLOBE_BASE = [
  { pos: 0, color: '#1a3a1a' },
  { pos: 0.4, color: '#0c1c0c' },
  { pos: 1, color: '#050505' },
]
const DOT_RGB = '200,255,0'
const ATMO_RGB = '200,255,0'

// ─── 主组件 ────────────────────────────────────────────

export default function GlobeSection() {
  const canvasRef = useRef(null)
  const rotRef = useRef(0)
  const timeRef = useRef(0)
  // 用 ref 存合并后的访客列表，避免每帧因 state 更新而重挂 rAF
  const visitorsRef = useRef([...SEED_CITIES])
  // 用 ref 标记是否有新 city 加入时的入场动画起点时间
  const newVisitorTimeRef = useRef(0)
  const [visitorCount, setVisitorCount] = useState(SEED_CITIES.length)

  // ── 启动 IP 地理定位 ──────────────────────────────
  const fetchLocation = useCallback(async () => {
    // 节流：检查上次请求时间
    const lastFetch = localStorage.getItem('globe_last_fetch')
    if (lastFetch && Date.now() - Number(lastFetch) < DEBOUNCE_MS) return

    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 4000)
      const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal })
      clearTimeout(t)
      if (!res.ok) return
      const data = await res.json()
      if (!data.latitude || !data.longitude) return

      localStorage.setItem('globe_last_fetch', String(Date.now()))

      const stored = loadStored()
      // 按城市去重（同一城市不计入第二次）
      const cityKey = (data.city || 'unknown').toLowerCase()
      const exists = stored.some(
        v => (v.city && v.city.toLowerCase() === cityKey) &&
             Math.abs(v.lat - data.latitude) < 0.5 &&
             Math.abs(v.lng - data.longitude) < 0.5
      )
      if (!exists) {
        const entry = {
          lat: data.latitude,
          lng: data.longitude,
          city: data.city || 'Unknown',
          country: data.country_name || '',
          weight: 2,
        }
        stored.push(entry)
        saveStored(stored)
        // 合并种子城市 + 所有真实访客
        visitorsRef.current = [...SEED_CITIES, ...stored]
        newVisitorTimeRef.current = performance.now() * 0.001
        setVisitorCount(SEED_CITIES.length + stored.length)
      }
    } catch {
      // API 静默失败 — 退回到种子+本地已有数据
    }
  }, [])

  // ── 初始化：加载本地累积数据，然后异步获取当前 IP ──
  useEffect(() => {
    const stored = loadStored()
    visitorsRef.current = [...SEED_CITIES, ...stored]
    setVisitorCount(SEED_CITIES.length + stored.length)
    // 异步获取当前访客 IP（不阻塞首帧渲染）
    fetchLocation()
  }, [fetchLocation])

  // ── Canvas 渲染循环 ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animId

    const resize = () => {
      const p = canvas.parentElement
      if (!p) return
      const w = Math.min(p.clientWidth, 360)
      canvas.width = w * dpr
      canvas.height = w * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${w}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const draw = (ts) => {
      const now = ts * 0.001
      timeRef.current = now
      rotRef.current = now * 15

      const W = canvas.width / dpr
      const H = canvas.height / dpr
      const cx = W / 2
      const cy = H / 2
      const R = W * 0.4
      const rot = rotRef.current
      const visitors = visitorsRef.current

      ctx.clearRect(0, 0, W, H)

      // 大气光晕
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.18)
      atmo.addColorStop(0, `rgba(${ATMO_RGB},0)`)
      atmo.addColorStop(0.45, `rgba(${ATMO_RGB},0.06)`)
      atmo.addColorStop(1, `rgba(${ATMO_RGB},0)`)
      ctx.fillStyle = atmo
      ctx.fillRect(0, 0, W, H)

      // 球体底
      const bg = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.2, R * 0.05, cx, cy, R)
      bg.addColorStop(0, GLOBE_BASE[0].color)
      bg.addColorStop(0.4, GLOBE_BASE[1].color)
      bg.addColorStop(1, GLOBE_BASE[2].color)
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()

      // 经纬网
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
      ctx.strokeStyle = 'rgba(200,255,0,0.04)'; ctx.lineWidth = 0.4
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * 360
        const r = R * Math.abs(Math.cos(((a - rot) * Math.PI) / 180))
        ctx.beginPath(); ctx.ellipse(cx, cy, r, R, 0, 0, Math.PI * 2); ctx.stroke()
      }
      for (const lat of [-66, -45, -23, 0, 23, 45, 66]) {
        const lr = (lat * Math.PI) / 180
        const ry = R * Math.abs(Math.sin(lr)); const rx = R * Math.cos(lr)
        ctx.beginPath(); ctx.ellipse(cx, cy - R * Math.sin(lr), rx, ry, 0, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(200,255,0,0.08)'; ctx.lineWidth = 0.6
      ctx.beginPath(); ctx.ellipse(cx, cy, R, 0, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.restore()

      // 大洲轮廓
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
      ctx.strokeStyle = 'rgba(200,255,0,0.12)'; ctx.lineWidth = 0.6; ctx.lineJoin = 'round'
      for (const pts of CONTINENTS) {
        let s = false; ctx.beginPath()
        for (let i = 0; i < pts.length; i += 2) {
          const pt = project(pts[i], pts[i + 1], rot, R)
          if (!pt.visible) { if (s) { ctx.stroke(); s = false } continue }
          if (!s) { ctx.moveTo(cx + pt.sx, cy + pt.sy); s = true }
          else ctx.lineTo(cx + pt.sx, cy + pt.sy)
        }
        if (s) ctx.stroke()
      }
      ctx.restore()

      // 访客光点
      const dots = []
      for (const v of visitors) {
        const pt = project(v.lat, v.lng, rot, R)
        if (!pt.visible) continue
        dots.push({
          sx: cx + pt.sx, sy: cy + pt.sy, z: pt.z,
          weight: v.weight || 2,
          isNew: v.isNew || false,
        })
      }
      dots.sort((a, b) => a.z - b.z)

      for (const d of dots) {
        const opacity = 0.5 + d.z * 0.5
        const pulse = (1 + Math.sin(timeRef.current * 2.5 + d.sx * 0.1)) * 0.5 + 0.5
        const baseR = 1.8 + d.weight * 2
        const r = baseR + pulse * 2.5

        const glow = ctx.createRadialGradient(d.sx, d.sy, 0, d.sx, d.sy, r * 1.8)
        glow.addColorStop(0, `rgba(${DOT_RGB},${opacity})`)
        glow.addColorStop(0.4, `rgba(${DOT_RGB},${opacity * 0.35})`)
        glow.addColorStop(1, `rgba(${DOT_RGB},0)`)
        ctx.beginPath(); ctx.arc(d.sx, d.sy, r * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        ctx.beginPath(); ctx.arc(d.sx, d.sy, baseR * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`; ctx.fill()
      }

      // 球体边线
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(200,255,255,0.12)'; ctx.lineWidth = 1; ctx.stroke()

      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <section className="globe-section section">
      <div className="container">
        <div className="globe-wrapper" aria-hidden="true">
          <canvas ref={canvasRef} />
          <p className="globe-label">
            <span className="globe-label-dot" />
            <span className="globe-label-text">
              {visitorCount} cities across the globe
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
