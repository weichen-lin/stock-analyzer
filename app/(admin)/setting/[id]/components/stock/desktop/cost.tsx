import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { CurrencyInput } from '@/components/input'

export default function StockCost({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const isSelect = stock.symbol !== ''

  return (
    <td className='px-4 py-2 flex items-center'>
      {isSelect ? (
        <CurrencyInput
          cashValue={stock.averageCost}
          onChange={e => {
            setFieldValue(`stocks[${index}].averageCost`, e)
          }}
        />
      ) : (
        <div className='text-slate-300'>--</div>
      )}
    </td>
  )
}
