import { NoDataBackground } from "@/common/components";
import { Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, useCallback } from "react";

interface INoDrinksProps {
  areShopSetup: boolean
}

export const NoDrinks: FunctionComponent<INoDrinksProps> = ({
  areShopSetup,
}) => {
  const handleRenderAddDrinksButton = useCallback(() => {
    if (!areShopSetup) return null;

    return (
      <Typography variant="body1" fontWeight="bold" mt={0.5}>
        <Link href="/drinks/create" style={{ color: "#FF5E5D" }}>
          Add drinks
        </Link>{" "}
      </Typography>
    );
  }, [areShopSetup]);

  return (
    <NoDataBackground>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          color: "#7E7E7E",
        }}
      >
        {areShopSetup
          ? "You don't currently have any drinks setup for this shop."
          : "You must create a store before you can start creating drinks."}

        {handleRenderAddDrinksButton()}
      </Typography>
    </NoDataBackground>
  );
};
