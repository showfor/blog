import { profile } from '../data/profile.js'
import { i18n } from '../data/i18n.js'
import { useLang } from '../context/LanguageProvider.jsx'
import AppIcon from './AppIcon.jsx'

// 联系方式 ContactSection（#contact）：欢迎语 + 发送消息 / GitHub 按钮，双语。
export default function ContactSection() {
  const { t } = useLang()
  const { contact } = profile
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t(i18n.titles.contact)}</span>
          <h2 className="section-title">{t(i18n.titles.contact)}</h2>
        </div>

        <h3 className="contact-heading reveal">{t(contact.welcome)}</h3>

        <div className="contact-cta reveal">
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            <AppIcon name="mail" /> {t({ en: 'Send Message', cn: '发送消息' })}
          </a>
          <a className="btn btn-ghost" href="https://github.com/" target="_blank" rel="noreferrer">
            <AppIcon name="github" /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
