import type { NewTodo, Todo } from '@/types'
import axios from 'axios'
import { ref } from 'vue'

interface ErrorResponse {
  message: string
}

const todos = ref<Todo[]>([])
const error = ref<string | null>(null)
const loading = ref<boolean>(false)

export default function useTodos() {
  const fetchTodos = async (status?: string) => {
    loading.value = true
    error.value = null // Reset error before making the request
    try {
      const response = await axios.get('http://localhost:8000/api/todos', {
        params: { status },
      })
      todos.value = response.data.data
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error.value = (err.response.data as ErrorResponse).message
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  const storeTodo = async (data: {
    title: string
    description: string
    status: string
  }) => {
    loading.value = true
    error.value = null // Reset error before making the request
    try {
      const response = await axios.post('http://localhost:8000/api/todos', data)
      todos.value.push(response.data.data) // Add the new todo to the list
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error.value = (err.response.data as ErrorResponse).message
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  // Update an existing todo
  const updateTodo = async (id: number | undefined, body: NewTodo) => {
    if (id === undefined) {
      error.value = 'Invalid ID provided'
      return
    }
    loading.value = true
    error.value = null // Reset error before making the request
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/todos/${id}`,
        body,
      )
      // Find the index of the updated todo and update it in the todos array
      const index = todos.value.findIndex(todo => todo.id === id)
      if (index !== -1) {
        todos.value[index] = { ...todos.value[index], ...res.data.data }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error.value = (err.response.data as ErrorResponse).message
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  // Remove a todo
  const deleteTodo = async (id: number | undefined) => {
    if (id === undefined) {
      error.value = 'Invalid ID provided'
      return
    }
    loading.value = true
    error.value = null // Reset error before making the request
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`)
      // Filter out the deleted todo from the array
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error.value = (err.response.data as ErrorResponse).message
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      loading.value = false
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
