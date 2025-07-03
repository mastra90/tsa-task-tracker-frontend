import { Box, Typography } from "@mui/material";
import { AddTask, Celebration } from "@mui/icons-material";
import { theme } from "../theme";

type NoTasksViewProps = {
  variant: "no-tasks" | "all-completed";
};

const NoTasksView = ({ variant }: NoTasksViewProps) => {
  const isAllCompleted = variant === "all-completed";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 320,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: 1,
      }}
    >
      {isAllCompleted ? (
        <>
          <Celebration
            sx={{ fontSize: 96, color: theme.palette.text.secondary }}
          />
          <Typography
            sx={{ fontSize: 20, color: theme.palette.text.secondary }}
          >
            All tasks completed
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Nice job!
          </Typography>
        </>
      ) : (
        <>
          <AddTask sx={{ fontSize: 96, color: theme.palette.text.secondary }} />
          <Typography
            sx={{ fontSize: 20, color: theme.palette.text.secondary }}
          >
            No tasks yet
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.secondary, fontSize: 14 }}
          >
            Enter the name of your first task and press enter
          </Typography>
        </>
      )}
    </Box>
  );
};

export default NoTasksView;
