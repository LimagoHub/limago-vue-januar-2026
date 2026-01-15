<template>
  <div class="container mt-4">
    <h2>Wettervorhersage</h2>
    <div v-if="store.loading" class="spinner-border text-primary"></div>

    <table v-else class="table table-hover mt-3">
      <thead class="table-dark">
        <tr>
          <th>Datum</th>
          <th>Temp. (C)</th>
          <th>Zusammenfassung</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(f, index) in store.forecasts" :key="index">
          <td>{{ new Date(f.date).toLocaleDateString() }}</td>
          <td>{{ f.temperatureC }}°C</td>
          <td>{{ f.summary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/weatherStore';
import { onMounted } from 'vue';

const store = useWeatherStore();
onMounted(() => store.load());
</script>
