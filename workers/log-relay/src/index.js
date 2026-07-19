// ================================================================
//  WebSocket 日志中继 Worker (Cloudflare Durable Objects)
//  收到任一客户端的消息 → 广播给所有其他活跃连接
//  部署：cd workers/log-relay && wrangler deploy
// ================================================================

// ── Durable Object: LogRoom ──────────────────────────────────
// 每个 room 实例维护一组 WebSocket 连接，负责广播

export class LogRoom {
  constructor(state, env) {
    this.state = state
    this.env = env
    this.sessions = new Map() // WebSocket → { id, connectedAt }
  }

  // Worker 路由到此处时调用
  async fetch(request) {
    // 仅处理 WebSocket 升级
    const upgradeHeader = request.headers.get('Upgrade')
    if (upgradeHeader !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 })
    }

    const pair = new WebSocketPair()
    const [client, server] = Object.values(pair)

    this._accept(server)

    return new Response(null, { status: 101, webSocket: client })
  }

  _accept(ws) {
    const id = crypto.randomUUID()
    const meta = { id, connectedAt: Date.now() }
    this.sessions.set(ws, meta)

    // 接收前先发送服务器端 meta 数据
    ws.accept()

    // 告知所有其他客户端：有人加入
    this._broadcast({
      type: 'system',
      msg: 'Node connected',
      extra: `${this.sessions.size} peers`,
    }, ws) // exclude sender

    ws.addEventListener('message', (ev) => {
      try {
        const data = JSON.parse(ev.data)
        // 广播给所有其他客户端
        this._broadcast(data, ws)
      } catch {
        // 非 JSON 消息静默忽略
      }
    })

    ws.addEventListener('close', () => {
      this.sessions.delete(ws)
      this._broadcast({
        type: 'system',
        msg: 'Node disconnected',
        extra: `${this.sessions.size} peers`,
      })
    })

    ws.addEventListener('error', () => {
      this.sessions.delete(ws)
    })
  }

  _broadcast(data, excludeWs) {
    const payload = JSON.stringify(data)
    for (const [ws] of this.sessions) {
      if (ws === excludeWs) continue // 不给发送者自己广播
      try {
        ws.send(payload)
      } catch {
        this.sessions.delete(ws)
      }
    }
  }
}

// ── Worker 入口 ────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // WebSocket 升级请求 → 路由到 Durable Object
    if (url.pathname === '/ws') {
      const id = env.LOG_ROOM.idFromName('global-room')   // 固定名称，所有客户端进同一个 room
      const stub = env.LOG_ROOM.get(id)
      return stub.fetch(request)
    }

    // 健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', time: Date.now() }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response('Log Relay Worker — connect via wss://.../ws', { status: 200 })
  },
}
