export interface IExtra {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  currencyCode: string
}

export interface ICreateExtraPayload {
  name: string
  price: number
  category: string
  currencyCode: string
}
