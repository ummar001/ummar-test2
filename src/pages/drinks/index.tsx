import { BaseLayout } from "@/common/layout";
import { useGetDrinks } from "@/modules/drinks/api";
import { DrinksList, DrinksNav, NoDrinks } from "@/modules/drinks/components";
import { DrinkCardLayout } from "@/modules/drinks/components/src/drinkCardLayout";
import { IDrink } from "@/modules/drinks/types/drink.interface";
import { useGetStores } from "@/modules/stores/api";
import { Skeleton, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";

const Drinks: FunctionComponent = () => {
  const { data, isLoading } = useGetDrinks();
  const { data: stores } = useGetStores();
  const [drinks, setDrinks] = useState<IDrink[] | null>(null);
  const areShopSetup = stores ? stores.length > 0 : false;

  useEffect(() => {
    if (data) {
      setDrinks(data);
    }
  }, [data]);

  const handleSelectStore = useCallback(
    (storeId: string | undefined) => {
      if (!drinks) return;

      if (data) {
        if (storeId === undefined) {
          setDrinks(data);
        } else {
          setDrinks(data.filter((drink) => drink.stores.includes(storeId)));
        }
      }
    },
    [data, drinks]
  );

  return (
    <BaseLayout pageName={"Drinks"}>
      <Stack flexDirection="column" gap={4} width="100%">
        <DrinksNav
          handleSelectStore={handleSelectStore}
          areShopSetup={areShopSetup}
        />
        {isLoading ? (
          <DrinkCardLayout
            chevronRightIcon={<Skeleton width="100%" />}
            name={<></>}
            image={<></>}
            available={<></>}
            duplicateDrink={<Skeleton width="100%" />}
            stores={<Skeleton width="100%" />}
          />
        ) : drinks && drinks.length > 0 ? (
          <DrinksList drinks={drinks} />
        ) : (
          <NoDrinks areShopSetup={areShopSetup} />
        )}
      </Stack>
    </BaseLayout>
  );
};

export default Drinks;
