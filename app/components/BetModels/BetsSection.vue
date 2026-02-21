<script setup lang="ts">
import type { MetricsByModelResponse } from '~/types'

const props = defineProps<{
  selectedDateRange: string
  loading: boolean
  metricsData?: MetricsByModelResponse
}>()

const emit = defineEmits(['update:selectedDateRange'])

const internalSelectedDateRange = ref<string>(props.selectedDateRange)

watch(() => props.selectedDateRange, (value) => {
  internalSelectedDateRange.value = value
})

watch(internalSelectedDateRange, (value) => {
  emit('update:selectedDateRange', value)
})
</script>

<template>
  <div class="glass-panel p-3 rounded-2xl flex flex-col gap-4">
    <BetModelsFiltersSection v-model="internalSelectedDateRange" />

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <BetModelsMetricCard
        icon="i-lucide-dollar-sign"
        title="Lucro total"
        :loading="loading"
        type="currency"
        :value="metricsData?.totalProfit"
      />

      <BetModelsMetricCard
        :icon="(metricsData?.yield || 0) >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
        title="ROI"
        :loading="loading"
        type="percentage"
        :value="(metricsData?.yield || 0) * 100"
      />

      <BetModelsMetricCard
        icon="i-lucide-check"
        title="Win Rate"
        :loading="loading"
        type="percentage"
        :value="(metricsData?.winRate || 0) * 100"
        neutral-icon-color
      />

      <BetModelsMetricCard
        icon="i-lucide-chart-pie"
        title="Apostas"
        :loading="loading"
        :value="metricsData?.totalBets"
        neutral-icon-color
        no-decimal
      />
    </div>
  </div>
</template>
