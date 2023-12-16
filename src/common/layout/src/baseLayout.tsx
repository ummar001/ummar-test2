import { Sidebar } from "@/common/components";
import Box from "@mui/material/Box";
import React, { FunctionComponent } from "react";
import { BaseHead } from "./baseHead";

interface IBaseLayoutProps {
  pageName: string
  children: React.ReactNode
}

export const BaseLayout: FunctionComponent<IBaseLayoutProps> = ({
  children,
  pageName,
}) => {
  return (
    <>
      <BaseHead pageName={pageName} />
      <Box sx={{ display: "flex", overflowX: "hidden" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 2,
            p: { xs: ".8rem", md: 3 },
            pt: { xs: 5, md: 3 },
            backgroundColor: "#F8F8F8",
            height: "100%",
            minHeight: "100vh",
            width: "100%",
            pl: { md: "50px" },
            pr: { md: "50px" },
            pb: { md: "100px" },
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};
