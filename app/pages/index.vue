<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})

const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #body>
      <SecondaryNavbar remove-toolbar />

      <div class="pt-14 flex flex-col gap-4">
        <HomeStats :period="period" :range="range" />
        <HomeChart :period="period" :range="range" />
        <HomeSales :period="period" :range="range" />
      </div>
    </template>
  </UDashboardPanel>
</template>
