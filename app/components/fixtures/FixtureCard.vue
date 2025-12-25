<script setup lang="ts">
import { ref } from 'vue'
import type { Fixture } from '~/types'

defineProps<{
  fixture: Fixture
}>()

const lightStyle = ref({})

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
    class="fixture-card p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :style="lightStyle"
    />

    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

    <div class="relative z-10">
      <div class="flex justify-between items-start mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold bg-primary text-black px-2 py-0.5 rounded">
            EV+
          </span>

          <span class="text-xs text-gray-400">
            Futebol • Brasileirão
          </span>
        </div>

        <span class="text-xs text-primary font-mono">19:30</span>
      </div>

      <h4 class="text-white font-medium mb-1 group-hover:text-primary transition-colors">
        {{ fixture.homeTeam.name }} vs {{ fixture.awayTeam.name }}
      </h4>

      <div class="flex justify-between items-end">
        <div class="text-sm text-gray-400">
          Prob: <span class="text-white">65%</span>
        </div>

        <div class="text-sm font-bold text-primary">
          ODD @ 1.95
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
