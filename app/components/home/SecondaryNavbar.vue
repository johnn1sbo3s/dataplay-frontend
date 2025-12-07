<script setup lang="ts">
const colorMode = useColorMode()

const darkMode = computed<boolean>({
  get: () => colorMode.value === 'dark',
  set: value => colorMode.preference = value ? 'dark' : 'light'
})
</script>

<template>
  <div class="absolute top-0 left-0 right-0 z-20">
    <UDashboardNavbar
      title="Home"
      :ui="{
        root: 'bg-soft/50 dark:bg-dark-strong/50 backdrop-blur-md',
        right: 'gap-3'
      }"
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
      :ui="{
        root: 'bg-soft/50 dark:bg-dark-strong/50 backdrop-blur-md shadow-md shadow-neutral-200 dark:shadow-neutral-900'
      }"
    >
      <template #left>
        <slot />
      </template>
    </UDashboardToolbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
