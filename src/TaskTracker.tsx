import { useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
  Collapse,
  ListItemButton,
  Card,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Check as CheckIcon,
  ExpandMore,
  ExpandLess,
  CircleOutlined as CheckedIcon,
  CheckCircle as UncheckedIcon,
} from "@mui/icons-material";
import { useTaskEdit, useTasks } from "./CustomHooks";
import { Task } from "./api";

const TaskTracker = () => {
  const { tasks, taskMap, add, remove, toggle, edit } = useTasks();
  const { editingId, editValues, start, save, updateField } = useTaskEdit();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const TaskCheckbox = ({
    task,
    onToggle,
  }: {
    task: Task;
    onToggle: (task: Task) => void;
  }) => {
    const iconContent = (
      <Box sx={{ display: "flex" }}>
        <UncheckedIcon
          className="unchecked"
          sx={{
            opacity: task.completed ? 1 : 0,
          }}
        />
        <CheckedIcon
          className="checked"
          sx={{
            position: "absolute",
            opacity: task.completed ? 0 : 1,
          }}
        />
      </Box>
    );

    return (
      <Tooltip
        placement="left"
        title={task.completed ? "Mark incomplete" : "Mark completed"}
      >
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task)}
          icon={iconContent}
          checkedIcon={iconContent}
          sx={{
            mr: 1,
            "&:hover .unchecked": {
              opacity: task.completed ? 0 : 1,
            },
            "&:hover .checked": {
              opacity: task.completed ? 1 : 0,
            },
          }}
        />
      </Tooltip>
    );
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Card>
        <Typography variant="h6" gutterBottom>
          My Tasks ({taskMap.size})
        </Typography>

        <TextField
          placeholder="Add a task"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add(newTaskTitle);
              setNewTaskTitle("");
            }
          }}
        />

        <List>
          {incompleteTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                pl: 0,
                pr: 1,
                "&:hover .actions": { opacity: 1 },
              }}
            >
              <TaskCheckbox task={task} onToggle={toggle} />
              {/* Edit styling */}
              {editingId === task.id ? (
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={editValues.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && save(edit)}
                    sx={{ mb: 1, border: "none" }}
                  />
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    placeholder="Description"
                    value={editValues.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && save(edit)}
                  />
                </Box>
              ) : (
                <Tooltip placement="right" title="Edit task">
                  <ListItemText
                    onClick={() => start(task)}
                    sx={{ cursor: "pointer" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={task.description}
                  />
                </Tooltip>
              )}
              <Box
                className="actions"
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s",
                  display: "flex",
                }}
              >
                {editingId === task.id && (
                  <IconButton onClick={() => save(edit)}>
                    <CheckIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}

          {/* Completed tasks */}
          {completedTasks.length > 0 && (
            <>
              <ListItemButton onClick={() => setShowCompleted((prev) => !prev)}>
                <ListItemText
                  primary={`Completed (${completedTasks.length})`}
                />
                {showCompleted ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={showCompleted} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {completedTasks.map((task) => (
                    <ListItem key={task.id} divider sx={{ pl: 0, pr: 1 }}>
                      <TaskCheckbox task={task} onToggle={toggle} />
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={{ textDecoration: "line-through" }}
                          >
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            {task.description && (
                              <Typography variant="body2" component="span">
                                {task.description}
                              </Typography>
                            )}
                            <Typography variant="caption" component="span">
                              {task.description && <br />}
                              Completed:{" "}
                              {task.updatedAt &&
                              !isNaN(new Date(task.updatedAt).getTime())
                                ? new Date(task.updatedAt).toLocaleDateString()
                                : "Unknown"}
                            </Typography>
                          </>
                        }
                      />
                      <IconButton onClick={() => remove(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </>
          )}
        </List>
      </Card>
    </Container>
  );
};

export default TaskTracker;
