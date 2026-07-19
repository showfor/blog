# Cloudflare Worker WebSocket 实时日志中继

## 工作原理

```
 访客A (深圳)         访客B (东京)         访客C (纽约)
     │                    │                    │
     │ wss://logs.xxx     │ wss://logs.xxx     │ wss://logs.xxx
     ▼                    ▼                    ▼
  ┌─────────────────────────────────────────────────┐
  │           Cloudflare Durable Object             │
  │              (LogRoom 单例)                      │
  │                                                 │
  │  · 维护所有活跃 WebSocket 连接                   │
  │  · 收到任一消息 → 广播给所有其他客户端            │
  │  · 自动清理断开的连接                           │
  │  · 跨全球边缘节点同步（Durable Object 强一致）    │
  └─────────────────────────────────────────────────┘
```

## 部署

```bash
cd workers/log-relay

# 安装 wrangler（如果没有）
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler deploy
```

部署后你会得到一个 Worker URL，形如：
`https://log-relay.你的子域名.workers.dev`

然后在 `src/components/DevPanel.jsx` 中把 `BroadcastChannel` 替换为：
```js
const ws = new WebSocket('wss://log-relay.你的子域名.workers.dev')
ws.onmessage = (ev) => setLogs(prev => [...prev.slice(-MAX_LOGS + 1), JSON.parse(ev.data)])
```

## 免费额度

- Durable Objects: 100 万个请求/月 → 对日志中继绰绰有余
- Worker 调用: 10 万次/天 → 完全够用
