<script setup lang="ts">
import { DateTime } from 'luxon'

interface BetModelOption {
  value: number
  label: string
  name: string
}

const selectedBetModel = ref<BetModelOption | undefined>(undefined)
const selectedDateRange = ref('all')
const initialDate = ref(DateTime.now().minus({ years: 10 }).toFormat('yyyy-MM-dd'))
const finalDate = ref(DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'))

const selectedBetModelName = computed(() => selectedBetModel.value?.name)
const metricsPayload = computed(() => ({
  initialDate: initialDate.value,
  finalDate: finalDate.value
}))

const { data: betModelsData, isLoading: isLoadingBetModels } = useBetModels()
const {
  data: metricsData,
  isLoading: isLoadingMetrics
} = useMetricsByModel(selectedBetModelName, metricsPayload)

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

function handleDateRangeChange(rangeValue: string) {
  const now = DateTime.now().minus({ days: 1 })

  switch (rangeValue) {
    case 'all':
      initialDate.value = now.minus({ years: 10 }).toFormat('yyyy-MM-dd')
      finalDate.value = now.toFormat('yyyy-MM-dd')
      break
    case '30d':
      initialDate.value = now.minus({ days: 30 }).toFormat('yyyy-MM-dd')
      finalDate.value = now.toFormat('yyyy-MM-dd')
      break
    case '15d':
      initialDate.value = now.minus({ days: 15 }).toFormat('yyyy-MM-dd')
      finalDate.value = now.toFormat('yyyy-MM-dd')
      break
  }
}
</script>

<template>
  <div class="flex flex-col sm:gap-4">
    <PageHeader
      title="Modelos"
      description="Visualize as saídas dos modelos preditivos para cada dia, além de resultados históricos."
    />

    <main class="flex flex-col gap-4">
      <USelectMenu
        v-model="selectedBetModel"
        placeholder="Selecione um modelo..."
        class="w-full sm:w-1/2 lg:w-1/3"
        :items="betModelsOptions"
        :loading="isLoadingBetModels"
        :ui="{
          base: 'glass-panel rounded-xl',
          content: 'glass-panel rounded-xl',
          item: 'hover:bg-primary/20 rounded-md'
        }"
      />

      <USeparator
        v-if="selectedBetModel "
        class="my-2 block lg:hidden"
      />

      <BetModelsDefaultMetricsSection
        v-if="selectedBetModel || isLoadingMetrics"
        :loading="isLoadingMetrics"
        :selected-date-range="selectedDateRange"
        :metrics-data="metricsData?.metrics"
        @update:selected-date-range="handleDateRangeChange"
      />
    </main>
  </div>
</template>
