import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useTodoSearch } from "../components/useTodoSearch";
import { Todo } from "../types/Todo";

describe("useTodoSearch", () => {
  const mockTodos: Todo[] = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Learn TypeScript", completed: false },
    { id: 3, title: "Read Documentation", completed: true },
  ];

  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    mockDeleteTodo.mockClear();
  });

  test("初期状態が正しく設定されている", () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    expect(result.current.searchKeyword).toBe("");
    expect(result.current.filteredTodos).toEqual(mockTodos);
  });

  test("検索キーワードで正しくフィルタリングされる", async () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    // 状態更新をactで囲む
    await act(async () => {
      result.current.setSearchKeyword("learn");
    });

    // useEffectの実行を待つ
    await act(async () => {
      // 少し待機して状態の更新を確実にする
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.filteredTodos).toEqual([
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Learn TypeScript", completed: false },
    ]);
  });

  test("大文字小文字を区別せずに検索できる", async () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    await act(async () => {
      result.current.setSearchKeyword("LEARN");
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.filteredTodos).toEqual([
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Learn TypeScript", completed: false },
    ]);
  });

  test("検索結果が0件の場合、空配列を返す", async () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    await act(async () => {
      result.current.setSearchKeyword("xyz");
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.filteredTodos).toEqual([]);
  });

  test("onDeleteが正しく呼び出される", async () => {
    const { result } = renderHook(() =>
      useTodoSearch(mockTodos, mockDeleteTodo)
    );

    await act(async () => {
      result.current.onDelete(1);
    });

    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});
