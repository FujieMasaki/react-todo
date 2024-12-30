import TodoApp from "./components/TodoApp";
import { TodoProvider } from "./contesxts/TodoContext";
import "./style/App.css";

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;
