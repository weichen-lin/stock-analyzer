import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import Image from 'next/image'

function StockName({ index }: { index: number }) {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const region = values.region

  return stock.symbol && region === 'us' ? (
    <td className='flex w-full px-4 gap-x-4 justify-start items-center'>
      <Image
        src={stock.image === '' ? '/loader.svg' : stock.image}
        width={25}
        height={25}
        alt='test'
        className='bg-slate-500 rounded-md p-1'
      />
      <div className='text-sm font-semibold'>{values.stocks[index].name}</div>
    </td>
  ) : (
    <td className='flex w-full px-4 gap-x-4 justify-start items-center'>
      <div className='text-lg font-semibold'>{values.stocks[index].name}</div>
    </td>
  )
}

export default StockName
