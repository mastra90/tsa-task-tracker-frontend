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
  CardHeader,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore,
  ExpandLess,
  CircleOutlined as CheckedIcon,
  CheckCircle as UncheckedIcon,
} from "@mui/icons-material";
import { useTaskEdit, useTasks } from "./CustomHooks";
import { Task } from "./api";
import { colors } from "./theme";

const TaskTracker = () => {
  const { tasks, add, remove, toggle, edit } = useTasks();
  const { editingId, editValues, start, save, updateField } = useTaskEdit();
  const [createTask, setCreateTask] = useState("");
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
            alignSelf: "flex-start",

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
        <CardHeader sx={{ p: 0, pb: 2 }} title="My Tasks" />

        {/* Create task field*/}
        <TextField
          placeholder="Add a task"
          fullWidth
          value={createTask}
          onChange={(e) => setCreateTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add(createTask);
              setCreateTask("");
            }
          }}
        />

        {/* Incompleted view */}
        <List>
          {incompleteTasks.map((task) => (
            <ListItem
              disableGutters
              key={task.id}
              sx={{
                alignItems: "center",
                "&:hover .actions": { opacity: 1 },
                bgcolor: editingId === task.id ? colors.hover : "transparent",
              }}
            >
              {/* Task checkboxes */}
              <TaskCheckbox task={task} onToggle={toggle} />
              {editingId !== task.id && (
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

              {editingId === task.id && (
                // Task edit view
                <Box
                  sx={{ flexGrow: 1 }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      save(edit);
                    }
                  }}
                >
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="Title"
                    value={editValues.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                      },
                    }}
                    // Allows user to click Enter key to save changes
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save(edit);
                      }
                    }}
                  />
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    placeholder="Description"
                    value={editValues.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                      },
                    }}
                    // Deetermined behaviour when clicking to edit task.
                    // Automatically focuses to the end of the text in the description field
                    autoFocus
                    onFocus={(e) =>
                      e.currentTarget.setSelectionRange(
                        e.currentTarget.value.length,
                        e.currentTarget.value.length
                      )
                    }
                  />
                </Box>
              )}
            </ListItem>
          ))}
        </List>

        {/* Completed view */}
        <List sx={{ pt: 0 }}>
          {completedTasks.length > 0 && (
            <>
              <ListItemButton
                disableRipple
                onClick={() => setShowCompleted((prev) => !prev)}
              >
                <ListItemText
                  primary={`Completed (${completedTasks.length})`}
                />
                {showCompleted ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={showCompleted}>
                <List disablePadding>
                  {completedTasks.map((task) => (
                    <ListItem key={task.id}>
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
