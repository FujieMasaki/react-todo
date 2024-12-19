import { useEffect, useState } from "react";
import { Todo } from "./types/Todo";
import TodoList from "./components/TodoList";
import "./style/App.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(searchKeyword.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchKeyword, todos]);

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

  return (
    <div className="container">
      <h2 className="title">タスクを調べる</h2>

      <div className="form-group">
        <p>検索</p>
        <input
          type="text"
          placeholder="Search Todos..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <p>追加</p>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="input-field"
        />
        <button onClick={addTodo} className="button">
          Add
        </button>
      </div>

      <div className="form-group">
        <p>検索結果</p>
        <TodoList todos={filteredTodos} onDelete={deleteTodo} />
      </div>

      <p>TodoList</p>
    </div>
  );
};

export default App;
