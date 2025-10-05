"use client"

import React from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useLoadImage } from '@/hooks/useLoadImage'
import { MediaItemProps } from '../../src/app/interfaces/types'
import LikedButton from '@/components/LikedButton'

const MediaItem: React.FC<MediaItemProps> =
    (
        {
            data,
            index
        }
    ) => {
        const songImg = useLoadImage(data)
        return (
            <div
                className="
                    flex 
                    items-center 
                    gap-x-4 /* Slightly increased gap for clear separation */
                    cursor-pointer 
                    w-full 
                    py-2 
                    px-5 /* Small horizontal padding for the row item */
                    rounded-md
                    hover:bg-neutral-800/50 /* Subtle, full-row hover effect (key Spotify style) */
                    transition
                "
            // onClick={handleClick}
            >
                <p className='text-white'>{index + 1}</p>

                {/* Image and Overlay Container */}
                <div
                    className="
                        relative 
                        min-h-[48px] min-w-[48px] 
                        rounded-md 
                        overflow-hidden 
                        group
                    "
                >
                    <Image
                        alt="song image"
                        src={songImg || "/images/liked.png"}
                        fill
                        className="
                            object-cover 
                            transition-all 
                            duration-300 
                            group-hover:brightness-75 /* Subtle darkening on hover */
                        "
                    />

                    {/* Play Button Overlay */}
                    <div
                        className="
                            absolute 
                            inset-0 
                            flex 
                            items-center 
                            justify-center 
                            bg-black/30 /* Slight, dark background for contrast */
                            opacity-0 
                            group-hover:opacity-100 
                            transition-opacity 
                            duration-300
                        "
                    >
                        <FaPlay className="text-white text-xl" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-grow justify-center truncate">
                    {/* Song Title: White and prominent */}
                    <p className="
                        text-white 
                        font-medium 
                        text-base 
                        truncate
                    ">
                        {data.title}
                    </p>

                    {/* Author/Artist: Neutral gray and less prominent */}
                    <p className="
                        text-neutral-400 
                        text-sm 
                        truncate
                    ">
                        {data.author}
                    </p>
                </div>

                {/* Optional: Placeholder for song duration (ml-auto pushes it to the right) */}
                <p className="text-neutral-400 text-sm ml-auto hidden md:block">3:45</p>
                <LikedButton  songId={ data.id }/>
            </div>
        )
    }

export default MediaItem;
