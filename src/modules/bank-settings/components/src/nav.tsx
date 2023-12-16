import BankSettingsIllustration from "@/common/assets/bank_settings_illustration.json";
import { Card } from "@/common/components";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const BankSettingsNav: FunctionComponent = () => {
  const { t } = useTranslation("bankSettings");
  
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold">
        {t("bankSettings")}
      </Typography>
      <Card title={t("transactionFees")}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "center",
            width: "100%",
          }}
          mt={1}
          gap={2}
        >
          <Typography
            sx={{
              maxWidth: {
                xs: "100%",
                md: "450px",
                xl: "900px",
              },
            }}
          >
            {t("transactionFeesDesc")}
          </Typography>
          <Box
            sx={{
              width: {
                xs: "40%",
                lg: "200px",
              },
              marginTop: {
                xs: "0",
                lg: "-7rem",
              },
              marginBottom: {
                xs: "0",
                lg: "-2rem",
              },
            }}
          >
            <Lottie
              animationData={BankSettingsIllustration}
              style={{
                width: "100%",
              }}
            />
          </Box>
        </Box>
      </Card>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold">
            {t("bankAccounts")}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};
