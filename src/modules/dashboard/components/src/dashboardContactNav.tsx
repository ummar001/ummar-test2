import IllustrationProfile from "@/common/assets/dashboard_profile.json";
import { Card } from "@/common/components";
import { Grid, LinearProgress, Typography, useMediaQuery } from "@mui/material";
import Lottie from "lottie-react";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetPurchasesByStore } from "../../api";

interface IDashboardNavProps {
  storeId: string
}

export const DashboardNav: FunctionComponent<IDashboardNavProps> = ({
  storeId,
}) => {
  const { t } = useTranslation("dashboard");
  const { data } = useGetPurchasesByStore(storeId);

  const currentStep = useMemo(() => (data ? data.length : 0), [data]);
  const numberOfSteps = 10;
  const [progressValue, setProgressValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculatePositionBasedOnSteps = useCallback(() => {
    if (currentStep === 10) {
      return 100;
    } else {
      return (currentStep / numberOfSteps) * 100;
    }
  }, [currentStep, numberOfSteps]);

  const animateProgress = useCallback(() => {
    const start = 0;
    const end = calculatePositionBasedOnSteps();
    const duration = 6;

    const animationStartTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(1, elapsedTime / duration);
      const progressValue = start + progress * (end - start);

      setProgressValue(progressValue);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [calculatePositionBasedOnSteps]);

  useEffect(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      animateProgress();
    }
  }, [animateProgress, isAnimating]);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Card>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={8}>
          <Typography variant="h6" fontWeight="bold">
            {t("sellBundlesTitle")}
          </Typography>
          <Typography width={isSmallScreen ? "100%" : "75%"}>
            {t("sellBundlesDesc")}
          </Typography>
        </Grid>
        <Grid item textAlign="center">
          <Lottie
            animationData={IllustrationProfile}
            style={{ width: 60, margin: "0 auto" }}
          />
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              backgroundColor: "white",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1EB67D",
              },
            }}
            style={{
              transition: "width 0.3s ease",
              width: "150px",
              height: "12.5px",
              borderRadius: "10px",
              boxShadow: "inset 0 0 0px 10px #F4F2F2",
              backgroundColor: "#1EB67D", // Set the desired color directly
            }}
          />
          <Typography fontWeight="bold" marginTop={1}>
            {currentStep} {t("bundlesSold")}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
