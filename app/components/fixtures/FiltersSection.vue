<script setup lang="ts">
export interface Filters {
  searchString?: string
  timeRange: [number, number]
  withBetsOnly: boolean
}

const filters = defineModel<Filters>({
  default: () => ({
    searchString: '',
    timeRange: [0, 24],
    withBetsOnly: false
  })
})

const expandFilters = ref(false)

watch(expandFilters, (open) => {
  if (!open) {
    filters.value.timeRange = [0, 24]
    filters.value.withBetsOnly = false
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-3">
    <div class="w-full flex gap-2 items-center justify-between">
      <UInput
        v-model="filters.searchString"
        placeholder="Buscar por time ou liga..."
        class="flex-1"
        :ui="{ base: 'rounded-lg bg-white/5 backdrop-blur-sm' }"
      />

      <UButton
        class="w-28 justify-center cursor-pointer"
        variant="soft"
        color="secondary"
        @click="expandFilters = !expandFilters"
      >
        {{ expandFilters ? 'Fechar' : 'Mais filtros' }}
      </UButton>
    </div>

    <Transition name="slide">
      <div
        v-if="expandFilters"
        class="flex flex-col gap-7 mb-2"
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

        <USwitch
          v-model="filters.withBetsOnly"
          label="Apenas com apostas"
        />
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
