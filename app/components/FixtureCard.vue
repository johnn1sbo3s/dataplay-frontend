<script setup lang="ts">
import type { Fixture } from '~/types'

defineProps<{
  fixture: Fixture | undefined
}>()
</script>

<template>
  <div>
    <pre>
      {{ fixture }}
    </pre>
  </div>
</template>
