<script setup lang="ts">
import { computed, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useTodosStore } from '@/app/store'
import Button from 'primevue/button'
import TodoCard from '@/shared/todos/todo-card.vue'
import TodoDialog from '@/widgets/todos/todo-dialog.vue'
import TodoFilters from '@/shared/todos/todo-filters.vue'
import { Filters, TodoEntity } from '@/shared/types.ts'

const todos = useTodosStore()

const visible = ref<boolean>( false )
const selected = ref<number[]>( [] )
const filters = ref<Filters>( {
  completed: null
} )

const onSelect = ( id: number ) => {
  if ( selected.value.includes( id ) ) {
    const index = selected.value.findIndex( ( value ) => value === id )
    selected.value.splice( index, 1 )
  } else {
    selected.value.push( id )
  }
}

const onCompleted = ( id: number, status: boolean ) => todos.setCompleted( id, status )

const onClick = ( id: number ) => {
  todos.setCurrent( id )
  visible.value = true
}

const addClick = () => {
  todos.setCurrent( null )
  visible.value = true
}

const removeClick = () => {
  todos.removeTodo( selected.value )
  selected.value = []
}

const onChangeFilters = ( newFilters: Filters ) => filters.value = newFilters

const items = computed<TodoEntity[]>( () => {
  if ( filters.value ) {
    return todos.items.filter( ( todo ) => !(
      typeof filters.value?.completed === 'boolean' && todo.completed !== filters.value?.completed
    ) )
  }
  return todos.items
} )

</script>

<template>
  <div class="flex flex-column gap-2 p-2">

    <h1>Задачи</h1>

    <div class="flex gap-2">
      <div class="flex flex-1">
        <todo-filters @change="onChangeFilters" />
      </div>
      <Button
        v-if="selected.length"
        type="button"
        severity="danger"
        size="small"
        text
        icon="pi pi-trash"
        :badge="String( selected.length )"
        @click="removeClick"
      />
      <Button
        type="button"
        size="small"
        text
        icon="pi pi-plus"
        @click="addClick"
      />
    </div>

    <div class="py-2">
      <vue-draggable-next
        :list="todos.items"
        class="flex flex-column gap-2"
        ghost-class="dnd-ghost"
        handle=".dnd"
        animation="200"
      >
        <todo-card
          v-for="todo of items"
          :key="todo.id"
          :data="todo"
          :selected="selected.includes( todo.id )"
          @click="onClick( todo.id )"
          @change:completed="onCompleted"
        >
          <template #actions>
            <i v-tooltip.bottom="'Редактировать'" class="pi pi-pencil" />
            <i v-if="filters.completed === null" v-tooltip.bottom="'Перетащить'" class="pi pi-bars dnd" @click.stop />
            <i
              v-tooltip.bottom="selected.includes( todo.id ) ? 'Отменить' : 'Выбрать'"
              :class="[ 'pi', selected.includes( todo.id ) ? 'pi-times' : 'pi-check', 'select' ]"
              @click.stop="onSelect( todo.id )"
            />
          </template>
        </todo-card>
      </vue-draggable-next>
      <div v-if="!items.length" class="flex align-items-center text-gray-300">
        Нет задач
      </div>
    </div>

    <todo-dialog v-model:visible="visible" />

  </div>
</template>