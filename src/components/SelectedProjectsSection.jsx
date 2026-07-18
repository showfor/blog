import { projects } from '../data/projects.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'

// 精选作品 SelectedProjectsSection（#projects）：6 张逐字项目卡（GlowCard 包裹，CSS 渐变占位，无外部图）。
export default function SelectedProjectsSection() {
  const { t } = useLang()
  return (
    <section id="projects" className="section selected-work">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t({ en: 'Work', cn: '作品集' })}</span>
          <h2 className="section-title">{t(i18n.titles.projects)}</h2>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <GlowCard key={p.id} className="work-card" delay={i * 0.08}>
              <div className={`work-media pm-${i % 6}`} aria-hidden="true" />
              <div className="work-body">
                <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="work-title">{t(p.title)}</h3>
                <div className="work-tags">
                  {p.tech.map((tech) => (
                    <span key={tech} className="work-tag">{tech}</span>
                  ))}
                </div>
                <p className="work-desc">{t(p.desc)}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
