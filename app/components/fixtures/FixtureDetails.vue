<script setup lang="ts">
import type { Fixture } from '~/types'

const props = defineProps<{
  fixture: Fixture
}>()

const gameHasResults = computed<boolean>(() => {
  return props.fixture.scoreHomeFt != null && props.fixture.scoreAwayHt != null
})

const formattedGameTime = computed(() => {
  const date = new Date(props.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
})

const matchOdds = computed(() => {
  return [
    {
      label: 'Home',
      value: props.fixture.odds[0]?.homeOdds ?? 0
    },
    {
      label: 'Draw',
      value: props.fixture.odds[0]?.drawOdds ?? 0
    },
    {
      label: 'Away',
      value: props.fixture.odds[0]?.awayOdds ?? 0
    }
  ]
})

const closingOdds = computed(() => {
  return [
    {
      label: 'Home',
      value: props.fixture.odds[0]?.homeClosingOdds ?? 0
    },
    {
      label: 'Draw',
      value: props.fixture.odds[0]?.drawClosingOdds ?? 0
    },
    {
      label: 'Away',
      value: props.fixture.odds[0]?.awayClosingOdds ?? 0
    }
  ]
})

const totalOdds = computed(() => {
  return [
    {
      label: 'Under',
      value: props.fixture.odds[0]?.under25Odds ?? 0
    },
    {
      label: 'Over',
      value: props.fixture.odds[0]?.over25Odds ?? 0
    }
  ]
})

const bttsOdds = computed(() => {
  return [
    {
      label: 'Yes',
      value: props.fixture.odds[0]?.bttsYesOdds ?? 0
    },
    {
      label: 'No',
      value: props.fixture.odds[0]?.bttsNoOdds ?? 0
    }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-6 items-center p-5 w-full">
    <FixturesFixtureDetailsHeader
      :fixture="fixture"
      :game-has-results="gameHasResults"
      :formatted-game-time="formattedGameTime"
    />

    <FixturesOddsSection
      :match-odds="matchOdds"
      :closing-odds="closingOdds"
      :total-odds="totalOdds"
      :btts-odds="bttsOdds"
      :game-has-results="gameHasResults"
    />

    <FixturesBetsSection
      v-if="fixture.bets.length > 0"
      :bets="fixture.bets"
    />
  </div>
</template>
