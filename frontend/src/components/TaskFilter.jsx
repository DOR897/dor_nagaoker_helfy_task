function TaskFilter({ value, onChange }) {
  return (
    <div className="filters">
      <button
        className={value === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        All
      </button>

      <button
        className={value === "completed" ? "active" : ""}
        onClick={() => onChange("completed")}
      >
        Completed
      </button>

      <button
        className={value === "pending" ? "active" : ""}
        onClick={() => onChange("pending")}
      >
        Pending
      </button>
    </div>
  );
}

export default TaskFilter;