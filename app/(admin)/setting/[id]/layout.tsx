import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setting - Stock Analyzer',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-screen flex flex-col bg-slate-100/30'>{children}</div>
}
