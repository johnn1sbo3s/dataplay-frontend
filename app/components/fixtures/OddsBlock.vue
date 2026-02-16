<script setup lang="ts">
interface Odd {
  label: string
  value: number
}

interface OddsBlockProps {
  label: string
  odds?: Odd[]
  infoText?: string
}

defineProps<OddsBlockProps>()
</script>

<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <div class="flex gap-2 items-center">
      <p class="text-sm font-semibold">
        {{ label }}
      </p>

      <UPopover
        v-if="infoText"
        :ui="{ content: 'glass-card' }"
      >
        <UButton
          variant="ghost"
          size="sm"
          :ui="{ base: 'p-0' }"
        >
          <Icon
            name="i-lucide-info"
            size="16"
            class="text-white/60"
          />
        </UButton>

        <template #content>
          <div class="p-2 text-xs">
            {{ infoText }}
          </div>
        </template>
      </UPopover>
    </div>

    <div class="flex gap-2 items-center">
      <div
        v-for="odd in odds"
        :key="odd.label"
        class="flex flex-col gap-1 items-center"
      >
        <small class="text-xs text-white/60 font-light">
          {{ odd.label }}
        </small>

        <UBadge variant="soft">
          {{ odd.value.toFixed(2) }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
