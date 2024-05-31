'use server'

import Sidebar from '@/components/sidebar'
import { useServerUser } from '@/hooks/auth'
import { Settings } from './components'

export default async function RequiredSession() {
  const { email } = await useServerUser()

  return (
    <div className='w-full flex-1 mt-[56px] h-full'>
      <Sidebar />
      <div className='px-4 flex flex-col gap-y-4 pb-8'>
        <p className='font-bold py-6 text-2xl'>財務規劃清單</p>
        <Settings email={email} />
      </div>
    </div>
  )
}
