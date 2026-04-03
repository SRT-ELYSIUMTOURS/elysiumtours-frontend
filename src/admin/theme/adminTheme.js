import { defaultTheme } from "react-admin";

const adminTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: "#7b2cbf",
      light: "#d6beeb",
      dark: "#5c218f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2d2d2d",
      light: "#565656",
      dark: "#101010",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
  },
  typography: {
    ...defaultTheme.typography,
    fontFamily: '"Raleway", "Inter", "Roboto", sans-serif',
    h6: { fontWeight: 600 },
  },
  sidebar: {
    width: 260,
    closedWidth: 55,
  },
  components: {
    ...defaultTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 700,
            backgroundColor: "#f2eaf9",
            color: "#5c218f",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          "&.RaMenuItemLink-active": {
            backgroundColor: "#f2eaf9",
            color: "#7b2cbf",
            fontWeight: 600,
          },
        },
      },
    },
  },
};

const adminDarkTheme = {
  ...adminTheme,
  palette: {
    ...adminTheme.palette,
    mode: "dark",
    primary: {
      main: "#b57edc",
      light: "#d6beeb",
      dark: "#7b2cbf",
      contrastText: "#ffffff",
    },
    background: {
      default: "#1a1a2e",
      paper: "#16213e",
    },
  },
};

export { adminTheme, adminDarkTheme };
