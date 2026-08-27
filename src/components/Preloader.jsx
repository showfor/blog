import { useEffect, useState } from 'react'

// 品牌加载动画：极速淡出，绝不阻塞用户浏览或引发黑屏
const BRAND = 'hakuriver'

export default function Preloader({ onDone }) {
  const [mounted, setMounted] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // 挂载后立即通知外部组件就绪，避免任何子组件因等待而空白
    onDone?.()

    // 0.4s 后开始淡出，0.7s 后彻底从 DOM 移除
    const t1 = setTimeout(() => setLeaving(true), 400)
    const t2 = setTimeout(() => setMounted(false), 750)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  if (!mounted) return null

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
