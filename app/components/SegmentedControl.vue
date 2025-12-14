<script setup lang="ts">
import { useRoute } from 'vue-router'

type NavTab = {
  value: 'dashboard' | 'fixtures'
  label: string
  icon: string
  to: string
}

const route = useRoute()

const items = ref<NavTab[]>([
  {
    value: 'dashboard',
    label: 'Dashboard',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    value: 'fixtures',
    label: 'Jogos',
    icon: 'i-lucide-calendar-range',
    to: '/fixtures'
  }
])

const activeItem = ref(resolveInitialItem())

watch(() => activeItem.value, () => {
  const item = items.value?.find((item: NavTab) => item.value === activeItem.value)

  if (item) {
    navigateTo(item.to)
  }
})

function resolveInitialItem() {
  return items.value?.find((item: NavTab) => item.to === route.fullPath)?.value || 'dashboard'
}
</script>

<template>
  <UTabs
    v-model="activeItem"
    :content="false"
    :items="items"
    :ui="{
      list: 'px-5 py-2 bg-white/5 p-1 rounded-full border border-white/5 shadow-s',
      indicator: 'rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20',
      trigger: 'cursor-pointer'
    }"
    class="w-full"
  />
</template>
