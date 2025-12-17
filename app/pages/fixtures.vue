<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'
import type { Fixture } from '~/types'

const selectedDate = shallowRef(iToday(getLocalTimeZone()))

const formattedDate = computed(() => selectedDate.value.toString())

const { data: fixturesData, isLoading: isLoadingFixtures } = useFixtures(formattedDate)

const fixtures = computed<Fixture[]>(() => {
  return fixturesData.value?.fixtures || []
})

function handleDateChange(date: CalendarDate) {
  selectedDate.value = date
}
</script>

<template>
  <div class="h-full w-full flex flex-col gap-2">
    <PageHeader
      title="Jogos"
      description="Visualize confrontos, resultados e estatísticas para decisões mais inteligentes."
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

    <div
      v-if="!fixtures.length"
      class="flex flex-col items-center justify-center"
    >
      <FixturesEmptyState />
    </div>

    <div
      v-else
      class="lg:grid lg:grid-cols-2 lg:gap-3 mt-5"
    >
      <FixturesList :fixtures="fixtures" />

      <div class="hidden lg:block">
        Parte 2
      </div>
    </div>
  </div>
</template>
