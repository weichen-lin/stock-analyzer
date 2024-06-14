'use server'

import { redirect } from 'next/navigation'
import Planner from './components'
import { z } from 'zod'

export default async function FormSetting({ params }: { params: { id: string } }) {
  try {
    z.string().uuid().parse(params.id)

    return (
      <div className='w-full flex-1 pt-[72px] h-full'>
        <Planner />
      </div>
    )
  } catch {
    redirect('/lists')
  }
}
