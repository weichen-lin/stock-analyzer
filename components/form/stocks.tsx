'use client'

import { useFormikContext, ArrayHelpers } from 'formik'
import { ISetting } from '@/components/form/stock/type'
import { Button } from '@/components/ui/button'
import { StockSelect, StockInfo, StockCost, StockStatus } from '@/components/form/stock'

function Stock({ index }: { index: number }) {
  const { values } = useFormikContext<ISetting>()
  const stock = values.stocks[index]

  return (
    <div className='flex flex-col gap-y-4 w-full justify-start items-center p-3 border-[1px] border-slate-300/30 rounded-md'>
      <StockSelect index={index} />
      {stock?.symbol && (
        <>
          <StockInfo index={index} />
          <StockCost index={index} />
          <StockStatus index={index} />
        </>
      )}
    </div>
  )
}

const Stocks = ({ move, swap, push, insert, unshift, pop, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<ISetting>()

  return (
    <div className='space-y-2'>
      {values.stocks.map((_, index) => (
        <Stock key={`stock_${index}`} index={index} />
      ))}
      <Button
        variant='outline'
        className='ml-3 w-[120px]'
        onClick={() => {
          push({
            symbol: '',
            name: '',
            targetPosition: '0.00',
            image: '',
            price: '0.00',
            shares: '0',
            averageCost: '0.00',
          })
        }}
      >
        新增
      </Button>
    </div>
  )
}

export default Stocks
