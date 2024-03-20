import axios from 'axios'

const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY

const fetcher = axios.create({
  baseURL: 'https://financialmodelingprep.com',
  params: {
    apikey: FMP_API_KEY,
  },
})

interface IStock {
  symbol: string
  name: string
  currency: string
  stockExchange: string
  exchangeShortName: string
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
  } catch (error) {
    console.error(error)
    return []
  }
}
