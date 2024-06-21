import { Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function Operator({ index, remove }: { index: number; remove: (index: number) => void }) {
  return (
    <td className='flex items-center justify-center'>
      <Button
        variant='destructive'
        size='icon'
        className='border-none w-7 h-7'
        onClick={() => {
          remove(index)
        }}
      >
        <Trash className='h-4 w-4' />
      </Button>
    </td>
  )
}
