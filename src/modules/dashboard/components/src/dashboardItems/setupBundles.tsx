import BundlesIllustration from "@/common/assets/bank_settings_illustration.json";
import { Card, LinkTo } from "@/common/components";
import { Box, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const SetupBundles: FunctionComponent = () => {
  const { t } = useTranslation("dashboard");

  return (
    <Card title={t("loyaltyTitle")}>
      <Grid container justifyContent="space-between" spacing={8}>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.25,
              marginTop: 1.5,
              marginBottom: 1,
            }}
          >
            <span>{t("loyaltyDesc1")}</span>
            <span>{t("loyaltyDesc2")}</span>
          </Box>
          <LinkTo href={"/bundles/create"} name={t("loyaltyCta")} />
        </Grid>
        <Grid item>
          <Lottie
            animationData={BundlesIllustration}
            style={{ width: 200, marginTop: -80, marginBottom: -20 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
