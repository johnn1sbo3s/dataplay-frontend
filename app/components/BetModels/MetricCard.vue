<script setup lang="ts">
const props = defineProps<{
  title: string
  loading?: boolean
  value?: number
  icon?: string
  type?: 'currency' | 'percentage'
  neutralIconColor?: boolean
  noDecimal?: boolean
  noIcon?: boolean
}>()

const symbol = computed(() => {
  if (props.type === 'currency') {
    return 'un'
  }

  return '%'
})

const computedIconClass = computed(() => {
  if (!props.value || props.neutralIconColor) {
    return 'from-white/10 to-white/10 text-white/70'
  }

  if (props.value >= 0) {
    return 'from-primary-700/30 to-primary-900/30 text-primary-500/70'
  }

  return 'from-red-700/30 to-red-900/30 text-red-500/70'
})

const formattedValue = computed(() => {
  if (!props.value) return '--'

  if (props.noDecimal) {
    return props.value.toLocaleString(navigator.language)
  }

  return props.value.toLocaleString(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
})
</script>

<template>
  <div>
    <div v-if="loading">
      <USkeleton class="h-[85px] sm:h-[100px] rounded-3xl" />
    </div>

    <UCard
      v-else
      :ui="{ root: 'glass-panel rounded-3xl' }"
    >
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-col gap-1">
          <p class="text-xs text-white/50 font-medium uppercase">
            {{ title }}
          </p>

          <span class="text-white/90 text-2xl font-semibold">
            {{ formattedValue }}

            <span
              v-if="type"
              class="-ml-0.5 text-lg text-white/60"
            >
              {{ symbol }}
            </span>
          </span>
        </div>

        <div
          v-if="!noIcon"
          class="flex items-center justify-center p-2 bg-linear-120 backdrop-blur-2xl rounded-full"
          :class="computedIconClass"
        >
          <UIcon
            size="24"
            :name="icon"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
