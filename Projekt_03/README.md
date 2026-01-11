# Schritt 7 – Pinia (globales State Management) – from scratch

In Schritt 6 lag der State (Tasks) in `App.vue`.  
Sobald mehrere Komponenten denselben State brauchen (oder die App wächst), ist Pinia der nächste saubere Schritt.

Dieses Projekt wird **from scratch** neu erstellt, damit du das Setup übst.

---

## Ziel
- Pinia installieren und in Vue registrieren
- Einen Store anlegen (`useTasksStore`)
- State + Actions + Getter (computed im Store) nutzen
- UI aus Schritt 6 weiterverwenden (Add/Toggle/Remove)

---

## 7.0 Projekt erstellen (Vite)

```powershell
npm create vite@latest vue-3-5-pinia-from-scratch -- --template vue-ts
cd vue-3-5-pinia-from-scratch
npm install
```

Pinia installieren:

```powershell
npm install pinia
```

Dev-Server starten:

```powershell
npm run dev
```

---

## 7.1 Pinia in `main.ts` registrieren

Datei: `src/main.ts`

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
```

---

## 7.2 Store anlegen: `src/stores/tasks.ts`

Lege den Ordner `src/stores/` an und erstelle `tasks.ts`.

```ts
import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export const useTasksStore = defineStore("tasks", () => {
  // STATE
  const tasks = ref<Task[]>([
    { id: 1, title: "Pinia installieren", done: true },
    { id: 2, title: "Store anlegen", done: false },
    { id: 3, title: "App auf Store umstellen", done: false },
  ]);

  // GETTERS (abgeleitete Daten)
  const openCount = computed(() => tasks.value.filter((t) => !t.done).length);

  // ACTIONS (State ändern)
  function addTask(title: string) {
    const t = title.trim();
    if (!t) return;

    tasks.value.unshift({
      id: Date.now(),
      title: t,
      done: false,
    });
  }

  function toggleTask(id: number) {
    const task = tasks.value.find((x) => x.id === id);
    if (task) task.done = !task.done;
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter((x) => x.id !== id);
  }

  return { tasks, openCount, addTask, toggleTask, removeTask };
});
```

---

## 7.3 Child-Komponente bleibt „dumm“: `TaskItem.vue`

Datei: `src/components/TaskItem.vue`

```vue
<script setup lang="ts">
const props = defineProps<{
  id: number;
  title: string;
  done: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <li class="item">
    <label class="left">
      <input
        type="checkbox"
        :checked="props.done"
        @change="emit('toggle', props.id)"
      />
      <span :class="{ done: props.done }">{{ props.title }}</span>
    </label>

    <button type="button" class="btn" @click="emit('remove', props.id)">
      Löschen
    </button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid #eee;
}
.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.btn {
  border: 1px solid #ccc;
  background: white;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  cursor: pointer;
}
</style>
```

---

## 7.4 App nutzt den Store: `src/App.vue`

```vue
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
  <main class="container">
    <h1>Schritt 7 – Pinia (from scratch)</h1>

    <section class="card">
      <h2>Neue Aufgabe</h2>

      <div class="row">
        <input
          v-model="newTitle"
          placeholder="Neue Aufgabe…"
          @keyup.enter="add"
        />
        <button type="button" @click="add">Hinzufügen</button>
      </div>

      <p class="hint">
        Offene Aufgaben: <strong>{{ store.openCount }}</strong>
      </p>
    </section>

    <section class="card">
      <h2>Aufgaben</h2>

      <p v-if="store.tasks.length === 0" class="empty">Keine Aufgaben vorhanden.</p>

      <ul v-else class="list">
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
```

---

## Warum ist das jetzt besser?
- Der State ist **zentral** im Store (`tasks`)
- `App.vue` ist dünner: UI + Aufrufe von Store-Actions
- Getter (`openCount`) ist sauber gekapselt
- Weitere Komponenten können denselben Store nutzen (ohne Props-Drilling)

---

## Nächster Schritt (optional)
- Persistenz (LocalStorage) im Store
- Store-Splitting (z.B. `settings`, `auth`)
- Router + Pinia gemeinsam
