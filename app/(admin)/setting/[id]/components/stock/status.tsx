'use client'

import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Input } from '@/components/ui/input'
import currency from 'currency.js'
import { NumberInput } from '@/components/input'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function StockStatus({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const [position, setPosition] = useState('0.00')
  const [error, setError] = useState(false)
  const stock = values.stocks[index]
  const max = values.stocks.map((e) => e.targetPosition).reduce((a, b) => currency(a).add(b).value, 0)

  const getAverageCost = () => {
    return currency(stock.averageCost, { precision: 2 }).value
  }

  const average = getAverageCost()

  const getCurrentPosition = () => {
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

  useEffect(() => {
    const current = getCurrentPosition()
    setPosition(current.value > 100 ? '--' : current.value.toFixed(2))
    setError(currency(current).value > 100)
  }, [stock.shares, stock.averageCost, values.total])

  return (
    <div className='flex gap-x-2 w-full'>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>漲跌幅</div>
        {average > 0 ? (
          <PercentageChange averageCost={average} price={stock.price} />
        ) : (
          <div className='px-3 py-2'>--</div>
        )}
      </div>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>當前倉位 (%)</div>
        <Input disabled value={position} className={cn(error && 'border-red-300')} />
      </div>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>目標倉位 (%)</div>
        <NumberInput
          number={stock.targetPosition}
          onChange={(e) => {
            setFieldValue(`stocks[${index}].targetPosition`, e)
          }}
          max={100}
        />
      </div>
    </div>
  )
}

const PercentageChange = ({ averageCost, price }: { averageCost: number; price: number }) => {
  if (averageCost === 0) {
    return <div className='px-3 py-2'>--</div>
  }

  const cost = currency(averageCost, { precision: 4 })

  const percent = currency(price, { precision: 4 }).subtract(cost).divide(cost).multiply(100)

  if (percent.value > 0) {
    return <div className='px-3 py-2 text-green-500 font-semibold'>{percent.value}%</div>
  }

  if (percent.value < 0) {
    return <div className='px-3 py-2 text-red-500 font-semibold'>{percent.value}%</div>
  }

  return <div className='px-3 py-2 font-semibold'>{percent.value}%</div>
}

export default StockStatus
