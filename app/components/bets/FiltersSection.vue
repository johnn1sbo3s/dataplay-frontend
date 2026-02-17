<script setup lang="ts">
export interface BetModelOption {
  value: string
  label: string
}

export interface Filters {
  betModels: BetModelOption[]
}

const filters = defineModel<Filters>({
  default: () => ({
    betModels: []
  })
})

const props = defineProps<{
  options: BetModelOption[]
  loading: boolean
}>()

function clearBetModelsFilter() {
  filters.value.betModels = []
}
</script>

<template>
  <div class="flex flex-col gap-1 items-end">
    <USelectMenu
      v-model="filters.betModels"
      placeholder="Filtre por modelo..."
      class="w-full"
      :items="options"
      :loading="props.loading"
      :ui="{
        base: 'glass-panel rounded-lg',
        content: 'glass-panel rounded-lg'
      }"
      multiple
    />

    <UButton
      variant="ghost"
      color="secondary"
      size="sm"
      @click="clearBetModelsFilter"
    >
      Limpar
    </UButton>
  </div>
</template>
