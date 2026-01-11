import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import * as api from "../api/tasksApi";


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

  const isLoading = ref(false);
  const error = ref<string | null>(null);



  // STATE (Initial: aus Storage, sonst Default)
 const tasks = ref<Task[]>([]);

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


  // GETTER
  const openCount = computed(() => tasks.value.filter((t) => !t.done).length);

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



  // PERSISTENZ: bei jeder Änderung speichern
  /*watch(
    tasks,
    (newTasks) => {
      saveTasksToStorage(newTasks);
    },
    { deep: true }
  );*/

  return { tasks, openCount, isLoading, error, refresh, addTask, toggleTask, removeTask };

});
