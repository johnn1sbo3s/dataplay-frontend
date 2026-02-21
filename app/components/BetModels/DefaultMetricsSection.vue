<script setup lang="ts">
import type { MetricsByModelResponse } from '~/types'
import { breakpointsTailwind } from '@vueuse/core'

interface AreaChartItem {
  betNumber: number
  cumulativeProfit: number
}

defineOptions({
  tags: ['areacharts', 'catmullRom']
})

const breakpoints = useBreakpoints(breakpointsTailwind)

const props = defineProps<{
  selectedDateRange: string
  loading: boolean
  metricsData?: MetricsByModelResponse
}>()

const emit = defineEmits(['update:selectedDateRange'])

const categories = {
  cumulativeProfit: {
    name: 'Lucro Acumulado',
    color: '#00bc7d'
  }
}

const internalSelectedDateRange = ref<string>(props.selectedDateRange)

const height = computed(() => {
  return breakpoints.greaterOrEqual('lg').value ? 400 : 250
})

const areaChartData = computed<AreaChartItem[]>(() => {
  if (!props.metricsData) return []

  return props.metricsData?.chartData.map((bet) => {
    return {
      betNumber: bet.betNumber,
      cumulativeProfit: bet.cumulativeProfit
    }
  })
})

watch(() => props.selectedDateRange, (value) => {
  internalSelectedDateRange.value = value
})

watch(internalSelectedDateRange, (value) => {
  emit('update:selectedDateRange', value)
})
</script>

<template>
  <div class="glass-panel p-3 rounded-2xl flex flex-col gap-3">
    <BetModelsFiltersSection
      v-model="internalSelectedDateRange"
      class="mb-2 w-full md:w-1/3"
    />

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <BetModelsMetricCard
        icon="i-lucide-dollar-sign"
        title="Lucro total"
        type="currency"
        :loading="loading"
        :value="metricsData?.totalProfit"
      />

      <BetModelsMetricCard
        :icon="(metricsData?.yield || 0) >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
        title="ROI"
        type="percentage"
        :loading="loading"
        :value="(metricsData?.yield || 0) * 100"
      />

      <BetModelsMetricCard
        icon="i-lucide-check"
        title="Win Rate"
        type="percentage"
        :loading="loading"
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

    <div class="flex flex-col lg:grid lg:grid-cols-4 gap-5 glass-panel p-2 rounded-2xl">
      <div class="col-span-3">
        <AreaChart
          :data="areaChartData"
          :height="height"
          :categories="categories"
          :y-label="'Lucro'"
          :gradient-stops="[{
            offset: '0.4',
            stopOpacity: 0.3
          }]"
        />
      </div>

      <div class="grid grid-cols-2 lg:flex lg:flex-col gap-2">
        <BetModelsMetricCard
          title="Desvio padrão"
          type="currency"
          :loading="loading"
          :value="metricsData?.stdDev"
          no-icon
        />

        <BetModelsMetricCard
          title="Max Drawdown"
          type="currency"
          :loading="loading"
          :value="metricsData?.maxDrawdown"
          no-icon
        />

        <BetModelsMetricCard
          title="Média de Odds"
          :loading="loading"
          :value="metricsData?.avgOdds"
          no-icon
        />

        <BetModelsMetricCard
          title="Sharpe Ratio"
          :loading="loading"
          :value="metricsData?.sharpeRatio"
          no-icon
        />
      </div>
    </div>
  </div>
</template>
