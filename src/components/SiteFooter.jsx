import { profile } from '../data/profile.js'

// 页脚：回到顶部 + 版权信息。
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="footer-top" href="#top">↑ 回到顶部</a>
        <p className="footer-name">{profile.name} · 个人主页</p>
        <p className="footer-sub">用 Vite + React 构建 · 托管于 Cloudflare Pages</p>
        <p className="footer-copy">© {new Date().getFullYear()} {profile.name}. 感谢你逛到这里。</p>
      </div>
    </footer>
  )
}
