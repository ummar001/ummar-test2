import "@fontsource/nunito";
import "@fontsource/nunito/500.css";
import "@fontsource/poppins";
import "@fontsource/poppins/700.css";
import { createTheme, responsiveFontSizes } from "@mui/material";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#FF5E5D",
    },
  },
  typography: {
    fontWeightBold: 700,
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    h2: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    h3: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    h4: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    h5: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    h6: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    allVariants: {
      fontFamily: "Nuritto , Arial, sans-serif",
      color: "#4A4A4A",
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        components: {
          CloseIcon: undefined,
        },
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 12,
          color: "white",
          padding: ".75rem",
          fontWeight: "bold",
          "& .MuiAlert-icon": {
            color: "white",
          },
          ...(ownerState.severity === "error" && {
            backgroundColor: "#FF7045",
          }),
          ...(ownerState.severity === "success" && {
            backgroundColor: "#1FCC6F",
          }),
          ...(ownerState.severity === "info" && {
            backgroundColor: "#73A0F5",
          }),
          ...(ownerState.severity === "warning" && {
            backgroundColor: "#FF5E5D",
          }),
        }),
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            fontWeight: "bold",
            textTransform: "capitalize",
            fontSize: "medium",
            borderRadius: 40,
            boxShadow: "none",
            color: "#4A4A4A",
            background: "inherit",
            border: "2px solid #4A4A4A",
            padding: "8px 0",
            "&:hover": {
              border: "2px solid #E64544",
              color: "#E64544",
            },
            "@media (min-width: 1440px)": {
              padding: ".65rem 2rem",
              fontSize: 18,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          color: "white",
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: "medium",
          borderRadius: 40,
          boxShadow: "none",
          padding: ".75rem 1.5rem",
          "@media (min-width: 1440px)": {
            padding: ".75rem 2rem",
            fontSize: 18,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7F7F7",
          color: "white",
          borderRadius: 40,
          paddingLeft: "1rem",
          "& fieldset": {
            border: "none",
          },
          "@media (min-width: 1440px)": {
            padding: ".4rem 0rem",
            paddingLeft: "1rem",
            fontSize: 18,
          },
          "& label": {
            color: "rgba(67, 67, 67, 0.4)",
            paddingLeft: "1rem",
            "@media (min-width: 1440px)": {
              padding: ".4rem 0rem",
              paddingLeft: "1rem",
              fontSize: 18,
            },
            "&.Mui-focused": {
              display: "none",
            },
            "&.MuiFormLabel-filled": {
              display: "none",
            },
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
