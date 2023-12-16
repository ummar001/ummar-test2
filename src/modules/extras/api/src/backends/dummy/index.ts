import { ICreateExtraPayload, IExtra } from "@/modules/extras/types/extra.interface";
import { ISuccess } from "@/modules/stores/types";
import { IExtraBackend } from "..";

export default class ExtrasDummyBackend implements IExtraBackend {
  extras: IExtra[] = [
    {
      id: "1",
      name: "Extra 1",
      available: true,
      category: "category",
      price: 1,
      currencyCode: "EUR"
    },
    {
      id: "2",
      name: "Extra 2",
      available: true,
      category: "category",
      price: 1,
      currencyCode: "EUR"
    },
  ];

  async createExtra(payload: ICreateExtraPayload): Promise<IExtra> {
    this.extras.push({
      id: (this.extras.length + 1).toString(),
      name: payload.name,
      available: true,
      category: payload.category,
      price: payload.price,
      currencyCode: "EUR"
    });
    return this.extras[this.extras.length - 1];
  }

  async deleteExtra(extraId: string): Promise<ISuccess> {
    this.extras = this.extras.filter((extra) => extra.id !== extraId);

    return {
      success: true,
    };
  }

  async getExtras(): Promise<IExtra[]> {
    return this.extras;
  }

  async updateExtraAvailability(
    extraId: string,
    availability: boolean
  ): Promise<IExtra> {
    this.extras = this.extras.map((extra) => {
      if (extra.id === extraId) {
        extra.available = availability;
      }
      return extra;
    });
    return this.extras.find((extra) => extra.id === extraId) as IExtra;
  }
}
