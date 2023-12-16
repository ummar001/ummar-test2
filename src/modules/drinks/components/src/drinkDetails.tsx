import CoffeeIcon from "@/common/assets/coffeeDrinks.svg";
import IcedDrinkIcon from "@/common/assets/coldDrinks.svg";
import ExpressoIcon from "@/common/assets/expressoDrinks.svg";
import FilterIcon from "@/common/assets/filterDrinks.svg";
import TeaIcon from "@/common/assets/teaDrinks.svg";
import { Card, FormField } from "@/common/components";
import { useGetStores } from "@/modules/stores/api";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import {
  BaseSyntheticEvent,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ICreateDrinkPayload } from "../../types/drink.interface";

interface IDrinkDetailsProps {
  handleChange: (e: BaseSyntheticEvent) => void
  formValues: ICreateDrinkPayload
  setFormValues: (values: ICreateDrinkPayload) => void
  currencySymbol: string | undefined
}

export const DrinkDetails: FunctionComponent<IDrinkDetailsProps> = ({
  formValues,
  handleChange,
  setFormValues,
  currencySymbol,
}) => {
  const { t } = useTranslation("drinks");
  const [inputValueStore, setInputValueStore] = useState<string>("");
  const { data } = useGetStores();
  const stores = currencySymbol
    ? data?.filter((store) => store.currency.symbol === currencySymbol)
    : data;

  const handleRetriveStoresId = useCallback(
    (storeName: readonly string[]) => {
      const filteredStores = data?.filter((store) =>
        storeName.includes(store.name)
      );
      return filteredStores?.map((store) => store.id);
    },
    [data]
  );

  const handleGetStoresNameBasedOnId = useCallback(
    (storeId: string[]) => {
      const filteredStores = stores?.filter((store) =>
        storeId.includes(store.id)
      );
      return filteredStores?.map((store) => store.name);
    },
    [stores]
  );

  const formatedStoresName = useMemo(
    () => handleGetStoresNameBasedOnId(formValues.stores) || [],
    [formValues.stores, handleGetStoresNameBasedOnId]
  );
  const handleRenderImage = useCallback((label: string) => {
    switch (label) {
    case "Espresso/Small drinks":
      return <Image src={ExpressoIcon} alt="Expresso Icon" width={25} />;
    case "Tea":
      return <Image src={TeaIcon} alt="Tea Icon" width={25} />;
    case "Filter":
      return <Image src={FilterIcon} alt="Filter Icon" width={25} />;
    case "Iced drink":
      return <Image src={IcedDrinkIcon} alt="Icded Drink Icon" width={25} />;
    case "Coffee/Large drinks":
      return <Image src={CoffeeIcon} alt="Coffee Icon" width={25} />;
    default:
      return <Image src={CoffeeIcon} alt="Coffee Icon" width={25} />;
    }
  }, []);

  const CustomOption = ({ label, icon }: { label: string; icon: string }) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {handleRenderImage(icon)}
      <Box sx={{ ml: 1 }}>{label}</Box>
    </Box>
  );

  return (
    <Card title={t("drinkDetails")}>
      <Grid container spacing={4} alignItems="flex-end" pt={4}>
        <Grid item xs={12} md={6}>
          <FormField
            placeholder={t("drinkNamePlaceholder")}
            onChange={handleChange}
            id="name"
            value={formValues.name}
            label={t("drinkName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={0.5}>
            {t("selectCategory")}
          </Typography>
          <Autocomplete
            value={formValues.category}
            inputValue={formValues.category}
            onInputChange={(event, newInputValue) => {
              setFormValues({ ...formValues, category: newInputValue });
            }}
            id="category"
            options={[
              t("hotDrinks"),
              t("coldDrinks"),
              t("festiveDrinks"),
              t("smoothie"),
              t("mocktails"),
              t("bubbleTea"),
            ]}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("hotDrinkPlaceholder")}
                variant="outlined"
                required
                sx={{
                  borderRadius: 5,
                  marginTop: 1.5,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={0.5}>
            {t("drinkIcon")}
          </Typography>
          <Autocomplete
            value={formValues.drinkType}
            inputValue={formValues.drinkType}
            onInputChange={(event, newInputValue) => {
              setFormValues({ ...formValues, drinkType: newInputValue });
            }}
            id="drinkType"
            options={[
              "Espresso/Small drinks",
              "Tea",
              "Filter",
              "Iced drink",
              "Coffee/ Large drinks",
            ]}
            renderOption={(props, option) => (
              <li {...props}>
                <CustomOption label={t(option)} icon={option} />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("drinkIconPlaceholder")}
                variant="outlined"
                required
                sx={{
                  borderRadius: 5,
                  marginTop: 1.5,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={0.5}>
            {t("availableIn")}
          </Typography>
          <Autocomplete
            multiple
            id="stores"
            value={formatedStoresName}
            inputValue={inputValueStore}
            onInputChange={(event, newInputValue) => {
              setInputValueStore(newInputValue);
            }}
            onChange={(event, newValues) => {
              const storeId = handleRetriveStoresId(newValues) as string[];
              setFormValues({
                ...formValues,
                stores: [...storeId],
              });
            }}
            options={stores ? stores.map((store) => store.name) : []}
            renderInput={(params) => (
              <TextField
                {...params}
                label={formValues.stores.length > 0 ? "" : t("selectStore")}
                variant="outlined"
                required
                sx={{
                  borderRadius: 5,
                  marginTop: 1.5,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
