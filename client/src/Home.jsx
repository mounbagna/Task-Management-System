import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api_base = 'http://127.0.0.1:8000';

function Home() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [displayPopupActive, setDisplayPopupActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = async () => {
    try {
      const response = await axios.get(api_base + '/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const DisplayTasks = async () => {
    try {
      const response = await axios.get(api_base + '/todos/tasks');
      setTodos(response.data);
      setDisplayPopupActive(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

    // Function to filter tasks based on search term
    const filterTasks = () => {
      return todos.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

  const completeTodo = async (id) => {
    const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }));
  }

  {/*const addTodo = async () => {
    try {
      const response = await axios.post(api_base + "/todo/new", {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate
      });

      const data = response.data;
      setTodos([...todos, data]);
      setPopupActive(false);
      alert('Task added successfully')
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };*/}

  {/*const editTask = async () => {
    try {
      const response = await axios.put(api_base + '/todo/update/' + title, {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate
      });
  
      const data = response.data;
      setTodos(todos => todos.map(todo => {
        if (todo.title === data.title) {
          todo.title = data.title;
          todo.description = data.description;
          todo.priority = data.priority;
          todo.dueDate = data.dueDate;
        }
        return todo;
      }));
      setEditPopupActive(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };*/}
  

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
    alert('Task deleted successfully.If Connection with database is lost, save again the index.js file at the server site then refresh the page.');
  }

  return (
    <div className="App">
      <h1><center><u><strong>USER PAGE</strong></u></center></h1>
      <br /><br />
      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br /><br />
      <h4>Your tasks</h4>
      <div className="todos">
      {filterTasks().length > 0 ? filterTasks().map(filteredTodo => (
  <div
    className={"todo" + (filteredTodo.complete ? " is-complete" : "")}
    key={filteredTodo._id}
    onClick={() => completeTodo(filteredTodo._id)}
  >
    <div className="checkbox"></div>

    <div className="text">{filteredTodo.title}</div>

    {/*<div className="delete-todo" onClick={() => deleteTodo(filteredTodo._id)}>x</div>*/}
  </div>
)) : (
  <p>No matching tasks found</p>
)}

      </div>

      <br /><br /><br />
      <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
        Back to Login page
      </Link>
      <br /><br /><br />

      <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
        Back to Signup page
      </Link>
      <br /><br /><br />

      <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
        Back to Homepage page
      </Link>

      {/*<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>*/}
      {/*popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              placeholder='Enter title'
              onChange={e => setTitle(e.target.value)}
              value={title}
            /> <br /><br />
            <textarea
              rows="5"
              cols="5"
              className="add-todo-input"
              placeholder='Enter description'
              onChange={e => setDescription(e.target.value)}
              value={description}
            /><br /><br />
            <label htmlFor="priority">Priority</label>
            <input
              list="priorities"
              id="priority"
              name="priority"
              placeholder="Type to search"
              onChange={e => setPriority(e.target.value)}
              value={priority}
            />
            <datalist id="priorities">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </datalist>
            <br /><br />
            <input
              type="text"
              className="add-todo-input"
              placeholder='Enter due date'
              onChange={e => setDueDate(e.target.value)}
              value={dueDate}
            />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ) : ''*/}

      <br /><br /><br />
      {/*<div className="editPopup" onClick={() => setEditPopupActive(true)}>Edit</div>*/}
      {/*editPopupActive ? (
        <div className="ePopup">
          <div className="closePopup" onClick={() => setEditPopupActive(false)}>X</div>
          <div className="content">
            <h3>Edit Task</h3>
            <input
              type="text"
              className="add-todo-input"
              placeholder='Enter title'
              onChange={e => setTitle(e.target.value)}
              value={title}
            /> <br /><br />
            <textarea
              rows="5"
              cols="5"
              className="add-todo-input"
              placeholder='Enter description'
              onChange={e => setDescription(e.target.value)}
              value={description}
            /><br /><br />
            <label htmlFor="priority">Priority</label>
            <input
              list="priorities"
              id="priority"
              name="priority"
              placeholder="Click or type to search"
              onChange={e => setPriority(e.target.value)}
              value={priority}
            />
            <datalist id="priorities">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </datalist>
            <br /><br />
            <input
              type="text"
              className="add-todo-input"
              placeholder='Enter due date'
              onChange={e => setDueDate(e.target.value)}
              value={dueDate}
            />
            <div className="button" onClick={editTask}>Update Task</div>
          </div>
        </div>
      ) : ''*/}

<br /><br />
      <div className="displayPopup" onClick={() => setDisplayPopupActive(true)}>Display</div>
      {displayPopupActive ? (
        <div className="dPopup">
          <div className="closePopup" onClick={() => setDisplayPopupActive(false)}>X</div>
          <div className="content">
            <h1><center><u><strong>ALL AVAILABLE TASKS</strong></u></center></h1>
            <br /><br />
            <div className="todos">
              {todos.length > 0 ? todos.map(todo => (
                <div key={todo._id}>
                  <div className="text">Title: {todo.title}</div>
                  <div className="text">Description: {todo.description}</div>
                  <div className="text">Priority: {todo.priority}</div>
                  <div className="text">Create Date: {todo.createDate}</div>
                  <div className="text">Due Date: {todo.dueDate}</div>
                  <br /><br />
                </div>
              )) : (
                <p>You currently have no tasks</p>
              )}
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default Home;
