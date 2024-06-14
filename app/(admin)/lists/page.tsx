import { Setting, AddSetting } from './components'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { settingSchema } from './components'

export const dynamic = 'force-dynamic'

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
    .order('update_at', { ascending: true })

  if (error) {
    redirect('/login')
  }

  try {
    const settings = lists.map((setting) => settingSchema.parse(setting))

    return (
      <div className='w-full flex-1 pt-[72px] h-full'>
        <div className='px-4 flex flex-col gap-y-4 pb-8'>
          <AddSetting />
          <div className='flex flex-col gap-4'>
            {settings.map((setting) => (
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
