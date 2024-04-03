import { CurrencyInput } from '@/components/input'
import { useFormikContext, useField } from 'formik'
import { ISettingData } from '@/finance/setting'
import currency from 'currency.js'

export default function Cash() {
  const { values } = useFormikContext<ISettingData>()
  const [field, meta, helpers] = useField<string>('cash')

  const { value } = meta
  const { setValue } = helpers

  const stocksValue = values.stocks
    .map((e) => {
      if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0) return 0
      return currency(e.shares).multiply(e.averageCost).value
    })
    .reduce((a, b) => a + b, 0)

  const totalLower = currency(values.cash).subtract(stocksValue)

  return (
    <div className='flex flex-col p-3 md:px-0 space-y-4 mb-4'>
      <div className='w-full flex flex-col justify-between gap-y-2'>
        <div className='flex w-full justify-between'>
          <div className='pl-2 font-semibold'>
            總投入現金<span className='text-slate-500 text-sm px-2'>(自行填入)</span>
          </div>
        </div>
        <div className='text-lg w-full font-semibold flex flex-col items-start'>
          <CurrencyInput
            cashValue={value}
            onChange={(e) => {
              setValue(e)
            }}
            error={totalLower.value < 0}
          />
          {totalLower.value < 0 && <div className='text-red-500 text-sm pl-1'>投入現金與股票總值不符</div>}
        </div>
      </div>
    </div>
  )
}
