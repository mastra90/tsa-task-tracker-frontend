import { useState } from "react";
import { Task } from "../api";

// Custom hook for inline editing state
// Handles editing form state, field updates, and save operations
export const useTaskChanges = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditValues({
      title: task.title,
      description: task.description || "",
    });
  };

  const updateField = (field: keyof typeof editValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (taskUpdate: any) => {
    if (editingId) {
      await taskUpdate(editingId, {
        title: editValues.title,
        description: editValues.description,
      });
      setEditingId(null);
    }
  };

  return { editingId, editValues, startEditing, updateField, handleSave };
};
