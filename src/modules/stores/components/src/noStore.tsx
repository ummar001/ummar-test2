import NoStoreSetupIllustration from "@/common/assets/noStoreSetupIllustration.json";
import { NoDataBackground } from "@/common/components";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const NoStore = () => {
  const { t } = useTranslation("store");
  return (
    <NoDataBackground>
      <Box
        sx={{
          width: {
            xs: "20rem",
            md: "30rem",
          },
          marginTop: {
            xs: "-2rem",
            md: "-4rem",
          },
        }}
      >
        <Lottie animationData={NoStoreSetupIllustration} />
      </Box>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          color: "#7E7E7E",
          marginTop: {
            xs: "-1rem",
            md: "-3rem",
          },
        }}
      >
        {t("noCurrentStoreSetup1")}
        <Typography variant="body1" sx={{ color: "#7E7E7E" }}>
          <Link href="/stores/create" style={{ color: "#7E7E7E" }}>
            {t("addStore")}
          </Link>{" "}
          {t("noCurrentStoreSetup2")}
        </Typography>
      </Typography>
    </NoDataBackground>
  );
};
