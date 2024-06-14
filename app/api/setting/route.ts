import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { stocksSchema, stockSchema } from './type'

const createSettingSchema = z.object({
  name: z.string().min(1).max(255),
  region: z.string().min(2).max(255),
})

export const GET = async (req: NextRequest, res: NextResponse) => {
  const d = req.nextUrl.searchParams.get('id')
  if (!d || z.string().uuid().safeParse(d).success === false) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }

  const client = createClient()
  const { data: user } = await client.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'user not found', data: null }, { status: 401 })
  }

  const { data: setting, error } = await client
    .from('settings')
    .select('id, update_at, name, region, stocks, total')
    .eq('user_id', user?.user?.id)
    .eq('id', d)
    .single()

  if (error || !setting) {
    return NextResponse.json({ error: 'failed to fetch settings', data: null }, { status: 500 })
  }

  try {
    const info = stocksSchema.parse(setting)
    return NextResponse.json({ data: info, error: null })
  } catch {
    return NextResponse.json({ error: 'invalid data', data: null }, { status: 500 })
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const d = await req.json()
    const data = createSettingSchema.parse(d)

    const client = createClient()
    const { data: user } = await client.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'user not found', data: null }, { status: 401 })
    }

    const { error } = await client.from('settings').insert({ ...data, user_id: user?.user?.id, stocks: [] })
    if (error) {
      return NextResponse.json({ error: 'failed to create setting', data: null }, { status: 500 })
    }

    return NextResponse.json({ data: true, error: null })
  } catch (e) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }
}

const updateSchema = z.object({
  id: z.string().uuid(),
  total: z.string(),
  stocks: z.array(stockSchema),
})

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const d = await req.json()
    const data = updateSchema.parse(d)

    const client = createClient()
    const { data: user } = await client.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'user not found', data: null }, { status: 401 })
    }

    const { error } = await client
      .from('settings')
      .update({ total: data.total, stocks: data.stocks, update_at: new Date() })
      .eq('user_id', user?.user?.id)
      .eq('id', data.id)

    if (error) {
      return NextResponse.json({ error: 'failed to update setting', data: null }, { status: 500 })
    }

    return NextResponse.json({ data: true, error: null })
  } catch (e) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }
}
