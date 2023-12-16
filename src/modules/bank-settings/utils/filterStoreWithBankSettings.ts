import { IStore } from "@/modules/stores/types";

export function filterStoresWithBankSettings(stores: IStore[] | undefined): IStore[] {
  if (!stores) return [];
  
  return stores.filter((store) => store.bankSettings?.accountSetup == true);
}