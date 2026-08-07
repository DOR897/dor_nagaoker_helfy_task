import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);

  const multiple = tasks.length > 1;

  const slides = multiple
    ? [tasks[tasks.length - 1], ...tasks, tasks[0]]
    : tasks;

  useEffect(() => {
    setAnimated(false);
    setIndex(multiple ? 1 : 0);

    const timer = setTimeout(() => {
      setAnimated(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [tasks.length, multiple]);

  useEffect(() => {
    if (!multiple) return;

    const timer = setInterval(() => {
      setIndex((current) => current + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [multiple]);

  function next() {
    if (multiple) {
      setIndex((current) => current + 1);
    }
  }

  function previous() {
    if (multiple) {
      setIndex((current) => current - 1);
    }
  }

  function handleTransitionEnd() {
    if (!multiple) return;

    if (index === slides.length - 1) {
      setAnimated(false);
      setIndex(1);

      setTimeout(() => setAnimated(true), 50);
    }

    if (index === 0) {
      setAnimated(false);
      setIndex(slides.length - 2);

      setTimeout(() => setAnimated(true), 50);
    }
  }

  if (tasks.length === 0) {
    return <p className="empty">No tasks found.</p>;
  }

  return (
    <section className="carousel">
      <button
        className="carousel-btn"
        onClick={previous}
        disabled={!multiple}
      >
        ‹
      </button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animated
              ? "transform 0.45s ease"
              : "none",
          }}
        >
          {slides.map((task, slideIndex) => (
            <div
              className="carousel-slide"
              key={`${task.id}-${slideIndex}`}
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-btn"
        onClick={next}
        disabled={!multiple}
      >
        ›
      </button>
    </section>
  );
}

export default TaskList;