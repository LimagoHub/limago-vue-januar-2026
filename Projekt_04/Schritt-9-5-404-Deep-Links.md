# Schritt 9.5 – 404-Route & Deep Links (Vue Router)

In diesem Schritt wird die Router-Konfiguration **produkttauglich** gemacht.
Insbesondere ist dieser Teil entscheidend für **Direktaufrufe von URLs** und
spätere **ASP.NET-Core-Integration**.

---

## Problemstellung (Deep Links)

In einer Single-Page-Application (SPA) übernimmt **Vue Router** die Navigation.
Der Server kennt jedoch nur **eine echte HTML-Datei** (`index.html`).

Beispiel:
- Benutzer ruft direkt `/tasks` auf
- Server sucht `/tasks` als Datei oder Route
- Ergebnis ohne Fallback: **404**

➡️ Lösung: **Catch-All-Route im Router + Server-Fallback**

---

## Ziel
- Unbekannte Routen sauber abfangen
- Benutzerfreundliche 404-Seite anzeigen
- Vorbereitung für produktives Hosting (.NET, nginx, IIS)

---

## Schritt 9.5a – 404-View anlegen

Datei: `src/views/NotFoundView.vue`

```vue
<script setup lang="ts">
</script>

<template>
  <section>
    <h2>404</h2>
    <p>Diese Seite existiert nicht.</p>
    <p>
      <RouterLink to="/">Zurück zur Startseite</RouterLink>
    </p>
  </section>
</template>
```

Hinweis:
- `<RouterLink>` funktioniert ohne Import im Template
- Styling kann später ergänzt werden

---

## Schritt 9.5b – Catch-All-Route im Router

Datei: `src/router/index.ts`

```ts
import NotFoundView from "../views/NotFoundView.vue";
```

Am **Ende** der Routenliste ergänzen:

```ts
{ path: "/:pathMatch(.*)*", name: "notfound", component: NotFoundView },
```

Beispiel (vollständig):

```ts
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/tasks", name: "tasks", component: TasksView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/:pathMatch(.*)*", name: "notfound", component: NotFoundView },
  ],
});
```

---

## Schritt 9.5c – Testen

Im Browser testen:

- `http://localhost:5173/does-not-exist`
- Erwartung: **404-View**, kein Vite-Fehler

Optional:
```vue
<RouterLink to="/test-404">404 Test</RouterLink>
```

---

## Wichtig für Produktion (.NET / IIS)

Für produktives Hosting muss der Server:
- **jede unbekannte Route auf `index.html` umleiten**
- Vue Router übernimmt danach die Navigation

👉 Das wird im späteren .NET-Schritt explizit umgesetzt.

---

## Merksätze

- SPAs brauchen immer ein Fallback auf `index.html`
- `/:pathMatch(.*)*` fängt alle unbekannten Routen ab
- 404 gehört in den Router, nicht in die App-Logik
- Unverzichtbar für Deep Links & Refresh

---

## Ergebnis
- Keine Server-404s mehr bei Direktaufrufen
- Saubere Benutzerführung
- App ist produktionsreif vorbereitet
