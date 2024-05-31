'use client'

import Loading from './loading'
import { getSetting } from '@/finance/setting'
import { redirect } from 'next/navigation'
import { ISetting } from '@/finance/setting'
import SettingForm from './root'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

interface IPlannerProps {
  id: string
  email: string
}

import { useEffect, useState } from 'react'

export default function Planner(props: IPlannerProps) {
  const { id, email } = props
  const [data, setData] = useState<ISetting | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const setting = await getSetting({ id, email })
        setData(setting)
      } catch (error) {
        console.error(error)
        redirect('/lists')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading && !data) {
    return <Loading />
  }

  if (!data) {
    redirect('/lists')
  }

  return (
    <div className='mt-4'>
      <div className='flex gap-x-3 w-full justify-start items-center p-3 md:py-3 md:px-0 max-w-[832px] mx-auto'>
        <Link href='/lists'>
          <CaretLeft className='w-6 h-6 text-slate-500' />
        </Link>
        <p className='font-bold text-2xl text-slate-500'>{data.name}</p>
      </div>
      <SettingForm {...data.settings} />
    </div>
  )
}
