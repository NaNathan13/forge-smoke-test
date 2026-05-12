import { renderHook, act } from "@testing-library/react";
import { useTodos } from "../useTodos";

beforeEach(() => {
  localStorage.clear();
});

describe("useTodos", () => {
  it("starts with an empty array when localStorage is empty", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  it("addTodo adds a todo with correct fields", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Buy milk");
    });

    expect(result.current.todos).toHaveLength(1);
    const todo = result.current.todos[0];
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(typeof todo.id).toBe("string");
    expect(todo.id.length).toBeGreaterThan(0);
    expect(typeof todo.createdAt).toBe("number");
  });

  it("toggleTodo flips the completed boolean", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Walk the dog");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it("deleteTodo removes the item by id", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("First");
      result.current.addTodo("Second");
      result.current.addTodo("Third");
    });

    expect(result.current.todos).toHaveLength(3);
    const idToDelete = result.current.todos[1].id;

    act(() => {
      result.current.deleteTodo(idToDelete);
    });

    expect(result.current.todos).toHaveLength(2);
    expect(result.current.todos.map((t) => t.text)).toEqual([
      "First",
      "Third",
    ]);
  });

  it("persists todos to localStorage", () => {
    const { result, unmount } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Persisted todo");
    });

    // Force effect flush
    unmount();

    const stored = JSON.parse(localStorage.getItem("forge-todos") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe("Persisted todo");
  });

  it("loads existing todos from localStorage on mount", () => {
    const existing = [
      { id: "abc", text: "Existing", completed: true, createdAt: 1000 },
    ];
    localStorage.setItem("forge-todos", JSON.stringify(existing));

    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual(existing);
  });
});
