<script setup lang="ts">
import type { Fixture } from '~/types'

defineProps<{
  fixture: Fixture
  formattedGameTime: string
  gameHasResults: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-4 items-center w-full">
    <div class="flex gap-1 items-center text-xs text-white/50">
      <span>{{ formattedGameTime }}</span>
      -
      <span>{{ fixture.league }}</span>
    </div>

    <div class="flex gap-2 items-center justify-center text-lg w-full text-white/90 font-light">
      <div class="flex gap-3 items-center justify-end w-1/3">
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

      <div class="flex gap-3 items-center justify-start w-1/3">
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

    <span class="text-xs text-white/50 -mt-2">
      <span class="mr-0.5">HT:</span>

      {{ fixture.scoreHomeHt }} - {{ fixture.scoreAwayHt }}
    </span>
  </div>
</template>
