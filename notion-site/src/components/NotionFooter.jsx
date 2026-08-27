import { useState, useEffect } from 'react'
import { useNotion } from '../context/NotionContext.jsx'
import { hobbies } from '../data/hobbies.js'

// 本 Notion 站独立诞生时间点（2026-08-27 21:46:00）
const SITE_LAUNCHED = '2026-08-27T21:46:00+08:00'

function calcUptime(launched = SITE_LAUNCHED) {
  const start = new Date(launched).getTime()
  const now = Date.now()
  const diff = Math.max(0, now - start)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export default function NotionFooter() {
  const { lang } = useNotion()
  const isZh = lang === 'zh'

  const [uptime, setUptime] = useState(() => calcUptime())
  const totalItems = hobbies.reduce((acc, cat) => acc + cat.items.length, 0)

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(calcUptime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="notion-bottom-wrap">
      {/* Notion 风格建站计时看板 */}
      <div className="notion-uptime-card">
        <div className="notion-uptime-header">
          <div className="notion-uptime-status">
            <span className="notion-uptime-dot" />
            <span className="notion-uptime-title">
              {isZh ? '本站已持续运行' : 'Site Running Time'}
            </span>
          </div>
          <span className="notion-uptime-since">
            {isZh ? '始于 2026年8月27日' : 'Since Aug 27, 2026'}
          </span>
        </div>

        <div className="notion-uptime-digits">
          <div className="notion-uptime-unit">
            <span className="notion-uptime-num">{uptime.days}</span>
            <span className="notion-uptime-lbl">{isZh ? '天' : 'DAYS'}</span>
          </div>
          <span className="notion-uptime-sep">:</span>
          <div className="notion-uptime-unit">
            <span className="notion-uptime-num">{String(uptime.hours).padStart(2, '0')}</span>
            <span className="notion-uptime-lbl">{isZh ? '时' : 'HOURS'}</span>
          </div>
          <span className="notion-uptime-sep">:</span>
          <div className="notion-uptime-unit">
            <span className="notion-uptime-num">{String(uptime.minutes).padStart(2, '0')}</span>
            <span className="notion-uptime-lbl">{isZh ? '分' : 'MINS'}</span>
          </div>
          <span className="notion-uptime-sep">:</span>
          <div className="notion-uptime-unit">
            <span className="notion-uptime-num notion-uptime-sec">{String(uptime.seconds).padStart(2, '0')}</span>
            <span className="notion-uptime-lbl">{isZh ? '秒' : 'SECS'}</span>
          </div>
        </div>
      </div>

      {/* 底部版权与元信息 */}
      <footer className="notion-footer">
        <div className="notion-footer-left">
          <span>
            {isZh
              ? `共收录 ${hobbies.length} 大分类 · ${totalItems} 个精选作品`
              : `${hobbies.length} categories · ${totalItems} curated items`}
          </span>
        </div>

        <div className="notion-footer-right">
          <span>{isZh ? '由 React 18 + Vite 驱动' : 'Powered by React 18 + Vite'}</span>
        </div>
      </footer>
    </div>
  )
}
