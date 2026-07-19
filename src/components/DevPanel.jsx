import { useRef, useEffect, useState } from 'react'
import { on } from '../utils/eventBus.js'
import { WS_URL } from '../utils/wsConfig.js'

// ============================================================
//  DevPanel — 右下角开发者面板
//  · PERF 标签：实时 FPS / DOM 节点 / 内存 / WebGL 帧数 / 页面加载耗时
//  · LOGS 标签：终端式滚动日志流 + WebSocket/BroadcastChannel 实时推送
//  · 默认折叠为 ▶ DEV 胶囊按钮，点击展开
//  · 传输策略：wsConfig.js 中配置 WS_URL → 优先 WebSocket；否则退回到 BroadcastChannel
// ============================================================

const BC_NAME = 'devpanel-logs' // BroadcastChannel 回退名称
const MAX_LOGS = 200 // 最多保留 200 条日志

// ── 日志条目 ──
function nowISO() {
  const d = new Date()
  return d.toTimeString().slice(0, 8) // HH:MM:SS
}

function addLogEntry(entry) {
  const transport = _transportRef.current
  const ts = nowISO()
  const e = { ts, ...entry }
  try {
    if (transport && transport.readyState === undefined) {
      // BroadcastChannel → postMessage
      transport.postMessage(e)
    } else if (transport && transport.readyState === WebSocket.OPEN) {
      // WebSocket → send JSON
      transport.send(JSON.stringify(e))
    }
  } catch { /* 传输层发送失败，本地仍保留 */ }
  // 本地推送
  if (_subRef.current) _subRef.current(e)
}

// 静态引用（rAF 循环和事件总线不需要 React state 触发重渲染）
const _transportRef = { current: null }
const _subRef = { current: null }

// ── 导出的便捷日志函数（组件外部可直接调用） ──
export function devLog(type, msg, extra) {
  addLogEntry({ type, msg, extra: extra || '' })
}

// ── FPS 跟踪 ──
function createFpsTracker(onFrame) {
  let frames = 0, last = performance.now(), rafId = null
  const loop = (ts) => {
    frames++
    if (ts - last >= 500) {
      const fps = Math.round((frames * 1000) / (ts - last))
      onFrame(fps)
      frames = 0
      last = ts
    }
    rafId = requestAnimationFrame(loop)
  }
  return {
    start: () => { rafId = requestAnimationFrame(loop) },
    stop: () => { if (rafId) cancelAnimationFrame(rafId) },
  }
}

