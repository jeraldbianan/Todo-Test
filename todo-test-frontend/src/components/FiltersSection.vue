<script setup lang="ts">
import { ref } from 'vue'
import useTodos from '@/composables/useTodos'

const { fetchTodos } = useTodos()

const selectedStatus = ref('')

const handleSelect = async () => {
  await fetchTodos(selectedStatus.value)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="status" class="font-semibold">Filter</label>
    <select
      v-model="selectedStatus"
      @change="handleSelect"
      name="status"
      id="status"
      class="rounded-md border p-2"
    >
      <option value="">All</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>
  </div>
</template>

<style scoped></style>
