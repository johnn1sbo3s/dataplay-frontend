<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'
import { breakpointsTailwind } from '@vueuse/core'
import type { Fixture } from '~/types'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

const selectedDate = shallowRef(iToday(getLocalTimeZone()))
const selectedFixture = ref<Fixture | null>(null)
const openDetails = ref(false)

const formattedDate = computed(() => selectedDate.value.toString())

const { data: fixturesData, isLoading: isLoadingFixtures } = useFixtures(formattedDate)

const fixtures = computed<Fixture[]>(() => {
  return fixturesData.value?.fixtures || []
})

function handleDateChange(date: CalendarDate) {
  selectedDate.value = date
}

function handleFixtureClick(fixture: Fixture) {
  selectedFixture.value = fixture
  openDetails.value = true
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
      v-if="isLoadingFixtures"
      class="w-full h-[70vh] flex items-center justify-center gap-1"
    >
      <LoadingAnimation />
    </div>

    <div
      v-else-if="!fixtures.length"
      class="flex flex-col items-center justify-center"
    >
      <FixturesEmptyState
        title="Nenhum jogo encontrado"
        description="Tente selecionar outra data"
      />
    </div>

    <div
      v-else
      class="lg:grid lg:grid-cols-2 lg:gap-3 mt-5"
    >
      <FixturesList
        :fixtures="fixtures"
        @item-click="handleFixtureClick"
      />

      <div
        v-if="isDesktop"
        class="p-5 glass-card rounded-2xl flex flex-col gap-3 h-full"
      >
        <pre>
          {{ selectedFixture }}
        </pre>
      </div>

      <FixturesGameDetailsDrawer
        v-else
        :open="openDetails"
        :fixture="selectedFixture"
        @close="openDetails = false"
      />
    </div>
  </div>
</template>
