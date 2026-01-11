# Schritt 6 – Komponenten, Props & Emits (from scratch)

Dieses Projekt startet **neu von Grund auf**, um das Erstellen eines Projekts zu üben
und die bisherigen Konzepte (Schritte 1–5) gezielt anzuwenden.
Der Fokus liegt auf **Komponenten**, **Props** und **Events (Emits)**.

---

## Ziel
- Neues Vue-3-Projekt mit Vite erstellen
- Komponenten sauber schneiden (Parent / Child)
- Datenfluss verstehen:
  - **Props**: Daten von Parent → Child
  - **Emits**: Events von Child → Parent
- Vorbereitung für State-Management (Pinia)

---

## Projekt erstellen (Vite, Vue 3 + TypeScript)

```powershell
npm create vite@latest vue-3-5-components-from-scratch -- --template vue-ts
cd vue-3-5-components-from-scratch
npm install
npm run dev
```

Dev-Server:
```
http://localhost:5173
```

---

## Projektstruktur (relevant)

```text
src/
├─ App.vue                → Parent-Komponente
├─ main.ts
└─ components/
   └─ TaskItem.vue        → Child-Komponente
```

---

## Schritt 6.1 – Child-Komponente erstellen (`TaskItem.vue`)

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
  <li>
    <label>
      <input
        type="checkbox"
        :checked="props.done"
        @change="emit('toggle', props.id)"
      />
      <span :class="{ done: props.done }">{{ props.title }}</span>
    </label>

    <button @click="emit('remove', props.id)">Löschen</button>
  </li>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
```

---

## Schritt 6.2 – Parent-Komponente (`App.vue`)

```vue
<script setup lang="ts">
import { ref } from "vue";
import TaskItem from "./components/TaskItem.vue";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks = ref<Task[]>([
  { id: 1, title: "Projekt neu anlegen", done: true },
  { id: 2, title: "Komponenten verstehen", done: false },
]);

function toggleTask(id: number) {
  const task = tasks.value.find(t => t.id === id);
  if (task) task.done = !task.done;
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}
</script>

<template>
  <main>
    <h1>Schritt 6 – Komponenten</h1>

    <ul>
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
  </main>
</template>
```

---

## Merksätze

- Props fließen **nach unten**
- Events fließen **nach oben**
- Komponenten sind wiederverwendbar
- Logik bleibt im Parent

---

## Ergebnis
- Saubere Parent/Child-Struktur
- Klarer Datenfluss
- Basis für Pinia
