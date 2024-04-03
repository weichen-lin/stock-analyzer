import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setting - Stocker',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-screen flex flex-col'>{children}</div>
}
