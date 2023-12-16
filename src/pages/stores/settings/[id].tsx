import { Card, LinkTo, ToggleSwitch } from "@/common/components";
import { BaseLayout } from "@/common/layout";
import { SelectBankSettings } from "@/modules/bank-settings/components";
import {
  useDeleteStore,
  useDuplicateStore,
  useGetStore,
  useGetStores,
  useUpdateStoreAvailability,
} from "@/modules/stores/api";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StoreSettings: FunctionComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetStore(id ? id.toString() : "");
  const { data: stores } = useGetStores();
  const { mutate: updateStoreAvailability } = useUpdateStoreAvailability(
    id ? id.toString() : ""
  );
  const { mutate: deleteStore } = useDeleteStore();
  const { mutate: duplicateStore } = useDuplicateStore();
  const [checked, setChecked] = useState<boolean>(
    data?.available && data?.bankSettings
      ? data.available && data.bankSettings.accountSetup
      : false
  );
  const { t } = useTranslation("store");

  useEffect(() => {
    if (
      data?.available &&
      data.bankSettings &&
      data.bankSettings.accountSetup
    ) {
      setChecked(data.available);
    }
  }, [data?.available, data?.bankSettings]);

  const handleChangeUpdateStoreAvailability = useCallback(() => {
    if (data?.bankSettings) {
      updateStoreAvailability(!checked);
      setChecked(!checked);
    }
  }, [checked, data?.bankSettings, updateStoreAvailability]);

  const handleDeleteStore = useCallback(() => {
    deleteStore(id as string);
  }, [deleteStore, id]);

  const handleDuplicateStore = useCallback(() => {
    duplicateStore(id as string);
  }, [duplicateStore, id]);

  const handleRenderBankSettingsCTA = useCallback(() => {
    const storeWithBankSettingsSetups = stores
      ? stores?.filter((store) => store.bankSettings?.accountSetup === true)
        .length > 0
      : false;

    const sameCountryStores =
      stores &&
      data &&
      stores.filter(
        (store) =>
          store.location.country === data.location.country &&
          store.bankSettings?.accountSetup === true
      );

    if (
      storeWithBankSettingsSetups &&
      sameCountryStores &&
      sameCountryStores.length > 0
    ) {
      return <SelectBankSettings stores={sameCountryStores} storeId={data.id} />;
    } else {
      return (
        <LinkTo
          testid="bank-settings"
          href={`/bank-settings/create/${id}`}
          name={t("setupBankDetails")}
        />
      );
    }
  }, [data, id, stores, t]);

  const handleRenderBankDetails = useCallback(() => {
    const bankSettingSetup = data?.bankSettings?.accountSetup;
    const color = bankSettingSetup ? "white" : "#FAE6E6";
    const text = bankSettingSetup
      ? data.bankSettings?.accountId
      : t("noBankSettings");

    return (
      <Card title={t("bankTitle")} bg={color} description={text}>
        {!bankSettingSetup ? (
          handleRenderBankSettingsCTA()
        ) : (
          <LinkTo href={"/bank-settings"} name={t("bankCta")} />
        )}
      </Card>
    );
  }, [
    data?.bankSettings?.accountId,
    data?.bankSettings?.accountSetup,
    handleRenderBankSettingsCTA,
    t,
  ]);

  const handleRenderAlertBankSettings = useCallback(() => {
    if (data?.bankSettings?.accountSetup) return null;

    return (
      <Alert
        severity="error"
        sx={{
          alignItems: "center",
          backgroundColor: "#FFF2D6",
          "& .MuiAlert-icon": {
            color: "#FF5E5D",
          },
        }}
      >
        <Link href={`/bank-settings/create/${id}`} style={{ color: "#FF5E5D" }}>
          {t("noBankSettingsDesc")}
        </Link>
      </Alert>
    );
  }, [data?.bankSettings?.accountSetup, id, t]);

  return (
    <BaseLayout pageName={"Store Settings"}>
      <Box
        maxWidth="1200px"
        sx={{
          marginTop: "32px",
          margin: {
            xs: 0,
            xl: "0 auto",
          },
        }}
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={0.5}>
              {data?.name} {t("settings")}
            </Typography>
            <Link
              href="/stores"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {t("back")}
            </Link>
          </Box>
          <ToggleSwitch
            checked={checked}
            onChange={handleChangeUpdateStoreAvailability}
            label={t("available")}
          />
        </Stack>
        <Grid container mt="32px" spacing={4} alignItems="stretch">
          <Grid item xs={12} mt="-32px">
            {handleRenderAlertBankSettings()}
          </Grid>
          <Grid item xs={12} sm={6} data-testid="edit-details">
            <Card
              title={t("editStoreDetails")}
              description={t("editStoreDetailsDesc")}
            >
              <LinkTo name={t("editDetailsCta")} href={`/stores/${id}`} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            {handleRenderBankDetails()}
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button variant="contained" onClick={handleDeleteStore} id="delete-store">
                {t("deleteStore")}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleDuplicateStore} id="duplicate-store">
                {t("duplicateStore")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default StoreSettings;
