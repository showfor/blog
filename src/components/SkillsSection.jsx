import { skills } from '../data/skills.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'

// 技能 SkillsSection（#skills）：技能分类 + 技术栈 + 个人优势（合并 Strengths），双语。
export default function SkillsSection() {
  const { t } = useLang()
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.skills)}</span>
          <h2 className="section-title">{t(i18n.titles.skills)}</h2>
        </div>

        <div className="skills-layout">
          <div className="skill-cats">
            {skills.categories.map((cat) => (
              <GlowCard className="skill-cat" key={cat.title.en}>
                <h3 className="skill-cat-title">{t(cat.title)}</h3>
                <div className="skill-tags">
                  {cat.items.map((it) => (
                    <span className="skill-tag" key={it.en}>{t(it)}</span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>

          <GlowCard className="tech-stack-card">
            <h3 className="skill-cat-title">{t({ en: 'Tech Stack', cn: '技术栈' })}</h3>
            <div className="tech-pills">
              {skills.techStack.map((tech) => (
                <span className="tech-pill" key={tech.name} data-type={tech.type}>
                  {tech.name}<em>{tech.type}</em>
                </span>
              ))}
            </div>
            <p className="tech-note">
              {t({ en: 'Self-taught React, Vue, Python, Rust and other tech stacks, building the first project while learning', cn: '自学 React、Vue、Python、Rust 等技术栈，边学边做第一个项目。' })}
            </p>
          </GlowCard>
        </div>

        <div className="strengths-block">
          <h3 className="block-title">{t({ en: 'Personal Strengths', cn: '个人优势' })}</h3>
          <div className="strength-grid">
            {skills.strengths.map((s, i) => (
              <GlowCard className="strength-card" key={s.title.en}>
                <h4 className="strength-title">{t(s.title)}</h4>
                <p className="strength-desc">{t(s.desc)}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
