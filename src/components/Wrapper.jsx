import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

export const Wrapper = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("localTodos")) {
      const storedList = JSON.parse(localStorage.getItem("localTodos"));
      setTodos(storedList);
    }
  }, []);

  const addTodo = () => {
    if (input.trim()) {
      const todo = {
        id: Date.now(),
        text: input,
        completed: false,
        isEditing: false,
      };
      setTodos([...todos, todo]);

      localStorage.setItem("localTodos", JSON.stringify([...todos, todo]));
      setInput("");
    }
  };

  const editTodo = (text, id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text, isEditing: !t.isEditing } : t
      )
    );
  };

  const deleteTodo = (todo) => {
    const deletedTodo = todos.filter((t) => t.id !== todo.id);
    setTodos(deletedTodo);
    localStorage.setItem("localTodos", JSON.stringify(deletedTodo));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          TODO LIST ✅
        </h1>
        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Add a new todo"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center  p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                className="mr-2 h-5 w-5 text-blue-600"
              />
              <span
                className={`flex-grow ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.isEditing ? (
                  <EditTodo task={todo} editTask={editTodo} />
                ) : (
                  todo.text
                )}
              </span>

              {!todo.isEditing ? (
                <button
                  className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, isEditing: !t.isEditing } : t
                      )
                    );
                  }}
                >
                  Edit
                </button>
              ) : null}

              <button
                className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => deleteTodo(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wrapper;
