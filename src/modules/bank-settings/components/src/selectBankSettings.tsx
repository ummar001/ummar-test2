import { IStore } from "@/modules/stores/types";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDuplicateBankSettingsForStore } from "../../api";

interface ISelectBankSettingsProps {
  stores: IStore[]
  storeId: string
}

export const SelectBankSettings: FunctionComponent<
  ISelectBankSettingsProps
> = ({ stores, storeId }) => {
  const router = useRouter();
  const { t } = useTranslation("bankSettings");
  const { mutate, isLoading, isSuccess } = useDuplicateBankSettingsForStore();
  const [value, setValue] = useState<string>("");
  const [selectedStoreAccountId, setSelectedStoreAccountId] = useState<string>("");

  const getTemplateStore = useCallback(() => {
    const filteredStore = stores.filter(
      (store) => store.bankSettings?.accountId === selectedStoreAccountId
    );
    return filteredStore[0];
  }, [selectedStoreAccountId, stores]);

  useEffect(() => {
    if (selectedStoreAccountId.length > 1 && !isLoading && !isSuccess) {
      mutate({
        storeId,
        templateStoreId: getTemplateStore().id,
      });
    }
  }, [getTemplateStore, isLoading, isSuccess, mutate, router, selectedStoreAccountId, storeId]);

  const options = () => {
    const optionsFiltered: string[] = [];
    stores.map((store) => {
      // Check if account is setup
      if (
        store.bankSettings &&
        store.bankSettings.accountSetup &&
        store.bankSettings.accountId
      ) {
        optionsFiltered.push(store.bankSettings.accountId);
      }
    });
    return optionsFiltered;
  };
  
  return (
    <Autocomplete
      selectOnFocus
      value={value}
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      onChange={(event, newValue) =>
        setSelectedStoreAccountId(newValue ? newValue : "")
      }
      options={options()}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("selectBank")}
          variant="outlined"
          required
          sx={{
            borderRadius: 5,
            marginTop: 1.5,
          }}
        />
      )}
    />
  );
};
