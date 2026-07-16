// 滚动入场指令 v-reveal：进入视口时淡入上移，仅用 transform/opacity（GPU 友好，稳定 60fps）。
// 用法： <div v-reveal> 或 <div v-reveal="0.1">（数字= 延迟秒，用于错峰）
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observer =
  typeof IntersectionObserver !== 'undefined' && !reduceMotion
    ? new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              observer.unobserve(e.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
    : null

export const reveal = {
  beforeMount(el, binding) {
    el.classList.add('reveal')
    const delay = Number(binding.value)
    if (delay) el.style.transitionDelay = delay + 's'
  },
  mounted(el) {
    if (!observer) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}
