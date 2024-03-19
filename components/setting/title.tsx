import { CaretLeft } from '@phosphor-icons/react/dist/ssr'

export default function Title({ title }: { title: string }) {
  return (
    <div className='flex gap-x-3 w-full justify-start items-center p-3'>
      <CaretLeft className='w-6 h-6 text-slate-500' />
      <p className='font-bold text-2xl text-slate-500'>{title}</p>
    </div>
  )
}
