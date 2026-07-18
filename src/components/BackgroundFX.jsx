import { useLayoutEffect, useRef } from 'react'
import { VERTEX_SHADER, FRAGMENT_SHADER } from '../shaders.js'

/**
 * WebGL 背景着色器（原站组件 Yu / DOM 类 grainient-container）。
 * GLSL 逐字来自线上混淆 bundle（见 src/shaders.js）；uniform 默认值逐字；渲染循环
 * 30fps 节流、iTime=(now-start)*.001 驱动、IntersectionObserver(threshold:0)+visibilitychange
 * 暂停 rAF —— 与原站 Program/Geometry 封装行为一致。原生 WebGL2 实现，无 three.js / OGL。
 */

// 原站 Gu()：#RRGGBB -> [r/255, g/255, b/255]
function hexToRGB(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return [1, 1, 1]
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
}

const QUALITY_DPR = {
  low: 1,
  medium: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1) : 1,
  high: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 2,
}

export default function BackgroundFX({
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = '#FF9FFC',
  color2 = '#5227FF',
  color3 = '#B497CF',
  className = '',
  quality = 'medium',
}) {
  const containerRef = useRef(null)

  // 任意影响 uniform 的 prop 变化都会重建 GL 上下文（克隆版传入的 props 均为静态，故实际只建一次）。
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false
    let teardown = null

    // GL 初始化：从 useLayoutEffect 的「同步」改为 requestIdleCallback 延迟（见下方
    // ric(...) 调度，含 timeout:200 兜底）。React 挂载 + 首屏绘制先完成，
    // 空闲时再 initGL——着色器编译/首帧 draw 这类重活不再阻塞初始挂载与
    // 首次滑动。延迟期间 .grainient-container 显示 body 深色底（#0c0c0c），
    // 深色主题下不可感知，且因 idle 调度不会在滑动手势进行中抢主线程。
    const initGL = () => {
    if (disposed || teardown) return

    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false })
    if (!gl) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      return
    }

    const compile = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[BackgroundFX] shader compile error:', gl.getShaderInfoLog(sh))
      }
      return sh
    }
    const program = gl.createProgram()
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[BackgroundFX] program link error:', gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // 全屏三角形
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const loc = (name) => gl.getUniformLocation(program, name)
    const U = {
      iResolution: loc('iResolution'),
      iTime: loc('iTime'),
      uTimeSpeed: loc('uTimeSpeed'),
      uColorBalance: loc('uColorBalance'),
      uWarpStrength: loc('uWarpStrength'),
      uWarpFrequency: loc('uWarpFrequency'),
      uWarpSpeed: loc('uWarpSpeed'),
      uWarpAmplitude: loc('uWarpAmplitude'),
      uBlendAngle: loc('uBlendAngle'),
      uBlendSoftness: loc('uBlendSoftness'),
      uRotationAmount: loc('uRotationAmount'),
      uNoiseScale: loc('uNoiseScale'),
      uGrainAmount: loc('uGrainAmount'),
      uGrainScale: loc('uGrainScale'),
      uGrainAnimated: loc('uGrainAnimated'),
      uContrast: loc('uContrast'),
      uGamma: loc('uGamma'),
      uSaturation: loc('uSaturation'),
      uCenterOffset: loc('uCenterOffset'),
      uZoom: loc('uZoom'),
      uColor1: loc('uColor1'),
      uColor2: loc('uColor2'),
      uColor3: loc('uColor3'),
    }

    const dpr = QUALITY_DPR[quality] || QUALITY_DPR.medium
    // 渲染分辨率降半：背景是流动渐变 + 噪点，降分辨率视觉不可感知，
    // 但 GPU 像素数减 75%，消除 WebGL drawArrays 造成的滚动 long task（puppeteer 实测根因）
    const resScale = 0.5
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr * resScale)
      canvas.height = Math.floor(h * dpr * resScale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(U.iResolution, canvas.width, canvas.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // 静态 uniform（一次性写入）
    gl.uniform1f(U.uTimeSpeed, timeSpeed)
    gl.uniform1f(U.uColorBalance, colorBalance)
    gl.uniform1f(U.uWarpStrength, warpStrength)
    gl.uniform1f(U.uWarpFrequency, warpFrequency)
    gl.uniform1f(U.uWarpSpeed, warpSpeed)
    gl.uniform1f(U.uWarpAmplitude, warpAmplitude)
    gl.uniform1f(U.uBlendAngle, blendAngle)
    gl.uniform1f(U.uBlendSoftness, blendSoftness)
    gl.uniform1f(U.uRotationAmount, rotationAmount)
    gl.uniform1f(U.uNoiseScale, noiseScale)
    gl.uniform1f(U.uGrainAmount, grainAmount)
    gl.uniform1f(U.uGrainScale, grainScale)
    gl.uniform1f(U.uGrainAnimated, +!!grainAnimated)
    gl.uniform1f(U.uContrast, contrast)
    gl.uniform1f(U.uGamma, gamma)
    gl.uniform1f(U.uSaturation, saturation)
    gl.uniform2f(U.uCenterOffset, centerX, centerY)
    gl.uniform1f(U.uZoom, zoom)
    const c1 = hexToRGB(color1)
    const c2 = hexToRGB(color2)
    const c3 = hexToRGB(color3)
    gl.uniform3fv(U.uColor1, c1)
    gl.uniform3fv(U.uColor2, c2)
    gl.uniform3fv(U.uColor3, c3)

    // 渲染循环：30fps 节流（33.333ms），与原站一致
    let rafId = 0
    const start = performance.now()
    let last = 0
    let visible = !document.hidden
    let intersecting = true

    const render = (now) => {
      if (now - last < 33.333333333333336) {
        rafId = requestAnimationFrame(render)
        return
      }
      last = now
      gl.uniform1f(U.iTime, (now - start) * 0.001)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(render)
    }
    const startLoop = () => {
      if (intersecting && visible && rafId === 0) {
        last = performance.now()
        rafId = requestAnimationFrame(render)
      }
    }
    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting
      intersecting ? startLoop() : stopLoop()
    }, { threshold: 0 })
    io.observe(container)

    const onVisibility = () => {
      visible = !document.hidden
      visible ? startLoop() : stopLoop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    startLoop()
      teardown = () => {
        stopLoop()
        ro.disconnect()
        io.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        const ext = gl.getExtension('WEBGL_lose_context')
        if (ext) ext.loseContext()
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      }
    }

    // 首屏关键路径优化：把着色器编译/首帧 draw 这类重活从 useLayoutEffect 的
    // 同步初始化移出，改为 requestIdleCallback 调度的「预热型」延迟 —— React 挂载
    // + 首屏绘制先完成，空闲时再 initGL，首次滑动不再被 shader 编译卡住。
    // { timeout: 4000 } 兜底：即使持续滚动导致长期不 idle，也在 4s 内启动；
    // 正常情况下首屏渲染后很快 idle（轮播图片已懒加载，不抢主线程），背景及时出现。
    // 延迟期间 .grainient-container 显示 body 深色底（#0c0c0c），深色主题下不可感知。
    const ric = window.requestIdleCallback || ((cb) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1))
    // 首屏滑动卡顿修复：rIC 触发后若用户正在滑动，推迟 initGL 到滑动停止，
    // 避免 shader 编译（同步 10-50ms）撞首次滑动手势造成掉帧。
    let lastScrollAt = 0
    let scrollRetry = 0
    const onScrollCheck = () => { lastScrollAt = performance.now() }
    window.addEventListener('scroll', onScrollCheck, { passive: true })
    const tryInit = () => {
      if (performance.now() - lastScrollAt < 300) {
        scrollRetry = setTimeout(tryInit, 200)
        return
      }
      window.removeEventListener('scroll', onScrollCheck)
      initGL()
    }
    const ricId = ric(tryInit, { timeout: 4000 })
    return () => {
      disposed = true
      if (window.cancelIdleCallback && ricId) cancelIdleCallback(ricId)
      clearTimeout(scrollRetry)
      window.removeEventListener('scroll', onScrollCheck)
      if (teardown) teardown()
    }
  }, [
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude,
    blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale,
    grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom,
    color1, color2, color3, quality,
  ])

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />
}
