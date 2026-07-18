import { projects } from '../data/projects.js'
import { asset } from '../utils.js'
import GlowCard from './GlowCard.jsx'

// 精选项目 SelectedWorkSection（#projects）：3 张项目卡（序号 + 标题 + meta + 描述 + 配图）。
export default function SelectedWorkSection() {
  return (
    <section id="projects" className="section selected-work">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Selected Work</span>
          <h2 className="section-title">精选项目</h2>
          <p className="section-sub">
            先以高级占位图建立展示节奏，后续可替换为品牌 VI、商业海报、电商详情页、包装设计等真实作品。
          </p>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <GlowCard key={p.id} className="work-card" delay={i * 0.08}>
              <div className="work-media">
                <img
                  src={asset(p.img)}
                  alt={p.title}
                  loading="lazy"
                  style={{ objectPosition: p.crop }}
                />
              </div>
              <div className="work-body">
                <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-meta">{p.meta}</p>
                <p className="work-desc">{p.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
