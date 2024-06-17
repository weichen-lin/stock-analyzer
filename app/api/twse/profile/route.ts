import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const twStocksInfo = z.object({
  msgArray: z.array(
    z.object({
      c: z.string(),
      z: z.string(),
    }),
  ),
})

export const GET = async (req: NextRequest, res: NextResponse) => {
  const d = req.nextUrl.searchParams.get('q')

  if (!d) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }

  const twseRes = await fetch(`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${d}`)
  try {
    const data = twStocksInfo.parse(await twseRes.json())
    return NextResponse.json({ error: null, data: data.msgArray })
  } catch (e) {
    return NextResponse.json({ error: 'parse error', data: null }, { status: 500 })
  }
}
