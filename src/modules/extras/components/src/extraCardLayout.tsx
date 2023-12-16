import { Grid, Stack } from "@mui/material";
import React, {
  FunctionComponent
} from "react";

interface IExtraCardLayoutProps {
  name: React.ReactNode
  price: React.ReactNode
  category: React.ReactNode
  remove: React.ReactNode
  available: React.ReactNode
}

export const ExtraCardLayout: FunctionComponent<IExtraCardLayoutProps> = ({
  available,
  category,
  name,
  price,
  remove,
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
      data-testid="extra-card"
    >
      <Grid item container xs={5} sm={5.5} alignItems="center">
        <Grid item xs={12} md={4}>
          {name}
        </Grid>
        <Grid item xs={3} md={6}>
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            justifyContent="space-between"
          >
            {price}
            {category}
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={7} sm={5.5} lg={3}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {remove}
          {available}
        </Stack>
      </Grid>
    </Grid>
  );
};
