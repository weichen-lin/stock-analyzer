'use client'

import { getSettings } from '@/finance/setting'
import { Setting } from '.'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { ISetting } from '@/finance/setting'
import AddSetting from './add'

export default function Settings(props: { email: string }) {
  const { email } = props
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ISetting[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const settings = await getSettings(email)
      setData(settings)
      setLoading(false)
    }

    fetchData()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className='flex flex-col gap-y-2 md:grid md:grid-cols-3 w-full'>
      {data.map((setting: ISetting, index: number) => (
        <Setting key={index} {...setting} />
      ))}
    </div>
  )
}

const Loading = () => {
  return (
    <div className='w-full md:grid md:grid-cols-3 space-y-6 md:space-y-0'>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className='space-y-2 w-full md:w-[95%] md:mx-auto'>
    <Skeleton className='h-4 md:h-16 w-full bg-slate-300/40' />
    <Skeleton className='h-4 md:h-8 w-full bg-slate-300/40' />
  </div>
)
