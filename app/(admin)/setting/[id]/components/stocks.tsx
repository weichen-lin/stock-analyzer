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
    <div className='mb-24 h-full overflow-y-auto'>
      <DragDropContext
        onDragEnd={status => {
          if (status.destination) {
            swap(status.source.index, status.destination.index)
          }
        }}
      >
        <div className='grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] py-2'>
          <div className='bg-red-100'></div>
          <div className='bg-yellow-300 text-center'>代號</div>
          <div className='bg-green-300'>名稱</div>
          <div className='bg-yellow-100'>持有股數</div>
          <div className='bg-green-100'>平均成本</div>
          <div className='bg-red-100'>市值</div>
          <div className='bg-yellow-100'>漲跌幅</div>
          <div className='bg-green-100'>當前倉位 (%)</div>
          <div className='bg-red-100'>目標倉位 (%)</div>
        </div>
        <StrictModeDroppable droppableId='stocks'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {values.stocks.map((stock, index) =>
                stock.symbol && stock.symbol !== '' ? (
                  <Draggable key={`stock-${stock.symbol}-${index}`} draggableId={stock.symbol} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='w-full'
                      >
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
    </div>
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
