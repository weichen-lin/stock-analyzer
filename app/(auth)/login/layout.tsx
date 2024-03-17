import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Stock Analyzer'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>
}
