<script setup>
import { movieList } from '../data/movies.js'
import { asset } from '../utils.js'

function formatVotes(n) {
  if (!n) return ''
  if (n >= 10000) return (n / 10000).toFixed(1) + '万人评价'
  return n + '人评价'
}
</script>

<template>
  <section id="movies" class="section">
    <div class="section-head">
      <span class="eyebrow">Films</span>
      <h2 class="section-title">我爱看的电影</h2>
      <p class="section-sub">在别人的故事里，照见自己的生活。</p>
    </div>
    <div class="movie-grid">
      <a v-for="(m, i) in movieList" :key="m.title" class="movie-card" :href="m.url" target="_blank" rel="noopener noreferrer" v-reveal="i * 0.06">
        <div class="movie-cover">
          <img :src="asset(m.cover)" :alt="m.title" loading="lazy" />
          <span class="movie-rating" v-if="m.rating !== undefined && m.rating !== null">★ {{ m.rating }}</span>
          <span class="movie-year">{{ m.year }}</span>
          <span class="douban-badge cover-badge">豆瓣</span>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">{{ m.title }}</h3>
          <p class="movie-rating-line" v-if="m.rating !== undefined && m.rating !== null">
            <span class="movie-rating-num">豆瓣 {{ m.rating }}</span>
            <span class="movie-votes" v-if="formatVotes(m.votes)">{{ formatVotes(m.votes) }}</span>
          </p>
          <p class="movie-note">{{ m.note }}</p>
        </div>
      </a>
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
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform .5s cubic-bezier(.22, 1, .36, 1), box-shadow .5s ease, border-color .5s ease;
}
.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover),0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
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
.movie-rating {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 184, 34, .96);
  color: #3a2a00;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,.28);
  letter-spacing: .3px;
}
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
.movie-rating-line { display: flex; align-items: baseline; gap: 8px; margin: 0 0 8px; flex-wrap: wrap; }
.movie-rating-num {
  font-size: 0.82rem;
  font-weight: 700;
  color: #e0900a;
}
.movie-votes { color: var(--text-muted); font-size: 0.75rem; }
.movie-note { color: var(--text-muted); font-size: 0.85rem; line-height: 1.65; margin: 0; }
</style>
