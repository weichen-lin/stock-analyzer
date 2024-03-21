import axios from 'axios'

const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY

const fetcher = axios.create({
  baseURL: 'https://financialmodelingprep.com',
  params: {
    apikey: FMP_API_KEY,
  },
})

export interface IStock {
  symbol: string
  name: string
  currency: string
  stockExchange: string
  exchangeShortName: string
}

export interface IStockProfile {
  symbol: string
  price: number
  image: string
}

export const queryStocks = async (query: string) => {
  try {
    const { data } = await fetcher.get<IStock[]>('/api/v3/search', {
      params: {
        query,
        limit: 10,
      },
    })

    return data
  } catch {
    return []
  }
}

export const getStockProfile = async (symbol: string) => {
  try {
    const { data } = await fetcher.get<IStockProfile[]>(`/api/v3/profile/${symbol}`)
    return Array.isArray(data) ? data[0] : null
  } catch {
    return null
  }
}
