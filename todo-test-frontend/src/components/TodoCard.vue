<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionCard from '@/components/SectionCard.vue'
import useTodos from '@/composables/useTodos'
import type { Todo } from '@/types'
import moment from 'moment'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import ModalDialog from '@/components/ModalDialog.vue'

const props = defineProps<{
  todo: Todo
}>()

const isModalOpen = ref(false)
const modalMode = ref<'edit' | 'delete'>('edit')

const { updateTodo } = useTodos()

const updateStatus = async (id: number) => {
  const data = {
    ...props.todo,
    status: props.todo.status === 'Completed' ? 'Pending' : 'Completed',
  }
  await updateTodo(id, data)
}

// Open modal for editing
const openEditModal = () => {
  modalMode.value = 'edit'
  isModalOpen.value = true
}

// Open modal for deleting
const openDeleteModal = () => {
  modalMode.value = 'delete'
  isModalOpen.value = true
}
</script>

<template>
  <SectionCard>
    <template #header>
      <div class="flex justify-between">
        {{ todo.title }}
        <time :datetime="todo.created_at" class="text-xs">
          Posted: {{ moment(todo.created_at).fromNow() }}
        </time>
      </div>
    </template>

    <p>{{ todo.description }}</p>

    <template #footer>
      <div class="flex justify-between">
        <div class="flex items-center gap-1">
          <p
            class="rounded-2xl bg-orange-500 px-2 py-1 text-sm text-white"
            :class="{ '!bg-green-500': todo.status === 'Completed' }"
          >
            {{ todo.status }}
          </p>
          <time v-if="todo.status === 'Completed'" :datetime="todo.updated_at">
            - {{ moment(todo.updated_at).fromNow() }}
          </time>
        </div>

        <div class="flex gap-2">
          <BaseButton @click="updateStatus(todo.id)">
            {{
              todo.status === 'Completed' ? 'Set to Pending' : 'Complete todo'
            }}
          </BaseButton>
          <EditIcon
            class="cursor-pointer hover:scale-110"
            aria-label="Edit todo icon"
            @click="openEditModal"
          />
          <TrashIcon
            class="cursor-pointer hover:scale-110"
            aria-label="Delete todo icon"
            @click="openDeleteModal"
          />
        </div>
      </div>
    </template>

    <ModalDialog
      :is-open="isModalOpen"
      :mode="modalMode"
      @close="isModalOpen = false"
      :todo="props.todo"
    />
  </SectionCard>
</template>
