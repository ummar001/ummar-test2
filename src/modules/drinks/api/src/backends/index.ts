import { environment } from "@/common/environment";
import {
  ICreateDrinkPayload,
  IDrink,
} from "@/modules/drinks/types/drink.interface";
import { ISuccess } from "@/modules/stores/types";

export interface IDrinksBackend {
  getDrinks(): Promise<IDrink[]>
  getDrink(id: string): Promise<IDrink>
  updateDrink(
    id: string,
    updateDrinkPayload: ICreateDrinkPayload,
  ): Promise<IDrink>
  createDrink(createDrinkPayload: ICreateDrinkPayload): Promise<IDrink>
  deleteDrink(id: string): Promise<ISuccess>
  updateDrinkAvailability:(id: string, available: boolean) => Promise<IDrink>
}

let drinkBackendInstance: IDrinksBackend | undefined;

export async function getDrinksBackend(): Promise<IDrinksBackend> {
  if (drinkBackendInstance === undefined) {
    const mod = await import(`./${environment.DRINK_BACKEND}`);
    drinkBackendInstance = new mod.default() as IDrinksBackend;
  }
  return drinkBackendInstance;
}
