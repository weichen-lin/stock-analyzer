export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full mt-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600' />
      <div className='text-xl text-gray-900 mt-4'>Loading...</div>
    </div>
  )
}
