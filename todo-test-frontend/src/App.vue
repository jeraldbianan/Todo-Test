<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import AddTodoForm from '@/components/AddTodoForm.vue'
import FiltersSection from './components/FiltersSection.vue'
</script>

<template>
  <div class="mx-4">
    <header>
      <h1 class="mt-10 w-full text-center text-4xl font-medium text-black">
        Todo App
      </h1>
    </header>

    <main class="container my-8 flex flex-col items-center lg:mx-auto">
      <h2 class="text-2xl font-medium">All Todos</h2>
      <div
        class="mb-4 flex w-full flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <AddTodoForm />
        <FiltersSection />
      </div>
      <TodoList />
    </main>
  </div>
</template>

<style scoped></style>
