import { useState, useEffect } from 'react'

/**
 * This hook will delay the search api call.
 * @param {string} query the query string
 * @param {number} delay the debounce limit
 * @returns {string} debounceValue
 */
const useDebounce = (query: string, delay: number = 300): string => {
  const [debounceValue, setDebouncedValue] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [query, delay])
  return debounceValue
}

export default useDebounce
