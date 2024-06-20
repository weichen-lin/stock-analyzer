import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import Image from 'next/image'

function StockLogo({ index }: { index: number }) {
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
      <div className='flex-1 bg-red-100 w-4/5'>{values.stocks[index].name}</div>
    </td>
  ) : (
    <div className='truncate flex-1 max-w-[250px]'>{values.stocks[index].name}</div>
  )
}

export default StockLogo
