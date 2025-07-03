import EditTask from "./EditTask";
import TaskCheckbox from "./TaskCheckbox";
import { useState, useEffect } from "react";
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
  CircularProgress,
  Box,
} from "@mui/material";
import formatDate from "../Helpers/formatDate";
import { colors, theme } from "../theme";
import NoTasksView from "./NoTasksView";

const TaskTracker = () => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [showLoadingCard, setShowLoadingCard] = useState(true);

  // Custom hooks - destructure loading from useFetchData
  const { tasks, create, remove, toggle, edit, loading } = useFetchData();
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

  // Show loading card for minimum 1500ms to show loading state working
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingCard(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const isIncomplete = tasks.filter((t) => !t.completed);
  const isCompleted = tasks.filter((t) => t.completed);
  const noTasks = !isCompleted.length && !isIncomplete.length;

  const allTasksCompleted = () => {
    return isCompleted.length && !isIncomplete.length;
  };

  const AllCompletedView = () =>
    allTasksCompleted() ? <NoTasksView variant="all-completed" /> : <></>;

  const LoadingCard = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 320,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: colors.checkedGreen }} size={48} />
      <Typography variant="body2" color="text.secondary">
        Loading tasks...
      </Typography>
    </Box>
  );

  if (showLoadingCard || loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Card>
          <CardHeader sx={{ p: 0, pb: 2 }} title="My Tasks" />
          <LoadingCard />
        </Card>
      </Container>
    );
  }

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

        {/* Incomplete tasks */}
        <List>
          {isIncomplete.map((task) => (
            <ListItem
              disableGutters
              key={task.id}
              sx={{
                display: allTasksCompleted() && !noTasks ? "none" : "flex",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "translateY(0)",
                opacity: 1,
                animation: "slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: colors.hover,
                  transform: "translateX(4px)",
                },
                "@keyframes slideDown": {
                  from: {
                    transform: "translateY(-10px)",
                    opacity: 0,
                  },
                  to: {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                },
              }}
            >
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

          {/* Render when all tasks are marked as completed*/}
          <AllCompletedView />

          {/* Completed tasks */}
          {isCompleted.length > 0 && (
            <ListItemButton
              disableRipple
              onClick={() => setShowCompleted((prev) => !prev)}
              sx={{
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: colors.hover,
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemText primary={`Completed (${isCompleted.length})`} />
              {showCompleted ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          )}

          {/* Completed tasks */}
          {isCompleted.map((task) => (
            <Collapse in={showCompleted} key={task.id}>
              <ListItem
                sx={{
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: "translateY(0)",
                  opacity: 1,
                  animation: "slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: colors.hover,
                    transform: "translateX(4px)",
                  },
                  "@keyframes slideDown": {
                    from: {
                      transform: "translateY(-10px)",
                      opacity: 0,
                    },
                    to: {
                      transform: "translateY(0)",
                      opacity: 1,
                    },
                  },
                }}
              >
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
                    </Typography>
                  }
                  secondary={formatDate(task.updatedAt)}
                />
                <IconButton
                  onClick={() => remove(task.id)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      opacity: 1,
                      color: colors.deleteRed,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Collapse>
          ))}
        </List>

        {/* No Tasks view */}
        {noTasks ? <NoTasksView variant="no-tasks" /> : <></>}
      </Card>
    </Container>
  );
};

export default TaskTracker;
