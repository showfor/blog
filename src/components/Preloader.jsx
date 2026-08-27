import { useEffect, useRef, useState } from 'react'

// 品牌加载动画：全屏纯黑遮罩 + "hakuriver" 字母逐字浮现 + 酸橙绿进度线。
// 页面资源就绪后平滑淡出，并通过 onDone 通知 App 触发 HeroSection 标题进场动画。
// 动画结束后完全从 DOM 卸载，释放内存与合成层。
const BRAND = 'hakuriver'

export default function Preloader({ onDone }) {
  const [mounted, setMounted] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let timeoutId = null
    let unmountTimer = null
    const start = performance.now()
    const MAX_WAIT = 1000

    const finish = () => {
      if (timeoutId) return
      const elapsed = performance.now() - start
      // 保证字母进场动画展示完（~600ms）再淡出，避免一闪而过
      const minShown = Math.max(0, 600 - elapsed)
      timeoutId = setTimeout(() => {
        setLeaving(true)
        // 淡出完毕后触发 Hero 进场并完全卸载 Preloader
        unmountTimer = setTimeout(() => {
          doneRef.current?.()
          setMounted(false)
        }, 500)
      }, minShown)
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      finish()
    } else {
      window.addEventListener('DOMContentLoaded', finish, { once: true })
      window.addEventListener('load', finish, { once: true })
      // 兜底超时，避免个别网络资源挂起导致一直白屏/黑屏
      const fallbackTimer = setTimeout(finish, MAX_WAIT)
      return () => {
        window.removeEventListener('DOMContentLoaded', finish)
        window.removeEventListener('load', finish)
        clearTimeout(fallbackTimer)
        clearTimeout(timeoutId)
        clearTimeout(unmountTimer)
      }
    }

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(unmountTimer)
    }
  }, [])

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
