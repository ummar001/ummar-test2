import {
  ICreateDrinkPayload,
  IDrink,
} from "@/modules/drinks/types/drink.interface";
import { ISuccess } from "@/modules/stores/types";
import { IDrinksBackend } from "..";

export default class DrinksDummyBackend implements IDrinksBackend {
  drinks: IDrink[] = [
    {
      available: true,
      id: "3",
      name: "Coke",
      category: "soft",
      drinkType: "soda",
      extras: [],
      sizes: [],
      stores: [],
    },
    {
      available: true,
      id: "1",
      name: "Coke",
      category: "soft",
      drinkType: "soda",
      extras: [],
      sizes: [],
      stores: [],
    },
  ];

  async updateDrinkAvailability(
    id: string,
    available: boolean
  ): Promise<IDrink> {
    this.drinks = this.drinks.map((drink) => {
      if (drink.id === id) {
        drink.available = available;
      }
      return drink;
    });
    return this.drinks.find((drink) => drink.id === id) as IDrink;
  }

  async getDrink(id: string): Promise<IDrink> {
    return this.drinks.find((drink) => drink.id === id) as IDrink;
  }

  async updateDrink(
    id: string,
    updateDrinkPayload: ICreateDrinkPayload
  ): Promise<IDrink> {
    this.drinks = this.drinks.map((drink) => {
      if (drink.id === id) {
        drink = {
          ...drink,
          ...updateDrinkPayload,
          stores: [...drink.stores],
        };
      }
      return drink;
    });
    return this.drinks.find((drink) => drink.id === id) as IDrink;
  }

  async createDrink(createDrinkPayload: ICreateDrinkPayload): Promise<IDrink> {
    this.drinks.push({
      ...createDrinkPayload,
      id: (this.drinks.length + 1).toString(),
      stores: [],
    });
    return this.drinks[this.drinks.length - 1];
  }

  async deleteDrink(id: string): Promise<ISuccess> {
    this.drinks = this.drinks.filter((drink) => drink.id !== id);
    return {
      success: true,
    };
  }

  async getDrinks(): Promise<IDrink[]> {
    return this.drinks;
  }
}
