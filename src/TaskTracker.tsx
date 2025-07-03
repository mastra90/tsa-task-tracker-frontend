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
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useTaskEdit, useTasks } from "./CustomHooks";

const TaskTracker = () => {
  const { tasks, taskMap, add, remove, toggle, edit } = useTasks();
  const { editingId, editValues, start, save, updateField } = useTaskEdit();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

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
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggle(task)}
                sx={{ mr: 1 }}
              />
              {editingId === task.id ? (
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={editValues.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && save(edit)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    value={editValues.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && save(edit)}
                  />
                </Box>
              ) : (
                <ListItemText
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
              )}
              <Box
                className="actions"
                sx={{ opacity: 0, transition: "opacity 0.3s", display: "flex" }}
              >
                {editingId === task.id ? (
                  <IconButton onClick={() => save(edit)}>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => start(task)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}

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
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggle(task)}
                        sx={{ mr: 1 }}
                      />
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
