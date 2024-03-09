<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from 'primevue/card'
import { TodoEntity } from '../types'
import Checkbox from 'primevue/checkbox'

const props = defineProps<{
  data?: TodoEntity
  selected?: boolean
}>()

const emit = defineEmits<{
  'click': [ number ]
  'click:select': [ number ]
  'click:completed': [ number, boolean ]
}>()

const click = () => {
  if ( props.data ) {
    emit( 'click', props.data.id )
  }
}

const completed = ref<boolean>( !!props?.data?.completed )

const classList = computed<string[]>( () => {
  const list = [ 'todo-card cursor-pointer shadow-none' ]
  if ( completed.value ) {
    list.push( 'completed' )
  }
  if ( props?.selected ) {
    list.push( 'selected' )
  }
  return list
} )

const checkboxClick = ( event: Event ) => {
  event.stopPropagation()
  emit( 'click:completed', props.data.id, !completed.value )
}

const onCheck = ( event: Event ) => {
  event.stopPropagation()
  emit( 'click:select', props.data.id )
}

const onBars = ( event: Event ) => event.stopPropagation()

</script>

<template>
  <Card v-if="data" @click="click" :class="classList">
    <template #content>
      <div class="flex flex-column gap-2">
        <div class="flex align-items-center">
          <Checkbox
            v-model:model-value="completed"
            class="mr-2"
            binary
            @click="checkboxClick"
          />
          <span class="font-semibold">{{ data.name }}</span>
        </div>
        <div v-if="data?.description">
          {{ data.description }}
        </div>
      </div>
      <div class="todo-card-actions flex align-items-center gap-2">
        <i class="pi pi-pencil" />
        <i class="pi pi-bars dnd" @click="onBars" />
        <i class="pi pi-check select" @click="onCheck" />
      </div>
    </template>
  </Card>
</template>