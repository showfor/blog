import { profile } from '../data/profile.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 个人经历 AboutSection（#about）：左发光卡片（简介/联系/职业身份），右经历时间线，双语。
// 背景为独立原生 WebGL 着色器（原站 about-resume-bg / Yu，绿调），逐字取自混淆 bundle。
// 经历时间线带 career-timeline-line（timeline-draw 动画）。滚动入场由原生 useReveal 处理。
export default function AboutSection() {
  const { t } = useLang()
  const { about } = profile

  return (
    <section id="about" className="section about">
      <div className="about-resume-bg">
        <BackgroundFX
          timeSpeed={0.3}
          colorBalance={0.31}
          warpStrength={0.75}
          warpFrequency={5.7}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={0}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          color1="#1a3a1a"
          color2="#0a0a0a"
          color3="#2a1a3a"
        />
      </div>
      <div className="about-resume-bg-frost" />

      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.about)}</span>
          <h2 className="section-title">{t(i18n.titles.about)}</h2>
        </div>

        <div className="about-grid">
          <GlowCard className="about-card" animated>
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
            <div className="career-timeline-line" />
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
