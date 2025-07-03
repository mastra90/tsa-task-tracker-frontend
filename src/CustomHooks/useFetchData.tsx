import { getAllTasks, createTask, updateTask, deleteTask, Task } from "../api";
import { useState, useEffect } from "react";

// Custom hook for task data and API operations
// Handles fetching, creating, updating, deleting with local state
export const useFetchData = () => {
  const [taskMap, setTaskMap] = useState(new Map<number, Task>());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const tasks = await getAllTasks();
        const map = new Map();
        tasks.forEach((task) => map.set(task.id, task));
        setTaskMap(map);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const create = async (title: string) => {
    if (!title) return;
    
    setError(null);
    try {
      const newTask = await createTask(title);
      setTaskMap((prev) => new Map(prev).set(newTask.id, newTask));
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task. Please try again.");
      throw error;
    }
  };

  const edit = async (id: number, updates: Partial<Task>) => {
    setError(null);
    try {
      const result = await updateTask(id, updates);
      setTaskMap((prev) => new Map(prev).set(id, result));
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Failed to update task. Please try again.");
      throw error;
    }
  };

  const toggle = async (task: Task) => {
    // Optimistically update the UI
    const updatedTask = { ...task, completed: !task.completed };
    setTaskMap((prev) => new Map(prev).set(task.id, updatedTask));

    setError(null);
    try {
      const result = await updateTask(task.id, {
        title: task.title,
        description: task.description || "",
        completed: !task.completed,
      });
      setTaskMap((prev) => new Map(prev).set(task.id, result));
    } catch (error) {
      // Revert the optimistic update on error
      setTaskMap((prev) => new Map(prev).set(task.id, task));
      console.error("Failed to toggle task:", error);
      setError("Failed to update task. Please try again.");
    }
  };

  const remove = async (id: number) => {
    setError(null);
    try {
      await deleteTask(id);
      setTaskMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError("Failed to delete task. Please try again.");
      throw error;
    }
  };

  const tasks = Array.from(taskMap.values());
  
  return { 
    create, 
    edit, 
    toggle, 
    remove, 
    tasks, 
    taskMap, 
    loading, 
    error 
  };
};