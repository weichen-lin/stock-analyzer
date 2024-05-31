'use client'

import { SearchSelect } from '@/components/select'
import { useFormikContext } from 'formik'
import { getStockProfile } from '@/finance/query'
import { ISettingData } from '@/finance/setting'
import currency from 'currency.js'

function StockSelect({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<ISettingData>()
  const stock = values.stocks[index]
  const isSelect = stock.symbol !== ''

  return (
    <div className='w-2/3 md:w-full space-y-2'>
      <div className='pl-2 font-semibold'>股票代號</div>
      <SearchSelect
        onSelect={async ({ symbol, name }: { symbol: string; name: string }) => {
          setFieldValue(`stocks[${index}].symbol`, symbol)
          setFieldValue(`stocks[${index}].name`, name)

          const profile = await getStockProfile(symbol)

          if (profile) {
            const price = currency(profile.price, { precision: 2 })
            setFieldValue(`stocks[${index}].image`, profile.image)
            setFieldValue(`stocks[${index}].price`, price.value)
          }
        }}
        disabled={isSelect}
        current={stock.symbol}
      />
    </div>
  )
}

export default StockSelect
