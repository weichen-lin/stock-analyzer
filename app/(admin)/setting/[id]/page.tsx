'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '@/components/sidebar'
import dynamic from 'next/dynamic'
import { Title } from '@/components/setting'
import { redirect } from 'next/navigation'
import { getSetting } from '@/finance/setting'

const Form = dynamic(() => import('@/components/form/root'), { ssr: false })

export default async function FormSetting({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  try {
    const data = await getSetting({
      email: session.user.email as string,
      id: params.id,
    })
    return (
      <div className='w-full mt-[56px] h-[100%-56px] pb-24'>
        <Sidebar />
        <Title title={data.name} />
        <Form {...data.settings} />
      </div>
    )
  } catch {
    redirect('/lists')
  }
}
