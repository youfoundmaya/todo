import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import {
  createTodo,
  removeTodo,
  fetchTodo,
  updateTodo,
} from "../actions/todoActions";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await fetchTodo();
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          throw new Error("Invalid data structure: Expected an array");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }

    try {
      const data = await createTodo(title, desc);
      if (data && data._id) {
        setTodos([...todos, data]);
        setTitle("");
        setDesc("");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemove = async (todoTitle) => {
    try {
      await removeTodo(todoTitle);
      setTodos(todos.filter((todo) => todo.title !== todoTitle));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newTitle.trim() === "" && desc.trim() === "") {
      alert("At least one field (title or description) is required");
      return;
    }

    try {
      const data = await updateTodo(editTitle, newTitle, desc);
      if (data && data._id) {
        setTodos(todos.map((todo) => (todo.title === editTitle ? data : todo)));
        setEditMode(false);
        setEditTitle("");
        setNewTitle("");
        setDesc("");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4 font-weight-bold">Todo App</h1>
      <Form
        onSubmit={editMode ? handleUpdate : handleSubmit}
        className="mb-4 w-75"
      >
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={editMode ? newTitle : title}
            onChange={(e) =>
              editMode ? setNewTitle(e.target.value) : setTitle(e.target.value)
            }
            placeholder={editMode ? "New Title" : "Title"}
            required={!editMode}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          {editMode ? "Update Todo" : "Add Todo"}
        </Button>
      </Form>

      <div className="w-100">
        {todos.length === 0 ? (
          <p>No todos available</p>
        ) : (
          todos.map((todo) =>
            todo && todo._id ? (
              <Card key={todo._id} className="mb-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className="mb-1">{todo.title}</Card.Title>
                    <Card.Text>{todo.desc}</Card.Text>
                  </div>
                  <div>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setEditMode(true);
                        setEditTitle(todo.title);
                        setNewTitle(todo.title);
                        setDesc(todo.desc);
                      }}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(todo.title)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ) : null
          )
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default TodoApp;
