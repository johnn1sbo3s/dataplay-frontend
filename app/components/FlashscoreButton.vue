<script setup lang="ts">
const props = defineProps<{
  flashscoreId: string
  minimal?: boolean
}>()

function handleFlashscoreClick() {
  window.open(`https://www.flashscore.com.br/jogo/${props.flashscoreId}/#/resumo-de-jogo/resumo-de-jogo`, '_blank')
}
</script>

<template>
  <UBadge
    variant="soft"
    color="secondary"
    class="shrink-0 cursor-pointer hover:brightness-110"
    @click="handleFlashscoreClick"
  >
    <p>
      {{ minimal ? 'Flashscore' : 'Ver no Flashscore' }}
    </p>

    <Icon
      name="i-lucide-square-arrow-out-up-right"
    />
  </UBadge>
</template>
