import { useState } from 'react'
import AppIcon from './AppIcon.jsx'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import { useTheme } from '../hooks/useTheme.js'

const navItems = [
  { id: 'intro', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'hobbies', label: '爱好' },
  { id: 'music', label: '音乐' },
  { id: 'anime', label: '动漫' },
  { id: 'movies', label: '电影' },
  { id: 'strengths', label: '优势' },
  { id: 'contact', label: '联系' },
]

// 吸顶导航：移动端横向滚动，当前板块高亮（scrollspy）+ 明暗切换。
export default function SiteNav({ brand = '我的主页' }) {
  const [isDark, toggleTheme] = useTheme()
  const [popping, setPopping] = useState(false)
  const activeId = useScrollSpy(navItems.map((n) => n.id))

  function onToggle() {
    toggleTheme()
    setPopping(true)
    setTimeout(() => setPopping(false), 480)
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <span className="nav-dot" />
          {brand}
        </a>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className={popping ? 'pop' : undefined}
          title={isDark ? '切换到浅色' : '切换到深色'}
          onClick={onToggle}
          aria-label="切换主题"
        >
          <AppIcon name={isDark ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  )
}
