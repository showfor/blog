import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import DotField from '../src/components/DotField.jsx'
import { runFrame, getLast2d, activeRaf, cancelCalls } from './setup.js'

const INTERACTION_EVENTS = ['scroll', 'pointerdown', 'touchstart', 'keydown']

describe('DotField — 交互节流 & 渐变缓存 (commit d74d40f)', () => {
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

  // 驱动组件：挂载 -> 触发 rIC(init) -> 触发 resize 防抖(c)
  function mountAndInit(props = {}) {
    let view
    act(() => {
      view = render(<DotField gradientFrom="rgba(10,20,30,0.4)" gradientTo="rgba(40,50,60,0.3)" {...props} />)
    })
    act(() => { vi.advanceTimersByTime(1) }) // rIC -> init()
    act(() => { vi.advanceTimersByTime(100) }) // resize 防抖 -> c()
    return view
  }

  it('[风险d] grad 在 resize 时构建一次，渲染循环每帧复用而非每帧新建', () => {
    mountAndInit()
    const ctx = getLast2d()
    expect(ctx).toBeTruthy()
    const built = ctx.createLinearGradient.mock.calls.length
    expect(built).toBeGreaterThan(0) // resize 的 c() 已建一次渐变
    expect(activeRaf.size).toBeGreaterThan(0) // 渲染循环确在运行（非真空断言）

    // 跑多帧：h() 中应为 n.fillStyle = grad，不再 createLinearGradient
    act(() => { for (let i = 0; i < 6; i++) runFrame() })
    expect(ctx.clearRect).toHaveBeenCalled() // 渲染路径确被执行（h() 每帧 clearRect）
    expect(ctx.createLinearGradient.mock.calls.length).toBe(built) // 帧间无新增
  })

  it('[风险a/e] 静止时循环运行；scroll 触发 markActive 后停止，空闲150ms后自动恢复（无永久暂停）', () => {
    const view = mountAndInit()
    // 静止：循环已运行
    expect(activeRaf.size).toBeGreaterThan(0)

    // 模拟滚动：onScroll -> markActive -> D() 停止循环
    act(() => { window.dispatchEvent(new Event('scroll')) })
    expect(cancelCalls.length).toBeGreaterThan(0) // 至少 cancel 了一次 rAF
    expect(activeRaf.size).toBe(0) // 循环确已停止（让出主线程）

    // 空闲 150ms：idle 定时器触发 -> if(a&&o) T() 恢复
    act(() => { vi.advanceTimersByTime(150) })
    expect(activeRaf.size).toBeGreaterThan(0) // 已恢复，无永久暂停
    view.unmount()
  })

  it('[风险b] 交互事件均以 { passive: true } 注册（不阻塞滚动合成）', () => {
    mountAndInit()
    for (const ev of INTERACTION_EVENTS) {
      expect(addSpy).toHaveBeenCalledWith(ev, expect.any(Function), { passive: true })
    }
  })

  it('[风险c] teardown 移除全部 4 个交互监听并 clearTimeout(idleTimer)，无泄漏', () => {
    const view = mountAndInit()
    act(() => { view.unmount() })
    for (const ev of INTERACTION_EVENTS) {
      expect(removeSpy).toHaveBeenCalledWith(ev, expect.any(Function))
    }
    expect(clearSpy).toHaveBeenCalled() // idleTimer 被清理
  })

  it('[风险a] pointerdown / touchstart / keydown 同样触发停止+恢复', () => {
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
