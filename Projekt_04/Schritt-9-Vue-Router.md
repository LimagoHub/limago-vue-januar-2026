# Schritt 9 – Vue Router (B) – Seitenstruktur für die App

In diesem Schritt führen wir **Vue Router 4** ein, damit die App mehrere Seiten bekommt
(z.B. Tasks, About). Das ist ein wichtiger Baustein für „echte“ Apps und später auch
für die .NET-Integration (Routing, Deep Links, SPA-Hosting).

---

## Ziel
- Vue Router installieren
- Router in `main.ts` registrieren
- Routen definieren (`/`, `/tasks`, `/about`)
- Navigation mit `<RouterLink>`
- Seiteninhalt über `<RouterView>` rendern
- Pinia-Store weiterhin nutzen (Tasks-Seite)

---

## 9.0 Installation

Im Projektordner:

```powershell
npm install vue-router@4
```

---

## 9.1 Router anlegen

Erstelle Ordner und Datei:

```
src/router/index.ts
```

Inhalt:

```ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TasksView from "../views/TasksView.vue";
import AboutView from "../views/AboutView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/tasks", name: "tasks", component: TasksView },
    { path: "/about", name: "about", component: AboutView },
  ],
});
```

---

## 9.2 Views anlegen

Erstelle Ordner:

```
src/views/
```

### 9.2a HomeView

Datei: `src/views/HomeView.vue`

```vue
<script setup lang="ts">
</script>

<template>
  <section>
    <h2>Home</h2>
    <p>Willkommen! Diese App zeigt Vue Router + Pinia in einer kleinen Demo.</p>
    <p>Gehe zu <strong>Tasks</strong>, um die Aufgabenliste zu sehen.</p>
  </section>
</template>
```

### 9.2b AboutView

Datei: `src/views/AboutView.vue`

```vue
<script setup lang="ts">
</script>

<template>
  <section>
    <h2>About</h2>
    <p>Demo-App für Seminar: Vue 3 + Composition API + Pinia + Vue Router.</p>
  </section>
</template>
```

### 9.2c TasksView

Datei: `src/views/TasksView.vue`

> Diese Seite nutzt weiter den Pinia-Store und die TaskItem-Komponente.

```vue
<script setup lang="ts">
import { ref } from "vue";
import TaskItem from "../components/TaskItem.vue";
import { useTasksStore } from "../stores/tasks";

const store = useTasksStore();
const newTitle = ref("");

function add() {
  store.addTask(newTitle.value);
  newTitle.value = "";
}
</script>

<template>
  <section>
    <h2>Tasks</h2>

    <div class="card">
      <h3>Neue Aufgabe</h3>

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
    </div>

    <div class="card">
      <h3>Liste</h3>

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
    </div>
  </section>
</template>

<style scoped>
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

## 9.3 Router registrieren (main.ts)

Öffne `src/main.ts` und ergänze Router (zusätzlich zu Pinia):

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";

createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
```

---

## 9.4 App als Shell: Navigation + RouterView

Ersetze `src/App.vue` durch diese „Shell“:

```vue
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main class="container">
    <header class="header">
      <h1>Vue Router + Pinia Demo</h1>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 900px;
}
.header {
  margin-bottom: 1rem;
}
.nav {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
a {
  text-decoration: none;
  border: 1px solid #ccc;
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  color: inherit;
}
a.router-link-active {
  font-weight: 600;
}
</style>
```

---

## Checkliste (funktioniert alles?)

- `/` zeigt Home
- `/about` zeigt About
- `/tasks` zeigt Task-Liste (Pinia funktioniert weiterhin)
- Navigation funktioniert über Links

---

## Merksätze

- `App.vue` wird zur **Shell** (Layout + Navigation)
- `<RouterView>` ist der Platzhalter für die aktuelle Seite
- `<RouterLink>` erzeugt SPA-Navigation ohne Reload
- Pinia bleibt unabhängig vom Router und funktioniert pro View genauso

---

## Nächster Schritt (nach B)

- Deep Links / 404 Route (`/:pathMatch(.*)*`)
- Route Guards (Auth)
- Vorbereitung für .NET Hosting (Fallback auf `index.html`)
