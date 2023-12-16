import { ExtrasNav } from "@/modules/extras/components";
import { useGetStores } from "@/modules/stores/api";
import {
  Autocomplete,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface IDrinksNavProps {
  handleSelectStore: (storeId: string) => void
  areShopSetup: boolean
}

export const DrinksNav: FunctionComponent<IDrinksNavProps> = ({
  handleSelectStore,
  areShopSetup,
}) => {
  const { t } = useTranslation("drinks");
  const { data } = useGetStores();
  const [inputValueStore, setInputValueStore] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  const handleGetStoreNameBasedOnId = useCallback(
    (storeId: string) => {
      const store = data?.find((store) => store.id === storeId);
      return store?.name;
    },
    [data]
  );

  const formatedStoreName = useMemo(
    () => handleGetStoreNameBasedOnId(storeName) || "",
    [handleGetStoreNameBasedOnId, storeName]
  );

  const handleRetriveStoreId = useCallback(
    (storeName: string) => {
      const store = data?.find((store) => store.name === storeName);
      return store?.id;
    },
    [data]
  );

  return (
    <>
      <ExtrasNav />
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="bold" mb={0.5}>
          {t("drinks")}
        </Typography>
        {areShopSetup && (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Autocomplete
                value={formatedStoreName}
                inputValue={inputValueStore}
                onInputChange={(event, newInputValue) => {
                  setInputValueStore(newInputValue);
                }}
                onChange={(event, newValues) => {
                  const storeId = handleRetriveStoreId(
                    newValues as string
                  ) as string;
                  setStoreName(storeId);
                  handleSelectStore(storeId);
                }}
                options={data ? data.map((store) => store.name) : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={inputValueStore !== "" ? "" : t("selectStore")}
                    variant="outlined"
                    required
                    sx={{
                      borderRadius: 30,
                      backgroundColor: "white",
                      width: 250,
                    }}
                  />
                )}
              />
            </Box>
            <Link href="/drinks/create" style={{ textDecoration: "none" }}>
              <Button variant="contained">
                <Typography
                  color="white"
                  fontWeight="bold"
                  textTransform="none"
                >
                  {t("addDrink")}
                </Typography>
              </Button>
            </Link>
          </Box>
        )}
      </Stack>
    </>
  );
};
