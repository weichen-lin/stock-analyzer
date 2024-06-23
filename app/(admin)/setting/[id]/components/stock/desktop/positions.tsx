import { SearchSelect } from '@/components/select'
import { useFormikContext } from 'formik'
import { getUSStockProfile, getTWStockProfile } from '@/finance/query'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'
import { NumberInput } from '@/components/input'

const CurrentPorsition = ({ index }: { index: number }) => {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  console.log({ stocks: values.stocks })

  const stocksValue = values.stocks
    .map(e => {
      if (currency(e.shares).value === 0) return 0
      return currency(e.shares).multiply(e.price).value
    })
    .reduce((a, b) => a + b, 0)

  const percent = currency(stock.shares, { precision: 2, symbol: '' })
    .multiply(stock.price)
    .divide(stocksValue)
    .multiply(100)
    .format()

  const [price, unit] = percent.split('.')

  return stocksValue === 0 ? (
    <td className='flex items-center px-4 justify-start text-slate-300'>--</td>
  ) : (
    <td className='flex items-center px-4 justify-start'>
      <div className='flex items-baseline'>
        <div className='font-semibold'>{price}</div>
        <div>.</div>
        <div className='text-sm'>{unit}</div>
      </div>
    </td>
  )
}

const TargetPosition = ({ index }: { index: number }) => {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]
  const isSelect = stock.symbol !== ''

  return (
    <td className='px-4 flex items-center'>
      <NumberInput
        number={stock.targetPosition}
        onChange={e => {
          setFieldValue(`stocks[${index}].targetPosition`, e)
        }}
        max={100}
        disabled={!isSelect}
      />
    </td>
  )
}

export { CurrentPorsition, TargetPosition }
