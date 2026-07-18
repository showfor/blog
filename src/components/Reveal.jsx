/**
 * 滚动入场包装组件。
 *
 * 仅负责渲染 `.reveal` 标记类；具体的「淡入 + 上移」入场动画已集中到 GSAP
 * （src/animations/siteAnimations.js 的 ScrollTrigger.batch），与原站各板块的
 * gsap + ScrollTrigger 揭示语感一致。
 *
 * 降级策略：prefers-reduced-motion 由全局 CSS 与 initSiteAnimations 的早期返回保证
 * .reveal 可见，无需在此组件内再做 IO。
 *
 * 用法：<Reveal>...</Reveal>（delay 曾用于错峰，现由 GSAP batch 的 stagger 统一处理，保留签名以兼容调用方）。
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
