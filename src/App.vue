<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink to="/" class="site-title">我的博客</RouterLink>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="container">© {{ new Date().getFullYear() }} 我的博客 · Built with Vite</div>
  </footer>
</template>
