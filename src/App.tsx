import { useTodos } from "./hooks/useTodos";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">Forge Todo</h1>
        <AddTodoForm onAdd={addTodo} />
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet — add one above!</p>
        ) : (
          <>
            <ul className="todo-list">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
            <p className="item-count">
              {remaining} {remaining === 1 ? "item" : "items"} remaining
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
