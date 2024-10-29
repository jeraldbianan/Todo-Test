<script setup lang="ts">
import SectionCard from '@/components/SectionCard.vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  retry?: () => void
}

defineProps<Props>()
</script>

<template>
  <SectionCard>
    <div class="flex flex-col items-center space-y-4">
      <div class="text-red-500">
        <slot></slot>
      </div>
      <BaseButton v-if="retry" @click="retry"> Retry </BaseButton>
    </div>
  </SectionCard>
</template>

<style scoped></style>
