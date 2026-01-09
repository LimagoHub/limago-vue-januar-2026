```vue
<script setup lang="ts">
import { computed, ref } from "vue";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 4: v-if & v-for";

const name = ref("");
const newTaskTitle = ref("");

const tasks = ref<Task[]>([
  { id: 1, title: "Setup prüfen", done: true },
  { id: 2, title: "Counter bauen", done: true },
  { id: 3, title: "v-model verstehen", done: false },
]);

function addTask() {
  const t = newTaskTitle.value.trim();
  if (!t) return;

  tasks.value.unshift({
    id: Date.now(),
    title: t,
    done: false,
  });

  newTaskTitle.value = "";
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
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>Bedingungen (v-if)</h2>

      <label class="row">
        Name:
        <input v-model="name" placeholder="Bitte Namen eingeben" />
      </label>

      <p v-if="name">
        Hallo <strong>{{ name }}</strong>!
      </p>
      <p v-else>Bitte gib deinen Namen ein.</p>
    </section>

    <section class="card">
      <h2>Liste (v-for)</h2>

      <p>Offene Aufgaben: <strong>{{ openCount }}</strong></p>

      <div class="row">
        <input
          v-model="newTaskTitle"
          placeholder="Neue Aufgabe..."
          @keyup.enter="addTask"
        />
        <button type="button" @click="addTask">Hinzufügen</button>
      </div>

      <!-- Leerer Zustand -->
      <p v-if="tasks.length === 0">Noch keine Aufgaben vorhanden.</p>

      <ul v-else class="list">
        <li v-for="task in tasks" :key="task.id" class="item">
          <label class="itemLeft">
            <input
              type="checkbox"
              :checked="task.done"
              @change="toggleTask(task.id)"
            />
            <span :class="{ done: task.done }">{{ task.title }}</span>
          </label>

          <button type="button" class="danger" @click="removeTask(task.id)">
            Löschen
          </button>
        </li>
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
  align-items: center;
  flex-wrap: wrap;
  margin: 0.5rem 0 0.75rem;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-width: 240px;
}

button {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid #eee;
}

.itemLeft {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.done {
  text-decoration: line-through;
  opacity: 0.7;
}

.danger {
  border-color: #d88;
}
</style>
```
