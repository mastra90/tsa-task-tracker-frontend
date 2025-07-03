import { TextField, Box } from "@mui/material";

type EditTaskProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
};

const EditTask = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
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
        slotProps={{
          input: {
            disableUnderline: true,
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
