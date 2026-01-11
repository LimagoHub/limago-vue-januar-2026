import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

const STORAGE_KEY = "tasks-v1";

function loadTasksFromStorage(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Minimal-Validierung: ist es ein Array?
    if (!Array.isArray(parsed)) return null;

    // Optional: grobe Shape-Prüfung
    return parsed
      .filter((t) => t && typeof t.id === "number" && typeof t.title === "string")
      .map((t) => ({
        id: t.id,
        title: t.title,
        done: Boolean(t.done),
      }));
  } catch {
    return null;
  }
}

function saveTasksToStorage(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const useTasksStore = defineStore("tasks", () => {
  // STATE (Initial: aus Storage, sonst Default)
  const tasks = ref<Task[]>(
    loadTasksFromStorage() ?? [
      { id: 1, title: "Pinia installieren", done: true },
      { id: 2, title: "Store anlegen", done: true },
      { id: 3, title: "Persistenz aktivieren", done: false },
    ]
  );

  // GETTER
  const openCount = computed(() => tasks.value.filter((t) => !t.done).length);

  // ACTIONS
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

  function clearAll() {
    tasks.value = [];
  }

  // PERSISTENZ: bei jeder Änderung speichern
  watch(
    tasks,
    (newTasks) => {
      saveTasksToStorage(newTasks);
    },
    { deep: true }
  );

  return { tasks, openCount, addTask, toggleTask, removeTask, clearAll };
});
