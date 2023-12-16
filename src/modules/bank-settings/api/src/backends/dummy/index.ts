import {
  IBankSettingsCreate,
  IDeleteBankSettings
} from "@/modules/bank-settings/interface/bank-settings.interface";
import { IStore } from "@/modules/stores/types";
import { IBankSettingsBackend } from "..";

export default class DummyBankSettingsBackend implements IBankSettingsBackend {
  duplicateBankSettingsForStore(): Promise<IStore> {
    throw new Error("Method not implemented.");
  }
  async deleteBankSettings(storeId: string): Promise<IDeleteBankSettings> {
    return {
      deleted: true,
      id: storeId,
      object: "bank_account",
    };
  }
  async updateBankSettings(storeId: string): Promise<IBankSettingsCreate> {
    return {
      object: "bank_account",
      created: 1619012345,
      expires_at: 1619012345,
      url: `https://www.waycup.com.br/${storeId}`,
    };
  }

  async verifyBankSettings(storeId: string): Promise<IStore> {
    return {
      available: true,
      id: storeId,
      name: "Dummy Store",
      bankSettings: {
        id: "",
        accountId: "",
        accountSetup: false,
      },
      cover: "",
      description: "",
      location: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        gpsCordinate: "",
        id: "",
      },
      subName: "",
      currency: {
        name: "USD",
        symbol: "$",
      },
    };
  }

  async createBankSettings(storeId: string): Promise<IBankSettingsCreate> {
    return {
      object: "bank_account",
      created: 1619012345,
      expires_at: 1619012345,
      url: `https://www.waycup.com.br/${storeId}`,
    };
  }
}
