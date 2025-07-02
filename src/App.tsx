import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";
import TaskTracker from "./TaskTracker";


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TaskTracker />
    </ThemeProvider>
  );
}

export default App;
