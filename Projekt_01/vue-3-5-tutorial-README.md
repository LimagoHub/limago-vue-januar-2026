# Vue 3.5 Tutorial – Startprojekt (Vite)

Dieses Projekt ist das **erste Praxis- und Lernprojekt** im Vue-3-Seminar.  
Es dient dazu, die **Grundlagen von Vue 3** anhand eines deutschsprachigen Tutorials  
**modern mit Vite und der Composition API** nachzuvollziehen.

Tutorial-Grundlage:  
https://vuejs.de/artikel/vuejs-tutorial-deutsch-anfaenger/

---

## Ziel des Projekts

- Einstieg in Vue 3
- Arbeiten mit der **Composition API** (`<script setup>`)
- Verständnis für:
  - Templates & Interpolation
  - Reaktivität (`ref`, `reactive`)
  - Wrapping / Unwrapping
  - Events & `v-model`
  - Bedingungen & Listen
  - Komponenten-Grundlagen
- Sauberes Projekt-Setup mit **Vite**

---

## Voraussetzungen

- Windows
- Node.js (LTS)
- npm
- Visual Studio Code

---

## Projekt erstellen (Vite)

```powershell
npm create vite@latest vue-3-5-tutorial -- --template vue-ts
cd vue-3-5-tutorial
npm install
npm run dev
```

Die Anwendung läuft standardmäßig unter:

```
http://localhost:5173
```

---

# Schritt 1 – Template, Interpolation & Wrapping

## Template & Interpolation

```vue
<script setup lang="ts">
import { ref } from "vue";

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 1: Template & Interpolation";
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ subtitle }}</p>
  <p>Interpolation: {{ 2 + 3 }}</p>
</template>
```

---

## Wrapping / Unwrapping

```ts
const count = ref(0); // wrapped
count.value++;        // Zugriff im Script
```

Im Template erfolgt automatisches Unwrapping:

```vue
<p>{{ count }}</p>
```

Merksatz:
- Script → `.value`
- Template → kein `.value`

---

# Schritt 2 – `ref()` + Event Handling (Counter)

## Ziel
- Erste Interaktion im UI
- Event Binding mit `@click`
- Einen `ref()`-Wert im Script verändern (mit `.value`)
- Wiederholung: Im Template wird automatisch „unwrapped“

---

## Umsetzung (App.vue)

Ersetze den `<template>`-Teil (oder erweitere ihn) um einen Counter.
Beispiel für `src/App.vue`:

```vue
<script setup lang="ts">
import { ref } from "vue";

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 2: Counter mit Event Handling";

const count = ref(0);

function inc() {
  count.value++;
}

function dec() {
  if (count.value > 0) count.value--;
}

function reset() {
  count.value = 0;
}
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>Counter</h2>

      <p class="count">Aktueller Wert: <strong>{{ count }}</strong></p>

      <div class="buttons">
        <button type="button" @click="dec">-1</button>
        <button type="button" @click="inc">+1</button>
        <button type="button" @click="reset">Reset</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 720px;
}

.card {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.count {
  font-size: 1.1rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
</style>
```

---

## Erklärung

### Event Binding
- `@click="inc"` bindet das **Click-Event** an die Funktion `inc()`.
- Vue ruft die Funktion auf, sobald der Button geklickt wird.

### Reaktivität & `.value`
- `count` ist ein `ref`.
- Im Script wird der eigentliche Wert über `count.value` gelesen/geschrieben:
  - `count.value++`
  - `count.value = 0`

### Unwrapping im Template
Im Template reicht `{{ count }}`, weil Vue `count.value` automatisch verwendet.

---

## Ergebnis dieses Schritts
- Du kannst per Button-Klick den Zustand (State) ändern
- Vue aktualisiert das UI automatisch
- Basis für die nächsten Themen: `v-model`, `computed`, Listen/Filter

# Schritt 3 – v-model (Two-Way Binding)

## Ziel
- Formulareingaben reaktiv anbinden
- `v-model` als Zwei-Wege-Datenbindung verstehen
- Zusammenhang zwischen Input ↔ State ↔ UI erkennen
- Vorbereitung für Formulare, Filter und Settings

---

## Beispiel: Eingabefeld mit Live-Anzeige

Datei: `src/App.vue`

```vue
<script setup lang="ts">
import { ref } from "vue";

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 3: v-model (Two-Way Binding)";

const name = ref("");
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>v-model Beispiel</h2>

      <label>
        Name:
        <input v-model="name" placeholder="Bitte Namen eingeben" />
      </label>

      <p>
        Hallo <strong>{{ name }}</strong>
      </p>
    </section>
  </main>
</template>
```

---

## Erklärung

### Was macht `v-model`?
`v-model` verbindet ein Eingabefeld direkt mit einem reaktiven Wert.

```vue
<input v-model="name" />
```

- Tippen im Input ändert `name.value`
- Änderungen am State aktualisieren automatisch das UI

---

### Warum kein `.value`?
- Im Template werden `ref`s automatisch **unwrapped**
- Vue verwendet intern `name.value`

❌ falsch:
```vue
<input v-model="name.value" />
```

