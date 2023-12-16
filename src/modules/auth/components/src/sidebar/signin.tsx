import IllustrationSignIn from "@/common/assets/signInScreen.json";
import { LogoWhite } from "@/common/components";
import { ISize, useWindowSize } from "@/common/hooks";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { CSSProperties, FunctionComponent, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

export const SignInSidebar: FunctionComponent = () => {
  const size: ISize = useWindowSize();
  const { t } = useTranslation("auth");

  const handleRenderLottieStyle: () => CSSProperties = useCallback(() => {
    if (size.width && size.width > 1040) return {};

    return {
      position: "absolute",
      left: "-37.5vw",
      bottom: 0,
      width: "75vw",
      height: "50vh",
    };
  }, [size.width]);

  return (
    <Grid
      container
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#FF5E5D",
        padding: 4,
      }}
    >
      <Grid item>
        <Stack spacing={4}>
          <LogoWhite />
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ maxWidth: 600 }}
              color="white"
            >
              {t("sideBarTitle")}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="white">
              <Trans i18nKey="auth:signInSideBarDesc" />
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        alignSelf="flex-end"
        sx={{ paddingBottom: 5, width: "100%", position: "relative" }}
      >
        <Lottie
          animationData={IllustrationSignIn}
          style={handleRenderLottieStyle()}
        />
      </Grid>
    </Grid>
  );
};
