<script setup lang="ts">
const selectedDateRange = defineModel({
  type: String,
  default: 'all'
})

const items = [
  {
    label: 'Geral',
    value: 'all'
  },
  {
    label: '30 dias',
    value: '30d'
  },
  {
    label: '15 dias',
    value: '15d'
  }
]
</script>

<template>
  <div>
    <UTabs
      v-model="selectedDateRange"
      class="w-full md:w-max"
      :content="false"
      :items="items"
      :ui="{
        list: 'px-5 py-2 bg-white/5 p-1 rounded-full border border-white/5 shadow-s',
        indicator: 'rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20',
        trigger: 'cursor-pointer'
      }"
    />
  </div>
</template>
