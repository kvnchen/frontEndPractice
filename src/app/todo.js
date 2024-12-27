'use client';
import { useState } from 'react';

export function ToDo({ seed }) {

  let monotonic = 0;
  const deleted = new Set();

  function createTask(text) {
    const k = monotonic;
    monotonic++;

    // something weird happens where previously deleted things reappear in tasks 
    // if I don't explicitly track deleted elements...
    function removeTask() {
      const temp = [];
      deleted.add(k);

      for (let i = 0; i < tasks.length; i++) {
        if (!deleted.has(Number(tasks[i].key)))
          temp.push(tasks[i]);
      }
      setTasks(temp);
    }

    return (
      <li key={k}>
        <span>{text + ' '}</span><button type="button" onClick={removeTask}>Delete</button>
      </li>
    )
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const {task} = formJson;


    setTasks([...tasks, createTask(task)]);
  }

  const initialTasks = [];

  for (const item of seed) {
    initialTasks.push(createTask(item));
  }

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="task" required/>
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        {...tasks}
      </ul>
    </div>
  )
}