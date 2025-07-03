export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  updatedAt?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (title: string): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  updates: Partial<Omit<Task, "id">>
): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task ${id}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};
