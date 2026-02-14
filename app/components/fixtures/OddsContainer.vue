<script setup lang="ts">
import type { Odds } from '~/types'

const props = defineProps<{
  odds: Odds | undefined
  gameHasResults: boolean
}>()

const resolvedOdds = computed(() => {
  if (!props.odds) return null

  if (props.gameHasResults) {
    return {
      home: props.odds.homeClosingOdds,
      draw: props.odds.drawClosingOdds,
      away: props.odds.awayClosingOdds
    }
  }

  return {
    home: props.odds.homeOdds,
    draw: props.odds.drawOdds,
    away: props.odds.awayOdds
  }
})

const favouriteTeam = computed(() => {
  if (!resolvedOdds.value?.home || !resolvedOdds.value?.away) return null

  if (resolvedOdds.value?.home > resolvedOdds.value?.away) return 'away'
  return 'home'
})
</script>

<template>
  <div
    v-if="resolvedOdds"
    class="flex gap-1 items-center"
  >
    <div class="flex flex-col items-center gap-0.5">
      <small class="text-xs text-white/50">H</small>

      <UBadge
        variant="soft"
        :color="favouriteTeam === 'home' ? 'primary' : 'neutral'"
      >
        {{ (resolvedOdds.home)?.toFixed(2) }}
      </UBadge>
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <small class="text-xs text-white/50">D</small>

      <UBadge
        variant="soft"
        color="neutral"
      >
        {{ resolvedOdds.draw?.toFixed(2) }}
      </UBadge>
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <small class="text-xs text-white/50">A</small>

      <UBadge
        variant="soft"
        :color="favouriteTeam === 'away' ? 'primary' : 'neutral'"
      >
        {{ resolvedOdds.away?.toFixed(2) }}
      </UBadge>
    </div>
  </div>
</template>
