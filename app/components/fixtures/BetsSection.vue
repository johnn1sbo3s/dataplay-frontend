<script setup lang="ts">
import type { Bet } from '~/types'

defineProps<{
  bets: Bet[]
}>()
</script>

<template>
  <div class="flex flex-col gap-6 w-full items-center">
    <USeparator
      label="Apostas"
      color="neutral"
      :ui="{ label: 'text-xs text-white/80' }"
    />

    <div class="flex flex-col gap-2 w-full">
      <div
        v-for="bet in bets"
        :key="bet.modelName"
        class="flex gap-3 text-white/90 text-sm w-full items-center"
      >
        <span>
          {{ snakeToTitleCase(bet.modelName) }}

          <span class="text-white/60 ml-1">
            @{{ (bet.betOdds).toFixed(2) }}
          </span>
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
    </div>
  </div>
</template>
