/**
 * 滚动入场包装组件。
 *
 * 本身只渲染 `.reveal` 标记类；实际的「淡入 + 上移」入场由全局原生 IntersectionObserver
 * （src/hooks/useReveal.js 的 useReveal，替代原 GSAP ScrollTrigger.batch）驱动：
 * 进入视口时加 `.is-visible`，CSS 以 1200ms easeOutCubic 过渡。
 *
 * 数值计数动画请用同文件的 Xu hook（逐字自原站 bundle）。
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
