import React, { useState } from 'react'
import { Playlist, Song } from '../../../../../types'
import MediaItem from '@/components/MediaItem'
import { FaPlay } from "react-icons/fa";
import LikedSongContent from '@/app/liked/components/LikedSongContent';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { sortDataByArtist, sortDataByTitle, sortedDataByCreatedDate } from '@/hooks/useSortData';
import SortDropdown from '@/components/SortListButton';
import { PlaylistOption } from './PlaylistOption';
import { LiaRandomSolid } from "react-icons/lia";
import { twMerge } from 'tailwind-merge';

interface PlaylistContentProps {
  songs: Song[]
  data: Playlist
  userPlaylist: Playlist[]
  onHandlePlay : (id : string) => void
}

export const PlaylistContent: React.FC<PlaylistContentProps> = (
  {
    onHandlePlay,
    songs,
    userPlaylist,
    data
  }
) => {
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(songs);
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false)
    const [playRandom , setPlayRandom ] =  useState(false);
  const playlist_id = data.id;
  const router = useRouter();
  const [sort, setSort] = useState<"by artist" | "by title" | 'add recently' | 'default'>('default');
  const [ disabled , setDiasabled ] = useState(false);
      const toggleRandom = () => {
      setPlayRandom(!playRandom)
    }

  const handleSortByArtist = () => {
    try {
      setSort('by artist');
      setIsLoading(true);
      const sortedData = sortDataByArtist(playlistSongs);
      setPlaylistSongs(sortedData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setSort('default')
      }
      setIsLoading(false)
    }
  }

  const handleSortByTitle = () => {
    try {
      setIsLoading(true);
      setSort('by title');
      const sortedData = sortDataByTitle(playlistSongs);
      setPlaylistSongs(sortedData)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        setSort('default')
      }
      setIsLoading(false)
    }
  }

  const HandleSortByRecentlyAdd = () => {
    try {
      setIsLoading(true);
      setSort('add recently');
      const sortedData = sortedDataByCreatedDate(playlistSongs);
      setPlaylistSongs(sortedData)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      setSort('default');
    }
  }
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
        <LiaRandomSolid  size={25} className={twMerge(
          ` hover:scale-110 transition` ,
          playRandom ? "text-green-500" : "text-neutral-400 hover:text-neutral-300"
        )}
          onClick={toggleRandom}
        />
        <PlaylistOption  
          disabled={ disabled }
        playlistData={data}/>
        <SortDropdown
          onHandleSortByArtist={handleSortByArtist}
          onHandleSortByRecentlyAdd={HandleSortByRecentlyAdd}
          onHandleSortByTitle={handleSortByTitle}
          sort={sort} />
      </div>
      <LikedSongContent>
        {
          playlistSongs.map((song, index) => (
            <MediaItem
              isLoading={isLoading}
              onHandlePlay={onHandlePlay}
              onHandleRemoveSong={() => handleRemoveSong(song.id)}
              key={song.id} data={song} index={index} userPlaylists={userPlaylist} />
          ))
        }
      </LikedSongContent>
    </div>
  )
}
