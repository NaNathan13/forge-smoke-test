import { useState, useEffect } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "forge-todos";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Todo[];
    }
  } catch {
    // Corrupted data — start fresh
  }
  return [];
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text: string): void {
    setTodos((prev) => [
      ...prev,
      {
        id: generateId(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return { todos, addTodo, toggleTodo, deleteTodo } as const;
}
