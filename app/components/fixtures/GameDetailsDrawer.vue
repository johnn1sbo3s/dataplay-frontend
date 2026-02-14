<script setup lang="ts">
import type { Fixture } from '~/types'

const props = defineProps<{
  fixture: Fixture | null
  open: boolean
}>()

const formattedGameTime = computed(() => {
  if (!props.fixture) return ''

  const date = new Date(props.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
})
</script>

<template>
  <UDrawer
    v-if="fixture"
    :open="open"
  >
    <template #content>
      <div class="flex flex-col gap-5 items-center p-8 w-full">
        <header class="flex flex-col gap-4 items-center w-full">
          <div class="flex gap-1 items-center text-sm font-light text-white/50">
            <span>{{ formattedGameTime }}</span>
            -
            <span>{{ fixture.league }}</span>
          </div>

          <div class="flex gap-5 items-center justify-center text-xl w-full font-semibold">
            <span class="w-full text-right">
              {{ fixture.homeTeam.name }}
            </span>

            <span class="text-base text-neutral-500 font-normal">
              vs
            </span>

            <span class="w-full text-left">
              {{ fixture.awayTeam.name }}
            </span>
          </div>
        </header>
      </div>
    </template>
  </UDrawer>
</template>
