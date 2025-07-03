import { getAllTasks, createTask, updateTask, deleteTask, Task } from "./api";
import { useState, useEffect } from "react";

// Custom hook for task management 
// Handles fetching, creating, updating, and deleting tasks
export const useTasks = () => {
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

  const add = async (title: string) => {
    if (!title) return;
    try {
      const newTask = await createTask(title);
      setTaskMap((prev) => new Map(prev).set(newTask.id, newTask));
    } catch (error) {
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

  const edit = async (id: number, updates: Partial<Task>) => {
    try {
      const result = await updateTask(id, updates);
      setTaskMap((prev) => new Map(prev).set(id, result));
    } catch (error) {
      console.error(error);
    }
  };

  const tasks = Array.from(taskMap.values());
  return { tasks, taskMap, add, remove, toggle, edit };
};

// Custom hook for state management 
export const useTaskEdit = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const start = (task: Task) => {
    setEditingId(task.id);
    setEditValues({
      title: task.title,
      description: task.description || "",
    });
  };

  const save = async (taskEdit: any) => {
    if (editingId) {
      await taskEdit(editingId, {
        title: editValues.title,
        description: editValues.description,
      });
      setEditingId(null);
    }
  };

  const updateField = (field: keyof typeof editValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  return { editingId, editValues, start, save, updateField };
};
