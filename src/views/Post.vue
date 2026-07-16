<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../posts'

const route = useRoute()
const post = computed(() => posts.find((p) => p.slug === route.params.slug))
</script>

<template>
  <div v-if="post" class="post-page">
    <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    <h1>{{ post.title }}</h1>
    <div class="post-meta" v-if="post.date">{{ post.date }}</div>
    <div class="markdown" v-html="post.html"></div>
  </div>
  <p v-else style="color: var(--muted)">文章不存在。</p>
</template>
