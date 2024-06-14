'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Coin } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function AddSetting() {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('tw')
  const [isCreate, setIsCreate] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const clean = () => {
    setName('')
  }

  const handleAddSetting = async () => {
    try {
      setError('')
      setIsCreate(true)
      const res = await fetch('/api/setting', { method: 'POST', body: JSON.stringify({ name, region }) })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      window?.location.reload()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsCreate(false)
    }
  }

  return (
    <div className='flex justify-between'>
      <p className='text-sm text-slate-500 flex gap-x-2 items-center'>
        <Coin className='w-4 h-4' />
        <span>總資產</span>
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size='icon'>
            <PlusIcon className='w-5 h-5' />
            <span className='hidden md:block'>新增投資</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='w-[90%] rounded-md space-y-4'>
          <DialogHeader>
            <DialogTitle>新增一筆投資</DialogTitle>
          </DialogHeader>
          <Select onValueChange={(e) => setRegion(e)} defaultValue={region}>
            <SelectTrigger>
              <SelectValue placeholder='請選擇市場' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='tw'>台股</SelectItem>
              <SelectItem value='us'>美股</SelectItem>
            </SelectContent>
          </Select>
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
          <DialogFooter className='flex flex-row justify-center gap-x-4 w-full'>
            <DialogClose asChild>
              <Button type='button' variant='outline' className='w-1/3' onClick={clean}>
                取消
              </Button>
            </DialogClose>
            <Button
              type='button'
              variant='default'
              className='w-1/3'
              disabled={name === '' || isCreate}
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
    </div>
  )
}
