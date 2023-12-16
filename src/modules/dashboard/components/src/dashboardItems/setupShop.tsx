import SetupShopIllustration from "@/common/assets/store_animation.json";
import { Card, LinkTo } from "@/common/components";
import { Box, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const SetupShop: FunctionComponent = () => {
  const { t } = useTranslation("dashboard");

  return (
    <Card title={t("storeTitle")}>
      <Grid container justifyContent="space-between" alignItems="flex-start" spacing={8}>
        <Grid item>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, marginTop: 1.5, marginBottom: 1 }}>
            <span>{t("storeDesc1")}</span>
            <span>{t("storeDesc2")}</span>
          </Box>
          <LinkTo href={"/stores/create"} name={t("storeCta")} />
        </Grid>
        <Grid item>
          <Lottie
            animationData={SetupShopIllustration}
            style={{ width: "250px", height: "200px", marginTop: -60, marginBottom: -40 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
