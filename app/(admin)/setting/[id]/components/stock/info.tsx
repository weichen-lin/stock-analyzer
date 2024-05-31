'use client'

import { useFormikContext } from 'formik'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ISettingData } from '@/finance/setting'

function StockInfo({ index }: { index: number }) {
  const { values } = useFormikContext<ISettingData>()
  const stock = values.stocks[index]

  return (
    <div className='flex gap-x-2 w-full'>
      <Image
        src={stock.image === '' ? '/loader.svg' : stock.image}
        width={70}
        height={70}
        alt='test'
        className='border-[1px] border-slate-300 bg-slate-700 p-2'
      />
      <div className='flex-1 space-y-2'>
        <div className='pl-2 font-semibold'>股票名稱</div>
        <Input disabled className='w-full' value={stock.name} />
      </div>
    </div>
  )
}

export default StockInfo
