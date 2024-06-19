import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Input } from '@/components/ui/input'
import { useDevice } from '@/hooks/util'

function StockName({ index }: { index: number }) {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]
  const { isMiddleScreen } = useDevice()

  return (
    <div className='flex-1 space-y-2'>
      {!isMiddleScreen && (
        <div className='w-inherit flex justify-between'>
          <div className='pl-2 font-semibold'>股票名稱</div>
        </div>
      )}
      <Input disabled className='w-full' value={stock.name} />
    </div>
  )
}

export default StockName
