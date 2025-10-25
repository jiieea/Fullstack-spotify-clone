import Image from 'next/image'
import React from 'react'
import { Playlist, Song } from '../../../../types'
import { useLoadImage } from '@/hooks/useLoadImage'
import { FaPlay } from 'react-icons/fa'
import useGetSongDuration from '@/hooks/useGetSongDuration'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import LikedButton from '@/components/LikedButton'
import DropDownMenu from '@/components/DropDownMenu'
import useTimeFormat from '@/hooks/useTimeFormat'


interface OwnedSongsProps {
    song: Song,
    index: number,
    userPlaylists: Playlist[]
}
const OwnedSongs = ({ song, index, userPlaylists }: OwnedSongsProps) => {
    const imagePath = useLoadImage(song);
    const songUrl = useLoadSongUrl(song)
    const songDuration = useGetSongDuration(songUrl!);
    const created_at = useTimeFormat(song.created_at)

    function handleRemoveSong(id: string) {
        alert('oke' + id)
    }
    return (
        <div
            key={index}
            // Base grid (mobile): 5 columns (index/info, duration/actions).
            // Small/Medium screens: 7 columns (to include Date Added, duration/actions).
            // Original grid-cols-9 was a bit too wide. 
            // We use grid-cols-[1fr_minmax(0,_3fr)_auto] for a flexible approach, 
            // but sticking to standard grid-* for simplicity:
            className="
                grid 
                grid-cols-5 
                sm:grid-cols-6
                md:grid-cols-9 
                items-center 
                py-2 px-4 
                rounded-lg hover:bg-neutral-800 transition 
                duration-150 ease-in-out cursor-pointer group
            "
        >
            {/* 1. Song Info (Index, Image, Title/Author) */}
            {/* On mobile/small: Takes up 4 columns out of 5/6. On medium+: 5 columns out of 9 */}
            <div className='col-span-4 sm:col-span-4 md:col-span-5 flex items-center justify-start gap-x-4 sm:gap-x-8'>
                {/* Index Number / Play Button */}
                <span className="w-4 flex-shrink-0 text-right hidden md:block">{index + 1}</span>
                
                {/* Image (Hidden on very small screens for better use of space) */}
                <div className="
                    relative 
                    min-h-[49px] 
                    min-w-[49px] 
                    rounded-md 
                    overflow-hidden
                
                    sm:block
                ">
                    <Image
                        alt="song image"
                        src={imagePath || "/images/liked.png"}
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
                
                {/* Text Info (Title/Author) */}
                <div className="flex flex-col ml-3 truncate min-w-0">
                    <span className="text-white text-[13px] md:text-[1rem] font-medium truncate">{song.title}</span>
                    <span className="text-sm text-neutral-400 hover:underline truncate">
                        {song.author}
                    </span>
                </div>
            </div>

            {/* 2. Date Added */}
            {/* Hidden on small screens, appears on md+ and takes up 3 columns */}
            <div className="hidden md:block col-span-3 text-neutral-400 text-sm truncate">
                {created_at}
            </div>

            {/* 3. Duration, Liked Button, Dropdown Menu */}
            {/* On mobile/small: Takes up 1 column out of 5/6. On medium+: 1 column out of 9 */}
            <div className="col-span-1 flex items-center justify-end gap-x-2 sm:gap-x-3 pr-2 sm:pr-4">
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition mt-2 duration-150">
                    <LikedButton songId={song.id} />
                </div>
                {/* Duration (Hidden on very small screens to make room for dropdown) */}
                <span className="text-neutral-400 text-sm hidden sm:block w-8 text-right flex-shrink-0">
                    {songDuration}
                </span>
                
                {/* Dropdown Menu (Always visible) */}
                <div className="mt-2 flex-shrink-0">
                    <DropDownMenu userPlaylist={userPlaylists} song={song} onHandleRemoveSong={() => handleRemoveSong(song.id)} />
                </div>
            </div>
        </div>
    )
}

export default OwnedSongs