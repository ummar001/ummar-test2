import { Box, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";

interface ISpinnerProps {
  color?: 
     "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
  
}

export const Spinner: FunctionComponent<ISpinnerProps> = ({ color = "primary" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color={color} />
    </Box>
  );
};
