<script setup>
import { hobbies } from '../data/hobbies.js'
</script>

<template>
  <section id="hobbies" class="section">
    <div class="section-head">
      <span class="eyebrow">Hobbies</span>
      <h2 class="section-title">我的爱好</h2>
      <p class="section-sub">让生活慢下来、亮起来的那些小事。</p>
    </div>
    <div class="hobby-grid">
      <a v-for="(h, i) in hobbies" :key="h.title" class="hobby-card" :href="h.douban" target="_blank" rel="noopener noreferrer" v-reveal="i * 0.06">
        <div class="hobby-emoji">{{ h.emoji }}</div>
        <h3 class="hobby-title">{{ h.title }}</h3>
        <p class="hobby-desc">{{ h.desc }}</p>
        <span class="douban-badge">豆瓣</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hobby-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}
.hobby-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 22px;
  transition: transform .45s cubic-bezier(.22, 1, .36, 1), box-shadow .45s ease, border-color .45s ease;
}
.hobby-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow: var(--shadow-hover), 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
}
.hobby-emoji {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  margin-bottom: 16px;
}
.hobby-title { font-size: 1.1rem; margin: 0 0 8px; }
.hobby-desc { color: var(--text-muted); line-height: 1.7; font-size: 0.92rem; margin: 0; }
.douban-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 3px 10px;
  border-radius: 999px;
  margin-top: 14px;
  transition: background .25s ease, transform .25s ease;
}
.douban-badge::after { content: "\2197"; font-size: 0.85em; }
a:hover .douban-badge {
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  transform: translateX(2px);
}
</style>
