<script setup lang="ts">
export interface Filters {
  searchString?: string
  timeRange: [number, number]
  oddsRange?: [0, 1000]
}

const filters = defineModel<Filters>({
  default: () => ({
    searchString: '',
    timeRange: [0, 24],
    oddsRange: [0, 1000]
  })
})

const expandFilters = ref(false)

watch(expandFilters, (open) => {
  if (!open) {
    filters.value.timeRange = [0, 24]
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-3 mb-1">
    <div class="w-full flex gap-2 items-center justify-between">
      <UInput
        v-model="filters.searchString"
        placeholder="Buscar por time ou liga..."
        class="flex-1"
        :ui="{ base: 'rounded-lg bg-white/5 backdrop-blur-sm' }"
      />

      <UButton
        variant="soft"
        color="secondary"
        @click="expandFilters = !expandFilters"
      >
        Mais filtros
      </UButton>
    </div>

    <Transition name="slide">
      <div
        v-if="expandFilters"
        class="flex flex-col gap-3 mb-3"
      >
        <div class="flex flex-col gap-3">
          <p class="text-sm">
            Horário de início: {{ filters.timeRange[0] }}h - {{ filters.timeRange[1] }}h
          </p>

          <USlider
            v-model="filters.timeRange"
            :min="0"
            :max="24"
            :step="1"
            :ui="{
              root: 'glass-input rounded-lg',
              track: 'bg-white/10'
            }"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
