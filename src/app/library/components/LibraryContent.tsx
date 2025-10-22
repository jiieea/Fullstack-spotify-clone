"use client"

import Image from 'next/image';
import React from 'react'
import { AiFillPushpin } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { LibraryContentProps } from '../../interfaces/types'
import UserSongs from './UserSongs';
import UserPlaylists from './UserPlaylists';
const LibraryContent: React.FC<LibraryContentProps> = (
    {
        userSongs,
        userPlaylists,
        userData,
        likedSongs
    }
) => {
    const router = useRouter();
    //   const onPlay = useOnplay(userSongs);

    const onClick = () => {
        router.push('/liked')
    }
    return (
        <div className='flex gap-x-2 bg-neutral-900 mt-2 mb-1'>
            {/* fetch user songs */}
            <div className='flex flex-col space-y-0.5 overflow-y-auto'>
                <div className='flex gap-x-4 items-center p-3' onClick={onClick}>
                    {/* image song */}
                    <Image src={"/assets/liked.png"} alt='likedsongs'
                        width={60}
                        height={60}
                        className='rounded-lg'
                    />
                    <div className='flex flex-col'>

                        <h1 className='text-white font-semibold '>Liked Songs</h1>
                        <p className='text-neutral-600 flex items-center gap-x-1'>
                            <span><AiFillPushpin size={15} className='text-green-500' />
                            </span>Playlist &bull; {likedSongs} Songs </p>
                    </div>
                </div>
                <div className='mb-[10em]'>
                    {
                        userSongs.map((song) => (
                            <UserSongs key={song.id} data={song} />
                        ))
                    }
                    {
                        // map playlists
                        userPlaylists.map((playlist) => (
                            <UserPlaylists data={playlist} key={playlist.id} user={userData} href={`/${playlist.id}`} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LibraryContent