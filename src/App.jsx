import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { useReveal } from './hooks/useReveal.js'
import SiteNav from './components/SiteNav.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
import HeroSection from './components/HeroSection.jsx'
// 与原站 A 一致：首屏以下区块直接打包进主 bundle，不做 React.lazy 代码分割。
// 实测原站 A 的线上 bundle 含 0 个 dynamic import（全部内联到主包），
// 打开时只加载一个文件后随即空闲；而 React.lazy 会在挂载时并发触发 7 个 chunk
// 的拉取+解析+执行，与 WebGL 着色器编译、DotField 万点网格构建抢占主线程，
// 正是“打开卡顿”的根因。故此处与 A 对齐，移除代码分割以消除打开时的 chunk 风暴。
import AboutSection from './components/AboutSection.jsx'
import SelectedProjectsSection from './components/SelectedProjectsSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import OpenSourceSection from './components/OpenSourceSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import DevPanel from './components/DevPanel.jsx'
import SiteFooter from './components/SiteFooter.jsx'

// 站点根组件：顶层包裹 LanguageProvider，按序组合 9 个区块（导航 + 7 内容 + 页脚）。
export default function App() {
  // 原生滚动入场（替代原克隆版的 GSAP ScrollTrigger.batch）：观察 .reveal 加 .is-visible。
  useReveal()

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
        <AboutSection />
        <SelectedProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <OpenSourceSection />
        <ContactSection />
        <SiteFooter />
      </main>
      <DevPanel />
    </LanguageProvider>
  )
}
