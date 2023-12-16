import RemoveIcon from "@/common/assets/removeIcon.png";
import { ToggleSwitch } from "@/common/components";
import { formatPrice } from "@/common/utils/src/formatPrice";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteExtra, useUpdateExtraAvailability } from "../../api";
import { IExtra } from "../../types/extra.interface";
import { ExtraCardLayout } from "./extraCardLayout";

interface IExtraCardProps {
  extra: IExtra
}

export const ExtraCard: FunctionComponent<IExtraCardProps> = ({ extra }) => {
  const { t } = useTranslation("drinks");

  const [checked, setChecked] = useState<boolean>(
    extra?.available ? extra?.available : false
  );
  const { mutate } = useDeleteExtra();
  const { mutate: updateExtraAvailability } = useUpdateExtraAvailability(
    extra ? extra.id : ""
  );

  useEffect(() => {
    if (extra?.available) {
      setChecked(extra.available);
    }
  }, [extra?.available]);

  const handleChangeUpdateStoreAvailability = useCallback(() => {
    setChecked(!checked);
    updateExtraAvailability(!checked);
  }, [checked, updateExtraAvailability]);

  const handleRenderAvailable = useCallback(() => {
    return (
      <ToggleSwitch
        checked={checked}
        onChange={handleChangeUpdateStoreAvailability}
        label={t("available")}
      />
    );
  }, [checked, handleChangeUpdateStoreAvailability, t]);

  const handleDelete = useCallback(() => {
    mutate(extra.id);
  }, [extra.id, mutate]);

  return (
    <ExtraCardLayout
      name={
        <Typography fontWeight="bold" fontSize="1.1rem">
          {extra.name}
        </Typography>
      }
      price={
        <Typography fontWeight="bold" fontSize="1.1rem">
          {formatPrice({ price: extra.price, symbol: extra.currencyCode })}
        </Typography>
      }
      category={<Typography>{extra.category}</Typography>}
      remove={
        <Button onClick={handleDelete} data-testid="remove-extra">
          <Image src={RemoveIcon} alt="" />
        </Button>
      }
      available={handleRenderAvailable()}
    />
  );
};
