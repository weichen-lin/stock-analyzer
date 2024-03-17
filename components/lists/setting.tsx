'use client'

import { DotsThreeVertical } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import currency from 'currency.js'

export default function Setting() {
  return (
    <div className='flex items-center gap-x-2 w-full justify-between hover:bg-slate-100 rounded-md border border-dashed p-2 pl-4'>
      name
      <div className='flex gap-x-4'>
        <Currency value={100.012} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' className='' size='icon'>
              <DotsThreeVertical className='h-6 w-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

const Currency = ({ value }: { value: number }) => {
  const formatted = currency(value).format({ symbol: '', precision: 2 })
  const [whole, decimal] = formatted.split('.')

  return (
    <div className='flex gap-x-2 items-center'>
      <div>$</div>
      <div className='flex align-bottom'>
        <div className='font-bold text-lg'>{whole}.</div>
        <div className='pt-[2px]'>{decimal}</div>
      </div>
    </div>
  )
}
