import { IPurchasesByStore } from "@/modules/dashboard/types/dashboard.interface";
import { IPurchasesBackend } from "..";

export default class DrinksDummyBackend implements IPurchasesBackend {
  getPurchasesById(): Promise<IPurchasesByStore[]> {
    throw new Error("Method not implemented.");
  }
}
