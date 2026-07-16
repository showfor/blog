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
        <h1 class="hero-name">{{ profile.name }}</h1>
        <span class="hero-title">{{ profile.title }}</span>
        <p class="hero-tagline">{{ profile.tagline }}</p>
        <p class="hero-bio">{{ profile.bio }}</p>
        <div class="hero-meta">
          <span><AppIcon name="pin" /> {{ profile.location }}</span>
        </div>
        <div class="hero-links">
          <a
            v-for="link in profile.links"
            :key="link.label"
            :href="link.url"
            class="hero-link"
            target="_blank"
            rel="noopener"
          >
            <AppIcon :name="link.icon" /> {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 0 12px; }
/* 首屏加载：元素级联淡入（仅 transform/opacity，自然顺滑） */
.hero-avatar, .hero-name, .hero-title, .hero-tagline, .hero-bio, .hero-meta, .hero-links {
  animation: heroIn .85s cubic-bezier(.22, 1, .36, 1) both;
}
.hero-avatar { animation-delay: .05s; }
.hero-name { animation-delay: .12s; }
.hero-title { animation-delay: .19s; }
.hero-tagline { animation-delay: .26s; }
.hero-bio { animation-delay: .33s; }
.hero-meta { animation-delay: .40s; }
.hero-links { animation-delay: .47s; }
@keyframes heroIn {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: none; }
}
.hero-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 40px;
  display: flex;
  gap: 36px;
  align-items: center;
}
.hero-avatar {
  flex: 0 0 140px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid color-mix(in srgb, var(--accent) 30%, var(--surface));
  box-shadow: var(--shadow);
}
.hero-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-body { min-width: 0; }
.hero-name { font-size: 2rem; margin: 0 0 6px; letter-spacing: .5px; }
.hero-title {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 4px 12px;
  border-radius: 999px;
}
.hero-tagline { font-size: 1.12rem; margin: 14px 0 10px; color: var(--text); font-weight: 500; }
.hero-bio { color: var(--text-muted); line-height: 1.8; margin: 0 0 16px; max-width: 60ch; }
.hero-meta { color: var(--text-muted); font-size: 0.9rem; display: flex; gap: 18px; margin-bottom: 18px; }
.hero-meta span { display: inline-flex; align-items: center; gap: 6px; }
.hero-links { display: flex; flex-wrap: wrap; gap: 10px; }
.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  transition: transform .2s, border-color .2s, color .2s;
}
.hero-link:hover { transform: translateY(-2px); border-color: var(--accent); color: var(--accent); }

@media (max-width: 680px) {
  .hero-card { flex-direction: column; text-align: center; padding: 32px 22px; gap: 22px; }
  .hero-avatar { flex-basis: auto; }
  .hero-bio { margin-left: auto; margin-right: auto; }
  .hero-meta, .hero-links { justify-content: center; }
}
</style>
