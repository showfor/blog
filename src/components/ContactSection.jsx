import { profile } from '../data/profile.js'
import AppIcon from './AppIcon.jsx'
import Reveal from './Reveal.jsx'

// 联系方式：大号邮箱 CTA + 社交链接按钮。
const emailLink = profile.links.find((l) => l.icon === 'mail')
const emailAddr = emailLink ? emailLink.url.replace(/^mailto:/, '') : ''

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-head">
        <span className="eyebrow">Contact</span>
        <span className="section-index">03</span>
        <h2 className="section-title">联系方式</h2>
      </div>

      <Reveal className="contact-text">{profile.contactText}</Reveal>

      <Reveal className="contact-actions">
        {emailAddr && (
          <a className="contact-mail" href={`mailto:${emailAddr}`}>
            <AppIcon name="mail" /> {emailAddr}
          </a>
        )}
        <div className="contact-links">
          {profile.links.map((link) => (
            <a
              key={link.label}
              className="contact-link"
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              <AppIcon name={link.icon} /> {link.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
