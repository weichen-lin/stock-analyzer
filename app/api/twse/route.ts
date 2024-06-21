import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const twStockSchema = z.object({
  c: z.string(),
  key: z.string(),
  n: z.string(),
})

const getTWStockSchema = z.object({
  build: z.string(),
  rtcode: z.string(),
  datas: z.array(twStockSchema),
  rtmessage: z.string(),
})

export const GET = async (req: NextRequest, res: NextResponse) => {
  const d = req.nextUrl.searchParams.get('q')
  if (!d) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }

  const twseRes = await fetch(`https://mis.twse.com.tw/stock/api/getStockNames.jsp?n=${d}`)
  try {
    const data = getTWStockSchema.parse(await twseRes.json())
    return NextResponse.json({ error: null, data: data.datas.slice(0, 10) })
  } catch (e) {
    return NextResponse.json({ error: 'parse error', data: null }, { status: 500 })
  }
}
