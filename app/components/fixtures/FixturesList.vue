<script setup lang="ts">
import type { Fixture } from '~/types'
import FixtureCard from './FixtureCard.vue'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <div class="glass-card rounded-2xl p-6 flex flex-col gap-3 h-full">
    <span class="text-sm">
      {{ fixtures.length }} jogos
    </span>

    <div class="flex flex-col gap-2">
      <FixtureCard
        v-for="(fixture, index) in fixtures"
        :key="index"
        :fixture="fixture"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
