import React from 'react'
import { Reorder } from "framer-motion"
import { Todo } from '../types/Todo'
import TodoItem from './TodoItem'

const TodoList = ({
  todos,
  reorderTodo,
  removeTodo,
  changeTodoStatus,
  onUpdateTodo,
}) => (
  <Reorder.Group
    axis="y"
    values={todos}
    onReorder={reorderTodo}
  >
    {todos.map((todo: Todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onRemoveTodo={removeTodo}
        onChangeTodoStatus={changeTodoStatus}
        onUpdateTodo={onUpdateTodo}
      />
    ))}
  </Reorder.Group>
)

export default TodoList