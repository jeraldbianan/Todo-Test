<script setup lang="ts">
import useTodos from '@/composables/useTodos'
import type { NewTodo, Todo } from '@/types'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  todo: Todo | null
  mode: 'delete' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { deleteTodo, updateTodo } = useTodos()

const titleInput = ref<HTMLInputElement | null>(null)
const modalElement = ref<HTMLDivElement | null>(null)
const input = ref<NewTodo>({
  title: '',
  description: '',
})
// activates focus trap, so that focus won't get out of the modal/dialog
const { activate, deactivate } = useFocusTrap(modalElement)

onMounted(() => {
  input.value.title = props.todo?.title || ''
  input.value.description = props.todo?.description || ''
})

const confirmDelete = async () => {
  await deleteTodo(props.todo?.id)
  emit('close')
}

const confirmUpdate = async () => {
  const data = {
    title: input.value.title,
    description: input.value.description,
    status: props.todo?.status,
  }

  await updateTodo(props.todo?.id, data)
  emit('close')
}

watch(
  () => props.isOpen,
  async isOpen => {
    if (isOpen) {
      await nextTick()
      setTimeout(() => {
        titleInput.value?.focus()
      }, 0)
      activate()
    } else {
      deactivate()
    }
  },
)
</script>

<template>
  <div
    v-if="isOpen"
    @keydown.esc="emit('close')"
    class="fixed inset-0 flex items-center justify-center bg-black/30"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-md rounded bg-white p-5">
      <h2 class="mb-4 text-xl font-bold">
        {{
          mode === 'delete'
            ? 'Are you sure you want to delete this todo?'
            : 'Edit Todo'
        }}
      </h2>

      <div v-if="props.mode === 'edit'">
        <input
          v-model="input.title"
          ref="titleInput"
          type="text"
          placeholder="Card Title"
          aria-label="Card Title"
          class="mb-4 w-full rounded border p-2"
        />
        <textarea
          v-model="input.description"
          class="mb-4 w-full rounded border p-2"
          placeholder="Description"
          aria-label="Card Description"
        ></textarea>
      </div>

      <div class="flex justify-end gap-2">
        <button
          @click="emit('close')"
          class="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          v-if="mode === 'delete'"
          @click="confirmDelete"
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Delete
        </button>
        <button
          v-else
          @click="confirmUpdate"
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
