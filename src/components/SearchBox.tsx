import React, { useState } from 'react'

import ListBox from './ListBox'
import useFetch from '../hooks/useFetch'

interface SearchBoxProps {
  id: string
  name: string
  label: string
  placeholder: string
  maxItems: number
  debounceWait: number
  noItemMessage: () => void
  errorMessage: () => void
}

const SearchBox: React.FC<SearchBoxProps> = ({
  id,
  name,
  label,
  placeholder,
  maxItems,
  debounceWait,
  noItemMessage,
  errorMessage
}) => {
  const [query, setQuery] = useState<string>('')
  const [shouldSearch, setShouldSearch] = useState<boolean>(true)
  const [data, setData, error] = useFetch(query, debounceWait, shouldSearch)
  const [activeListItem, setActiveListItem] = useState<any>(null)

  /**
   * Handles the search query input from the user.
   * @param e The user action event (Required).
   */
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
  }

  /**
   * Handles the key up/down/enter functionality. Sets the activeListItem index based on the key action.
   * @param e The user action event (Required).
   */
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.keyCode
    if (keyCode === 13) {
      if (activeListItem === null) return
      setQuery(data[activeListItem].name)
      setData(null)
      setActiveListItem(null)
      setShouldSearch(false)
      return
    }
    setShouldSearch(true)
    if (!data || data.length === 0) return
    if (keyCode === 40) {
      if (activeListItem === null || activeListItem === data.length - 1) { setActiveListItem(0) } else setActiveListItem((prevIndex: number) => prevIndex + 1)
    } else if (keyCode === 38) {
      if (activeListItem === 0) setActiveListItem(data.length - 1)
      else setActiveListItem((prevIndex: number) => prevIndex - 1)
    }
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={id}
        data-testid="search"
        name={name}
        value={query}
        placeholder={placeholder}
        onChange={handleSearchQueryChange}
        onKeyUp={handleKeyUp}
      />
      {data != null && data.length > 0 && (
        <ListBox items={data} activeIndex={activeListItem} />
      )}
      {query != null && data != null && data.length === 0 && noItemMessage()}
      {error != null && errorMessage()}
    </>
  )
}

export default SearchBox
