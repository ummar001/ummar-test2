import { ICreateStorePayload, IStore, ISuccess } from "@/modules/stores/types";
import {
  IFormatedAddress,
  formatAddresses,
} from "@/modules/stores/utils/formatAddress";
import axios from "axios";
import { IStoreBackend } from "..";
import { Stores } from "./dummy-data";

export default class StoreDummyBackend implements IStoreBackend {
  stores: IStore[] = Stores;

  async duplicateStore(storeId: string): Promise<ISuccess> {
    const store = this.stores.find((store) => store.id === storeId);
    if (!store) throw new Error("Store not found");
    const newStore = { ...store, id: Math.random().toString() };
    this.stores.push(newStore);
    return { success: true };
  }

  async updateStoreAvailability(
    storeId: string,
    available: boolean
  ): Promise<IStore> {
    const store = this.stores.find((store) => store.id === storeId);
    if (!store) throw new Error("Store not found");
    store.available = available;
    return store;
  }

  async deleteStore(storeId: string): Promise<ISuccess> {
    this.stores = this.stores.filter((store) => store.id !== storeId);
    return { success: true };
  }

  async updateStore(
    storeId: string,
    payload: ICreateStorePayload
  ): Promise<IStore> {
    const storiesWithoutUpdated = this.stores.filter(
      (store) => store.id !== storeId
    );

    const formatedStore: IStore = {
      id: storeId,
      description: payload.description,
      cover: null,
      available: true,
      location: {
        addressLine1: payload.location.addressLine1,
        addressLine2: payload.location.addressLine1,
        city: payload.location.city,
        country: payload.location.country,
        gpsCordinate: payload.location.gpsCordinate,
        id: storeId,
      },
      name: payload.name,
      subName: payload.subName,
      bankSettings: {
        accountId: "",
        accountSetup: false,
        id: "",
      },
      currency: {
        name: "USD",
        symbol: "$",
      },
    };

    this.stores = [...storiesWithoutUpdated, formatedStore];

    return formatedStore;
  }

  async getStore(storeId: string): Promise<IStore> {
    return this.stores.find((store) => store.id === storeId) as IStore;
  }

  async getAddress(
    address: string,
    country: string,
    city: string
  ): Promise<IFormatedAddress[]> {
    let addresses: IFormatedAddress[] = [];

    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${address},${country},${city}&apiKey=4bf63004763a4d8bbccf705a21f91d22`,
        headers: {},
      };

      const response = await axios.request(config);
      const formatedAddress = formatAddresses(response.data);
      addresses = formatedAddress;
      return addresses;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCities(country: string): Promise<string[][]> {
    const cities: string[][] = [];
    const data = JSON.stringify({
      country: country,
    });

    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://countriesnow.space/api/v0.1/countries/cities",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      cities.push(response.data.data);
      return cities;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCountries(): Promise<string[]> {
    const countries: string[] = [];

    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://countriesnow.space/api/v0.1/countries/states",
        headers: {},
      };

      const response = await axios.request(config);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.data.data.map((country: any) => countries.push(country.name));
      return countries;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createStore(payload: ICreateStorePayload): Promise<IStore> {
    const formatedStore: IStore = {
      id: `${this.stores.length + 1}`,
      description: payload.description,
      cover: null,
      available: true,
      location: {
        addressLine1: payload.location.addressLine1,
        addressLine2: payload.location.addressLine1,
        city: payload.location.city,
        country: payload.location.country,
        gpsCordinate: payload.location.gpsCordinate,
        id: `${this.stores.length + 1}`,
      },
      name: payload.name,
      subName: payload.subName,
      bankSettings: {
        accountId: "",
        accountSetup: false,
        id: "",
      },
      currency: {
        name: "USD",
        symbol: "$",
      },
    };
    this.stores.push(formatedStore);

    return formatedStore;
  }

  async getStores(): Promise<IStore[]> {
    return this.stores;
  }
}
