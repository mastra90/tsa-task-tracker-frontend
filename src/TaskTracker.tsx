import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Chip,
  Card,
} from "@mui/material";
import { darkTheme } from "./theme";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      console.log(response);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (task.completed && !showCompleted) return false;
    if (!task.completed && !showIncomplete) return false;
    return true;
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Tracker
      </Typography>

      <Card sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter Tasks
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
              />
            }
            label="Show Completed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showIncomplete}
                onChange={(e) => setShowIncomplete(e.target.checked)}
              />
            }
            label="Show Incomplete"
          />
        </FormGroup>
      </Card>

      <Paper>
        <List>
          {filteredTasks.map((task) => (
            <ListItem key={task.id} divider>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6">{task.title}</Typography>
                    <Chip
                      label={task.completed ? "Completed" : "Incomplete"}
                      sx={{
                        bgcolor:
                          task.completed === true
                            ? darkTheme.palette.success.main
                            : "default",
                      }}
                      size="small"
                    />
                  </Box>
                }
                secondary={task.description || "No description"}
              />
            </ListItem>
          ))}
          {filteredTasks.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No tasks found"
                secondary="No tasks match the current filter criteria"
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default TaskTracker;
