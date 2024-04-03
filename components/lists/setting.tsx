'use client'

import { DotsThreeVertical } from '@phosphor-icons/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import currency from 'currency.js'
import { ISetting } from '@/finance/setting'
import Link from 'next/link'
import clsx from 'clsx'

export default function Setting(props: ISetting) {
  const { name, settings } = props
  return (
    <Link href={`/setting/${props.id}`}>
      <div
        className={clsx(
          'flex flex-col items-center gap-x-2 justify-between',
          'hover:bg-slate-100 rounded-md border border-dashed p-2 w-full gap-y-4 dark:border-slate-100'
        )}
      >
        <div className='px-4 w-full truncate'>{name}</div>
        <div className='flex gap-x-4 justify-end w-full px-4'>
          <Currency value={settings.total} />
          {/* <DropdownMenu>
            <DropdownMenuTrigger className='bg-slate-100 rounded-md'>
              <DotsThreeVertical className='h-6 w-6' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </Link>
  )
}

const Currency = ({ value }: { value: string }) => {
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
