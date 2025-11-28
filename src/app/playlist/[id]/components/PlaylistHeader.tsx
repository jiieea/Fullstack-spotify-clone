"use client";

import { PlaylistPageProps } from '@/app/interfaces/types';
import { useGetDominantColor } from '@/hooks/useGetDominantColor';
import useLoadAvatar from '@/hooks/useLoadAvatar';
import { useLoadPlaylistImage } from '@/hooks/useLoadImage';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { CiGlobe } from 'react-icons/ci';
import PlaylistWrapper from './PlaylistHeaderWrapper';
import { PlaylistContent } from './PlaylistContent';
import useGetPlaylistDuration from '@/hooks/useGetTotalDuration';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useOnplay from '@/hooks/useOnPlay';


const PlaylistPage: React.FC<PlaylistPageProps> = ({ allSongs , userName, data, userPlaylists, songs }) => {
  const playlistImage = useLoadPlaylistImage(data!);
  const bgColor = useGetDominantColor(playlistImage!);
  const playlistName = data?.playlist_name;
const desc = data?.description;
  const supabase = useSupabaseClient();
  const handlePlaySong = useOnplay(songs);
  const avatar = useLoadAvatar(userName)


  const getSongUrls = useMemo(() => {
    if (!songs) {
      return [];
    }

    return songs.map((song) => {
      const { data } = supabase.storage.from('songs').getPublicUrl(song.song_path)
      return data.publicUrl;
    })
  }, [songs, supabase])

  const totalDuration = useGetPlaylistDuration(getSongUrls);


  // 1. Conditionally render based on the data prop
  if (!data) {
    return (
      <div className='w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center'>
        <p className='text-white'>Playlist not found.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col '
    >
      <PlaylistWrapper bgColor={bgColor}>
        {/* Playlist Image Container */}
        <div className='flex'>
        <Image
          src={playlistImage || '/images/liked.png'}
          alt='playlist image'
          width={250}
          height={250}
          quality={100}
          className=' relative 2xl:w-60 2xl:h-60 w-48 h-48  object-cover rounded-2xl'
        />
        </div>
        <div className='flex flex-col justify-start  space-y-2.5 w-full md:w-2/3'>
          <div className='flex justify-start flex-col mt-6'>
            <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
            <p
              className='lg:text-7xl text-2xl md:text-5xl font-semibold text-start text-white md:ml-[-1rem]   md:pl-2   w-full'>
              {playlistName} </p>
            {
              desc && (
                <p className='ml-[-1rem] hidden md:block text-neutral-400 
                text-start font-semibold text-[13px] md:text-[16px] md:ps-2 md:ml-0'>
                  {desc}
                </p>
              )
            }
            <div className='md:flex gap-x-1 items-center ml-[-1.5em] md:ml-0 hidden'>
              <div className='w-10 h-10 flex items-center justify-center  md:ml-0'>
                <Image
                  src={avatar || '/images/liked.png'}
                  alt='User avatar'
                  height={20}
                  width={20}
                  className='rounded-full object-cover w-2/3 h-2/3 hidden md:block' />
              </div>
              <p className='text-white font-semibold text-sm mr-3 hover:underline transition hidden md:block'
              >
                {userName.full_name}
              </p>
              <p className='text-neutral-300 font-semibold hidden text-[14px]  md:flex'> {songs.length} titles &bull;</p>
              <p className='text-neutral-300 font-semibold text-[14px] hidden md:flex'>
                {
                  totalDuration
                }
              </p>
            </div>
            {/* div only on mobile */}
             <div className='flex flex-col gap-y-0.5'>
            <div className='flex items-center md:hidden'>
               <div className='w-10 h-10 flex items-center justify-center  md:ml-0 '>
                <Image
                  src={avatar || '/images/liked.png'}
                  alt='User avatar'
                  height={20}
                  quality={100}
                  width={20}
                  className='rounded-full object-cover w-2/3 h-2/3 mr-3 ' />
              </div>
              <p className='text-white font-semibold text-[13px]'>{ userName.full_name}</p>
             </div>
             <div className='flex items-center md:hidden gap-x-1.5'>
              <CiGlobe  size={15} className='text-neutral-400'/>
              <p className='text-neutral-400 font-semibold text-[12px]'>
                { totalDuration } 
              </p>
             </div>
            </div>
          </div>
        </div>
      </PlaylistWrapper>
      <PlaylistContent
        data={data}
        dataOwner = { userName }
        allSongs={ allSongs }
        onHandlePlay={(id: string) => handlePlaySong(id)}
        songs={songs} userPlaylist={userPlaylists} />
    </div>
  );
};

export default PlaylistPage;