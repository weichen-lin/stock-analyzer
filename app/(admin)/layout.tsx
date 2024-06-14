'use server'
import Sidebar from '@/components/sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-screen'>
      <Sidebar />
      <div className='w-full flex flex-col overflow-y-auto'>{children}</div>
    </div>
  )
}
