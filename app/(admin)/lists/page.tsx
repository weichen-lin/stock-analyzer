import { Setting, AddSetting } from './components'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { settingSchema } from './components'
import currency from 'currency.js'
import { z } from 'zod'
export const dynamic = 'force-dynamic'

const usdtwdSchema = z.object({
  USDTWD: z.object({
    Exrate: z.number(),
  }),
})

export default async function Lists() {
  const client = createClient()
  const { data } = await client.auth.getUser()

  if (!data || !data.user) {
    redirect('/login')
  }

  const { data: lists, error } = await client
    .from('settings')
    .select('id, user_id, name, region, total, update_at')
    .eq('user_id', data.user.id)
    .order('update_at', { ascending: false })

  if (error) {
    redirect('/login')
  }

  try {
    const ratios = await fetch('https://tw.rter.info/capi.php', { method: 'GET', cache: 'no-store' })
    const d = usdtwdSchema.parse(await ratios.json())

    const settings = lists.map(setting => settingSchema.parse(setting))

    let totals: number = 0

    settings.forEach(setting => {
      if (setting.region === 'tw') {
        totals += currency(setting.total).value
      } else {
        totals += currency(setting.total).multiply(d.USDTWD.Exrate).value
      }
    })

    return (
      <div className='flex-1 pt-24 h-full flex items-start justify-start flex-col gap-y-6 w-full'>
        <AddSetting totals={totals} />
        <div className='px-8 flex flex-col gap-y-4 pb-8 w-full'>
          <div className='flex flex-col gap-4 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {settings.map(setting => (
              <Setting key={setting.id} {...setting} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (e) {
    redirect('/login')
  }
}
