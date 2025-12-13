<script setup lang="ts">
const { width } = useWindowSize()

const resolvedLogo = computed(() => {
  if (width.value < 768) {
    return '/img/dataplay-logo-minimal.svg'
  }

  return '/img/dataplay-logo.svg'
})
</script>

<template>
  <NuxtImg
    alt="Logo"
    class="h-8"
    :src="resolvedLogo"
  />
</template>
