// WebSocket 日志中继配置
// 已部署到 Cloudflare Workers (真实账号):
//   https://log-relay.2561937323.workers.dev
// 重新部署:
//   cd workers/log-relay && CLOUDFLARE_API_TOKEN=xxx wrangler deploy
// 不填或留 null → 自动退回到 BroadcastChannel（仅同浏览器标签页）

export const WS_URL = 'wss://log-relay.2561937323.workers.dev'
