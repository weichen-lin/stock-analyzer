'use server'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-screen flex flex-1'>
      <Sidebar />
      <div className='w-full flex flex-col overflow-y-auto'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
