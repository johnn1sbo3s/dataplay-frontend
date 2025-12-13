<script setup lang="ts">
const props = defineProps<{
  minimal?: boolean
}>()

const resolvedLogo = computed<string>(() => {
  if (props.minimal) return '/img/dataplay-logo-minimal.svg'
  return '/img/dataplay-logo.svg'
})
</script>

<template>
  <NuxtImg
    alt="Logo"
    class="h-9"
    :src="resolvedLogo"
  />
</template>
