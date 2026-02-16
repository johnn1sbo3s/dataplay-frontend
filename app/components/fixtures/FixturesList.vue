<script setup lang="ts">
import type { Fixture } from '~/types'
import FixtureCard from './FixtureCard.vue'
import type { Filters } from './FiltersSection.vue'

const props = defineProps<{
  fixtures: Fixture[]
  filters: Filters
}>()

const emit = defineEmits(['item-click'])

const filteredFixtures = computed(() => {
  let fixtures = props.fixtures

  fixtures = filterBySearchString(fixtures)

  return fixtures
})

function filterBySearchString(fixtures: Fixture[]) {
  if (!props.filters.searchString) return fixtures

  const searchString = props.filters.searchString.toLowerCase().trim()

  return fixtures.filter((f) => {
    return f.homeTeam.name.toLowerCase().includes(searchString)
      || f.awayTeam.name.toLowerCase().includes(searchString)
      || f.league.toLowerCase().includes(searchString)
  })
}
</script>

<template>
  <div>
    <div
      v-if="filteredFixtures.length"
      class="glass-card rounded-2xl p-4 flex flex-col gap-3 h-full"
    >
      <div class="flex gap-3 items-center justify-between mx-1">
        <p class="text-sm">
          {{ filteredFixtures.length }} jogo{{ filteredFixtures.length === 1 ? '' : 's' }}
        </p>

        <div class="flex gap-1.5 items-center">
          <div class="bg-primary-500/30 h-3 w-4 rounded-xs" />

          <small class="text-white/90 text-xs mt-0.5">
            Favorito
          </small>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <FixtureCard
          v-for="(fixture, index) in filteredFixtures"
          :key="index"
          :fixture="fixture"
          @item-click="emit('item-click', $event)"
        />
      </div>
    </div>

    <div
      v-else
      class="glass-card rounded-2xl px-4 py-6 flex items-center justify-center h-max text-sm font-light text-white/60 italic"
    >
      Nenhum jogo encontrado
    </div>
  </div>
</template>

<style scoped>

</style>
