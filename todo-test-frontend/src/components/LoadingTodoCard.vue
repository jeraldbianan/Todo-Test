<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'
</script>

<template>
  <BaseCard class="animate-pulse">
    <div class="h-6 border-b border-gray-200 bg-gray-300 p-6"></div>
    <div class="h-4 border-b border-gray-200 bg-gray-300 p-4"></div>
    <div class="h-4 bg-gray-300 p-4"></div>

    <div class="flex justify-end p-4">
      <div class="h-8 w-24 rounded-full bg-gray-300"></div>
    </div>
  </BaseCard>
</template>
