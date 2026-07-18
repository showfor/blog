import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { easeInCubic, easeOutCubic } from './eases.js'

// 顶层注册插件（模块加载即执行一次，符合 GSAP 官方用法）。
gsap.registerPlugin(ScrollTrigger)

/**
 * 初始化站点级 GSAP 动画。
 *
 * 复刻对象：原站 aystba-portfolio.pages.dev（打包 JS 中提取的 GSAP/ScrollTrigger 动画）。
 * 调用时机：React 完成首屏 DOM 挂载之后（建议在 App 的 useLayoutEffect 中调用，
 *           useLayoutEffect 先于浏览器绘制，可避免 hero 入场的闪烁）。
 *
 * 清理：返回的函数调用 gsap.context().revert()，会杀掉本作用域内创建的全部 tween /
 *       ScrollTrigger，并清空其写入的内联样式，避免 React StrictMode（开发期双调用）
 *       导致的重复绑定与内存泄漏。
 *
 * @param {ParentNode} [root=document.body] gsap.context 选择器作用域根节点
 * @returns {() => void} 清理函数（无操作时为空函数）
 */
export function initSiteAnimations(root = document.body) {
  // 优雅降级：尊重系统「减少动态效果」偏好。
  // CSS 的 prefers-reduced-motion 规则已保证 .reveal 可见、粒子/箭头静态，
  // 这里直接跳过一切 GSAP 动画，不创建任何 tween / ScrollTrigger。
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    return () => {}
  }

  let ctx
  ctx = gsap.context(() => {
    // ── 1. 滚动入场 .reveal ───────────────────────────────────────────────
    // 原站各板块用 gsap timeline + ScrollTrigger 做「淡入 + 位移」揭示：
    //   ease 统一为 power4.out、start 在 top 80%~85%、toggleActions 'play none none reverse'。
    // 原站无 .reveal 类（该名为克隆版自有），此处用 GSAP ScrollTrigger 复刻其揭示语感，
    // 批处理进入同屏的元素并错峰（stagger），上滑离开时复位（对应原站 reverse）。
    ScrollTrigger.batch('.reveal', {
      start: 'top 85%',
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.08,
            overwrite: true,
          },
        ),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'power4.out',
          overwrite: true,
        }),
    })

    // ── 2. glow-card 进入视口后的 --cursor-angle 环扫 ─────────────────────
    // 原站用自研 rAF 补间 Kc + 缓动 Gc/Wc 写入 CSS 变量（详见 runGlowSweep 注释）。
    // 此处用 GSAP 代理对象 1:1 复刻其数值（duration / delay / start-end / ease 完全一致），
    // 通过 onUpdate 写回 --cursor-angle / --edge-proximity，保证逐帧一致且由 GSAP 驱动。
    gsap.utils.toArray('.glow-card').forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          // 纳入 context 作用域，便于 ctx.revert() 统一清理环扫 tween。
          ctx.add(() => runGlowSweep(card))
        },
      })
    })

    // ── 3. 背景粒子漂浮 ───────────────────────────────────────────────────
    // 原站 hero 为 carousel + WebGL DotField，无 particle-float；此动画为克隆版自有，
    // 目标视觉沿用克隆版既有「8s 循环上下漂浮 + 透明度呼吸」。inline animationDuration
    // 为 6~10s（克隆版 BackgroundFX 设定），除以 2 作单程时长，保留粒子间的速度差异。
    gsap.utils.toArray('.particle').forEach((p) => {
      const dur = parseFloat(p.style.animationDuration) || 8
      const delay = parseFloat(p.style.animationDelay) || 0
      gsap.fromTo(
        p,
        { y: 0, opacity: 0.25 },
        {
          y: -22,
          opacity: 0.6,
          duration: dur / 2, // 单程 = 8s/2，配合 yoyo 还原为 8s 全循环
          delay,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      )
    })

    // ── 4. Hero 首屏内容入场 ──────────────────────────────────────────────
    // 复刻原站板块「淡入 + 位移」揭示风格。原站 hero 为 carousel 结构、无等价元素，
    // 此入场为按原站揭示语感（power4.out / 错峰）对克隆版 hero 内容重建。
    gsap.from('.hero-inner > *', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.08,
    })

    // ── 5. 滚动提示箭头弹跳 ───────────────────────────────────────────────
    // 复刻克隆版 hero-bounce（1.6s 循环）。原站无等价，目标时长沿用 1.6s。
    // 0.8s × 2（yoyo） = 1.6s 全循环；rotation:45 保持箭头朝下的几何（对应原 CSS）。
    const arrow = '.hero-scroll-arrow'
    if (document.querySelector(arrow)) {
      gsap.set(arrow, { rotation: 45 })
      gsap.to(arrow, {
        y: 6,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }
  }, root)

  // 字体 / 图片加载可能导致布局偏移，刷新 ScrollTrigger 的测量。
  ScrollTrigger.refresh()

  return () => ctx.revert()
}

