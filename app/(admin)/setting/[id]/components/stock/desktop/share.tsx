import { WholeNumberInput } from '@/components/input'
import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'

export default function StockShare({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const isSelect = stock.symbol !== ''

  return (
    <td className='px-4 py-2 flex items-center'>
      {isSelect ? (
        <WholeNumberInput
          number={stock.shares}
          onChange={e => {
            setFieldValue(`stocks[${index}].shares`, e)
          }}
        />
      ) : (
        <div className='text-slate-300'>--</div>
      )}
    </td>
  )
}
