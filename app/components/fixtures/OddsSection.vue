<script setup lang="ts">
interface Odd {
  label: string
  value: number
}

defineProps<{
  matchOdds: Odd[]
  closingOdds: Odd[]
  totalOdds: Odd[]
  bttsOdds: Odd[]
  gameHasResults: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <USeparator
      label="Odds"
      color="neutral"
      :ui="{ label: 'text-xs text-white/80' }"
    />

    <div class="flex gap-4 items-center justify-around w-full">
      <FixturesOddsBlock
        label="Match Odds"
        info-text="Odds coletadas na noite anterior ao jogo."
        :odds="matchOdds"
      />

      <FixturesOddsBlock
        v-if="gameHasResults"
        label="MO Closing Odds"
        :odds="closingOdds"
      />
    </div>

    <div class="flex gap-4 items-center justify-around w-full">
      <FixturesOddsBlock
        label="O/U 2.5"
        :odds="totalOdds"
      />

      <FixturesOddsBlock
        label="BTTS"
        :odds="bttsOdds"
      />
    </div>
  </div>
</template>
