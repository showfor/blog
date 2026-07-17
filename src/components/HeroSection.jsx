import { profile } from '../data/profile.js'
import { asset } from '../utils.js'
import AppIcon from './AppIcon.jsx'

// 首屏：头像 + 姓名 + 定位 + 双 CTA，元素级联淡入。
export default function HeroSection() {
  return (
    <section id="intro" className="hero">
      <div className="hero-card">
        <div className="hero-avatar">
          <img src={asset(profile.avatar)} alt={profile.name} />
        </div>
        <div className="hero-body">
          <span className="hero-kicker">PERSONAL · 个人主页</span>
          <h1 className="hero-name">{profile.name}</h1>
          <span className="hero-title">{profile.title}</span>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-meta">
            <span><AppIcon name="pin" /> {profile.location}</span>
          </div>
          <div className="hero-cta">
            <a className="hero-btn hero-btn-primary" href="#hobbies">
              查看我的世界 <AppIcon name="link" />
            </a>
            <a className="hero-btn hero-btn-ghost" href="#contact">
              联系我 <AppIcon name="mail" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
