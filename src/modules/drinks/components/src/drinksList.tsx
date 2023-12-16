import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { IDrink } from "../../types/drink.interface";
import { DrinkCard } from "./drinkCard";

interface IDrinksListProps {
  drinks: IDrink[]
}

export const DrinksList: FunctionComponent<IDrinksListProps> = ({ drinks }) => {
  return (
    <Stack flexDirection="column" gap={4}>
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </Stack>
  );
};
