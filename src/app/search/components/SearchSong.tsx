"use client"

import React, { useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Playlist, Song } from '../../../../types'
import useDebounceValue from '@/hooks/useDebounceValue'
import { useSearch } from '@/providers/SearchProviders'
import { useRouter } from 'next/navigation'
import qs from 'query-string';


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

    useEffect(() => {
        const query = {
            title: debounceValue
        }
        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        })

        router.push(url)
    },
        [router, debounceValue])
    return (
        <div>
            <div className='flex flex-col gap-y-3 p-4'>
                <h1 className='text-white font-semibold text-2xl'>Search Songs</h1>
                {/* input search */}
                <div className='relative w-full max-w-[300px] md:hidden justify-center'>
                    <div className='relative'>
                        <span className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                            <IoSearch size={20} className="text-neutral-500" />
                        </span>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            placeholder='what song you wanna listen ?'
                            className="w-full bg-white text-black placeholder-gray-400 rounded-md py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        />
                    </div>
                </div>
                {/* search content */}
                <div className='grid grid-cols-2 gap-2'>
                    <div className='bg-pink-400 rounded-2xl w-full h-full p-3'>
                        Music
                    </div>
                    <div className='bg-green-400 rounded-2xl w-full h-full'>
                        Playlist
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSong
