<script setup lang="ts">
const props = defineProps<{
  id: number;
  title: string;
  done: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <li class="item">
    <label class="left">
      <input
        type="checkbox"
        :checked="props.done"
        @change="emit('toggle', props.id)"
      />
      <span :class="{ done: props.done }">{{ props.title }}</span>
    </label>

    <button type="button" class="btn" @click="emit('remove', props.id)">
      Löschen
    </button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid #eee;
}
.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.btn {
  border: 1px solid #ccc;
  background: white;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  cursor: pointer;
}
</style>
