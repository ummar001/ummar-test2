import { Card, LinkTo } from "@/common/components";
import { useGetStores } from "@/modules/stores/api";
import { Box, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

export const DashboardStoreStatus: FunctionComponent = () => {
  const { data: stores } = useGetStores();
  const learnMoreLink =
    "https://www.notion.so/Bundles-b0b0c44a7cd14fddad648b6fc7d42821?pvs=4";
  const { t } = useTranslation("dashboard");

  const isOnline = stores
    ? stores.filter((store) => store.available == true) &&
      stores.filter((store) => store.bankSettings?.accountSetup === true)
    : false;

  const handleRenderAvailable = useCallback(() => {
    const backgroundColor = isOnline ? "#2BD687" : "#A4A4A4";
    const text = isOnline ? t("online") : t("offline");

    return (
      <Box
        sx={{
          backgroundColor,
          width: "fit-content",
          padding: ".25rem 1rem",
          borderRadius: 100,
        }}
        marginBottom={1}
      >
        <Typography color="white" textTransform="uppercase" variant="body2">
          {text}
        </Typography>
      </Box>
    );
  }, [isOnline, t]);

  return (
    <Card>
      {handleRenderAvailable()}
      <Typography variant="h6" fontWeight="bold">
        {isOnline ? t("yourStoreIsOnline") : t("noStoreOnline")}
      </Typography>
      <Typography marginTop={1} marginBottom={1}>
        {isOnline ? (
          <Trans i18nKey="dashboard:onlineDesc" />
        ) : (
          <Trans i18nKey="dashboard:offlineDesc" />
        )}
      </Typography>
      <LinkTo name={t("learnMore")} href={learnMoreLink} />
    </Card>
  );
};
