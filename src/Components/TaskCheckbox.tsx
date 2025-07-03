import { Task } from "../api";
import { Checkbox, Box, Tooltip } from "@mui/material";
import {
  CircleOutlined as CheckedIcon,
  CheckCircle as UncheckedIcon,
} from "@mui/icons-material";

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
        checked={Boolean(task.completed)}
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

export default TaskCheckbox;
