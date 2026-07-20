import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { useReveal } from './hooks/useReveal.js'
import SiteNav from './components/SiteNav.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
import HeroSection from './components/HeroSection.jsx'
import HobbiesSection from './components/HobbiesSection.jsx'
import DevPanel from './components/DevPanel.jsx'
import SiteFooter from './components/SiteFooter.jsx'

// 站点根组件：顶层包裹 LanguageProvider，按序组合 9 个区块（导航 + 7 内容 + 页脚）。
export default function App() {
  // 原生滚动入场（替代原克隆版的 GSAP ScrollTrigger.batch）：观察 .reveal 加 .is-visible。
  useReveal()

  // 滚动进度条：驱动 CSS 变量 --scroll（0→1），顶栏酸橙绿线随滚读增长
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll', h > 0 ? String(window.scrollY / h) : '0')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LanguageProvider>
      {/* 全局原生 WebGL 着色器背景（原站 grainient-bg-wrapper / Yu），逐字取自混淆 bundle */}
      <div className="grainient-bg-wrapper">
        <BackgroundFX
          className="rainient-bg"
          timeSpeed={0.15}
          colorBalance={0}
          warpStrength={1.2}
          warpFrequency={3}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={0}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          color1="#78cb6e"
          color2="#000000"
          color3="#664b7e"
        />
      </div>

      <SiteNav />
      <main>
        <HeroSection />
        <HobbiesSection />
        <SiteFooter />
      </main>
      <DevPanel />
    </LanguageProvider>
  )
}
