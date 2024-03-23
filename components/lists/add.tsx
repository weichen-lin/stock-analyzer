'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CurrencyInput } from '@/components/input'
import { useState } from 'react'
import currency from 'currency.js'
import { createSetting } from '@/finance/setting'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddSetting() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('0.00')
  const [isCreate, setIsCreate] = useState(false)
  const [error, setError] = useState('')
  const cantAdd = name === '' || currency(value).value <= 0

  const clean = () => {
    setName('')
    setValue('0.00')
  }

  const supabase = createClientComponentClient()

  const handleAddSetting = async () => {
    try {
      setError('')
      setIsCreate(true)
      const { data } = await supabase.auth.getSession()
      await createSetting({
        user_email: data.session?.user?.email as string,
        cash: currency(value).format({
          precision: 2,
          separator: '',
          symbol: ''
        }),
        name
      })

      window.location.reload()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsCreate(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>新增規劃</Button>
      </DialogTrigger>
      <DialogContent className='w-[90%] rounded-md'>
        <DialogHeader>
          <DialogTitle>新增一筆財務規劃</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center space-y-2'>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            placeholder='請輸入名稱'
            onFocus={(e) => {
              e.target.select()
            }}
            onContextMenu={(e) => {
              e.preventDefault()
            }}
          />
          <CurrencyInput
            placeholder='請輸入金額'
            cashValue={value}
            onChange={(e) => {
              setValue(e)
            }}
          />
        </div>
        <DialogFooter className='flex flex-row justify-center gap-x-4 w-full'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              className='w-1/3'
              onClick={clean}
            >
              取消
            </Button>
          </DialogClose>
          <Button
            type='button'
            variant='default'
            className='w-1/3'
            disabled={cantAdd}
            onClick={async () => {
              await handleAddSetting()
            }}
            loading={isCreate}
          >
            新增
          </Button>
        </DialogFooter>
        {error && <div className='text-red-500'>{error}</div>}
      </DialogContent>
    </Dialog>
  )
}
