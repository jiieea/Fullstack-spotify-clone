"use client"

import PlaylistWrapper from '@/app/playlist/[id]/components/PlaylistHeaderWrapper'
import { useGetDominantColor } from '@/hooks/useGetDominantColor'
import Image from 'next/image';
import React from 'react';
const LikedSongPage = () => {
    const imageUrl = "/assets/liked.png";
    const dominantColor = useGetDominantColor(imageUrl);
     
    return (
        <div >
            <PlaylistWrapper 
            className=' bg-gradient-to-b from-purple-700 to-neutral-900 p-8'
                bgColor={ dominantColor }
            >
              <div className="flex items-center space-x-4 text-white">
      {/* Playlist image */}
      <div className="w-48 h-48 relative">
        <Image
          src="/assets/liked.png" // Use a static image for "Liked Songs"
          alt="Liked Songs"
          layout="fill"
          objectFit="cover"
          className="shadow-2xl"
        />
      </div>

      {/* Playlist info */}
      <div className="flex flex-col">
        <h2 className="text-sm font-bold uppercase">Playlist</h2>
        <h1 className="text-5xl font-extrabold mt-2">Liked Songs</h1>
        <div className="flex items-center mt-2">
          <p className="font-bold">username</p>
          <span className="mx-1">·</span>
          <p className="text-gray-300">5  songs</p>
        </div>
      </div>
    </div>

            </PlaylistWrapper>
        </div>

    )
}

export default LikedSongPage