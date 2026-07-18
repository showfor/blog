import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 开源贡献 OpenSourceSection（#opensource）：GitHub 开源贡献板块，双语。
export default function OpenSourceSection() {
  const { t } = useLang()
  const { opensource } = i18n
  return (
    <section id="opensource" className="section opensource">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.opensource)}</span>
          <h2 className="section-title">{t(i18n.titles.opensource)}</h2>
        </div>

        <GlowCard className="os-card">
          <div className="os-head">
            <AppIcon name="github" />
            <span className="os-brand">GitHub</span>
          </div>
          <p className="os-desc">{t(opensource.heading)}</p>
          <ul className="os-list">
            {opensource.items.map((it, i) => (
              <li key={i}>{t(it)}</li>
            ))}
          </ul>
          <a className="btn btn-primary" href={opensource.url} target="_blank" rel="noreferrer">
            <AppIcon name="github" /> GitHub
          </a>
        </GlowCard>
      </div>
    </section>
  )
}
