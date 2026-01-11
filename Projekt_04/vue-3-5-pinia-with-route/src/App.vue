<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main class="container">
    <header class="header">
      <h1>Vue Router + Pinia Demo</h1>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 900px;
}
.header {
  margin-bottom: 1rem;
}
.nav {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
a {
  text-decoration: none;
  border: 1px solid #ccc;
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  color: inherit;
}
a.router-link-active {
  font-weight: 600;
}
</style>
