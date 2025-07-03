import { TextField, Box } from "@mui/material";
import { ValidationErrors } from "../api";

type EditTaskProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  errors?: ValidationErrors;
};

const EditTask = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
  errors,
}: EditTaskProps) => {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onSave();
        }
      }}
    >
      <TextField
        variant="standard"
        fullWidth
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        error={!!errors?.title}
        helperText={errors?.title}
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave();
          }
        }}
      />
      <TextField
        variant="standard"
        fullWidth
        multiline
        placeholder="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        error={!!errors?.description}
        helperText={errors?.description}
        slotProps={{
          input: {
            disableUnderline: true,
            style: { fontSize: 14, color: "#908f8e" },
          },
        }}
        autoFocus
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

export default EditTask;
