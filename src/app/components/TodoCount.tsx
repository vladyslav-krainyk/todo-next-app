import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

const TodoCount = ({ todos }) => {

  const activeTodos = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.done);
  }, [todos]);
  
  const completedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => todo.done);
  }, [todos]);

  return (
    <div className="flex justify-around my-4">
      <p>All: {todos.length}</p>
      <p>Active: {activeTodos.length}</p>
      <p>Completed: {completedTodos.length}</p>
    </div>
  );
};

export default TodoCount;
