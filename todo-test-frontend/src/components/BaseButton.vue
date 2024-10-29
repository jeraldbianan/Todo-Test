<script setup lang="ts">
const variants = {
  default: 'border border-gray-200 hover:bg-gray-100',
  danger: 'bg-red-200 enabled:hover:bg-red-100 text-red-900',
}

withDefaults(
  defineProps<
    Partial<{
      variant: keyof typeof variants
    }>
  >(),
  {
    variant: 'default',
  },
)

defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    :class="['rounded-full px-3 py-1 text-sm font-medium', variants[variant]]"
  >
    <slot>Ok</slot>
  </button>
</template>

<style scoped></style>
