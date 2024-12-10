import { useState } from "react";
import { Todo } from "./types/Todo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ]);
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;

// todos = [{ id: 1, title: "Learn React", completed: false },]
