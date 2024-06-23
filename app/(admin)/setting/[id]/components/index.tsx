'use client'

import { redirect } from 'next/navigation'
import SettingForm from './root'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IStocksSchema } from '@/app/api/setting/type'

function Loading() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full mt-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600' />
      <div className='text-xl text-gray-900 mt-4'>Loading...</div>
    </div>
  )
}

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
      } catch (e) {
        console.log(e)
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
    <div className='w-full h-full flex flex-col justify-start pt-[72px]'>
      <div className='flex gap-x-3 w-full justify-start items-center p-3 md:p-7'>
        <Link href='/lists'>
          <CaretLeft className='w-6 h-6 text-slate-500' />
        </Link>
        <p className='font-bold text-xl text-slate-500'>{data.name}</p>
      </div>
      <div className='flex-1'>
        <SettingForm {...data} />
      </div>
    </div>
  )
}
