'use client'

import { SearchSelect } from '@/components/select'
import { Input } from '@/components/ui/input'
import { useFormikContext } from 'formik'
import { ISetting } from './type'

export default function Stock() {
  const { values, setFieldValue } = useFormikContext<ISetting>()

  return (
    <div className='flex gap-x-3 w-full justify-start items-center p-3 border-[1px] border-slate-300/30 rounded-md'>
      <div className='flex gap-x-2 w-full'>
        <div className='w-[8rem] space-y-2'>
          <div className='pl-2 font-semibold'>股票代號</div>
          <SearchSelect onSearch={() => {}} />
        </div>
        <div className='flex-1 space-y-2'>
          <div className='pl-2 font-semibold'>股票名稱</div>
          <Input disabled className='w-full' />
        </div>
      </div>
    </div>
  )
}
