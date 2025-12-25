<script setup lang="ts">
import { ref } from 'vue'
import type { Fixture } from '~/types'

const props = defineProps<{
  fixture: Fixture
}>()

const lightStyle = ref({})

const formattedGameTime = computed(() => {
  const date = new Date(props.fixture.date)

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
})

const gameHasResults = computed(() => {
  const fixture = props.fixture

  return fixture.scoreHomeFt || fixture.scoreAwayHt
})

const victoriousTeam = computed(() => {
  if (props.fixture.scoreHomeFt == null || props.fixture.scoreAwayFt == null) return null

  if (props.fixture.scoreHomeFt > props.fixture.scoreAwayFt) {
    return 'home'
  }

  return 'away'
})

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  lightStyle.value = {
    background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.10), transparent 60%)`
  }
}

const handleMouseLeave = () => {
  lightStyle.value = {}
}
</script>

<template>
  <div
    class="fixture-card px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :style="lightStyle"
    />

    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

    <div class="relative z-10">
      <div class="text-xs text-gray-400 mb-3">
        {{ fixture.league }}
      </div>

      <div class="flex gap-4 items-center">
        <FixturesGameTimeBadge :time="formattedGameTime" />

        <div class="h-10 w-px bg-slate-900/40" />

        <div
          v-if="gameHasResults"
          class="flex gap-2"
        >
          <UTooltip text="Resultado intervalo">
            <div class="flex flex-col w-3 gap-1 items-center text-neutral-500">
              <p>{{ fixture.scoreHomeHt }}</p>
              <p>{{ fixture.scoreAwayHt }}</p>
            </div>
          </UTooltip>

          <div class="flex flex-col w-3 gap-1 items-center group-hover:text-primary transition-colors">
            <p>{{ fixture.scoreHomeFt }}</p>
            <p>{{ fixture.scoreAwayFt }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex justify-between items-center">
            <p
              class="group-hover:text-primary transition-colors"
              :class="{ 'font-semibold': victoriousTeam === 'home' }"
            >
              {{ fixture.homeTeam.name }}
            </p>
          </div>

          <div class="flex justify-between items-center">
            <p
              class="group-hover:text-primary transition-colors"
              :class="{ 'font-semibold': victoriousTeam === 'away' }"
            >
              {{ fixture.awayTeam.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixture-card {
  box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.fixture-card:hover {
  box-shadow: 0 0 20px 0 rgba(34, 211, 238, 0.2);
}
</style>
