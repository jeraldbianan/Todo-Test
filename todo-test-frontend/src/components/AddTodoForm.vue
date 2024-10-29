<script setup lang="ts">
import useTodos from '@/composables/useTodos'
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const titleError = ref('')
const descriptionError = ref('')

const { storeTodo } = useTodos()

// Function to validate inputs
const validateInputs = () => {
  let valid = true
  titleError.value = '' // Reset error messages
  descriptionError.value = ''

  // Validate title
  if (title.value.trim() === '') {
    titleError.value = 'Title is required.'
    valid = false
  }

  // Validate description
  if (description.value.trim() === '') {
    descriptionError.value = 'Description is required.'
    valid = false
  }

  return valid
}

const submitTodo = async () => {
  // Call validateInputs and store the result
  const isValid = validateInputs()
  if (!isValid) {
    return // Prevent submission if inputs are invalid
  }

  const data = {
    title: title.value,
    description: description.value,
    status: 'Pending',
  }

  await storeTodo(data)
  // Clear inputs after submission
  title.value = ''
  description.value = ''
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
      <p class="text-red-500">{{ titleError }}</p>
      <!-- Display title error -->
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
      <p class="text-red-500">{{ descriptionError }}</p>
      <!-- Display description error -->
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
