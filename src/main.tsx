import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import TaskTracker from "./Components/TaskTracker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <TaskTracker />
    </ThemeProvider>
  </StrictMode>
);
