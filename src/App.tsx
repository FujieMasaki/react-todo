import { useState } from "react";
import { Todos } from "./types/Todo";

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ]);
  return <div></div>;
};

export default App;
