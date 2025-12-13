<script setup lang="ts">
import type { Fixture } from '~/types'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <BaseCard />
</template>

<style scoped>

</style>
