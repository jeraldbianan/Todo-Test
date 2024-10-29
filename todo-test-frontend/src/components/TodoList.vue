<script setup lang="ts">
import { onMounted } from 'vue'

import TodoCard from '@/components/TodoCard.vue'
import LoadingTodoCard from '@/components/LoadingTodoCard.vue'
import ErrorCard from '@/components/ErrorCard.vue'
import useTodos from '@/composables/useTodos'

const { fetchTodos, todos, loading, error } = useTodos()

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <template v-if="error">
    <ErrorCard :retry="fetchTodos">
      {{ error }}
    </ErrorCard>
  </template>
  <template v-else>
    <section class="mx-2 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
      <template v-if="!loading">
        <template v-if="todos.length">
          <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">No Data..</div>
        </template>
      </template>
      <template v-else>
        <!-- if application is still fetching todos, load a placeholder for optimistic UI -->
        <LoadingTodoCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<style scoped></style>
