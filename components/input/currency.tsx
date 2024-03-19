'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import currency from 'currency.js'

export default function CurrencyInput(props: { cashValue: string; onChange: (e: string) => void }) {
  const { cashValue, onChange } = props
  const [value, setValue] = useState(cashValue)

  const onBlur = () => {
    const e = currency(value).format({ precision: 2, separator: ',', symbol: '' })
    setValue(e)
    onChange(e)
  }

  return (
    <Input
      value={value}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}
