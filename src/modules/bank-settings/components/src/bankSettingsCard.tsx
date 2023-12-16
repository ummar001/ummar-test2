import { IStore } from "@/modules/stores/types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteBankSettings } from "../../api";

interface IBankSettingsCardProps {
  store: IStore
}

export const BankSettingsCard: FunctionComponent<IBankSettingsCardProps> = ({
  store,
}) => {
  const { t } = useTranslation("bankSettings");
  const { mutate } = useDeleteBankSettings();

  const handleDelete = useCallback(async () => {
    await mutate(store.id);
  }, [mutate, store.id]);

  const handleRenderAvailable = useCallback(() => {
    const backgroundColor = store.bankSettings?.accountSetup
      ? "#2BD687"
      : "#A4A4A4";

    return (
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "100%",
          backgroundColor,
        }}
      ></Box>
    );
  }, [store.bankSettings?.accountSetup]);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: {
          xs: 2,
          md: "1rem 2.25rem",
        },
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="bold">{store.name}</Typography>
          {handleRenderAvailable()}
        </Stack>
      </Grid>
      <Grid item>
        <Typography
          fontWeight="bold"
          onClick={() => handleDelete()}
          sx={{
            color: "#FF5E5D",
            cursor: "pointer",
          }}
        >
          {t("removeBankAccount")}
        </Typography>
      </Grid>
      <Grid item>
        <Link
          href="/bank-settings/update/[id]"
          as={`/bank-settings/update/${store.id}`}
        >
          <Typography fontWeight="bold">{t("editBankAccount")}</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