---

### Interne Funktionsweise
`v-model` ist eine Abkürzung für:

```vue
<input
  :value="name"
  @input="name = $event.target.value"
/>
```

---

## Typische Einsatzfälle
- Texteingaben
- Checkboxen
- Selects
- Suchfelder
- Formulare

---

## Merksätze
- `v-model` = Zwei-Wege-Datenbindung
- Input ↔ State ↔ UI
- Template unwrappt automatisch
- `v-model` ist Syntax-Zucker

---

## Ergebnis dieses Schritts
- Reaktive Formulareingaben
- Sicherer Umgang mit `v-model`
- Grundlage für Listen, Filter und Validierung
# Schritt 3 – v-model (Two-Way Binding)

## Ziel
- Formulareingaben reaktiv anbinden
- `v-model` als Zwei-Wege-Datenbindung verstehen
- Zusammenhang zwischen Input ↔ State ↔ UI erkennen
- Vorbereitung für Formulare, Filter und Settings

---

## Beispiel: Eingabefeld mit Live-Anzeige

Datei: `src/App.vue`

```vue
<script setup lang="ts">
import { ref } from "vue";

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 3: v-model (Two-Way Binding)";

const name = ref("");
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>v-model Beispiel</h2>

      <label>
        Name:
        <input v-model="name" placeholder="Bitte Namen eingeben" />
      </label>

      <p>
        Hallo <strong>{{ name }}</strong>
      </p>
    </section>
  </main>
</template>
```

---

## Erklärung

### Was macht `v-model`?
`v-model` verbindet ein Eingabefeld direkt mit einem reaktiven Wert.

```vue
<input v-model="name" />
```

- Tippen im Input ändert `name.value`
- Änderungen am State aktualisieren automatisch das UI

---

### Warum kein `.value`?
- Im Template werden `ref`s automatisch **unwrapped**
- Vue verwendet intern `name.value`

❌ falsch:
```vue
<input v-model="name.value" />
```

---

### Interne Funktionsweise
`v-model` ist eine Abkürzung für:

```vue
<input
  :value="name"
  @input="name = $event.target.value"
/>
```

---

## Typische Einsatzfälle
- Texteingaben
- Checkboxen
- Selects
- Suchfelder
- Formulare

---

## Merksätze
- `v-model` = Zwei-Wege-Datenbindung
- Input ↔ State ↔ UI
- Template unwrappt automatisch
- `v-model` ist Syntax-Zucker

---

## Ergebnis dieses Schritts
- Reaktive Formulareingaben
- Sicherer Umgang mit `v-model`
- Grundlage für Listen, Filter und Validier

# Schritt 4 – Bedingungen (`v-if`) & Listen (`v-for`)

> **Didaktischer Hinweis:**  
> In diesem Schritt werden **bewusst keine neuen Script-Konzepte** wie `computed()`  
> oder Array-Methoden (`filter`, `map`) eingeführt.  
> Der Fokus liegt ausschließlich auf **Template-Direktiven**.

---

## Ziel
- Inhalte abhängig von Bedingungen ein-/ausblenden
- Listen aus Arrays rendern
- `v-if`, `v-else` und `v-for` sicher anwenden
- Korrekte Verwendung von `:key`
- Kennenlernen des UI-Musters „Empty State“

---

## Teil A – Bedingungen mit `v-if`

### Grundidee
Bestimmte Inhalte sollen nur angezeigt werden, wenn eine Bedingung erfüllt ist.

```vue
<p v-if="name">Hallo {{ name }}</p>
<p v-else>Bitte gib deinen Namen ein.</p>
```

- Ist `name` nicht leer → Begrüßung
- Ist `name` leer → Hinweistext

`v-if` fügt das Element **in den DOM ein oder entfernt es vollständig**.

---

## Teil B – Listen mit `v-for`

### Grundidee
Ein Array wird als Liste im UI dargestellt.

---

## Beispiel: Einfache Aufgabenliste

### Datei: `src/App.vue`

```vue
<script setup lang="ts">
import { ref } from "vue";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const title = ref("Vue 3.5 Tutorial (Vite)");
const subtitle = "Schritt 4: v-if & v-for";

const name = ref("");

const tasks = ref<Task[]>([
  { id: 1, title: "Projekt anlegen", done: true },
  { id: 2, title: "Counter bauen", done: false },
]);
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <section class="card">
      <h2>Bedingungen (v-if)</h2>

      <label>
        Name:
        <input v-model="name" placeholder="Bitte Namen eingeben" />
      </label>

      <p v-if="name">
        Hallo <strong>{{ name }}</strong>
      </p>
      <p v-else>
        Bitte gib deinen Namen ein.
      </p>
    </section>

    <section class="card">
      <h2>Listen (v-for)</h2>

      <!-- Empty State -->
      <p v-if="tasks.length === 0">
        Noch keine Aufgaben vorhanden.
      </p>

      <ul v-else>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 1rem;
  max-width: 720px;
}

.card {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
```

---

## Erklärung

