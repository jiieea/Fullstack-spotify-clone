import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Song } from '../../../../../types';
import MediaItem from '@/components/MediaItem';
import { FaPlay, FaPlus } from "react-icons/fa";
import LikedSongContent from '@/app/liked/components/LikedSongContent';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { sortDataByArtist, sortDataByTitle, sortedDataByCreatedDate } from '@/hooks/useSortData';
import SortDropdown from '@/components/SortListButton';
import { PlaylistOption } from './PlaylistOption';
import { twMerge } from 'tailwind-merge';
import { RxPencil1 } from 'react-icons/rx';
import SortButtonSheet from '@/components/SortSheet';
import { PlaylistContentProps } from '../../../interfaces/types'
import AddSong from './AddSong';
import { useUsers } from '@/hooks/useUsers';
import { PiShuffleBold } from "react-icons/pi";
import Button from '@/components/Button';
import { useSearch } from '@/providers/SearchProviders';
import usePlayShuffle from '@/hooks/usePlayShuffle';
// --- Type Refinement ---
type SortType = "by artist" | "by title" | 'add recently' | 'default';

// --- Component Refactor ---
export const PlaylistContent: React.FC<PlaylistContentProps> = ({
  onHandlePlay,
  dataOwner,
  songs,
  userPlaylist,
  data,
  allSongs
}) => {
  const supabase = useSupabaseClient();
  const { isShuffle , handleToggleShuffle } = usePlayShuffle()
  const router = useRouter();
  const { user } = useUsers();
  const ownerId = dataOwner.id;
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(songs);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSongSheetOpen, setIsAddSongSheetOpen] = useState(false);
  const [sort, setSort] = useState<SortType>('default');
  const [isDisabled, setIsDisabled] = useState(false); // Renamed for consistency



  useEffect(() => {
    if(dataOwner.id !== user?.id){
      setIsDisabled(true)
    }
  } , [dataOwner , user?.id ])


  useEffect(() => {
    if(user?.id !== ownerId) {
      setIsDisabled(true);
    }
  },[user, ownerId])

  const playlist_id = data.id;

  const openSheet = () => {
    setIsAddSongSheetOpen(true);
  }

  useEffect(() => {

    if(songs.length !== playlistSongs.length) {
      setPlaylistSongs(songs)
    }
    // Optionally, reset sort to 'default' when new songs are loaded
    setSort('default');
  }, [songs, playlistSongs.length]);



  // 4. Centralized Sorting Logic (with useCallback for stability)
  const handleSort = useCallback((newSortType: SortType) => {
    if (newSortType === sort || newSortType === 'default') {
      setPlaylistSongs(songs);
      setSort('default');
      return;
    }

    setIsLoading(true);
    setSort(newSortType);
    let sortedData: Song[] = [];

    try {
      switch (newSortType) {
        case 'by artist':
          sortedData = sortDataByArtist(playlistSongs);
          break;
        case 'by title':
          sortedData = sortDataByTitle(playlistSongs);
          break;
        case 'add recently':
          sortedData = sortedDataByCreatedDate(playlistSongs);
          break;
        default:
          // Should not happen if logic is correct, but useful fallback
          sortedData = songs;
          break;
      }
      setPlaylistSongs(sortedData);
    } catch (e) {
      console.error("Sorting failed:", e);
      toast.error("Failed to sort playlist.");
      setPlaylistSongs(songs);
      setSort('default');
    } finally {
      setIsLoading(false);
    }
  }, [sort, playlistSongs, songs]); // Depend on sort, current songs list, and original songs list

  // Helper functions for specific sort buttons
  const handleSortByArtist = useCallback(() => handleSort('by artist'), [handleSort]);
  const handleSortByTitle = useCallback(() => handleSort('by title'), [handleSort]);
  const handleSortByRecentlyAdd = useCallback(() => handleSort('add recently'), [handleSort]);


  // 5. Improved Remove Song Handler
  const handleRemoveSong = async (songId: string) => {
    setIsDisabled(true); 
    try {
      const { error } = await supabase.from('playlist_songs')
        .delete()
        .eq('song_id', songId)
        .eq('playlist_id', playlist_id);

      if(error) {
        toast.error('failed to remove the songs' + error.message)
      }

      toast.success('removed from the playlist')
      setPlaylistSongs((song) => song.filter((currentSong) => currentSong.id !== songId))
      router.refresh()
    } catch (e) {
      console.error('Error removing song:', e);
      toast.error("An unexpected error occurred while removing the song.");
    } finally {
      setIsDisabled(false);
    }
  }

  // 6. Memoize the empty state check
  const hasSongs = useMemo(() => songs.length > 0, [songs.length]);

  if (!hasSongs) {
    return (
      <div className='mt-[-3rem] py-10 px-6 text-center text-neutral-400'>
        <p>There are no songs in this playlist yet.</p>
        <p className='mt-2'>Use the &quot;button&quot; to get started!</p>
    </div>
    );
  }

  // --- Render ---
  return (
    <div className='mt-[-3rem] py-2 md:py-3 md:px-3 '>
      <div className='flex flex-col'>
        {/* Playback Controls and Options */}
        <div className="flex space-x-4 items-center justify-between mb-4 px-6">
         <div className='flex items-center gap-x-4'>
           <button
            title='Play All'
            onClick={() => onHandlePlay(playlistSongs[0].id)} // Play the first song in the current list
            className={twMerge(
              'bg-green-500 rounded-full p-3 hover:scale-110 transition cursor-pointer',
            )}
          >
            <FaPlay size={20} className='text-black' />
          </button>

          <PiShuffleBold
            size={30}
            className={twMerge(
              `hover:scale-110 transition cursor-pointer`,
              isShuffle ? "text-green-500" : "text-neutral-400 hover:text-neutral-300",
            )}
            onClick={ handleToggleShuffle }
          />
               <PlaylistOption
            disabled={isDisabled}
            playlistData={data}
          />
         </div>
          {/* Desktop Sort Dropdown */}
          <div className='hidden md:block'>
            <SortDropdown
              onHandleSortByArtist={handleSortByArtist}
              onHandleSortByRecentlyAdd={handleSortByRecentlyAdd}
              onHandleSortByTitle={handleSortByTitle}
              sort={sort}
            />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className='flex items-center gap-x-4 md:hidden px-6 mb-4'>
          <Button
            onClick={openSheet}
            disabled={ isDisabled }
            className='bg-neutral-800 text-white px-5 py-2 flex items-center gap-x-2 cursor-pointer'
          >
            < FaPlus className='text-white' /><span>Add</span>
          </Button>
          {
            isAddSongSheetOpen && (
              <AddSong
                songs={songs}
                setIsAddSheetOpen={setIsAddSongSheetOpen}
                playlistData={data}
                allSongs={ allSongs }
              />
            )
          }

          <SortButtonSheet
            sort={sort}
            onHandleSortByArtist={handleSortByArtist}
            onHandleSortByDate={handleSortByRecentlyAdd}
            onHandleSortByTitle={handleSortByTitle}
          />

          <Button
          disabled={ isDisabled }
            className='bg-neutral-800 text-white px-5 py-2 flex items-center gap-x-2 cursor-pointer'
          >
            <RxPencil1 /><span>Update</span>
          </Button>
        </div>
      </div>

      {/* Song List */}
      <LikedSongContent>
        {
          playlistSongs.map((song, index) => (
            <MediaItem
              isLoading={isLoading} // Show loading state on individual items during sort
              onHandlePlay={onHandlePlay}
              onHandleRemoveSong={handleRemoveSong}
              key={song.id}
              data={song}
              index={index}
              userPlaylists={userPlaylist}
            />
          ))
        }
      </LikedSongContent>
    </div>
  );
}