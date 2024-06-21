import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'
import { cn } from '@/lib/utils'

export default function PercentageChange({ index }: { index: number }) {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const getAverageCost = () => {
    return currency(stock.averageCost, { precision: 2 }).value
  }

  const average = getAverageCost()

  if (average === 0 || stock.price === 0) return <td className='px-4 text-slate-300 flex items-center'>--</td>

  const percent = currency(stock.price, { precision: 4 })
    .subtract(stock.averageCost)
    .divide(stock.averageCost)
    .multiply(100)

  return (
    <td className='flex items-center px-4'>
      <div className={cn(percent.value > 0 ? 'text-red-500' : 'text-green-500', 'font-semibold')}>
        {percent.value} %
      </div>
    </td>
  )
}
