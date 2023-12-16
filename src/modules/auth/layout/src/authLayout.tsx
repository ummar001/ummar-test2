import { Grid, useMediaQuery } from "@mui/material";
import React, { type FunctionComponent, type PropsWithChildren, useCallback } from "react";
import { LogoWhite } from "@/common/components";
import { BaseHead } from "@/common/layout";

interface IAuthLayoutProps {
  sidebar: React.ReactNode;
  pageName: string;
}

export const AuthLayout: FunctionComponent<PropsWithChildren<IAuthLayoutProps>> = ({
  children,
  sidebar,
  pageName }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const handleRenderSideBar = useCallback(() => {
    if (isSmallScreen) return null;

    return (
      <Grid item xs={5} lg={4}>
        {sidebar}
      </Grid>
    );
  }, [isSmallScreen, sidebar]);

  const handleRenderNavBar = useCallback(() => {
    if (!isSmallScreen) return  null;

    return (
      <Grid item bgcolor="#FF5E5D" sx={{ width: "100%", textAlign: "center", paddingTop: 1 }}>
        <LogoWhite />
      </Grid>
    );
  }, [isSmallScreen]);

  return (
    <BaseHead pageName={pageName}>
      <Grid container>
        {handleRenderSideBar()}
        {handleRenderNavBar()}
        <Grid item sx={{
          padding: 4
        }} xs={isSmallScreen ? 12 : 7} lg={8}>
          {children}
        </Grid>
      </Grid>
    </BaseHead>
  );
};
