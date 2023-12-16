import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { IStore } from "../../types";
import { StoreCard } from "./storeCard";

interface IStoreListProps {
  stores: IStore[];
}

export const StoreList: FunctionComponent<IStoreListProps> = ({ stores }) => {
  return (
    <Stack flexDirection="column" gap={4}>
      {stores.map((store) => <StoreCard key={store.id} store={store} />)}
    </Stack>
  );
};