import { CurrencyInput } from '@/components/input'
import { useFormikContext, useField } from 'formik'
import { ISetting } from './stock/type'
import currency from 'currency.js'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { updateSetting } from '@/finance/setting'
import { useParams } from 'next/navigation'

export default function Cash() {
  const { values } = useFormikContext<ISetting>()
  const [field, meta, helpers] = useField<string>('cash')
  const [isUpdate, setIsUpdate] = useState(false)
  const { id } = useParams()

  const { value } = meta
  const { setValue } = helpers

  const stocksValue = values.stocks
    .map((e) => {
      if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0)
        return 0
      return currency(e.shares).multiply(e.averageCost).value
    })
    .reduce((a, b) => a + b, 0)

  const cashLower = currency(values.cash).subtract(stocksValue).value < 0

  useEffect(() => {
    let timeout = setTimeout(async () => {
      setIsUpdate(true)
      await updateSetting({
        id: id as string,
        settings: {
          cash: values.cash,
          stocks: values.stocks
        }
      })
      setIsUpdate(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [values.cash, values.stocks])

  return (
    <div className='flex flex-col p-3 space-y-2'>
      <div className='w-full flex justify-between'>
        <div className='pl-2 font-semibold'>目前帳戶總資產</div>
        {isUpdate && (
          <div className=''>
            <Image src='/loader.gif' width={20} height={20} alt='load' />
          </div>
        )}
      </div>
      <div className=''>
        <CurrencyInput
          cashValue={value}
          onChange={(e) => {
            setValue(e)
          }}
          error={cashLower}
        />
        {cashLower && (
          <div className='text-red-500 text-sm pl-1'>與股票總價值不符</div>
        )}
      </div>
    </div>
  )
}
