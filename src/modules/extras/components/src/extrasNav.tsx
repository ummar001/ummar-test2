import ExtraCoverIllustration from "@/common/assets/extraCoverIllustration.json";
import { Card, LinkTo } from "@/common/components";
import { Alert, Box, Typography, useMediaQuery } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetExtras } from "../../api";

export const ExtrasNav: FunctionComponent = () => {
  const { data: extras } = useGetExtras();
  const { t } = useTranslation("drinks");
  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  const handleExtrasWarning = useCallback(() => {
    if (extras && extras.length > 0) return null;

    return (
      <Alert
        severity="error"
        sx={{
          alignItems: "center",
          backgroundColor: "#FFF2D6",
          "& .MuiAlert-icon": {
            color: "#FF5E5D",
          },
          marginBottom: 4,
        }}
      >
        <Typography
          style={{ color: "#FF5E5D" }}
          fontWeight="bold"
          variant="body2"
        >
          Setup Extras before you create your drinks so that you can apply them
          to your drinks when you set those up.
        </Typography>
      </Alert>
    );
  }, [extras]);

  return (
    <Box sx={{ overflow: "hidden", maxWidth: "100vw", position: "relative" }}>
      {handleExtrasWarning()}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {t("extras")}
      </Typography>
      <Card
        title={
          <span>
            {t("yourExtraTitle1")}{" "}
            <span
              style={{
                color: extras && extras.length < 1 ? "#FF5E5D" : "inherit",
              }}
            >
              {extras ? extras.length : 0}
            </span>{" "}
            {t("yourExtraTitle2")}
          </span>
        }
        description={
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              maxWidth: isSmallScreen ? "80%" : "100%",
            }}
          >
            {t("addExtraDesc")}
          </div>
        }
        illustration={
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "-50px", md: "-40px", lg: "-50px" },
              right: {
                sm: "-350px",
                md: "-375px",
                lg: "-350px",
              },
              display: { xs: "none", sm: "block" },
            }}
          >
            <Lottie
              animationData={ExtraCoverIllustration}
              style={{ width: "90%" }}
            />
          </Box>
        }
      >
        <Box sx={{ position: "relative", zIndex: 20 }}>
          <Box sx={{ position: "relative", textAlign: "start", zIndex: 10 }}>
            <LinkTo href="/drinks/extras" name={t("addExtraCta")} />
          </Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: { xs: "block", sm: "none" },
              marginTop: "-3rem",
              marginBottom: { xs: "-2.25rem", md: "-3.2rem" },
              marginRight: { xs: "-70%", md: "-17.5rem" },
            }}
          >
            <Lottie
              animationData={ExtraCoverIllustration}
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
