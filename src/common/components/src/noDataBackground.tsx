import { Box, Stack } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

export const NoDataBackground: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#FAE6E6", borderRadius: 4 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="25vh"
        sx={{
          color: "#7E7E7E",
          p: "10rem 0rem",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};
