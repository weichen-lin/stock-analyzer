'use server'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-screen flex'>
      <Sidebar />
      <div className='relative w-full h-full flex flex-col'>
        <Navbar />
        <div className='flex-1 overflow-y-scroll'>{children}</div>
      </div>
    </div>
  )
}