// ── 主组件 ──
export default function DevPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('perf')
  const [fps, setFps] = useState(0)
  const [domCount, setDomCount] = useState(0)
  const [jsHeap, setJsHeap] = useState(0)
  const [drawCalls, setDrawCalls] = useState(0)
  const [loadMs, setLoadMs] = useState(0)
  const [logs, setLogs] = useState([])
  const fpsRef = useRef(null)
  const logEndRef = useRef(null)

  // ── 初始化 ──
  useEffect(() => {
    // 页面加载耗时
    const nav = performance.getEntriesByType('navigation')[0] || performance.timing
    const t = typeof nav.domContentLoadedEventEnd === 'number'
      ? nav.domContentLoadedEventEnd - nav.fetchStart
      : (nav.loadEventEnd || 0) - (nav.fetchStart || 0)
    setLoadMs(Math.round(t))

    const log = (type, msg, extra) => addLogEntry({ type, msg, extra: extra || '' })
    log('info', 'Page loaded', `${Math.round(t)}ms`)

    // ── FPS 计数器 ──
    const tracker = createFpsTracker((f) => {
      fpsRef.current = f
      setFps(f)
    })
    tracker.start()

    // ── 定时刷新静态指标 ──
    const statsTimer = setInterval(() => {
      setDomCount(document.querySelectorAll('*').length)
      if (performance.memory) {
        setJsHeap(Math.round(performance.memory.usedJSHeapSize / 1048576))
      }
    }, 2000)

    // ── 传输层：优先 WebSocket（跨设备），否则 BroadcastChannel（同浏览器标签页） ──
    let transport = null
    let transportLabel = ''

    if (WS_URL) {
      // WebSocket 模式
      try {
        const ws = new WebSocket(WS_URL + '/ws')
        transportLabel = `WebSocket ${WS_URL}`
        ws.onopen = () => log('info', 'Log channel active', transportLabel)
        ws.onmessage = (ev) => {
          try { setLogs(prev => [...prev.slice(-MAX_LOGS + 1), JSON.parse(ev.data)]) }
          catch { /* 非 JSON 消息忽略 */ }
        }
        ws.onerror = () => log('warn', 'WebSocket error', 'falling back to BroadcastChannel')
        ws.onclose = () => { log('warn', 'WebSocket closed', 'reconnecting...') }
        transport = ws
        _transportRef.current = ws
      } catch (e) {
        log('warn', 'WebSocket init failed', e.message)
      }
    }

    if (!transport) {
      // 回退：BroadcastChannel
      try {
        const bc = new BroadcastChannel(BC_NAME)
        transportLabel = 'BroadcastChannel'
        bc.onmessage = (ev) => {
          setLogs(prev => [...prev.slice(-MAX_LOGS + 1), ev.data])
        }
        bc.onmessageerror = () => {}
        transport = bc
        _transportRef.current = bc
        log('info', 'Log channel active', transportLabel)
      } catch {
        log('warn', 'BroadcastChannel unavailable', 'cross-tab disabled')
      }
    }

    // ── 从事件总线订阅日志 ──
    const unsubs = [
      on('log:info', (data) => log('info', data.msg, data.extra)),
      on('log:warn', (data) => log('warn', data.msg, data.extra)),
      on('log:error', (data) => log('error', data.msg, data.extra)),
      on('log:visitor', (data) => log('visitor', data.msg, data.extra)),
      on('log:webgl', (data) => { log('webgl', data.msg, data.extra); setDrawCalls(data.draws || 0) }),
      on('log:lang', (data) => log('lang', data.msg, data.extra)),
    ]

    // ── WebGL 帧数被动跟踪 ──
    // 劫持 BackgroundFX 的 drawArrays 调用来计数
    // （通过全局变量，BackgroundFX 在 init 后写入）
    const webglTimer = setInterval(() => {
      if (window.__wbGlFrames != null) {
        setDrawCalls(window.__wbGlFrames)
      }
    }, 1000)

    _subRef.current = (entry) => setLogs(prev => [...prev.slice(-MAX_LOGS + 1), entry])

    return () => {
      tracker.stop()
      clearInterval(statsTimer)
      clearInterval(webglTimer)
      if (transport) {
        try { transport.close() } catch { /* already closed */ }
      }
      _transportRef.current = null
      unsubs.forEach(u => u())
      _subRef.current = null
    }
  }, [])

  // ── 日志区自动滚到底 ──
  useEffect(() => {
    if (tab === 'logs' && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, tab])

  // ── 快捷键 ? 打开面板 ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement === document.body) {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── 日志条目颜色 ──
  const logColor = (type) => {
    switch (type) {
      case 'visitor': return 'var(--accent)'
      case 'webgl': return '#47daff'
      case 'lang': return '#ff8d70'
      case 'warn': return '#ffe74c'
      case 'error': return '#ff7a93'
      default: return 'var(--textMuted)'
    }
  }

  // ── FPS 色标 ──
  const fpsColor = fps >= 55 ? 'var(--accent)' : fps >= 30 ? '#ffe74c' : '#ff7a93'

  const fpsPercent = Math.min(fps, 60)
  const heapPercent = Math.min(jsHeap, 200)

  return (
    <>
      {/* ── 折叠态：右下角悬浮胶囊 ── */}
      {!open && (
        <button
          className="devpanel-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open developer panel"
          title="Open dev panel (press ?)"
        >
          <span className="devpanel-dot" style={{ background: fpsColor }} />
          <span className="devpanel-fps">{fps}</span>
          <span className="devpanel-arrow">▶</span>
        </button>
      )}

      {/* ── 展开态：glass 面板 ── */}
      {open && (
        <aside className="devpanel">
          {/* ── 头部：标签页切换 + 关闭 ── */}
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

          {/* ── PERF 标签页 ── */}
          {tab === 'perf' && (
            <div className="devpanel-body">
              {/* FPS */}
              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>FPS</span>
                  <span style={{ color: fpsColor }}>{fps}</span>
                </div>
                <div className="devpanel-bar-bg">
                  <div className="devpanel-bar" style={{ width: `${(fpsPercent / 60) * 100}%`, background: fpsColor }} />
                </div>
              </div>

              {/* DOM Nodes */}
              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>DOM Nodes</span>
                  <span>{domCount.toLocaleString()}</span>
                </div>
              </div>

              {/* JS Heap */}
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

              {/* WebGL frames */}
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

              {/* Page Load */}
              <div className="devpanel-metric">
                <div className="devpanel-metric-head">
                  <span>Page Load</span>
                  <span>{loadMs}ms</span>
                </div>
              </div>

              {/* shortcut hint */}
              <p className="devpanel-hint">Press <kbd>?</kbd> to toggle</p>
            </div>
          )}

          {/* ── LOGS 标签页 ── */}
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
