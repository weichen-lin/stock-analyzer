'use client'

import { SearchSelect } from '@/components/select'
import { useFormikContext } from 'formik'
import { getUSStockProfile, getTWStockProfile } from '@/finance/query'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'
import { useDevice } from '@/hooks/util'

function StockSelect({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]
  const isSelect = stock.symbol !== ''
  const { isMiddleScreen } = useDevice()

  return (
    <div className='space-y-2'>
      {!isMiddleScreen && <div className='pl-2 font-semibold'>股票代號</div>}
      <SearchSelect
        onSelect={async ({ symbol, name, key }) => {
          setFieldValue(`stocks[${index}].symbol`, symbol)
          setFieldValue(`stocks[${index}].name`, name)

          const profile = values.region === 'us' ? await getUSStockProfile(key) : await getTWStockProfile(key)

          const data = Array.isArray(profile) ? profile[0] : profile

          if (data) {
            const price = currency(data.price, { precision: 2 })
            setFieldValue(`stocks[${index}].image`, data.image)
            setFieldValue(`stocks[${index}].price`, price.value)
          }
        }}
        disabled={isSelect}
        current={stock.symbol}
        region={values.region}
      />
    </div>
  )
}

export default StockSelect
