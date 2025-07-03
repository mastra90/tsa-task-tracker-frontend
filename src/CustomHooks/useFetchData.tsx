import { getAllTasks, createTask, updateTask, deleteTask, Task } from "../api";
import { useState, useEffect } from "react";

// Custom hook for task data and API operations
// Handles fetching, creating, updating, deleting with local state
export const useFetchData = () => {
  const [taskMap, setTaskMap] = useState(new Map<number, Task>());

  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        const map = new Map();
        tasks.forEach((task) => map.set(task.id, task));
        setTaskMap(map);
      })
      .catch(console.error);
  }, []);

  const create = async (title: string) => {
    if (!title) return;
    try {
      const newTask = await createTask(title);
      setTaskMap((prev) => new Map(prev).set(newTask.id, newTask));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const edit = async (id: number, updates: Partial<Task>) => {
    try {
      const result = await updateTask(id, updates);
      setTaskMap((prev) => new Map(prev).set(id, result));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const toggle = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    setTaskMap((prev) => new Map(prev).set(task.id, updatedTask));

    try {
      const result = await updateTask(task.id, {
        title: task.title,
        description: task.description || "",
        completed: !task.completed,
      });
      setTaskMap((prev) => new Map(prev).set(task.id, result));
    } catch (error) {
      setTaskMap((prev) => new Map(prev).set(task.id, task));
      console.error(error);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteTask(id);
      setTaskMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const tasks = Array.from(taskMap.values());
  return { create, edit, toggle, remove, tasks, taskMap };
};
