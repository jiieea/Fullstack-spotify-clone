import React, { useState } from 'react'
import { Playlist, Song } from '../../../../../types'
import MediaItem from '@/components/MediaItem'
import { BsThreeDots } from 'react-icons/bs'
import { FaPlay } from "react-icons/fa";
import LikedSongContent from '@/app/liked/components/LikedSongContent';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

interface PlaylistContentProps {
  songs: Song[]
  data: Playlist
  userPlaylist: Playlist[]
}

export const PlaylistContent: React.FC<PlaylistContentProps> = (
  {
    songs,
    userPlaylist,
    data
  }
) => {
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(songs);
  const supabase = useSupabaseClient()
  const playlist_id = data.id;
  const router = useRouter();

  // const 

  const handleRemoveSong = async (songId: string) => {
    try {
      const {
        error
      } = await supabase.from('playlist_songs')
        .delete().eq('song_id', songId)
        .eq('playlist_id', playlist_id)

      if (error) {
        toast.error(error.message)
      }

      setPlaylistSongs(songs => songs.filter((song) => song.id === songId));
      router.refresh()
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }

  }

  if (songs.length == 0) {
    return <div>There is no song on the list</div>
  }
  return (
    <div className=' mt-[-3rem] py-2 px-1 md:py-3 md:px-3'>
      <div className="flex space-x-4  items-center mb-4  px-6">
        <button 
        title='play'
        className='bg-green-500 rounded-full p-3 hover:scale-110 transition cursor-pointer'>
          <FaPlay size={20} className='text-black' />
        </button>
        <BsThreeDots size={20}
          className='text-neutral-700 hover:text-neutral-600 transition hover:scale-110' />
      </div>
      <LikedSongContent>
        {
          playlistSongs.map((song, index) => (
            <MediaItem
              onHandleRemoveSong={() => handleRemoveSong(song.id)}
              key={song.id} data={song} index={index} userPlaylists={userPlaylist} />
          ))
        }
      </LikedSongContent>
    </div>
  )
}
