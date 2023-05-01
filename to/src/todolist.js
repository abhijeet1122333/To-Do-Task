import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = (title) => {
    axios.post('/api/todos', { title })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
  };

  const editTodo = (id, title) => {
    axios.put(`/api/todos/${id}`, { title })
      .then(res => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === res.data._id) {
            return res.data;
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch(err => console.log(err));
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(res => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(e.target.elements.title.value);
        e.target.elements.title.value = '';
      }}>
        <input type="text" name="title" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoList;