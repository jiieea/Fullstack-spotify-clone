"use client"

import {
    useContext,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode
} from "react"

interface SearchContextType {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>
    isShuffle : boolean,
    setIsShuffle : Dispatch<SetStateAction<boolean>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)
const SearchProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [ isShuffle , setIsShuffle ] = useState(false);
    const contextValue = {
        searchValue,
        isShuffle,
        setSearchValue,
        setIsShuffle
    }
    return (
        <SearchContext.Provider value={contextValue} >
            {
                children
            }
        </SearchContext.Provider>
    )
}

// hook search
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context == undefined) {
        throw new Error('useSearch must be use inside searchprovider')
    }
    return context;
}


export default SearchProvider;