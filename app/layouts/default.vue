<!-- eslint-disable @stylistic/indent -->
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const toast = useToast()

const open = ref(false)
const navigationMenuUi = { link: 'py-3' }

const links = [
  [
    {
      label: 'Início',
      icon: 'i-lucide-house',
      to: '/',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'Jogos do dia',
      icon: 'i-lucide-inbox',
      to: '/fixtures',
      badge: {
        label: '432',
        size: 'md'
      },
      onSelect: () => {
        open.value = false
      }
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-lucide-github',
      to: 'https://github.com/johnn1sbo3s',
      target: '_blank'
    }, {
      label: 'LinkedIn',
      icon: 'i-lucide-linkedin',
      to: 'https://www.linkedin.com/in/joaopaulo-castro',
      target: '_blank'
    },
    {
      label: 'Entre em contato',
      icon: 'i-lucide-mail',
      to: 'mailto:joaopaulo.castro@gmail.com',
      target: '_blank'
    }
  ]
] satisfies NavigationMenuItem[][]

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      :ui="{
        body: 'pt-4 bg-soft dark:bg-dark-strong',
        footer: 'lg:border-t lg:border-default bg-base dark:bg-dark-base'
      }"
      class="bg-elevated/25"
      collapsible
      resizable
    >
      <template #default="{ collapsed }">
        <NuxtImg
          src="/img/dataplay-logo.svg"
          class="h-10 self-center w-full my-2"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          :ui="navigationMenuUi"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          :ui="navigationMenuUi"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
