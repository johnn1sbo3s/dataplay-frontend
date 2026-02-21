<script setup lang="ts">
interface BetModelOption {
  value: number
  label: string
  name: string
}

const selectedBetModel = ref<BetModelOption | undefined>(undefined)

const selectedBetModelName = computed(() => selectedBetModel.value?.name)

const { data: betModelsData, isLoading: isLoadingBetModels } = useBetModels()
const {
  data: metricsData,
  isLoading: isLoadingMetrics
} = useMetricsByModel(selectedBetModelName)

const betModelsOptions = computed(() => {
  if (!betModelsData.value?.betModels) {
    return []
  }

  return betModelsData.value.betModels
    .filter(model => model.isActive)
    .map((m) => {
      return {
        value: m.id,
        label: snakeToTitleCase(m.name),
        name: m.name
      }
    })
})
</script>

<template>
  <div class="flex flex-col sm:gap-4">
    <PageHeader
      title="Modelos"
      description="Visualize as saídas dos modelos preditivos para cada dia, além de resultados históricos."
    />

    <main class="flex flex-col gap-6">
      <USelectMenu
        v-model="selectedBetModel"
        placeholder="Selecione um modelo..."
        class="w-full sm:w-1/2 lg:w-1/3"
        :items="betModelsOptions"
        :loading="isLoadingBetModels"
        :ui="{
          base: 'glass-panel rounded-lg',
          content: 'glass-panel rounded-lg',
          item: 'hover:bg-primary/20 rounded-md'
        }"
      />

      <BetModelsBetsSection
        v-if="selectedBetModel"
        :metrics-data="metricsData?.metrics"
        :loading="isLoadingMetrics"
      />
    </main>
  </div>
</template>
