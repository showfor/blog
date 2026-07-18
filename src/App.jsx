import SiteNav from './components/SiteNav.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import SelectedWorkSection from './components/SelectedWorkSection.jsx'
import StrengthsSection from './components/StrengthsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'

// 站点根组件：按 §2.5 顺序组合 7 个板块。
export default function App() {
  return (
    <>
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <SelectedWorkSection />
      <StrengthsSection />
      <ContactSection />
      <SiteFooter />
    </>
  )
}
