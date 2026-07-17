import SiteNav from './components/SiteNav.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import HobbiesSection from './components/HobbiesSection.jsx'
import MusicSection from './components/MusicSection.jsx'
import AnimeSection from './components/AnimeSection.jsx'
import MoviesSection from './components/MoviesSection.jsx'
import StrengthsSection from './components/StrengthsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { profile } from './data/profile.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'

// 站点根组件：串联导航、首屏与各内容板块，并挂载顶部滚动进度条。
export default function App() {
  const progress = useScrollProgress()
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <a id="top" />
      <SiteNav brand={`${profile.name} 的主页`} />
      <main className="container">
        <HeroSection />
        <AboutSection />
        <HobbiesSection />
        <MusicSection />
        <AnimeSection />
        <MoviesSection />
        <StrengthsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
