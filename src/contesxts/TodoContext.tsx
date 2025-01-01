import React, { createContext, useContext, useState, useEffect } from "react";
import { Todo } from "../types/Todo";

interface TodoContextType {
  todos: Todo[];
  newTodo: string;
  searchKeyword: string;
  filteredTodos: Todo[];
  setNewTodo: (text: string) => void;
  setSearchKeyword: (text: string) => void;
  addTodo: () => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newTodoItem: Todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchKeyword, todos]);

  const value = {
    todos,
    newTodo,
    searchKeyword,
    filteredTodos,
    setNewTodo,
    setSearchKeyword,
    addTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
