# Schritt 8 – Persistenz mit LocalStorage (Pinia)

In diesem Schritt wird der Pinia-State **persistent gespeichert**, sodass Daten
auch nach einem Browser-Reload erhalten bleiben.

---

## Ziel
- Verstehen, wo Pinia-State normalerweise lebt (RAM)
- Persistenz mit `localStorage` umsetzen
- State beim Start laden
- State bei Änderungen automatisch speichern

---

## Grundidee

- **Pinia speichert State nur im Arbeitsspeicher**
- Beim Reload ist der State normalerweise verloren
- Lösung: Synchronisation mit `localStorage`

---

## Wo werden die Daten gespeichert?

Die Daten werden im **Browser-LocalStorage** gespeichert.

- Speicherort: **Browser → Domain / Origin**
- In der Entwicklung z. B.:
  ```
  http://localhost:5173
  ```
- Schlüssel:
  ```ts
  const STORAGE_KEY = "tasks-v1";
  ```

Im Browser (DevTools → Application → Local Storage) ist sichtbar:
```
Key:   tasks-v1
Value: JSON-String mit Tasks
```

---

## Eigenschaften von `localStorage`

- Speichert **String-Werte**
- Bleibt nach Reload & Browser-Neustart erhalten
- Pro Domain begrenzt (~5–10 MB)
- Nur im aktuellen Browser / Benutzerprofil verfügbar

---

## Implementierung im Pinia-Store

### Laden aus dem Storage

```ts
function loadTasksFromStorage(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    return parsed.map((t) => ({
      id: t.id,
      title: t.title,
      done: Boolean(t.done),
    }));
  } catch {
    return null;
  }
}
```

---

### Initialer State

```ts
const tasks = ref<Task[]>(
  loadTasksFromStorage() ?? [
    { id: 1, title: "Persistenz aktivieren", done: false },
  ]
);
```

---

### Automatisches Speichern mit `watch`

```ts
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  },
  { deep: true }
);
```

---

## Vorteile dieser Lösung

- Sehr einfach umzusetzen
- Kein Backend notwendig
- Ideal für:
  - Prototypen
  - Demos
  - lokale Einstellungen

---

## Einschränkungen

- Nicht sicher (User kann Daten ändern/löschen)
- Nur lokal im Browser
- Nicht geeignet für Mehrbenutzer-Szenarien
- Kein Ersatz für ein Backend

---

## Vergleich: Speicherarten

| Speicher        | Lebensdauer        | Sichtbarkeit            |
|-----------------|-------------------|-------------------------|
| Pinia (State)   | bis Reload        | aktuelle App            |
| localStorage    | dauerhaft         | Browser / Domain        |
| sessionStorage  | Tab-Lebensdauer   | aktueller Tab           |
| Backend (DB)    | dauerhaft         | alle Benutzer           |

---

## Merksätze

- Pinia speichert State im RAM
- `localStorage` speichert im Browser
- Persistenz ist ein **Zusatz**, kein Ersatz für ein Backend
