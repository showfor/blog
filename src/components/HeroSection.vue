<script setup>
import { profile } from '../data/profile.js'
import { asset } from '../utils.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="intro" class="hero">
    <div class="hero-card">
      <div class="hero-avatar">
        <img :src="asset(profile.avatar)" :alt="profile.name" />
      </div>
      <div class="hero-body">
        <span class="hero-kicker">PERSONAL · 个人主页</span>
        <h1 class="hero-name">{{ profile.name }}</h1>
        <span class="hero-title">{{ profile.title }}</span>
        <p class="hero-tagline">{{ profile.tagline }}</p>
        <div class="hero-meta">
          <span><AppIcon name="pin" /> {{ profile.location }}</span>
        </div>
        <div class="hero-cta">
          <a class="hero-btn hero-btn-primary" href="#hobbies">
            查看我的世界 <AppIcon name="link" />
          </a>
          <a class="hero-btn hero-btn-ghost" href="#contact">
            联系我 <AppIcon name="mail" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 0 12px; }
/* 首屏加载：元素级联淡入（仅 transform/opacity，自然顺滑） */
.hero-kicker, .hero-avatar, .hero-name, .hero-title, .hero-tagline,
.hero-meta, .hero-cta {
  animation: heroIn .85s cubic-bezier(.22, 1, .36, 1) both;
}
.hero-avatar { animation-delay: .05s; }
.hero-kicker { animation-delay: .10s; }
.hero-name { animation-delay: .16s; }
.hero-title { animation-delay: .22s; }
.hero-tagline { animation-delay: .28s; }
.hero-meta { animation-delay: .34s; }
.hero-cta { animation-delay: .40s; }
@keyframes heroIn {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: none; }
}
.hero-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 44px;
  display: flex;
  gap: 40px;
  align-items: center;
}
.hero-avatar {
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid color-mix(in srgb, var(--accent) 30%, var(--surface));
  box-shadow: var(--shadow);
}
.hero-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-body { min-width: 0; }
.hero-kicker {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.hero-name {
  font-size: 2.6rem;
  line-height: 1.05;
  margin: 0 0 10px;
  letter-spacing: .5px;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-title {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 4px 14px;
  border-radius: 999px;
}
.hero-tagline { font-size: 1.15rem; margin: 16px 0 14px; color: var(--text); font-weight: 500; max-width: 32ch; }
.hero-meta { color: var(--text-muted); font-size: 0.9rem; display: flex; gap: 18px; margin-bottom: 26px; }
.hero-meta span { display: inline-flex; align-items: center; gap: 6px; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 12px 22px;
  border-radius: 999px;
  transition: transform .25s cubic-bezier(.22, 1, .36, 1), box-shadow .25s ease, background .25s ease, border-color .25s ease;
}
.hero-btn .app-icon { width: 1.05em; height: 1.05em; }
.hero-btn-primary {
  color: #fff;
  background: var(--grad);
  box-shadow: 0 10px 26px color-mix(in srgb, var(--accent) 35%, transparent);
}
.hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 34px color-mix(in srgb, var(--accent) 45%, transparent); }
.hero-btn-ghost {
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.hero-btn-ghost:hover { transform: translateY(-3px); border-color: var(--accent); color: var(--accent); }

@media (max-width: 680px) {
  .hero-card { flex-direction: column; text-align: center; padding: 34px 22px; gap: 22px; }
  .hero-avatar { flex-basis: auto; }
  .hero-name { font-size: 2.1rem !important; }
  .hero-tagline { margin-left: auto; margin-right: auto; }
  .hero-meta, .hero-cta { justify-content: center; }
}
</style>
