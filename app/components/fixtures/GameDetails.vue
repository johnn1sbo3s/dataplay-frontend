<script setup lang="ts">
import type { Fixture } from '~/types'

const props = defineProps<{
  fixture: Fixture
}>()

const gameHasResults = computed<boolean>(() => {
  if (!props.fixture.scoreHomeFt && !props.fixture.scoreAwayHt) return false

  return true
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
    </header>

    <div class="w-full h-px bg-primary-900/40" />

    <main class="flex flex-col gap-4 items-center w-full">
      <div class="flex gap-4 items-center justify-around w-full">
        <FixturesOddsBlock
          label="Match Odds"
          info-text="Odds coletadas na noite anterior ao jogo."
          :odds="matchOdds"
        />

        <FixturesOddsBlock
          v-if="gameHasResults"
          label="Closing Odds"
          :odds="closingOdds"
        />
      </div>
    </main>
  </div>
</template>
