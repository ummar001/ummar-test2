import { deleteFromApi, getFromApi, patchFromApi, postFromApi } from "@/common/api";
import { ICreateExtraPayload, IExtra } from "@/modules/extras/types/extra.interface";
import { ISuccess } from "@/modules/stores/types";
import { IExtraBackend } from "..";
import { EXTRAS_ROUTES } from "../../extras.api.enum";

export default class WaycupExtrasBackend implements IExtraBackend {
  async createExtra(payload: ICreateExtraPayload): Promise<IExtra> {
    const data = await postFromApi<ICreateExtraPayload>(
      EXTRAS_ROUTES.CREATE_EXTRA,
      payload
    );
    return data;
  }
  
  async getExtras(): Promise<IExtra[]> {
    const data: IExtra[] = await getFromApi(EXTRAS_ROUTES.ALL_EXTRAS);
    return data;
  }

  async deleteExtra(storeId: string): Promise<ISuccess> {
    const data: ISuccess = await deleteFromApi(EXTRAS_ROUTES.DELETE_EXTRA + storeId);
    return data;
  }

  async updateExtraAvailability(extraId: string, availability: boolean): Promise<IExtra> {
    const data: IExtra = await patchFromApi(
      EXTRAS_ROUTES.UPDATE_EXTRA_AVAILABILITY + extraId,
      { available: availability }
    );
    return data;
  }
}
