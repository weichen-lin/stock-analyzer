'use client'

import { useFormikContext, ArrayHelpers, useField } from 'formik'
import { ISettingData } from '@/finance/setting'
import { Button } from '@/components/ui/button'
import { StockSelect, StockInfo, StockCost, StockStatus, Total } from '@/components/form/stock'
import clsx from 'clsx'
import { ChevronDownIcon } from 'lucide-react'
import { Trash } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateStore } from '@/store/stock'

function Stock({ index, remove }: { index: number; remove: (index: number) => void }) {
  const [open, setOpen] = useState(true)
  const { values } = useFormikContext<ISettingData>()
  const stock = values.stocks[index]
  const { startUpdate } = updateStore()

  return (
    <motion.div
      key={`stock_${index}`}
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
      className={clsx(
        'w-full p-3 border-[1px] border-slate-300/50 rounded-md',
        'flex flex-col gap-y-4 justify-start items-center bg-slate-100/20'
      )}
    >
      <div className='w-full flex'>
        <StockSelect index={index} />
        <div className='w-1/3 flex gap-x-4 items-start justify-end'>
          <Button
            variant='outline'
            size='icon'
            className='border-none bg-transparent'
            onClick={() => setOpen(!open)}
            disabled={!stock.symbol}
          >
            <ChevronDownIcon
              className={cn('transition-transform duration-150 ease-out', 'w-5 h-5', open ? 'rotate-180' : 'rotate-0')}
            />
          </Button>
          <Button
            variant='destructive'
            size='icon'
            className='border-none'
            onClick={() => {
              remove(index)
            }}
            loading={startUpdate}
            disabled={startUpdate}
          >
            <Trash className='h-5 w-5' />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {stock?.symbol && open && (
          <motion.div
            initial={{ scaleY: 0, height: 0 }}
            animate={{ scaleY: open ? 1 : 0, height: open ? 'auto' : 0 }}
            exit={{ scaleY: 0, height: 0 }}
            className={cn('space-y-4 origin-top')}
          >
            <StockInfo index={index} />
            <StockCost index={index} />
            <StockStatus index={index} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Stocks = ({ move, swap, push, insert, unshift, pop, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<ISettingData>()

  return (
    <div className='space-y-2'>
      {values.stocks.map((_, index) => (
        <Stock key={`stock_${index}`} index={index} remove={remove} />
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
