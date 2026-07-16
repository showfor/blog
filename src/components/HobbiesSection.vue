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
      <div v-for="h in hobbies" :key="h.title" class="hobby-card">
        <div class="hobby-emoji">{{ h.emoji }}</div>
        <h3 class="hobby-title">{{ h.title }}</h3>
        <p class="hobby-desc">{{ h.desc }}</p>
      </div>
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
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 22px;
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.hobby-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
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
</style>
