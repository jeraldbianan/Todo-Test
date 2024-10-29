export interface Todo {
  id: number
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export interface NewTodo {
  title: string
  description: string
}
