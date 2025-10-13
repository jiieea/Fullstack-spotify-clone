"use client"
import React from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useLoadImage } from '@/hooks/useLoadImage'
import { MediaItemProps } from '../../src/app/interfaces/types'
import LikedButton from '@/components/LikedButton'
import useTimeFormat from '@/hooks/useTimeFormat'
import DropDownMenu from "./DropDownMenu";
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import useGetSongDuration from '@/hooks/useGetSongDuration'

const MediaItem: React.FC<MediaItemProps> =
    (
        {
            data,
            index,
            userPlaylists,
            onHandleRemoveSong
        }
    ) => {
        const songImg = useLoadImage(data);
        const created_at = useTimeFormat(data.created_at);
        const songUrl = useLoadSongUrl(data);
        const songDuration = useGetSongDuration(songUrl);
        return (
            <div
                key={index}
                className="grid grid-cols-9 items-center py-2 px-4 
            rounded-lg hover:bg-neutral-800 transition 
            duration-150 ease-in-out cursor-pointer group"
            >
                <div className='col-span-5 flex items-center justify-start gap-x-8'> {/* col-span-7 applied to the flex container */}
                    {/* Show index number by default, switch to play button on hover */}
                    <span>{ index + 1 }</span>
                    <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden ">
                        <Image
                            alt="song image"
                            src={songImg || "/images/liked.png"}
                            fill
                            className="object-cover transition-all duration-300 group-hover:brightness-50"
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
            "
                        >
                            <FaPlay className="text-white text-2xl" />
                        </div>
                    </div>
                    {/* Text Info */}
                    <div className="flex flex-col ml-3 truncate"> {/* Removed incorrect col-span-7, added spacing and truncation */}
                        <span className="text-white font-medium **truncate**">{data.title}</span>
                        <span className="text-sm text-neutral-400 hover:underline **truncate**">
                            {data.author}
                        </span>
                    </div>
                </div>

                {/* 3. Date Added (col-span-3) */}
                <div className="col-span-3   text-neutral-400 text-sm">
                    {created_at}
                </div>

                {/* 4. Duration and Liked Button (col-span-1) */}
                <div className="col-span-1 flex items-center justify-start gap-x-3 pr-4">
                <div className="opacity-0 group-hover:opacity-100 transition mt-2 duration-150">
                        <LikedButton songId={data.id} />
                    </div>
                    {/* Duration */}
                    <span className="text-neutral-400 text-sm">
                        {/* Use data.duration if available, otherwise use mock value */}
                        { songDuration }
                    </span>
                  <DropDownMenu  userPlaylist={ userPlaylists} song={ data } onHandleRemoveSong={() => onHandleRemoveSong(data.id) }/>
                </div>
            </div>
        )
    }

export default MediaItem;
