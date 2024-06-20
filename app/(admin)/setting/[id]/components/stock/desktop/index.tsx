import StockSelect from './select'
import StockInfo from './info'
import StockCost from './cost'
import StockStatus from './status'
import StockLogo from './logo'
import StockName from './name'
import Total from './total'
import { useFormikContext } from 'formik'
import { IStocksSchema } from '@/app/api/setting/type'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronDownIcon } from 'lucide-react'
import { Trash } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateStore } from '@/store/stock'
import { useDevice } from '@/hooks/util'
import { WholeNumberInput, CurrencyInput } from '@/components/input'
import { Input } from '@/components/ui/input'
import currency from 'currency.js'
import { NumberInput } from '@/components/input'
import { SearchSelect } from '@/components/select'

function DesktopStock({ index, remove }: { index: number; remove: (index: number) => void }) {
  const { values, setFieldValue } = useFormikContext<IStocksSchema>()
  const stock = values.stocks[index]

  const getAverageCost = () => {
    return currency(stock.averageCost, { precision: 2 }).value
  }

  const average = getAverageCost()

  return (
    <tr className='grid grid-cols-[0.75fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-[1px] border-t-0 border-slate-200 divide-x-[1px]'>
      <td className='py-2 px-3 w-full'>
        <StockSelect index={index} />
      </td>
      <StockLogo index={index} />
      <td className='px-4 py-2'>
        <WholeNumberInput
          number={stock.shares}
          onChange={e => {
            setFieldValue(`stocks[${index}].shares`, e)
          }}
        />
      </td>
      <td className='px-4 py-2'>
        <CurrencyInput
          cashValue={stock.averageCost}
          onChange={e => {
            setFieldValue(`stocks[${index}].averageCost`, e)
          }}
        />
      </td>
      <td className='px-4 py-2 flex items-center'>{stock.price}</td>
      <td className='px-4 py-2 flex items-center'>
        {average > 0 ? (
          <div className='px-2'>
            <PercentageChange averageCost={average} price={stock.price} />
          </div>
        ) : (
          <div className='px-2'>--</div>
        )}
      </td>
      <td className='px-4 py-2 flex items-center'>
        <NumberInput
          number={stock.targetPosition}
          onChange={e => {
            setFieldValue(`stocks[${index}].targetPosition`, e)
          }}
          max={100}
        />
      </td>
      <td className='px-4 py-2 flex items-center'>
        <NumberInput
          number={stock.targetPosition}
          onChange={e => {
            setFieldValue(`stocks[${index}].targetPosition`, e)
          }}
          max={100}
        />
      </td>
    </tr>
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

export { StockSelect, StockInfo, StockCost, StockStatus, Total }

export { DesktopStock }
