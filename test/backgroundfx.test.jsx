import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import BackgroundFX from '../src/components/BackgroundFX.jsx'
import { runFrame, getLastGl, activeRaf, cancelCalls } from './setup.js'

const INTERACTION_EVENTS = ['scroll', 'pointerdown', 'touchstart', 'keydown']

describe('BackgroundFX — 交互节流 (commit d74d40f)', () => {
  let addSpy, removeSpy, clearSpy

  beforeEach(() => {
    addSpy = vi.spyOn(window, 'addEventListener')
    removeSpy = vi.spyOn(window, 'removeEventListener')
    clearSpy = vi.spyOn(globalThis, 'clearTimeout')
  })
  afterEach(() => {
    addSpy.mockRestore()
    removeSpy.mockRestore()
    clearSpy.mockRestore()
  })

  function mountAndInit(props = {}) {
    let view
    act(() => { view = render(<BackgroundFX {...props} />) })
    act(() => { vi.advanceTimersByTime(1) }) // rIC -> initGL()
    return view
  }

  it('[风险a/e] 静止时 GL 循环运行；scroll 触发 markActive 停止，空闲150ms后恢复（无永久暂停）', () => {
    const view = mountAndInit()
    expect(getLastGl()).toBeTruthy() // GL 上下文已创建
    expect(activeRaf.size).toBeGreaterThan(0) // 渲染循环运行

    act(() => { window.dispatchEvent(new Event('scroll')) })
    expect(cancelCalls.length).toBeGreaterThan(0)
    expect(activeRaf.size).toBe(0) // 滚动时停止（让出 GPU/主线程）

    act(() => { vi.advanceTimersByTime(150) })
    expect(activeRaf.size).toBeGreaterThan(0) // 恢复
    view.unmount()
  })

  it('[风险b] fixed 全屏背景的唯一停机制：scroll 确实停（IO threshold:0 不会停它）', () => {
    mountAndInit()
    // 初始即运行（IO 始终 intersecting=true 不会 stopLoop）
    expect(activeRaf.size).toBeGreaterThan(0)
    act(() => { window.dispatchEvent(new Event('scroll')) })
    expect(activeRaf.size).toBe(0) // 仅交互监听能停它 —— 卡顿根因修复点
  })

  it('[风险b] 交互监听均以 { passive: true } 注册', () => {
    mountAndInit()
    for (const ev of INTERACTION_EVENTS) {
      expect(addSpy).toHaveBeenCalledWith(ev, expect.any(Function), { passive: true })
    }
  })

  it('[风险c] teardown 移除全部 4 个交互监听并 clearTimeout(idleTimer)', () => {
    const view = mountAndInit()
    act(() => { view.unmount() })
    for (const ev of INTERACTION_EVENTS) {
      expect(removeSpy).toHaveBeenCalledWith(ev, expect.any(Function))
    }
    expect(clearSpy).toHaveBeenCalled()
  })

  it('[风险a] pointerdown / touchstart / keydown 同样停止+恢复', () => {
    mountAndInit()
    for (const ev of ['pointerdown', 'touchstart', 'keydown']) {
      cancelCalls.length = 0
      act(() => { window.dispatchEvent(new Event(ev)) })
      expect(activeRaf.size).toBe(0)
      act(() => { vi.advanceTimersByTime(150) })
      expect(activeRaf.size).toBeGreaterThan(0)
    }
  })
})
