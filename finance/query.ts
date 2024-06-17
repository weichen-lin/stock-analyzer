import axios from 'axios'
import currency from 'currency.js'
import { z } from 'zod'
const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY

const fetcher = axios.create({
  baseURL: 'https://financialmodelingprep.com',
  params: {
    apikey: FMP_API_KEY,
  },
})

const stockSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  key: z.string(),
})

export type IStock = z.infer<typeof stockSchema>

const profileSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  image: z.string(),
})

export type IStockProfile = z.infer<typeof profileSchema>

export const queryUSStocks = async (query: string): Promise<IStock[]> => {
  try {
    const { data } = await fetcher.get<IStock[]>('/api/v3/search', {
      params: {
        query,
        limit: 10,
      },
    })

    return data.map(e =>
      stockSchema.parse({
        symbol: e.symbol,
        name: e.name,
        key: e.symbol,
      }),
    )
  } catch {
    return []
  }
}

export const queryTWStocks = async (query: string): Promise<IStock[]> => {
  try {
    const res = await fetch(`/api/twse?q=${query}`, { method: 'GET' })
    const data = await res.json()
    console.log({ data })

    if (data.error) {
      return []
    }

    return data.data.map((e: any) =>
      stockSchema.parse({
        symbol: e.n,
        name: e.n,
        key: e.key,
      }),
    )
  } catch {
    return []
  }
}

export const getUSStockProfile = async (symbol: string) => {
  try {
    const { data } = await fetcher.get<IStockProfile[]>(`/api/v3/profile/${symbol}`)
    console.log({ data })
    return Array.isArray(data) ? data[0] : null
  } catch {
    return null
  }
}

export const getTWStockProfile = async (key: string): Promise<IStockProfile[]> => {
  try {
    const res = await fetch(`/api/twse/profile?q=${key}`, { method: 'GET' })
    const data = await res.json()

    if (data.error) {
      return []
    }

    return data.data.map((e: any) =>
      profileSchema.parse({
        symbol: e.c,
        price: currency(e.z, { symbol: 'NTD' }).value,
        image: '',
      }),
    )
  } catch {
    return []
  }
}
