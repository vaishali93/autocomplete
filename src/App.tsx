import React from 'react'

import './App.css'
import SearchBox from './components/SearchBox'

export default function App (): JSX.Element {
  return (
    <div className="container">
      <SearchBox
        id="search"
        name="search"
        label="Search for any Brewery, Eg: brew"
        placeholder="Enter a search item..."
        maxItems={5}
        debounceWait={400}
        noItemMessage={() => <div>No search results found</div>}
        errorMessage={() => <div>Something went wrong!</div>}
      />
    </div>
  )
}
