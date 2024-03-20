'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleNotch } from '@phosphor-icons/react'
import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { queryStocks } from '@/finance/query'
import { useDebounce } from '@uidotdev/usehooks'
import { useClickOutside } from '@/hooks/util'

interface SearchSelectProps {
  defaultOptions?: string[]
  onSearch: (value: string) => void
}

const SearchSelect = (props: SearchSelectProps) => {
  const { defaultOptions = [], onSearch } = props
  const [options, setOptions] = useState<string[]>(defaultOptions)
  const [isSearching, setIsSearching] = useState(true)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const debouncedSearchTerm = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedSearchTerm && focused) {
      setIsSearching(true)
      const fetchData = async () => {
        const data = await queryStocks(debouncedSearchTerm)
        setOptions(data.map((e) => e.symbol))
        setIsSearching(false)
      }
      fetchData()
    } else {
      setOptions([]) // Clear options when search term is empty
      setIsSearching(false)
    }
  }, [debouncedSearchTerm])

  useClickOutside(ref, () => {
    setFocused(false)
  })

  const handleSelect = (value: string) => {
    setValue(value)
    setFocused(false)
  }

  return (
    <div className='w-full relative' ref={ref}>
      <Input
        placeholder='Search...'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onFocus={async () => {
          setFocused(true)
        }}
      />
      {focused && (
        <motion.div
          className='origin-top absolute z-10 w-full bg-white shadow-lg rounded-md py-1 mt-1 overflow-y-auto top-[110%] space-y-2 px-2'
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.2 }}
        >
          {options.length > 0 &&
            !isSearching &&
            options.map((option, index) => (
              <div
                key={index}
                className='px-2 py-1 font-semibold bg-slate-100 rounded-md'
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          {isSearching && (
            <div className='w-full py-1 text-slate-500/70 flex items-center justify-center'>
              <CircleNotch className='animate-spin w-6 h-6' />
            </div>
          )}
          {options.length === 0 && !isSearching && (
            <div className='w-full py-1 text-center text-slate-300 text-sm '>No Results</div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SearchSelect
