'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import currency from 'currency.js'

export default function NumberInput(props: {
  number: string
  onChange: (e: string) => void
  max: number
  disabled?: boolean
}) {
  const { number, onChange, max, disabled } = props
  const [value, setValue] = useState(number)

  const onBlur = () => {
    const val = currency(value, { precision: 2 })
    const e = val.format({ separator: '', symbol: '' })
    if (val.value > max) {
      setValue(max.toString())
      onChange(max.toString())
      return
    } else {
      setValue(e)
      onChange(e)
    }
  }

  return (
    <Input
      value={value}
      onBlur={onBlur}
      onFocus={e => {
        e.target.select()
      }}
      onContextMenu={e => e.preventDefault()}
      onChange={e => {
        setValue(e.target.value)
      }}
      disabled={disabled}
      className='w-[100px]'
    />
  )
}
