interface IStockConfig {
  symbol: string
  name: string
  currency: string
  stockExchange: string
  exchangeShortName: string
  currentPosition: string
  targetPosition: string
  image: string
  price: number
  shares: string
  averageCost: string
}

export interface ISetting {
  cash: string
  stocks: IStockConfig[]
}
