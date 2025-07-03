export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  updatedAt?: string;
};

export type ValidationErrors = {
  title?: string;
  description?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return await response.json();
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title }),
  });
  if (!response.ok) {
    throw Object.assign(
      new Error(`Failed to create task: ${response.statusText}`),
      { data: await response.json() }
    );
  }
  return await response.json();
};

export const updateTask = async (
  id: number,
  updates: Partial<Omit<Task, "id">>
): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw Object.assign(
      new Error(`Failed to update task ${id}: ${response.statusText}`),
      { data: await response.json() }
    );
  }
  return await response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task ${id}: ${response.statusText}`);
  }
};
