import { useGetStores } from "@/modules/stores/api";
import { IStore } from "@/modules/stores/types";
import { MenuItem, Select } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useMemo } from "react";
import { ICreateExtraPayload } from "../../types/extra.interface";

interface ISelectCurrencyProps {
  value: string
  setFormValues: (value: ICreateExtraPayload) => void
  formValues: ICreateExtraPayload
}

export const SelectCurrency: FunctionComponent<ISelectCurrencyProps> = ({
  setFormValues,
  formValues,
  value,
}) => {
  const { data } = useGetStores();

  const handleChange = useCallback(
    (currencyCode: string) => {
      setFormValues({
        ...formValues,
        currencyCode,
      });
    },
    [formValues, setFormValues]
  );

  const removeDuplicateCurrencyNames = useCallback((): IStore[] => {
    if (!data) return [];

    const uniqueCurrencyNames: Set<string> = new Set();

    return data.filter((store) => {
      if (uniqueCurrencyNames.has(store.currency.name)) {
        return false; // Duplicate currency name, filter it out
      } else {
        uniqueCurrencyNames.add(store.currency.name);
        return true; // Unique currency name, keep it
      }
    });
  }, [data]);

  const noDuplicateCurrencyStores = useMemo(() => removeDuplicateCurrencyNames(), [removeDuplicateCurrencyNames]);

  useEffect(() => {
    if (value === "" && noDuplicateCurrencyStores.length > 0) {
      handleChange(noDuplicateCurrencyStores[0].currency.name);
    }
  }, [noDuplicateCurrencyStores, handleChange, value]);

  return (
    <Select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {noDuplicateCurrencyStores.map((store, index) => (
        <MenuItem key={index} value={store.currency.name}>
          {store.currency.symbol}
        </MenuItem>
      ))}
    </Select>
  );
};
