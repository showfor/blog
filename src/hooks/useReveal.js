import { useState, useRef, useEffect } from 'react'

/**
 * Xu（原站计数动画 hook，逐字自混淆 bundle orig.js）。
 * 元素进入视口后把形如 "30+" / "8+" 的字符串从 0 缓动到目标数值，
 * easeOutCubic（1-(1-a)**3），默认 1200ms。返回 [显示字符串, ref]。
 */
export function Xu(e, t = 1200) {
  const [n, r] = useState('0')
  const i = useRef(null)
  const a = useRef(false)
  useEffect(() => {
    const n = i.current
    if (!n) return
    const o = new IntersectionObserver(([n]) => {
      if (n.isIntersecting && !a.current) {
        a.current = true
        const n = parseFloat(e)
        const i = e.replace(n.toString(), '')
        const o = performance.now()
        const s = (e) => {
          const a = Math.min((e - o) / t, 1)
          const c = 1 - (1 - a) ** 3
          r(Math.round(n * c) + i)
          a < 1 && requestAnimationFrame(s)
        }
        requestAnimationFrame(s)
      }
    }, { threshold: 0.3 })
    return o.observe(n), () => o.disconnect()
  }, [e, t])
  return [n, i]
}

/**
 * useReveal —— 原生滚动入场，替代原克隆版里 GSAP ScrollTrigger.batch。
 * 观察所有 .reveal 元素，进入视口即加 .is-visible（CSS 负责 1200ms easeOutCubic
 * 淡入 + 上移）。一个 observer 对应原 batch 的「批量」语义。
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        // 收集本次回调中进入视口的元素，按文档顺序（顶部优先）排序，避免乱序触发；
        // 随后错峰分配 transition-delay，把"建层+起动画"摊到若干帧，消除首帧的建层爆发
        // （对齐参考站 A 的 GSAP ScrollTrigger.batch + stagger 波浪式入场语义）。
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        intersecting.forEach((entry, i) => {
          const el = entry.target
          // transition-delay 必须在加 .is-visible 之前设置，过渡才会带上延迟；
          // 封顶 7*60=420ms，避免后段元素等待过久。视觉上由"齐发"变"轻微波浪依次出现"。
          el.style.transitionDelay = Math.min(i, 7) * 60 + 'ms'
          el.classList.add('is-visible')
          io.unobserve(el)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
