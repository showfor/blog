// 共享测试环境：为 BackgroundFX / DotField 的浏览器依赖打桩。
// 关键目标：让"交互节流（markActive/startLoop/stopLoop）"与"渐变缓存（grad）"
// 这两段闭包逻辑可被真实组件代码驱动并断言，而无需真实 WebGL/Canvas。

import { vi, beforeEach, afterEach } from 'vitest'

// 可手动推进的时钟，供 performance.now() 使用（组件 30fps 闸门依赖它）。
export const clock = { value: 0 }

// 手动可控的 requestAnimationFrame：记录活跃回调，由 runFrame() 驱动。
export let activeRaf = new Map()
export let cancelCalls = []
let rafSeq = 0
globalThis.requestAnimationFrame = vi.fn((cb) => {
  const id = ++rafSeq
  activeRaf.set(id, cb)
  return id
})
globalThis.cancelAnimationFrame = vi.fn((id) => {
  activeRaf.delete(id)
  cancelCalls.push(id)
})
// 推进一帧：取当前活跃回调中 id 最大者执行（即渲染循环下一次回调）。
export function runFrame(dt = 50) {
  if (activeRaf.size === 0) return false
  const id = Math.max(...activeRaf.keys())
  const cb = activeRaf.get(id)
  activeRaf.delete(id)
  clock.value += dt
  cb(clock.value)
  return true
}

// getBoundingClientRect 默认返回非零尺寸，使 resize 能正常计算画布。
Element.prototype.getBoundingClientRect = () =>
  ({ width: 800, height: 600, left: 0, top: 0, right: 800, bottom: 600, x: 0, y: 0, toJSON() {} })

// IntersectionObserver / ResizeObserver 桩：observe 立即回调"可见/进入视口"。
class MockIO {
  constructor(cb) { this.cb = cb }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]) }
  unobserve() {}
  disconnect() {}
}
class MockRO {
  constructor(cb) { this.cb = cb }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIO
globalThis.ResizeObserver = MockRO

// requestIdleCallback 桩（组件用其延迟初始化 GL/点阵）。
window.requestIdleCallback = (cb) =>
  setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 0)
window.cancelIdleCallback = (id) => clearTimeout(id)

// Canvas 上下文桩。
let last2d = null
let lastGl = null
function make2dCtx() {
  return {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    fillStyle: null,
    // 仅在 resize 的 c() 或 h() 兜底中调用，用于验证"非每帧新建"。
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  }
}
function makeGlCtx(canvas) {
  return new Proxy({}, {
    get(_, prop) {
      if (prop === 'getShaderParameter' || prop === 'getProgramParameter') return () => true
      if (prop === 'getUniformLocation') return () => ({})
      if (prop === 'getAttribLocation') return () => 0
      if (prop === 'getExtension') return () => null
      if (prop === 'canvas') return canvas
      if (typeof prop === 'string' && /^[A-Z0-9_]+$/.test(prop)) return 0
      return vi.fn()
    },
  })
}
HTMLCanvasElement.prototype.getContext = function (type) {
  if (type === '2d') { last2d = make2dCtx(); return last2d }
  if (type === 'webgl2') { lastGl = makeGlCtx(this); return lastGl }
  return null
}
export const getLast2d = () => last2d
export const getLastGl = () => lastGl

beforeEach(() => {
  // 仅伪造 setTimeout/clearTimeout：让 150ms 空闲定时器、resize 防抖、rIC 兜底可控。
  // 不伪造 rAF / performance（上面已手动可控），避免与 React 调度冲突。
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  vi.spyOn(performance, 'now').mockImplementation(() => clock.value)
  activeRaf.clear()
  cancelCalls.length = 0
  clock.value = 0
  last2d = null
  lastGl = null
})

afterEach(() => {
  vi.useRealTimers()
})
