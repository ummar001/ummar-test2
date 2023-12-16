
export interface IDrink {
  id: string
  available: boolean
  category: string
  name: string
  sizes: IDrinkSize[]
  stores: string[]
  extras: string[]
  drinkType: string
}

export interface IDrinkSize {
  name: string
  price: number
}

export interface ICreateDrinkPayload {
  name: string
  category: string
  available: boolean
  drinkType: string
  sizes: IDrinkSize[]
  stores: string[]
  extras: string[]
}
