import { BaseLayout } from "@/common/layout";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface IStoreLayoutProps {
  pageName: string
  children: React.ReactNode
}

export const StoreLayout: FunctionComponent<IStoreLayoutProps> = ({
  children,
  pageName,
}) => {
  const { t } = useTranslation("store");
  return (
    <BaseLayout pageName={pageName}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" fontWeight="bold">
          {t("yourStores")}
        </Typography>
        <Link href="/stores/create" style={{ textDecoration: "none" }}>
          <Button variant="contained">
            <Typography color="white" fontWeight="bold" textTransform="none">
              {t("addStore")}
            </Typography>
          </Button>
        </Link>
      </Stack>
      <Box>{children}</Box>
    </BaseLayout>
  );
};
