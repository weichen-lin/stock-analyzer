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
    <div className='flex items-center p-4 flex-col w-full'>
      {!totalAlreadySet ? (
        <div>請先設置總投入</div>
      ) : (
        <table className='flex flex-col gap-x-2 items-center w-full'>
          <th className='w-full flex gap-x-2 items-center justify-between divide-x-2 border-b-2'>
            <td className='font-bold text-center px-1 w-[30%]'>股票代碼</td>
            <td className='font-bold text-center px-1 w-[35%]'>距離目標比例</td>
            <td className='font-bold text-center px-1 w-[35%]'>建議股數</td>
          </th>
          {values.stocks
            .filter((e) => checkValue(e))
            .map((stock, index) => {
              return (
                <tbody key={index} className='w-full flex gap-x-2 items-center justify-between divide-x-2'>
                  <td className='text-center px-1 w-[30%]'>{stock.symbol}</td>
                  <StockRatio num={getTargetPosition(stock)} />
                  <StockNumber num={getStockNumber(stock)} />
                </tbody>
              )
            })}
        </table>
      )}
    </div>
  )
}

const StockRatio = ({ num }: { num: number }) => {
  if (num === 0) return <td className='text-center px-1 w-[35%]'>--</td>
  if (num < 0) return <td className='text-center px-1 w-[35%] text-red-500/70'>{num} %</td>
  return <td className='text-center px-1 w-[35%] text-green-500/70'>{num} %</td>
}

const StockNumber = ({ num }: { num: number }) => {
  if (num === 0) return <td className='text-center px-1 w-[35%]'>--</td>
  if (num < 0) return <td className='text-center px-1 w-[35%] text-red-500/70'>賣出 {num} 股</td>
  return <td className='text-center px-1 w-[35%] text-green-500/70'>買入 {num} 股</td>
}
