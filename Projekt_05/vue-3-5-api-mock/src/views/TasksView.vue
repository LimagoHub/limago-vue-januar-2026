<script setup lang="ts">
import { onMounted, ref } from "vue";
import TaskItem from "../components/TaskItem.vue";
import { useTasksStore } from "../stores/tasks";

const store = useTasksStore();
const newTitle = ref("");

onMounted(() => {
  store.refresh();
});

async function add() {
  await store.addTask(newTitle.value);
  newTitle.value = "";
}

</script>

<template>
  <section>
    <h2>Tasks</h2>
    <p v-if="store.isLoading">Lade...</p>
    <p v-if="store.error" style="color:#b00">
      Fehler: {{ store.error }}
    </p>
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
