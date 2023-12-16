import { DashboardCheck } from "@/common/assets/dashboardCheck";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface IDashboardSetupItemProps {
  completed: boolean
  name: string
  selectedItem: boolean
}

export const DashboardItem: FunctionComponent<IDashboardSetupItemProps> = ({
  completed,
  name,
  selectedItem,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        opacity: selectedItem ? 1 : 0.5,
      }}
    >
      <DashboardCheck />
      <Typography
        fontWeight="bold"
        sx={{
          textDecoration: completed ? "line-through" : "inherit",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};
