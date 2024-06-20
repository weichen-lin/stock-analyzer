'use client'

import { useFormikContext, ArrayHelpers } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DroppableProps } from 'react-beautiful-dnd'
import { useEffect } from 'react'
import { Stock } from './stock'

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export const DesktopStocks = ({ swap, push, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<IStocksSchema>()

  return (
    <table className='w-full'>
      <thead>
        <tr className='grid grid-cols-[0.75fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border border-slate-200 divide-x-[1px] bg-slate-300/30'>
          <th className='text-left px-4 py-1'>代號</th>
          <th className='text-left px-4 py-1'>名稱</th>
          <th className='text-left px-4 py-1'>持有股數</th>
          <th className='text-left px-4 py-1'>平均成本</th>
          <th className='text-left px-4 py-1'>市值</th>
          <th className='text-left px-4 py-1'>漲跌幅</th>
          <th className='text-left px-4 py-1'>當前倉位 (%)</th>
          <th className='text-left px-4 py-1'>目標倉位 (%)</th>
        </tr>
      </thead>
      <tbody>
        {values.stocks.map((stock, index) => (
          <Stock index={index} remove={remove} />
        ))}
      </tbody>
    </table>
  )
}

const Stocks = ({ swap, push, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<IStocksSchema>()

  const region = values.region

  return (
    <div className='mb-24 h-full overflow-y-auto'>
      <DragDropContext
        onDragEnd={status => {
          if (status.destination) {
            swap(status.source.index, status.destination.index)
          }
        }}
      >
        <StrictModeDroppable droppableId='stocks'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='w-full flex flex-col gap-y-4'>
              {values.stocks.map((stock, index) =>
                stock.symbol && stock.symbol !== '' ? (
                  <Draggable key={`stock-${stock.symbol}-${index}`} draggableId={stock.symbol} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Stock index={index} remove={remove} />
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <Stock index={index} remove={remove} key={`stock-empty-${index}`} />
                ),
              )}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <Button
        variant='outline'
        className='w-full mt-2'
        onClick={() => {
          push({
            symbol: '',
            name: '',
            targetPosition: '0.00',
            image: '',
            price: 0,
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

// Override console.error
// divis is a hack to suppress dive warning about missing defaultProps in recharts library as of version 2.12
// @link https://gidivub.com/recharts/recharts/issues/3615
const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

export default Stocks
