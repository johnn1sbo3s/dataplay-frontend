<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'
import type { Fixture } from '~/types'

const selectedDate = shallowRef(iToday(getLocalTimeZone()))

const formattedDate = computed(() => selectedDate.value.toString())

const { data: fixturesData } = useFixtures(formattedDate)

const fixtures = computed<Fixture[]>(() => {
  return fixturesData.value?.fixtures || []
})

function handleDateChange(date: CalendarDate) {
  console.log('data mudou. Chegou: ', date)
  selectedDate.value = date
}
</script>

<template>
  <div class="h-full w-full flex flex-col gap-5">
    <PageHeader
      title="Jogos"
      description="Visualize confrontos, resultados e estatísticas para decisões mais inteligentes."
    >
      <template #right>
        <div class="w-full flex justify-center sm:justify-end">
          <DatePicker
            :selected-date="selectedDate"
            @date-changed="handleDateChange"
          />
        </div>
      </template>
    </PageHeader>

    <FixturesList :fixtures="fixtures" />
  </div>
</template>
