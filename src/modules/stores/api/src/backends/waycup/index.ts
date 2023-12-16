import { deleteFromApi, getFromApi, patchFromApi, postFromApi } from "@/common/api";
import {
  ICreateStorePayload,
  ICreateStorePayloadSchema,
  IStore,
  ISuccess,
} from "@/modules/stores/types";
import {
  IFormatedAddress, formatAddresses
} from "@/modules/stores/utils/formatAddress";
import axios from "axios";
import { IStoreBackend } from "..";
import { STORE_ROUTES } from "../../store.api.enum";

export default class StoreWaycupBackend implements IStoreBackend {
  async duplicateStore(storeId: string): Promise<ISuccess> {
    try {
      const data: ISuccess = await patchFromApi(
        STORE_ROUTES.STORE + storeId + "/duplicate"
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async deleteStore(storeId: string): Promise<ISuccess> {
    try {
      const data: ISuccess = await deleteFromApi(
        STORE_ROUTES.STORE + storeId
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  }
  
  async updateStoreAvailability(
    storeId: string,
    available: boolean
  ): Promise<IStore> {
    try {
      const data: IStore = await patchFromApi(
        STORE_ROUTES.UPDATE_STORE_AVAILABILITY + storeId + "/availabilities",
        { available }
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateStore(
    storeId: string,
    payload: ICreateStorePayload
  ): Promise<IStore> {
    try {
      const data: IStore = await patchFromApi<ICreateStorePayloadSchema>(
        STORE_ROUTES.UPDATE_STORE + storeId,
        {
          description: payload.description,
          name: payload.name,
          location: payload.location,
          subName: payload.subName,
        }
      );
      const cover = payload.storeCover as unknown as File;
      if (payload.storeCover && cover.type) {
        const coverForm = new FormData();
        coverForm.append("file", payload.storeCover);
        const coverData = await patchFromApi(
          STORE_ROUTES.UPDATE_STORE_COVER + storeId,
          coverForm
        );
        data.cover = coverData.cover;
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getStore(storeId: string): Promise<IStore> {
    try {
      const data: IStore = await getFromApi(STORE_ROUTES.STORE + storeId);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
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
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${address},${city},${country}&apiKey=4bf63004763a4d8bbccf705a21f91d22`,
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
    try {
      const data: IStore = await postFromApi<ICreateStorePayload>(
        STORE_ROUTES.CREATE_STORE,
        payload
      );
      const cover = payload.storeCover as unknown as File;
      if (payload.storeCover && cover.type) {
        const coverForm = new FormData();
        coverForm.append("file", payload.storeCover);
        const coverData = await patchFromApi(
          STORE_ROUTES.UPDATE_STORE_COVER + data.id,
          coverForm
        );
        data.cover = coverData.cover;
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getStores(): Promise<IStore[]> {
    const stores: IStore[] = await getFromApi(STORE_ROUTES.STORES);
    return stores;
  }
}
