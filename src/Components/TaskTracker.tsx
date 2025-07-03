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
import formatDate from "../Helpers/formatDate";
import { colors, theme } from "../theme";

const TaskTracker = () => {
  const [showCompleted, setShowCompleted] = useState(true);

  // Custom hooks
  const { tasks, create, remove, toggle, edit } = useFetchData();
  const {
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
  } = useTaskChanges();

  const isIncomplete = tasks.filter((t) => !t.completed);
  const isCompleted = tasks.filter((t) => t.completed);

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Card>
        <CardHeader sx={{ p: 0, pb: 2 }} title="My Tasks" />

        {/* Create task field*/}
        <TextField
          placeholder="Add a task"
          fullWidth
          value={createTask}
          onChange={(e) => updateCreateTask(e.target.value)}
          error={!!createErrors.title}
          helperText={createErrors.title}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate(create);
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
                  errors={errors}
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
                <IconButton
                  onClick={() => remove(task.id)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      opacity: task.completed ? 1 : 0,
                      color: colors.deleteRed,
                    },
                  }}
                >
                  <DeleteIcon
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        opacity: task.completed ? 1 : 0,
                        color: colors.deleteRed,
                      },
                    }}
                  />
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
