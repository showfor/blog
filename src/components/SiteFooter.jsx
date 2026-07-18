import { i18n } from '../data/i18n.js'
import { profile } from '../data/profile.js'
import { useLang } from '../context/LanguageProvider.jsx'

// 页脚 SiteFooter：站主名/角色/定位 + 关于锚点 + 语言切换，双语。
export default function SiteFooter() {
  const { lang, setLang, t } = useLang()
  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const toggleLang = () => setLang(lang === 'en' ? 'cn' : 'en')

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-name">{profile.identity.name.en}</span>
          <span className="site-footer-role"> / {t(profile.identity.role)}</span>
        </div>
        <div className="site-footer-meta">
          <span className="site-footer-location">{t(profile.identity.location)}</span>
          <a className="site-footer-link" href="#about" onClick={(e) => go(e, '#about')}>
            {t(i18n.footer.about)}
          </a>
          <button type="button" className="lang-toggle lang-toggle--ghost" onClick={toggleLang}>
            {t(i18n.ui.switchLabel)}
          </button>
        </div>
      </div>
    </footer>
  )
}
