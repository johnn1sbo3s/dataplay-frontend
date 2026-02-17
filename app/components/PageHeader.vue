<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4 lg:w-1/2 lg:gap-8">
    <div>
      <h1 class="text-3xl font-bold text-neutral-200 tracking-tight mb-1">
        {{ title }}
      </h1>

      <p class="text-gray-400 text-sm">
        {{ description }}
      </p>
    </div>

    <div class="flex-1">
      <slot name="right" />
    </div>
  </div>
</template>
