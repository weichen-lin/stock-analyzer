'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '@/components/sidebar'
import dynamic from 'next/dynamic'
import { Title } from '@/components/setting'

const Form = dynamic(() => import('@/components/form/root'), { ssr: false })

export default async function RequiredSession() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className='w-full mt-[56px] h-[100%-56px]'>
      <Sidebar />
      <Title title='Current Setting' />
      <Form />
    </div>
  )
}
