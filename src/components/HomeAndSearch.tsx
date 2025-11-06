import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { GoHome } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'

interface HomeAndSearchProps {
    value : string,
    setValue : Dispatch<SetStateAction<string>>
}
export const HomeAndSearch = (
    {
        value, 
        setValue
    } : HomeAndSearchProps
) => {
    const router = useRouter();
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
                <div className="relative w-full max-w-md hidden md:block">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                        <IoSearch size={25} className="text-neutral-500" />
                    </span>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        id="song-search"
                        placeholder="Search for songs, artists..."
                        className="w-full bg-[#121212] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    />
                </div>
            </div>
  )
}
