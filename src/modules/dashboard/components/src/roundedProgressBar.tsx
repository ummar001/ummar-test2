import { Box, CircularProgress, Typography } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";

interface IRoundedProgressBarProps {
  currentStep: number
  numberOfSteps: number
}

export const DashboardProgress: FunctionComponent<IRoundedProgressBarProps> = ({
  numberOfSteps,
  currentStep,
}) => {
  const [progressValue, setProgressValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculatePositionBasedOnSteps = useCallback((): number => {
    return (currentStep / numberOfSteps) * 100;
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
  }, [animateProgress, currentStep, isAnimating, numberOfSteps]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography fontWeight="bold" variant="h6">
        Setup {calculatePositionBasedOnSteps().toFixed()}% Complete
      </Typography>
      <CircularProgress
        variant="determinate"
        value={progressValue}
        style={{
          transition: "width 0.3s ease",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          boxShadow: "inset 0 0 0px 5px #F4F2F2",
          backgroundColor: "transparent",
          color: "#22BE88"
        }}
        thickness={5}
      />
    </Box>
  );
};
