import StockSelect from './select'
import StockInfo from './info'
import StockCost from './cost'
import StockStatus from './status'
import Total from './total'
import { useFormikContext } from 'formik'
import { ISettingData } from '@/finance/setting'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronDownIcon } from 'lucide-react'
import { Trash } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateStore } from '@/store/stock'
import { useDevice } from '@/hooks/util'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

function MobileStock({ index, remove }: { index: number; remove: (index: number) => void }) {
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
        'flex flex-col gap-y-4 justify-start items-center bg-slate-100/20',
        'max-w-[400px]'
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

function DesktopStock({ index, remove }: { index: number; remove: (index: number) => void }) {
  const { values } = useFormikContext<ISettingData>()
  const stock = values.stocks[index]
  const [open, setOpen] = useState(false)
  const { startUpdate } = updateStore()

  return (
    <div
      className={clsx(
        'w-full p-3 border-[1px] border-slate-300/50 rounded-md',
        'flex flex-col gap-y-4 justify-start items-center bg-slate-100/20',
        'max-w-[832px]'
      )}
    >
      <div className='w-full flex justify-between gap-x-3'>
        {stock.symbol && (
          <Image
            src={stock.image === '' ? '/loader.svg' : stock.image}
            width={70}
            height={70}
            alt='test'
            className='border-[1px] border-slate-300 bg-slate-700 p-2'
          />
        )}
        <div className='w-1/3 pr-2'>
          <StockSelect index={index} />
        </div>
        {stock.symbol ? (
          <div className='flex-1 space-y-2'>
            <div className='w-inherit flex justify-between'>
              <div className='pl-2 font-semibold'>股票名稱</div>
              <div className='flex gap-x-3'>
                <ChevronDownIcon
                  className={cn(
                    'transition-transform duration-150 ease-out rounded-md',
                    'w-5 h-5 text-slate-700',
                    open ? 'rotate-0' : 'rotate-180'
                  )}
                  onClick={() => setOpen(!open)}
                />
                <Trash
                  className='h-5 w-5'
                  onClick={() => {
                    if (startUpdate) return
                    remove(index)
                  }}
                />
              </div>
            </div>
            <Input disabled className='w-full' value={stock.name} />
          </div>
        ) : (
          <div className='flex gap-x-3'>
            <ChevronDownIcon
              className={cn(
                'transition-transform duration-150 ease-out rounded-md',
                'w-5 h-5 text-slate-700',
                open ? 'rotate-0' : 'rotate-180'
              )}
              onClick={() => setOpen(!open)}
            />
            <Trash
              className='h-5 w-5 cursor-pointer'
              onClick={() => {
                if (startUpdate) return
                remove(index)
              }}
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {stock?.symbol && open && (
          <motion.div
            initial={{ scaleY: 0, height: 0 }}
            animate={{ scaleY: open ? 1 : 0, height: open ? 'auto' : 0 }}
            exit={{ scaleY: 0, height: 0 }}
            className={cn('flex origin-top')}
          >
            <StockCost index={index} />
            <StockStatus index={index} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Stock = (props: { index: number; remove: (index: number) => void }) => {
  const { isMiddleScreen } = useDevice()
  return isMiddleScreen ? <DesktopStock {...props} /> : <MobileStock {...props} />
}

export { StockSelect, StockInfo, StockCost, StockStatus, Total }
export { Stock }
