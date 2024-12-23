import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";

export const useTodoSearch = (todos: Todo[]) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(searchKeyword.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchKeyword, todos]);

  return {
    searchKeyword,
    setSearchKeyword,
    filteredTodos,
  };
};
