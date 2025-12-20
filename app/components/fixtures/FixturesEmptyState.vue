<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <NuxtImg
      src="/img/empty-states/fixtures-empty-state.svg"
      class="h-[250px] w-[250px]"
    />

    <div class="flex flex-col gap-1 text-center">
      <div class="text-xl font-semibold text-primary">
        {{ title }}
      </div>

      <div class="text-sm text-neutral-400">
        {{ description }}
      </div>
    </div>
  </div>
</template>
