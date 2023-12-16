import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const CreateExtrasNav: FunctionComponent = () => {
  const { t } = useTranslation("drinks");
  
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={0.5}>
          {t("addExtra")}
        </Typography>
        <Link
          href="/drinks"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {t("back")}
        </Link>
      </Box>
    </Stack>
  );
};