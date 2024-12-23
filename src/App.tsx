import { useTodoList } from "./components/TodoList";
import { useTodoSearch } from "./components/useTodoSearch";
import "./style/App.css";
import { Todo } from "./types/Todo";

const App = () => {
  const { todos, newTodo, setNewTodo, addTodo, deleteTodo } = useTodoList();
  const { searchKeyword, setSearchKeyword, filteredTodos } =
    useTodoSearch(todos);
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
        <ul>
          {todos.map((filteredTodos: Todo) => (
            <li key={filteredTodos.id}>
              {filteredTodos.title}
              <button onClick={() => onDelete(filteredTodos.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <p>TodoList</p>
    </div>
  );
};

export default App;
