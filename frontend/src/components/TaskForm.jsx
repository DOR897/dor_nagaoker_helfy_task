import { useEffect, useState } from "react";

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }

    setError("");
  }, [editingTask]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    if (!editingTask) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

      {error && <p className="error">{error}</p>}

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="form-actions">
        <button type="submit">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;