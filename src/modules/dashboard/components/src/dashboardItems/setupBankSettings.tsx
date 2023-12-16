import SetupBankSettingsIllustration from "@/common/assets/bank_settings_illustration.json";
import { Card, LinkTo } from "@/common/components";
import { Box, Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface ISetupBankSettingsProps {
  storeId: string
}

export const SetupBankSettings: FunctionComponent<ISetupBankSettingsProps> = ({
  storeId,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <Card title={t("bankTitle")}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Box>
            <Typography width="75%" mb={2} mt={1.5}>{t("bankDesc")}</Typography>
            <LinkTo
              href={`/bank-settings/create/${storeId}`}
              name={t("bankCta")}
            />
          </Box>
        </Grid>
        <Grid item>
          <Lottie
            animationData={SetupBankSettingsIllustration}
            style={{ width: "200px", height: "150px" }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
