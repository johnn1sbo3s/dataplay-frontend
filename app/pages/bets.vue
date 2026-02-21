<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { Bet, BetModel } from '~/types'
import type { Filters, BetModelOption } from '~/components/Bets/FiltersSection.vue'
import { getLocalTimeZone, today as iToday } from '@internationalized/date'

const selectedDate = shallowRef(iToday(getLocalTimeZone()))
const filters = ref<Filters>({
  betModels: []
})

const formattedDate = computed(() => selectedDate.value.toString())
const payload = computed(() => {
  return {
    date: formattedDate.value
  }
})

const { data: betsData, isLoading: isLoadingBets } = useBets(payload)
const { data: betModelsData, isLoading: isLoadingBetModels } = useBetModels()

const bets = computed<Bet[]>(() => {
  return betsData.value?.bets || []
})

const betModels = computed<BetModel[]>(() => {
  return betModelsData.value?.betModels || []
})

const betModelsOptions = computed<BetModelOption[]>(() => {
  return betModels.value.map((model) => {
    return {
      value: `${model.id}`,
      label: snakeToTitleCase(model.name)
    }
  })
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
            :loading="isLoadingBets"
            @date-changed="handleDateChange"
          />
        </div>
      </template>
    </PageHeader>

    <div
      v-if="isLoadingBets"
      class="w-full h-[70vh] flex items-center justify-center gap-1"
    >
      <LoadingAnimation />
    </div>

    <div
      v-else-if="!bets.length"
      class="flex flex-col items-center justify-center mt-4"
    >
      <EmptyState
        title="Nenhuma aposta encontrada"
        description="Tente selecionar outra data"
      />
    </div>

    <div v-else>
      <BetsFiltersSection
        v-model="filters"
        class="mt-3 mb-3 lg:w-1/2"
        :options="betModelsOptions"
        :loading="isLoadingBetModels"
      />

      <div class="lg:grid lg:grid-cols-2 lg:gap-3">
        <BetsList
          :bets="bets"
          :filters="filters"
        />
      </div>
    </div>
  </div>
</template>
