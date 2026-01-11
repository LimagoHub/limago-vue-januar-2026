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
  <li style="display:flex; justify-content: space-between; gap: 1rem;">
    <label style="display:flex; align-items:center; gap: .5rem;">
      <input
        type="checkbox"
        :checked="props.done"
        @change="emit('toggle', props.id)"
      />
      <span :style="{ textDecoration: props.done ? 'line-through' : 'none' }">
        {{ props.title }}
      </span>
    </label>

    <button type="button" @click="emit('remove', props.id)">Löschen</button>
  </li>
</template>
