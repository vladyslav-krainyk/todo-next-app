"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Todo } from "./types/Todo"
import { ErrorType } from "./types/ErrorType"
import TodoList from "./components/TodoList"
import TodoCount from "./components/TodoCount"
import Input from "./components/Input"

const Home = () => {
  const [input, setInput] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [isError, setIsError] = useState<ErrorType>(ErrorType.NONE);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      setTodos(savedTodos ? JSON.parse(savedTodos) : []);
    }
  }, []);

  useEffect(() => {
    const showError = setTimeout((error: ErrorType) => setIsError(error), 3000);

    return () => {
      clearTimeout(showError);
    };
  }, [isError]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      setIsError(ErrorType.ADD)
      return
    }

    if (input.length > 30) {
      setIsError(ErrorType.LENGTH)
      return
    }

    const newTodo: Todo = {
      id: +new Date(),
      value: input,
      done: false,
    }
    const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    const updatedTodos = [...existingTodos, newTodo]

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    
    setTodos(updatedTodos)
    setInput('')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleRemoveTodo = useCallback((todoId: number) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');;
  
    const updatedTodos = existingTodos.filter((todo: Todo) => todo.id !== todoId);
  
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  
    setTodos(updatedTodos);
  }, []);

  const handleUpdateTodo = (todoId: number, newValue: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          value: newValue,
        };
      }

      return todo;
    });

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleChangeTodoStatus = (todoId: number) => {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => (
      todo.id === todoId
        ? { ...todo, done: !todo.done }
        : todo
    ));

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const onReorder = (newOrder: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(newOrder));
    setTodos(newOrder);
  };

  return (
    <>
      <header className="p-6">
        <h1 className="text-6xl text-center text-slate-500">
          todos
        </h1>
      </header>
      <main className="m-auto max-w-[500px]">
        <Input
          addTodo={addTodo}
          input={input}
          onChangeInput={onChangeInput}
        />

        {isError && (
          <div
            className="bg-black/60 text-white p-2 text-center text-2xl rounded-xl max-w-[500px]"
          >
            {isError}
          </div>
        )}

        <TodoList
          todos={todos}
          reorderTodo={onReorder}
          removeTodo={handleRemoveTodo}
          changeTodoStatus={handleChangeTodoStatus}
          onUpdateTodo={handleUpdateTodo}
        />
      </main>
      <footer className="m-auto max-w-[500px]">
        <TodoCount todos={todos} />
      </footer>
    </>
  )
}

export default Home;
