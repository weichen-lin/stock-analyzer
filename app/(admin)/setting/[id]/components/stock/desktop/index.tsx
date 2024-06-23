import StockSelect from './select'
import StockName from './name'
import StockShare from './share'
import StockCost from './cost'
import StockPrice from './price'
import PercentageChange from './percent'
import { CurrentPorsition, TargetPosition } from './positions'
import Operator from './operator'
import { ArrayHelpers, useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'

function Stock({ index, remove }: { index: number; remove: (index: number) => void }) {
  return (
    <tr className='grid grid-cols-[0.75fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] border-[1px] border-t-0 border-slate-200 divide-x-[1px]'>
      <StockSelect index={index} />
      <StockName index={index} />
      <StockShare index={index} />
      <StockCost index={index} />
      <StockPrice index={index} />
      <PercentageChange index={index} />
      <CurrentPorsition index={index} />
      <TargetPosition index={index} />
      <Operator index={index} remove={remove} />
    </tr>
  )
}

export const DesktopStocks = ({ swap, push, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<IStocksSchema>()

  return (
    <table className='w-full'>
      <thead>
        <tr className='grid grid-cols-[0.75fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] border border-slate-200 divide-x-[1px] bg-slate-300/30'>
          <th className='text-left px-4 py-1'>代號</th>
          <th className='text-left px-4 py-1'>名稱</th>
          <th className='text-left px-4 py-1'>持有股數</th>
          <th className='text-left px-4 py-1'>平均成本</th>
          <th className='text-left px-4 py-1'>市值</th>
          <th className='text-left px-4 py-1'>漲跌幅</th>
          <th className='text-left px-4 py-1'>當前倉位 (%)</th>
          <th className='text-left px-4 py-1'>目標倉位 (%)</th>
          <th className='text-left px-4 py-1'></th>
        </tr>
      </thead>
      <tbody>
        {values.stocks.map((stock, index) => (
          <Stock index={index} remove={remove} key={`desktop-stock-${stock.symbol}-${index}`} />
        ))}
      </tbody>
    </table>
  )
}

export default DesktopStocks
