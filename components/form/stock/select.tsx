'use client'

import { SearchSelect } from '@/components/select'
import { useFormikContext } from 'formik'
import { getStockProfile } from '@/finance/query'
import { ISetting } from './type'

function StockSelect({ index }: { index: number }) {
  const { setFieldValue } = useFormikContext<ISetting>()

  return (
    <div className='w-full space-y-2'>
      <div className='pl-2 font-semibold'>股票代號</div>
      <SearchSelect
        onSelect={async ({ symbol, name }: { symbol: string; name: string }) => {
          setFieldValue(`stocks[${index}].symbol`, symbol)
          setFieldValue(`stocks[${index}].name`, name)

          const profile = await getStockProfile(symbol)
          if (profile) {
            setFieldValue(`stocks[${index}].image`, profile.image)
            setFieldValue(`stocks[${index}].price`, profile.price)
          }
        }}
      />
    </div>
  )
}

export default StockSelect
