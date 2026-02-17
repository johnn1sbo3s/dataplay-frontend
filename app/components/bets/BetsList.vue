<script setup lang="ts">
import type { Bet } from '~/types'
import type { Filters } from './FiltersSection.vue'
import BetCard from './BetCard.vue'

const props = defineProps<{
  bets: Bet[]
  filters: Filters
}>()

const filteredBets = computed(() => {
  let bets = props.bets

  bets = filterByBetModels(bets)

  return bets
})

function filterByBetModels(bets: Bet[]) {
  if (props.filters.betModels.length === 0) return bets

  const models = props.filters.betModels.map(model => parseInt(model.value))

  return bets.filter((bet) => {
    return models.includes(bet.model.id)
  })
}
</script>

<template>
  <div>
    <div
      v-if="filteredBets.length"
      class="glass-card rounded-2xl p-4 flex flex-col gap-3 h-max"
    >
      <div class="flex gap-3 items-center justify-between mx-1">
        <p class="text-sm">
          {{ filteredBets.length }} aposta{{ filteredBets.length === 1 ? '' : 's' }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <BetCard
          v-for="bet in filteredBets"
          :key="bet.id"
          :bet="bet"
        />
      </div>
    </div>

    <div
      v-else
      class="glass-card rounded-2xl px-4 py-6 flex items-center justify-center h-max text-sm font-light text-white/60 italic"
    >
      Nenhuma aposta encontrada
    </div>
  </div>
</template>
