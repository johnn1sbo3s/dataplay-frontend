<script setup lang="ts">
import type { Bet } from '~/types'

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

      <div class="flex items-center gap-2 font-semibold text-white/90">
        {{ snakeToTitleCase(bet.modelName) }}

        <span class="font-light text-white/60">
          @{{ (bet.betOdds).toFixed(2) }}
        </span>
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
