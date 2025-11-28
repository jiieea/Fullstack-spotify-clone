import React from 'react'
import { Song } from '../../types'
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLoadImage } from '@/hooks/useLoadImage';


interface SearchSongsProps {
    song : Song,
    handlePlaySong  : () => void
}
// ... (omitting imports and interface)
const SearchSongs = (
    {
        song,
        handlePlaySong
    } : SearchSongsProps
) => {
    const image = useLoadImage(song);
  return (
    <div
    key={song.id}
    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#3e3e3e] transition cursor-pointer"
    onClick={handlePlaySong }
>
    {/* 👇 1. Add flex-1 here to make this container take up all available space */}
    <div className="flex items-center gap-3 min-w-0 flex-1"> 
        <div className='w-10 h-10 flex-shrink-0'> {/* Ensure image doesn't shrink */}
        <Image
            src={image || "/assets/liked.png"}
            alt='song image'
            width={40}
            height={40}
            className='object-cover rounded-md w-full h-full'
        />
        </div>
        {/* 👇 2. Add min-w-0 here to allow the text content to shrink below its intrinsic width */}
        <div className="truncate min-w-0"> 
            <p className="text-white text-sm font-medium truncate">{song.title}</p>
            <p className="text-neutral-400 text-xs truncate">{song.author}</p>
        </div>
    </div>
    <ChevronRight size={16} className="text-neutral-500 flex-shrink-0" />
</div>
  )
}

export default SearchSongs

