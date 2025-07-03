import { createTheme } from "@mui/material/styles";

export const colors = {
  darkCharcoal: "#141617",
  lightCharcoal: "#0f1011",
  grey: "#c2c0bc",
  successGreen: "#48bb78",
  wanringAmber: "#ed8936",
  errorRed: "#f56565",
  hover: "#181e1a",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.grey,
    },
    background: {
      default: colors.darkCharcoal,
      paper: colors.lightCharcoal,
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
          border: `solid ${colors.grey} 1px`,
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
  },
});
