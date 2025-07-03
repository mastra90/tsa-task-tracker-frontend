import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import TaskTracker from "./TaskTracker";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskTracker />
    </ThemeProvider>
  );
}

export default App;
