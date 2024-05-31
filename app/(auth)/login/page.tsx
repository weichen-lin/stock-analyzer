'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GoogleLogo } from '@phosphor-icons/react'

export default function Index() {
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
        queryParams: { next: '/lists' },
      },
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-[600px] flex flex-col justify-between h-full'>
        <header className='w-full py-4 lg:py-6 xl:py-8 mt-12'>
          <div className='container flex items-center justify-around gap-x-6'>
            <div className='flex items-center gap-x-2'>
              <Link href='/'>
                <Image src='/icon.png' width={40} height={40} alt=''></Image>
              </Link>
              <div className='font-semibold text-lg'>Stock Analyzer</div>
            </div>
            <ModeToggle />
          </div>
        </header>
        <section className='py-4 container flex flex-col items-center justify-around px-4 md:px-6 w-[380px] flex-1'>
          <Image src='/Analysis-img.svg' alt='home page' width={400} height={400}></Image>
          <div className='w-full flex flex-col gap-y-8 justify-between'>
            <Button variant='outline' onClick={handleSignUp} className='w-24 mx-auto'>
              <GoogleLogo className='h-6 w-6' />
            </Button>
          </div>
        </section>
        <footer className='w-full mb-4'>
          <div className='container flex flex-col items-center justify-center py-8 text-center md:flex-row md:space-x-2 md:space-y-0 md:py-12 lg:py-16 xl:py-24'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>© 2024 WeiChen Lin. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div className='hidden h-full flex-1 items-center justify-center lg:flex bg-white'>
        <Image src='/Analysis.gif' alt='home page' width={700} height={700} unoptimized></Image>
      </div>
    </div>
  )
}
