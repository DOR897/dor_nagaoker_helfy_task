function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <h2>{task.title}</h2>

        <span className={`priority ${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description || "No description"}</p>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      <small>
        Created: {new Date(task.createdAt).toLocaleString()}
      </small>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Complete"}
        </button>

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;