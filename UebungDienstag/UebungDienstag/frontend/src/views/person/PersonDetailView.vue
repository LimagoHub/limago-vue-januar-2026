<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">{{ isNew ? 'Neue Person anlegen' : 'Profil bearbeiten' }}</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="save">
          <div class="mb-3">
            <label class="form-label text-muted small">System-ID (GUID)</label>
            <input type="text" class="form-control form-control-sm bg-light" :value="person.id" readonly>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Vorname</label>
              <input v-model="person.vorname" type="text" class="form-control" placeholder="Max" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Nachname</label>
              <input v-model="person.nachname" type="text" class="form-control" placeholder="Mustermann" required>
            </div>
          </div>

          <div class="form-check form-switch mb-4">
            <input v-model="person.aktiv" class="form-check-input" type="checkbox" id="aktivSwitch">
            <label class="form-check-label" for="aktivSwitch">Account aktiv</label>
          </div>

          <div class="d-flex justify-content-between">
            <button type="button" @click="$router.push('/personen')" class="btn btn-outline-secondary">
              Abbrechen
            </button>
            <button type="submit" class="btn btn-success px-4">
              {{ isNew ? 'Person erstellen' : 'Änderungen speichern' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { usePersonLogic } from '@/composables/usePersonLogic';

const route = useRoute();
const id = (route.params.id as string) ?? 'neu';
const { person, isNew, save, loadPerson } = usePersonLogic(id);

onMounted(() => {
    loadPerson();
});
</script>
