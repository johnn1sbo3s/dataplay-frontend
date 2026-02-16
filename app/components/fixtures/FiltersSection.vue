<script setup lang="ts">
export interface Filters {
  searchString?: string
  timeRange?: string
  oddsRange?: string
}

const filters = defineModel<Filters>({
  default: () => ({
    searchString: '',
    timeRange: undefined,
    oddsRange: undefined
  })
})
</script>

<template>
  <div class="w-full flex gap-2 items-center justify-between mt-3 mb-1">
    <UInput
      v-model="filters.searchString"
      placeholder="Buscar por time ou liga..."
      class="flex-1"
      :ui="{ base: 'rounded-lg bg-white/5 backdrop-blur-sm' }"
    />

    <UButton
      variant="soft"
      color="secondary"
    >
      Mais filtros
    </UButton>
  </div>
</template>
