<script setup lang="ts">
interface FooterItem {
  icon: string
  label: string
  to?: string
}

const props = defineProps<{
  item: FooterItem
}>()

function handleItemClick() {
  if (props.item.to) {
    window.open(props.item.to, '_blank')
  }
}
</script>

<template>
  <div
    class="flex gap-1 h-7 items-center justify-center text-neutral-400"
    @click="handleItemClick"
  >
    <Icon
      v-if="item.icon"
      class="h-5 w-5"
      :name="item.icon"
    />

    <p class="text-sm">
      {{ item.label }}
    </p>

    <Icon
      v-if="item.to"
      class="h-5 w-5 ml-1 text-neutral-300"
      name="i-lucide-external-link"
    />
  </div>
</template>
