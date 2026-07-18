import { profile } from '../data/profile.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 个人经历 AboutSection（#about）：左发光卡片（简介/联系/职业身份），右经历时间线，双语。
// 滚动入场交由 GSAP ScrollTrigger.batch（.reveal 标记）统一处理，无需组件内 IO。
export default function AboutSection() {
  const { t } = useLang()
  const { about } = profile

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.about)}</span>
          <h2 className="section-title">{t(i18n.titles.about)}</h2>
        </div>

        <div className="about-grid">
          <GlowCard className="about-card">
            <h3 className="about-headline">{t(about.headline)}</h3>
            {about.paragraphs.map((p, i) => (
              <p className="about-intro" key={i}>{t(p)}</p>
            ))}
            <div className="about-contact">
              <a className="about-contact-row" href={`mailto:${profile.contact.email}`}>
                <AppIcon name="mail" /> {profile.contact.email}
              </a>
              <a className="about-contact-row" href="https://github.com/" target="_blank" rel="noreferrer">
                <AppIcon name="github" /> GitHub
              </a>
            </div>
            <div className="identity-chips">
              {about.identities.map((id) => (
                <span className="identity-chip" key={id.en}>{t(id)}</span>
              ))}
            </div>
          </GlowCard>

          <div className="about-resume reveal">
            {about.resume.map((item, i) => (
              <div className="resume-item" key={i}>
                <span className="resume-period">{t(item.period)}</span>
                <h4 className="resume-role">{t(item.role)}</h4>
                <span className="resume-org">{t(item.org)}</span>
                <p className="resume-detail">{t(item.detail)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
