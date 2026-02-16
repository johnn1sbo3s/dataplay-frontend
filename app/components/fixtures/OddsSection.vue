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
  <div class="flex flex-col gap-6 w-full">
    <USeparator
      label="Odds"
      color="neutral"
      :ui="{ label: 'text-xs text-white/80' }"
    />

    <div class="flex gap-x-12 gap-y-8 items-center justify-center w-full flex-wrap">
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
