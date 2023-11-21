import "./App.css";
import React, { useState } from "react";


const App = () => {

  const [todos, settodos] = useState([]);
  const [value, setvalue] = useState("");
  const [editing, setediting] = useState(false);
  const [currentid, setcurrentid] = useState("");
  const [currentValue, setcurrentValue] = useState("");


  const onChange = (e) => {
    setvalue(e.target.value)
  };
  const onAddTask = (e) => {
    e.preventDefault();

    const obj = {
      name: value,
      id: Date.now(),
    };
    if (value !== "") {
      settodos(todos.concat(obj));
      setvalue("")
    }
  };

  const onDeleteTask = (itemId) => {
    settodos([...todos].filter(id => id.id !== itemId))
  }

  const onEditTodo = (id, newValue) => {
    todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  };

  const onSubmitEditTodo = (e) => {
    e.preventDefault();
    onEditTodo(currentid, currentValue);
    setediting(false)

  };

  const onToggleEdit = (todo) => {
    setediting(true)
    setcurrentValue(todo.name);
    setcurrentid(todo.id)
    setcurrentTodo(todo)

  };

  const onEditInputChange = (e) => {
    setcurrentValue(e.target.value);

  };


  const mylist = todos.map((todo) => (
    <li className="todo_item">
      {todo.name}

      <button onClick={onToggleEdit(todo)}>Edit</button>
      <button onClick={onDeleteTask(todo.id)}>Remove</button>
    </li>
  ));

  return (
    <>
      <div className="App">
        {editing === false ? (
          <form onSubmit={onAddTask}>
            <input
              placeholder="typeyour task"
              value={value}
              onChange={onChange}
            />
            <button onClick={onAddTask}>Add Item</button>
          </form>
        ) : (
          <form onSubmit={onSubmitEditTodo}>
            <input
              placeholder="edit your task"
              value={currentTodo.name}
              name={currentTodo.name}
              onChange={onEditInputChange}
            />
            <button onClick={onSubmitEditTodo}>Update Item</button>
          </form>
        )}

        <ul className="todo_wrapper">{mylist}</ul>
      </div>
    </>
  );

}

export default App;