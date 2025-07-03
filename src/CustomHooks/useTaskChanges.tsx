import { useState } from "react";
import { Task, ValidationErrors } from "../api";

// Custom hook for inline editing state and create task
// Handles editing form state, field updates, and save operations
export const useTaskChanges = () => {
  const [createTask, setCreateTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [createErrors, setCreateErrors] = useState<ValidationErrors>({});
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
    setErrors({});
  };

  const updateField = (field: keyof typeof editValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateCreateTask = (value: string) => {
    setCreateTask(value);
    if (createErrors.title) setCreateErrors({});
  };

  const formatErrors = (messages: string[]) => {
    const formatted: ValidationErrors = {};
    messages.forEach((msg) => {
      if (msg.includes("Title")) formatted.title = msg;
      else if (msg.includes("Description")) formatted.description = msg;
    });
    return formatted;
  };

  const handleSave = async (taskUpdate: any) => {
    if (editingId) {
      try {
        await taskUpdate(editingId, {
          title: editValues.title,
          description: editValues.description,
        });
        setEditingId(null);
        setErrors({});
      } catch (error: any) {
        if (error?.data?.message && Array.isArray(error.data.message)) {
          setErrors(formatErrors(error.data.message));
        }
      }
    }
  };

  const handleCreate = async (createFn: any) => {
    try {
      await createFn(createTask);
      setCreateTask("");
      setCreateErrors({});
    } catch (error: any) {
      if (error?.data?.message && Array.isArray(error.data.message)) {
        setCreateErrors(formatErrors(error.data.message));
      }
    }
  };

  return {
    editingId,
    editValues,
    startEditing,
    updateField,
    handleSave,
    errors,
    createTask,
    createErrors,
    updateCreateTask,
    handleCreate,
  };
};
