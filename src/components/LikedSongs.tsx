"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillPushpin } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { Song } from '../../types'

interface LikedSongsProps {
    isSidebarOpen: boolean,
    href: string,
    icon: string,
    likedSongs : Song[]
}
const LikedSongs = ({
    isSidebarOpen,
    href,
    icon,
    likedSongs
}: LikedSongsProps) => {
    const router = useRouter();
    const liked = likedSongs.length;

    const onClick = () => {
        router.push(href)
    }
    return (
        <div
            onClick={onClick}
            className="
          flex 
          items-center 
          gap-x-3 
          cursor-pointer 
          w-full 
          p-3 
          rounded-md
          hover:bg-neutral-800 transition
        "
        >
            <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
                <Image
                    alt="song image"
                    src={icon}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
                />
                <div
                    className="
              absolute 
              inset-0 
              flex 
              items-center 
              justify-center 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            " // Fade in play button on hover
                >
                    <FaPlay className="text-white text-2xl" /> {/* Increased icon size */}
                </div>
            </div>
            <div className='flex flex-1 flex-col '>
                <span className={twMerge(
                    `ml-4 text-lg transition-all 
                duration-300 overflow-hidden text-neutral-400 font-semibold 
                whitespace-nowrap w-0 opacity-0`
                    , isSidebarOpen && "w-full opacity-100 max-w-[150px] truncate text-[16px]"
                )}>Liked Songs</span>
                <span className={
                    twMerge(
                        `ml-4 text-[12px] transition-all text-neutral-400 font-semibold
  duration-300 overflow-hidden 
  whitespace-nowrap w-0 
  opacity-0` , isSidebarOpen && "w-auto opacity-100"
                    )}>
                    <span className='flex items-center gap-x-1'>
                        <AiFillPushpin size={15} className='text-green-500' />
                        playlist &bull; { liked } songs</span>
                </span>
            </div>
        </div>
    )
}

export default LikedSongs
