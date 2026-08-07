const express = require("express");

const router = express.Router();

const Priorities = ["low", "medium", "high"]; 

let tasks = [
  {
    id: 1,
    title: "wash your hands a face",
    description: "Wake up and clean your face  and hands",
    completed: true,
    createdAt: new Date().toISOString(),
    priority: "high"
  },
  {
    id: 2,
    title: "brush your teeth",
    description: "",
    completed: false,
    createdAt: new Date().toISOString(),
    priority: "medium"
  },
  {
    id: 3,
    title: "strech out ",
    description: "do some streches if u feel weak",
    completed: false,
    createdAt: new Date().toISOString(),
    priority: "low"
  }
];




router.get("/", (req, res) => {
  res.json(tasks);
});


router.post("/", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is neccesery"
    });
  }

  if (!Priorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium or high"
    });
  }

  const task = {
    id: Date.now(),
    title: title.trim(),
    description: description?.trim() || "",
    completed: false,
    createdAt: new Date().toISOString(),
    priority
  };

  tasks.push(task);

  res.status(201).json(task);
});


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task isn't exist"
    });
  }

  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  if (!Priorities.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority"
    });
  }

  task.title = title.trim();
  task.description = description?.trim() || "";
  task.priority = priority;

  res.json(task);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskExists = tasks.some(task => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      message: "Task isn't exist"
    });
  }

  tasks = tasks.filter(task => task.id !== id);

  res.status(204).send();
});


router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.completed = !task.completed;

  res.json(task);
});


module.exports = router;