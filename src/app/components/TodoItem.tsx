import React, { useState } from 'react'
import { Reorder } from 'framer-motion'

const TodoItem = ({
  todo,
  onRemoveTodo,
  onChangeTodoStatus,
  onUpdateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const handleInputBlur = () => {
    if (editedValue.trim() !== todo.title) {
      onUpdateTodo(todo.id, editedValue.trim());
    }

    if (!editedValue.length) {
      onRemoveTodo(todo.id);
    }

    setIsEditing(false);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedValue(todo.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editedValue.length) {
      onRemoveTodo(todo.id)
      return
    }

    if (editedValue.trim() !== todo.value) {
      onUpdateTodo(todo.id, editedValue.trim());
    }

    setIsEditing(false);
  };

  return (
    <Reorder.Item
      key={todo.id}
      value={todo}
      className="flex justify-between text-2xl text-slate-600 py-2 bg-white my-2 p-4 rounded-xl border-2 border-slate-600"
    >
      <div className="flex justify-between">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onChangeTodoStatus(todo.id)}
          className="mr-4"
        />
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='outline-none'
              value={editedValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyUp={handleEscape}
              autoFocus
            />
          </form>
        ) : (
          <label
            className="cursor-pointer select-none"
            onDoubleClick={handleDoubleClick}
          >
            <span className={`checked:text-opacity-50 ${todo.done ? 'line-through' : ''}`}>
              {todo.value}
            </span>
          </label>
        )}
      </div>
      <button
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
        >
          &#10006;
        </button>
    </Reorder.Item>
  )
}

export default TodoItem