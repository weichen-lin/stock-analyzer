'use client'

import { useFormikContext, ArrayHelpers } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronDownIcon } from 'lucide-react'
import { Trash } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateStore } from '@/store/stock'
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

const Stocks = ({ swap, push, remove }: ArrayHelpers) => {
  const { values } = useFormikContext<IStocksSchema>()

  return (
    <div className='mb-24'>
      <DragDropContext
        onDragEnd={(status) => {
          if (status.destination) {
            swap(status.source.index, status.destination.index)
          }
        }}
      >
        <StrictModeDroppable droppableId='stocks'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='w-full flex flex-col gap-y-4'>
              {values.stocks.map((stock, index) =>
                stock.symbol && stock.symbol !== '' ? (
                  <Draggable key={`stock-${stock.symbol}-${index}`} draggableId={stock.symbol} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='w-full flex items-center justify-center'
                      >
                        <Stock index={index} remove={remove} />
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <Stock index={index} remove={remove} key={`stock-empty-${index}`} />
                )
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
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

export default Stocks
