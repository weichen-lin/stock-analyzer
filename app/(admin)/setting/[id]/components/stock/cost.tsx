'use client'

import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Input } from '@/components/ui/input'
import { WholeNumberInput, CurrencyInput } from '@/components/input'

function StockCost({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  return (
    <div className='flex gap-x-2 w-full'>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>投入股數</div>
        <WholeNumberInput
          number={stock.shares}
          onChange={e => {
            setFieldValue(`stocks[${index}].shares`, e)
          }}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>平均成本</div>
        <CurrencyInput
          cashValue={stock.averageCost}
          onChange={e => {
            setFieldValue(`stocks[${index}].averageCost`, e)
          }}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>市值</div>
        <Input disabled className='w-full' value={stock.price} />
      </div>
    </div>
  )
}

export default StockCost
