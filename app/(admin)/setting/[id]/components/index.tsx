'use client'

import Loading from './loading'
import { redirect } from 'next/navigation'
import SettingForm from './root'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IStocksSchema } from '@/app/api/setting/type'

export default function Planner() {
  const { id } = useParams()

  const [data, setData] = useState<IStocksSchema | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/setting?id=${id}`)
        const j = await res.json()
        if (j.error) {
          throw new Error(j.error)
        }

        setData(j.data)
      } catch {
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
    <div className='mt-1'>
      <div className='flex gap-x-3 w-full justify-start items-center p-3 md:py-3 md:px-0 max-w-[832px] mx-auto'>
        <Link href='/lists'>
          <CaretLeft className='w-6 h-6 text-slate-500' />
        </Link>
        <p className='font-bold text-xl text-slate-500'>{data.name}</p>
      </div>
      <SettingForm {...data} />
    </div>
  )
}
