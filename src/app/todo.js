'use client';
import { useState } from 'react';

export function ToDo({ seed }) {
  const [tasks, setTasks] = useState(seed);

  function renderTasks() {
    function removeTask(text) {
      setTasks(tasks.filter((t) => t !== text));
    }

    const output = [];

    for (let i = 0; i < tasks.length; i++) {
      output.push(
      <li key={i}>
        <span>{tasks[i] + ' '}</span>
        <button type="button" onClick={() => removeTask(tasks[i])}>
          Delete
        </button>
      </li>
      );
    }

    return output;
  }

  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    const {task} = formJson;

    setTasks([...tasks, task]);
  }

  return (
    <div>
      <h1>To Do List</h1>
      <form action={onSubmit}>
        <div>
          <input type="text" name="task" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        {renderTasks()}
      </ul>
    </div>
  )
}