import { updateStore } from '@/store/stock'
import { useFormikContext } from 'formik'
import { getUSStockProfile } from '@/finance/query'
import { IStocksSchema } from '@/app/api/setting/type'
import currency from 'currency.js'

const useUpdate = () => {
  const { startUpdate, setStartUpdate } = updateStore()
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()

  const updateStocks = async () => {
    setStartUpdate(true)

    await Promise.all(
      values.stocks.map(async (stock, index) => {
        if (!stock.symbol) return
        const profile = await getUSStockProfile(stock.symbol)
        if (!profile) return
        const price = currency(profile.price, { precision: 2 }).value
        setFieldValue(`stocks[${index}].price`, price)
      }),
    )

    setStartUpdate(false)
  }

  return {
    startUpdate,
    updateStocks,
  }
}

export default useUpdate
