// useTodoSearch.test.tsx
import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { Todo } from "../types/Todo";
import { useTodoSearch } from "../components/useTodoSearch";

describe("useTodoSearch", () => {
  // テスト用のモックデータ
  const mockTodos: Todo[] = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Learn TypeScript", completed: false },
    { id: 3, title: "Read Documentation", completed: true },
  ];

  // deleteTodoのモック関数
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    // 各テスト前にモック関数をリセット
    mockDeleteTodo.mockClear();
  });

  test("初期状態が正しく設定されている", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    expect(result.current.searchKeyword).toBe("");
    expect(result.current.filteredTodos).toEqual(mockTodos);
    expect(typeof result.current.setSearchKeyword).toBe("function");
    expect(typeof result.current.onDelete).toBe("function");
  });

  test("検索キーワードで正しくフィルタリングされる", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    act(() => {
      result.current.setSearchKeyword("learn");
    });

    expect(result.current.filteredTodos).toEqual([
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Learn TypeScript", completed: false },
    ]);
  });

  test("大文字小文字を区別せずに検索できる", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    act(() => {
      result.current.setSearchKeyword("LEARN");
    });

    expect(result.current.filteredTodos).toEqual([
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Learn TypeScript", completed: false },
    ]);
  });

  test("検索結果が0件の場合、空配列を返す", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    act(() => {
      result.current.setSearchKeyword("xyz");
    });

    expect(result.current.filteredTodos).toEqual([]);
  });

  test("todosが変更された時に検索結果が更新される", () => {
    const { result, rerender } = renderHook(
      ({ todos }) => useTodoSearch(todos, mockDeleteTodo),
      {
        initialProps: { todos: mockTodos },
      }
    );

    act(() => {
      result.current.setSearchKeyword("learn");
    });

    const newTodos = [
      ...mockTodos,
      { id: 4, title: "Learn Testing", completed: false },
    ];

    rerender({ todos: newTodos });

    expect(result.current.filteredTodos).toEqual([
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Learn TypeScript", completed: false },
      { id: 4, title: "Learn Testing", completed: false },
    ]);
  });

  test("onDeleteが正しく呼び出される", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    act(() => {
      result.current.onDelete(1);
    });

    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});
