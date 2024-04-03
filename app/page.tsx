'use client'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='flex gap-1 items-center justify-start p-4 max-w-[1024px] fixed top-0 w-full'
      >
        <Image src='/icon.png' alt='logo' width={60} height={60}></Image>
        <div className='text-2xl font-semibold dark:text-slate-100'>Stocker</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='relative flex flex-col gap-4 items-center justify-center px-4 max-w-[1024px]'
      >
        <div className='text-3xl md:text-7xl font-bold dark:text-white text-center'>
          Rebalance, the ultimate investment skill.
        </div>
        <div className='font-extralight text-base md:text-4xl dark:text-neutral-200 py-4'>
          And this, is the final tool.
        </div>
        <Link href='/login' className='bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2'>
          Login
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0.0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='flex gap-1 items-center justify-center px-4 py-1 max-w-[1024px] fixed bottom-0 w-full text-sm text-slate-500/70'
      >
        Copyright © 2024 WeiChen Lin. All rights reserved.
      </motion.div>
    </AuroraBackground>
  )
}
