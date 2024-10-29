<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import AddTodoForm from '@/components/AddTodoForm.vue'
import FiltersSection from './components/FiltersSection.vue'
</script>

<template>
  <div>
    <header>
      <h1 class="mt-10 w-full text-center text-4xl font-medium text-black">
        Todo App
      </h1>
    </header>

    <main class="container mx-auto my-8 flex flex-col items-center space-y-8">
      <h2 class="text-2xl font-medium">All Todos</h2>
      <div class="flex w-full items-end justify-between">
        <AddTodoForm />
        <FiltersSection />
      </div>
      <TodoList />
    </main>
  </div>
</template>

<style scoped></style>
