'use server'

import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { AddSetting } from '@/components/lists'
import Settings from '@/components/lists/settings'
import { Suspense } from 'react'
import { useServerUser } from '@/hooks/auth'

export default async function RequiredSession() {
  const { email } = await useServerUser()

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
          <Settings email={email} />
        </Suspense>
        <AddSetting />
      </div>
    </div>
  )
}
