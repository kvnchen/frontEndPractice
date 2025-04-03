'use client';
import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './provider.js';

export function TasksList() {
  const tasks = useContext(TasksContext);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  )
}

function Task({ task }) {
  const dispatch = useContext(TasksDispatchContext);

  return (
    <label>
      <span>{task.text}</span>
      <input 
        type='checkbox'
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
    </label>
  )
}
