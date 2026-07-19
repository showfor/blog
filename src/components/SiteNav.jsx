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
    // rAF 合并：每个滚动事件不再同步写 --np，改为每帧最多写 1 次。
    // 视觉输出/交互结果与即时写入完全一致（原站 A 的 --np 限幅 0~1 语义不变）。
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const np = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
        if (el) el.style.setProperty('--np', String(np))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 注：原站 aystba 打开移动端抽屉时【不锁定】body 滚动，克隆版保持一致（不锁）。

  // 平滑滚动到锚点；桌面/移动点击后关闭抽屉（菜单本就关闭时为空操作）。
  const go = (e, href, close = true) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (close) setMenuOpen(false)
  }

  const toggleLang = () => setLang(lang === 'en' ? 'cn' : 'en')

  // 两段式语言切换按钮：左=当前语言，右=可切换的目标语言（如 EN ⇄ 中），点击即切换。
  // 视觉沿用现有 accent 胶囊语言按钮风格（与页脚/抽屉一致），并复用 useLang 实时切换（无需刷新）。
  const langSwitchButton = (extraClass = '') => (
    <button
      type="button"
      className={`lang-switch ${extraClass}`.trim()}
      onClick={toggleLang}
      aria-label={`${t(i18n.ui.switchHint)} ${t(i18n.ui.langName)}`}
    >
      <span className="lang-switch-current">{t(i18n.ui.langCurrent)}</span>
      <span className="lang-switch-sep" aria-hidden="true">⇄</span>
      <span className="lang-switch-target">{t(i18n.ui.langTarget)}</span>
    </button>
  )

  return (
    <header className="site-nav">
      <div className="container site-nav-inner">
        <a className="site-nav-brand" href="#top" onClick={(e) => go(e, '#top')}>
          <span className="site-nav-mark">{i18n.nav.mark}</span>
          <span className="site-nav-brand-name">{t(i18n.nav.brand)}</span>
        </a>

        <nav className="site-nav-links">
          {i18n.nav.links.map((l) => (
            <a key={l.key} href={l.href} className="site-nav-link" onClick={(e) => go(e, l.href)}>
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="site-nav-actions">
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

      {/* 新增：固定顶栏正下方的细语言条（桌面+移动均可见，右对齐）。
          作为 <header className="site-nav"> 的 flex-wrap 第二行，自然位于导航行下方并随顶栏一起移动；
          z-index 继承顶栏(100)，低于移动端抽屉面板(210)。 */}
      <div className="site-nav-langbar">
        {langSwitchButton()}
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
          <span className="navbar-mobile-title">{t(i18n.nav.brand)}</span>
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
          {langSwitchButton()}
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
