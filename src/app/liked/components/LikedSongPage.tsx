"use client"

import PlaylistWrapper from '@/app/playlist/[id]/components/PlaylistHeaderWrapper'
import { useGetDominantColor } from '@/hooks/useGetDominantColor'
import React, { useCallback, useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import LikedSongContent from './LikedSongContent';
import LikedSongHeader from './LikedSongHeader';
import { toast } from 'sonner';
import useOnplay from '@/hooks/useOnPlay';
import { FaPause, FaPlay } from "react-icons/fa";
import {
  sortDataByArtist,
  sortDataByTitle,
  sortedDataByCreatedDate
} from '@/hooks/useSortData';
import SortDropdown from '@/components/SortListButton';
import { LiaRandomSolid } from 'react-icons/lia';
import { twMerge } from 'tailwind-merge';
import OwnedSongs from '@/app/account/mySong/components/OwnedSongs';
import { usePlayerContext } from '@/providers/PlayerProviders';

interface LikedSongPageProps {
  likedSongs: Song[]
  userData: UserDetails | null
  userPlaylists: Playlist[]
}

type SortType = "by author" | "by title" | "recently add"
  | "default";


const LikedSongPage: React.FC<LikedSongPageProps> = ({
  likedSongs,
  userPlaylists,
  userData
}) => {
  const imageUrl = "/assets/liked.png";
const { isShuffle , handleToggleShuffle , isPlaying  } = usePlayerContext()
  const dominantColor = useGetDominantColor(imageUrl);
  const onPlay = useOnplay(likedSongs);
  const [songs, setSongs] = useState<Song[]>(likedSongs);
  const [sort, setSort] = useState<SortType>('default');
  const Icon = !isPlaying ? FaPlay : FaPause

  // centralize all sorting functions 
  const sortSongs = useCallback((sortType: SortType) => {
    // check if sorty type is default 
    if (sortType === sort || sortType === "default") {
      setSort("default")
      setSongs(likedSongs);
      return;
    }
    setSort(sortType);
    let sortData: Song[];

    try {
      if (sortType == "by author") {
        sortData = sortDataByArtist(songs);
      } else if (sortType == 'by title') {
        sortData = sortDataByTitle(songs);
      } else if (sortType == "recently add") {
        sortData = sortedDataByCreatedDate(songs);
      } else {
        sortData = likedSongs
      }

      setSongs(sortData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Sorting failed:", e);
        toast.error("Failed to sort playlist.");
        setSongs(likedSongs);
        setSort('default');
      }
    } 
  }, [sort, likedSongs, songs])

  // helper function for spesific sort button
  const handleSortByAuthor = useCallback(() => sortSongs('by author'), [sortSongs])
  const handleSortByTitle = useCallback(() => sortSongs('by title'), [sortSongs])
  const handleSortByRecentlyAdd = useCallback(() => sortSongs('recently add'), [sortSongs])

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
          <div className='flex items-center gap-x-2 px-8'>
            <button
              title='Play All'
              onClick={() => onPlay(likedSongs[0].id)} // Play the first song in the current list
              className=
              'bg-green-500 rounded-full p-3 hover:scale-110 transition cursor-pointer'

            >
              <Icon size={20} className='text-black' />
            </button>
            <LiaRandomSolid
              size={30}
              className={twMerge(
                `hover:scale-110 transition cursor-pointer`,
                isShuffle ? "text-green-500" : "text-neutral-400 hover:text-neutral-300",
              )}
              onClick={handleToggleShuffle}
            />
          </div>
          <div className='hidden md:block mr-4'>
            <SortDropdown
              sort={sort}
              onHandleSortByArtist={handleSortByAuthor}
              onHandleSortByRecentlyAdd={handleSortByRecentlyAdd}
              onHandleSortByTitle={handleSortByTitle}
            />
          </div>
        </div>
        <LikedSongContent >
          {
            likedSongs.map((song, index) => (
             <OwnedSongs 
              data={ song}
              key={index}
              onHandlePlay={(id : string) => onPlay(id)}
              index={ index }
              userPlaylists={ userPlaylists }
             />
            )) 
          }
        </LikedSongContent>
      </div>
    </div>

  )
}

export default LikedSongPage