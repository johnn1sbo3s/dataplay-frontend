<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navigationItems } from '~/utils/constants/navigation-items'
import type { NavigationItem } from '~/types'

const { width } = useWindowSize()
const route = useRoute()
const items = navigationItems()

const activeItem = ref(resolveInitialItem())

watch(() => activeItem.value, () => {
  const item = items.find((item: NavigationItem) => item.value === activeItem.value)

  if (item) {
    navigateTo(item.to)
  }
})

function resolveInitialItem() {
  return items.find((item: NavigationItem) => item.to === route.fullPath)?.value || 'dashboard'
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
      trigger: 'cursor-pointer',
      label: width <= 1024 ? 'hidden' : 'block'
    }"
    class="w-full"
  />
</template>
