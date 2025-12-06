import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState , useEffect} from 'react'
import { GoHome } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import SearchResult from './SearchResult'
import { Playlist, Song } from '../../types'
import { useSearch } from '@/providers/SearchProviders'
import useDebounceValue from '@/hooks/useDebounceValue'
import qs from 'query-string'

/**
 * Props for the HomeAndSearch component
 */
interface HomeAndSearchProps {
    /** Array of songs to be used for search results */
    searchSongs : Song[],
    playlists : Playlist[]
}

/**
 * HomeAndSearch Component
 * 
 * A navigation and search component that provides:
 * - Home button navigation (desktop only)
 * - Real-time search input with debouncing
 * - Search results dropdown with click-outside detection
 * - URL query parameter synchronization
 * 
 * @component
 * @example
 * ```tsx
 * <HomeAndSearch searchSongs={songs} />
 * ```
 * 
 * @features
 * - **Debounced Search**: Uses 500ms debounce to prevent excessive API calls
 * - **URL Sync**: Updates URL query parameters when search value changes
 * - **Click Outside**: Automatically closes search results when clicking outside
 * - **Responsive**: Home button and search input are hidden on mobile (md:hidden)
 * - **Focus Management**: Shows search results only when input is focused
 * 
 * @dependencies
 * - Requires SearchProvider context wrapper (useSearch hook)
 * - Uses Next.js router for navigation
 * - Uses query-string for URL parameter management
 * 
 * @behavior
 * - On mount, skips initial URL update to prevent unnecessary navigation
 * - Debounces search input by 500ms before updating URL
 * - Closes search results when clicking outside the component
 * - Only displays on medium screens and above (md:block)
 */
export const HomeAndSearch = (
    {
        searchSongs,
        playlists
    }: HomeAndSearchProps
) => {
    const { searchValue , setSearchValue } = useSearch();
    const debounceValue = useDebounceValue(searchValue ,500)
    const ref = useRef<HTMLDivElement>(null);
    const [isFocus, setIsFocus] = useState(false)
    const router = useRouter();
    const isInitialAmount = useRef(true)
    
    /**
     * Effect: Updates URL query parameters when debounced search value changes
     * Skips the initial render to prevent unnecessary navigation
     * Only updates URL if search value is not empty
     */
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

        router.push(url);
    },[router , debounceValue])

    /**
     * Handles click outside the search component to close search results
     * @param event - Mouse event from document click
     */
    const handleClickOutside = useCallback((event : MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node)) {
            setIsFocus(false)
        }
    },[])

    /**
     * Effect: Attaches click-outside listener to close search results
     * Removes listener on unmount to prevent memory leaks
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
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
                playlists = { playlists }
                />
            )
          }
                </div>
            </div>
        </div>
    )
}
