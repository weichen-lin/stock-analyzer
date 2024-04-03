'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

export default function SheetSide() {
  return (
    <div className='w-full bg-slate-100/30 p-1 backdrop-blur-md fixed top-0 border-b-[1px] border-slate-300 flex gap-1 items-center z-20'>
      <Sheet key='left'>
        <SheetTrigger asChild className=''>
          <Image src='/icon.png' alt='sidebar img' width={48} height={48} />
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'></div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type='submit'>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className='flex justify-end gap-4 p-2 dark:text-slate-100 text-xl font-semibold'>Stocker</div>
    </div>
  )
}
