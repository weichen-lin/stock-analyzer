import { useState, useEffect, useRef } from 'react'

type ClickOutsideHandler = (event: MouseEvent) => void

const useClickOutside = <T extends HTMLElement>(ref: React.RefObject<T>, handler: ClickOutsideHandler): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Do nothing if clicking ref's element or its descendants
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
