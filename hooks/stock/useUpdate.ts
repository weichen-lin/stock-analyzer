import { updateStore } from '@/store/stock'
import { useFormikContext } from 'formik'
import { getStockProfile } from '@/finance/query'
import { ISettingData } from '@/finance/setting'
import currency from 'currency.js'

const useUpdate = () => {
  const { startUpdate, setStartUpdate } = updateStore()
  const { values, setFieldValue } = useFormikContext<ISettingData>()

  const updateStocks = async () => {
    setStartUpdate(true)

    await Promise.all(
      values.stocks.map(async (stock, index) => {
        if (!stock.symbol) return
        const profile = await getStockProfile(stock.symbol)
        if (!profile) return
        const price = currency(profile.price, { precision: 2 }).value
        setFieldValue(`stocks[${index}].price`, price)
      })
    )

    setStartUpdate(false)
  }

  return {
    startUpdate,
    updateStocks,
  }
}

export default useUpdate
