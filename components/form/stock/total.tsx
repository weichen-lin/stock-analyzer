import { CurrencyInput } from '@/components/input'
import { useFormikContext, useField } from 'formik'
import { ISettingData } from '@/finance/setting'
import currency from 'currency.js'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { updateSetting } from '@/finance/setting'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUpdate } from '@/hooks/stock'

export default function Total() {
  const { values } = useFormikContext<ISettingData>()
  const [field, meta, helpers] = useField<string>('total')
  const [isUpdate, setIsUpdate] = useState(false)
  const { startUpdate, updateStocks } = useUpdate()
  const { id } = useParams()

  const { value } = meta
  const { setValue } = helpers

  const stocksValue = values.stocks
    .map((e) => {
      if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0) return 0
      return currency(e.shares).multiply(e.averageCost).value
    })
    .reduce((a, b) => a + b, 0)

  const totalLower = currency(values.total).subtract(stocksValue)

  useEffect(() => {
    let timeout = setTimeout(async () => {
      setIsUpdate(true)
      await updateSetting({
        id: id as string,
        settings: {
          total: values.total,
          cash: values.cash,
          stocks: values.stocks,
        },
      })
      setIsUpdate(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [values.total, values.cash, values.stocks])

  return (
    <div className='flex'>
      <div className='flex flex-col p-3 md:p-0 space-y-4 mb-2 w-2/3'>
        <div className='w-full flex flex-col justify-between gap-y-2'>
          <div className='flex w-full justify-between'>
            <div className='pl-2 font-semibold'>
              目前帳戶總價值<span className='text-slate-500 text-sm px-2'>(自行填入)</span>
            </div>
            {isUpdate && (
              <div className=''>
                <Image src='/loader.gif' width={20} height={20} alt='load' unoptimized />
              </div>
            )}
          </div>
          <div className='flex gap-x-2'>
            <div className='text-lg w-1/2 font-semibold flex flex-col items-start'>
              <CurrencyInput
                cashValue={value}
                onChange={(e) => {
                  setValue(e)
                }}
                error={!totalLower}
              />
              {totalLower.value < 0 && <div className='text-red-500 text-sm pl-1'>與股票總價值不符</div>}
            </div>
            <PercentageChange cash={values.cash} total={value} />
          </div>
        </div>
      </div>
      <div className='flex flex-col p-3 space-y-4 mb-2 w-1/3'>
        {/* <div className='font-semibold'>股票總佔比</div>
        <div className='text-lg w-full font-semibold flex flex-col items-start'>
          {currency(stocksValue, { precision: 4 }).divide(values.total).multiply(100).value}%
        </div> */}
        <Button onClick={async () => await updateStocks()} loading={startUpdate} disabled={startUpdate}>
          更新
        </Button>
      </div>
    </div>
  )
}

const PercentageChange = ({ cash, total }: { cash: string; total: string }) => {
  if (cash === '0.00') {
    return <div className='px-3 py-2'>--</div>
  }

  const percent = currency(total, { precision: 4 }).subtract(cash).divide(cash).multiply(100)

  if (percent.value > 0) {
    return <div className='px-3 py-2 text-green-500 font-semibold'>+ {percent.value}%</div>
  }

  if (percent.value < 0) {
    return <div className='px-3 py-2 text-red-500 font-semibold'> {percent.value}%</div>
  }

  return <div className='px-3 py-2 font-semibold'>{percent.value}%</div>
}
