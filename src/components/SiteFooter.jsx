import { profile } from '../data/profile.js'

// 页脚 SiteFooter：琥珀川 / Visual Designer + location（逐字）。
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-name">{profile.name}</span>
          <span className="site-footer-role"> / {profile.role}</span>
        </div>
        <div className="site-footer-location">{profile.location}</div>
      </div>
    </footer>
  )
}
