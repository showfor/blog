import { useNotion } from '../context/NotionContext.jsx'
import {
  NotionLogoIcon,
  NotionSmallLogo,
  ChevronRightIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  TagIcon,
  ZapIcon,
  QuoteIcon,
} from './NotionIcons.jsx'

export default function NotionHeader() {
  const { lang, theme, toggleLang, toggleTheme } = useNotion()

  const isZh = lang === 'zh'

  return (
    <>
      {/* 顶部 Notion 样式操作条（保证移动端永不折行） */}
      <header className="notion-topbar">
        <div className="notion-breadcrumbs">
          <span className="notion-crumb-item">
            <NotionSmallLogo size={15} />
            <span>hakuriver</span>
          </span>
          <span className="notion-crumb-sep">
            <ChevronRightIcon size={12} />
          </span>
          <span className="notion-crumb-current">
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
            <GlobeIcon size={13} />
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* 明暗模式切换 */}
          <button
            type="button"
            className="notion-btn-icon"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <MoonIcon size={13} /> : <SunIcon size={13} />}
            <span>{theme === 'light' ? (isZh ? '深色' : 'Dark') : (isZh ? '浅色' : 'Light')}</span>
          </button>
        </div>
      </header>

      {/* 页面主标题区 */}
      <div className="notion-header">
        <div className="notion-page-icon-wrap">
          <NotionLogoIcon size={56} />
        </div>

        <h1 className="notion-title">
          {isZh ? 'hakuriver · 兴趣与收藏' : 'hakuriver · Hobbies & Collections'}
        </h1>

        {/* Notion 风格属性栏（官方 Database Properties 规范） */}
        <div className="notion-properties">
          <div className="notion-prop-row">
            <span className="notion-prop-label">
              <UserIcon size={13} />
              <span>{isZh ? '主人' : 'Owner'}</span>
            </span>
            <div className="notion-prop-value">
              <span className="notion-tag">haku river / 赈早见琥珀主</span>
            </div>
          </div>

          <div className="notion-prop-row">
            <span className="notion-prop-label">
              <TagIcon size={13} />
              <span>{isZh ? '分类' : 'Category'}</span>
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
              <ZapIcon size={13} />
              <span>{isZh ? '状态' : 'Status'}</span>
            </span>
            <div className="notion-prop-value">
              <span className="notion-tag tag-status">
                <span className="status-dot" />
                <span>{isZh ? '持续收集中' : 'Curating'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 顶部引言 Callout */}
        <div className="notion-callout">
          <span className="notion-callout-icon">
            <QuoteIcon size={17} />
          </span>
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
