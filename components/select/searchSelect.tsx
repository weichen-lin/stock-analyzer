'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleNotch } from '@phosphor-icons/react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

interface SearchSelectProps {
  defaultOptions?: string[]
  onSearch: (value: string) => void
}

const SearchSelect = (props: SearchSelectProps) => {
  const { defaultOptions = [], onSearch } = props
  const [options, setOptions] = useState<string[]>(defaultOptions)
  const [isSearching, setIsSearching] = useState(true)
  const [focused, setFocused] = useState(false)
  return (
    <div className='w-full relative'>
      <Input
        placeholder='Search...'
        onChange={(e) => {}}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
      />
      {focused && (
        <motion.div
          className='origin-top absolute z-10 w-full bg-white shadow-lg rounded-md py-1 mt-1 overflow-y-auto top-[110%]'
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.2 }}
        >
          {options.length > 0 && !isSearching && options.map((option, index) => <div key={index}>{123}</div>)}
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
