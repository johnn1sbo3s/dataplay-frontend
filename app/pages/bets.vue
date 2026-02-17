<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { Bet } from '~/types'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'

const selectedDate = shallowRef(iToday(getLocalTimeZone()))
const formattedDate = computed(() => selectedDate.value.toString())

const payload = computed(() => {
  return {
    date: formattedDate.value
  }
})

const { data: betsData, isLoading: isLoadingFixtures } = useBets(payload)

const bets = computed<Bet[]>(() => {
  return betsData.value?.bets || []
})

function handleDateChange(date: CalendarDate) {
  selectedDate.value = date
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageHeader
      title="Apostas"
      description="Visualize as saídas dos modelos preditivos para cada dia."
    >
      <template #right>
        <div class="w-full flex justify-center sm:justify-end">
          <DatePicker
            :selected-date="selectedDate"
            :loading="isLoadingFixtures"
            @date-changed="handleDateChange"
          />
        </div>
      </template>
    </PageHeader>

    <BetsList :bets="bets" />
  </div>
</template>
