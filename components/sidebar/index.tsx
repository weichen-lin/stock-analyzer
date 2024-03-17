'use client'

import { useDevice } from '@/hooks/util'
import SheetSide from './mobile'

export default function Sidebar() {
  const { isMobile } = useDevice()

  return (
    <div>
      <SheetSide />
    </div>
  )
}
