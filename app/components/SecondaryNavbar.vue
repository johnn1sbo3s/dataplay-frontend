<script setup lang="ts">
const props = defineProps({
  removeToolbar: {
    type: Boolean,
    default: false
  }
})

const colorMode = useColorMode()

const darkMode = computed<boolean>({
  get: () => colorMode.value === 'dark',
  set: value => colorMode.preference = value ? 'dark' : 'light'
})

const navbarUi = computed(() => {
  return {
    root: props.removeToolbar
      ? 'shadow-md shadow-neutral-200 dark:shadow-neutral-900'
      : '',
    right: 'gap-3'
  }
})
</script>

<template>
  <div
    class="bg-soft/50 dark:bg-dark-strong/80
      absolute top-0 left-0 right-0 z-20
      backdrop-blur-md"
  >
    <UDashboardNavbar
      title="Home"
      :ui="navbarUi"
    >
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>

      <template #right>
        <USwitch
          v-model="darkMode"
          unchecked-icon="i-lucide-sun"
          checked-icon="i-lucide-moon"
        />
      </template>
    </UDashboardNavbar>

    <UDashboardToolbar
      v-if="!removeToolbar"
      :ui="{ root: 'shadow-md shadow-neutral-200 dark:shadow-neutral-900' }"
    >
      <template #left>
        <slot />
      </template>
    </UDashboardToolbar>
  </div>
</template>
