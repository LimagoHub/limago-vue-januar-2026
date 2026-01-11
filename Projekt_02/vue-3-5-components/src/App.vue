<script setup lang="ts">
import { computed, ref } from "vue";
import TaskItem from "./components/TaskItem.vue";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks = ref<Task[]>([
  { id: 1, title: "Projekt neu anlegen", done: true },
  { id: 2, title: "Props an Child übergeben", done: false },
  { id: 3, title: "Emits an Parent zurückmelden", done: false },
]);

const newTitle = ref("");

function addTask() {
  const t = newTitle.value.trim();
  if (!t) return;

  tasks.value.unshift({
    id: Date.now(),
    title: t,
    done: false,
  });

  newTitle.value = "";
}

function toggleTask(id: number) {
  const task = tasks.value.find((x) => x.id === id);
  if (task) task.done = !task.done;
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((x) => x.id !== id);
}

const openCount = computed(() => tasks.value.filter((t) => !t.done).length);
</script>

<template>
  <main class="container">
    <h1>Schritt 6 – Komponenten (Props & Emits) + Add Task</h1>

    <section class="card">
      <h2>Neue Aufgabe</h2>

      <div class="row">
        <input
          v-model="newTitle"
          placeholder="Neue Aufgabe…"
          @keyup.enter="addTask"
        />
        <button type="button" @click="addTask">Hinzufügen</button>
      </div>

      <p class="hint">
        Offene Aufgaben: <strong>{{ openCount }}</strong>
      </p>
    </section>

    <section class="card">
      <h2>Aufgaben</h2>

      <p v-if="tasks.length === 0" class="empty">Keine Aufgaben vorhanden.</p>

      <ul v-else class="list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :done="task.done"
          @toggle="toggleTask"
          @remove="removeTask"
        />
      </ul>
    </section>
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 820px;
}

.card {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.5rem;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-width: 260px;
}

button {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.hint {
  margin-top: 0.75rem;
  opacity: 0.85;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.empty {
  opacity: 0.8;
}
</style>
