import { CurrencyInput } from '@/components/input'
import { useFormikContext } from 'formik'
import { ISetting } from './stock/type'
import currency from 'currency.js'

export default function Cash() {
  const { values, setFieldValue } = useFormikContext<ISetting>()

  const stocksValue = values.stocks
    .map((e) => {
      if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0) return 0
      return currency(e.shares).multiply(e.averageCost).value
    })
    .reduce((a, b) => a + b, 0)

  const maybeTotal =
    currency(values.cash).value > stocksValue
      ? currency(values.cash).toString()
      : currency(values.cash).add(stocksValue).toString()

  return (
    <div className='flex flex-col p-3 space-y-2'>
      <div className='pl-2 font-semibold'>總投入現金</div>
      <CurrencyInput
        cashValue={maybeTotal}
        onChange={(e) => {
          setFieldValue('cash', e)
        }}
      />
    </div>
  )
}
