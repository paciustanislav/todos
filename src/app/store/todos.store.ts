import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { TodoEntity } from '../../shared/types'

export const useTodosStore = defineStore( 'todos', () => {

  const items = ref<TodoEntity[]>( [] )

  const currentId = ref<number | null>( null )

  const current = computed<TodoEntity | null>( () => {
    if ( currentId?.value ) {
      const find = items.value.find( ( { id } ) => id === currentId.value )
      if ( find ) {
        return find
      }
    }
    return null
  } )

  const setCurrent = ( id: number | null ) => {
    currentId.value = id
  }

  const addTodo = ( todo: TodoEntity ) => {
    todo.id = Date.now()
    items.value.splice( 0, 0, todo )
  }

  const updatedTodo = ( todo: TodoEntity ) => {
    const index = items.value.findIndex( ( { id } ) => id === todo.id )
    if ( index >= 0 ) {
      items.value.splice( index, 1, todo )
    }
  }

  const removeTodo = ( ids: number[] ) => {
    items.value = items.value.filter( ( { id } ) => !ids.includes( id ) )
  }

  const setCompleted = ( id: number, status: boolean ) => {
    const index = items.value.findIndex( ( todo ) => todo.id === id )
    if ( index >= 0 ) {
      items.value.splice( index, 1, {
        ...items.value[ index ],
        completed: status,
      } )
    }
  }

  return {
    items,
    addTodo,
    updatedTodo,
    removeTodo,
    setCurrent,
    setCompleted,
    current,
  }

} )