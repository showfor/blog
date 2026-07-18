import { LanguageProvider } from './context/LanguageProvider.jsx'
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
