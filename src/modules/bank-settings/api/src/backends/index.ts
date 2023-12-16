import { environment } from "@/common/environment";
import {
  IBankSettingsCreate,
  IDeleteBankSettings,
  IDuplicateBankSettingsPayload,
} from "@/modules/bank-settings/interface/bank-settings.interface";
import { IStore } from "@/modules/stores/types";

export interface IBankSettingsBackend {
  verifyBankSettings(storeId: string): Promise<IStore>
  createBankSettings(storeId: string): Promise<IBankSettingsCreate>
  updateBankSettings(storeId: string): Promise<IBankSettingsCreate>
  deleteBankSettings(storeId: string): Promise<IDeleteBankSettings>
  duplicateBankSettingsForStore({
    storeId,
    templateStoreId,
  }: IDuplicateBankSettingsPayload): Promise<IStore>
}

let bankSettingsInstance: IBankSettingsBackend | undefined;

export async function getBankSettingsBackend(): Promise<IBankSettingsBackend> {
  if (bankSettingsInstance === undefined) {
    const mod = await import(`./${environment.BANK_SETTINGS_BACKEND}`);
    bankSettingsInstance = new mod.default() as IBankSettingsBackend;
  }
  return bankSettingsInstance;
}
