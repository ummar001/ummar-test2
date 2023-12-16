import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { IDashboardSetupItem } from "../../types/dashboard.interface";
import { DashboardNav } from "./dashboardNav";

interface IDashboardOnBoardingProps {
  dashboardSetupItems: IDashboardSetupItem[]
}
export const DashboardOnBoarding: FunctionComponent<
  IDashboardOnBoardingProps
> = ({ dashboardSetupItems }) => {
  const notCompletedItems = dashboardSetupItems.filter(
    (item) => item.completed === false
  );

  return (
    <Box sx={{ flexDirection: "column", display: "flex", gap: 4 }}>
      <DashboardNav dashboardSetupItems={dashboardSetupItems} />
      {notCompletedItems[0].component}
    </Box>
  );
};