/**
 * glow-card 环扫：1:1 复刻原站打包 JS 中的 4 段 Kc 补间。
 *
 * 原站伪代码（变量已还原为可读形式）：
 *   el.style.setProperty('--cursor-angle', '110deg')
 *   Kc({ duration: 500, onUpdate: t => set('--edge-proximity', t) })                    // edge 0→100
 *   Kc({ ease: Gc, duration: 1500, end: 50,
 *        onUpdate: t => set('--cursor-angle', `${t/100*355+110}deg`) })                 // angle 110→287.5
 *   Kc({ ease: Wc, delay: 1500, duration: 2250, start: 50, end: 100,
 *        onUpdate: t => set('--cursor-angle', `${t/100*355+110}deg`) })                 // angle 287.5→465
 *   Kc({ ease: Gc, delay: 2500, duration: 1500, start: 100, end: 0,
 *        onUpdate: t => set('--edge-proximity', t),
 *        onEnd: () => el.classList.remove('sweep-active') })                            // edge 100→0
 *
 * 其中 --cursor-angle 的角度映射：代理值 proxy.ca ∈ [0,100] → (ca/100*355 + 110)deg。
 * 用 GSAP 代理对象 + 函数式 ease（easeInCubic / easeOutCubic）复刻，数值与原站逐帧一致。
 *
 * @param {HTMLElement} card 目标 glow-card 元素
 */
function runGlowSweep(card) {
  card.classList.add('sweep-active')
  card.style.setProperty('--cursor-angle', '110deg')
  const proxy = { ep: 0, ca: 0 }

  // 段1：--edge-proximity 0→100（500ms, easeOutCubic, 无延迟）
  gsap.to(proxy, {
    ep: 100,
    duration: 0.5,
    ease: easeOutCubic,
    onUpdate: () => card.style.setProperty('--edge-proximity', String(proxy.ep)),
  })

  // 段2：--cursor-angle 110°→287.5°（1500ms, easeInCubic, 无延迟）；代理 ca 0→50
  gsap.to(proxy, {
    ca: 50,
    duration: 1.5,
    ease: easeInCubic,
    onUpdate: () =>
      card.style.setProperty('--cursor-angle', `${proxy.ca / 100 * 355 + 110}deg`),
  })

  // 段3：--cursor-angle 287.5°→465°（delay:1500ms, duration:2250ms, easeOutCubic）；代理 ca 50→100
  gsap.to(proxy, {
    ca: 100,
    duration: 2.25,
    delay: 1.5,
    ease: easeOutCubic,
    onUpdate: () =>
      card.style.setProperty('--cursor-angle', `${proxy.ca / 100 * 355 + 110}deg`),
  })

  // 段4：--edge-proximity 100→0（delay:2500ms, duration:1500ms, easeInCubic），
  //      结束后移除 sweep-active（恢复「仅 hover 才显示描边」的常态）。
  gsap.to(proxy, {
    ep: 0,
    duration: 1.5,
    delay: 2.5,
    ease: easeInCubic,
    onUpdate: () => card.style.setProperty('--edge-proximity', String(proxy.ep)),
    onComplete: () => card.classList.remove('sweep-active'),
  })
}
