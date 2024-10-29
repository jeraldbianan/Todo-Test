<script setup lang="ts">
import useTodos from '@/composables/useTodos'
import { computed, ref } from 'vue'

const title = ref('')
const description = ref('')

const { storeTodo } = useTodos()

const isValidInputs = computed(
  () => title.value !== '' && description.value !== '',
)

const submitTodo = async () => {
  if (!isValidInputs.value) {
    return
  }

  const data = {
    title: title.value,
    description: description.value,
    status: 'Pending',
  }

  await storeTodo(data)
}
</script>

<template>
  <form @submit.prevent="submitTodo" class="w-[500px]">
    <div class="mb-2 flex flex-col gap-1">
      <label for="title">Title</label>
      <input
        v-model="title"
        type="text"
        id="title"
        placeholder="Buy Groceries"
        class="rounded-md border p-2"
      />
      <p></p>
    </div>

    <div class="mb-2 flex flex-col gap-1">
      <label for="description">Description</label>
      <input
        v-model="description"
        type="text"
        id="description"
        placeholder="Go to market and buy groceries"
        class="rounded-md border p-2"
      />
    </div>

    <button
      type="submit"
      class="mt-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-700"
    >
      Add new todo
    </button>
  </form>
</template>

<style scoped></style>
