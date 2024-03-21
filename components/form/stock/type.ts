interface IStockConfig {
  symbol: string
  name: string
  targetPosition: string
  image: string
  price: string
  shares: string
  averageCost: string
}
export interface ISetting {
  cash: string
  stocks: IStockConfig[]
}
