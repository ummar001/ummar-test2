import {
  deleteFromApi,
  getFromApi,
  patchFromApi,
  postFromApi,
} from "@/common/api";
import {
  ICreateDrinkPayload,
  IDrink,
} from "@/modules/drinks/types/drink.interface";
import { ISuccess } from "@/modules/stores/types";
import { IDrinksBackend } from "..";
import { DRINKS_ROUTES } from "../../drinks.api.enum";

export default class WaycupDrinkBackend implements IDrinksBackend {
  async updateDrinkAvailability(
    id: string,
    available: boolean
  ): Promise<IDrink> {
    const data: IDrink = await patchFromApi(
      DRINKS_ROUTES.UPDATE_DRINK_AVAILABILITY + id,
      { available }
    );
    return data;
  }
  
  async getDrinks(): Promise<IDrink[]> {
    const data: IDrink[] = await getFromApi(DRINKS_ROUTES.DRINKS);
    return data;
  }

  async getDrink(id: string): Promise<IDrink> {
    const data: IDrink = await getFromApi(DRINKS_ROUTES.DRINK + id);
    return data;
  }

  async updateDrink(
    id: string,
    updateDrinkPayload: ICreateDrinkPayload
  ): Promise<IDrink> {
    const data: IDrink = await patchFromApi<ICreateDrinkPayload>(
      DRINKS_ROUTES.UPDATE_DRINK + id,
      updateDrinkPayload
    );
    return data;
  }

  async createDrink(createDrinkPayload: ICreateDrinkPayload): Promise<IDrink> {
    const data: IDrink = await postFromApi<ICreateDrinkPayload>(
      DRINKS_ROUTES.CREATE_DRINKS,
      createDrinkPayload
    );
    return data;
  }

  async deleteDrink(id: string): Promise<ISuccess> {
    const data: ISuccess = await deleteFromApi(DRINKS_ROUTES.DELETE_DRINK + id);
    return data;
  }
}
