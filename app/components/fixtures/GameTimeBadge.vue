<script setup lang="ts">
defineProps<{
  time: string
}>()
</script>

<template>
  <div class="py-1 px-2 w-20 bg-white/8 rounded-lg text-sm text-neutral-400 flex gap-1 items-center justify-center">
    <Icon
      name="i-lucide-clock"
      class="h-4 w-4"
    />

    <p>
      {{ time }}
    </p>
  </div>
</template>
