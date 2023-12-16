import { IBankSettings } from "@/modules/bank-settings/interface/bank-settings.interface";

export interface IStoreCurrency {
  name: string
  symbol: string
}

export interface IStore {
  id: string
  name: string
  subName: string
  description: string
  cover: string | null
  available: boolean
  currency: IStoreCurrency;
  location: {
    id: string
    country: string
    city: string
    addressLine1: string
    addressLine2: string
    gpsCordinate: string
  }
  bankSettings: IBankSettings | null
}

export interface ICreateStorePayload {
  name: string
  subName: string
  description: string
  storeCover: string | null
  location: {
    country: string
    city: string
    addressLine1: string
    gpsCordinate: string
  }
}

export interface ICreateStorePayloadSchema {
  name: string
  subName: string
  description: string
  location: {
    country: string
    city: string
    addressLine1: string
    gpsCordinate: string
  }
}

export interface ISuccess {
  success: boolean
}
