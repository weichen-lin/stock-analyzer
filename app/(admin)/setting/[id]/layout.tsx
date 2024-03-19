import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setting - Stock Analyzer',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-full flex flex-col'>{children}</div>
}
