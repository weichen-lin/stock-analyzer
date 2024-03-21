'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import currency from 'currency.js'

export default function WholeNumberInput(props: { number: string; onChange: (e: string) => void }) {
  const { number, onChange } = props
  const [value, setValue] = useState(number)

  const onBlur = () => {
    const val = Math.floor(currency(value).value)
    const e = val.toString()
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
