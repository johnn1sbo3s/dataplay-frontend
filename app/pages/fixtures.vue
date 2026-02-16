<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'
import { breakpointsTailwind } from '@vueuse/core'
import type { Fixture } from '~/types'
import type { Filters } from '~/components/fixtures/FiltersSection.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

const selectedDate = shallowRef(iToday(getLocalTimeZone()))
const selectedFixture = ref<Fixture | null>(null)
const openDetails = ref(false)
const filters = ref<Filters>({
  searchString: '',
  timeRange: [0, 24],
  oddsRange: [0, 1000]
})

const formattedDate = computed(() => selectedDate.value.toString())

const { data: fixturesData, isLoading: isLoadingFixtures } = useFixtures(formattedDate)

const fixtures = computed<Fixture[]>(() => {
  return fixturesData.value?.fixtures || []
})

function handleDateChange(date: CalendarDate) {
  filters.value = {
    searchString: '',
    timeRange: [0, 24],
    oddsRange: [0, 1000]
  }
  selectedFixture.value = null
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

    <FixturesFiltersSection v-model="filters" />

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
      class="lg:grid lg:grid-cols-2 lg:gap-3"
    >
      <FixturesList
        :fixtures="fixtures"
        :filters="filters"
        @item-click="handleFixtureClick"
      />

      <div
        v-if="isDesktop && selectedFixture"
        class="sticky top-28 p-5 glass-card rounded-2xl flex flex-col gap-3 h-max max-h-[calc(100vh-250px)] overflow-y-auto"
      >
        <div class="relative">
          <Icon
            name="i-lucide-x"
            class="absolute top-0 right-0 cursor-pointer text-white/60"
            @click="selectedFixture = null"
          />

          <FixturesFixtureDetails
            :fixture="selectedFixture"
          />
        </div>
      </div>

      <UDrawer
        v-if="!isDesktop"
        :open="openDetails"
        :ui="{ content: 'glass-card' }"
        @close="openDetails = false"
      >
        <template #content>
          <FixturesFixtureDetails
            v-if="selectedFixture"
            :fixture="selectedFixture"
          />
        </template>
      </UDrawer>
    </div>
  </div>
</template>
