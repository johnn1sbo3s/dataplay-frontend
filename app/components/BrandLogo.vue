<script setup lang="ts">
const props = defineProps<{
  minimal?: boolean
  class?: string
}>()

const resolvedLogo = computed<string>(() => {
  if (props.minimal) return '/img/dataplay-logo-minimal.svg'
  return '/img/dataplay-logo.svg'
})

const computedClass = computed<string>(() => {
  if (!props.class) return 'h-9'
  return props.class
})
</script>

<template>
  <NuxtImg
    alt="Logo"
    :class="computedClass"
    :src="resolvedLogo"
  />
</template>
