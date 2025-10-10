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
import { PlaylistContent } from './PlaylistContent';


const PlaylistPage: React.FC<PlaylistPageProps> = ({ userData, data }) => {
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
    <div className='flex flex-col space-y-2'>
      <PlaylistWrapper bgColor={bgColor}>
        {/* Playlist Image Container */}
        <div className="relative w-48 h-48 md:w-48 md:h-48 lg:w-60 lg:h-60">
          <Image
            src={playlistImage || "/assets/liked.png"}
            alt="Playlist Cover"
            layout="fill"
            objectFit="cover"
            className="shadow-2xl rounded-2xl"
          />
        </div>

        {/* Playlist Info Container */}
        {/* Removed w-full md:w-2/3 to let the flex container manage it better */}
        <div className='flex flex-col justify-start py-4'>

          <div className='flex justify-start flex-col mt-4'>
            {/* "Playlist" Text - Always hidden on mobile now for cleaner look, but you can change 'hidden' to 'block' if you want it on mobile too */}
            <p className='text-sm md:text-base font-semibold text-white hidden md:block'>Playlist</p>

            {/* Playlist Name - Increased text size on mobile and removed negative margin */}
            <p className='text-4xl sm:text-5xl md:text-7xl font-bold text-start mt-2 mb-2 text-white w-full'>
              {playlistName}
            </p>

            {/* Description - Removed negative margin and simplified responsive text size */}
            {desc && (
              <p className='text-neutral-400 text-start font-semibold text-sm md:text-base'>
                {desc}
              </p>
            )}

            {/* User Info Line */}
            <div className='flex gap-x-1 items-center mt-4'>
              <div
                className='flex gap-x-2.5 items-center cursor-pointer'
                onClick={() => router.push('/account')}
              >
                {/* Avatar Container */}
                <div className='w-8 h-8 flex items-center justify-center'>
                  <Image
                    src={avatar || '/images/liked.png'}
                    alt='User avatar'
                    height={20}
                    width={20}
                    className='rounded-full object-cover w-full h-full'
                  />
                </div>
                {/* User Name */}
                <p className='text-white font-semibold text-sm hover:underline transition'>
                  {userData?.full_name}
                </p>
              </div>
              {/* Additional info like titles/duration - Kept your original placeholders, hidden by default */}
              <p className='text-neutral-500 font-semibold hidden'>&bull; titles,</p>
              <p className='text-neutral-500 font-semibold text-sm hidden'>
                {/* {totalDuration} */}
                &bull; total duration
              </p>
            </div>
          </div>
        </div>
      </PlaylistWrapper>
      <PlaylistContent />
    </div>
  );
};

export default PlaylistPage;