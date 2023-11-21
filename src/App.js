import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [todos, settodos] = useState([]);
  const [value, setvalue] = useState("");
  const [editing, setediting] = useState(false);
  const [currentid, setcurrentid] = useState("");
  const [currentValue, setcurrentValue] = useState("");
  const [currentTodo, setcurrentTodo] = useState(null);

  const onChange = (e) => {
    setvalue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      // If editing, update the existing todo
      onEditTodo(currentid, currentValue);
      setediting(false);
    } else {
      // If not editing, add a new todo
      const obj = {
        name: value,
        id: Date.now(),
      };
      if (value !== "") {
        settodos(todos.concat(obj));
        setvalue("");
      }
    }
  };

  const onEditTodo = (id, newValue) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, name: newValue } : todo))
    );
  };

  const onToggleEdit = (todo) => {
    setediting(true);
    setcurrentValue(todo.name);
    setcurrentid(todo.id);
    setcurrentTodo(todo);
  };

  const onEditInputChange = (e) => {
    setcurrentValue(e.target.value);
  };

  const onDeleteTask = (itemId) => {
    settodos(todos.filter((id) => id.id !== itemId));
  };

  const mylist = todos.map((todo) => (
    <li key={todo.id} className="todo_item">
      {todo.name}
      <button onClick={() => onToggleEdit(todo)}>Edit</button>
      <button onClick={() => onDeleteTask(todo.id)}>Remove</button>
    </li>
  ));

  return (
    <div>
      <div className="App">
        <form onSubmit={onSubmit}>
          <input
            placeholder={editing ? "Edit your task" : "Type your task"}
            value={editing ? currentValue : value}
            onChange={editing ? onEditInputChange : onChange}
          />
          <button type="submit">{editing ? "Update Item" : "Add Item"}</button>
        </form>

        <ul className="todo_wrapper">{mylist}</ul>
      </div>
    </div>
  );
};

export default App;
