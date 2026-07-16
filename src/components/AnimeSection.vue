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
      <div v-for="a in animeList" :key="a.title" class="anime-card">
        <div class="anime-cover">
          <img :src="asset(a.cover)" :alt="a.title" loading="lazy" />
        </div>
        <div class="anime-info">
          <h3 class="anime-title">{{ a.title }}</h3>
          <p class="anime-meta">{{ a.meta }}</p>
        </div>
      </div>
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
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.anime-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
}
.anime-cover {
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
