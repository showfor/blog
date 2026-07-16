<script setup>
import { animeList } from '../data/anime.js'
import { asset } from '../utils.js'
</script>

<template>
  <section id="anime" class="section">
    <div class="section-head">
      <span class="eyebrow">Anime</span>
      <h2 class="section-title">我爱看的动漫</h2>
      <p class="section-sub">二度元里，藏着我的热血与温柔。</p>
    </div>
    <div class="anime-grid">
      <a v-for="(a, i) in animeList" :key="a.title" class="anime-card" :href="a.douban" target="_blank" rel="noopener noreferrer" v-reveal="i * 0.06">
        <div class="anime-cover">
          <img :src="asset(a.cover)" :alt="a.title" loading="lazy" />
          <span class="douban-badge cover-badge">豆瓣</span>
        </div>
        <div class="anime-info">
          <h3 class="anime-title">{{ a.title }}</h3>
          <p class="anime-meta">{{ a.meta }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}
.anime-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform .5s cubic-bezier(.22, 1, .36, 1), box-shadow .5s ease, border-color .5s ease;
}
.anime-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover), 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
}
.anime-cover {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--surface-2);
}
.anime-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
.anime-card:hover .anime-cover img { transform: scale(1.05); }
.anime-info { padding: 14px 16px 18px; }
.anime-title { font-size: 1rem; margin: 0 0 6px; }
.anime-meta { color: var(--text-muted); font-size: 0.82rem; margin: 0; line-height: 1.5; }
</style>
