<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { TodoEntity } from '../../shared/types'
import { useTodosStore } from '../../app/store'

const emit = defineEmits<{
  'update:visible': [ boolean ],
  'onsave': [ TodoEntity ]
}>()

const props = defineProps<{
  visible: boolean
}>()

const visible = computed( {
  get: () => props.visible,
  set: ( value ) => emit( 'update:visible', value ),
} )

const todos = useTodosStore()

const name = ref<string>( '' )
const description = ref<string>( '' )

watch( () => todos.current, () => {
  name.value = todos.current?.name || ''
  description.value = todos.current?.description || ''
} )

const save = () => {
  if ( todos.current ) {
    todos.updatedTodo( {
      ...todos.current,
      name: name.value,
      description: description.value,
    } )
  } else {
    todos.addTodo( {
      name: name.value,
      description: description.value,
    } )
  }
  name.value = ''
  description.value = ''
  visible.value = false
}

const remove = () => {
  if ( todos.current ) {
    todos.removeTodo( [ todos.current.id ] )
    visible.value = false
  }
}

const canSave = computed<boolean>( () => !!name.value )

</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Задача"
    :draggable="false"
    :style="{ width: 'calc( 100% - 32px )', maxWidth: '400px' }"
  >
    <div class="flex flex-column gap-2">
      <InputText v-model:model-value="name" placeholder="Название" size="small" />
      <Textarea v-model:model-value="description" placeholder="Описание" size="small" autoResize />
      <div class="flex justify-content-end gap-2">
        <Button
          v-if="todos.current?.id"
          type="button"
          size="small"
          label="Удалить"
          severity="danger"
          text
          @click="remove"
        />
        <Button
          type="button"
          size="small"
          label="Сохранить"
          :disabled="!canSave"
          @click="save"
        />
      </div>
    </div>
  </Dialog>
</template>