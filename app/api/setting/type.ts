import { z } from 'zod'

export const stockSchema = z.object({
  image: z.string(),
  name: z.string(),
  price: z.number(),
  shares: z.string(),
  symbol: z.string(),
  targetPosition: z.string(),
  averageCost: z.string()
})

export const stocksSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  region: z.string().min(2).max(255),
  total: z.string(),
  update_at: z.string(),
  stocks: z.array(stockSchema)
})

export type IStocksSchema = z.infer<typeof stocksSchema>
export type IStockSchema = z.infer<typeof stockSchema>
