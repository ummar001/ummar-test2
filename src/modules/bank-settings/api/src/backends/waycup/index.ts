import {
  deleteFromApi,
  getFromApi,
  patchFromApi,
  postFromApi,
  putFromApi,
} from "@/common/api";
import {
  IBankSettingsCreate,
  IBankSettingsCreatePayload,
  IDeleteBankSettings,
  IDuplicateBankSettingsPayload,
} from "@/modules/bank-settings/interface/bank-settings.interface";
import { IStore } from "@/modules/stores/types";
import { IBankSettingsBackend } from "..";
import { BANK_SETTINGS_ROUTES } from "../../bank-settings.api.enum";

export default class WaycupBankSettingsBackend implements IBankSettingsBackend {
  async duplicateBankSettingsForStore({
    storeId,
    templateStoreId,
  }: IDuplicateBankSettingsPayload): Promise<IStore> {
    const data: IStore = await putFromApi<IDuplicateBankSettingsPayload>(
      BANK_SETTINGS_ROUTES.DUPLICATE_BANK_SETTINGS,
      {
        storeId,
        templateStoreId,
      }
    );
    return data;
  }

  async verifyBankSettings(storeId: string): Promise<IStore> {
    const data: IStore = await getFromApi(
      BANK_SETTINGS_ROUTES.CHECK_BANK_SETTINGS + storeId
    );
    return data;
  }

  async deleteBankSettings(storeId: string): Promise<IDeleteBankSettings> {
    const data: IDeleteBankSettings = await deleteFromApi(
      BANK_SETTINGS_ROUTES.DELETE_BANK_SETTINGS + storeId
    );
    return data;
  }

  async updateBankSettings(storeId: string): Promise<IBankSettingsCreate> {
    const data: IBankSettingsCreate =
      await patchFromApi<IBankSettingsCreatePayload>(
        BANK_SETTINGS_ROUTES.UPDATE_BANK_SETTINGS,
        { storeId }
      );
    return data;
  }

  async createBankSettings(storeId: string): Promise<IBankSettingsCreate> {
    const data: IBankSettingsCreate =
      await postFromApi<IBankSettingsCreatePayload>(
        BANK_SETTINGS_ROUTES.CREATE_BANK_SETTINGS,
        { storeId }
      );
    return data;
  }
}
