import { useEffect } from 'react'

type ClickOutsideHandler = (event: MouseEvent) => void

const useClickOutside = <T extends HTMLElement>(ref: React.RefObject<T>, handler: ClickOutsideHandler): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
