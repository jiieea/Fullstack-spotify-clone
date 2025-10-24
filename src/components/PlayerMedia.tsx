"use client"
import React from 'react'
import { Song } from '../../types'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
// import useGetDevice from '@/hook/useGetDevice'
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useLoadImage } from '@/hooks/useLoadImage'
import usePlayerSong from '@/hooks/usePlayer'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import useGetSongDuration from '@/hooks/useGetSongDuration'

interface PlayerMediaProps {
    data: Song
    onClick?: (id: string) => void
}
const PlayerMedia: React.FC<PlayerMediaProps> = ({
    data,
    onClick,
}) => {
    const imagePath = useLoadImage(data);
    const player = usePlayerSong();
    const songUrl = useLoadSongUrl(data);
    const songDuration = useGetSongDuration(songUrl!);
    const { author, title } = data
    // const device = useGetDevice();
    // const { deviceType } = device
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
        return player.setId(data.id)
    }
    return (
        <div
            className="
          flex 
          items-center 
          gap-x-3 
          cursor-pointer 
          w-full 
          p-3 
          rounded-md
        "
            onClick={handleClick}
        >
            <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
                <Image
                    alt="song image"
                    src={imagePath || "/images/liked.png"}
                    fill
                    className="object-cover z-30 transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
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
            <div className="flex-1 w-full max-w-[150px] overflow-hidden md:hidden">
                <div className="whitespace-nowrap 
  animate-marquee 
  inline-block 
  justify-center 
  md:animate-none">
                    <p className="text-white font-semibold text-base text-[12px] md:text-[15px] inline-block">
                        {data.title} &bull; <span className="text-neutral-400 text-sm text-[12px] md:text-[13px]">{data.author}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/* This creates a gap between the repeats */}
                        {data.title} &bull; <span className="text-neutral-400 text-sm text-[12px] md:text-[13px]">{data.author}</span>
                    </p>
                </div>
                <div className='flex gap-x-1.5 items-center'>
                    <IoPhonePortraitOutline className='text-green-500 ' size={10} />
                    {/* <p className='text-green-400 font-light text-[12px]'>{deviceType}</p> */}
                </div>
            </div>
            <div className='md:flex flex-col gap-y-1 hidden w-[200px]'>
                <p className='text-white '>{title}</p>
                <p className='text-neutral-500 text-[12px]'>{author}</p>
            </div>
            {songDuration && (
                <p className="text-neutral-400 text-sm ml-auto hidden md:block">{songDuration}</p>
            )}
        </div>
    )
}

export default PlayerMedia;