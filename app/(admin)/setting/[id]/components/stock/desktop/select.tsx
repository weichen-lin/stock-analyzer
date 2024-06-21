'use client'

import { SearchSelect } from '@/components/select'
import { useFormikContext } from 'formik'
import { getUSStockProfile, getTWStockProfile } from '@/finance/query'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'

function StockSelect({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]
  const isSelect = stock.symbol !== ''

  return (
    <td className='py-2 px-3 w-full flex items-center'>
      {isSelect ? (
        <div className='font-semibold px-1'>{stock.symbol}</div>
      ) : (
        <SearchSelect
          onSelect={async ({ symbol, name, key }) => {
            setFieldValue(`stocks[${index}].symbol`, symbol)
            setFieldValue(`stocks[${index}].name`, name)
            setFieldValue(`stocks[${index}].key`, key)

            const profile = values.region === 'us' ? await getUSStockProfile(key) : await getTWStockProfile(key)
            const data = Array.isArray(profile) ? profile[0] : profile

            if (data) {
              const price = currency(data.price, { precision: 2 })
              setFieldValue(`stocks[${index}].image`, data.image)
              setFieldValue(`stocks[${index}].price`, price.value)
            }
          }}
          region={values.region}
        />
      )}
    </td>
  )
}

export default StockSelect
