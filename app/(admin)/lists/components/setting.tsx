'use client'

import { DotsThreeVertical } from '@phosphor-icons/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import currency from 'currency.js'
import Link from 'next/link'
import clsx from 'clsx'
import { ISetting } from './type'
import { motion } from 'framer-motion'

const regionMapper: { [key: string]: string } = {
  tw: '台股',
  us: '美股',
}

export default function Setting(props: ISetting) {
  const { id, name, total, region, update_at } = props

  const updatedAt = new Date(update_at)

  return (
    <Link href={`/setting/${props.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={clsx(
          'flex flex-col items-center gap-x-2 justify-between w-[365px] relative shadow-sm',
          'hover:bg-slate-100 rounded-md border p-2 w-full gap-y-4 dark:border-slate-100',
          'before:absolute before:h-full before:w-1 before:bg-blue-500 before:top-0 before:left-0 before:z-0 before:rounded-l-md'
        )}
      >
        <div className='pr-2 pl-3 w-full truncate text-lg flex justify-between items-center'>
          <div className='truncate max-w-[270px]'>{name}</div>
          <div className='text-sm text-slate-500 border-slate-300 border-[1px] px-2 py-1 rounded-md'>
            {regionMapper[region]}
          </div>
        </div>
        <div className='flex gap-x-4 justify-between w-full'>
          <div className='flex items-center pl-3 text-sm text-slate-500'>
            {updatedAt.getMonth() + 1}月 {updatedAt.getDate()}日 更新
          </div>
          <div className='flex gap-x-3 items-center'>
            <Currency value={total} />
            <DropdownMenu>
              <DropdownMenuTrigger className='rounded-md'>
                <DotsThreeVertical className='h-6 w-6' />
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
      </motion.div>
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
