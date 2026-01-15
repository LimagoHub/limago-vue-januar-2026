<template>
  <div class="container mt-4">
    <h2>Personenverwaltung</h2>

    <router-link to="/personen/neu" class="btn btn-primary mb-3">Neue Person</router-link>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Status</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.persons" :key="p.id">
          <td>{{ p.vorname }}</td>
          <td>{{ p.nachname }}</td>
          <td><span :class="p.aktiv ? 'badge bg-success' : 'badge bg-secondary'">
            {{ p.aktiv ? 'Aktiv' : 'Inaktiv' }}</span>
          </td>
          <td>
            <router-link :to="`/personen/${p.id}`" class="btn btn-sm btn-outline-info me-2">Edit</router-link>
            <button @click="store.deletePerson(p.id)" class="btn btn-sm btn-danger">Löschen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { usePersonStore } from '@/stores/personStore';
import { onMounted } from 'vue';

const store = usePersonStore();
onMounted(() => store.fetchPersons());
</script>
