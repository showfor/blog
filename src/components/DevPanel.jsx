import { useRef, useEffect, useState, useCallback } from 'react'
import { WS_URL } from '../utils/wsConfig.js'

// ============================================================
//  DevPanel — 极低开销开发者面板
//  · 默认折叠：仅在页面空闲时以最低能耗更新指示器，折叠时不执行重型 DOM 遍历与网络长连接
//  · 展开态：按需启动 FPS / DOM 节点 / 内存 / WebGL 帧数 / 页面耗时统计与日志
//  · 快捷键：按下 ? 快速切换
// ============================================================

const BC_NAME = 'devpanel-logs'
const MAX_LOGS = 200

const _logBuffer = []
function nowISO() {
  const d = new Date()
  return d.toTimeString().slice(0, 8)
}

export function devLog(type, msg, extra) {
  const ts = nowISO()
  const entry = { ts, type, msg, extra: extra || '' }
  _logBuffer.push(entry)
  if (_logBuffer.length > MAX_LOGS) _logBuffer.shift()
  if (_onLogRef.current) _onLogRef.current(entry)
  _pushTransport(entry)
}

function _pushTransport(entry) {
  const t = _transportRef.current
  if (!t) return
  try {
    if (t.readyState === undefined) { t.postMessage(entry) }
    else if (t.readyState === WebSocket.OPEN) { t.send(JSON.stringify(entry)) }
  } catch { /* 静默 */ }
}

const _transportRef = { current: null }
const _onLogRef = { current: null }

