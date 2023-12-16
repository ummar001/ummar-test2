import { Card } from "@/common/components";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export const DashboardContactCard: FunctionComponent = () => {
  const { t } = useTranslation("dashboard");
  return (
    <Card>
      <Box textAlign="center">
        <Typography fontWeight="bold" variant="h6">
          {t("needHelpTitle")}
        </Typography>
        <Typography width="80%" margin="0 auto" marginTop={1}>
          <Trans i18nKey="dashboard:needHelpDesc" />
        </Typography>
      </Box>
    </Card>
  );
};
