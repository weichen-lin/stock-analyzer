'use client'

import { CircleNotch } from '@phosphor-icons/react'
import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { queryUSStocks, queryTWStocks, IStock } from '@/finance/query'
import { useDebounce } from '@uidotdev/usehooks'
import { useClickOutside } from '@/hooks/util'

interface SearchSelectProps {
  region: string
  defaultOptions?: IStock[]
  onSelect: (e: IStock) => void
  disabled?: boolean
}

const SearchSelect = (props: SearchSelectProps) => {
  const { defaultOptions = [], onSelect, disabled, region } = props
  const [options, setOptions] = useState<IStock[]>(defaultOptions)
  const [isSearching, setIsSearching] = useState(true)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const debouncedSearchTerm = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedSearchTerm && focused) {
      setIsSearching(true)
      const fetchData = async () => {
        const data =
          region === 'us' ? await queryUSStocks(debouncedSearchTerm) : await queryTWStocks(debouncedSearchTerm)
        console.log({ stockData: data })
        setOptions(data)
        setIsSearching(false)
      }
      fetchData()
    } else {
      setOptions([])
      setIsSearching(false)
    }
  }, [debouncedSearchTerm])

  useClickOutside(ref, () => {
    setFocused(false)
  })

  const handleSelect = (value: string) => {
    const info = options.find(e => e.symbol === value)
    if (info) {
      setValue(info.symbol)
      onSelect({ symbol: info.symbol, name: info.name, key: info.key })
    }

    setFocused(false)
  }

  return (
    <div className='w-full relative' ref={ref}>
      <Input
        placeholder='Search...'
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
        onFocus={async () => {
          setFocused(true)
        }}
        disabled={disabled}
      />
      {focused && (
        <motion.div
          className='origin-top absolute z-10 w-full md:w-[500px] bg-white shadow-lg rounded-md py-1 mt-1 top-[110%] space-y-2 px-2 max-h-[150px] overflow-y-scroll'
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
                className='px-2 py-1 font-semibold bg-slate-100 rounded-md hover:bg-slate-300 cursor-pointer w-full flex items-center justify-start'
                onClick={() => handleSelect(option.symbol)}
              >
                <div className='text-sm text-slate-500 md:w-[70px] truncate'>{option.symbol}</div>
                <div className='px-1 text-sm text-slate-500'>-</div>
                <div className='px-1 md:w-[300px] truncate'>{option.name}</div>
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
