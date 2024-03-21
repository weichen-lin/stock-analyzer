'use client'

import { useFormikContext } from 'formik'
import { ISetting } from './type'
import { Input } from '@/components/ui/input'
import currency from 'currency.js'
import { NumberInput } from '@/components/input'
import { useEffect, useState } from 'react'

function StockStatus({ index }: { index: number }) {
  const { values, setFieldValue } = useFormikContext<ISetting>()
  const [position, setPosition] = useState('0.00')
  const stock = values.stocks[index]
  const max = values.stocks.map((e) => e.targetPosition).reduce((a, b) => currency(a).add(b).value, 0)

  const getAverageCost = () => {
    return currency(stock.averageCost).value
  }

  const average = getAverageCost()

  const getCurrentPosition = () => {
    if (
      currency(stock.shares).value === 0 ||
      currency(stock.averageCost).value === 0 ||
      currency(values.cash).value === 0
    )
      return '0'

    return currency(stock.shares)
      .multiply(currency(stock.averageCost).value)
      .divide(currency(values.cash).value)
      .multiply(100)
      .toString()
  }

  useEffect(() => {
    setPosition(getCurrentPosition())
  }, [stock.shares, stock.averageCost, values.cash])

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
        <Input disabled value={position} />
      </div>
      <div className='w-1/3 space-y-2'>
        <div className='pl-2 font-semibold'>目標倉位 (%)</div>
        <NumberInput
          number={stock.targetPosition}
          onChange={(e) => {
            setFieldValue(`stocks[${index}].currentPosition`, e)
          }}
          max={100 - max}
        />
      </div>
    </div>
  )
}

const PercentageChange = ({ averageCost, price }: { averageCost: number; price: string }) => {
  if (averageCost === 0) {
    return <div className='px-3 py-2'>--</div>
  }

  const percent = currency(price).subtract(averageCost).divide(averageCost).multiply(100).value

  if (percent > 0) {
    return <div className='px-3 py-2 text-green-500 font-semibold'>{percent}%</div>
  }

  if (percent < 0) {
    return <div className='px-3 py-2 text-red-500 font-semibold'>{percent}%</div>
  }

  return <div className='px-3 py-2 font-semibold'>{percent}%</div>
}

export default StockStatus
