import { useFormikContext, useField } from 'formik'
import currency from 'currency.js'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUpdate } from '@/hooks/stock'
import { IStocksSchema } from '@/app/api/setting/type'

function debounce(callback: any, delay: number) {
  let timerId: NodeJS.Timeout

  return (...args: any) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const Currency = ({ value }: { value: string }) => {
  const formatted = currency(value).format({ symbol: '', precision: 2 })
  const [whole, decimal] = formatted.split('.')

  return (
    <div className='flex gap-x-2 items-center'>
      <div className='flex align-bottom'>
        <div className='font-bold text-lg'>{whole}.</div>
        <div className='pt-[2px]'>{decimal}</div>
      </div>
    </div>
  )
}

const regionMapper: { [key: string]: string } = {
  tw: 'NTD',
  us: 'USD',
}

export default function Total() {
  const { values } = useFormikContext<IStocksSchema>()
  const [isUpdate, setIsUpdate] = useState(false)
  const { startUpdate, updateStocks } = useUpdate()
  const { id } = useParams()

  const stocksValue = values.stocks
    .map(e => {
      if (currency(e.shares).value === 0) return 0
      return currency(e.shares).multiply(e.price).value
    })
    .reduce((a, b) => a + b, 0)

  const debouncedUpdate = useCallback(
    debounce(async (stocks: IStocksSchema['stocks'], total: string) => {
      setIsUpdate(true)

      await fetch(`/api/setting`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          total: total,
          stocks: stocks,
        }),
      })

      setIsUpdate(false)
    }, 750),
    [],
  )

  useEffect(() => {
    const t = currency(stocksValue).format({ symbol: '', precision: 2 })
    debouncedUpdate(values.stocks, t)
  }, [values.stocks])

  return (
    <div className='w-full md:max-w-[480px] flex flex-col justify-between gap-y-3 p-2 mt-4'>
      <div className='flex w-full justify-start items-center gap-x-4'>
        <div className='pl-1 font-semibold'>目前資產總價值</div>
        {isUpdate && (
          <div className=''>
            <Image src='/loader.gif' width={20} height={20} alt='load' unoptimized />
          </div>
        )}
      </div>
      <div className='flex gap-x-8 w-full justify-between'>
        <div className='p-2 flex gap-x-3 items-baseline'>
          <Currency value={stocksValue.toString()} />
          <div className='text-slate-500 text-sm'>{regionMapper[values.region]}</div>
        </div>
        <Button onClick={async () => await updateStocks()} loading={startUpdate} disabled={startUpdate}>
          更新
        </Button>
      </div>
    </div>
  )
}
