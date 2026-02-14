<script setup lang="ts">
import type { Fixture } from '~/types'
import FixtureCard from './FixtureCard.vue'

defineProps<{
  fixtures: Fixture[]
}>()
</script>

<template>
  <div class="glass-card rounded-2xl p-4 flex flex-col gap-3 h-full">
    <div class="flex gap-3 items-center justify-between mx-1">
      <p class="text-sm">
        {{ fixtures.length }} jogos
      </p>

      <div class="flex gap-1 items-center">
        <div class="bg-primary-500/30 h-3 w-4 rounded-xs" />

        <small class="text-white/90 text-xs mt-0.5">
          Favorito
        </small>
      </div>
    </div>

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
