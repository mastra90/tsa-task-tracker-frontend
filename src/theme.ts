import { createTheme } from "@mui/material/styles";

export const colors = {
  darkCharcoal: "#101212",
  lightCharcoal: "#0f1011",
  textPrimary: "#e8e6e3",
  textSecondary: "#908f8e",
  hover: "#141617",
  inputBorder: "#292826",
  inputHover: "#7a7367",
  checkedGreen: "#48bb78",
  deleteRed: "#f56565",
};

export const theme = createTheme({
  palette: {
    background: {
      default: colors.darkCharcoal,
      paper: colors.lightCharcoal,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: "320px",
          minHeight: "100vh",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 16,
          borderRadius: 12,
          border: `solid #43484a 1px`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 8,
          borderRadius: 4,
          "&:hover": {
            backgroundColor: colors.hover,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:hover": {
            backgroundColor: colors.hover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textPrimary,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.lightCharcoal,
            "& fieldset": {
              borderColor: colors.inputBorder,
            },
            "&:hover fieldset": {
              borderColor: colors.inputHover,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.inputHover,
              border: `solid ${colors.inputHover} 1px`,
            },
          },

          "& .MuiInputBase-input": {
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${colors.lightCharcoal} inset !important`,
              WebkitTextFillColor: `${colors.textPrimary} !important`,
            },
          },
        },
      },
    },
  },
});
