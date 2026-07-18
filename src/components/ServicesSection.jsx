import { services } from '../data/services.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 服务方向 ServicesSection（#services）：3 条服务方向卡片，双语。
export default function ServicesSection() {
  const { t } = useLang()
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.services)}</span>
          <h2 className="section-title">{t(i18n.titles.services)}</h2>
        </div>

        <div className="services-grid reveal">
          {services.map((s, i) => (
            <GlowCard className="service-card" key={s.id} animated>
              <div className="service-icon">
                <AppIcon name={s.icon} />
              </div>
              <h3 className="service-title">{t(s.title)}</h3>
              <p className="service-desc">{t(s.desc)}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
