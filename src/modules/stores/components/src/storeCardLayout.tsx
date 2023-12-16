import { Grid, Stack } from "@mui/material";
import React, { FunctionComponent } from "react";

interface IStoreCardLayoutProps {
  name: React.ReactNode
  addressLine1: React.ReactNode
  available: React.ReactNode
  chevronRightIcon: React.ReactNode
}

export const StoreCardLayout: FunctionComponent<IStoreCardLayoutProps> = ({
  addressLine1,
  available,
  name,
  chevronRightIcon,
}) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: {
          xs: 2,
          md: "1rem 2.25rem",
        },
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
      justifyContent="space-between"
      alignItems="center"
      data-testid="store-card"
    >
      <Grid item xs={3.5} sm={5.5}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {name}
          {addressLine1}
        </Stack>
      </Grid>
      <Grid item xs={7.5} sm={5.5} xl={3}>
        <Stack flexDirection="row" justifyContent="space-between">
          {available}
          {chevronRightIcon}
        </Stack>
      </Grid>
    </Grid>
  );
};
