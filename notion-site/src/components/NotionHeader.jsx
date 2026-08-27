import { useNotion } from '../context/NotionContext.jsx'

export default function NotionHeader() {
  const { lang, theme, toggleLang, toggleTheme, t } = useNotion()

  const isZh = lang === 'zh'

  return (
    <>
      {/* 顶部 Notion 样式操作条 */}
      <header className="notion-topbar">
        <div className="notion-breadcrumbs">
          <span className="notion-crumb-item">
            <span>🐉</span>
            <span>hakuriver</span>
          </span>
          <span className="notion-crumb-sep">/</span>
          <span className="notion-crumb-item" style={{ color: 'var(--text-muted)' }}>
            {isZh ? '兴趣与收藏' : 'Hobbies & Collections'}
          </span>
        </div>

        <div className="notion-top-actions">
          {/* 语言切换 */}
          <button
            type="button"
            className="notion-btn-icon"
            onClick={toggleLang}
            title={isZh ? 'Switch to English' : '切换到中文'}
          >
            <span>🌐</span>
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* 明暗模式切换 */}
          <button
            type="button"
            className="notion-btn-icon"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? (isZh ? '深色' : 'Dark') : (isZh ? '浅色' : 'Light')}</span>
          </button>
        </div>
      </header>

      {/* 页面主标题区 */}
      <div className="notion-header">
        <div className="notion-page-icon" role="img" aria-label="Dragon icon">🐉</div>
        <h1 className="notion-title">
          {isZh ? 'hakuriver · 兴趣与收藏' : 'hakuriver · Hobbies & Collections'}
        </h1>

        {/* Notion 风格属性栏 */}
        <div className="notion-properties">
          <div className="notion-prop-row">
            <span className="notion-prop-label">
              <span>👤</span> {isZh ? '主人' : 'Owner'}
            </span>
            <div className="notion-prop-value">
              <span className="notion-tag">haku river / 赈早见琥珀主</span>
            </div>
          </div>
          <div className="notion-prop-row">
            <span className="notion-prop-label">
              <span>🏷️</span> {isZh ? '分类' : 'Category'}
            </span>
            <div className="notion-prop-value">
              <span className="notion-tag tag-music">{isZh ? '音乐' : 'Music'}</span>
              <span className="notion-tag tag-novels">{isZh ? '小说' : 'Novels'}</span>
              <span className="notion-tag tag-anime">{isZh ? '动漫' : 'Anime'}</span>
              <span className="notion-tag tag-movies">{isZh ? '电影' : 'Movies'}</span>
            </div>
          </div>
          <div className="notion-prop-row">
            <span className="notion-prop-label">
              <span>⚡</span> {isZh ? '状态' : 'Status'}
            </span>
            <div className="notion-prop-value">
              <span className="notion-tag" style={{ background: 'rgba(35, 131, 226, 0.15)', color: 'var(--accent-blue)' }}>
                ● {isZh ? '持续收集中' : 'Curating'}
              </span>
            </div>
          </div>
        </div>

        {/* 顶部引言 Callout */}
        <div className="notion-callout">
          <span className="notion-callout-icon">💡</span>
          <div className="notion-callout-text">
            {isZh
              ? '这里是关于音乐、文学、动漫与电影的沉浸式清单。在喧嚣的数字世界中，文字、旋律与画面构筑了宁静的内心锚点。'
              : 'A curated personal collection of soundtracks, literature, anime, and cinema. Art and stories that shape perspective and inspire creativity.'}
          </div>
        </div>
      </div>
    </>
  )
}
