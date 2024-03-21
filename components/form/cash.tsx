import { CurrencyInput } from '@/components/input'
import { useFormikContext, useField } from 'formik'
import { ISetting } from './stock/type'
import currency from 'currency.js'

export default function Cash() {
  const { values } = useFormikContext<ISetting>()
  const [field, meta, helpers] = useField<string>('cash')

  const { value } = meta
  const { setValue } = helpers

  const stocksValue = values.stocks
    .map((e) => {
      if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0) return 0
      return currency(e.shares).multiply(e.averageCost).value
    })
    .reduce((a, b) => a + b, 0)

  const cashLower = currency(values.cash).subtract(stocksValue).value < 0

  return (
    <div className='flex flex-col p-3 space-y-2'>
      <div className='pl-2 font-semibold'>目前帳戶總資產</div>
      <div className=''>
        <CurrencyInput
          cashValue={value}
          onChange={(e) => {
            setValue(e)
          }}
          error={cashLower}
        />
        {cashLower && <div className='text-red-500 text-sm pl-1'>與股票總價值不符</div>}
      </div>
    </div>
  )
}
