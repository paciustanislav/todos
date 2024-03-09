<script setup lang="ts">

import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useTodosStore } from '../../app/store'
import Button from 'primevue/button'
import TodoCard from '../../shared/todos/todo-card.vue'
import TodoDialog from './todo-dialog.vue'
import TodoFilters from '../../shared/todos/todo-filters.vue'

const todos = useTodosStore()

const visible = ref<boolean>( false )
const selected = ref<number[]>( [] )

const onSelect = ( id: number ) => {
  if ( selected.value.includes( id ) ) {
    const index = selected.value.findIndex( ( value ) => value === id )
    selected.value.splice( index, 1 )
  } else {
    selected.value.push( id )
  }
}

const onCompleted = ( id: number, status: boolean ) => {
  todos.setCompleted( id, status )
}

// ...

const todoClick = ( id: number ) => {
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

</script>

<template>
  <div class="flex flex-column gap-2 p-2">

    <h1>Задачи</h1>

    <div class="flex gap-2">
      <div class="flex flex-1">
        <todo-filters/>
      </div>
      <Button
        v-if="selected.length"
        type="button"
        size="small"
        severity="danger"
        icon="pi pi-trash"
        text @click="removeClick"
      />
      <Button
        type="button"
        size="small"
        icon="pi pi-plus"
        text @click="addClick"
      />
    </div>

    <div class="py-2">
      <div v-if="!todos.items.length" class="flex align-items-center text-gray-300">
        Нет задач
      </div>
      <vue-draggable-next
        :list="todos.items"
        class="flex flex-column gap-2"
        ghost-class="dnd-ghost"
        handle=".dnd"
        animation="200"
      >
        <transition-group name="fade">
          <todo-card
            v-for="todo of todos.items"
            :key="todo.id"
            :data="todo"
            :selected="selected.includes( todo.id )"
            @click="todoClick"
            @click:completed="onCompleted"
            @click:select="onSelect"
          />
        </transition-group>
      </vue-draggable-next>
    </div>

    <todo-dialog v-model:visible="visible"/>

  </div>
</template>