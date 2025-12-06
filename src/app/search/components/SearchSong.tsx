"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Playlist, Song } from '../../../../types'
import useDebounceValue from '@/hooks/useDebounceValue'
import { useSearch } from '@/providers/SearchProviders'
import { useRouter } from 'next/navigation'
import qs from 'query-string';
import SearchContent from './SearchContent'
import SearchResult from '@/components/SearchResult'

interface SearchSongProps {
    songs: Song[],
    playlists: Playlist[]
}
const SearchSong: React.FC<SearchSongProps> = (
    {
        songs,
        playlists
    }
) => {
    const { searchValue, setSearchValue } = useSearch()
    const debounceValue = useDebounceValue(searchValue, 500);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const isInitAmout = useRef(false);
    const [isFocus, setIsFocus] = useState(false);


    useEffect(() => {
        if (isInitAmout.current) {
            isInitAmout.current = false;
            return;
        }


        const query = {
            title: debounceValue
        }
        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        }, {
            skipEmptyString: true, skipNull: true
        })

        router.push(url)
    },
        [router, debounceValue])


    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
            setIsFocus(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [handleClickOutside])
    return (
        <div>
            <div className='flex flex-col gap-y-6 px-4 py-6'>
                <h1 className='text-white font-semibold text-2xl'>Search Songs</h1>
                {/* input search */}
                <div className='relative w-full max-w-[350px] md:hidden justify-center'>
                    <div className='relative' ref={searchRef}>
                        <span className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                            <IoSearch size={20} className="text-neutral-500" />
                        </span>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setIsFocus(true)}
                            type="text"
                            placeholder='what song you wanna listen ?'
                            className="w-full bg-white text-black placeholder-gray-400 rounded-md py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        />
                        {
                            isFocus && (
                                <SearchResult
                                    value={searchValue}
                                    playlists={ playlists }
                                    searchSong={songs}
                                />
                            )
                        }
                    </div>
                </div>
                <div className='text-white font-semibold'>Start Searching</div>
                {/* search content */}
                <SearchContent />
            </div>
        </div>
    )
}

export default SearchSong
