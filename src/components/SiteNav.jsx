import { useEffect, useState } from 'react'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import AppIcon from './AppIcon.jsx'

// 顶部导航 SiteNav：Logo（Amber River/AR）+ 双语锚点 + 语言切换 + Contact CTA。
// 复刻原站 aystba-portfolio 的两点核心行为：
//   1) 滚动时连续变量 --np (0→1) 驱动顶栏平滑收窄/浮起（原站 JS: scrollY/innerHeight 限幅 0~1）。
//   2) 窄屏（≤760px）用汉堡抽屉菜单替代被隐藏的桌面链接，保证全视口可用（修复"菜单消失"）。
export default function SiteNav() {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  // 连续 --np：复刻原站 nav 平滑浮起/收窄。写入 .site-nav，子元素通过 CSS 变量继承。
  useEffect(() => {
    const el = document.querySelector('.site-nav')
    const onScroll = () => {
      const np = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
      if (el) el.style.setProperty('--np', String(np))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 抽屉开启时锁定 body 滚动，关闭时恢复，避免背景穿透滚动。
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // 平滑滚动到锚点；桌面/移动点击后关闭抽屉（菜单本就关闭时为空操作）。
  const go = (e, href, close = true) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (close) setMenuOpen(false)
  }

  const toggleLang = () => setLang(lang === 'en' ? 'cn' : 'en')

  return (
    <header className="site-nav">
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
          <a
            className="btn btn-primary site-nav-cta"
            href={i18n.nav.cta.href}
            onClick={(e) => go(e, i18n.nav.cta.href)}
          >
            <AppIcon name="mail" /> {t(i18n.nav.cta.label)}
          </a>

          {/* 移动端汉堡按钮：仅 ≤760px 显示（桌面端 display:none）。点击开/关抽屉。 */}
          <button
            type="button"
            className={`navbar-mobile-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* 移动端抽屉：遮罩 + 右侧滑入面板。复刻原站 .navbar-mobile-overlay/panel 行为，
          替代被隐藏的桌面链接，保证窄屏导航可用。 */}
      <div
        className={`navbar-mobile-overlay ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav-panel"
        className={`navbar-mobile-panel ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="navbar-mobile-header">
          <span className="navbar-mobile-title">{i18n.nav.brand}</span>
          <button
            type="button"
            className="navbar-mobile-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="navbar-mobile-links">
          {i18n.nav.links.map((l) => (
            <a key={l.key} href={l.href} className="navbar-mobile-link" onClick={(e) => go(e, l.href)}>
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="navbar-mobile-actions">
          <button type="button" className="lang-toggle" onClick={toggleLang}>
            {t(i18n.ui.switchLabel)}
          </button>
          <a
            className="btn btn-primary"
            href={i18n.nav.cta.href}
            onClick={(e) => go(e, i18n.nav.cta.href)}
          >
            <AppIcon name="mail" /> {t(i18n.nav.cta.label)}
          </a>
        </div>
      </aside>
    </header>
  )
}
