import React from "react";
import { Todo } from "../types/Todo";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
