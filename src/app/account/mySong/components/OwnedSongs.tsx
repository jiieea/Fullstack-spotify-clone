import LikedButton from '@/components/LikedButton'
import Image from 'next/image'
import React from 'react'
import {  Playlist, Song } from '../../../../../types'
import usePlayerSong from '@/hooks/usePlayer'
import Loader from '@/components/Loader'
import { useLoadImage } from '@/hooks/useLoadImage'
import { FaPlay } from 'react-icons/fa'
import useGetSongDuration from '@/hooks/useGetSongDuration'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'

interface OwnedSongsProps {
    data: Song,
    index: number,
    userPlaylists : Playlist[]
    onHandlePlay: (id: string) => void,
}
const OwnedSongs: React.FC<OwnedSongsProps> = (
    {
        data,
        index,
        onHandlePlay,
        userPlaylists
    }
) => {
    const player = usePlayerSong();
    console.log(userPlaylists)
    const songUrl = useLoadSongUrl(data)
    const { title, author, created_at } = data
    const duration = useGetSongDuration(songUrl)
    const isPlaying = player.activeId === data.id;
    const songImg = useLoadImage(data)
    const handleClick = () => {
        if (onHandlePlay) {
            return onHandlePlay(data.id)
        }
        return player.setId(data.id)
    }
    return (
        <div
            onClick={handleClick}
            key={index}
            className="grid md:grid-cols-9 sm:grid-cols-6 grid-cols-5 items-center py-2 px-2 
rounded-lg hover:bg-neutral-800 transition
duration-150 ease-in-out cursor-pointer group"
        >
            <div className='col-span-4 md:col-span-5 flex items-center justify-start gap-x-8'> {/* col-span-7 applied to the flex container */}
                {/* Show loader when playing, index number otherwise */}
                <div className='hidden md:flex items-center justify-center min-w-[48px]'>
                    {isPlaying ? <Loader /> : <span>{index + 1}</span>}
                </div>
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
                    <span className="md:text-base text-white font-medium truncate text-[12px]">{title}</span>
                    <span className="text-[12px] md:text-sm text-neutral-400 hover:underline truncate">
                        {author}
                    </span>
                </div>
            </div>

            {/* 3. Date Added (col-span-3) */}
            <div className="col-span-3 hidden md:block  text-neutral-400 text-sm">
                {created_at}
            </div>

            {/* 4. Duration and Liked Button (col-span-1) */}
            <div className="col-span-1 md:col-span-1 flex items-center justify-start gap-x-3 pr-4 ">
                <div className="opacity-0 group-hover:opacity-100 transition mt-2 duration-150 hidden">
                    <LikedButton songId={data.id} />
                </div>
                {/* Duration */}
                <span className="text-neutral-400 text-sm hidden md:block">
                    {/* Use data.duration if available, otherwise use mock value */}
                    {duration}
                </span>
                <LikedButton songId={data.id} />
            </div>

        </div>
    )
}

export default OwnedSongs
