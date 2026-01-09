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
