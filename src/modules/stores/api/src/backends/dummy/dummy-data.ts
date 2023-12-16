import { IStore } from "@/modules/stores/types";

export const Store: IStore = {
  id: "1",
  name: "Store 1",
  subName: "Store 1 Sub Name",
  description: "Store 1 Description",
  available: true,
  cover: null,
  location: {
    id: "1",
    country: "United Kingdom",
    city: "London",
    addressLine1: "Street 1",
    addressLine2: "Street 2",
    gpsCordinate: "123456, 123456",
  },
  bankSettings: {
    id: "1",
    accountId: "123456789",
    accountSetup: true,
  },
  currency: {
    name: "USD",
    symbol: "$",
  },
};

export const Stores: IStore[] = [
  {
    id: "1",
    name: "Store 1",
    subName: "Store 1 Sub Name",
    description: "Store 1 Description",
    available: true,
    cover: null,
    location: {
      id: "1",
      country: "United Kingdom",
      city: "London",
      addressLine1: "Street 1",
      addressLine2: "Street 2",
      gpsCordinate: "123456, 123456",
    },
    bankSettings: {
      id: "1",
      accountId: "123456789",
      accountSetup: true,
    },
    currency: {
      name: "USD",
      symbol: "$",
    },
  },
  {
    id: "2",
    name: "Store 2",
    subName: "Store 2 Sub Name",
    description: "Store 2 Description",
    available: true,
    cover: null,
    location: {
      id: "2",
      country: "United States",
      city: "New York",
      addressLine1: "Street 3",
      addressLine2: "Street 4",
      gpsCordinate: "987654, 987654",
    },
    bankSettings: {
      id: "1",
      accountId: "123456789",
      accountSetup: true,
    },
    currency: {
      name: "USD",
      symbol: "$",
    },
  },
];
