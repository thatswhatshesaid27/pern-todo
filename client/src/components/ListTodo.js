import React, { useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Fetch
  const getTodo = async () => {
    try {
      const res = await fetch("https://pern-todo-3.onrender.com/todos");
      const todosArray = await res.json();

      if (Array.isArray(todosArray)) {
        setTodos(todosArray);
      } else {
        console.error("Unexpected response format:", todosArray);
      }
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  // Delete
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://pern-todo-3.onrender.com/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">To-Do List</h2>
      <table className="table table-bordered table-hover text-center">
        <thead className="thead-light">
          <tr>
            <th>To-Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((val) =>
            val && val.todo_id ? (
              <tr key={val.todo_id}>
                <td>{val.description}</td>
                <td><EditTodo todo={val} /></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(val.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
