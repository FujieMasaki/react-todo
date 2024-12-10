import React from "react";
import { Todo } from "../types/Todo";

type TodoList = {
  todos: Todo[];
};

const TodoList: React.FC<TodoList> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
