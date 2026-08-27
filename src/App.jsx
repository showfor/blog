import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { useReveal } from './hooks/useReveal.js'
import SiteNav from './components/SiteNav.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
import HeroSection from './components/HeroSection.jsx'
import HobbiesSection from './components/HobbiesSection.jsx'
import DevPanel from './components/DevPanel.jsx'
import SiteFooter from './components/SiteFooter.jsx'

export default function App() {
  // 原生滚动入场：观察 .reveal 加 .is-visible
  useReveal()

  // 滚动进度条：rAF 合并驱动 CSS 变量 --scroll（0→1）
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const h = document.documentElement.scrollHeight - window.innerHeight
        document.documentElement.style.setProperty('--scroll', h > 0 ? String(window.scrollY / h) : '0')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LanguageProvider>
      {/* 全局 WebGL / CSS 动态着色器渐变背景 */}
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
          color1="#141418"
          color2="#0c0c0c"
          color3="#15141c"
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
