<script setup>
import { posts } from '../posts'
</script>

<template>
  <section class="post-list">
    <article v-for="post in posts" :key="post.slug" class="post-card">
      <h2>
        <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
      </h2>
      <div class="post-meta" v-if="post.date">{{ post.date }}</div>
      <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
    </article>

    <p v-if="posts.length === 0" style="color: var(--muted)">
      还没有文章，在 <code>src/posts/</code> 下新建一个 <code>.md</code> 文件即可。
    </p>
  </section>
</template>
