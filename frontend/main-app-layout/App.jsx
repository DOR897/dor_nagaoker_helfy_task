import { useEffect, useMemo, useState } from "react";

import TaskForm from "../src/components/TaskForm";
import TaskFilter from "../src/components/TaskFilter";
import TaskList from "../src/components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../src/services/api";

import "../src/styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(taskData) {
    try {
      setError("");

      if (editingTask) {
        const updated = await updateTask(
          editingTask.id,
          taskData
        );

        setTasks((current) =>
          current.map((task) =>
            task.id === updated.id ? updated : task
          )
        );

        setEditingTask(null);
      } else {
        const created = await createTask(taskData);

        setTasks((current) => [
          ...current,
          created,
        ]);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);

      setTasks((current) =>
        current.filter((task) => task.id !== id)
      );

      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id);

      setTasks((current) =>
        current.map((task) =>
          task.id === updated.id ? updated : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return (
    <main className="app">
      <header>
        <h1>Task Manager</h1>
        <p>Create, update and organize your tasks.</p>
      </header>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <TaskForm
        editingTask={editingTask}
        onSubmit={handleSubmit}
        onCancel={() => setEditingTask(null)}
      />

      <TaskFilter
        value={filter}
        onChange={setFilter}
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </main>
  );
}

export default App;