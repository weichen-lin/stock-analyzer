import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import Image from 'next/image'

function StockLogo({ index }: { index: number }) {
  const { values } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const region = values.region

  return stock.symbol && region === 'us' ? (
    <Image
      src={stock.image === '' ? '/loader.svg' : stock.image}
      width={70}
      height={70}
      alt='test'
      className='border-[1px] border-slate-300 bg-slate-700 p-2'
    />
  ) : (
    <div></div>
  )
}

export default StockLogo
