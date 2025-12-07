<script setup lang="ts">
import type { Fixture } from '~/types'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <FixtureCard :fixture="fixtures[0]" />
</template>

<style scoped>

</style>
