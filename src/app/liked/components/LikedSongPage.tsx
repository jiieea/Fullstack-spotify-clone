"use client"

import PlaylistWrapper from '@/app/playlist/[id]/components/PlaylistHeaderWrapper'
import { useGetDominantColor } from '@/hooks/useGetDominantColor'
import React, { useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import LikedSongContent from './LikedSongContent';
import LikedSongHeader from './LikedSongHeader';
import MediaItem from '@/components/MediaItem';
import { toast } from 'sonner';
interface LikedSongPageProps {
  likedSongs: Song[]
  userData: UserDetails | null
  userPlaylists : Playlist[]
}
const LikedSongPage: React.FC<LikedSongPageProps> = ({
  likedSongs,
  userPlaylists,
  userData
}) => {
  const imageUrl = "/assets/liked.png";
  const dominantColor = useGetDominantColor(imageUrl);


const handle = () => {
  toast.success('hello')
}
  return (
    <div >
      <PlaylistWrapper
        className=' bg-gradient-to-b from-purple-700 to-neutral-900 p-8'
        bgColor={dominantColor}
      >
        <LikedSongHeader userData={userData} likedSongs={ likedSongs } />
      </PlaylistWrapper>
      <LikedSongContent >
         {
        likedSongs.map((song, index) => (
          <MediaItem index={index} key={index} data={song} userPlaylists={ userPlaylists}   onHandleRemoveSong={handle}/>
        ))
      }
      </LikedSongContent>
    </div>

  )
}

export default LikedSongPage