import { useFormikContext } from 'formik'
import { ISettingData, IStockConfig } from '@/finance/setting'
import currency from 'currency.js'

export default function Positions() {
  const { values } = useFormikContext<ISettingData>()

  const checkValue = (e: IStockConfig) => {
    const shares = currency(e.averageCost).value > 0
    const price = currency(e.price).value > 0
    const cost = currency(e.averageCost).value > 0
    const setTartget = currency(e.targetPosition).value > 0

    if (shares && price && cost && setTartget) {
      return true
    } else {
      return false
    }
  }

  const getCurrentPosition = (stock: IStockConfig) => {
    if (
      currency(stock.shares).value === 0 ||
      currency(stock.averageCost).value === 0 ||
      currency(values.total).value === 0
    )
      return currency(0)

    return currency(stock.shares, { precision: 4 })
      .multiply(currency(stock.averageCost).value)
      .divide(currency(values.total))
      .multiply(100)
  }

  const getTargetPosition = (stock: IStockConfig) => {
    return currency(stock.targetPosition, { precision: 2 }).subtract(getCurrentPosition(stock)).value
  }

  const getStockNumber = (stock: IStockConfig) => {
    return currency(getTargetPosition(stock), { precision: 2 })
      .divide(100)
      .multiply(currency(values.total))
      .divide(currency(stock.price)).value
  }

  const totalAlreadySet = currency(values.total).value > 0

  const totalPosition = values.stocks.map((e) => e.targetPosition).reduce((a, b) => currency(a).add(b).value, 0)

  return (
    <div className='flex items-center p-4 flex-col w-full bg-red-100'>
      <div className='w-1/6'>總預計倉位{totalPosition}</div>
      {!totalAlreadySet ? (
        <div></div>
      ) : (
        values.stocks
          .filter((e) => checkValue(e))
          .map((stock, index) => {
            return (
              <div key={index} className='flex items-center w-full justify-center'>
                <div className='w-1/6'>{stock.symbol}</div>
                距離目標倉位:
                {getTargetPosition(stock)}% 股數:
                {getStockNumber(stock)}
              </div>
            )
          })
      )}
    </div>
  )
}
