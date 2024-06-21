import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'

export default function StockPrice({ index }: { index: number }) {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const region = values.region
  const c = region === 'us' ? 'USD' : 'NTD'

  const format = currency(stock.price, { precision: 2, symbol: '' }).format()

  const [price, unit] = format.split('.')

  return (
    <td className='px-4 py-2 flex items-center justify-between'>
      <div className='text-sm font-bold text-slate-500'>{c}</div>
      <div className='flex items-baseline'>
        <div className='font-semibold'>{price}</div>
        <div className=''>.</div>
        <div className='text-sm'>{unit}</div>
      </div>
    </td>
  )
}
