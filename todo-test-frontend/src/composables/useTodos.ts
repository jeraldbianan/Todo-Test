import type { NewTodo, Todo } from '@/types'
import axios from 'axios'
import { ref } from 'vue'

const todos = ref<Todo[]>([])
const loading = ref<boolean>(false)
const error = ref<Error | null>(null)

export default function useTodos() {
  const fetchTodos = async (status: string | null = null) => {
    loading.value = true
    error.value = null

    try {
      const params = status ? { status } : {}

      const res = await axios.get('http://localhost:8000/api/todos', {
        params,
      })

      todos.value = res.data.data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const storeTodo = async (body: NewTodo) => {
    try {
      const res = await axios.post('http://localhost:8000/api/todos', body)
      todos.value.unshift(res.data.data)
    } catch (err) {
      error.value = err as Error
    }
  }

  const updateTodo = async (id: number | undefined, body: NewTodo) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/todos/${id}`,
        body,
      )

      const index = todos.value.findIndex(todo => todo.id === id)
      if (index !== -1) {
        todos.value[index] = { ...todos.value[index], ...res.data.data }
      }
    } catch (err) {
      error.value = err as Error
    }
  }

  const deleteTodo = async (id: number | undefined) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
      error.value = err as Error
    }
  }

  return {
    fetchTodos,
    todos,
    loading,
    error,
    updateTodo,
    storeTodo,
    deleteTodo,
  }
}
