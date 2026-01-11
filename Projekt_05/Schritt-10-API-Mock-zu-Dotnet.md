# Schritt 10 (E) – API-Anbindung vorbereiten (Mock → später .NET)

In diesem Schritt machen wir die App „API-ready“:
- Der Store spricht **nicht mehr direkt** nur mit lokalem State,
- sondern ruft eine **API-Schicht** auf.
Zuerst ist diese API eine **Mock-Implementierung**, später ersetzen wir sie 1:1 durch echte HTTP-Calls
(z.B. zu ASP.NET Core Minimal APIs).

---

## Ziel
- Eine API-Schicht einführen (`src/api/tasksApi.ts`)
- Asynchrone Calls im Store (loading/error)
- Gleiche UI wie bisher (Router + Pinia + TaskItem)
- Späterer Wechsel zu echter .NET-API ohne Umbau der Views

---

## Architektur (wichtig)

**UI (Views/Components)** → ruft **Store Actions**  
**Store** → ruft **API-Schicht**  
**API-Schicht** → Mock (jetzt) / HTTP (später)

Damit vermeiden wir, dass `fetch()` in Komponenten überall verstreut ist.

---

## 10.1 API-Schicht anlegen (Mock)

Datei: `src/api/tasksApi.ts` (Ordner `src/api/` ggf. anlegen)

```ts
import type { Task } from "../stores/tasks";

// Simulierte "Datenbank" im Browser (nur für Mock)
let db: Task[] = [
  { id: 1, title: "Mock API: Start", done: true },
  { id: 2, title: "API-Schicht einführen", done: false },
];

// Hilfsfunktion: künstliche Latenz (z.B. 300ms)
function delay(ms = 300) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function listTasks(): Promise<Task[]> {
  await delay();
  // Kopie zurückgeben (kein Teilen der Referenz)
  return structuredClone(db);
}

export async function addTask(title: string): Promise<Task> {
  await delay();
  const t = title.trim();
  if (!t) throw new Error("Titel darf nicht leer sein.");

  const task: Task = { id: Date.now(), title: t, done: false };
  db = [task, ...db];
  return structuredClone(task);
}

export async function toggleTask(id: number): Promise<Task> {
  await delay();
  const task = db.find((x) => x.id === id);
  if (!task) throw new Error("Task nicht gefunden.");
  task.done = !task.done;
  return structuredClone(task);
}

export async function removeTask(id: number): Promise<void> {
  await delay();
  const before = db.length;
  db = db.filter((x) => x.id !== id);
  if (db.length === before) throw new Error("Task nicht gefunden.");
}
```

> Hinweis: `structuredClone` ist in modernen Browsern verfügbar.  
> Falls nötig, kann man statt dessen `JSON.parse(JSON.stringify(...))` verwenden.

---

## 10.2 Store auf API umstellen (async + loading/error)

Öffne `src/stores/tasks.ts` und erweitere ihn so:

1) Zusätzliche Imports:
```ts
import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import * as api from "../api/tasksApi";
```

2) Ergänze State für loading/error:
```ts
const isLoading = ref(false);
const error = ref<string | null>(null);
```

3) Neue Action: initial laden
```ts
async function refresh() {
  isLoading.value = true;
  error.value = null;
  try {
    tasks.value = await api.listTasks();
  } catch (e: any) {
    error.value = e?.message ?? "Unbekannter Fehler";
  } finally {
    isLoading.value = false;
  }
}
```

4) Actions auf API umstellen:

```ts
async function addTask(title: string) {
  isLoading.value = true;
  error.value = null;
  try {
    const created = await api.addTask(title);
    tasks.value.unshift(created);
  } catch (e: any) {
    error.value = e?.message ?? "Unbekannter Fehler";
  } finally {
    isLoading.value = false;
  }
}

async function toggleTask(id: number) {
  isLoading.value = true;
  error.value = null;
  try {
    const updated = await api.toggleTask(id);
    const idx = tasks.value.findIndex((t) => t.id === id);
    if (idx >= 0) tasks.value[idx] = updated;
  } catch (e: any) {
    error.value = e?.message ?? "Unbekannter Fehler";
  } finally {
    isLoading.value = false;
  }
}

async function removeTask(id: number) {
  isLoading.value = true;
  error.value = null;
  try {
    await api.removeTask(id);
    tasks.value = tasks.value.filter((t) => t.id !== id);
  } catch (e: any) {
    error.value = e?.message ?? "Unbekannter Fehler";
  } finally {
    isLoading.value = false;
  }
}
```

5) Store-Return erweitern:
```ts
return { tasks, openCount, isLoading, error, refresh, addTask, toggleTask, removeTask, clearAll };
```

---

## 10.3 TasksView: Loading & Error anzeigen + initial laden

Öffne `src/views/TasksView.vue` und ergänze:

1) Beim Start laden:
```ts
import { onMounted, ref } from "vue";
...
onMounted(() => {
  store.refresh();
});
```

2) Loading & Error im Template anzeigen (z.B. oberhalb der Liste):
```vue
<p v-if="store.isLoading">Lade...</p>
<p v-if="store.error" style="color: #b00">
  Fehler: {{ store.error }}
</p>
```

3) Wichtig: Da `store.addTask` async ist, im `add()` awaiten:
```ts
async function add() {
  await store.addTask(newTitle.value);
  newTitle.value = "";
}
```

---

## 10.4 Was haben wir gewonnen?

- Komponenten bleiben schlank
- API kann später 1:1 gegen `fetch()`-HTTP-Calls ersetzt werden
- Pinia bleibt zentraler Ort für State, Loading, Error

---

## 10.5 Nächster Schritt (E → .NET)

Jetzt ist der perfekte Zeitpunkt, die Mock-API durch echte Endpoints zu ersetzen:

- ASP.NET Core Minimal API:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `POST /api/tasks/{id}/toggle`
  - `DELETE /api/tasks/{id}`

Und in Vite:
- Proxy auf `https://localhost:xxxx`

Wenn du willst, machen wir genau das als nächsten Schritt.
