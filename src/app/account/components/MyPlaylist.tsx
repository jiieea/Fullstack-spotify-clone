"use client"

import Image from 'next/image'
import React from 'react'
import { Playlist } from '../../../../types'
import { useLoadPlaylistImage } from '@/hooks/useLoadImage'
import PlayButton from '@/components/PlayButton'
import { useRouter } from 'next/navigation'

interface MyPlaylistProps {
    data: Playlist
}
export const MyPlaylist: React.FC<MyPlaylistProps> = (
    {
        data
    }
) => {
    const playlistImage = useLoadPlaylistImage(data);
    const router = useRouter()

    const handleClickPlaylist =  (playlistId : string) => {
        router.push(`/playlist/${playlistId}`)
    }

    return (
        <div >
            {/* ------------------------------------------------------------------ */}
            {/* 1. Spotify-Style Playlist Card (Desktop/Tablet: md:flex) */}
            {/* ------------------------------------------------------------------ */}
            <div
                // **Revised Classes** for Spotify look: increased hover brightness, more padding, better shadow
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
                        Playlist
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

            {/* ------------------------------------------------------------------ */}
            {/* 2. Mobile/Small Screen List Item (md:hidden) */}
            {/* ------------------------------------------------------------------ */}
            <div
                className="
                    flex items-center gap-x-2 p-2 bg-neutral-800/60 
                    rounded-md overflow-hidden md:hidden
                    hover:bg-neutral-800 transition cursor-pointer
                "
            >
                {/* Image Container */}
                <div className='relative min-w-[48px] min-h-[48px]'>
                    <Image
                        src={playlistImage || "/images/liked.png"}
                        alt='Playlist Image'
                        fill
                        className='object-cover rounded-md'
                    />
                </div>
                {/* Text Container */}
                <div className='flex flex-col gap-y-1 overflow-hidden flex-1'>
                    <p className="text-white font-semibold text-sm truncate">
                        {data.playlist_name}
                    </p>
                    <p className="text-neutral-400 text-xs truncate">
                        Playlist
                    </p>
                </div>
                {/* Play button for mobile list item (optional, you might want to wrap the whole item in a link instead) */}
                <div className="mr-2">
                    {/* You can optionally place a PlayButton here or remove this div */}
                </div>
            </div>
        </div>
    )
}
