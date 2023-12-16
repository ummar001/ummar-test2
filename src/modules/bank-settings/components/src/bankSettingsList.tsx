import { IStore } from "@/modules/stores/types";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { BankSettingsCard } from "./bankSettingsCard";

interface IBankSettingsListProps {
  stores: IStore[]
}

export const BankSettingsList: FunctionComponent<IBankSettingsListProps> = ({
  stores,
}) => {
  return (
    <Stack flexDirection="column" gap={4}>
      {stores.map((store, index) => (
        <BankSettingsCard store={store} key={index} />
      ))}
    </Stack>
  );
};
