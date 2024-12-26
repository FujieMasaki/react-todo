// useTodoList.test.tsx
import { renderHook, act } from "@testing-library/react-hooks";
import { useTodoList } from "../components/TodoList";

describe("useTodoList", () => {
  // 初期状態のTodoアイテム
  const initialTodos = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "TypeScript", completed: false },
  ];

  test("初期状態が正しく設定されている", () => {
    const { result } = renderHook(() => useTodoList());

    expect(result.current.todos).toEqual(initialTodos);
    expect(result.current.newTodo).toBe("");
    expect(typeof result.current.setNewTodo).toBe("function");
    expect(typeof result.current.addTodo).toBe("function");
    expect(typeof result.current.deleteTodo).toBe("function");
  });

  test("新しいTodoを追加できる", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.setNewTodo("Learn Testing");
    });

    act(() => {
      result.current.addTodo();
    });

    expect(result.current.todos).toEqual([
      ...initialTodos,
      { id: 3, title: "Learn Testing", completed: false },
    ]);
    expect(result.current.newTodo).toBe(""); // 入力フィールドがクリアされる
  });

  test("空の文字列ではTodoを追加できない", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.setNewTodo("   "); // 空白のみ
    });

    act(() => {
      result.current.addTodo();
    });

    expect(result.current.todos).toEqual(initialTodos); // Todosは変更されない
  });

  test("Todoを削除できる", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.deleteTodo(1);
    });

    expect(result.current.todos).toEqual([
      { id: 2, title: "TypeScript", completed: false },
    ]);
  });

  test("存在しないIDのTodoを削除しようとしても他のTodoは影響を受けない", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.deleteTodo(999);
    });

    expect(result.current.todos).toEqual(initialTodos);
  });

  test("複数のTodoを追加して削除できる", () => {
    const { result } = renderHook(() => useTodoList());

    // 1つ目のTodoを追加
    act(() => {
      result.current.setNewTodo("Learn Testing");
      result.current.addTodo();
    });

    // 2つ目のTodoを追加
    act(() => {
      result.current.setNewTodo("Learn Jest");
      result.current.addTodo();
    });

    expect(result.current.todos.length).toBe(4);

    // 追加したTodoを削除
    act(() => {
      result.current.deleteTodo(3);
    });

    expect(result.current.todos.length).toBe(3);
    expect(
      result.current.todos.find((todo) => todo.title === "Learn Testing")
    ).toBeUndefined();
  });

  test("newTodoの状態を更新できる", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.setNewTodo("New Todo Item");
    });

    expect(result.current.newTodo).toBe("New Todo Item");
  });

  test("Todoのidが正しく割り当てられる", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.setNewTodo("First New Todo");
      result.current.addTodo();
    });

    act(() => {
      result.current.setNewTodo("Second New Todo");
      result.current.addTodo();
    });

    const ids = result.current.todos.map((todo) => todo.id);
    expect(ids).toEqual([1, 2, 3, 4]); // IDが連番で割り当てられている
    expect(new Set(ids).size).toBe(ids.length); // IDが重複していない
  });
});
