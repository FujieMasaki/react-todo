import { useEffect, useState } from "react";
import { Todo } from "./types/Todo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(searchKeyword.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchKeyword, todos]);

  return (
    <div>
      <h2>タスクを調べる</h2>

      <input
        type="text"
        placeholder="Search Todos..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <p>検索結果</p>
      <TodoList todos={filteredTodos} />
      <p>TodoList</p>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
