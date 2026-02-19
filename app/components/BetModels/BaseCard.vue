<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <UCard
    :ui="{
      header: 'bg-black/15',
      root: 'glass-panel'
    }"
  >
    <template #header>
      <p class="text-white/90 font-semibold">
        {{ title }}
      </p>
    </template>

    <template #default>
      <slot />
    </template>
  </UCard>
</template>
