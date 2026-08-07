const Backend_API_URL = "http://localhost:4000/api/tasks";

export async function getTasks() {
  const response = await fetch(Backend_API_URL);

  if (!response.ok) {
    throw new Error("Error'Failed to get tasks");
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(Backend_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create new task");
  }

  return response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${Backend_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function toggleTask(id) {
  const response = await fetch(`${Backend_API_URL}/${id}/toggle`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle task");
  }

  return response.json();
}