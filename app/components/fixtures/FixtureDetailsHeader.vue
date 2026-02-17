<script setup lang="ts">
import type { Fixture } from '~/types'

const props = defineProps<{
  fixture: Fixture
  gameHasResults: boolean
}>()

const formattedGameTime = computed(() => {
  const date = new Date(props.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
})

const formattedGameDate = computed(() => {
  const date = new Date(props.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
})
</script>

<template>
  <div class="flex flex-col gap-6 items-center w-full">
    <div class="flex flex-col gap-1 items-center">
      <div class="flex gap-1 items-center text-xs text-white/50">
        <span class="shrink-0">{{ formattedGameDate }}, {{ formattedGameTime }}</span>
        -
        <span class="truncate">{{ fixture.league }}</span>
      </div>

      <FlashscoreButton :flashscore-id="fixture.flashscoreId" class="w-max" />
    </div>

    <div class="flex gap-2 items-center justify-center text-lg w-full text-white/90 font-light">
      <div class="flex gap-3 items-center justify-end w-3/5">
        <p class="text-right leading-5">
          {{ fixture.homeTeam.name }}
        </p>

        <span
          v-if="gameHasResults"
          class="mx-1 font-semibold text-white text-xl"
        >
          {{ fixture.scoreHomeFt }}
        </span>
      </div>

      <span class="text-base text-neutral-500 font-normal">
        vs
      </span>

      <div class="flex gap-3 items-center justify-start w-3/5">
        <span
          v-if="gameHasResults"
          class="mx-1 font-semibold text-white text-xl"
        >
          {{ fixture.scoreAwayFt }}
        </span>

        <p class="text-left leading-5">
          {{ fixture.awayTeam.name }}
        </p>
      </div>
    </div>

    <span
      v-if="gameHasResults"
      class="text-xs text-white/50 -mt-2"
    >
      <span class="mr-0.5">HT:</span>

      {{ fixture.scoreHomeHt }} - {{ fixture.scoreAwayHt }}
    </span>
  </div>
</template>
