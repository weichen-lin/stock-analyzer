'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useState, useRef } from 'react'
import currency from 'currency.js'
import { cn } from '@/lib/utils'

export default function CurrencyInput(props: {
  cashValue: string
  error?: boolean
  placeholder?: string
  onChange: (e: string) => void
}) {
  const { cashValue, onChange, error, placeholder } = props
  const [value, setValue] = useState(cashValue)
  const ref = useRef<HTMLInputElement>(null)

  const onBlur = () => {
    const e = currency(value).format({
      precision: 2,
      separator: ',',
      symbol: '',
    })
    setValue(e)
    onChange(e)
  }

  useEffect(() => {
    setValue(cashValue)
  }, [cashValue])

  return (
    <Input
      ref={ref}
      value={value}
      onBlur={onBlur}
      onChange={e => {
        setValue(e.target.value)
      }}
      onFocus={e => {
        e.target.select()
      }}
      placeholder={placeholder}
      onContextMenu={e => e.preventDefault()}
      className={cn(error ? 'border-red-300' : '', 'select-none w-[120px]')}
    />
  )
}
