<script setup lang="ts">
import type { Bet } from '~/types'

defineProps<{
  bets: Bet[]
}>()

function snakeToTitleCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
</script>

<template>
  <div class="flex flex-col gap-6 w-full items-center">
    <USeparator
      label="Apostas"
      color="neutral"
      :ui="{ label: 'text-xs text-white/80' }"
    />

    <div class="flex flex-col gap-3 w-full">
      <div
        v-for="bet in bets"
        :key="bet.modelName"
        class="flex gap-2 text-white/90 text-sm mb-1"
      >
        <span>
          {{ snakeToTitleCase(bet.modelName) }}

          <span class="text-white/70 ml-1">
            @{{ (bet.betOdds).toFixed(2) }}
          </span>

        </span>

        <UBadge
          v-if="bet.outcome"
          class="w-fit lowercase"
          variant="soft"
          :color="bet.outcome === 'WIN' ? 'primary' : 'error'"
        >
          {{ bet.outcome }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
