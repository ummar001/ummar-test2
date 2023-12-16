import { environment } from "@/common/environment";
import { ICreateExtraPayload, IExtra } from "@/modules/extras/types/extra.interface";
import { ISuccess } from "@/modules/stores/types";

export interface IExtraBackend {
  createExtra(payload: ICreateExtraPayload): Promise<IExtra>;
  deleteExtra(extraId: string): Promise<ISuccess>;
  getExtras(): Promise<IExtra[]>;
  updateExtraAvailability(extraId: string, availability: boolean): Promise<IExtra>;
}

let extraBackendInstance: IExtraBackend | undefined;

export async function getExtrasBackend(): Promise<IExtraBackend> {
  if (extraBackendInstance === undefined) {
    const mod = await import(`./${environment.EXTRAS_BACKEND}`);
    extraBackendInstance = new mod.default() as IExtraBackend;
  }
  return extraBackendInstance;
}
