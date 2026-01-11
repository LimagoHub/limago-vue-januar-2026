# VS-Demo – Fix für TS2307 (App.vue nicht gefunden)

## Fehlerbild

```
TS2307: Cannot find module './App.vue' or its corresponding type declarations
```

Dieser Fehler tritt in Vue-3 + Vite + TypeScript Projekten auf, wenn TypeScript
`.vue` Dateien nicht als Module erkennt oder die Datei nicht am erwarteten Ort liegt.

---

## Ursache (typisch)

Mindestens eine der folgenden Bedingungen ist erfüllt:

1. `App.vue` liegt **nicht** unter `frontend/src/App.vue`
2. Der Importpfad in `main.ts` ist falsch
3. Die Typdeklaration für `.vue` Dateien fehlt (`env.d.ts`)
4. `tsconfig.app.json` inkludiert keine `.vue` Dateien

---

## Schritt 1 – Dateipfad prüfen

Datei muss existieren:

```
frontend/
 └─ src/
    ├─ main.ts
    └─ App.vue
```

Import in `main.ts`:

```ts
import App from "./App.vue";
```

---

## Schritt 2 – env.d.ts anlegen (wichtigster Fix)

Falls nicht vorhanden, Datei anlegen:

**`frontend/src/env.d.ts`**

```ts
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

Danach:
- IDE neu laden (VS / Rider)
- ggf. TypeScript Server neu starten

---

## Schritt 3 – tsconfig.app.json prüfen

**`frontend/tsconfig.app.json`**

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

Wichtig: `.vue` muss enthalten sein.

---

## Schritt 4 – Dev-Server neu starten

```powershell
npm run dev
```

---

## Ergebnis

- TypeScript erkennt `App.vue`
- Importfehler verschwindet
- Vue-App startet korrekt

---

## Merksatz

> In Vue + TypeScript Projekten ist `env.d.ts` Pflicht,
> damit `.vue` Dateien als Module erkannt werden.
