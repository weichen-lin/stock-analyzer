import { useFormikContext } from 'formik'
import { ISettingData, IStockConfig } from '@/finance/setting'
import currency from 'currency.js'
import { cn } from '@/lib/utils'

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
      <div className='w-full mb-4'>目前設置總倉為比例 {totalPosition}%</div>
      {!totalAlreadySet ? (
        <div>請先設置總投入</div>
      ) : (
        <table className='flex flex-col gap-x-2 items-center w-full'>
          <thead className='w-full'>
            <tr className='w-full flex py-1 gap-x-2 items-center justify-between divide-x-2 border-b-2 bg-slate-300/30'>
              <th className='font-bold w-[20%] px-1' align='left'>
                持倉
              </th>
              <th className='font-bold text-center px-1 w-[20%]'>設定 (%)</th>
              <th className='font-bold text-center px-1 w-[30%] flex flex-col sm:flex-row sm:justify-center sm:gap-x-2'>
                <div>比例</div>
                <div>(距離%)</div>
              </th>
              <th className='font-bold text-center px-1 w-[30%]'>建議操作</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {values.stocks
              .filter((e) => checkValue(e))
              .map((stock, index) => {
                return (
                  <tr
                    key={index}
                    className={cn(
                      'w-full flex gap-x-2 items-center justify-between divide-x-2 mb-1',
                      index % 2 !== 0 && 'bg-blue-100/20'
                    )}
                  >
                    <td className='w-[20%] flex flex-col px-1' align='left'>
                      <span className='font-semibold'>{stock.symbol}</span>
                      <span className='text-sm w-full text-left font-normal'>{stock.shares}股</span>
                    </td>
                    <td className='text-center px-1 w-[20%]'>{stock.targetPosition}</td>
                    <StockRatio num={getTargetPosition(stock)} />
                    <StockNumber num={getStockNumber(stock)} />
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  )
}

const StockRatio = ({ num }: { num: number }) => {
  if (num === 0) return <td className='text-center px-1 w-[30%] font-normal'>--</td>
  if (num < 0)
    return (
      <td className='text-center px-1 w-[30%] text-red-500/70 flex flex-col sm:flex-row font-normal sm:justify-center sm:gap-x-2'>
        <div>多占比</div>
        <div>{Math.abs(num)} %</div>
      </td>
    )
  return (
    <td className='text-center px-1 w-[30%] text-green-500/70 flex flex-col sm:flex-row font-normal sm:justify-center sm:gap-x-2'>
      <div className=''>還需要</div>
      <div>{Math.abs(num)} %</div>
    </td>
  )
}

const StockNumber = ({ num }: { num: number }) => {
  if (num === 0) return <td className='text-center px-1 w-[30%] font-normal'>--</td>
  if (num < 0)
    return (
      <td className='text-center px-1 w-[30%] text-red-500/70 flex flex-col sm:flex-row font-normal sm:justify-center sm:gap-x-2'>
        <div>賣出 </div>
        <div>{Math.abs(num)} 股</div>
      </td>
    )
  return (
    <td className='text-center px-1 w-[30%] text-green-500/70 flex flex-col sm:flex-row font-normal sm:justify-center sm:gap-x-2'>
      <div className=''>買入</div>
      <div>{Math.abs(num)} 股</div>
    </td>
  )
}
