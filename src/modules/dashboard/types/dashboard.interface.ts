export interface IDashboardSetupItem {
  completed: boolean
  name: string
  component: React.ReactNode
}

export interface IPurchasesByStore {
  id: string
  storeId: string
  drinkSize: string
  quantity: number
  purchaseDate: Date
  reedemEndDate: Date
  drinkId: string
  extrasId: string[]
  exangableDrinksId: string[]
  quantityReedemed: number
  bundleId: string
  user: string
}
