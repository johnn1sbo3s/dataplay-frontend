<template>
  <div
    id="template-default"
    class="relative flex flex-col min-h-screen px-5 items-center"
  >
    <div class="flex flex-col w-full max-w-[1880px] flex-1">
      <NavigationBar />

      <main
        id="main-content"
        class="pt-[108px] w-full flex-1"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
