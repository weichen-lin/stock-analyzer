'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/toggle'
import { GithubLogo, FacebookLogo, GoogleLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function Index() {
  const handleSignIn = async () => {
    // const result = await signIn('github', { callbackUrl: '/stars' })
    // if (result?.error) {
    //   console.error('Sign in failed:', result.error)
    // }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-[600px]'>
        <header className='w-full py-4 lg:py-6 xl:py-8'>
          <div className='container flex items-center justify-around gap-x-6 px-4 md:px-6'>
            <div className='flex items-center gap-x-6'>
              <Link href='/'>
                <Image src='/icon.png' width={40} height={40} alt=''></Image>
              </Link>
              Stock Analyzer
            </div>
            <ModeToggle />
          </div>
        </header>
        <section className='w-full py-4'>
          <div className='container flex items-center justify-center gap-4 px-4 md:px-6'>
            <Image src='/stock-bg.svg' alt='home page' width={350} height={350}></Image>
          </div>
        </section>
        <footer className='w-full'>
          <div className='container flex flex-col items-center justify-center py-8 text-center md:flex-row md:space-x-2 md:space-y-0 md:py-12 lg:py-16 xl:py-24'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>© 2024 WeiChen Lin. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div className='hidden h-full flex-1 items-center justify-center bg-gradient-to-br from-purple-100/30 to-purple-300/30 lg:flex'>
        <Image src='/Charts-bro.png' alt='home page' width={700} height={700}></Image>
      </div>
    </div>
  )
}
