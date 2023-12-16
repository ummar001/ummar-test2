import CoffeeIcon from "@/common/assets/coffeeDrinks.svg";
import IcedDrinkIcon from "@/common/assets/coldDrinks.svg";
import ExpressoIcon from "@/common/assets/expressoDrinks.svg";
import FilterIcon from "@/common/assets/filterDrinks.svg";
import TeaIcon from "@/common/assets/teaDrinks.svg";
import { useGetStores } from "@/modules/stores/api";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IDrink } from "../../types/drink.interface";
import { DrinkCardLayout } from "./drinkCardLayout";

interface IDrinkCardProps {
  drink: IDrink
}

export const DrinkCard: FunctionComponent<IDrinkCardProps> = ({ drink }) => {
  const { t } = useTranslation("drinks");
  const { data } = useGetStores();

  const handleGetStoresNameBasedOnId = useCallback(
    (storeId: string[]) => {
      const stores = data?.filter((store) => storeId.includes(store.id));
      const storeNames = stores?.map((store) => store.name);
      return storeNames?.join(", ");
    },
    [data]
  );

  const handleRenderAvailable = useCallback(() => {
    const backgroundColor = drink.available ? "#2BD687" : "#A4A4A4";
    const text = drink.available ? t("available") : t("notAvailable");

    return (
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "100%",
            backgroundColor,
          }}
        ></Box>
        <Typography sx={{ display: { xs: "none", lg: "block" } }}>
          {text}
        </Typography>
      </Stack>
    );
  }, [drink.available, t]);

  const handleRenderImage = useCallback(() => {
    switch (drink.drinkType) {
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
  }, [drink.drinkType]);

  return (
    <DrinkCardLayout
      chevronRightIcon={
        <Link href={`/drinks/${drink.id}`} data-testid="chevron-icon">
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#FF5E5D",
              padding: 0.5,
              borderRadius: 10,
              width: "fit-content",
              color: "white",
            }}
          >
            <ChevronRightIcon />
          </Box>
        </Link>
      }
      name={
        <Typography fontWeight="bold" fontSize="1.1rem">
          {drink.name}
        </Typography>
      }
      image={handleRenderImage()}
      available={handleRenderAvailable()}
      duplicateDrink={
        <Link href={`/drinks/duplicate/${drink.id}`}>
          <Typography>{t("duplicateDrink")}</Typography>
        </Link>
      }
      stores={
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "30vw",
          }}
        >
          {handleGetStoresNameBasedOnId(drink.stores)}
        </Typography>
      }
    />
  );
};
