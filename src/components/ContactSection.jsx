import { contact } from '../data/contact.js'
import AppIcon from './AppIcon.jsx'

// 联系方式 ContactSection（#contact）：大标题 + 发送邮件 / 电话按钮。
export default function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">联系方式</h2>
        </div>

        <h3 className="contact-heading">{contact.heading}</h3>

        <div className="contact-cta">
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            <AppIcon name="mail" /> 发送邮件
          </a>
          <a className="btn btn-ghost" href={`tel:${contact.phone}`}>
            <AppIcon name="phone" /> {contact.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
