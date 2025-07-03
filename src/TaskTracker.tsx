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

const EditTask = ({
  editValues,
  updateField,
  save,
  edit,
}: {
  editValues: { title: string; description: string };
  updateField: (field: "title" | "description", value: string) => void;
  save: (editFn: any) => void;
  edit: any;
}) => {
  return (
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
        autoFocus
        // Automatically focuses cursor to the end of description text
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
      />
    </Box>
  );
};

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

const TaskTracker = () => {
  const { tasks, add, remove, toggle, edit } = useTasks();
  const { editingId, editValues, start, save, updateField } = useTaskEdit();
  const [createTask, setCreateTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

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
          onChange={(e) => setCreateTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add(createTask);
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
                    onClick={() => start(task)}
                    sx={{ cursor: "pointer" }}
                    primary={task.title}
                    secondary={task.description}
                  />
                </Tooltip>
              )}

              {/* Editing tasks */}
              {editingId === task.id && (
                <EditTask
                  editValues={editValues}
                  updateField={updateField}
                  save={save}
                  edit={edit}
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
            <Collapse in={showCompleted}>
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
                      <br></br>
                    </Typography>
                  }
                  secondary={`Completed: ${new Date().toLocaleDateString()}`}
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
