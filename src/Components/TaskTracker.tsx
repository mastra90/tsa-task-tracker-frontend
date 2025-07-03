import EditTask from "./EditTask";
import TaskCheckbox from "./TaskCheckbox";
import { useState } from "react";
import { useFetchData } from "../CustomHooks/useFetchData";
import { useTaskChanges } from "../CustomHooks/useTaskChanges";
import {
  Delete as DeleteIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
  Collapse,
  ListItemButton,
  Card,
  Tooltip,
  CardHeader,
} from "@mui/material";

const TaskTracker = () => {
  const [createTask, setCreateTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Custom hooks
  const { tasks, create, remove, toggle, edit } = useFetchData();
  const { editingId, editValues, startEditing, updateField, handleSave } =
    useTaskChanges();

  const isIncomplete = tasks.filter((t) => !t.completed);
  const isCompleted = tasks.filter((t) => t.completed);

  // Function to format date as "3:13pm 3rd July 25"
  const formatDate = (dateString?: string) => {
    const d = dateString ? new Date(dateString) : new Date();
    const time = d
      .toLocaleTimeString("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    const day = d.getDate();
    const month = d.toLocaleDateString("en-AU", { month: "long" });
    const year = d.getFullYear().toString().slice(-2);
    const suffix =
      day > 3 && day < 21 ? "th" : ["th", "st", "nd", "rd"][day % 10] || "th";
    return `Completed: ${time} ${day}${suffix} ${month} ${year}`;
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Card>
        <CardHeader sx={{ p: 0, pb: 2 }} title="My Tasks" />

        {/* Create task field*/}
        <TextField
          placeholder="Add a task"
          fullWidth
          value={createTask}
          onChange={(e) => setCreateTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              create(createTask);
              setCreateTask("");
            }
          }}
        />

        <List>
          {/* Incomplete tasks */}
          {isIncomplete.map((task) => (
            <ListItem disableGutters key={task.id}>
              <TaskCheckbox task={task} onToggle={toggle} />
              {editingId !== task.id && (
                <Tooltip placement="right" title="Edit task">
                  <ListItemText
                    onClick={() => startEditing(task)}
                    sx={{ cursor: "pointer" }}
                    primary={task.title}
                    secondary={task.description}
                  />
                </Tooltip>
              )}

              {/* Editing tasks */}
              {editingId === task.id && (
                <EditTask
                  title={editValues.title}
                  description={editValues.description}
                  onTitleChange={(value) => updateField("title", value)}
                  onDescriptionChange={(value) =>
                    updateField("description", value)
                  }
                  onSave={() => handleSave(edit)}
                />
              )}
            </ListItem>
          ))}

          {/* Completed collapsible */}
          {isCompleted.length > 0 && (
            <ListItemButton
              disableRipple
              onClick={() => setShowCompleted((prev) => !prev)}
            >
              <ListItemText primary={`Completed (${isCompleted.length})`} />
              {showCompleted ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          )}

          {/* Completed tasks */}
          {isCompleted.map((task) => (
            <Collapse in={showCompleted} key={task.id}>
              <ListItem>
                <TaskCheckbox task={task} onToggle={toggle} />
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={"medium"}
                      sx={{ textDecoration: "line-through" }}
                    >
                      {task.title}
                      <br></br>
                    </Typography>
                  }
                  secondary={formatDate(task.updatedAt)}
                />
                <IconButton onClick={() => remove(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Collapse>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default TaskTracker;
