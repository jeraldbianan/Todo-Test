<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'
</script>

<template>
  <BaseCard>
    <h3
      v-if="$slots.header"
      class="border-b border-gray-200 p-4 text-xl font-medium"
    >
      <slot name="header"></slot>
    </h3>

    <div
      v-if="$slots.default"
      :class="{
        'flex flex-col gap-4 p-4': true,
        'border-b border-gray-200': $slots.footer,
      }"
    >
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="p-4">
      <slot name="footer"></slot>
    </div>
  </BaseCard>
</template>

<style scoped></style>
