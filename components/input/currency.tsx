'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import currency from 'currency.js'
import { cn } from '@/lib/utils'

export default function CurrencyInput(props: { cashValue: string; error?: boolean; onChange: (e: string) => void }) {
  const { cashValue, onChange, error } = props
  const [value, setValue] = useState(cashValue)

  const onBlur = () => {
    const e = currency(value).format({ precision: 2, separator: ',', symbol: '' })
    setValue(e)
    onChange(e)
  }

  useEffect(() => {
    setValue(cashValue)
  }, [cashValue])

  return (
    <Input
      value={value}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      className={cn(error ? 'border-red-300' : '')}
    />
  )
}
