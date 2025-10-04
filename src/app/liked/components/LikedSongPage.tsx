"use client"

import PlaylistWrapper from '@/app/playlist/[id]/components/PlaylistHeaderWrapper'
import { useGetDominantColor } from '@/hooks/useGetDominantColor'
import React from 'react'
const LikedSongPage = () => {
    const imageUrl = "/assets/liked.png";
    const dominantColor = useGetDominantColor(imageUrl);
    console.log(dominantColor)

     
    return (
        <div >
            <PlaylistWrapper 
                bgColor={ dominantColor }
            >
                This is LikedSong
            </PlaylistWrapper>
        </div>

    )
}

export default LikedSongPage