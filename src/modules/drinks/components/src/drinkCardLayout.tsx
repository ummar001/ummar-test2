import { Box, Grid, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface IDrinkCardLayoutProps {
  chevronRightIcon: React.ReactNode
  name: React.ReactNode
  image: React.ReactNode
  available: React.ReactNode
  duplicateDrink: React.ReactNode
  stores: React.ReactNode
}

export const DrinkCardLayout: FunctionComponent<IDrinkCardLayoutProps> = ({
  available,
  chevronRightIcon,
  image,
  name,
  duplicateDrink,
  stores
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
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      data-testid="drink-card"
    >
      <Grid item xs={3.5} sm={5.5} xl={4}>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={2}
          sx={{
            justifyContent: {
              xs: "inherit",
              sm: "space-between",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1,
                lg: 2,
              },
            }}
          >
            {image}
            {name}
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            {available}
          </Box>
          {stores}
        </Stack>
      </Grid>
      <Grid item xs={7.5} sm={5.5} xl={3}>
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{
            justifyContent: {
              xs: "flex-end",
              sm: "space-between",
            },
          }}
          gap={2}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            {available}
          </Box>
          {duplicateDrink}
          <div data-testid="drink-card">{chevronRightIcon}</div>
        </Stack>
      </Grid>
    </Grid>
  );
};