### `v-if` / `v-else`
- Steuert, **ob ein Element existiert**
- Ideal für:
  - Zustände (leer / gefüllt)
  - Login / Logout
  - Fehler- oder Hinweistexte

---

### `v-for`
```vue
<li v-for="task in tasks" :key="task.id">
  {{ task.title }}
</li>
```

- Rendert ein Element pro Array-Eintrag
- `:key` muss eindeutig und stabil sein

❌ vermeiden:
```vue
:key="index"
```

---

## UI-Muster: Empty State

```vue
<p v-if="tasks.length === 0">Noch keine Aufgaben vorhanden.</p>
<ul v-else>...</ul>
```

Sehr häufig in realen Anwendungen:
- Listen
- Tabellen
- Suchergebnisse

---

## Merksätze

- `v-if` entscheidet **ob** etwas angezeigt wird
- `v-for` entscheidet **wie oft** etwas angezeigt wird
- `key` identifiziert Elemente eindeutig
- Empty States gehören zu professionellen UIs

---

## Ergebnis dieses Schritts
- Sicherer Umgang mit `v-if` und `v-for`
- Verständnis für Listen-Rendering

# Schritt 5 – `computed()` & abgeleitete Daten

> **Didaktischer Fokus:**  
> In diesem Schritt werden erstmals **abgeleitete Daten** eingeführt.  
> Ziel ist es zu verstehen, **wann man Logik nicht mehr direkt im Template**,  
> sondern in einer **`computed()`-Eigenschaft** kapselt.

---

## Ziel
- Einführung von `computed()`
- Verständnis für „abgeleitete Daten“
- Nutzung von Array-Methoden wie `filter()`
- Trennung von:
  - State (Daten)
  - Darstellung (Template)
  - Logik (computed)

---

## Ausgangssituation
Wir haben aus Schritt 4:
- eine Aufgabenliste (`tasks`)
- einzelne Aufgaben mit `done: true | false`

Jetzt möchten wir z. B.:
- nur **offene Aufgaben** anzeigen
- oder die **Anzahl offener Aufgaben** berechnen

➡️ Diese Werte sind **nicht eigenständiger State**, sondern werden aus `tasks` abgeleitet.

---

## Was sind abgeleitete Daten?

Abgeleitete Daten sind Werte, die:
- **aus anderem State berechnet werden**
- **nicht gespeichert**, sondern **berechnet** werden
- sich automatisch aktualisieren, wenn sich der zugrunde liegende State ändert

Beispiel:
- Aufgabenliste → Anzahl offener Aufgaben
- Liste → gefilterte Liste

---

## Einführung: `computed()`

```ts
import { computed } from "vue";
```

`computed()` erzeugt einen **reaktiven, schreibgeschützten Wert**, der:
- automatisch neu berechnet wird
- nur dann neu berechnet wird, wenn sich Abhängigkeiten ändern

---

## Beispiel: Anzahl offener Aufgaben

### Script (`src/App.vue`)
```ts
<script setup lang="ts">
import { ref, computed } from "vue";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks = ref<Task[]>([
  { id: 1, title: "Projekt anlegen", done: true },
  { id: 2, title: "v-if & v-for verstehen", done: false },
  { id: 3, title: "computed einführen", done: false },
]);

const openTaskCount = computed(() => {
  return tasks.value.filter(task => !task.done).length;
});
</script>
```

### Template
```vue
<p>Offene Aufgaben: <strong>{{ openTaskCount }}</strong></p>
```

---

## Erklärung

### Warum kein `ref`?
❌ falsch:
```ts
const openTaskCount = ref(0);
```

- Dann müsstest du den Wert **manuell aktualisieren**
- Fehleranfällig und unnötig

✅ richtig:
```ts
const openTaskCount = computed(() => { ... });
```

Vue kümmert sich um Aktualisierung.

---

## Array-Methode: `filter()`

```ts
tasks.value.filter(task => !task.done)
```

- `filter()` erstellt ein **neues Array**
- Nur Elemente, für die die Bedingung `true` ist, bleiben erhalten
- Das Original-Array bleibt unverändert

---

## Beispiel: Gefilterte Liste anzeigen

### Script
```ts
const openTasks = computed(() => {
  return tasks.value.filter(task => !task.done);
});
```

### Template
```vue
<ul>
  <li v-for="task in openTasks" :key="task.id">
    {{ task.title }}
  </li>
</ul>
```

---

## Wichtige Regeln für `computed()`

- ❌ Keine Side Effects (keine Änderungen am State)
- ❌ Kein `async`
- ✅ Nur berechnen & zurückgeben
- ✅ Nur von reaktiven Werten abhängen

---

## Typische Anfängerfehler

- `computed` mit `ref` verwechseln
- Logik im Template statt in `computed`
- Versuch, in `computed` Werte zu verändern
- `filter()` direkt im Template verwenden

❌ vermeiden:
```vue
<li v-for="task in tasks.filter(t => !t.done)">
```

---

## Merksätze

- `computed()` = abgeleiteter Zustand
- Abgeleitete Daten werden **nicht gespeichert**
- Vue berechnet sie automatisch neu
- Logik gehört ins Script, nicht ins Template

---




