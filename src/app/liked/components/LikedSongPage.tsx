"use client"

import PlaylistWrapper from '@/app/playlist/[id]/components/PlaylistHeaderWrapper'
import { useGetDominantColor } from '@/hooks/useGetDominantColor'
import React, { useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import LikedSongContent from './LikedSongContent';
import LikedSongHeader from './LikedSongHeader';
import MediaItem from '@/components/MediaItem';
import { toast } from 'sonner';
import useOnplay from '@/hooks/useOnPlay';
import { FaList } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

interface LikedSongPageProps {
  likedSongs: Song[]
  userData: UserDetails | null
  userPlaylists: Playlist[]
}
const LikedSongPage: React.FC<LikedSongPageProps> = ({
  likedSongs,
  userPlaylists,
  userData
}) => {
  const imageUrl = "/assets/liked.png";
  const dominantColor = useGetDominantColor(imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const onPlay = useOnplay(likedSongs)


  const handle = () => {
    toast.success('hello')
  }
  return (
    <div >
      <PlaylistWrapper
        className=' bg-gradient-to-b from-purple-700 to-neutral-900 p-8  '
        bgColor={dominantColor}
      >
        <LikedSongHeader userData={userData} likedSongs={likedSongs} />
      </PlaylistWrapper>
      <div className='flex flex-col space-y-2 '>
        <div className='flex items-center justify-between'>
          {/* play button and random play */}
          <div className='flex items-center gap-x-2 px-5'>
            <FaPlayCircle size={25} className='text-black bg-green-500 hover:scale-110 transition' />
          </div>
          <div className='flex items-center gap-x-2 pr-6'>
            <p className='text-neutral-400 text-[13px] font-semibold'>Sort The Songs</p>
            <FaList size={20} className='text-neutral-400' />
          </div>
        </div>
        <LikedSongContent >
          {
            likedSongs.map((song, index) => (
              <MediaItem
                onHandlePlay={(id: string) => onPlay(id)}
                isLoading={isLoading}
                index={index} key={index} data={song} userPlaylists={userPlaylists} onHandleRemoveSong={handle} />
            ))
          }
        </LikedSongContent>
      </div>
    </div>

  )
}

export default LikedSongPage