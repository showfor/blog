import { useNotion } from '../context/NotionContext.jsx'
import {
  NotionSmallLogo,
  NotionDoodleRow,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  TagIcon,
  ZapIcon,
  ArrowUpRightIcon,
} from './NotionIcons.jsx'

export default function NotionHeader() {
  const { lang, theme, toggleLang, toggleTheme } = useNotion()

  const isZh = lang === 'zh'

  return (
    <>
      {/* 顶部 Notion 官方风格导航条 */}
      <header className="notion-topbar">
        <div className="notion-brand">
          <NotionSmallLogo size={22} />
          <span className="notion-brand-name">hakuriver</span>
        </div>

        <div className="notion-top-actions">
          {/* 语言切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleLang}
            title={isZh ? 'Switch to English' : '切换到中文'}
          >
            <GlobeIcon size={13} />
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* 明暗模式切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <MoonIcon size={13} /> : <SunIcon size={13} />}
            <span>{theme === 'light' ? (isZh ? '深色' : 'Dark') : (isZh ? '浅色' : 'Light')}</span>
          </button>

          {/* 右侧 Notion 风格主行动按钮 */}
          <a
            href="https://hakuriver.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="notion-btn-primary"
          >
            <span>{isZh ? '主站' : 'Main'}</span>
            <ArrowUpRightIcon size={11} />
          </a>
        </div>
      </header>

      {/* Notion 官网同款 Hero 英雄区 */}
      <div className="notion-hero-section">
        {/* 顶部手绘涂鸦头像条 */}
        <div className="notion-hero-doodles">
          <NotionDoodleRow />
        </div>

        {/* 官网级超大标题与琥珀色高亮气泡 */}
        <h1 className="notion-hero-title">
          <span className="notion-title-text">hakuriver</span>
          <span className="notion-amber-badge">
            <span className="amber-dot" />
            <span>{isZh ? '赈早见琥珀主' : 'Kohaku'}</span>
          </span>
        </h1>

        {/* 官方级精致副标题 */}
        <p className="notion-hero-desc">
          {isZh
            ? '原声带、经典文学、深度动漫与神作电影。在浩瀚的数字世界中，构筑内心的宁静锚点。'
            : 'Soundtracks, literature, anime, and cinema. Curating moments that inspire creativity and perspective.'}
        </p>

        {/* 数据库元属性栏（Properties Table） */}
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
      </div>
    </>
  )
}
