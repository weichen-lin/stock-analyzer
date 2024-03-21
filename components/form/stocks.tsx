'use client'

import { SearchSelect } from '@/components/select'
import { NumberInput } from '@/components/input'
import { Input } from '@/components/ui/input'
import { useFormikContext, ArrayHelpers } from 'formik'
import { ISetting } from '@/components/form/stock/type'
import { Button } from '@/components/ui/button'
import currency from 'currency.js'
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
        onClick={() => {
          push({
            symbol: '',
            name: '',
            currency: '',
            stockExchange: '',
            exchangeShortName: '',
          })
        }}
      >
        新增
      </Button>
    </div>
  )
}

export default Stocks
