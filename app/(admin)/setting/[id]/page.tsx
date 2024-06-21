'use server'

import { redirect } from 'next/navigation'
import Planner from './components'
import { z } from 'zod'

export default async function FormSetting({ params }: { params: { id: string } }) {
  try {
    z.string().uuid().parse(params.id)

    return <Planner />
  } catch (err) {
    console.log(err)
    redirect('/lists')
  }
}
