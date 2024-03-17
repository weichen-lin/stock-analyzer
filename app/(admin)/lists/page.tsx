'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Setting } from '@/components/lists'

export default async function RequiredSession() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <div className='w-full flex-1 mt-[56px] h-full'>
      <Sidebar />
      <div className='px-4 flex flex-col gap-y-4'>
        <p className='font-bold py-8 text-2xl'>Financial Planning</p>
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
        <Setting />
      </div>
    </div>
  )
}
