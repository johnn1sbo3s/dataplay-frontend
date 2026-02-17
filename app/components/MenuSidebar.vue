<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const showSidebar = useState('showSidebar')

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Dashboard',
    icon: 'i-lucide-home',
    to: '/',
    onSelect: handleItemOnSelect
  },
  {
    label: 'Jogos',
    icon: 'i-lucide-calendar-range',
    to: '/fixtures',
    onSelect: handleItemOnSelect
  },
  {
    value: 'bets',
    label: 'Apostas',
    icon: 'i-lucide-dices',
    to: '/bets'
  }
])

const footerItems = [
  {
    icon: 'i-lucide-github',
    label: 'Github',
    to: 'https://github.com/johnn1sbo3s/dataplay-frontend'
  },
  {
    icon: 'i-lucide-square-code',
    label: 'Dataplay Bets V2.0'
  }
]

watch(showSidebar, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

function handleItemOnSelect() {
  showSidebar.value = false
}
</script>

<template>
  <Transition
    appear
    enter-active-class="transition duration-50 ease-out"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-black/40 backdrop-blur-xl z-50 p-8
        flex flex-col items-center justify-center"
    >
      <div
        class="relative bg-linear-to-b from-gray-900/80 to-gray-950/70 shadow-l w-full h-full
          rounded-3xl p-5 flex flex-col gap-5 items-center"
      >
        <Icon
          name="i-lucide-x"
          class="absolute top-4 right-4 h-6 w-6 text-primary"
          @click="showSidebar = false"
        />

        <header class="my-4 flex">
          <BrandLogo class="h-11" />
        </header>

        <div class="flex flex-col justify-between gap-5 w-full h-full">
          <UNavigationMenu
            orientation="vertical"
            class="w-full"
            :items="items"
            :ui="{
              list: 'gap-2',
              item: 'relative',
              link: [
                'mb-2',
                'relative overflow-hidden rounded-2xl',
                'py-4 px-4 glass-panel transition',
                'before:content-none',
                '[aria-current=page]:bg-primary',
                '[aria-current=page]:text-primary-foreground'
              ]
            }"
          />

          <div class="py-4 w-full flex flex-col gap-1">
            <FooterItem
              v-for="footerItem in footerItems"
              :key="footerItem.label"
              :item="footerItem"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
