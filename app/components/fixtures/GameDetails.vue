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
  <div
    v-if="fixture"
    class="flex flex-col gap-6 items-center p-8 w-full"
  >
    <header class="flex flex-col gap-3 items-center w-full">
      <div class="flex gap-1 items-center text-xs text-white/50">
        <span>{{ formattedGameTime }}</span>
        -
        <span>{{ fixture.league }}</span>
      </div>

      <div class="flex gap-2 items-center justify-center text-xl w-full text-white/90">
        <span class="w-full text-right">
          {{ fixture.homeTeam.name }}

          <span
            v-if="gameHasResults"
            class="mx-1 font-semibold text-white"
          >
            {{ fixture.scoreHomeFt }}
          </span>
        </span>

        <span class="text-base text-neutral-500 font-normal">
          vs
        </span>

        <span class="w-full text-left">
          <span
            v-if="gameHasResults"
            class="mx-1 font-semibold text-white"
          >
            {{ fixture.scoreAwayFt }}
          </span>

          {{ fixture.awayTeam.name }}
        </span>
      </div>

      <span class="text-xs text-white/50 -mt-2">
        <span class="mr-0.5">HT:</span>

        {{ fixture.scoreHomeHt }} - {{ fixture.scoreAwayHt }}
      </span>
    </header>

    <div class="w-full h-px bg-primary-900/40" />

    <main class="flex flex-col gap-8 items-center w-full">
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
    </main>
  </div>
</template>
