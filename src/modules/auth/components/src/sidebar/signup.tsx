import IllustrationSignUp from "@/common/assets/signUpScreen.json";
import { LogoWhite } from "@/common/components";
import { Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export const SignUpSidebar: FunctionComponent = () => {
  const { t } = useTranslation("auth");

  return (
    <Grid
      container
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#FF5E5D",
        color: "white",
        padding: 4,
      }}
    >
      <Grid item>
        <Stack spacing={4}>
          <LogoWhite />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ maxWidth: 600 }}
            color="white"
          >
            {t("sideBarTitle")}
          </Typography>
          <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <li>
              <Typography variant="h6" color="white">
                <Trans i18nKey="auth:signUpSideBar1" />
              </Typography>
            </li>
            <li>
              <Typography variant="h6" color="white">
                <Trans i18nKey="auth:signUpSideBar2" />
              </Typography>
            </li>
            <li>
              <Typography variant="h6" color="white">
                <Trans i18nKey="auth:signUpSideBar3" />
              </Typography>
            </li>
          </ul>
        </Stack>
      </Grid>
      <Grid item alignSelf="flex-end" sx={{ paddingBottom: 5, width: "90%" }}>
        <Lottie animationData={IllustrationSignUp} />
      </Grid>
    </Grid>
  );
};