export default function DevPanel() {
  if (!import.meta.env.DEV) {
    return null
  }
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('perf')
  const [fps, setFps] = useState(60)
  const [domCount, setDomCount] = useState(0)
  const [jsHeap, setJsHeap] = useState(0)
  const [drawCalls, setDrawCalls] = useState(0)
  const [loadMs, setLoadMs] = useState(0)
  const [logs, setLogs] = useState([..._logBuffer])
  const fpsTextRef = useRef(null)
  const fpsDotRef = useRef(null)
  const logEndRef = useRef(null)

  // 页面加载耗时计算
  useEffect(() => {
    const calcLoad = () => {
      const nav = performance.getEntriesByType('navigation')[0] || performance.timing
      if (!nav) return
      const t = typeof nav.domContentLoadedEventEnd === 'number'
        ? nav.domContentLoadedEventEnd - nav.fetchStart
        : (nav.loadEventEnd || 0) - (nav.fetchStart || 0)
      if (t > 0) setLoadMs(Math.round(t))
    }
    if (document.readyState === 'complete') calcLoad()
    else window.addEventListener('load', calcLoad, { once: true })
  }, [])

  // 日志订阅
  useEffect(() => {
    _onLogRef.current = (entry) => {
      setLogs((prev) => [...prev.slice(-MAX_LOGS + 1), entry])
    }
    return () => {
      _onLogRef.current = null
    }
  }, [])

  // 展开面板时的详细统计与传输连接
  useEffect(() => {
    if (!open) return

    // 更新 DOM 节点数与内存
    const updateStats = () => {
      setDomCount(document.querySelectorAll('*').length)
      if (performance.memory) {
        setJsHeap(Math.round(performance.memory.usedJSHeapSize / 1048576))
      }
      if (window.__wbGlFrames != null) {
        setDrawCalls(window.__wbGlFrames)
      }
    }
    updateStats()
    const statsTimer = setInterval(updateStats, 1500)

    // 传输层（展开时按需建立）
    let transport = null
    if (WS_URL) {
      try {
        const ws = new WebSocket(WS_URL + '/ws')
        ws.onopen = () => devLog('info', 'Log channel active', `WebSocket ${WS_URL}`)
        ws.onmessage = (ev) => {
          try { setLogs((prev) => [...prev.slice(-MAX_LOGS + 1), JSON.parse(ev.data)]) }
          catch { /* ignore */ }
        }
        transport = ws
        _transportRef.current = ws
      } catch { /* ignore */ }
    }
    if (!transport && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel(BC_NAME)
        bc.onmessage = (ev) => {
          setLogs((prev) => [...prev.slice(-MAX_LOGS + 1), ev.data])
        }
        transport = bc
        _transportRef.current = bc
      } catch { /* ignore */ }
    }

    return () => {
      clearInterval(statsTimer)
      if (transport) {
        try { transport.close() } catch { /* ignore */ }
      }
      _transportRef.current = null
    }
  }, [open])

  // 超轻量 FPS 监测：折叠时不触发 React 渲染，直接更新 DOM
  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let rafId = null

    const loop = (ts) => {
      frames++
      if (ts - last >= 600) {
        const currentFps = Math.min(144, Math.round((frames * 1000) / (ts - last)))
        frames = 0
        last = ts

        const color = currentFps >= 55 ? 'var(--accent)' : currentFps >= 30 ? '#ffe74c' : '#ff7a93'
        if (fpsTextRef.current) fpsTextRef.current.textContent = String(currentFps)
        if (fpsDotRef.current) fpsDotRef.current.style.background = color

        if (open) setFps(currentFps)
      }
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [open])

  // 日志滚动到底
  useEffect(() => {
    if (tab === 'logs' && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, tab])

  // 快捷键 ?
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement === document.body) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const logColor = useCallback((type) => {
    switch (type) {
      case 'visitor': return 'var(--accent)'
      case 'webgl': return '#47daff'
      case 'lang': return '#ff8d70'
      case 'warn': return '#ffe74c'
      case 'error': return '#ff7a93'
      default: return 'var(--textMuted)'
    }
  }, [])

  const fpsColor = fps >= 55 ? 'var(--accent)' : fps >= 30 ? '#ffe74c' : '#ff7a93'
  const fpsPercent = Math.min(fps, 60)
  const heapPercent = Math.min(jsHeap, 200)

  return (
    <>
      {/* 折叠态胶囊 */}
      {!open && (
        <button
          className="devpanel-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open developer panel"
          title="Open dev panel (press ?)"
        >
          <span ref={fpsDotRef} className="devpanel-dot" style={{ background: 'var(--accent)' }} />
          <span ref={fpsTextRef} className="devpanel-fps">60</span>
          <span className="devpanel-arrow">▶</span>
        </button>
      )}

      {/* 展开面板 */}
      {open && (
        <aside className="devpanel">
          <div className="devpanel-header">
            <div className="devpanel-tabs">
              <button
                className={`devpanel-tab ${tab === 'perf' ? 'active' : ''}`}
                onClick={() => setTab('perf')}
              >
                ⚡ PERF
              </button>
              <button
                className={`devpanel-tab ${tab === 'logs' ? 'active' : ''}`}
                onClick={() => setTab('logs')}
              >
                📡 LOGS
              </button>
            </div>
            <button className="devpanel-close" onClick={() => setOpen(false)} aria-label="Close dev panel">
              ✕
            </button>
          </div>

          {tab === 'perf' && (
            <div className="devpanel-body">
              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>FPS</span>
                  <span style={{ color: fpsColor }}>{fps}</span>
                </div>
                <div className="devpanel-bar-bg">
                  <div className="devpanel-bar" style={{ width: `${(fpsPercent / 60) * 100}%`, background: fpsColor }} />
                </div>
              </div>

              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>DOM Nodes</span>
                  <span>{domCount.toLocaleString()}</span>
                </div>
              </div>

              {performance.memory && (
                <div className="devpanel-metric">
                  <div className="devpanel-metric-head">
                    <span>JS Heap</span>
                    <span>{jsHeap} MB</span>
                  </div>
                  <div className="devpanel-bar-bg">
                    <div className="devpanel-bar" style={{ width: `${(heapPercent / 200) * 100}%`, background: 'var(--accent)' }} />
                  </div>
                </div>
              )}

              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>WebGL Frames</span>
                  <span>{drawCalls}</span>
                </div>
                <div className="devpanel-bar-bg">
                  <div
                    className="devpanel-bar"
                    style={{ width: `${Math.min(drawCalls / 30, 1) * 100}%`, background: '#47daff' }}
                  />
                </div>
              </div>

              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>Page Load</span>
                  <span>{loadMs}ms</span>
                </div>
              </div>

              <p className="devpanel-hint">Press <kbd>?</kbd> to toggle</p>
            </div>
          )}

          {tab === 'logs' && (
            <div className="devpanel-body devpanel-logs">
              {logs.map((l, i) => (
                <div key={i} className="devpanel-log-line" style={{ color: logColor(l.type) }}>
                  <span className="devpanel-log-ts">{l.ts}</span>
                  <span className="devpanel-log-msg">{l.msg}</span>
                  {l.extra && <span className="devpanel-log-extra">{l.extra}</span>}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </aside>
      )}
    </>
  )
}
