import { Card } from "@/common/components";
import { Box, Grid } from "@mui/material";
import { FunctionComponent } from "react";
import { IDashboardSetupItem } from "../../types/dashboard.interface";
import { DashboardItem } from "./dashboardItem";
import { DashboardProgress } from "./roundedProgressBar";

interface IDashboardNavProps {
  dashboardSetupItems: IDashboardSetupItem[]
}

export const DashboardNav: FunctionComponent<IDashboardNavProps> = ({
  dashboardSetupItems,
}) => {
  const numberOfCompletedItems = dashboardSetupItems.filter(
    (item) => item.completed === true
  );
  const notCompletedItems = dashboardSetupItems.filter(
    (item) => item.completed === false
  );

  return (
    <Card>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {dashboardSetupItems.map((item, index) => (
              <DashboardItem
                key={index}
                completed={item.completed}
                name={item.name}
                selectedItem={notCompletedItems[0] === item}
              />
            ))}
          </Box>
        </Grid>
        <Grid item>
          <DashboardProgress
            currentStep={numberOfCompletedItems.length}
            numberOfSteps={dashboardSetupItems.length}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
