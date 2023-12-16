import DrinksIllustration from "@/common/assets/drinks_illustration.json";
import { Card, LinkTo } from "@/common/components";
import { Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const SetupExtrasAndDrinks: FunctionComponent = () => {
  const { t } = useTranslation("dashboard");

  return (
    <Card title={t("drinksTitle")}>
      <Grid container justifyContent="space-between" spacing={8}>
        <Grid item marginTop={1.5} xs={8}>
          <Typography marginBottom={1.5}>{t("drinksDesc")}</Typography>
          <LinkTo href={"/drinks/create"} name={t("drinksCta")} />
        </Grid>
        <Grid item>
          <Lottie
            animationData={DrinksIllustration}
            style={{ width: 200, marginTop: -80, marginBottom: -20 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
