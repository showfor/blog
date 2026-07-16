<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import HobbiesSection from './components/HobbiesSection.vue'
import MusicSection from './components/MusicSection.vue'
import AnimeSection from './components/AnimeSection.vue'
import MoviesSection from './components/MoviesSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { profile } from './data/profile.js'
import { ref, onMounted, onUnmounted } from 'vue'

// 顶部滚动进度（rAF 节流，仅改 transform）
const progress = ref(0)
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    progress.value = max > 0 ? Math.min(1, h.scrollTop / max) : 0
    ticking = false
  })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="aurora"></div>
  <div class="scroll-progress" :style="{ transform: 'scaleX(' + progress + ')' }"></div>
  <a id="top"></a>
  <SiteNav :brand="profile.name + ' 的主页'" />

  <main class="container">
    <HeroSection />
    <HobbiesSection />
    <MusicSection />
    <AnimeSection />
    <MoviesSection />
  </main>

  <SiteFooter />
</template>
