import { useTodo } from "../contesxts/TodoContext";

const TodoApp = () => {
  const {
    newTodo,
    searchKeyword,
    filteredTodos,
    setNewTodo,
    setSearchKeyword,
    addTodo,
    deleteTodo,
  } = useTodo();

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
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <p>TodoList</p>
    </div>
  );
};

export default TodoApp;
