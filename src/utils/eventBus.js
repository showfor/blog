// ── 轻量级 pub/sub 事件总线，零依赖 ──
// 使用场景：DevPanel 日志流、跨组件事件通知（语言切换 / geolocation / WebGL 状态等）

const _listeners = {}

/**
 * 订阅事件
 * @param {string} evt - 事件名
 * @param {function} fn - 回调
 * @returns {function} 取消订阅函数
 */
export function on(evt, fn) {
  if (!_listeners[evt]) _listeners[evt] = []
  _listeners[evt].push(fn)
  return () => {
    _listeners[evt] = _listeners[evt].filter(f => f !== fn)
  }
}

/**
 * 发布事件
 * @param {string} evt
 * @param {*} data
 */
export function emit(evt, data) {
  if (!_listeners[evt]) return
  for (const fn of _listeners[evt]) {
    try { fn(data) } catch { /* 静默吞错，不影响其他订阅者 */ }
  }
}
