import { ToggleSwitch } from "@/common/components";
import { useCustomForm, useSnack } from "@/common/hooks";
import { BaseLayout } from "@/common/layout";
import {
  useDeleteDrink,
  useGetDrink,
  useUpdateDrink,
  useUpdateDrinkAvailability,
} from "@/modules/drinks/api";
import {
  DrinkDetails,
  DrinkExtras,
  DrinkSizes,
} from "@/modules/drinks/components";
import { ICreateDrinkPayload } from "@/modules/drinks/types/drink.interface";
import { validateFormValuesCreateDrink } from "@/modules/drinks/utils";
import { useGetStores } from "@/modules/stores/api";
import { IStoreCurrency } from "@/modules/stores/types";
import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UpdateDrinks: FunctionComponent = () => {
  const { t } = useTranslation("drinks");
  const router = useRouter();
  const { id } = router.query;
  const setSnackBar = useSnack();
  const { mutate } = useUpdateDrink(id ? id.toString() : "");
  const { data } = useGetDrink(id ? id.toString() : "");
  const { mutate: mutateDelete } = useDeleteDrink();
  const [checked, setChecked] = useState<boolean>(data?.available || false);
  const { mutate: updateDrinkAvailability } = useUpdateDrinkAvailability(
    id ? id.toString() : ""
  );
  const { data: stores } = useGetStores();

  const getCurrency = useCallback((): IStoreCurrency | undefined => {
    const filteredStores = stores?.filter(
      (store) => store.id === data?.stores[0]
    );
    return filteredStores && filteredStores.length > 0
      ? filteredStores[0].currency
      : undefined;
  }, [data?.stores, stores]);

  const { formValues, handleChange, setFormValues } =
    useCustomForm<ICreateDrinkPayload>({
      name: data?.name || "",
      category: data?.category || "",
      available: data?.available || false,
      extras: data?.extras || [],
      drinkType: data?.drinkType || "",
      sizes: data?.sizes || [],
      stores: data?.stores || [],
    });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name,
        category: data.category,
        available: data.available,
        extras: data.extras,
        drinkType: data.drinkType,
        sizes: data.sizes,
        stores: data.stores,
      });
    }
  }, [data, setFormValues]);

  const handleSubmit = useCallback(() => {
    if (validateFormValuesCreateDrink(formValues)) {
      mutate(formValues);
    } else {
      setSnackBar({
        title: t("pleaseFillIn"),
        severityType: "error",
      });
    }
  }, [formValues, mutate, setSnackBar, t]);

  const handleDelete = useCallback(() => {
    if (data?.id) {
      mutateDelete(data.id);
    }
  }, [data?.id, mutateDelete]);

  useEffect(() => {
    if (data?.available) {
      setChecked(data.available);
    }
  }, [data?.available]);

  const handleChangeDrinkAvailability = useCallback(() => {
    updateDrinkAvailability(!checked);
    setChecked(!checked);
  }, [checked, updateDrinkAvailability]);

  return (
    <BaseLayout pageName={"Update Drinks"}>
      <Stack flexDirection="column" gap={4}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={0.5}>
              {t("addEditDrink")}
            </Typography>
            <Link
              href="/drinks"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {t("back")}
            </Link>
          </Box>
          <ToggleSwitch
            checked={checked}
            onChange={handleChangeDrinkAvailability}
            label={t("available")}
          />
        </Stack>
        <DrinkDetails
          formValues={formValues}
          handleChange={handleChange}
          setFormValues={setFormValues}
          currencySymbol={getCurrency()?.symbol as string}
        />
        <DrinkSizes
          formValues={formValues}
          setFormValues={setFormValues}
          currencySymbol={getCurrency()?.symbol as string}
        />
        <DrinkExtras
          formValues={formValues}
          setFormValues={setFormValues}
          currencyCode={getCurrency()?.name as string}
        />
        <Grid container justifyContent="space-between" gap={2}>
          <Grid item xs={12} md={3}>
            <Button
              onClick={handleDelete}
              variant="outlined"
              id="delete"
              sx={{
                width: "100%",
              }}
            >
              {t("delete")}
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "100%",
              }}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </BaseLayout>
  );
};

export default UpdateDrinks;
