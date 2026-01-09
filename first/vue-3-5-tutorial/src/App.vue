<script setup lang="ts">
import { ref } from "vue";

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 3: v-model (Two-Way Binding)";

// reaktiver Zustand
const name = ref("");
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>v-model Beispiel</h2>

      <label>
        Name:
        <input v-model="name" placeholder="Bitte Namen eingeben" />
      </label>

      <p>
        Hallo <strong>{{ name }}</strong>
      </p>
    </section>
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 700px;
}

.card {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>
