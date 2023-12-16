import { environment } from "@/common/environment";
import {
  IPurchasesByStore
} from "@/modules/dashboard/types/dashboard.interface";

export interface IPurchasesBackend {
  getPurchasesById(storeId: string): Promise<IPurchasesByStore[]>
}

let purchasesBackendInstance: IPurchasesBackend | undefined;

export async function getPurchasesBackend(): Promise<IPurchasesBackend> {
  if (purchasesBackendInstance === undefined) {
    const mod = await import(`./${environment.DRINK_BACKEND}`);
    purchasesBackendInstance = new mod.default() as IPurchasesBackend;
  }
  return purchasesBackendInstance;
}
