"use client";

import { PlaylistPageProps } from '@/app/interfaces/types';
import { useGetDominantColor } from '@/hooks/useGetDominantColor';
import useLoadAvatar from '@/hooks/useLoadAvatar';
import { useLoadPlaylistImage } from '@/hooks/useLoadImage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiGlobe } from 'react-icons/ci';
import PlaylistWrapper from './PlaylistHeaderWrapper';

const PlaylistContent: React.FC<PlaylistPageProps> = ({ userData, data }) => {
  const router = useRouter();
  const playlistImage = useLoadPlaylistImage(data!);
  const avatar = useLoadAvatar(userData!);
  const bgColor = useGetDominantColor(playlistImage || '/images/liked.png');
  const playlistName = data?.playlist_name;
  const desc = data?.description;

  // 1. Conditionally render based on the data prop
  if (!data) {
    return (
      <div className='w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center'>
        <p className='text-white'>Playlist not found.</p>
      </div>
    );
  }



  return (
    <PlaylistWrapper bgColor={bgColor}>
      <Image
        src={playlistImage || '/images/liked.png'}
        alt='playlist image'
        width={250}
        height={250}
        quality={100}
        className='relative object-cover rounded-md mb-4 w-45 md:w-50 h-45 md:h-50'
      />
      <div className='flex flex-col justify-start py-4 w-full md:w-2/3'>
        <div className='flex justify-start flex-col'>
          <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
          <p className='md:text-7xl text-2xl font-semibold text-start mt-2 mb-2 text-white ml-[-1rem] md:ml-0 md:ps-2 w-full'>
            {playlistName}
          </p>
          {desc && (
            <p className='ml-[-1rem] text-neutral-400 text-start font-semibold text-[13px] md:text-[16px] md:ps-2 md:ml-0'>
              {desc}
            </p>
          )}
          <div className='flex gap-x-1 items-center ml-[-1.5em] md:ml-0'>
            <div className='flex gap-x-2.5 items-center' onClick={() => router.push('/account')}>
              <div className='w-10 h-10 flex items-center justify-center md:ml-0'>
                <Image
                  src={avatar || '/images/liked.png'}
                  alt='User avatar'
                  height={20}
                  width={20}
                  className='rounded-full object-cover w-2/3 h-2/3'
                />
              </div>
              <p className='text-white font-semibold text-sm mr-3 hover:underline transition'>
                {userData?.full_name}
              </p>
            </div>
            <p className='text-neutral-500 font-semibold hidden '>titles,</p>
            <p className='text-neutral-500 font-semibold text-sm md:text-[14px ] hidden'>
              {/* {totalDuration} */}
            </p>
          </div>
        </div>
        <div className="flex-col md:flex-row flex items-center">
          <div className='flex gap-x-2 md:items-center ml-[-12em] md:ml-0 flex-col md:flex-row'>
            <div className="flex gap-x-2 flex-col">
              <div className='flex items-center gap-y-1 md:hidden'>
                <div className='w-10 h-10 flex items-center justify-center md:ml-0'>
                  <Image
                    src={'/assets/liked.png'}
                    alt='User avatar'
                    height={20}
                    width={20}
                    className='rounded-full object-cover w-2/3 h-2/3'
                  />
                </div>
                <p className='text-white md:text-neutral-400 font-semibold text-sm mr-3 hover:underline transition'>
                  full name
                </p>
                <p className='font-semibold text-neutral-400 hidden md:block text-[15px]'>
                  2 titles
                </p>
              </div>
              <div className='flex gap-x-4 items-center md:hidden ml-[-1rem]'>
                <CiGlobe size={22} className='text-neutral-500' />
                <p className='text-neutral-500 font-semibold text-sm md:text-[14px]'>
                  total duration
                </p>
              </div>
            </div>
            <div className='gap-1 items-center py-2 px-2 md:ml-0 hidden md:flex'>
              <CiGlobe size={15} className='text-neutral-500 md:hidden' />
              <p className='text-neutral-500 md:hidden font-semibold text-sm md:text-[14px]'>
                total duration
              </p>
            </div>
          </div>
        </div>
      </div>
    </PlaylistWrapper>
  );
};

export default PlaylistContent;