import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState , useEffect} from 'react'
import { GoHome } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import SearchResult from './SearchResult'
import { Song } from '../../types'
import { useSearch } from '@/providers/SearchProviders'
import useDebounceValue from '@/hooks/useDebounceValue'
import qs from 'query-string'

interface HomeAndSearchProps {
    searchSongs : Song[]
}
export const HomeAndSearch = (
    {
        searchSongs
    }: HomeAndSearchProps
) => {
    const { searchValue , setSearchValue } = useSearch();
    const debounceValue = useDebounceValue(searchValue ,500)
    const ref = useRef<HTMLDivElement>(null);
    const [isFocus, setIsFocus] = useState(false)
    const router = useRouter();
    const isInitialAmount = useRef(true)
    useEffect(() => {
        if(isInitialAmount.current) {
            isInitialAmount.current = false;
            return;
        }

        const query = {
            title : debounceValue
        }

        const url = qs.stringifyUrl({
            url : "/",
            query : query
        } , {
            skipEmptyString : true , skipNull : true
        })

        router.push(url)
    },[router , debounceValue])

    const handleClickOutside = useCallback((event : MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node)) {
            setIsFocus(false)
        }
    },[])

    useEffect(() => {
        // Attach the listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Detach the listener when the component unmounts
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    return (
        <div className="flex items-center gap-x-4 flex-grow justify-center">
            <div
                onClick={() => router.push('/')}
                className="bg-neutral-900 hover:bg-neutral-800 transition hover:scale-110 p-2 rounded-full hidden md:block"
            >
                <GoHome
                    size={30}
                    className="cursor-pointer text-neutral-600
                         hover:text-neutral-400 transition"
                />
            </div>
            <div 
            ref={ref}
            className="relative w-full max-w-md hidden md:block" >
                <div className='relative '>
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                        <IoSearch size={25} className="text-neutral-500" />
                    </span>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsFocus(true)}
                        type="text"
                        id="song-search"
                        placeholder="Search for songs, artists..."
                        className="w-full bg-[#121212] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    />
          {
            isFocus&& (
                <SearchResult 
                value={ searchValue }
                searchSong={ searchSongs}
                />
            )
          }
                </div>
            </div>
        </div>
    )
}
