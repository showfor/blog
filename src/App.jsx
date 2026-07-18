import { useLayoutEffect } from 'react'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { initSiteAnimations } from './animations/siteAnimations.js'
import SiteNav from './components/SiteNav.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import SelectedProjectsSection from './components/SelectedProjectsSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import OpenSourceSection from './components/OpenSourceSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'

// 站点根组件：顶层包裹 LanguageProvider，按序组合 9 个区块（导航 + 7 内容 + 页脚）。
export default function App() {
  // 顶层初始化 GSAP 动画（复刻原站 aystba-portfolio.pages.dev）。
  // useLayoutEffect 先于浏览器绘制执行，可避免 hero 入场闪烁；
  // 返回的清理函数在卸载/StrictMode 重挂载时 revert 全部 tween/ScrollTrigger，避免泄漏。
  useLayoutEffect(() => {
    let cleanup
    try {
      cleanup = initSiteAnimations(document.body)
    } catch (err) {
      // 兜底：GSAP 初始化异常时，强制显示所有 .reveal，避免内容永久不可见。
      console.error('[siteAnimations] init failed, falling back to visible:', err)
      document
        .querySelectorAll('.reveal')
        .forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
    }
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [])

  return (
    <LanguageProvider>
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <SelectedProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <OpenSourceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </LanguageProvider>
  )
}
