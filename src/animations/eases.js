/**
 * 缓动函数 —— 逐字复刻原站 aystba-portfolio.pages.dev 的 glow-card 环扫动画。
 *
 * 从原站打包 JS（index-*.js，约 402KB）中提取到的原始定义：
 *   function Wc(e){return 1-(1-e)**3}   // easeOutCubic（Kc 补间的默认 ease）
 *   function Gc(e){return e*e*e}        // easeInCubic
 *
 * GSAP 接受「函数式 ease」：(p:number) => number，因此可直接把这两个函数传给
 * gsap.to(proxy, { ease: easeInCubic })，得到与原站 rAF 补间 Kc 逐帧一致的数值曲线。
 */

/**
 * easeInCubic —— 原站 Gc：p^3（起步慢、收尾快）。
 * @param {number} p 线性进度 0~1
 * @returns {number} 缓动后进度
 */
export const easeInCubic = (p) => p * p * p

/**
 * easeOutCubic —— 原站 Wc：1 - (1-p)^3（起步快、收尾慢，Kc 默认缓动）。
 * @param {number} p 线性进度 0~1
 * @returns {number} 缓动后进度
 */
export const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3)
