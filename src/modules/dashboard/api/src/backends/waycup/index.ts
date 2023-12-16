import { getFromClientApi } from "@/common/api";
import { IPurchasesByStore } from "@/modules/dashboard/types/dashboard.interface";
import { IPurchasesBackend } from "..";
import { DASHBOARD_ROUTES } from "../../dashboard.api.enum";

export default class WaycupDrinkBackend implements IPurchasesBackend {
  async getPurchasesById(storeId: string): Promise<IPurchasesByStore[]> {
    const data: IPurchasesByStore[] = await getFromClientApi(
      DASHBOARD_ROUTES.GET_PURCHASES + storeId
    );
    return data;
  }
}
