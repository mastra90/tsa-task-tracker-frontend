import { createTheme } from "@mui/material/styles";

export const colors = {
  darkCharcoal: "#202124",
  lightCharcoal: "#202124",
  offWhite: "#f2f2f2",
  lightBlueGrey: "#e2e8f0",
  successGreen: "#48bb78",
  wanringAmber: "#ed8936",
  errorRed: "#f56565",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.offWhite,
    },
    secondary: {
      main: colors.lightCharcoal,
    },
    background: {
      default: colors.darkCharcoal,
      paper: colors.lightCharcoal,
    },
    text: {
      primary: colors.offWhite,
      secondary: colors.lightBlueGrey,
    },
    divider: colors.lightCharcoal,
    success: {
      main: colors.successGreen,
    },
    warning: {
      main: colors.wanringAmber,
    },
    error: {
      main: colors.errorRed,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.lightCharcoal,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkCharcoal,
          minHeight: "100vh",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.offWhite,
          color: colors.darkCharcoal,
        },
      },
    },
  },
});
