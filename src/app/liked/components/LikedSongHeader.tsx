"use client"

import Image from 'next/image'
import React from 'react'
import { Song, UserDetails } from '../../../../types'
import useLoadAvatar from '@/hooks/useLoadAvatar'
import { useRouter } from 'next/navigation'

interface LikedSongHeaderProps {
    userData: UserDetails | null
    likedSongs: Song[]
}

const LikedSongHeader = ({ userData, likedSongs }: LikedSongHeaderProps) => {
    const avatar = useLoadAvatar(userData!);
    const songsLength = likedSongs.length;
    const router = useRouter();

    const handleAccountPush = () => {
        router.push('/account')
    }
    return (
      <div className='flex-col space-y-3'>
          <div className="flex items-center space-x-4 text-white ">
            {/* Playlist image */}
            <div className=" relative 2xl:w-60 2xl:h-60 md:w-48 md:h-48  ">
                <Image
                    src={"/assets/liked.png"}// Use a static image for "Liked Songs"
                    alt="Liked Songs"
                    layout="fill"
                    objectFit="cover"
                    className="shadow-2xl rounded-2xl "
                />
            </div>

            {/* Playlist info */}
               <div className='flex-col flex'>
                 <h2 className="text-sm font-bold uppercase">Playlist</h2>
                <h1 className="text-5xl font-extrabold mt-2">Liked Songs</h1>
                <div className="flex items-center mt-2">
                    <div className='w-10 h-10 flex items-center justify-center  md:ml-0'>
                        <Image
                            src={avatar || '/images/liked.png'}
                            alt='User avatar'
                            height={20}
                            width={20}
                            className='rounded-full object-cover w-2/3 h-2/3' />
                    </div>
                    <p className="font-semibold hover:underline cursor-pointer transition" onClick={handleAccountPush}>{userData?.full_name}</p>
                    <span className="mx-1">·</span>
                    <p className="text-gray-300">{songsLength} {songsLength > 1 ?
                        "songs" : "song"}</p>
                </div>
               </div>
            </div>
        </div>
    )
}

export default LikedSongHeader
