import { environment } from "@/common/environment";
import { ICreateStorePayload, IStore, ISuccess } from "@/modules/stores/types";
import { IFormatedAddress } from "@/modules/stores/utils/formatAddress";

export interface IStoreBackend {
    getStores(): Promise<IStore[]>;
    createStore(payload: ICreateStorePayload): Promise<IStore>;
    updateStore(storeId: string, payload: ICreateStorePayload): Promise<IStore>;
    getCities: (country: string) => Promise<string[][]>;
    getCountries: () => Promise<string[]>;
    getAddress: (address: string, country: string, city: string) => Promise<IFormatedAddress[]>;
    getStore: (storeId: string) => Promise<IStore>;
    updateStoreAvailability: (storeId: string, available: boolean) => Promise<IStore>;
    deleteStore: (storeId: string) => Promise<ISuccess>;
    duplicateStore: (storeId: string) => Promise<ISuccess>;
}

let storeBackendInstance: IStoreBackend | undefined;

export async function getStoreBackend (): Promise<IStoreBackend> {
  if (storeBackendInstance === undefined) {
    const mod = await import(`./${environment.STORE_BACKEND}`);
    storeBackendInstance = new mod.default() as IStoreBackend;
  }
  return storeBackendInstance;
}
