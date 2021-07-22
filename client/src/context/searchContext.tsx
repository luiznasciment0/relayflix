import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState
} from 'react'

type Props = {
  children: ReactNode
}

type Dispatch = React.Dispatch<React.SetStateAction<string>>

const SearchContext = createContext<
  { searchValue: string; setSearchValue: Dispatch } | undefined
>(undefined)

const SearchProvider = ({ children }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const value = useMemo(
    () => ({
      searchValue,
      setSearchValue
    }),
    [searchValue]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export { SearchProvider, useSearch }
