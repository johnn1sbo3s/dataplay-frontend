<script setup lang="ts">
import { getLocalTimeZone, today as iToday } from '@internationalized/date'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['date-changed'])

const datePickerRef = useTemplateRef<HTMLElement>('date-picker-ref')
const datePickerMainRef = useTemplateRef<HTMLElement>('date-picker-main-ref')

const selectedDate = shallowRef(iToday(getLocalTimeZone()))
const showDatePicker = shallowRef(false)

const arrowButtonClass = `flex items-center justify-center h-full w-9 cursor-pointer hover:bg-black/10
  transition-all duration-300`

const computedSelectedDate = computed(() => {
  const timeZone = getLocalTimeZone()

  const selected = selectedDate.value
  const tdy = iToday(timeZone)
  const yesterday = tdy.subtract({ days: 1 })
  const tomorrow = tdy.add({ days: 1 })

  if (selected.compare(tdy) === 0) return 'Hoje'
  if (selected.compare(yesterday) === 0) return 'Ontem'
  if (selected.compare(tomorrow) === 0) return 'Amanhã'

  return new Intl.DateTimeFormat('pt-BR').format(selected.toDate(timeZone))
})

onClickOutside(
  datePickerRef,
  () => showDatePicker.value = false,
  { ignore: [datePickerMainRef] }
)

function previousDate() {
  selectedDate.value = selectedDate.value.subtract({ days: 1 })
}

function nextDate() {
  selectedDate.value = selectedDate.value.add({ days: 1 })
}

function handleDateChange() {
  showDatePicker.value = false
  emit('date-changed', selectedDate.value)
}
</script>

<template>
  <div class="relative w-[200px] sm:w-[150px]">
    <div
      class="flex items-center justify-between text-sm text-primary bg-primary/10 w-full h-10
        rounded-full border border-primary/20 overflow-hidden"
    >
      <div
        id="arrow-left-button"
        :class="arrowButtonClass"
        @click="previousDate"
      >
        <Icon
          name="i-lucide-chevron-left"
          class="h-6 w-6"
        />
      </div>

      <div
        id="date-picker-content"
        ref="date-picker-ref"
        class="flex-1 h-full text-center flex justify-center items-center hover:bg-black/10
          transition-all duration-300 cursor-pointer"
        @click="showDatePicker = !showDatePicker"
      >
        {{ computedSelectedDate }}
      </div>

      <div
        id="arrow-right-button"
        :class="arrowButtonClass"
        @click="nextDate"
      >
        <Icon
          name="i-lucide-chevron-right"
          class="h-6 w-6"
        />
      </div>
    </div>

    <Transition
      appear
      enter-active-class="transition duration-50 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="showDatePicker"
        ref="date-picker-main-ref"
        class="absolute z-modal right-0 mt-1"
      >
        <UCalendar
          v-model="selectedDate"
          :ui="{
            root: 'glass-panel rounded-2xl shadow-md overflow-hidden will-change-[backdrop-filter]',
            header: 'bg-slate-900/40 px-2 py-2',
            body: 'px-2 pt-3 pb-2'
          }"
          @update:model-value="handleDateChange"
        />
      </div>
    </Transition>
  </div>
</template>
