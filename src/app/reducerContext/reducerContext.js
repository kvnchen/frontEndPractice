'use client';
import { TasksProvider } from './provider.js';
import { TasksList } from './taskList.js';

export function Tasks() {
  return (
    <TasksProvider>
      <h1>Day off in Victoria</h1>
      <TasksList />
    </TasksProvider>
  )
}
