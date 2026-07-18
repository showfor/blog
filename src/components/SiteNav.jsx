import { useEffect, useState } from 'react'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import AppIcon from './AppIcon.jsx'

// 顶部导航 SiteNav：Logo（Amber River）+ 双语锚点 + 语言切换按钮 + CTA。
export default function SiteNav() {
  const { lang, setLang, t } = useLang()
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleLang = () => setLang(lang === 'en' ? 'cn' : 'en')

  return (
    <header className={`site-nav ${floating ? 'is-floating' : ''}`}>
      <div className="container site-nav-inner">
        <a className="site-nav-brand" href="#top" onClick={(e) => go(e, '#top')}>
          <span className="site-nav-mark">{i18n.nav.mark}</span>
          <span className="site-nav-brand-name">{i18n.nav.brand}</span>
        </a>

        <nav className="site-nav-links">
          {i18n.nav.links.map((l) => (
            <a key={l.key} href={l.href} className="site-nav-link" onClick={(e) => go(e, l.href)}>
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="site-nav-actions">
          <button type="button" className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            {t(i18n.ui.switchLabel)}
          </button>
          <a className="btn btn-primary site-nav-cta" href={i18n.nav.cta.href} onClick={(e) => go(e, i18n.nav.cta.href)}>
            <AppIcon name="mail" /> {t(i18n.nav.cta.label)}
          </a>
        </div>
      </div>
    </header>
  )
}
