<!-- NavigationBar.vue -->
<template>
  <header
    id="navigation-bar"
    class="fixed top-0 z-50 left-0 right-0 mx-5"
  >
    <div
      class="
        glass-panel border-b-0 border-t-0 border-b-white/5 px-6 py-4 my-4 rounded-2xl
        max-w-[1880px] mx-auto shadow-l
      "
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <BrandLogo />

          <SegmentedControl />
        </div>
      </div>
    </div>
  </header>
</template>
