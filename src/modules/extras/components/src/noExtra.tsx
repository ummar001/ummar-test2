import { NoDataBackground } from "@/common/components";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NoExtras = () => {
  const { t } = useTranslation("drinks");

  return (
    <NoDataBackground>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          color: "#7E7E7E",
        }}
      >
        {t("noExtra")}
      </Typography>
    </NoDataBackground>
  );
};
