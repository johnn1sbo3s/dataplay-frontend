<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { DateTime } from 'luxon'
import type { Fixture } from '~/types'

const selectedDate = ref(DateTime.now().toFormat('yyyy-MM-dd'))

const { data: fixturesData } = useFixtures(selectedDate)

const fixtures = computed<Fixture[]>(() => {
  return fixturesData.value?.fixtures || []
})

const dateOptions = computed<SelectItem[]>(() => {
  const dates: SelectItem[] = [
    {
      value: DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd'),
      label: 'Amanhã'
    },
    {
      value: DateTime.now().toFormat('yyyy-MM-dd'),
      label: 'Hoje'
    }
  ]

  for (let i = 1; i <= 3; i++) {
    const day = DateTime.now().minus({ days: i })

    if (i === 1) {
      dates.push({
        value: day.toFormat('yyyy-MM-dd'),
        label: 'Ontem'
      })
      continue
    }

    dates.push({
      value: day.toFormat('yyyy-MM-dd'),
      label: day.toFormat('dd/MM/yyyy')
    })
  }

  return dates
})
</script>

<template>
  <div class="h-full w-full flex flex-col gap-5">
    <PageHeader
      title="Jogos"
      description="Visualize confrontos, resultados e estatísticas para decisões mais inteligentes."
    >
      <template #right>
        <div class="w-full flex justify-center sm:justify-end">
          <DatePicker />
        </div>
      </template>
    </PageHeader>

    <FixturesList :fixtures="fixtures" />
  </div>
</template>
