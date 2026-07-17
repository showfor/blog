<script setup>
import { profile } from '../data/profile.js'
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <a class="footer-top" href="#top">↑ 回到顶部</a>
      <p class="footer-name">{{ profile.name }} · 个人主页</p>
      <p class="footer-sub">用 Vite + Vue 构建 · 托管于 Cloudflare Pages</p>
      <p class="footer-copy">© {{ new Date().getFullYear() }} {{ profile.name }}. 感谢你逛到这里。</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.footer-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 36px 24px;
  text-align: center;
  color: var(--text-muted);
}
.footer-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 16px;
  transition: background .25s ease, transform .25s ease;
}
.footer-top:hover { background: color-mix(in srgb, var(--accent) 22%, transparent); transform: translateY(-2px); }
.footer-name { font-weight: 600; color: var(--text); margin: 0 0 6px; }
.footer-sub { font-size: 0.85rem; margin: 0 0 4px; }
.footer-copy { font-size: 0.82rem; margin: 8px 0 0; opacity: .85; }
</style>
