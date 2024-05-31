'use server'

import Sidebar from '@/components/sidebar'
import { redirect } from 'next/navigation'
import { useServerUser } from '@/hooks/auth'
import Planner from './components'
import { z } from 'zod'

export default async function FormSetting({ params }: { params: { id: string } }) {
  const { email } = await useServerUser()

  try {
    const id = z.string().uuid().parse(params.id)

    return (
      <div className='w-full mt-[56px] h-[100%-56px] pb-24'>
        <Sidebar />
        <Planner id={id} email={email} />
      </div>
    )
  } catch {
    redirect('/lists')
  }
}
