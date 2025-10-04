"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillPushpin } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'


interface LikedSongsProps {
    isSidebarOpen: boolean,
    href: string,
    icon: string
}
const LikedSongs = ({
    isSidebarOpen,
    href,
    icon
}: LikedSongsProps) => {
    const router = useRouter();


    const onClick = () => {
        router.push(href)
    }
    return (
        <div className="flex items-center p-3 
        rounded-xl hover:bg-neutral-800
         transition-colors"
            onClick={onClick}
        >
            <Image
                src={icon}
                alt='likedSong'
                width={40}
                height={40}
                className='object-cover '
            />

            <div className='flex flex-col '>
                <span className={twMerge(
                    `ml-4 text-lg transition-all
                             duration-300 overflow-hidden 
                             whitespace-nowrap w-0 
                             opacity-0` , isSidebarOpen && "w-auto opacity-100"
                )}>
                    liked songs
                </span>
                <span className={twMerge(
                    `ml-4 text-[12px] text-neutral-400 font-semibold transition-all
                             duration-300 overflow-hidden 
                             whitespace-nowrap w-0 
                             opacity-0` , isSidebarOpen && "w-auto opacity-100"
                )}>
                    <span
                        className='flex items-center gap-x-1'>
                        <AiFillPushpin size={15} className='text-green-500' />
                        playlist &bull; 4 titles</span>
                </span>
            </div>
        </div>
    )
}

export default LikedSongs
