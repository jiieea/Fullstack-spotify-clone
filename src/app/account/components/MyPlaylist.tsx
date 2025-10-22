"use client"

import Image from 'next/image'
import React from 'react'
import { Playlist, UserDetails } from '../../../../types'
import { useLoadPlaylistImage } from '@/hooks/useLoadImage'
import PlayButton from '@/components/PlayButton'
import { useRouter } from 'next/navigation'

interface MyPlaylistProps {
    data: Playlist,
    userData: UserDetails | null
}
export const MyPlaylist: React.FC<MyPlaylistProps> = (
    {
        data,
        userData
    }
) => {
    const playlistImage = useLoadPlaylistImage(data);
    const router = useRouter()

    const handleClickPlaylist = (playlistId: string) => {
        router.push(`/playlist/${playlistId}`)
    }

    return (
        <div >
            {/* ------------------------------------------------------------------ */}
            <div
                className="
                    hidden relative group md:flex flex-col items-start 
                    justify-start rounded-md overflow-hidden 
                    bg-neutral-800/60 hover:bg-neutral-800 
                    cursor-pointer transition p-4 h-full
                "
                onClick={() => handleClickPlaylist(data.id)}
            >
                {/* Image Container */}
                <div className="relative aspect-square w-full rounded-md overflow-hidden">
                    <Image
                        src={playlistImage || "/images/liked.png"}
                        alt="Playlist Cover"
                        className="object-cover"
                        fill
                        onClick={() => handleClickPlaylist(data.id)}
                    />
                </div>

                {/* Text Container */}
                <div className="flex flex-col items-start w-full mt-4 mb-1">
                    {/* Title: White, bold, truncate, ensures text is visible */}
                    <p className="font-bold truncate w-full text-white">
                        {data.playlist_name}
                    </p>
                    {/* Description/Author: Subdued text, smaller font */}
                    <p className="text-neutral-400 text-sm mt-1 truncate w-full">
                        {/* Placeholder for description/author, if applicable */}
                        By {userData?.full_name}
                    </p>
                </div>

                {/* Play Button Container */}
                <div className="
                    absolute right-4 bottom-4 
                    opacity-0 group-hover:opacity-100 
                    translate-y-4 group-hover:translate-y-0 
                    transition-all duration-300
                ">
                    <PlayButton />
                </div>
            </div>

            <div className='className="
                md:hidden 
                flex 
                space-x-4 
                px-2 // Padding to prevent cards from touching screen edge
                scrollbar-hide // Requires a custom utility or manual CSS
            "'>
                <div
                    key={data.id}
                    onClick={() => handleClickPlaylist(data.id)}
                    className="
                            min-w-[140px] max-w-[140px] 
                            flex flex-col gap-y-2 p-3 
                            bg-neutral-900 rounded-lg
                            hover:bg-neutral-800 transition cursor-pointer
                        "
                >
                    {/* Image Container */}
                    <div className='relative w-full aspect-square'>
                        <Image
                            src={playlistImage || "/images/liked.png"}
                            alt='Playlist Image'
                            fill
                            className='object-cover rounded-md'
                        />
                    </div>
                    {/* Text Container */}
                    <div className='flex flex-col gap-y-1 overflow-hidden'>
                        <p className="text-white font-semibold text-sm truncate">
                            {data.playlist_name}
                        </p>
                        <p className="text-neutral-400 text-xs truncate">
                            By {userData?.full_name}
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
