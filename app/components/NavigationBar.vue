<script setup lang="ts">
function openPortfolio() {
  window.open('https://jonedev.vercel.app/', '_blank')
}
</script>

<template>
  <header
    id="navigation-bar"
    class="fixed top-0 z-50 left-0 right-0 mx-5"
  >
    <div
      class="
        glass-panel border-b-0 border-t-0 border-b-white/5 px-6 py-4 my-4 rounded-3xl
        max-w-[1880px] mx-auto shadow-l
      "
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 sm:gap-8">
          <Icon
            name="i-heroicons-bars-3-bottom-left-20-solid"
            class="h-6 w-6 text-primary block sm:hidden"
          />

          <BrandLogo />

          <SegmentedControl class="hidden sm:block" />
        </div>

        <div>
          <UAvatar
            src="https://avatars.githubusercontent.com/u/49643446?v=4"
            size="xl"
            alt="João Paulo Castro's Portfolio"
            class="cursor-pointer hover:shadow-lg hover:shadow-primary/10"
            @click="openPortfolio"
          />
        </div>
      </div>
    </div>
  </header>
</template>
