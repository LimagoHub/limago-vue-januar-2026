<script setup lang="ts">
import { ref } from "vue";
import TaskItem from "./components/TaskItem.vue";
import { useTasksStore } from "./stores/tasks";

const store = useTasksStore();
const newTitle = ref("");

function add() {
  store.addTask(newTitle.value);
  newTitle.value = "";
}
</script>

<template>
  <main style="font-family: system-ui; padding: 1rem; max-width: 820px;">
    <h1>Schritt 7 – Pinia (from scratch)</h1>

    <section style="border: 1px solid #ddd; border-radius: 12px; padding: 1rem; margin-top: 1rem;">
      <h2>Neue Aufgabe</h2>

      <div style="display:flex; gap:.5rem; flex-wrap:wrap; align-items:center;">
        <input
          v-model="newTitle"
          placeholder="Neue Aufgabe…"
          @keyup.enter="add"
          style="padding:.5rem .75rem; border-radius:10px; border:1px solid #ccc; min-width:260px;"
        />
        <button type="button" @click="add">Hinzufügen</button>
      </div>

      <p style="opacity:.85; margin-top:.75rem;">
        Offene Aufgaben: <strong>{{ store.openCount }}</strong>
      </p>
    </section>

    <section style="border: 1px solid #ddd; border-radius: 12px; padding: 1rem; margin-top: 1rem;">
      <h2>Aufgaben</h2>

      <p v-if="store.tasks.length === 0" style="opacity:.8;">Keine Aufgaben vorhanden.</p>

      <ul v-else style="list-style:none; padding:0; margin:.5rem 0 0;">
        <TaskItem
          v-for="task in store.tasks"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :done="task.done"
          @toggle="store.toggleTask"
          @remove="store.removeTask"
        />
      </ul>
    </section>
  </main>
</template>
