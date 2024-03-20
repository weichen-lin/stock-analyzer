interface IStockConfig {
  symbol: string
  name: string
  currency: string
  stockExchange: string
  exchangeShortName: string
}

export interface ISetting {
  cash: string
  stocks: IStockConfig[]
}
