export interface IBankSettings {
  id: string
  accountId: string
  accountSetup: boolean
}

export interface IBankSettingsCreate {
  object: string
  created: number
  expires_at: number
  url: string
}

export interface IDeleteBankSettings {
  id: string
  object: string
  deleted: boolean
}

export interface IBankSettingsCreatePayload {
  storeId: string
}

export interface IDuplicateBankSettingsPayload {
  storeId: string
  templateStoreId: string
}
