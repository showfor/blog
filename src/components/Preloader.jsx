import { useEffect, useRef, useState } from 'react'

// 品牌加载动画：全屏纯黑遮罩 + "hakuriver" 字母逐字浮现 + 酸橙绿进度线。
// 页面资源就绪（window load / 最长 2.6s）后淡出，并通过 onDone 通知 App
// 触发 HeroSection 标题进场动画（两者衔接，形成完整的开屏序列）。
const BRAND = 'hakuriver'

export default function Preloader({ onDone }) {
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let raf = 0
    let timeout = 0
    const start = performance.now()
    const MAX_WAIT = 2600

    const tick = () => {
      const elapsed = performance.now() - start
      if (document.readyState === 'complete' || elapsed >= MAX_WAIT) {
        // 至少让字母动画（约 1s）跑完再淡出，避免加载过快时一闪而过
        const minShown = Math.max(0, 1000 - elapsed)
        timeout = setTimeout(() => {
          setLeaving(true)
          // 淡出动画结束后通知 App 触发 Hero 进场
          timeout = setTimeout(() => doneRef.current?.(), 650)
        }, minShown)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={`site-preloader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="site-preloader-brand">
        {BRAND.split('').map((ch, i) => (
          <span key={i} className="site-preloader-letter" style={{ '--i': i }}>{ch}</span>
        ))}
      </div>
      <div className="site-preloader-bar"><span /></div>
    </div>
  )
}
