<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import HobbiesSection from './components/HobbiesSection.vue'
import MusicSection from './components/MusicSection.vue'
import AnimeSection from './components/AnimeSection.vue'
import MoviesSection from './components/MoviesSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { profile } from './data/profile.js'
</script>

<template>
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
