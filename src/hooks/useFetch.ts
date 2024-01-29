import { useCallback, useEffect, useState } from 'react'
import useDebounce from './useDebounce'

/**
 * This hook will fetch the search api results. It uses debounce method to delay the search.
 * @param {string} query the query string
 * @param {number} debounceWait the debounce limit
 * @param {boolean} shouldSearch whether search has to be performed
 */
const useFetch = (query: string, debounceWait: number, shouldSearch: boolean) => {
  const [data, setData] = useState(null)
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const debouncedValue = useDebounce(query, debounceWait)

  const getData = async (query: string) => {
    try {
      // Have used the api call directly. For production, all the api calls can be moved to service files/constants and
      // can be invoked from them.
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${query}`
      )
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      setData(data)
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message)
      } else {
        console.log('Error', e)
      }
    }
  }

  const fetchAPI = useCallback(getData, [])

  useEffect(() => {
    if (!query || !shouldSearch) {
      setData(null)
      setErrorMessage(null)
      return
    }
    void fetchAPI(query)
  }, [debouncedValue, fetchAPI, query, shouldSearch])

  return [data, setData, errorMessage]
}

export default useFetch
