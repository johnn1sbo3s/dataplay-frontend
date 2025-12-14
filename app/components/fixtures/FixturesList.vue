<script setup lang="ts">
import type { Fixture } from '~/types'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <div class="mt-8">
    <div
      v-if="!fixtures.length"
      class="flex flex-col items-center justify-center"
    >
      <FixturesEmptyState />
    </div>

    <BaseCard v-else />
  </div>
</template>

<style scoped>

</style>
