import { useNotion } from '../context/NotionContext.jsx'

export default function NotionFooter() {
  const { lang } = useNotion()
  const isZh = lang === 'zh'

  return (
    <footer className="notion-footer">
      <div className="notion-footer-left">
        <span>📄 {isZh ? '共收录 4 大分类 · 24 个精选作品' : '4 categories · 24 curated items'}</span>
      </div>

      <div className="notion-footer-right">
        <span>{isZh ? '由 React 18 + Vite 驱动' : 'Powered by React 18 + Vite'}</span>
        <span>•</span>
        <a
          href="https://hakuriver.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}
        >
          {isZh ? '访问视觉主站 ↗' : 'Visit Main Site ↗'}
        </a>
      </div>
    </footer>
  )
}
