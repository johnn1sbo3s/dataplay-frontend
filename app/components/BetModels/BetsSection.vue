<script setup lang="ts">
import type { MetricsByModelResponse } from '~/types'

defineProps<{
  metricsData?: MetricsByModelResponse
  loading: boolean
}>()
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <USkeleton
        v-for="i in 4"
        :key="i"
        class="h-[100px]"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <BetModelsMetricCard
        icon="i-lucide-dollar-sign"
        title="Lucro total"
        type="currency"
        :value="metricsData?.totalProfit"
      />

      <BetModelsMetricCard
        :icon="(metricsData?.yield || 0) >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
        title="ROI"
        type="percentage"
        :value="(metricsData?.yield || 0) * 100"
      />

      <BetModelsMetricCard
        icon="i-lucide-check"
        title="Win Rate"
        type="percentage"
        :value="(metricsData?.winRate || 0) * 100"
        neutral-icon-color
      />

      <BetModelsMetricCard
        icon="i-lucide-chart-pie"
        title="Apostas"
        :value="metricsData?.totalBets"
        neutral-icon-color
        no-decimal
      />
    </div>
  </div>
</template>
