import { createTheme } from "@mui/material/styles";

export const colors = {
  grey: "#393939",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 16,
          borderRadius: 12,
          border: `solid ${colors.grey} 1px`,
        },
      },
    },
  },
});
