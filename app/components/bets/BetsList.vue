<script setup lang="ts">
import type { Bet } from '~/types'
import BetCard from './BetCard.vue'

defineProps<{
  bets: Bet[]
}>()
</script>

<template>
  <div>
    <div
      v-if="bets.length"
      class="glass-card rounded-2xl p-4 flex flex-col gap-3 h-max"
    >
      <div class="flex gap-3 items-center justify-between mx-1">
        <p class="text-sm">
          {{ bets.length }} aposta{{ bets.length === 1 ? '' : 's' }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <BetCard
          v-for="bet in bets"
          :key="bet.id"
          :bet="bet"
        />
      </div>
    </div>
  </div>
</template>
