'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { AddSetting } from '@/components/lists'
import { redirect } from 'next/navigation'
import Settings from '@/components/lists/settings'
import { Suspense } from 'react'

const Setting = dynamic(() => import('@/components/lists/setting'), {
  ssr: false
})

export default async function RequiredSession() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className='w-full flex-1 mt-[56px] h-full'>
      <Sidebar />
      <div className='px-4 flex flex-col gap-y-4 pb-8'>
        <p className='font-bold py-6 text-2xl'>財務規劃清單</p>
        <Suspense
          fallback={
            <div className='flex flex-col space-y-6'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          }
        >
          <Settings email={session.user.email as string} />
        </Suspense>
        <AddSetting />
      </div>
    </div>
  )
}
