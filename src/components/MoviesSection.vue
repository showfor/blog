<script setup>
import { movieList } from '../data/movies.js'
import { asset } from '../utils.js'
</script>

<template>
  <section id="movies" class="section">
    <div class="section-head">
      <span class="eyebrow">Films</span>
      <h2 class="section-title">我爱看的电影</h2>
      <p class="section-sub">在别人的故事里，照见自己的生活。</p>
    </div>
    <div class="movie-grid">
      <div v-for="(m, i) in movieList" :key="m.title" class="movie-card" v-reveal="i * 0.06">
        <div class="movie-cover">
          <img :src="asset(m.cover)" :alt="m.title" loading="lazy" />
          <span class="movie-year">{{ m.year }}</span>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">{{ m.title }}</h3>
          <p class="movie-note">{{ m.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 22px;
}
.movie-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform .5s cubic-bezier(.22, 1, .36, 1), box-shadow .5s ease, border-color .5s ease;
}
.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover), 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
}
.movie-cover {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: var(--surface-2);
}
.movie-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
.movie-card:hover .movie-cover img { transform: scale(1.05); }
.movie-year {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,.55);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}
.movie-info { padding: 14px 16px 18px; }
.movie-title { font-size: 1.02rem; margin: 0 0 8px; }
.movie-note { color: var(--text-muted); font-size: 0.85rem; line-height: 1.65; margin: 0; }
</style>
