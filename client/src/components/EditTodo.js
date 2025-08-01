import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const editTodo = async (id) => {
    try {
      const body = { description };
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.error("Edit failed:", error.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
        style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '5px' }}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby={`label${todo.todo_id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: '10px' }}>

            <div className="modal-header" style={{ backgroundColor: '#f8f9fa' }}>
              <h1 className="modal-title fs-5" id={`label${todo.todo_id}`}>Edit To-Do</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }}
              />
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => editTodo(todo.todo_id)}
                style={{ padding: '8px 16px', fontWeight: 'bold' }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ padding: '8px 16px' }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
