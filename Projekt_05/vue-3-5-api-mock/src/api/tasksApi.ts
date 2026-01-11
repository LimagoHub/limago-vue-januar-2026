import type { Task } from "../stores/tasks";

// Simulierte "Datenbank" (nur Mock)
let db: Task[] = [
  { id: 1, title: "Mock API: Start", done: true },
  { id: 2, title: "API-Schicht einführen", done: false },
];

function delay(ms = 300) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function listTasks(): Promise<Task[]> {
  await delay();
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
