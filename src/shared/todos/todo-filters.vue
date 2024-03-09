<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'

const selected = ref()
const options = ref( [
  { name: 'Все', code: null },
  { name: 'Выполненные', code: true },
  { name: 'Не выполненные', code: false },
] )
</script>

<template>
  <div class="flex flex-row gap-2">
    <Dropdown
      v-model="selected"
      placeholder="Поиск ..."
      size="small"
      style="width: 100%;"
      :options="options"
      optionLabel="name"
    />
  </div>
</template>