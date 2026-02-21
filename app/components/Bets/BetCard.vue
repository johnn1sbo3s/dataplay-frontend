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
  <div class="bet-card px-4 py-3 rounded-xl bg-white/5 border border-white/5 overflow-hidden">
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

          <span class="text-white/60 -ml-1">
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
