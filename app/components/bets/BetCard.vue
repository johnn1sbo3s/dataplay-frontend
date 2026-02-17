<script setup lang="ts">
import type { Bet } from '~/types'
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

const props = defineProps<{
  bet: Bet
}>()

const formattedGameTime = computed(() => {
  const date = new Date(props.bet.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
})
</script>

<template>
  <div class="bet-card px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden">
    <div class="flex flex-col items-start gap-3">
      <div class="flex flex-col items-start gap-1 text-xs text-gray-400">
        <span class="font-semibold">
          {{ formattedGameTime }}

          - {{ bet.fixture.homeTeam.name }} x {{ bet.fixture.awayTeam.name }}
        </span>

        <p class="text-white/40">
          {{ bet.fixture.league }}
        </p>
      </div>

      <div class="flex items-center gap-2 justify-between w-full">
        <div class="flex items-center gap-2 text-white/90 flex-wrap">
          <span>{{ snakeToTitleCase(bet.modelName) }}</span>

          <span class="text-white/60">
            @{{ (bet.betOdds).toFixed(2) }}
          </span>

          <UBadge
            v-if="bet.outcome"
            class="w-fit lowercase"
            variant="outline"
            :color="bet.outcome === 'WIN' ? 'primary' : 'error'"
          >
            {{ bet.outcome }}
          </UBadge>
        </div>

        <FlashscoreButton
          :flashscore-id="bet.fixture.flashscoreId"
          :minimal="!isDesktop"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bet-card {
  box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .bet-card:hover {
    box-shadow: 0 0 20px 0 rgba(34, 211, 238, 0.2);
  }
}

@media (hover: none) and (pointer: coarse) {
  .bet-card:hover {
    box-shadow: none;
  }
}
</style>
