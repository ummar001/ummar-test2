import { Box, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DashboardContactCard } from "./dashboardContactCard";
import { DashboardNav } from "./dashboardContactNav";
import { DashboardStoreStatus } from "./dashboardStoreStatus";

interface IDashboardContentProps {
  storeId: string
}

export const DashboardContent: FunctionComponent<IDashboardContentProps> = ({
  storeId,
}) => {
  const { t } = useTranslation("dashboard");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h6" fontWeight="bold">
        {t("dashboard")}
      </Typography>
      <DashboardNav storeId={storeId} />
      <Typography variant="h6" fontWeight="bold">
        {t("whatsNew")}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <DashboardStoreStatus />
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardContactCard />
        </Grid>
      </Grid>
    </Box>
  );
};
