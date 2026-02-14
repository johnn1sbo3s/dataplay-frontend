<script setup lang="ts">
import type { Fixture } from '~/types'
import FixtureCard from './FixtureCard.vue'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <div class="glass-card rounded-2xl p-4 flex flex-col gap-3 h-full">
    <p class="text-sm ml-1">
      {{ fixtures.length }} jogos
    </p>

    <div class="flex flex-col gap-3">
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
